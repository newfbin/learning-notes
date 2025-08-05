> 原文地址：https://blog.csdn.net/u014779536/article/details/115877335

##  1. 什么是SVN？

### 版本控制：

它可以记录每一次文件和目录的修改情况，这样就可以借此将数据恢复到以前的版本，并可以查看数据的更改细节！

![image-20210419210536116](./assets/SVN入门/881c3e38b629291eb56d5baf1bcfbd4b.png)

Subversion（简称SVN）是一个自由开源的版本控制系统。在Subversion管理下，文件和目录可以超越时空。

### 常用的版本控制工具：

![image-20210419210641313](./assets/SVN入门/12b54fcb2c42664a4cccf05c43879cc9.png)

**http://subversion.apache.org/**

![image-20210419210822304](./assets/SVN入门/157baa8942a001fd1f8be37b439e586b.png)

### SVN的优势

**统一的版本号**

Subversion下，任何一次提交都会对所有文件增加到同一个新版本号，即使是提交并不涉及的文件，版本号相同的文件构成软件的一个版本。

**原子提交**

一次提交不管是单个还是多个文件，都是作为一个整体提交的。在这当中发生的意外例如传输中断，不会引起数据库的不完整和数据损坏。

**多级管理系统**

超级管理员：对所有配置库具有完全权限。

目录管理员：目录管理员可对指定的目录/SVN库进行权限管理。

普通用户：可以查看用户名、查看权限设置、修改自己密码。

**一致的数据操作**

Subversion用一个二进制差异算法描述文件的变化，对于文本（可读）和二进制（不可读）文件其操作方式是一致的。这两种类型的文件压缩存储在版本库中，而差异信息则在网络上双向传递。

**简单、易操作**

SVN对中文支持好，操作简单，使用没有难度，使用界面统一，功能完善，操作方便。

## 2. 搭建VisualSVN Server服务器

**集中式代码管理的核心是SVN服务器：**

![image-20210419211207135](./assets/SVN入门/053b4cf69177e59138b8434c70f8ade7.png)

**SVN服务端：Subversion和VisualSVN Server**

因为如果直接使用Subversion，那么在Windows系统上，要想让它随系统启动，就要封装SVN Server为windws service，还要通过修改配置文件来控制用户权限，另外如果要想以Web方式htp协议访问，一般还要安装配置Apache，如果是新手，岂不是很头痛？

而VisualSVN Serve集成了Subversion和Apache，省去了以上所有的麻烦。

**下载地址：**

https://www.visualsvn.com/server/

![image-20210419211432114](./assets/SVN入门/c854a950e4001ffddfc61d6fd9f90965.png)

**安装图解：**

- 下载

![image-20210419211653209](./assets/SVN入门/90c77757caa76e7df2f2a219ab3c6c75.png)

- 双击安装：

![image-20210419212312181](./assets/SVN入门/cca218f672a517ebce5176a970a24c12.png)

![image-20210419212322379](./assets/SVN入门/2d09a8708606c0946e141f1b872cb0f0.png)

![image-20210419212334607](./assets/SVN入门/96379f55dd356f76d998613beb248af5.png)

- 设置仓库地址、端口

![image-20210419212444508](./assets/SVN入门/de080525b8ec66ca5bcc4af7227241f3.png)

![image-20210419212457472](./assets/SVN入门/efb0409436de0f73b133bf15ba4a776f.png)

- 安装完成

![image-20210419212519229](./assets/SVN入门/49c0911a6bb0a0f8a5b1c005bbb5ec45.png)

## 3. SVN服务器创建仓库与用户

- VisualSVN Server Manager 主界面

![image-20210419212608235](./assets/SVN入门/dfc41afe32baee14f8d144907480866a.png)

### 3.1 创建仓库

![image-20210419213725822](./assets/SVN入门/810df630b4654b8d04244a7eafef33fd.png)

