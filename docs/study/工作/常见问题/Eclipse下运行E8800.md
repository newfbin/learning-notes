# 设置工作空间

## 编码

window -> preferences -> general -> work space

将其中的编码改为`utf-8`

![image-20250923100313805](./assets/Eclipse下运行E8800/image-20250923100313805.png)

## Java

### 添加新的jdk

window -> preferences -> java -> installed jres

点add

![image-20250923100443487](./assets/Eclipse下运行E8800/image-20250923100443487.png)

jre home 选择 jdk 的安装目录

![image-20250923100544983](./assets/Eclipse下运行E8800/image-20250923100544983.png)

选中新的jdk

![image-20250923100648737](./assets/Eclipse下运行E8800/image-20250923100648737.png)

### 设置Compiler

window -> preferences -> java -> installed jres

![image-20250923100930894](./assets/Eclipse下运行E8800/image-20250923100930894.png)

# 导入Java项目

## 从svn检出

首先新建一个文件夹，作为项目的工作空间

![image-20250923095204222](./assets/Eclipse下运行E8800/image-20250923095204222.png)

用Eclipse把这个新文件夹当作工作空间打开

![image-20250923095227614](./assets/Eclipse下运行E8800/image-20250923095227614.png)

接着点击导入项目

![image-20250923095330586](./assets/Eclipse下运行E8800/image-20250923095330586.png)

选择从SVN检出项目

![image-20250923095412710](./assets/Eclipse下运行E8800/image-20250923095412710.png)

填入或选择SVN地址

![image-20250923095713300](./assets/Eclipse下运行E8800/image-20250923095713300.png)

首先选择一个或多个Java项目

![image-20250923095851006](./assets/Eclipse下运行E8800/image-20250923095851006.png)

接着选择”作为工作空间中的项目检出“，然后点Finish

![image-20250923100014139](./assets/Eclipse下运行E8800/image-20250923100014139.png)



## 将项目转换为Java项目

右键项目目录，选择 `configure -> convert to faceted form`

![image-20250923101315730](./assets/Eclipse下运行E8800/image-20250923101315730.png)

> 如果找不到 `convert to faceted form`选项，右键项目目录，选择properties，再在project facets中进行配置

选择Java

![image-20250923101359460](./assets/Eclipse下运行E8800/image-20250923101359460.png)

# 导入Web项目

## 从svn检出

选择url

![image-20250923101957438](./assets/Eclipse下运行E8800/image-20250923101957438.png)

选择web项目

![image-20250923102036751](./assets/Eclipse下运行E8800/image-20250923102036751.png)

选择 "作为新项目检出" ，注意和Java项目不一样

![image-20250923103753892](./assets/Eclipse下运行E8800/image-20250923103753892.png)

选择Dynamic Web Project

![image-20250923103847516](./assets/Eclipse下运行E8800/image-20250923103847516.png)

填入项目名称，接着一路Next

![image-20250923104946238](./assets/Eclipse下运行E8800/image-20250923104946238.png)

将Content directory改为 `WebContent`，接着Finish

![image-20250923105013153](./assets/Eclipse下运行E8800/image-20250923105013153.png)







# 配置项目依赖

## 配置Java项目依赖

右键项目 -> build path -> configure build path

![image-20250923104253022](./assets/Eclipse下运行E8800/image-20250923104253022.png)

点击 Libraries -> Add Library

![image-20250923105258158](./assets/Eclipse下运行E8800/image-20250923105258158.png)

选择Web App Libraries

![image-20250923105331284](./assets/Eclipse下运行E8800/image-20250923105331284.png)

选择刚刚创建的Web项目，Finish

![image-20250923105356179](./assets/Eclipse下运行E8800/image-20250923105356179.png)







## 配置Web项目依赖

右键项目 -> build path -> configure build path

![image-20250923105522374](./assets/Eclipse下运行E8800/image-20250923105522374.png)

首先选择Source -> Link Source

![image-20250923105650760](./assets/Eclipse下运行E8800/image-20250923105650760.png)

点击Browse

![image-20250923105740429](./assets/Eclipse下运行E8800/image-20250923105740429.png)

选择Java项目的src目录

![image-20250923105823587](./assets/Eclipse下运行E8800/image-20250923105823587.png)

修改Folder name，Finish

![image-20250923110003933](./assets/Eclipse下运行E8800/image-20250923110003933.png)

接着点击Browse

![image-20250923110052850](./assets/Eclipse下运行E8800/image-20250923110052850.png)

选择WebContent

![image-20250923110200881](./assets/Eclipse下运行E8800/image-20250923110200881.png)

选择好后，在结尾填入 `/classes`

![image-20250923110227097](./assets/Eclipse下运行E8800/image-20250923110227097.png)

# 配置Tomcat服务器

点击蓝字

![image-20250923110519130](./assets/Eclipse下运行E8800/image-20250923110519130.png)

选择对应版本的tomcat

![image-20250923110557738](./assets/Eclipse下运行E8800/image-20250923110557738.png)

点击Browse

![image-20250923110627764](./assets/Eclipse下运行E8800/image-20250923110627764.png)

选择tomcat的安装目录，Finish

![image-20250923110656575](./assets/Eclipse下运行E8800/image-20250923110656575.png)

双击新添加的Tomcat

![image-20250923110742300](./assets/Eclipse下运行E8800/image-20250923110742300.png)

添加web模块

![image-20250923110919813](./assets/Eclipse下运行E8800/image-20250923110919813.png)