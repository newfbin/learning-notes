 * [导读](/study/README.md) 
 * [首页](/) 
 * aaa
   * <div class="demo-theme-preview">
       <a data-theme="vue">vue.css</a>
       <a data-theme="buble">buble.css</a>
       <a data-theme="dark">dark.css</a>
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