![image-20210419213811827](./assets/SVN入门/263c2b980680dcf12c5cda46eeed1ed8.png)

![image-20210419213951759](./assets/SVN入门/a9e8e0a14f7de7ae25e5275cf1687f40.png)

- 这里选择仓库类型
  - 类型1：空仓库
  - ![image-20210419214537454](./assets/SVN入门/ebf12c595f0edb9eacbf5d6775e73eeb.png)
  - 类型2：主分支-分支-标签
  - ![image-20210419214448404](./assets/SVN入门/f47e4330faa70706e86999d3d53c5e05.png)
- 访问权限设置
  - ![image-20210419214055926](./assets/SVN入门/9a2e03cbfc871f6f257a9b59dafa77ec.png)

![image-20210419214107007](./assets/SVN入门/7dd1e65ae2117ef48bfa2921da73c6b8.png)

- 创建完成

![image-20210419214737024](./assets/SVN入门/b5413ce0b9194c80b2b4a53a14f80f32.png)

### 3.2 SVN标准目录结构

- trunk是主分支，是日常开发进行的地方。
- branches是分支。一些阶段性的release版本，这些版本是可以继续进行开发和维护的，则放在branches目录中。又比如为不同用户客制化的版本，也可以放在分支中进行开发。
- tags目录一般是只读的，这里存储阶段性的发布版本，只是作为一个里程碑的版本进行存档。

### 3.3 创建用户

**创建user1、user2两个用户**

- 创建user1（密码`123456`）

![image-20210419215113106](./assets/SVN入门/da86ba0d105d609bcf19681d40465700.png)

![image-20210419215216577](./assets/SVN入门/8eed5f652c86415bfa8785c22a50cb77.png)

- 创建user2（密码`123456`）

![image-20210419215248025](./assets/SVN入门/6854476dce7862c5f2a93fd19ed10adc.png)

- 重设密码

![image-20210419215347634](./assets/SVN入门/3a2cf167abf6bc1fbe083d6f3509aaf7.png)

### 3.4 修改仓库权限

- 右键仓库，属性

![image-20210419215506975](./assets/SVN入门/48f087919f111fd2ce3c994a1265d3bc.png)

![image-20210419215649905](./assets/SVN入门/60d9a3137da91c6e58d74d730bcda840.png)

## 4. 安装TortoiseSVN客户端

![image-20210419215849713](./assets/SVN入门/4f616cffaa71ade6853a4ca6f703d412.png)

TortoiseSVN是Subversion版本控制系统的一个优秀的免费开源客户端。

