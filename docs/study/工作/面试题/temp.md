## Git & Maven

### Maven一些常用的指令

`mvn archetype:generate`  创建maven项目

`mvn compile` 编译源代码

`mvn deploy` 发布项目

`mvn test` 运行程序中的单元测试

`mvn clean` 清除项目目录中的生成结果

`mvn package` 打包项目为jar包

`mvn install` 安装jar包

### Java基础

#### Java语言特点

Java的特点是面向对象，并且有平台无关性，一次编译，到处运行。

Java面向对象的特点有三个，分别是封装、继承、多态。

**多态** ：

子类继承父类

子类实现父类的方法

父类的引用指向子类的对象



#### String、StringBuilder、StringBuffer

String时不可变字符串，每次对String类型字符串执行拼接操作，都隐式地在堆上新建了一个和String一样的StringBuilder对象，并执行append方法进行拼接。

StringBuilder是线程不安全的，StringBuffer是线程安全的。因为StringBuffer地方法使用了Synchronized关键字进行了同步，因此StringBuffer线程安全，但也因为加了Synchronized锁，导致性能不如StringBuilder。

因此在定义常量字符串时推荐使用String，不考虑线程安全的情况下，定义需要频繁变动的字符串推荐使用StringBuilder，考虑线程安全的情况下，定义需要频繁变动的字符串推荐使用StringBuffer

运行效率排序：StringBuilder、StringBuffer、String



### Java集合框架

#### 介绍一下集合

集合是Java提供的一种容器，用来存储对象，Java集合主要有四种体系：Map、Set、List、Queue

Set、Queue、List的父接口都是Collection， `Map` 接口是一个独立的集合接口体系，没有继承 `Collection` 接口

#### 常用的数据结构

开发中常用的数据结构有ArrayList、HashMap

做算法题的时候常用的数据结构有 ArrayList 和 ArrayDeque



### 并发编程

#### 多线程的创建方式

继承Thread重写run (直接调用Thread.start开启线程)

实现Runnable接口并实现run （通过`new Thread( Runnable ).start()` 开启一个新的线程）

实现Callable接口并实现call （使用线程池的submit方法将callable提交到线程池中开启新的线程，如果直接在代码中call方法会在 `main` 线程中同步执行，直到方法执行完毕才会继续执行后续代码。）

创建线程池（通过 new ThreadPoolExecutor()创建线程池）（使用execute方法调用线程，传入Runnable类型参数  ）



### MySQL

#### 如何连接两个字段输出

MySQL里使用CONCAT函数连接两个字段输出

#### MySQL函数

**聚合函数**：

COUNT ： 记录表中的行数

SUM :  数据的和

AVG ： 数据的平均值

MAX : 最大值

MIN : 最小值

**数据函数** ：

ABS : 绝对值

CEILING : 向上取整

FLOOR ： 向下取整

RAND : 随机数

**字符串函数**

CHAR_LENGTH : 字符串的字符数

CONCAT : 合并字符串

INSERT : 替换字符串

LOWER : 小写

UPPER : 大写

LEFT : 从左边截取

RIGHT : 从右边截取

REPLACE ：替换字符串

SUBSTR : 截取字符串

REVERSE : 反转

**日期函数**：

CURRENT_DATE : 当前日期

NOW : 当前日期

**系统信息函数**：

VERSION : 版本

USER : 用户



#### union 和 unionAll

如果要将两个SELECT语句的结果作为一个整体显示出来，需要用到union 和 union All关键字，二者的作用都是将多个结果合并在一起显示出来

union对两个结果集进行并集操作，不包含重复行，同时进行默认规则排序

unionAll对也是对两个结果集进行并集操作，包含重复行，不进行排序

因为union要进行重复值扫描，所以效率低，如果没有删除重复行的需求，就是用unionAll

#### MySQL中的DQL，DCL，DML，DDL

**DDL**:

创建、修改、删除数据库、表、视图、索引等：

常用语句有 CREATE、 ALERT、DROP等

**DQL**:

用于从数据库中查数据，获取满足特定结果的结果集

DQL核心 SELECT 语句，可以搭配 FROM、WHERE、GROUP BY、HAVING、ORDER BY使用

**DML**:

数据操作语言

语句有SELECT、UPDATE、INSERT、DELETE

**DCL**:

数据控制语言，用于控制数据库访问权限和事务处理

常用语句有 COMMIT、ROLLBACK、REVOKE、GRANT



#### Drop、Truncate、Delete区别

DELETE和TRUNCATE都只删除表数据，不会删除表结构。

DELETE是DML，操作会被放到rollback segment里，事务提交之后才会生效。，如果有相应的trigger，执行时会被触发

TRUNCATE DROP是DDL，操作后立即生效，不能触发回滚，也不会触发trigger

执行速度：DROP > TRUNCATE > DELETE

#### 查询数据库第5行到第10行的数据

```sql
SELECT col1，col2 
FROM teble
LIMIT 4,6
```

MySQl的行号是从0开始计算的，偏移量为4表示从第五行开始计数

