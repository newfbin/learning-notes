### Linux查看并关闭端口

查看端口

```undefined
netstat -tunlp
```

![img](./assets/Linux/d6303e38b1dca96eefb4034cefd50ba7.png)

查看某端口

```perl
netstat -tunlp|grep 6379
```

![img](./assets/Linux/f6d5777b45a8835ea98c4861654a85e9.png)

杀死进程

```cobol
kill -9 2970
```

![img](./assets/Linux/23de3493cbe64a5954aa74fbebca6691.png)

### Linux 下进入含空格的目录（以及文件夹名开头为括号）

```bash
[root@zhang ~]# cd my document
```

cd 一个含空格的目录，会被视为俩个目录，而有优先进入第一个目录（如果两个目录都存在的话）：

**使用单引号**

```bash
[root@zhang ]# cd 'my document'
```

**对空格转义**

```bash
[root@zhang ~]# cd my\ document
```

在第一个单词之后按下 tab 键也是一样的处理方法，即对空格进行转义；

**使用 * 进行匹配**

```bash
[root@zhang ~]# cd my*document
```

**对于文件夹名开头为`(`的情况**

同样，要么使用单引号，要么使用`\`，进行转义；

### Centos服务器部署Clash

#### 0.部署完成后，每次重启服务器应该做的事

> 每次重启服务器，重启Clash后，都应执行这段命令
> 可以通过在/etc/profile中,将以下变量追加到PATH变量中，这样就不用频繁执行下面命令。但为了防止clash代理挂掉，需要再次修改配置文件中的PATH变量，就没有将以下命令添加为环境变量

```shell
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

> 每隔一段时间可以将新的config.yaml上传到服务器替换掉旧的config.yaml
> 替换完成后执行

```bash
systemctl restart clash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

#### 1.下载 [最新版clash](https://www.clash.la/releases/)) ，注意后缀

![image-20241030011550568](./assets/Linux/image-20241030011550568.png)

![image-20241030011624266](./assets/Linux/image-20241030011624266.png)

#### 2.解压 clash，重命名，添加可执行权限

```shell
gzip -d ./clash-linux-amd64-v1.18.0.gz
# 注意，clash是文件，不是目录
mv clash-linux-amd64-v1.18.0 clash
chmod u+x clash
```

#### 3.下载 Country.mmdb

```js
wget https://github.com/Dreamacro/maxmind-geoip/releases/tag/20221112/Country.mmdb
```

也可以在本机下载后，传到服务器上

#### 4.上传 config.yaml 到服务器

**方式1：自行准备该文件，上传到服务器**

> （要将本地的yml文件改为yaml）

![image-20241031232419944](./assets/Linux/image-20241031232419944.png)

![image-20241031232551341](./assets/Linux/image-20241031232551341.png)

**方式2：通过网络下载文件**

```shell
# 使用curl -o config.yaml 订阅地址命令，通过网络下载将配置写入到本地yaml文件
curl -o config.yaml 订阅地址
```

#### 5.复制文件到指定目录

```shell
cp clash /usr/local/bin
cp config.yaml /etc/clash/
cp Country.mmdb /etc/clash/
```

#### 6.在 /etc/systemd/system/clash.service 目录创建 systemd 配置

```shell
vim /etc/systemd/system/clash.service