**官方网址：** [Home · TortoiseSVN](https://tortoisesvn.net/)

![image-20210419220012898](./assets/SVN入门/a3414483d619c55e69f754d3bf45fafc.png)

**下载地址：**

[Downloads · TortoiseSVN](https://tortoisesvn.net/downloads.html)

![image-20210419220106524](./assets/SVN入门/97d9f92d4d79783b25009bfdfdfd9215.png)

**安装图解：**

![image-20210419220214442](./assets/SVN入门/3347fe7922e81c4c047b7c9e3df9b5c8.png)

**一路next：**

![image-20210419220241042](./assets/SVN入门/a30774e2fb08eaf543320d14dbb2b489.png)

**安装成功后、右键单击、可出现SVN菜单：**

![image-20210419220328009](./assets/SVN入门/b24e67e48d89770c377d24f74f8a8691.png)

**汉化：**

![image-20210419220418753](./assets/SVN入门/15b7c1626902c66057968903686f65ca.png)

## 5. 使用Checkout检出仓库代码

**查看仓库地址：**

![image-20210419220631139](./assets/SVN入门/de7e9ab9bc7c37e3aba1b0858a1216f4.png)

**右键 -> SVN Checkout…**

![image-20210419220537832](./assets/SVN入门/3c42b7c17fa16893994abff0e4c99f61.png)

**查看本机IP：**

![image-20210419220724682](./assets/SVN入门/e424b45bc61ea13befe9efc370d487d5.png)

**检出rep1仓库：**

![image-20210419220811284](./assets/SVN入门/32490c3ebd8a7a11e1d223a5143afbad.png)

**接受证书：**

![image-20210419220831558](./assets/SVN入门/11c96c9d95d05261078ee3b3eada7f4c.png)

**输入用户名和密码，并保存认证：**

![image-20210419220854838](./assets/SVN入门/f041e7ec09df716599c8d4dddc66a98f.png)

**成功检出到本地：**

![image-20210419220923167](./assets/SVN入门/ac2091803b65a37612d377c990b37efb.png)

![image-20210419220911653](./assets/SVN入门/5d0d4dc33878e08890ee189532abcc8c.png)

![image-20210419221400306](./assets/SVN入门/47011eb0f24263236c09cede59aba8b6.png)

## 6. 添加文件、修改文件

### 6.1 添加文件

**在rep1文件夹下新建1.txt并保存**

![image-20210419221548363](./assets/SVN入门/48e57f88be96689b2c9846621326985b.png)

**右键 -> 增加 ：将文件加入版本管理**

![image-20210419221727699](./assets/SVN入门/133d308e4c45404d806d76b76a5058c9.png)

![image-20210419221734922](./assets/SVN入门/d1c97a68484127c080b0ffffb24b87cd.png)

![image-20210419221807231](./assets/SVN入门/cb58cdafe7e9a9c200fe71c07f492634.png)

**增加成功后，文件上面多了一个 ＋ 号**

![image-20210419221832005](./assets/SVN入门/51415442c0b86170efac1b8fd954ce98.png)

**右键 -> 提交，写上备注**

![image-20210419221940374](./assets/SVN入门/6024add8afe92861e6da25f6ff3f8d6b.png)

![image-20210419221957030](./assets/SVN入门/fc7f9e2ab78cd1b8eb25347a2b47aa19.png)

![image-20210419222004286](./assets/SVN入门/99e4f6d5a64efa7eae8624faf274d5f9.png)

**提交成功后，文件上多了一个 “✓” 号**

![image-20210419222043018](./assets/SVN入门/c76df33f58db89ad9e7142b009cfcde6.png)

### 6.2 查看日志

**TortoiseSVN -> 显示日志**

![image-20210419222141240](./assets/SVN入门/07cf4b62a7953c1dc56205c83b119cbe.png)

**可以看到新增日志：**

![image-20210419222207836](./assets/SVN入门/7419e7a097e435d272427574625d53b0.png)

**服务器上可以看到文件：**

![image-20210419222359527](./assets/SVN入门/edc9b06c55421f19ec89774e0a153a0a.png)

**在新的地方更新目录：**

![image-20210419222543239](./assets/SVN入门/4e14c8c4e6f09644962f7d9dc84b5356.png)

![image-20210419222558267](./assets/SVN入门/2959f1523c50f8f86df3d79440147a16.png)

### 6.3 修改文件

**修改文件并保存，文件图标变为红色感叹号**

![image-20210419222714195](./assets/SVN入门/5e0ac39413b3ea6c7cc1c4c9a1186b88.png)

**提交修改：**

![image-20210419222738407](./assets/SVN入门/5e418c4c383e59f6d0732dbf9bdbbe07.png)

**填写备注：**

![image-20210419222807394](./assets/SVN入门/7fc38803c40678434f41224a0caab461.png)

**提交完成：**

![image-20210419222838115](./assets/SVN入门/93e88e3b65fa3aa91a912f0367c98acb.png)

**查看日志**

![image-20210419222856872](./assets/SVN入门/2610833ff7bb592b5fc69df17a005f25.png)

**双击日志，可以显示出和上个版本的区别：**

![image-20210419223211471](./assets/SVN入门/b3aa47e3c00b80915af72659ce67ffb2.png)

![image-20210419223225770](./assets/SVN入门/91a70642a562ed1f8dc003657cca8fb2.png)

**去查看另一个仓库，发现没有更新**

![image-20210419222937212](./assets/SVN入门/14decc78178dc5b364d9d7b07a8ef210.png)

**更新：**

![image-20210419222959071](./assets/SVN入门/74f08ee58792c4e1ff9c034a199f5a03.png)

**打开，发现已经同步：**

![image-20210419223019778](./assets/SVN入门/a3234a02a0151f5f4580f96b86dba906.png)

## 7. 版本回滚

**在rep1文件夹下打开1.txt，修改如下，此刻文件出现“！”号**

![image-20210419223405121](./assets/SVN入门/88363279f9d328c17d1d6659cba22f77.png)

**如果你没有提交，那么直接删除此文件，然后 更新 即可， 发现文件回复了，并且为“✓”号。**

![image-20210419223525078](./assets/SVN入门/fcf33dc1bf5669c6ab0ce7ac2d57efd6.png)

**如果你已经提交了，且有日志记录**

![image-20210419223732823](./assets/SVN入门/8410453c47ef3e8df89328e541734333.png)

**那么就使用回滚**

![image-20210419223906531](./assets/SVN入门/100a095a515dc5053f804b76a6e515a8.png)

**1.查看版本 2.选择版本 3.确定**

![image-20210419223952662](./assets/SVN入门/75e8cb9f72167feb67bf97e2805f4834.png)

![image-20210419224006935](./assets/SVN入门/bc004530034894558dacc4dd2156a737.png)

**注意：再次更新，会恢复到最新，提交的记录无法删除！！！**

![image-20210419224329969](./assets/SVN入门/0b904c292c013db2f5f905d3b98c3536.png)

**这样才能表示历史记录可追溯：**

![image-20210419224407512](./assets/SVN入门/211b970bdbb02c616e2ebf90828fb9cf.png)

## 8. 删除文件

**新建2.txt，并提交**

![img](./assets/SVN入门/d7502e858bdfd959f92f5ce538a97948.png)

![image-20210419224541227](./assets/SVN入门/06e3447f5dbbff44fd8c6b0d69a398d7.png)

**TortoiseSVN -> 删除，此时文件会消失**

![image-20210419224642459](./assets/SVN入门/d50c202fd01bce79649093960a9071a7.png)

**提交删除：**

![image-20210419224810215](./assets/SVN入门/d7d6db02c234eb40386605245e6e0848.png)

![image-20210419224829662](./assets/SVN入门/574e3a0091e653a6eb5923f568cb4d2a.png)

## 9. 解决冲突

### 9.1 产生冲突的情况？

当开发人员A和开发人员B从版本库同时检出文档1.txt，而A和B同事修改了1.txt的同一个地方，先提交的不会有任何问题，后提交的一方会在提交的时候产生冲突。

![image-20210419225206583](./assets/SVN入门/e6a3d42cabcbcc3172534a816aab0007.png)

**A修改并提交：**

![image-20210419225303448](./assets/SVN入门/666d4bcf9fe38497b7b1ae4d5848421c.png)

**B 修改并提交：**

![image-20210419225338567](./assets/SVN入门/ba0f3180e166bc7bb5cc4b4f9c7155f0.png)

![image-20210419225400395](./assets/SVN入门/9bd1e24d2b95ef09db8d3c0ad2f9a035.png)

![image-20210419225419546](./assets/SVN入门/8355428b0198e125091f2022c64dc76c.png)

![image-20210419225447737](./assets/SVN入门/5a3cc80cbd2522369df7a7dbd96bc39a.png)

![image-20210419225501186](./assets/SVN入门/aee0a8505960b2dfdd5857c8ddb881f5.png)

**冲突会导致提交失败，并自动返回：**

![image-20210419225546595](./assets/SVN入门/a2f7d07908c9e06f63ea720ec22beaa0.png)

### 9.2 解决冲突

**产生冲突的目录编程这样了，文件出现黄色的感叹号：**

![image-20210419225722502](./assets/SVN入门/36279f4086e68895c56826a5f92de18f.png)

**右键 -> TortoiseSVN -> 编辑冲突**

![image-20210419225825571](./assets/SVN入门/4527d720fb20014c268fa124c3baf368.png)

![image-20210419225834901](./assets/SVN入门/795fc4136eac7cc1b95390d05195c916.png)

**先删除掉问号：**

![image-20210419230019102](./assets/SVN入门/8cc0e64781bad5a6fbcd65edef9cdc78.png)

**拷贝到合并后的文件：**

![image-20210419230100514](./assets/SVN入门/6934b7e975b8df94b4d2a018414de7d9.png)

**保存：**

![image-20210419230129874](./assets/SVN入门/514661677232edffc06a9acc1b887697.png)

**黄色的感叹号消失：**

![image-20210419230154718](./assets/SVN入门/e76791fbd55a7d286e0251197586c11d.png)

**文件修改已经合并：**

![image-20210419230214499](./assets/SVN入门/7d18e722871f6385df2e74ea70e080f8.png)

**重新提交：**

![image-20210419230253487](./assets/SVN入门/dc00395db9221f1618932c2800129b8e.png)

## 10. 创建分支

**什么是分支？**

在版本控制的系统中，我们经常需要对开发周期中的单独生命线作单独的修改，这条单独的开发生命线就可以称为Branches即分支。分支经常用于添加新的功能以及产品发布后的bug修复等，这样可以不影响主要的产品开发线以及避免编译错误等。当我们添加的新功能完成后可以将其合并到主干中。

### 10.1 创建分支

**TortoiseSVN -> 分支/标记**

![image-20210419230458187](./assets/SVN入门/a4eb4b8497e451e40fc07755135c1d6b.png)

**创建分支：**

- 1.源路径
- 2.分支路径
- 3.备注
- 4.版本

![image-20210419230805724](./assets/SVN入门/f4c6ef7aa17311eca791c1c853f8aed6.png)

![image-20210419230728123](./assets/SVN入门/1d8fd86f2dfa711ae7a948dea6f7c1ba.png)

**创建成功：**

![image-20210419230828622](./assets/SVN入门/2b3f1cfb98fd28fae2288a1604147aaa.png)

**服务器上也出现了：**

![image-20210419230902254](./assets/SVN入门/0c899c5022a7f16b895fe35d7280ed48.png)

**在分支中添加文件：**

![image-20210419230932759](./assets/SVN入门/6e94e9d5da8ba9be9fc696608a1e0d2a.png)

### 10.2 合并分支

**TortoiseSVN -> 合并**

![image-20210419231033738](./assets/SVN入门/8a1628b48beab310274e4c3b6c12c5d6.png)

![image-20210419231153992](./assets/SVN入门/1b772f3a84879911c7af95c6e04c2c2d.png)

**选择合并源：**

![image-20210419231233407](./assets/SVN入门/af16b7549fefb2e60696938bf3067034.png)

![image-20210419231245053](./assets/SVN入门/94b232820e4c961b00f095cc83452594.png)

**合并完成：**

![image-20210419231302691](./assets/SVN入门/24818c73c1577f07a50c9c44f51156c5.png)

**文件被合并到了trunk中**

![image-20210419231324182](./assets/SVN入门/4b8d087ff8394581dc83317feffea1c1.png)

**提交分支点合并到主分支**

![img](./assets/SVN入门/4b8d087ff8394581dc83317feffea1c1.png)

![image-20210419231451586](./assets/SVN入门/0883686df2dc49000bae6cf58dd642cd.png)

![image-20210419231458452](./assets/SVN入门/c4b1c91b207c184770f80c21c32b774a.png)

**查看日志：**

![image-20210419231528112](./assets/SVN入门/54f5fcab30744d0f56f4bb35a214496c.png)