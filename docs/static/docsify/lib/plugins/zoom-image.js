(function () {
  /*! medium-zoom 1.0.8 | MIT License | https://github.com/francoischalifour/medium-zoom */
  var _extends = Object.assign || function (target) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
      var source = arguments$1[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var isSupported = function isSupported(node) {
    return node.tagName === 'IMG';
  };

  /* eslint-disable-next-line no-prototype-builtins */
  var isNodeList = function isNodeList(selector) {
    return NodeList.prototype.isPrototypeOf(selector);
  };

  var isNode = function isNode(selector) {
    return selector && selector.nodeType === 1;
  };

  var isSvg = function isSvg(image) {
    var source = image.currentSrc || image.src;
    return source.substr(-4).toLowerCase() === '.svg';
  };

  var getImagesFromSelector = function getImagesFromSelector(selector) {
    try {
      if (Array.isArray(selector)) {
        return selector.filter(isSupported);
      }

      if (isNodeList(selector)) {
        // Do not use spread operator or Array.from() for IE support
        return [].slice.call(selector).filter(isSupported);
      }

      if (isNode(selector)) {
        return [selector].filter(isSupported);
      }

      if (typeof selector === 'string') {
        // Do not use spread operator or Array.from() for IE support
        return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
      }

      return [];
    } catch (err) {
      throw new TypeError('The provided selector is invalid.\n' + 'Expects a CSS selector, a Node element, a NodeList or an array.\n' + 'See: https://github.com/francoischalifour/medium-zoom');
    }
  };

  var createOverlay = function createOverlay(background) {
    var overlay = document.createElement('div');
    overlay.classList.add('medium-zoom-overlay');
    overlay.style.background = background;

    return overlay;
  };

  var cloneTarget = function cloneTarget(template) {
    var _template$getBounding = template.getBoundingClientRect(),
        top = _template$getBounding.top,
        left = _template$getBounding.left,
        width = _template$getBounding.width,
        height = _template$getBounding.height;

    var clone = template.cloneNode();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

    clone.removeAttribute('id');
    clone.style.position = 'absolute';
    clone.style.top = top + scrollTop + 'px';
    clone.style.left = left + scrollLeft + 'px';
    clone.style.width = width + 'px';
    clone.style.height = height + 'px';
    clone.style.transform = '';
    clone.style.transition = 'transform 0.1s ease'; // 优化过渡效果

    return clone;
  };

  var createCustomEvent = function createCustomEvent(type, params) {
    var eventParams = _extends({
      bubbles: false,
      cancelable: false,
      detail: undefined
    }, params);

    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(type, eventParams);
    }

    var customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);

    return customEvent;
  };

  var mediumZoom = function mediumZoom(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    /**
     * Ensure the compatibility with IE11 if no Promise polyfill are used.
     */
    var Promise = window.Promise || function Promise(fn) {
      function noop() {}
      fn(noop, noop);
    };

    // 新增：拖动和缩放相关变量
    var drag = {
      isDragging: false,
      startX: 0,
      startY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    };

    var _handleClick = function _handleClick(event) {
      var target = event.target;

      if (target === overlay) {
        close();
        return;
      }

      if (images.indexOf(target) === -1) {
        return;
      }

      toggle({ target: target });
    };

    var _handleScroll = function _handleScroll() {
      if (isAnimating || !active.original) {
        return;
      }

      var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
        setTimeout(close, 150);
      }
    };

    var _handleKeyUp = function _handleKeyUp(event) {
      var key = event.key || event.keyCode;

      // Close if escape key is pressed
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        close();
      }
    };

    // 新增：处理鼠标滚轮缩放（修改为全局监听）
    var _handleWheel = function _handleWheel(event) {
      if (!active.zoomed || isAnimating) return;
      
      event.preventDefault();
      
      // 计算缩放增量（向上滚动放大，向下滚动缩小）
      var delta = event.deltaY > 0 ? -0.1 : 0.1;
      var newScale = drag.scale + delta;
      
      // 限制缩放范围（0.5 到 5 倍）
      newScale = Math.max(0.5, Math.min(5, newScale));
      
      // ========== 核心修改1：基于图片中心缩放 ==========
      // 获取图片当前的边界矩形
      var rect = active.zoomed.getBoundingClientRect();
      // 计算图片中心坐标
      var imgCenterX = rect.left + rect.width / 2;
      var imgCenterY = rect.top + rect.height / 2;
      
      // 计算缩放比例变化
      var scaleRatio = newScale / drag.scale;
      
      // 调整偏移量，保证缩放后图片中心位置不变
      drag.translateX = (drag.translateX - (imgCenterX - window.innerWidth / 2)) * scaleRatio + (imgCenterX - window.innerWidth / 2);
      drag.translateY = (drag.translateY - (imgCenterY - window.innerHeight / 2)) * scaleRatio + (imgCenterY - window.innerHeight / 2);
      
      drag.scale = newScale;
      
      // 应用变换
      _applyTransform();
    };

    // 新增：处理鼠标按下（开始拖动）
    var _handleMouseDown = function _handleMouseDown(event) {
      if (!active.zoomed || isAnimating) return;
      
      event.preventDefault();
      drag.isDragging = true;
      
      // ========== 核心修改2：记录鼠标初始位置 ==========
      drag.startX = event.clientX;
      drag.startY = event.clientY;
      
      // 添加临时样式，提升拖动体验
      active.zoomed.style.cursor = 'grabbing';
      if (active.zoomedHd) {
        active.zoomedHd.style.cursor = 'grabbing';
      }
      
      // 绑定移动和松开事件
      document.addEventListener('mousemove', _handleMouseMove);
      document.addEventListener('mouseup', _handleMouseUp);
      document.addEventListener('mouseleave', _handleMouseUp);
    };

    // 新增：处理鼠标移动（拖动中）
    var _handleMouseMove = function _handleMouseMove(event) {
      if (!drag.isDragging || !active.zoomed) return;
      
      event.preventDefault();
      
      // ========== 核心修改3：1:1跟随鼠标拖动 ==========
      // 计算鼠标移动的差值
      var deltaX = event.clientX - drag.startX;
      var deltaY = event.clientY - drag.startY;
      
      // 直接更新偏移量，实现1:1跟随
      drag.translateX += deltaX;
      drag.translateY += deltaY;
      
      // 更新起始位置，用于下一次计算
      drag.startX = event.clientX;
      drag.startY = event.clientY;
      
      // 应用变换
      _applyTransform();
    };

    // 新增：处理鼠标松开（结束拖动）
    var _handleMouseUp = function _handleMouseUp() {
      drag.isDragging = false;
      
      // 恢复光标样式
      if (active.zoomed) {
        active.zoomed.style.cursor = 'zoom-out';
      }
      if (active.zoomedHd) {
        active.zoomedHd.style.cursor = 'zoom-out';
      }
      
      // 解绑事件
      document.removeEventListener('mousemove', _handleMouseMove);
      document.removeEventListener('mouseup', _handleMouseUp);
      document.removeEventListener('mouseleave', _handleMouseUp);
    };

    // 新增：应用变换到图片
    var _applyTransform = function _applyTransform() {
      if (!active.zoomed) return;
      
      // 应用变换：先缩放后平移（保持正确的变换顺序）
      var transform = 'scale(' + drag.scale + ') translate3d(' + drag.translateX + 'px, ' + drag.translateY + 'px, 0)';
      
      active.zoomed.style.transform = transform;
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };

    // 新增：重置拖动和缩放状态
    var _resetDragState = function _resetDragState() {
      drag = {
        isDragging: false,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0,
        scale: 1
      };
    };

    var update = function update() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var newOptions = options;

      if (options.background) {
        overlay.style.background = options.background;
      }

      if (options.container && options.container instanceof Object) {
        newOptions.container = _extends({}, zoomOptions.container, options.container);
      }

      if (options.template) {
        var template = isNode(options.template) ? options.template : document.querySelector(options.template);

        newOptions.template = template;
      }

      zoomOptions = _extends({}, zoomOptions, newOptions);

      images.forEach(function (image) {
        image.dispatchEvent(createCustomEvent('medium-zoom:update', {
          detail: { zoom: zoom }
        }));
      });

      return zoom;
    };

    var clone = function clone() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return mediumZoom(_extends({}, zoomOptions, options));
    };

    var attach = function attach() {
      var arguments$1 = arguments;

      for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
        selectors[_key] = arguments$1[_key];
      }

      var newImages = selectors.reduce(function (imagesAccumulator, currentSelector) {
        return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
      }, []);

      newImages.filter(function (newImage) {
        return images.indexOf(newImage) === -1;
      }).forEach(function (newImage) {
        images.push(newImage);
        newImage.classList.add('medium-zoom-image');
      });

      eventListeners.forEach(function (_ref) {
        var type = _ref.type,
            listener = _ref.listener,
            options = _ref.options;

        newImages.forEach(function (image) {
          image.addEventListener(type, listener, options);
        });
      });

      return zoom;
    };

    var detach = function detach() {
      var arguments$1 = arguments;

      for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        selectors[_key2] = arguments$1[_key2];
      }

      if (active.zoomed) {
        close();
      }

      var imagesToDetach = selectors.length > 0 ? selectors.reduce(function (imagesAccumulator, currentSelector) {
        return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
      }, []) : images;

      imagesToDetach.forEach(function (image) {
        image.classList.remove('medium-zoom-image');
        image.dispatchEvent(createCustomEvent('medium-zoom:detach', {
          detail: { zoom: zoom }
        }));
      });

      images = images.filter(function (image) {
        return imagesToDetach.indexOf(image) === -1;
      });

      return zoom;
    };

    var on = function on(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      images.forEach(function (image) {
        image.addEventListener('medium-zoom:' + type, listener, options);
      });

      eventListeners.push({ type: 'medium-zoom:' + type, listener: listener, options: options });

      return zoom;
    };

    var off = function off(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      images.forEach(function (image) {
        image.removeEventListener('medium-zoom:' + type, listener, options);
      });

      eventListeners = eventListeners.filter(function (eventListener) {
        return !(eventListener.type === 'medium-zoom:' + type && eventListener.listener.toString() === listener.toString());
      });

      return zoom;
    };

    var open = function open() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          target = _ref2.target;

      var _animate = function _animate() {
        var container = {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        };
        var viewportWidth = void 0;
        var viewportHeight = void 0;

        if (zoomOptions.container) {
          if (zoomOptions.container instanceof Object) {
            // The container is given as an object with properties like width, height, left, top
            container = _extends({}, container, zoomOptions.container);

            // We need to adjust custom options like container.right or container.bottom
            viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
            viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
          } else {
            // The container is given as an element
            var zoomContainer = isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container);

            var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(),
                _width = _zoomContainer$getBou.width,
                _height = _zoomContainer$getBou.height,
                _left = _zoomContainer$getBou.left,
                _top = _zoomContainer$getBou.top;

            container = _extends({}, container, {
              width: _width,
              height: _height,
              left: _left,
              top: _top
            });
          }
        }

        viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
        viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;

        var zoomTarget = active.zoomedHd || active.original;
        var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
        var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;

        var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(),
            top = _zoomTarget$getBoundi.top,
            left = _zoomTarget$getBoundi.left,
            width = _zoomTarget$getBoundi.width,
            height = _zoomTarget$getBoundi.height;

        var scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
        var scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
        var scale = Math.min(scaleX, scaleY);
        var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
        var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
        
        // 初始化拖动和缩放状态
        drag.scale = scale;
        drag.translateX = translateX;
        drag.translateY = translateY;

        // ========== 修正变换顺序：先缩放后平移 ==========
        var transform = 'scale(' + scale + ') translate3d(' + translateX + 'px, ' + translateY + 'px, 0)';

        active.zoomed.style.transform = transform;

        if (active.zoomedHd) {
          active.zoomedHd.style.transform = transform;
        }
        
        // 修改：将滚轮事件绑定到document，实现全局滚轮缩放
        document.addEventListener('wheel', _handleWheel, { passive: false });
        // 保留图片的拖动事件绑定
        active.zoomed.addEventListener('mousedown', _handleMouseDown);
        if (active.zoomedHd) {
          active.zoomedHd.addEventListener('mousedown', _handleMouseDown);
        }
      };

      return new Promise(function (resolve) {
        if (target && images.indexOf(target) === -1) {
          resolve(zoom);
          return;
        }

        var _handleOpenEnd = function _handleOpenEnd() {
          isAnimating = false;
          active.zoomed.removeEventListener('transitionend', _handleOpenEnd);
          active.original.dispatchEvent(createCustomEvent('medium-zoom:opened', {
            detail: { zoom: zoom }
          }));

          resolve(zoom);
        };

        if (active.zoomed) {
          resolve(zoom);
          return;
        }

        if (target) {
          // The zoom was triggered manually via a click
          active.original = target;
        } else if (images.length > 0) {
          var _images = images;
          active.original = _images[0];
        } else {
          resolve(zoom);
          return;
        }

        active.original.dispatchEvent(createCustomEvent('medium-zoom:open', {
          detail: { zoom: zoom }
        }));

        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        isAnimating = true;
        active.zoomed = cloneTarget(active.original);

        document.body.appendChild(overlay);

        if (zoomOptions.template) {
          var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
          active.template = document.createElement('div');
          active.template.appendChild(template.content.cloneNode(true));

          document.body.appendChild(active.template);
        }

        // If the selected <img> tag is inside a <picture> tag, set the
        // currently-applied source as the cloned `src=` attribute.
        // (as these might differ, or src= might be unset in some cases)
        if (active.original.parentElement && active.original.parentElement.tagName === 'PICTURE' && active.original.currentSrc) {
          active.zoomed.src = active.original.currentSrc;
        }

        document.body.appendChild(active.zoomed);

        window.requestAnimationFrame(function () {
          document.body.classList.add('medium-zoom--opened');
        });

        active.original.classList.add('medium-zoom-image--hidden');
        active.zoomed.classList.add('medium-zoom-image--opened');

        // 修改：移除图片的点击关闭事件，只保留遮罩层关闭
        // active.zoomed.addEventListener('click', close);
        active.zoomed.addEventListener('transitionend', _handleOpenEnd);

        if (active.original.getAttribute('data-zoom-src')) {
          active.zoomedHd = active.zoomed.cloneNode();

          // Reset the `scrset` property or the HD image won't load.
          active.zoomedHd.removeAttribute('srcset');
          active.zoomedHd.removeAttribute('sizes');
          // Remove loading attribute so the browser can load the image normally
          active.zoomedHd.removeAttribute('loading');

          active.zoomedHd.src = active.zoomed.getAttribute('data-zoom-src');

          active.zoomedHd.onerror = function () {
            clearInterval(getZoomTargetSize);
            console.warn('Unable to reach the zoom image target ' + active.zoomedHd.src);
            active.zoomedHd = null;
            _animate();
          };

          // We need to access the natural size of the full HD
          // target as fast as possible to compute the animation.
          var getZoomTargetSize = setInterval(function () {
            if ( active.zoomedHd.complete) {
              clearInterval(getZoomTargetSize);
              active.zoomedHd.classList.add('medium-zoom-image--opened');
              // 修改：移除HD图片的点击关闭事件
              // active.zoomedHd.addEventListener('click', close);
              document.body.appendChild(active.zoomedHd);
              _animate();
            }
          }, 10);
        } else if (active.original.hasAttribute('srcset')) {
          // If an image has a `srcset` attribuet, we don't know the dimensions of the
          // zoomed (HD) image (like when `data-zoom-src` is specified).
          // Therefore the approach is quite similar.
          active.zoomedHd = active.zoomed.cloneNode();

          // Resetting the sizes attribute tells the browser to load the
          // image best fitting the current viewport size, respecting the `srcset`.
          active.zoomedHd.removeAttribute('sizes');

          // In Firefox, the `loading` attribute needs to be set to `eager` (default
          // value) for the load event to be fired.
          active.zoomedHd.removeAttribute('loading');

          // Wait for the load event of the hd image. This will fire if the image
          // is already cached.
          var loadEventListener = active.zoomedHd.addEventListener('load', function () {
            active.zoomedHd.removeEventListener('load', loadEventListener);
            active.zoomedHd.classList.add('medium-zoom-image--opened');
            // 修改：移除HD图片的点击关闭事件
            // active.zoomedHd.addEventListener('click', close);
            document.body.appendChild(active.zoomedHd);
            _animate();
          });
        } else {
          _animate();
        }
      });
    };

    var close = function close() {
      return new Promise(function (resolve) {
        if (isAnimating || !active.original) {
          resolve(zoom);
          return;
        }

        var _handleCloseEnd = function _handleCloseEnd() {
          active.original.classList.remove('medium-zoom-image--hidden');
          document.body.removeChild(active.zoomed);
          if (active.zoomedHd) {
            document.body.removeChild(active.zoomedHd);
          }
          document.body.removeChild(overlay);
          active.zoomed.classList.remove('medium-zoom-image--opened');
          if (active.template) {
            document.body.removeChild(active.template);
          }

          // 修改：解绑全局滚轮事件
          document.removeEventListener('wheel', _handleWheel);
          // 解绑拖动事件
          active.zoomed.removeEventListener('mousedown', _handleMouseDown);
          if (active.zoomedHd) {
            active.zoomedHd.removeEventListener('mousedown', _handleMouseDown);
          }

          isAnimating = false;
          active.zoomed.removeEventListener('transitionend', _handleCloseEnd);

          active.original.dispatchEvent(createCustomEvent('medium-zoom:closed', {
            detail: { zoom: zoom }
          }));

          // 重置拖动状态
          _resetDragState();
          
          active.original = null;
          active.zoomed = null;
          active.zoomedHd = null;
          active.template = null;

          resolve(zoom);
        };

        isAnimating = true;
        document.body.classList.remove('medium-zoom--opened');
        active.zoomed.style.transform = '';

        if (active.zoomedHd) {
          active.zoomedHd.style.transform = '';
        }

        // Fade out the template so it's not too abrupt
        if (active.template) {
          active.template.style.transition = 'opacity 150ms';
          active.template.style.opacity = 0;
        }

        active.original.dispatchEvent(createCustomEvent('medium-zoom:close', {
          detail: { zoom: zoom }
        }));

        active.zoomed.addEventListener('transitionend', _handleCloseEnd);
      });
    };

    var toggle = function toggle() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          target = _ref3.target;

      if (active.original) {
        return close();
      }

      return open({ target: target });
    };

    var getOptions = function getOptions() {
      return zoomOptions;
    };

    var getImages = function getImages() {
      return images;
    };

    var getZoomedImage = function getZoomedImage() {
      return active.original;
    };

    var images = [];
    var eventListeners = [];
    var isAnimating = false;
    var scrollTop = 0;
    var zoomOptions = options;
    var active = {
      original: null,
      zoomed: null,
      zoomedHd: null,
      template: null

      // If the selector is omitted, it's replaced by the options
    };if (Object.prototype.toString.call(selector) === '[object Object]') {
      zoomOptions = selector;
    } else if (selector || typeof selector === 'string' // to process empty string as a selector
    ) {
        attach(selector);
      }

    // Apply the default option values
    zoomOptions = _extends({
      margin: 0,
      background: '#fff',
      scrollOffset: 40,
      container: null,
      template: null
    }, zoomOptions);

    var overlay = createOverlay(zoomOptions.background);

    document.addEventListener('click', _handleClick);
    document.addEventListener('keyup', _handleKeyUp);
    document.addEventListener('scroll', _handleScroll);
    window.addEventListener('resize', close);

    var zoom = {
      open: open,
      close: close,
      toggle: toggle,
      update: update,
      clone: clone,
      attach: attach,
      detach: detach,
      on: on,
      off: off,
      getOptions: getOptions,
      getImages: getImages,
      getZoomedImage: getZoomedImage
    };

    return zoom;
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) { ref = {}; }
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:grab;cursor:zoom-out;will-change:transform;z-index:9999}";
  styleInject(css);

  /* eslint-disable no-unused-vars */

  var matchesSelector =
    Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.msMatchesSelector;

  function install(hook) {
    var zoom;

    hook.doneEach(function (_) {
      var elms = Array.apply(
        null,
        document.querySelectorAll(
          '.markdown-section img:not(.emoji):not([data-no-zoom])'
        )
      );

      elms = elms.filter(function (elm) { return matchesSelector.call(elm, 'a img') === false; });

      if (zoom) {
        zoom.detach();
      }

      zoom = mediumZoom(elms);
    });
  }

  $docsify.plugins = [].concat(install, $docsify.plugins);

}());