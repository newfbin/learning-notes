## 第6章 React UI组件库

### 6.1 简介

**material-ui(国外)**

1. [官网](http://www.material-ui.com/#/): http://www.material-ui.com/#/
2. [github](https://github.com/callemall/material-ui): https://github.com/callemall/material-ui

**ant-design(国内蚂蚁金服)**

1. [官网](https://ant.design/index-cn): https://ant.design/index-cn
2. [Github](https://github.com/ant-design/ant-design/): https://github.com/ant-design/ant-design/
3. 不是所有场景都使用，最适用于**后台管理系统**

### 6.2 使用

安装依赖:`npm install antd`
引入样式（不太合理，引入了全部组件的样式，应该**按需引入**）

```jsx
import '../node_modules/antd/dist/antd.css'
```

引入库：

```jsx
import { Button,DatePicker } from 'antd';
import {WechatOutlined,WeiboOutlined,SearchOutlined} from '@ant-design/icons'
```

学会查看官网文档
其他UI组件库：element ui、vant等

### 6.3 按需引入和自定义主题

**重点：** 学会查看[文档](https://ant.design/docs/react/use-with-create-react-app-cn)（3.x文档更清楚，且适用于4.x）

1. 安装依赖：`yarn add react-app-rewired customize-cra babel-plugin-import less less-loader`
2. 修改package.json

```jsx
"scripts": {
	"start": "react-app-rewired start",
	"build": "react-app-rewired build",
	"test": "react-app-rewired test",
	"eject": "react-scripts eject"
},
```

3. 根目录下创建config-overrides.js

```jsx
//配置具体的修改规则
const { override, fixBabelImports,addLessLoader} = require('customize-cra');
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		lessOptions:{
			jsxEnabled: true,
			modifyVars: { '@primary-color': 'green' },
		}
	}),
);
```

4. 备注：不用在组件里亲自引入样式了，即：`import 'antd/dist/antd.css'`应该删掉

