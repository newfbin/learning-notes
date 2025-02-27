## IntelliJ IDEA

### IDEA检查项目的jdk版本需要看的地方

> 1、检查项目结构，如下图所示选择即可

![在这里插入图片描述](./assets/IDE配置/be2b5a1e9fd8bcc6361a35c3e56fdf90.png)

> 选择了之后打开了如下界面：
> 下面的三张图全部都要检查选择jdk8的版本 

![在这里插入图片描述](./assets/IDE配置/6e89d85fbcc38656d45829ba5bcb2e0b.png)

![在这里插入图片描述](./assets/IDE配置/753178c4ef8bb4834892e1c86f79d41e.png)

![在这里插入图片描述](./assets/IDE配置/46da3df86943cbf73e3a1696a632647f.png)

------

> 2、进入设置，如下所示：

![在这里插入图片描述](./assets/IDE配置/55a82cff6621fabe2abd8bf2b69d5411.png)

> 进入之后，根据下图，挨个选择，将改项目模块的二进制码版本也选择成jdk1.8

![在这里插入图片描述](./assets/IDE配置/46d05bb23db2d0694131e7c15ae35310.png)

> 在pom文件中检查java版本

![image-20240902211453793](./assets/IDE配置/image-20240902211453793.png)

### 使IDEA注释不顶格

1、进入 Settings -> Editor -> Code Style -> Java ，
2、在右边选择 “Code Generation” 

![image-20240906135734029](./assets/IDE配置/image-20240906135734029.png)3、然后找到 Comment Code 那块，把Line comment at first column和
Block comment at first column 去掉前面两个的复选框
![在这里插入图片描述](./assets/IDE配置/f08b95c334e873f00af0c23092a2569e.png)

其它类型文件也可以通过这种方式实现“注释不顶格”。

![image-20240906135837052](./assets/IDE配置/image-20240906135837052.png)

### 修改IDEA快捷键

依次点击 File –> settings 或者 Ctrl + Alt + S –> Keymap，在右侧Keymap中下拉选择自己喜欢的快捷键方式，如下图
![这里写图片描述](./assets/IDE配置/SouthEast.png)

也可以修改某一个快捷键，如下图
![图1](./assets/IDE配置/SouthEast-1726711621349-1.png)

可以在搜索框中搜索自己需要的功能，我需要的是将关闭标签页的ctrl + F4 修改为 ctrl + W

![image-20240919100915613](./assets/IDE配置/image-20240919100915613.png)

### 导出导入IDEA配置

![image-20241122214235211](./assets/IDE配置/image-20241122214235211.png)

导出的配置可以在其它的JetBrains产品使用

### IDEA全局查找替换

Ctrl + Shift + F 全局查找

Ctrl + Shift + R 全局替换

### IDEA自动 import 和 移除 类

> 在下面的两个可勾选项中，**On the fly**” 是一个英语短语，意思是 **即时地**、**动态地** 或 **随时随地** 完成某项任务，而无需事先停止或准备。

![image-20241229211233111](./assets/IDE配置/image-20241229211233111.png)

### IDEA同时管理多个可运行模块 / 底部添加services仪表盘

> 底部添加services仪表盘 就是 让IDEA同时管理多个可运行模块 的解决方案

按 Alt + 8 快捷键即可调出services仪表盘 

![image-20241231002126708](./assets/IDE配置/image-20241231002126708.png)

### IDEA配置代理（暂时需要验证）

> IDEA配置代理的想法来源：
>
> - 在之前使用Docker时，发现就算在服务器上开启了代理也不能让Docker使用docker search 和 docker pull等命令，需要为Docker配置代理才可以。
> - 而IDEA也有类似的情况：电脑上开了代理，IDEA有时候push也会失败，plugins market有时也会加载不出来插件市场的插件，需要开启Clash的TUN模式才能解决（**TUN 模式**模拟了一个虚拟网卡，能够接管系统的所有流量），因此我猜测IDEA并没有走代理，需要额外配置才能被代理接管

![image-20241231010322113](./assets/IDE配置/image-20241231010322113.png)

### 使用IDEA自定义代码片段

####  1. 打开IDEA，点击 `Settings`，选择 `Live Templates`。

![在这里插入图片描述](./assets/IDE配置/e8d03efdd04c8d5006789f82406e5fda.png)

#### 2. 点击 `Add`，选择 `2 Template Group`。

