![logo](./assets/_coverpage/happy-link-1740296531593-1.jpeg)

# Link博客

### newfbin的学习笔记

> 真正的奖励，是沿途斩断的每一丛荆棘

点击切换主题

<div class="demo-theme-preview">
  <a data-theme="vue">活力</a>
  <a data-theme="buble">简约</a>
  <a data-theme="dark">黑夜</a>
</div>

<style>
  .demo-theme-preview a {
    padding-right: 10px;
  }

  .demo-theme-preview a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>

<script>
  var preview = Docsify.dom.find('.demo-theme-preview');
  var themes = Docsify.dom.findAll('[rel="stylesheet"]');

  preview.onclick = function (e) {
    console.log("成功监听到点击事件")
    var title = e.target.getAttribute('data-theme')

​    themes.forEach(function (theme) {
​      theme.disabled = theme.title !== title
​    });
  };
</script>

* 😀💻🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛😶
* 😶💻🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧😪
* 😪👀😎😟😤💪💪💪💻🌕🌗🌑🌞😪😴

[开始阅读](/study/README)
[GitHub](https://github.com/newfbin)