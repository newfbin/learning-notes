# 从SVN拉取项目

首先创建一个文件夹，文件夹的名字可以随意取，该文件夹会作为项目的根目录

![image-20251113164553859](./assets/IDEA下运行E8800/image-20251113164553859.png)

## 拉取Web项目

按照下图中的步骤检出website项目

![image-20251113165155367](./assets/IDEA下运行E8800/image-20251113165155367.png)

检出完成后，项目根目录下会出现`src`和`WebContent`两个文件夹

![image-20251113165405790](./assets/IDEA下运行E8800/image-20251113165405790.png)

## 拉取Java项目

按照下图中的步骤检出Java项目

![image-20251113165843952](./assets/IDEA下运行E8800/image-20251113165843952.png)

检出完成后，项目根目录下会出现Java项目文件夹

![image-20251113170753035](./assets/IDEA下运行E8800/image-20251113170753035.png)

# 使用IDEA打开并配置项目



## IDEA打开项目

按照下面的步骤用IDEA打开文件夹

> 也可以先打开IDEA，然后再选择 `file -> open`，找到项目根目录并打开

![image-20251113171109581](./assets/IDEA下运行E8800/image-20251113171109581.png)

## IDEA配置项目

### 修改Compiler

Ctrl + Alt + S 打开设置界面，点击`Build，Exception，Deployment -> Compiler -> Java Compiler`

接着按下图步骤进行配置

![image-20251113172446542](./assets/IDEA下运行E8800/image-20251113172446542.png)

### 修改jdk

Ctrl + Alt + Shift + S 打开项目配置界面，将SDK更改为jdk1.8

![image-20251113172550967](./assets/IDEA下运行E8800/image-20251113172550967.png)

### 配置Web模块

Ctrl + Alt + Shift + S 打开项目配置界面，点击Facets -> 加号 -> Web -> 项目根目录 -> OK

![image-20251113172800929](./assets/IDEA下运行E8800/image-20251113172800929.png)

![image-20251113172857671](./assets/IDEA下运行E8800/image-20251113172857671.png)

接着按照下图配置

![image-20251113173257384](./assets/IDEA下运行E8800/image-20251113173257384.png)

最后按照下图，将Output path设置为`WebContent\WEB-INF\classes`

![image-20251113173724904](./assets/IDEA下运行E8800/image-20251113173724904.png)

### 配置Java程序模块

按照下图步骤导入Java程序模块

![image-20251113173437806](./assets/IDEA下运行E8800/image-20251113173437806.png)

![image-20251113173543013](./assets/IDEA下运行E8800/image-20251113173543013.png)

![image-20251113173612163](./assets/IDEA下运行E8800/image-20251113173612163.png)

导入Java模块之后需要进行配置：

将Output path改为`WebContent\WEB-INF\classes`

![image-20251113192114969](./assets/IDEA下运行E8800/image-20251113192114969.png)



![image-20251113192257270](./assets/IDEA下运行E8800/image-20251113192257270.png)

![image-20251113192429834](./assets/IDEA下运行E8800/image-20251113192429834.png)

![image-20251113192836116](./assets/IDEA下运行E8800/image-20251113192836116.png)

![image-20251113192911557](./assets/IDEA下运行E8800/image-20251113192911557.png)

![image-20251113192957295](./assets/IDEA下运行E8800/image-20251113192957295.png)

![image-20251113193041922](./assets/IDEA下运行E8800/image-20251113193041922.png)



### 配置tomcat

