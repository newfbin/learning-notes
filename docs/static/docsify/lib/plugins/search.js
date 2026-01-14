(function () {
  function getAndRemoveConfig(str) {
    if (str === void 0) str = '';
    var config = {};
    if (str) {
      str = str
        .replace(/^('|")/, '')
        .replace(/('|")$/, '')
        .replace(/(?:^|\s):([\w-]+:?)=?([\w-%]+)?/g, function (m, key, value) {
          if (key.indexOf(':') === -1) {
            config[key] = (value && value.replace(/&quot;/g, '')) || true;
            return '';
          }
          return m;
        })
        .trim();
    }
    return { str: str, config: config };
  }

  function removeDocsifyIgnoreTag(str) {
    return str
      .replace(/<!-- {docsify-ignore} -->/, '')
      .replace(/{docsify-ignore}/, '')
      .replace(/<!-- {docsify-ignore-all} -->/, '')
      .replace(/{docsify-ignore-all}/, '')
      .trim();
  }

  var INDEXS = {};
  var LOCAL_STORAGE = {
    EXPIRE_KEY: 'docsify.search.expires',
    INDEX_KEY: 'docsify.search.index',
  };

  function resolveExpireKey(namespace) {
    return namespace ? (LOCAL_STORAGE.EXPIRE_KEY + "/" + namespace) : LOCAL_STORAGE.EXPIRE_KEY;
  }

  function resolveIndexKey(namespace) {
    return namespace ? (LOCAL_STORAGE.INDEX_KEY + "/" + namespace) : LOCAL_STORAGE.INDEX_KEY;
  }

  function escapeHtml(string) {
    var entityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(string).replace(/[&<>"']/g, function (s) { return entityMap[s]; });
  }

  function getAllPaths(router) {
    var paths = [];
    Docsify.dom.findAll('.sidebar-nav a:not(.section-link):not([data-nosearch])').forEach(function (node) {
      var href = node.href;
      var originHref = node.getAttribute('href');
      var path = router.parse(href).path;
      if (path && paths.indexOf(path) === -1 && !Docsify.util.isAbsolutePath(originHref)) {
        paths.push(path);
      }
    });
    return paths;
  }

  function getTableData(token) {
    if (!token.text && token.type === 'table') {
      token.cells.unshift(token.header);
      token.text = token.cells.map(function (rows) { return rows.join(' | '); }).join(' |\n ');
    }
    return token.text;
  }

  function getListData(token) {
    if (!token.text && token.type === 'list') token.text = token.raw;
    return token.text;
  }

  // ======================== IndexedDB 工具方法 (无修改) ========================
  const DB_CONFIG = { name: 'DocsifySearchDB', version: 1, storeName: 'searchStore' };
  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
          db.createObjectStore(DB_CONFIG.storeName, { keyPath: 'key' });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }
  function setDBItem(key, value) {
    return new Promise(async (resolve, reject) => {
      const db = await openDB();
      const tx = db.transaction(DB_CONFIG.storeName, 'readwrite');
      const store = tx.objectStore(DB_CONFIG.storeName);
      store.put({ key, value });
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  }
  function getDBItem(key) {
    return new Promise(async (resolve, reject) => {
      const db = await openDB();
      const tx = db.transaction(DB_CONFIG.storeName, 'readonly');
      const store = tx.objectStore(DB_CONFIG.storeName);
      const request = store.get(key);
      request.onsuccess = () => { db.close(); resolve(request.result?.value || null); };
      request.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  }

  // ======================== 【修复核心1：重写saveData，关键：同步赋值全局INDEXS】 ========================
  async function saveData(maxAge, expireKey, indexKey, currentIndex = {}) {
    // 1. 读取已有的索引数据
    const oldIndex = await getDBItem(indexKey) || {};
    // 2. 修复：新数据在前，覆盖旧数据，顺序正确
    const newIndex = { ...currentIndex, ...oldIndex };
    // 3. 写入过期时间 + 全量索引到DB
    await setDBItem(expireKey, Date.now() + maxAge);
    await setDBItem(indexKey, newIndex);
    // ✅【重中之重】把最新的索引赋值给全局变量INDEXS，搜索方法依赖这个全局变量
    INDEXS = newIndex;
    console.log(`[Docsify搜索] 索引写入成功，全局INDEXS同步完成，共${Object.keys(INDEXS).length}个文档`);
    return newIndex;
  }

  // ======================== genIndex/ignoreDiacriticalMarks/search 无修改 ========================
  function genIndex(path, content, router, depth) {
    if (content === void 0) content = '';
    var tokens = window.marked.lexer(content);
    var slugify = window.Docsify.slugify;
    var index = {};
    var slug;
    var title = '';
    tokens.forEach(function (token, tokenIndex) {
      if (token.type === 'heading' && token.depth <= depth) {
        var ref = getAndRemoveConfig(token.text);
        var str = ref.str; var config = ref.config;
        var text = removeDocsifyIgnoreTag(token.text);
        slug = config.id ? router.toURL(path, { id: slugify(config.id) }) : router.toURL(path, { id: slugify(escapeHtml(text)) });
        if (str) title = removeDocsifyIgnoreTag(str);
        index[slug] = { slug: slug, title: title, body: '' };
      } else {
        if (tokenIndex === 0) {
          slug = router.toURL(path);
          index[slug] = { slug: slug, title: path !== '/' ? path.slice(1) : 'Home Page', body: token.text || '' };
        }
        if (!slug) return;
        if (!index[slug]) index[slug] = { slug: slug, title: '', body: '' };
        token.text = getTableData(token); token.text = getListData(token);
        index[slug].body = index[slug].body ? index[slug].body + '\n' + (token.text || '') : token.text || '';
      }
    });
    slugify.clear();
    return index;
  }

  function ignoreDiacriticalMarks(keyword) {
    if (keyword && keyword.normalize) return keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return keyword;
  }

  function search(query) {
    var matchingResults = []; var data = [];
    Object.keys(INDEXS).forEach(function (key) {
      data = data.concat(Object.keys(INDEXS[key]).map(function (page) { return INDEXS[key][page]; }));
    });
    query = query.trim();
    var keywords = query.split(/[\s\-，\\/]+/);
    if (keywords.length !== 1) keywords = [].concat(query, keywords);
    var loop = function (i) {
      var post = data[i]; var matchesScore = 0; var resultStr = '';
      var postTitle = post.title && post.title.trim(); var postContent = post.body && post.body.trim(); var postUrl = post.slug || '';
      if (postTitle) {
        keywords.forEach(function (keyword) {
          var regEx = new RegExp(escapeHtml(ignoreDiacriticalMarks(keyword)).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'gi');
          var handlePostTitle = postTitle ? escapeHtml(ignoreDiacriticalMarks(postTitle)) : postTitle;
          var handlePostContent = postContent ? escapeHtml(ignoreDiacriticalMarks(postContent)) : postContent;
          var indexTitle = postTitle ? handlePostTitle.search(regEx) : -1;
          var indexContent = postContent ? handlePostContent.search(regEx) : -1;
          if (indexTitle >= 0 || indexContent >= 0) {
            matchesScore += indexTitle >= 0 ? 3 : indexContent >= 0 ? 2 : 0;
            var start = indexContent < 11 ? 0 : indexContent - 10;
            var end = start === 0 ? 70 : indexContent + keyword.length + 60;
            if (postContent && end > postContent.length) end = postContent.length;
            var matchContent = handlePostContent && '...' + handlePostContent.substring(start, end).replace(regEx, function (word) { return ("<em class=\"search-keyword\">" + word + "</em>"); }) + '...';
            resultStr += matchContent;
          }
        });
        if (matchesScore > 0) {
          matchingResults.push({ title: handlePostTitle, content: postContent ? resultStr : '', url: postUrl, score: matchesScore });
        }
      }
    };
    for (var i = 0; i < data.length; i++) loop(i);
    return matchingResults.sort(function (r1, r2) { return r2.score - r1.score; });
  }

  // ======================== 【修复核心2：可控并发爬取 核心方法，修复传参错误】 ========================
  async function batchCrawl(paths, vm, depth, limit = 5) {
    let resultIndex = {};
    for (let i = 0; i < paths.length; i += limit) {
      const slicePaths = paths.slice(i, i + limit);
      const promises = slicePaths.map(async (path) => {
        try {
          if (resultIndex[path]) return {};
          // ✅ 修复：Docsify.get 传参正确，三个参数完整，适配所有环境
          const content = await Docsify.get(vm.router.getFile(path), false, vm.config.requestHeaders || {});
          const pathIndex = genIndex(path, content, vm.router, depth);
          resultIndex[path] = pathIndex;
          console.log(`[Docsify搜索] 成功爬取: ${path}`);
          return { [path]: pathIndex };
        } catch (err) {
          console.warn(`[Docsify搜索] 爬取失败(跳过): ${path}`, err);
          return {};
        }
      });
      await Promise.all(promises);
    }
    return resultIndex;
  }

  // ======================== 【修复核心3：重写init方法，修复过期判断+所有逻辑】 ========================
  async function init(config, vm) {
    var paths = isAuto ? getAllPaths(vm.router) : config.paths;
    var namespaceSuffix = '';

    if (paths.length && isAuto && config.pathNamespaces) {
      var path = paths[0];
      if (Array.isArray(config.pathNamespaces)) {
        namespaceSuffix = config.pathNamespaces.filter(function (prefix) { return path.slice(0, prefix.length) === prefix; })[0] || namespaceSuffix;
      } else if (config.pathNamespaces instanceof RegExp) {
        var matches = path.match(config.pathNamespaces);
        if (matches) namespaceSuffix = matches[0];
      }
      var isExistHome = paths.indexOf(namespaceSuffix + '/') === -1;
      var isExistReadme = paths.indexOf(namespaceSuffix + '/README') === -1;
      if (isExistHome && isExistReadme) paths.unshift(namespaceSuffix + '/');
    } else if (paths.indexOf('/') === -1 && paths.indexOf('/README') === -1) {
      paths.unshift('/');
    }

    var expireKey = resolveExpireKey(config.namespace) + namespaceSuffix;
    var indexKey = resolveIndexKey(config.namespace) + namespaceSuffix;

    // ✅ 修复：过期判断逻辑修正，解决首次访问索引被清空的问题
    // 只有 expireTime 存在 且 小于当前时间，才判定为过期；null/undefined 代表首次访问，不过期
    const expireTime = await getDBItem(expireKey);
    var isExpired = expireTime !== null && expireTime < Date.now();

    // 读取已有索引并赋值给全局INDEXS
    INDEXS = await getDBItem(indexKey) || {};

    if (isExpired) {
      INDEXS = {};
      await setDBItem(expireKey, null);
      await setDBItem(indexKey, null);
      console.log(`[Docsify搜索] 索引已过期，开始全量重建(${paths.length}个文件)`);
    } else if (!isAuto) {
      console.log(`[Docsify搜索] 使用缓存索引，共${Object.keys(INDEXS).length}个文件`);
      return;
    } else if(Object.keys(INDEXS).length > 0) {
      console.log(`[Docsify搜索] 使用缓存索引，无需重新爬取，共${Object.keys(INDEXS).length}个文件`);
      return;
    }

    // 可控并发爬取
    const newIndex = await batchCrawl(paths, vm, config.depth, 5);
    // 分批写入并同步全局INDEXS
    await saveData(config.maxAge, expireKey, indexKey, newIndex);
  }

  /* eslint-disable no-unused-vars */
  var NO_DATA_TEXT = '';
  var options;

  function style() {
    var code = "\n.sidebar {\n  padding-top: 0;\n}\n\n.search {\n  margin-bottom: 20px;\n  padding: 6px;\n  border-bottom: 1px solid #eee;\n}\n\n.search .input-wrap {\n  display: flex;\n  align-items: center;\n}\n\n.search .results-panel {\n  display: none;\n}\n\n.search .results-panel.show {\n  display: block;\n}\n\n.search input {\n  outline: none;\n  border: none;\n  width: 100%;\n  padding: 0.6em 7px;\n  font-size: inherit;\n  border: 1px solid transparent;\n}\n\n.search input:focus {\n  box-shadow: 0 0 5px var(--theme-color, #42b983);\n  border: 1px solid var(--theme-color, #42b983);\n}\n\n.search input::-webkit-search-decoration,\n.search input::-webkit-search-cancel-button,\n.search input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\n.search input::-ms-clear {\n  display: none;\n  height: 0;\n  width: 0;\n}\n\n.search .clear-button {\n  cursor: pointer;\n  width: 36px;\n  text-align: right;\n  display: none;\n}\n\n.search .clear-button.show {\n  display: block;\n}\n\n.search .clear-button svg {\n  transform: scale(.5);\n}\n\n.search h2 {\n  font-size: 17px;\n  margin: 10px 0;\n}\n\n.search a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.search .matching-post {\n  border-bottom: 1px solid #eee;\n}\n\n.search .matching-post:last-child {\n  border-bottom: 0;\n}\n\n.search p {\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n.search p.empty {\n  text-align: center;\n}\n\n.app-name.hide, .sidebar-nav.hide {\n  display: none;\n}";
    Docsify.dom.style(code);
  }

  function tpl(defaultValue) {
    if (defaultValue === void 0) defaultValue = '';
    var html = "<div class=\"input-wrap\">\n      <input type=\"search\" value=\"" + defaultValue + "\" aria-label=\"Search text\" />\n      <div class=\"clear-button\">\n        <svg width=\"26\" height=\"24\">\n          <circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#ccc\" />\n          <path stroke=\"white\" stroke-width=\"2\" d=\"M8.25,8.25,15.75,15.75\" />\n          <path stroke=\"white\" stroke-width=\"2\"d=\"M8.25,15.75,15.75,8.25\" />\n        </svg>\n      </div>\n    </div>\n    <div class=\"results-panel\"></div>\n    </div>";
    var el = Docsify.dom.create('div', html);
    var aside = Docsify.dom.find('aside');
    Docsify.dom.toggleClass(el, 'search');
    Docsify.dom.before(aside, el);
  }

  function doSearch(value) {
    var $search = Docsify.dom.find('div.search');
    var $panel = Docsify.dom.find($search, '.results-panel');
    var $clearBtn = Docsify.dom.find($search, '.clear-button');
    var $sidebarNav = Docsify.dom.find('.sidebar-nav');
    var $appName = Docsify.dom.find('.app-name');
    if (!value) {
      $panel.classList.remove('show');
      $clearBtn.classList.remove('show');
      $panel.innerHTML = '';
      if (options.hideOtherSidebarContent) {
        $sidebarNav && $sidebarNav.classList.remove('hide');
        $appName && $appName.classList.remove('hide');
      }
      return;
    }
    var matchs = search(value);
    var html = '';
    matchs.forEach(function (post) {
      html += "<div class=\"matching-post\">\n<a href=\"" + (post.url) + "\">\n<h2>" + (post.title) + "</h2>\n<p>" + (post.content) + "</p>\n</a>\n</div>";
    });
    $panel.classList.add('show');
    $clearBtn.classList.add('show');
    $panel.innerHTML = html || ("<p class=\"empty\">" + NO_DATA_TEXT + "</p>");
    if (options.hideOtherSidebarContent) {
      $sidebarNav && $sidebarNav.classList.add('hide');
      $appName && $appName.classList.add('hide');
    }
  }

  function bindEvents() {
    var $search = Docsify.dom.find('div.search');
    var $input = Docsify.dom.find($search, 'input');
    var $inputWrap = Docsify.dom.find($search, '.input-wrap');
    var timeId;
    Docsify.dom.on($search, 'click', function (e) {
      return ['A', 'H2', 'P', 'EM'].indexOf(e.target.tagName) === -1 && e.stopPropagation();
    });
    Docsify.dom.on($input, 'input', function (e) {
      clearTimeout(timeId);
      timeId = setTimeout(function (_) { return doSearch(e.target.value.trim()); }, 100);
    });
    Docsify.dom.on($inputWrap, 'click', function (e) {
      if (e.target.tagName !== 'INPUT') { $input.value = ''; doSearch(); }
    });
  }

  function updatePlaceholder(text, path) {
    var $input = Docsify.dom.getNode('.search input[type="search"]');
    if (!$input) return;
    if (typeof text === 'string') $input.placeholder = text;
    else {
      var match = Object.keys(text).filter(function (key) { return path.indexOf(key) > -1; })[0];
      $input.placeholder = text[match];
    }
  }

  function updateNoData(text, path) {
    if (typeof text === 'string') NO_DATA_TEXT = text;
    else {
      var match = Object.keys(text).filter(function (key) { return path.indexOf(key) > -1; })[0];
      NO_DATA_TEXT = text[match];
    }
  }

  function updateOptions(opts) { options = opts; }

  function init$1(opts, vm) {
    var keywords = vm.router.parse().query.s;
    updateOptions(opts); style(); tpl(keywords); bindEvents();
    keywords && setTimeout(function (_) { return doSearch(keywords); }, 500);
  }

  async function update(opts, vm) {
    updateOptions(opts);
    updatePlaceholder(opts.placeholder, vm.route.path);
    updateNoData(opts.noData, vm.route.path);
    isAuto && await init(CONFIG, vm);
  }

  /* eslint-disable no-unused-vars */
  var isAuto = false;
  var CONFIG = {
    placeholder: 'Type to search',
    noData: 'No Results!',
    paths: 'auto',
    depth: 2,
    maxAge: 86400000,
    hideOtherSidebarContent: false,
    namespace: undefined,
    pathNamespaces: undefined,
  };

  var install = function (hook, vm) {
    var util = Docsify.util;
    var opts = vm.config.search || CONFIG;
    if (Array.isArray(opts)) CONFIG.paths = opts;
    else if (typeof opts === 'object') {
      CONFIG.paths = Array.isArray(opts.paths) ? opts.paths : 'auto';
      CONFIG.maxAge = util.isPrimitive(opts.maxAge) ? opts.maxAge : CONFIG.maxAge;
      CONFIG.placeholder = opts.placeholder || CONFIG.placeholder;
      CONFIG.noData = opts.noData || CONFIG.noData;
      CONFIG.depth = opts.depth || CONFIG.depth;
      CONFIG.hideOtherSidebarContent = opts.hideOtherSidebarContent || CONFIG.hideOtherSidebarContent;
      CONFIG.namespace = opts.namespace || CONFIG.namespace;
      CONFIG.pathNamespaces = opts.pathNamespaces || CONFIG.pathNamespaces;
    }
    isAuto = CONFIG.paths === 'auto';

    hook.mounted(async function (_) {
      init$1(CONFIG, vm);
      if (!isAuto) await init(CONFIG, vm);
    });

    hook.doneEach(async function (_) {
      await update(CONFIG, vm);
    });
  };

  $docsify.plugins = [].concat(install, $docsify.plugins);

}());