因为第5到第10行一共有6行，所以行数填6

#### 深度分页问题优化

问题描述：

像`SELECT * FROM table LIMIT 50000,10`

数据库会先遍历前面的五万条数据，找到偏移位置后再进行

### Redis

#### Redis数据结构

##### 五大数据类型

String -- 字符串

List -- 列表

Set -- 集合

Hash --  哈希表

Zset -- 有序集合

##### 三种特殊数据类型

Geospatial -- 地理位置

Hyperloglog -- 基数统计

BitMap -- 位图



#### Redis 持久化方式有哪些？以及有什么区别？

Redis默认使用的持久化方法是RDB

##### RDB

记录 redis 数据库的所有键值对,在某个时间点将数据写入一个临时文件，持久化结束后，用这个临时文件替换上次持久化的文件，达到数据恢复。

优点：

- 只有一个文件 dump.rdb ，方便持久化。 
- 容灾性好，一个文件可以保存到安全的磁盘。 
- 性能最大化，fork 子进程来完成写操作，让主进程继续处理命令，所以是 IO 最大化。使用单 独子进程来进行持久化，主进程不会进行任何 IO 操作，保证了 Redis 的高性能) 
- 相对于数据集大时，比 AOF 的启动效率更高。

缺点：

数据安全性低。 RDB 是间隔一段时间进行持久化，如果持久化之间 Redis 发生故障，会发生数据 丢失。所以这种方式更适合数据要求不严谨的时候

##### AOF

是指所有的命令行记录以 Redis 命令请求协议的格式完全持久化存储，保存为 AOF 文件。

优点： 

（1）数据安全， AOF 持久化可以配置 appendfsync 属性，有 always，每进行一次命令操作就记录 到 AOF 文件中一次。

（2）通过 append 模式写文件，即使中途服务器宕机，可以通过 redis-check-aof 工具解决数据 一致性问题。 

（3） AOF 机制的 rewrite 模式。 AOF 文件没被 rewrite 之前（文件过大时会对命令进行合并重 写），可以删除其中的某些命令（比如误操作的 flushall )

缺点：

（1） AOF 文件比 RDB 文件大，且恢复速度慢。 

（2）数据集大的时候，比 RDB 启动效率低

### Spring

#### AOP + IOC

IoC是Iverse of Control，也就是控制反转，将对象的创建和管理交给了spring容器，不像以前由程序员自己new。

AOP 是Aspect Oriented Programming，面向切面编程，AOP的和核心概念是将与业务无关的的横切关注点抽取出来，通过声明的方式动态地应用到业务方法上。而不是将这些代码直接嵌入到业务逻辑中。

AOP的核心概念包括切面、连接点、通知、切入点、织入

Java中用于实现AOP的两个常见框架有SpringAOP和AspectJ.

SpringAOP主要用于运行时的代理机制，较轻量级，使用方便。

AspectJ是功能更强大的AOP框架，支持编译时、运行时和类加载时的AOP功能

#### bean如何装配

在SpringMVC中通过在xml配置文件中配置bean，使用context.getBean使用bean

SpringBoot中通过@Component(公共组件) @Repository(DAO实现类) @Service @Controller声明bean

通过@Autowired注解自动注入



### Linux

#### Linux常用命令

`ls` -- 列出文件列表

`mkdir rmdir` -- 创建目录和移除目录

`tail -n` -- 显示文件后几行内容

`tar -cvf` -- 打包为tar

`tar -zcvf` -- 打包为tar并压缩为gz

`tar -zxvf` -- 解压缩tar.gz包

`grep` --  查找字符串

`touch` -- 创建空文件

`vim / vi` -- 用编辑器修改文件

### 算法

#### 树的前中后序遍历

前中后序遍历的时间复杂度都为O(n)，空间复杂度为O(h)，h是树的高度

前序遍历是中左右的顺序遍历节点，即先遍历根节点，再遍历左子树、再遍历右子树

中序遍历是左中右的顺序遍历节点，即先遍历左子树，再遍历根节点、再遍历右子树

后序遍历是左右中的顺序遍历节点，即先遍历左子树，再遍历右子树、再遍历根节点

#### 图的深度和广度优先搜索



#### 快速排序

算法步骤：

首先定义一个基准值，然后遍历该数组，将小于该基准值的数放到基准前面，大于该基准值的数放到基准后面。

最后对基准值左右两边的子数组递归地执行上面的操作。

时间复杂度一般情况和最好情况都是O(nlogn)，最坏情况是O(n^2)，空间复杂度是O(logn)

### RabbitMQ

#### RabbitMQ的组成和使用场景

**Exchange**：交换机，根据路由键发送消息到绑定的队列。Exchange的类型有fanout、direct、topic、headers。如果队列没有指定交换机会绑定一个默认交换机，默认交换机的类型就是direct

**Queue**：队列、保存消息并将它们转发给消费者

**Bindings**：是Exchange和Queue之间的虚拟连接，可以保存多个RoutingKey

**RoutingKey**：是一个路由规则，交换机可以用它来确定如何路由一个特定消息。
