## next start报错 sh: next: command not found


背景: 使用宝塔面板在云服务器部署next项目时报错：`sh: next: command not found`

当遇到 `sh: next: command not found` 错误时，通常意味着Next.js的命令行工具没有在当前系统的PATH中。解决这个问题的步骤如下：

1. **确认Node.js和npm安装**：首先确认你的系统中已经安装了Node.js和npm。你可以通过在终端中运行 `node -v` 和 `npm -v` 来检查它们的版本。

2. 安装Next.js

   ：如果你还没有安装Next.js，可以使用npm或yarn来安装。在项目目录中运行以下命令：

   ```bash
   npm install next react react-dom
   ```

   或者

   ```bash
   yarn add next react react-dom
   ```

3. 添加Next.js到PATH

   ：在大多数Unix-like系统中，你可以通过以下命令将Next.js添加到你的PATH环境变量中：

   ```bash
   export PATH=$PATH:/path/to/your/node_modules/.bin
   ```

   这里，

   ```
   /path/to/your/node_modules
   ```

   是你项目中 `node_modules`目录的路径。

   添加完成后重启服务器（使用 `source /etc/profile` 也可能使环境变量生效）

   重启后宝塔面板中成功启动next项目

   ![image-20250304004205436](./assets/Next.js拓展/image-20250304004205436.png)