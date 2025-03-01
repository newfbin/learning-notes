

## 系统问题

### win 快捷键

> 仅记录不常见、不常用的快捷键

`Ctrl + Win + D`  创建虚拟桌面

`Ctrl + Win + F4` 删除当前虚拟桌面

`Ctrl + Win + 左方向键` `Ctrl + Win + 右方向键` 快捷切换桌面

`Win + D` 回到桌面

`Alt + Tab` 切换应用

### win 控制台运行jar包

```shell
java -jar .\user-center-backend-0.0.1-SNAPSHOT.jar --server.port=8081
```

### win 查找端口号并删除进程

要查找8080端口的pid号，那么在终端中输入netstat -ano | findstr 8080,找到LISTENING那一行，即可看到8080端口号的pid号为28808

![image.png](./assets/Windows/142eed77e01d4b3c9e3e790208b417edtplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

步骤3：通过pid号，杀死指定端口号的进程，释放端口

上一步骤我们查询到8080端口号的pid号为28808，那么我们可以通过这个pid号杀死8080端口的进程，释放8080端口。

终端中输入taskkill /f /pid 28808，按下回车，即可杀死进程，释放端口。

![image.png](./assets/Windows/9578f2bddad446458d01208af16a3d2atplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

除了通过taskkill /f /pid 28808命令杀死进程，我们还可以打开任务管理器，点击详细信息,找到指定pid的进程，点击结束任务，即可即可杀死进程，释放端口。

![image.png](./assets/Windows/36bb83579ac946c08805ce75e751580ftplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

> TCP    0.0.0.0:1099           0.0.0.0:0              LISTENING       5852  
> TCP    [::]:1099              [::]:0                 LISTENING       5852 
>
> 上面这段信息的含义:
>
> - **TCP**: 表明这是TCP协议的套接字。
> - **0.0.0.0:1099** 和 **[::]:1099**: 这两个地址和端口组合表明有一个服务在TCP的1099端口上进行监听。
>   其中`0.0.0.0:1099`表示在IPv4上所有接口监听，而`[::]:1099`表示在IPv6上所有接口监听。



---

### win11 选择一个应用以打开此xxx文件 里面有许多已经卸载的程序(如qt)

![image-20241104211536843](./assets/Windows/image-20241104211536843.png)

原因是程序没有卸载干净
打开注册表编辑器，之前我是qt没有卸载干净，打开方式里有很多xxx/xxx/qtcreator
ctrl+f，搜索，把包含qtcreator的项和文件夹全部删掉

删除之后问题解决：

![image-20241104212259022](./assets/Windows/image-20241104212259022.png)

### win更改磁盘大小，重新分配磁盘空间

#### 系统自带磁盘管理

> 缺点：功能单一

按Win + X键，选择磁盘管理

![image-20250220162952021](./assets/Windows/image-20250220162952021.png)

#### 使用第三方工具

可使用的工具有 “傲梅分区助手” “DiskGenius（未使用）”，均为免费强大的磁盘管理工具

### win 查看及导出目录结构

#### 一、查看目录结构

**目录窗口视图**

![img](./assets/Windows/1506816-20190626103856364-576972672.png)

##### 1. 查看目录结构（文件夹）

在当前要操作的文件夹目录下输入命令tree. 此时得到目录下树形的目录结构。默认情况下只显示“文件夹”而不显示文件。
![img](./assets/Windows/1506816-20190626102940619-826840517.png)

##### 2. 查看目录结构（包括文件）

在tree命令后面加入参数 /f 将以层次的结构显示所有文件夹及文件的名称。
![img](./assets/Windows/1506816-20190626103027559-1968296111.png)

#### 二、导出目录结构

将当前文件夹树形结构写入xxx.txt中

```powershell
tree /f >darknet.txt
保存的树形结构，只含有文件夹
tree /f >darknetf.txt
保存的树形结构，包含文件夹和文件
```

### win bat文本echo显示中文乱码处理方法

1.使用 UTF-8 编码：将 BAT 脚本保存为 UTF-8 编码格式，然后在命令行窗口中运行该脚本。

2.设置代码页：在 BAT 脚本开头添加代码页设置命令，例如：chcp 65001，其中 65001 是 UTF-8 的代码页。

3.使用第三方工具：使用第三方工具如 Notepad++ 等编辑器打开 BAT 脚本，在其中添加中文输出，然后保存为 UTF-8 编码格式并运行。

通过以上方法，您可以在 Windowss 中正确输出中文，避免乱码问题。

示例内容：

```shell
chcp 65001
@echo off
if “abc”==“ABC” (
echo 大小相等
) else (
echo 大小不等
)
```

### 右键文件夹打开IDEA

**一、问题描述**

已下载IDEA，但是右键打开之前保存的项目文件，无法显示以IDEA方式打开。

![img](./assets/Windows/be3a8be947372c29de379dedf11df73b.png)

**二、解决步骤**

1. 打开注册表

win+R键输入**regedit**

![img](./assets/Windows/473888dc930e40586e5e96a64c4bc3fd.png)

 2、查找路径为**计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell**

（我找了半天没看到Classes,建议直接粘贴粗体路径，回车就能定位到该路径下了）

![img](./assets/Windows/7a3fe4eef2db9db36af4257d01415034.png)

3、 右键shell，新建-项(K)，将新建的项文件名改为**JB_IDEA**

> JB全家桶的项文件名 建议都命名为 JB_xxx 的格式，这样JB全家桶的右键菜单选项都会集中在一起.
> 如果不按照JB_xxx的格式命名，各个软件的命名将不统一，右键菜单选项将会过于分散。
>
> ![image-20250108121832419](./assets/Windows/image-20250108121832419.png)

![image-20250108122004597](./assets/Windows/image-20250108122004597.png)

4、选中上一步新建的项IDEA，右键-新建-字符串值（S)，并改名为Icon

![image-20250108122031581](./assets/Windows/image-20250108122031581.png)

![image-20250108122119750](./assets/Windows/image-20250108122119750.png)

 5、修改“(默认)”的数据和“Icon”的数据

第一行“（默认）”的数据可以写**Open Folder as IDEA Project**

第二行“Icon”的数据是安装idea64.exe的路径,可以右键桌面的IDEA查询属性，在“目标”处查到该安装路径，如下图，将该路径粘贴到Icon的数值数据处

![img](./assets/Windows/41e28e070bebd1a10e4c359858561b45.png)

![image-20250108122210560](./assets/Windows/image-20250108122210560.png)

 6、添加 command 项,并添加值，数据为**"第5步的idea64.exe的路径""%1"**

![image-20250108122246493](./assets/Windows/image-20250108122246493.png)

**设置右键文件夹背景空白处打开 IDEA**

设置和前面类似, 但注册表位置改为 :

```bash
计算机\HKEY_CLASSES_ROOT\Directory\Background\shell\
```

### 解决bat文件运行结束后自动关闭窗口问题

#### 方法一：在cmd窗口运行脚本

1.在bat文件所在目录运行cmd

![image-20240919135311234](./assets/Windows/image-20240919135311234.png)

2.输入bat文件的名字，运行bat文件。脚本执行结束后，cmd窗口不会关闭，能够看到完整的信息

![image-20250301112746640](./assets/Windows/image-20250301112746640.png)

#### 方法二：在bat文件结尾加上 pause

1.在bat文件结尾加上pause

![image-20250301112340386](./assets/Windows/image-20250301112340386.png)

2.脚本执行结束后不会立即退出，而是需要按下一个按键才会退出

![image-20250301112518023](./assets/Windows/image-20250301112518023.png)

### 使用bat脚本或程序运行java程序中文乱码问题

#### bat脚本运行java程序

##### 问题描述：

在cmd窗口内运行jar包，不会出现中文乱码问题。

![image-20250301125343090](./assets/Windows/image-20250301125343090.png)

在bat脚本中写入java -jar命令并执行脚本。发现出现了中文乱码问题

![image-20250301130127602](./assets/Windows/image-20250301130127602.png)

![image-20250301130040578](./assets/Windows/image-20250301130040578.png)

##### 解决办法：

**统一终端、脚本、JVM 三者的编码环境**。

> 将三者的编码环境都统一为UTF-8或者其它编码格式，就不会出现乱码问题了。

###### 终端编码环境：

通过在脚本开头加上`chcp 65001` 将运行该脚本时的终端编码改为 UTF-8

![image-20250301131729068](./assets/Windows/image-20250301131729068.png)

###### 脚本编码环境：

保存脚本时要将脚本环境设置为 UTF-8

![image-20250301131832482](./assets/Windows/image-20250301131832482.png)

![image-20250301131908045](./assets/Windows/image-20250301131908045.png)

###### JVM编码环境：

通过在`java -jar` 命令中加上 `-Dfile.encoding=UTF-8` ，将JVM的编码换环境设置为 UTF-8。

![image-20250301132020534](./assets/Windows/image-20250301132020534.png)

#### 程序内运行java程序

##### 问题描述：

使用`Runtime.getRuntime.exec()`执行`java -cp <classpath> <main_class>` 命令时，

![image-20250301135214096](./assets/Windows/image-20250301135214096.png)

出现中文乱码

![image-20241224222534006](./assets/Windows/image-20241224222534006.png)

##### 解决办法：

加上`-Dfile.encoding=UTF-8`，乱码问题解决

![image-20241224222621786](./assets/Windows/image-20241224222621786.png)

在命令行中运行Java程序，可以通过指定`-Dfile.encoding=UTF-8`参数来设置文件编码。例如：

```bash
java -Dfile.encoding=UTF-8 -cp . Main
```

确保使用命令行运行时，控制台也支持UTF-8编码。

> 出现乱码的原因是，命令行终端的编码是 GBK，和 java 代码文件本身的编码 UTF-8 不一致，导致乱码。
>
> 也可以通过 `chcp` 命令查看命令行终端编码，GBK 是 936，UTF-8 是 65001。
>
> ![image-20250301113226885](./assets/Windows/image-20250301113226885.png)
>
> 但是 **不建议** 大家改变终端编码来解决编译乱码，因为其他运行你代码的人也要改变环境，兼容性很差。

## 软件问题

### Typora 无法打印中文字符

ctrl + . 即可改回中文输入状态输出中文符号

### 解决Typora字数过多造成卡顿现象

Typora字数过多的时候造成卡顿现象如何解决？

点击 、切换、滚动、打字都有点卡顿，下面介绍三种方法，三种方法都可以尝试，建议先尝试方法一，效果不满意就用方法二，实在不行就最后一个取巧的办法。

**方法1：在NVIDIA控制面板中配置typora，可以加速它渲染，这样他的字体就可以加速渲染，不至于太卡。**

![image-20240328054116346.png](./assets/Windows/f28a6789b3d28209327bffcd570576cb.png)
![8ad3b79e61803914f82b2cc9f34b9279.png](./assets/Windows/8fc8aa97db22294227f1dcd566e32786.png)

**2、方法二：禁用GPU，直接不给它渲染**

typora --> 文件 --> 偏好设置 --> 通用 --> 打开高级设置

![image-20240328055402331.png](./assets/Windows/7d59a6bcd869c422e75563b2c3d0e842.png)

![903d542fa6c280b1937dde16bc3683a8.png](./assets/Windows/3e9b2f6c92ccb9b0505636c1f9827075.png)

打开该json文件，有个"flags"健，原来值为空

```c++
"flags": []
```

改为如下代码。

```c++
"flags": [["disable-gpu"]]
```

禁用GPU之后，软件启动的时候比之前慢，但是打开之后不卡顿了，至少可以减少70%卡顿。

**3、方法三：由于Typora到达一定的字数就会出现卡顿，可以尝试将内容分开到多个文档单独编写，最后再放在一起，可以消除卡顿现象。**

**总结：**

当typora字数达到上万的时候，使用输入法打字和点击切换时就会异常的卡顿，因为typora会实时渲染页面，将拼音输入到页面上再渲染，所以就会异常卡顿，以上三种方法可以帮忙解决。

### 使用正则表达式查找替换Markdown文档的内容

使用IDEA或者VSCode打开Markdown文档，再在IDEA或VSCode中使用正则表达式进行查找替换



### npm换源

>--淘宝原镜像域名registry.npm.taobao.org于2024年1 月 22 日过期，新域名更换为https://registry.npmmirror.com
>
>--如果使用国外镜像，将梯子的TUN模式打开，下载速度也会加快

今天晚上想要将clone下来的项目进行npm install，但是等了半天都没动

查看源

```
npm config get registry
```

![img](./assets/Windows/798214-20190422224337416-1338236088.png)

或

```
npm config list
```

![img](./assets/Windows/798214-20190422224315882-669715731.png)

https://registry.npmjs.org/国外的节点

每次用npm的，因为走国外的镜像，非常的慢

通过改变默认npm镜像代理服务，可以大幅提升安装速度

方法：

1.命令行指定（临时）

```
npm --registry https://registry.npmmirror.com info underscore 
```

![img](./assets/Windows/798214-20190422225149617-936430460.png)

说明：

　　这种方式是在使用命令时，添加 --registry https://registry.npmmirror.com

　　如：

　　　　npm install express --registry=https://registry.npmmirror.com

　　　　安装express，使用淘宝源

2.通过config命令（长久）

```
npm config set registry https://registry.npmmirror.com
```

查看

![image-20240919160349168](./assets/Windows/image-20240919160349168.png)

```
npm info underscore
```

![img](./assets/Windows/798214-20190422225233914-371345377.png)

3.通过cnpm使用

　　cnpm 定制的命令行工具可以代替 `npm`

```
npm install -g cnpm --registry=https://registry.npmmirror.com
```

使用cnpm

```
npm info underscore
```

 ![img](./assets/Windows/798214-20190422225736328-2054337309.png)

```
cnpm install xxx
```

eg:

　　cnpm install express

![img](./assets/Windows/798214-20190422225930842-1026590741.png)

 修改了镜像源，安装就非常快了

###  vue-cli创建项目选择yarn或者npm的问题


使用vue-cli创建项目的时候，用以下命令：

```bat
vue create [projectName]
```

首次创建的时候，会让你选择创建工具，yarn和npm其中一个
![在这里插入图片描述](./assets/Windows/cfb90726341e77ac78f862eb63480647.png)
如果你选择了 Use Yarn，那么会保存一个配置文件在C盘的用户目录下，比如我的C:\Users\Administrator\下会有一个文件.vuerc
你选择创建工具后，会将选择的参数保存在.vuerc中。如果我们想更改创建工具，那就修改.vuerc文件。

```yml
{
  "useTaobaoRegistry": false,
  "packageManager": "npm"
}
```

修改 “packageManager”: "npm"就可以了，比如改成 “packageManager”: “yarn”

当然，你可以将.vuerc文件删掉，然后创建的时候，又重新让你选择创建工具了。

### 修改Yarn的全局安装和缓存位置，节省C盘空间提升速度

在CMD命令行中执行

**1.改变 yarn 全局安装位置**

```shell
$ yarn config  set global-folder "你的磁盘路径"
```

```bash
$  yarn config  set global-folder"D:\tools\yarn\Data\global"
# 这是我的路径
```

然后你会在你的用户目录找到 `.yarnrc` 的文件，打开它，找到 `global-folder` ，改为 `--global-folder`

![image-20241224002256268](./assets/Windows/image-20241224002256268.png)

**2.改变 yarn 缓存位置**

```shell
#yarn config set cache-folder "你的磁盘路径"
#这里是我的路径
#在我们使用 全局安装包的时候，会在 "D:\tools\yarn\global" 下 生成 node_modules\.bin 目录
$  yarn config set cache-folder "D:\tools\yarn\Cache"
```

我们需要将 D:\Software\yarn\global\node_modules.bin 整个目录 添加到系统环境变量中去，否则通过yarn 添加的全局包 在cmd 中是找不到的。

检查当前yarn 的 bin的 位置

```shell
$  yarn global bin
```

检查当前 yarn 的 全局安装位置

```shell
$ yarn global dir
```

检查当前 yarn 的 缓存位置

```bash
$ yarn cache dir
```



### 判断游戏是否为p2p联机

如果房间总共两个人，你和你的朋友其中有一个人是0延迟，都不是0延迟就是steam服务器。

### 蒲公英组网总结

#### 0.前言

##### 此教程适用场景

由于贝瑞蒲公英免费版每个账号只有三个组网名额，因此在组网人数小于等于3时可以参考此教程，实现免费组网。

![image-20250103174009241](./assets/Windows/image-20250103174009241-1735897603056-1.png)

![image-20250103174056772](./assets/Windows/image-20250103174056772-1735897603056-2.png)

##### 如何分辨p2p游戏

如果整个游戏房间只有房主一个人不卡，房间中的其他人都有很高延迟，说明该游戏为p2p游戏。（如饥荒，胡闹厨房2）

#### 1.注册账号

在需要组网的人中，**"组网发起者"**在贝锐蒲公英官网（https://pgy.oray.com/）注册一个账号。注册完成后将自动进入**管理平台**界面：

![image-20250103170115120](./assets/Windows/image-20250103170115120-1735897603056-3.png)

每次注册或登录后都会自动进入**管理平台**界面。
若不想通过注册和登录的方式进入**管理平台**界面，需要在贝锐蒲公英官网（https://pgy.oray.com/）网页的头部，找到“管理平台”并进入。如下图：

![image-20250103170743188](./assets/Windows/image-20250103170743188-1735897603056-4.png)

#### 2.下载客户端：蒲公英游戏版

在贝锐蒲公英官网（https://pgy.oray.com/）首页的顶部，点击“个人”，再点击“联机游戏”，如下图：
![image-20250103170912590](./assets/Windows/image-20250103170912590-1735897603056-5.png)

随后在跳转到的页面中，选择对应的版本下载即可：
![image-20240711204634871](./assets/Windows/image-20240711204634871-1735897603056-6.png)

#### 3.组网发起者修改密码

**"组网发起者"**（即注册者）进入**贝锐官网（https://www.oray.com/）**（注意：与贝锐蒲公英官网网址不同），点击右上角头像，点击“账号管理”：

![image-20250103171116001](./assets/Windows/image-20250103171116001-1735897603056-7.png)

在新页面中，点击“账号密码”旁边的“设置”：

![image-20250103171433976](./assets/Windows/image-20250103171433976-1735897603056-8.png)

在新页面中进行验证码验证：

![image-20250103171346227](./assets/Windows/image-20250103171346227-1735897603056-9.png)

在新页面中设置密码：

> 在下文中将此处设置的密码称为**公共密码**，后面会将公共密码分享给所有要组网的人。
> **"组网发起者"切记不要将该密码设置为自己常用的密码**。

![image-20240711205755738](./assets/Windows/image-20240711205755738-1735897603057-10.png)

#### 4.组网参与者登录"组网发起者"的账号：

首先**"组网发起者"**进入**贝瑞蒲公英管理平台**中，自己的账号复制下来

![image-20250103171957546](./assets/Windows/image-20250103171957546-1735897603057-11.png)

将这个**账号**和**公共密码**发送给所有要参与组网的人，然后**每个人都在蒲公英游戏版中输入"组网发起者"的账号和公共密码** ：

![image-20240711210501205](./assets/Windows/image-20240711210501205-1735897603057-12.png)

登陆成功后，每个人都可以看到与自己组网的成员。

![image-20240711210717190](./assets/Windows/image-20240711210717190-1735897603057-13.png)

双击自己之外的成员，可以ping这个成员。但是此时是ping不通的，会出现如下结果：

![image-20240711211118779](./assets/Windows/image-20240711211118779-1735897603057-14.png)

#### 5.解决成员之间不能ping通的方法：关闭防火墙

接下来需要关闭**所有组网成员**的防火墙，首先点击下图所示位置：

![image-20250103172253201](./assets/Windows/image-20250103172253201-1735897603057-15.png)

在展开的任务中，点击**Windowss安全中心**图标：

![image-20250103172347565](./assets/Windows/image-20250103172347565-1735897603057-16.png)

在Windowss安全中心中，点击**防火墙和网络保护**

![image-20250103172432104](./assets/Windows/image-20250103172432104-1735897603057-17.png)

点击**公用网络**

![image-20250103172459543](./assets/Windows/image-20250103172459543-1735897603057-18.png)

关闭防火墙（所有组网成员都要关闭）：

![image-20250103172617249](./assets/Windows/image-20250103172617249-1735897603057-19.png)

所有人都关闭防火墙之后，再尝试在蒲公英游戏版中ping其他成员：

![IMG_20240711_213324](./assets/Windows/IMG_20240711_213324-1735897603057-20.png)

得到该成员的回复，说明ping通了。当所有成员之间都能ping通时，就可以进行p2p游戏、局域网游戏、或者访问成员的电脑上的内容：

![image-20240711213424183](./assets/Windows/image-20240711213424183.png)

### 将网页制作为chm文件

> 原文地址：https://blog.csdn.net/crazywoniu/article/details/54976281

所需软件：TelePortUltra、EasyCHM

这里以制作 https://qufei1993.github.io/nextjs-learn-cn 为例

#### 1. Teleport下载网页

由于上面的网页需要外网才能访问，所以需要现在Teleport Ultra中配置代理。

![image-20250120220558703](./assets/Windows/image-20250120220558703.png)

![image-20250120220621578](./assets/Windows/image-20250120220621578.png)

先利用第一个软件将网页全部现在下来。步骤如下：

首先选择新建项目向导

![image-20250120170050689](./assets/Windows/image-20250120170050689.png)

然后，弹出对话框，我们选择第二项"复制一个网站，包含该网站的目录结构"，然后单击"下一步"。

![image-20250120170134656](./assets/Windows/image-20250120170134656.png)

然后，我们输入地址:http://www.w3school.com.cn，链接层数默认3层即可，单击"下一步"。

![image-20250120170217663](./assets/Windows/image-20250120170217663.png)

然后选择第四项"所有文件"，因为这个网站不用注册用户，所以下面的用户名和密码留空即可，单击"下一步"。

![image-20250120170230650](./assets/Windows/image-20250120170230650.png)

此时，向导对话框提示恭喜！，项目就已经创建好了，单击"完成"按钮，左边栏里面会出现我们建好的项目。

![image-20250120170247364](./assets/Windows/image-20250120170247364.png)

这时候，系统会弹出对话框询问我们项目保存在哪里，此时自己新建一个文件夹用于保存要下载的网页文件和项目即可。项目格式为.tpu和这个文件同目录下会建立一个和项目同名的文件夹，具体文件会保存在这个文件夹内。

![image-20250120170302606](./assets/Windows/image-20250120170302606.png)

好了，现在我们单击工具栏中蓝色三角符号的运行按钮，项目就开始下载了，这个时候会从我们指定的网站下载所有的页面到本地。

![image-20250120165931176](./assets/Windows/image-20250120165931176.png)

这时候我们需要耐心等待下载完毕即可，如果我们下载了一部分不想继续下载了，我们可以单击工具栏的方框，方框背景为白色，这个是"停止"按钮。

![image-20250120165914641](./assets/Windows/image-20250120165914641.png)

停止后，系统弹出提示，一共下载了多少文件，这些文件已经保存到我们本地，我们单击"确定"。

![image-20250120165856016](./assets/Windows/image-20250120165856016.png)

这个时候我们打开相应的文件夹，会找到很多网页文件，可以用浏览器打开index.htm看一下首页，如下图所示:

![image-20250120170547916](./assets/Windows/image-20250120170547916.png)

![image-20250120170601829](./assets/Windows/image-20250120170601829.png)

#### 2. EasyCHM编译.CHM文件（暂未成功，有中文乱码、脚本不能执行、样式和网页样式不一样的问题）

好了，到这里网站就已经下载完毕了，我们接下来进行第二步就是编译成.CHM文件了。

下载好Easy CHM后，我们安装好双击打开，打开主界面后单击工具栏的新建按钮，新建一个项目。

![image-20250120170907554](./assets/Windows/image-20250120170907554.png)

这时候弹出窗口，询问我们要编译的文件位置，我们选好刚才下载下来的项目文件夹下的 `qufei1993` 文件夹即可，单击"确定"按钮。

![image-20250120171756363](./assets/Windows/image-20250120171756363.png)

 这时候会让我们指定新工程目录，根据需要自己选择就行了，然后文件类型下拉菜单要选择 `*.*` 意思是所有格式的文件，然后包括所有的子目录前面打上勾，单击"确定"按钮。

![image-20250120171939667](./assets/Windows/image-20250120171939667.png)

 然后会搜索文件，搜索完毕后，可以查看源文件和预览，也可以看到网站结构，确认无误后，我们单击"编译"按钮。

![img](./assets/Windows/Center-1737361773278-71.png)

然后弹出对话框，我们设置好CHM的标题，其他默认就可以，如果需要我们首先单击"CHM设置"，设置完毕后单击"应用"按钮，都确认好了，单击"生成CHM"按钮即可开始生成。看下图:

![img](./assets/Windows/Center-1737361773278-72.png)

我们耐心等待文件输出完毕，然后保存项目并关闭Easy CHM后打开我们刚才编译好的CHM文件目录，双击打开www.w3school.com.cn.CHM文件，就可以查看啦。

![img](./assets/Windows/Center-1737361773278-73.png)

![img](./assets/Windows/Center-1737361773278-74.png)

到这里我们的.CHM文件就制作完毕了，过程虽然有点长，但实际很简单，可以如果有好的网站教程想要离线查看可以试一试。

### 浏览器中在线代码编辑器光标错位

![image-20250219103931590](./assets/Windows/image-20250219103931590.png)

关闭所有浏览器插件后，再逐个打开浏览器插件。最终排查到该现象产生是因为这个浏览器插件。
将该插件关闭后问题解决。

![image-20250219104030810](./assets/Windows/image-20250219104030810.png)

![image-20250219105504963](./assets/Windows/image-20250219105504963.png)

### 浏览器快捷翻译

原本使用浏览器的翻译功能，需要先右键，再找到“翻译成中文”选项。最耗时的步骤就是找“翻译成中文”选项这一步

**解决方式**：

先点击右键，再按 T 键，就触发翻译功能了。（目前找到的最快捷的翻译方式）

### 快捷键打开QQ和微信

#### 为QQ设置快捷键

![image-20250302111455383](./assets/Windows/image-20250302111455383.png)

![image-20250302111551535](./assets/Windows/image-20250302111551535.png)

### 为微信设置快捷键

![image-20250302110833349](./assets/Windows/image-20250302110833349.png)