![在这里插入图片描述](./assets/IDE配置/6836f8f7c6e9467bebb14bde9d611e51.png)

#### 3. 输入自定义的 `Group Name`，点击 `OK`。

![在这里插入图片描述](./assets/IDE配置/7784beeb72aa236ccca5b61a342f4701.png)

#### 4. 选中自定义组，点击 `Add`，选择 `Live Template`。

![在这里插入图片描述](./assets/IDE配置/1e0fecde10ad40e127b85bdfb746f684.png)

#### 5. 添加自定义头注释：

- `Abbreviation` 输入 `hh`（根据个人习惯设置快捷键）。

- `Template text` 输入你喜欢的模板，例如：

  ```java
  /*
   * Copyright(C) [2023] [com.company]
   *
   * Author: [name]
   * Email: [email]
   *
   * This software is provided by the copyright owner under the terms of the license agreement.
   * Unauthorized use of this software is strictly prohibited.
   *
   * This software is provided under an open-source license without any express or implied warranties.
   * For details, please refer to the license file.
   */
  ```

- `Expand with` 选择 `Enter`。

- 点击 `Apply`。
  ![在这里插入图片描述](./assets/IDE配置/b800967d7f892959bde5a14872d0d520.png)

### IDEA快捷键折叠/展开代码

**Ctrl + Shift + 减号**：折叠所有代码

所有代码被折叠

![image-20250118235413800](./assets/IDE配置/image-20250118235413800.png)

**Ctrl + Shift + 加号**：展开所有代码

所有代码被展开

![image-20250118235528097](./assets/IDE配置/image-20250118235528097.png)

## WebStorm

### WebStorm快捷键Prettier格式化代码

![image-20241219160201529](./assets/IDE配置/image-20241219160201529.png)

## GoLand

## PyCharm

## VSCode

### 创建自定义代码片段

1. **打开用户代码片段设置：**

   - 在 VSCode 中，按下 `Ctrl+Shift+P`（或 `Cmd+Shift+P`），调出命令面板。
   - 输入 `Snippets: Configure Snippets`后按回车。在新展示的内容中，选择
     ![image-20250102165129172](./assets/IDE配置/image-20250102165129172.png)
   - 在弹出的列表中，选择您所使用的编程语言（例如 `javascript`）。

2. **添加自定义代码片段：**

   - 在打开的代码片段文件中，添加以下内容：

     ```json
     {
       "document.getElementById": {
         "prefix": "did",
         "body": "document.getElementById('$1')",
         "description": "Insert document.getElementById"
       }
     }
     ```

   - 上述配置中，`prefix` 是触发补全的关键字，
     `body` 是插入的代码内容，
     `$1` 表示光标的初始位置（如果片段中有多个占位符，例如 `$1` 和 `$2`，按 `Tab` 键可以依次跳转到这些位置，逐个编辑内容。），
     `description` 是对该片段的描述。

3. **保存并使用：**

   - 保存代码片段文件。
   - 在 JavaScript 文件中，输入 `did`，然后按下 `Tab` 键，VSCode 将自动补全为 `document.getElementById('')`，并将光标定位在引号内，方便您直接输入元素的 ID。

### 自定义快捷键

![image-20250102170935941](./assets/IDE配置/image-20250102170935941.png)

搜索想要进行配置快捷键的功能

![image-20250102170959084](./assets/IDE配置/image-20250102170959084.png)

## VisualStudio

### VisualStudio2022设置快捷键

点击工具->选项，

![在这里插入图片描述](./assets/IDE配置/cb8c1b2af61376bff7cc19b467b0c487.png)

选择环境->键盘即进入到设置快捷键的界面，

![在这里插入图片描述](./assets/IDE配置/86f30599e597b5a1500f0e1e39ff6edb.png)

应用 VSCode 的键盘方案，VisualStudio和VSCode有了相同的快捷键

![image-20250225212710349](./assets/IDE配置/image-20250225212710349.png)

### VisualStudio2022快捷键总结

#### 快速生成属性 -- Ctrl R, Ctrl E

将鼠标光标放在要生成属性这一行，按下快捷键生成该字段的属性。

![image-20250227083536889](./assets/IDE配置/image-20250227083536889.png)

选中多个字段并按快捷键

![image-20250227083601455](./assets/IDE配置/image-20250227083601455.png)

![image-20250227083719146](./assets/IDE配置/image-20250227083719146.png)