[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/local/bin/clash -d /etc/clash

[Install]
WantedBy=multi-user.target
```

#### 7.使用 systemctl

```shell
systemctl enable clash # 开机启动
systemctl disable clash # 禁用开机启动
systemctl start clash # 启动
systemctl status clash # 查询状态
journalctl -xe # 日志
```

#### 8.开启代理

开启临时代理：

```js
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

关闭临时代理：

```shell
unset http_proxy https_proxy all_proxy
```

#### 9.测试是否成功

```bash
curl  https://translate.google.com/

curl -o googleTrans.html https://translate.google.com/
```

执行命令后，文件下载完毕。

![image-20241030093738576](./assets/Linux/image-20241030093738576.png)

将其传输到win主机上，并用浏览器打开，能够看到正常的页面，说明Clash部署成功

![image-20241030093849306](./assets/Linux/image-20241030093849306.png)

![image-20241030093928523](./assets/Linux/image-20241030093928523.png)

#### 参考

[在 Linux 中使用 Clash](https://blog.iswiftai.com/posts/clash-linux/)

### Linux服务器远程开发（IDEA + SSH）

> 远程开发还可以使用IDEA的Remote Development功能，原理是在服务器上安装一个IDEA，再在本地安装一个远程连接工具JetBrains Gateway。由于IDEA破解需要找到IDEA的安装位置，并将破解jar包放进去，而远程安装的IDEA找不到安装位置，因此无法破解，使用失败。
>
> ![image-20241226162654183](./assets/Linux/image-20241226162654183.png)
>
> VSCode也有和IDEA的Remote Development同样的功能，此处不做研究。

#### 1.连接远程服务器

![image-20241226095418382](./assets/Linux/image-20241226095418382.png)

![image-20241226100319881](./assets/Linux/image-20241226100319881.png)

![image-20241226100416142](./assets/Linux/image-20241226100416142.png)

![image-20241226095637221](./assets/Linux/image-20241226095637221.png)

![image-20241226095720287](./assets/Linux/image-20241226095720287.png)

![image-20241226095900589](./assets/Linux/image-20241226095900589.png)

#### 2.配置路径映射

![image-20241226101534166](./assets/Linux/image-20241226101534166.png)

![image-20241226101554972](./assets/Linux/image-20241226101554972.png)

#### 3.文件同步

![image-20241226101154383](./assets/Linux/image-20241226101154383.png)

![image-20241226101252299](./assets/Linux/image-20241226101252299.png)

![image-20241226101657241](./assets/Linux/image-20241226101657241.png)

#### 4.自动同步 &  同步删除

![image-20241226102304798](./assets/Linux/image-20241226102304798.png)

![image-20241226102336864](./assets/Linux/image-20241226102336864.png)

![image-20241226102020051](./assets/Linux/image-20241226102020051.png)

#### 5.运行服务器代码

在控制台连接远程服务器

![image-20241226102531482](./assets/Linux/image-20241226102531482.png)

执行`mvn spring-boot:run`启动程序

![image-20241226154727619](./assets/Linux/image-20241226154727619.png)

执行`mvn package`打包jar包

![image-20241226154944535](./assets/Linux/image-20241226154944535.png)

![image-20241226155042444](./assets/Linux/image-20241226155042444.png)

![image-20241226155209914](./assets/Linux/image-20241226155209914.png)

#### 6.远程调试代码

![image-20241226162017818](./assets/Linux/image-20241226162017818.png)

执行java -jar命令时，将上面复制的命令粘贴到java -jar中

![image-20241226162236389](./assets/Linux/image-20241226162236389.png)

![image-20241226162435677](./assets/Linux/image-20241226162435677.png)

### Linux删除环境变量并使环境变量失效

#### 问题

![image-20241226104956929](./assets/Linux/image-20241226104956929.png)

注释掉环境变量，并使用soure命令并不能使原本的环境变量生效：

> 被注释掉的jdk17依然存在，说明环境变量没有生效

![image-20241226105112753](./assets/Linux/image-20241226105112753.png)

#### 解决

> 该现象出现的原因：
> 这个现象要追溯到`source`指令的加载原理，source是把文件中配置的环境变量加载到缓存中，但是因为环境变量被删除了，所以实际上source获取时并没有获取到，就不会去更新缓存了。

要单独删除环境变量的话，还需要借助`unset`指令（unset 环境变量名）

![image-20241226105616163](./assets/Linux/image-20241226105616163.png)

![image-20241226105602894](./assets/Linux/image-20241226105602894.png)

其它环境变量到这一步已经失效了，但是PATH变量存储着系统的命令，unset PATH后将会导致大部分系统命令无法使用：

![image-20241226105847956](./assets/Linux/image-20241226105847956.png)

参考下面的[执行unset PATH命令后，很多命令用不了](###执行unset PATH命令后，很多命令用不了)j解决

### 执行unset PATH命令后，很多命令用不了

执行下面的命令恢复命令

```bash
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

再执行更新PATH变量（将/etc/profile 中的PATH变量更新到现在的PATH变量中）

```bash
source /etc/profile
```

> 不能在执行`export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`之前执行`source /etc/profile`,会报如下错误
> ![image-20241226110421505](./assets/Linux/image-20241226110421505.png)
>
> 因为/etc/profile中也包含系统的基本命令，所以执行`source /etc/profile`之前要先恢复系统基本命令，即执行
> `export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`

### Linux创建桌面应用图标

进入到 /home/用户名/Desktop ， 创建 应用名.desktop 文件

![image-20241227141018442](./assets/Linux/image-20241227141018442.png)

打开 .desktop文件，并写入脚本程序。

![image-20241227141220782](./assets/Linux/image-20241227141220782.png)

示例脚本程序如下，其他脚本可根据该示例进行更改

```shell
[Desktop Entry]

Version=1.0

Name=Clash

Exec=/home/newfbin/Downloads/Clash0.20.30-x64-linux/cfw

Icon=/home/newfbin/Pictures/桌面应用图标/Clash.jpeg

Terminal=false

Type=Application
```

最后右键桌面图标，点击允许运行即可

![image-20241227142756163](./assets/Linux/image-20241227142756163.png)

### Linux查看及导出目录结构

#### 1、tree命令作用

以树状结构查看目录下的内容

#### 2、优点

使用tree命令可以很直接看到目录下的内容，不用进入每个目录然后ls看一下了。

#### 3、tree命令安装

```
yum install tree -y
```

 检查是否安装成功

```
rpm -qa tree  或者
yum list installed tree
```

![img](./assets/Linux/8996c27dbc72cd4e05634d948aa5af2a.png)

#### 4、tree命令的使用

 直接使用tree命令

![img](./assets/Linux/e59388830585c5202793cf9cd75f60aa.png)

属性展示了当前目录和子目录下的内容。 如果仅这样就太low了。 

参数

- -L 指定层数Layer
  - tree -L 1 显示当前目录，目录结构的第一层
  - tree -L 1 / 显示/根目录下的目录结构第一层
- **-d 仅显示目录**
- -a 显示所有文件和目录
- -f 在每个文件或目录之前，显示完整的相对路径名称
- -F 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上"*","/","=","@","|"号。
- -g 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
- -p 列出权限标示
- -s 列出文件或目录大小
- -t 用文件和目录的更改时间排序
- -u 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
- -x 将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该子目录予以排除在寻找范围外。

1. 只查看当前目录下内容

   ```
   tree -L 1
   ```

    ![img](./assets/Linux/14b21c07225b808d1ac66513f7bab4fd.png)

    

2. 无法区分文件和目录，给它加上颜色区分

   ```
   tree -L 1 -C
   ```

   ![img](./assets/Linux/9fee5254c409df22505e2d5c1a8b2fdd.png)

3. 列出权限属性

   ```
   tree -L 1 -C -p
   ```

   ![img](./assets/Linux/f5731bc3a73d70bd70f9b5fb932d6c47.png)

4. 查看3层目录下内容

   ```
   tree -L 3 -C -p
   ```

   ![img](./assets/Linux/356d27240b09e9f87556d35664e109c4.png)

5. 列出相对路径

   ```
   tree -L 3 -C -p -f
   ```

   ![img](./assets/Linux/c4ef9b627f71f0d37b2c422a0e334f7e.png)

6. 只列出目录

   ```
   tree -L 3 -C -p -d
   ```

   ![img](./assets/Linux/1f95d972d3eca014c2a48b7c4aae4bca.png)

