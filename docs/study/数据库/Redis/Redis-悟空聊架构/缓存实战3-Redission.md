# 分布式锁中的王者方案 - Redisson

![](./assets/缓存实战3-Redission/image-20210522083757909.png)

上篇讲解了如何用 Redis 实现分布式锁的五种方案，但我们还是有更优的王者方案，就是用 Redisson。

缓存系列文章：

[《缓存实战（一）》](http://www.passjava.cn/#/01.PassJava/02.PassJava_Architecture/19.缓存实战（一）.md)

[《缓存实战（二）Redis分布式锁》](http://www.passjava.cn/#/01.PassJava/02.PassJava_Architecture/22.缓存实战（二）Redis分布式锁.md)

[《缓存实战（三）Redisson分布式锁》](http://www.passjava.cn/#/01.PassJava/02.PassJava_Architecture/23.缓存实战（三）Redisson分布式锁.md)

我们先来看下 Redis 官网怎么说，

![](./assets/缓存实战3-Redission/image-20210514170803218.png)

而 Java 版的 分布式锁的框架就是 Redisson。本篇实战内容将会基于我的开源项目 PassJava 来整合 Redisson。

我把`后端`、`前端`、`小程序`都上传到同一个仓库里面了，大家可以通过 `Github` 或 `码云`访问。地址如下：

> **Github**: https://github.com/Jackson0714/PassJava-Platform
>
> **码云**：https://gitee.com/jayh2018/PassJava-Platform
>
> **配套教程**：www.passjava.cn

在实战之前，我们先来看下使用 Redisson 的原理。

## 一、Redisson 是什么？

如果你之前是在用 Redis 的话，那使用 Redisson 的话将会事半功倍，Redisson 提供了使用 Redis的最简单和最便捷的方法。

Redisson的宗旨是促进使用者对 Redis 的关注分离（Separation of Concern），从而让使用者能够将精力更集中地放在处理业务逻辑上。

Redisson 是一个在 Redis 的基础上实现的 Java 驻内存数据网格（In-Memory Data Grid）。

![](./assets/缓存实战3-Redission/image-20210514105808434.png)

- **Netty 框架**：Redisson采用了基于NIO的[Netty](http://netty.io/)框架，不仅能作为Redis底层驱动客户端，具备提供对Redis各种组态形式的[连接功能](https://github.com/redisson/redisson#features)，对Redis命令能以同步发送、[异步形式发送](https://github.com/redisson/redisson/wiki/3.-程序接口调用方式#31-异步执行方式)、[异步流形式发送](https://github.com/redisson/redisson/wiki/3.-程序接口调用方式#32-异步流执行方式)或[管道形式发送](https://github.com/redisson/redisson/wiki/10.-额外功能#103-命令的批量执行)的功能，[LUA脚本执行](https://github.com/redisson/redisson/wiki/10.-额外功能#104-脚本执行)处理，以及[处理返回结果](https://github.com/redisson/redisson/wiki/4.-数据序列化)的功能
- **基础数据结构**：将原生的Redis [`Hash`](http://redis.cn/topics/data-types-intro.html#hashes)，[`List`](http://redis.cn/topics/data-types-intro.html#redis-lists)，[`Set`](http://redis.cn/topics/data-types-intro.html#sets)，[`String`](http://redis.cn/topics/data-types-intro.html#redis-strings)，[`Geo`](http://redis.cn/commands/geoadd.html)，[`HyperLogLog`](http://redis.cn/topics/data-types-intro.html#hyperloglogs)等数据结构封装为Java里大家最熟悉的[`映射（Map）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#71-映射map)，[`列表（List）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#77-列表list)，[`集（Set）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#73-集set)，[`通用对象桶（Object Bucket）`](https://github.com/redisson/redisson/wiki/6.-分布式对象#61-通用对象桶object-bucket)，[`地理空间对象桶（Geospatial Bucket）`](https://github.com/redisson/redisson/wiki/6.-分布式对象#62-地理空间对象桶geospatial-bucket)，[`基数估计算法（HyperLogLog）`](https://github.com/redisson/redisson/wiki/6.-分布式对象#68-基数估计算法hyperloglog)等结构，
- **分布式数据结构**：这基础上还提供了分布式的[`多值映射（Multimap）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#72-多值映射multimap)，[`本地缓存映射（LocalCachedMap）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#712-本地缓存映射localcachedmap)，[`有序集（SortedSet）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#74-有序集sortedset)，[`计分排序集（ScoredSortedSet）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#75-计分排序集scoredsortedset)，[`字典排序集（LexSortedSet）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#76-字典排序集lexsortedset)，[`队列（Queue）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#78-队列queue)，[`阻塞队列（Blocking Queue）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#710-阻塞队列blocking-queue)，[`有界阻塞队列（Bounded Blocking Queue）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#711-有界阻塞队列bounded-blocking-queue)，[`双端队列（Deque）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#79-双端队列deque)，[`阻塞双端队列（Blocking Deque）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#712-阻塞双端队列blocking-deque)，[`阻塞公平队列（Blocking Fair Queue）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#713-阻塞公平队列blocking-fair-queue)，[`延迟队列（Delayed Queue）`](https://github.com/redisson/redisson/wiki/7.-分布式集合#714-延迟队列delayed-queue)，[`布隆过滤器（Bloom Filter）`](https://github.com/redisson/redisson/wiki/6.-分布式对象#67-布隆过滤器bloom-filter)，[`原子整长形（AtomicLong）`](https://github.com/redisson/redisson/wiki/6.-分布式对象#64-原子整长形atomiclong)，[`原子双精度浮点数（AtomicDouble）`](https://github.com/redisson/redisson/wiki/6.-分布式对象#65-原子双精度浮点数atomicdouble)，[`BitSet`](https://github.com/redisson/redisson/wiki/6.-分布式对象#63-bitset)等Redis原本没有的分布式数据结构。

- **分布式锁**：Redisson还实现了Redis[文档中提到](http://www.redis.cn/topics/distlock.html)像分布式锁[`Lock`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#81-可重入锁reentrant-lock)这样的更高阶应用场景。事实上Redisson并没有不止步于此，在分布式锁的基础上还提供了[`联锁（MultiLock）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#83-联锁multilock)，[`读写锁（ReadWriteLock）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#85-读写锁readwritelock)，[`公平锁（Fair Lock）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#82-公平锁fair-lock)，[`红锁（RedLock）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#84-红锁redlock)，[`信号量（Semaphore）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#86-信号量semaphore)，[`可过期性信号量（PermitExpirableSemaphore）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#87-可过期性信号量permitexpirablesemaphore)和[`闭锁（CountDownLatch）`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#88-闭锁countdownlatch)这些实际当中对多线程高并发应用至关重要的基本部件。正是通过实现基于Redis的高阶应用方案，使Redisson成为构建分布式系统的重要工具。

- **节点**：Redisson作为独立节点可以用于独立执行其他节点发布到`分布式执行服务`和`分布式调度服务`里的远程任务。

## 二、整合 Redisson

Spring Boot 整合 Redisson 有两种方案：

- 程序化配置。
- 文件方式配置。

本篇介绍如何用程序化的方式整合 Redisson。

### 2.1 引入 Maven 依赖

在 passjava-question 微服务的 pom.xml 引入 redisson的 maven 依赖。

```xml
<!-- https://mvnrepository.com/artifact/org.redisson/redisson -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.15.5</version>
</dependency>
```

### 2.2 自定义配置类

下面的代码是单节点 Redis 的配置。

```java
@Configuration
public class MyRedissonConfig {
    /**
     * 对 Redisson 的使用都是通过 RedissonClient 对象
     * @return
     * @throws IOException
     */
    @Bean(destroyMethod="shutdown") // 服务停止后调用 shutdown 方法。
    public RedissonClient redisson() throws IOException {
        // 1.创建配置
        Config config = new Config();
        // 集群模式
        // config.useClusterServers().addNodeAddress("127.0.0.1:7004", "127.0.0.1:7001");
        // 2.根据 Config 创建出 RedissonClient 示例。
        config.useSingleServer().setAddress("redis://127.0.0.1:6379");
        return Redisson.create(config);
    }
}
```

### 2.3 测试配置类

新建一个单元测试方法。

```java
@Autowired
RedissonClient redissonClient;

@Test
public void TestRedisson() {
    System.out.println(redissonClient);
}
```

我们运行这个测试方法，打印出 redissonClient

```
org.redisson.Redisson@77f66138
```

## 三、分布式可重入锁

### 3.1 可重入锁测试

基于Redis的Redisson分布式可重入锁`RLock`Java 对象实现了`java.util.concurrent.locks.Lock`接口。同时还提供了[异步（Async）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockAsync.html)、[反射式（Reactive）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockReactive.html)和[RxJava2标准](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockRx.html)的接口。

```java
RLock lock = redisson.getLock("anyLock");
// 最常见的使用方法
lock.lock();
```

我们用 passjava 这个开源项目测试下可重入锁的两个点：

- （1）多个线程抢占锁，后面锁需要等待吗？
- （2）如果抢占到锁的线程所在的服务停了，锁会不会被释放？

#### 3.1.1 验证一：可重入锁是阻塞的吗？

为了验证以上两点，我写了个 demo 程序：代码的流程就是设置`WuKong-lock`锁，然后加锁，打印线程 ID，等待 10 秒后释放锁，最后返回响应：“test lock ok”。

```java
@ResponseBody
@GetMapping("test-lock")
public String TestLock() {
    // 1.获取锁，只要锁的名字一样，获取到的锁就是同一把锁。
    RLock lock = redisson.getLock("WuKong-lock");

    // 2.加锁
    lock.lock();
    try {
        System.out.println("加锁成功，执行后续代码。线程 ID：" + Thread.currentThread().getId());
        Thread.sleep(10000);
    } catch (Exception e) {
        //TODO
    } finally {
        lock.unlock();
        // 3.解锁
        System.out.println("Finally，释放锁成功。线程 ID：" + Thread.currentThread().getId());
    }

    return "test lock ok";
}
```

先验证第一个点，用两个 http 请求来测试抢占锁。

请求的 URL：

```java
http://localhost:11000/question/v1/redisson/test/test-lock
```

![](./assets/缓存实战3-Redission/image-20210519224031100.png)

第一个线程对应的线程 ID 为 86，10秒后，释放锁。在这期间，第二个线程需要等待锁释放。

第一个线程释放锁之后，第二个线程获取到了锁，10 秒后，释放锁。

画了一个流程图，帮助大家理解。如下图所示：

![](./assets/缓存实战3-Redission/image-20210522083408263.png)

- 第一步：线程 A 在 0 秒时，抢占到锁，0.1 秒后，开始执行等待 10 s。
- 第二步：线程 B 在 0.1 秒尝试抢占锁，未能抢到锁（被 A 抢占了）。
- 第三步：线程 A 在 10.1 秒后，释放锁。
- 第四步：线程 B 在 10.1 秒后抢占到锁，然后等待 10 秒后释放锁。

由此可以得出结论，Redisson 的可重入锁（lock）是阻塞其他线程的，需要等待其他线程释放的。

#### 3.1.2 验证二：服务停了，锁会释放吗？

如果线程 A 在等待的过程中，服务突然停了，那么锁会释放吗？如果不释放的话，就会成为死锁，阻塞了其他线程获取锁。

我们先来看下线程 A 的获取锁后的，Redis 客户端查询到的结果，如下图所示：

![](./assets/缓存实战3-Redission/image-20210519222248440.png)

WuKong-lock 有值，而且大家可以看到 TTL 在不断变小，说明 WuKong-lock 是自带过期时间的。

通过观察，经过 30 秒后，WuKong-lock 过期消失了。说明 Redisson 在停机后，占用的锁会自动释放。

![](./assets/缓存实战3-Redission/image-20210519221941398.png)

那这又是什么原理呢？这里就要提一个概念了，`看门狗`。

![](https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180912%2F1abbd82a2f9b4b82bbaa333853d38b2d.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624030525&t=b94ab4e527762c5968fb8e4eba130f93)

### 3.2 看门狗原理

如果负责储存这个分布式锁的 Redisson 节点宕机以后，而且这个锁正好处于锁住的状态时，这个锁会出现锁死的状态。为了避免这种情况的发生，Redisson内部提供了一个监控锁的`看门狗`，它的作用是在Redisson实例被关闭前，不断的延长锁的有效期。

默认情况下，看门狗的检查锁的超时时间是30秒钟，也可以通过修改[Config.lockWatchdogTimeout](https://github.com/redisson/redisson/wiki/2.-配置方法#lockwatchdogtimeout监控锁的看门狗超时单位毫秒)来另行指定。

如果我们未制定 lock 的超时时间，就使用 30 秒作为看门狗的默认时间。只要占锁成功，就会启动一个`定时任务`：每隔 10 秒重新给锁设置过期的时间，过期时间为 30 秒。

如下图所示：

![](./assets/缓存实战3-Redission/image-20210522082352454.png)

当服务器宕机后，因为锁的有效期是 30 秒，所以会在 30 秒内自动解锁。（30秒等于宕机之前的锁占用时间+后续锁占用的时间）。

如下图所示：

![](./assets/缓存实战3-Redission/image-20210522082445906.png)

### 3.3 设置锁过期时间

我们也可以通过给锁设置过期时间，让其自动解锁。

如下所示，设置锁 8 秒后自动过期。

```java
lock.lock(8, TimeUnit.SECONDS);
```

如果业务执行时间超过 8 秒，手动释放锁将会报错，如下图所示：

![image-20210521102640573](./assets/缓存实战3-Redission/image-20210521102640573.png)

所以我们如果设置了锁的自动过期时间，则执行业务的时间一定要小于锁的自动过期时间，否则就会报错。

## 四、王者方案

上一篇我讲解了分布式锁的五种方案：《从青铜到钻石的演进方案》，这一篇主要是讲解如何用 Redisson 在 Spring Boot 项目中实现分布式锁的方案。

因为 Redisson 非常强大，实现分布式锁的方案非常简洁，所以称作`王者方案`。

原理图如下：

![](./assets/缓存实战3-Redission/image-20210522082523557.png)

代码如下所示：

```java
// 1.设置分布式锁
RLock lock = redisson.getLock("lock");
// 2.占用锁
lock.lock();
// 3.执行业务
...
// 4.释放锁
lock.unlock();
```

和之前 Redis 的方案相比，简洁很多。

## 五、分布式读写锁

基于 Redis 的 Redisson 分布式可重入读写锁`RReadWriteLock` Java对象实现了`java.util.concurrent.locks.ReadWriteLock`接口。其中读锁和写锁都继承了 `RLock`接口。

写锁是一个拍他锁（互斥锁），读锁是一个共享锁。

- 读锁 + 读锁：相当于没加锁，可以并发读。
- 读锁 + 写锁：写锁需要等待读锁释放锁。
- 写锁 + 写锁：互斥，需要等待对方的锁释放。
- 写锁 + 读锁：读锁需要等待写锁释放。

![](./assets/缓存实战3-Redission/image-20210522082740214.png)

示例代码如下：

```java
RReadWriteLock rwlock = redisson.getReadWriteLock("anyRWLock");
// 最常见的使用方法
rwlock.readLock().lock();
// 或
rwlock.writeLock().lock();
```

另外Redisson还通过加锁的方法提供了`leaseTime`的参数来指定加锁的时间。超过这个时间后锁便自动解开了。

```java
// 10秒钟以后自动解锁
// 无需调用unlock方法手动解锁
rwlock.readLock().lock(10, TimeUnit.SECONDS);
// 或
rwlock.writeLock().lock(10, TimeUnit.SECONDS);

// 尝试加锁，最多等待100秒，上锁以后10秒自动解锁
boolean res = rwlock.readLock().tryLock(100, 10, TimeUnit.SECONDS);
// 或
boolean res = rwlock.writeLock().tryLock(100, 10, TimeUnit.SECONDS);
...
lock.unlock();
```

## 六、分布式信号量

基于Redis的Redisson的分布式信号量（[Semaphore](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphore.html)）Java对象`RSemaphore`采用了与`java.util.concurrent.Semaphore`相似的接口和用法。同时还提供了[异步（Async）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphoreAsync.html)、[反射式（Reactive）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphoreReactive.html)和[RxJava2标准](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphoreRx.html)的接口。

关于信号量的使用大家可以想象一下这个场景，有三个停车位，当三个停车位满了后，其他车就不停了。可以把车位比作信号，现在有三个信号，停一次车，用掉一个信号，车离开就是释放一个信号。

![](./assets/缓存实战3-Redission/image-20210522082815495.png)

我们用 Redisson 来演示上述停车位的场景。

先定义一个占用停车位的方法：

```java
/**
* 停车，占用停车位
* 总共 3 个车位
*/
@ResponseBody
@RequestMapping("park")
public String park() throws InterruptedException {
  // 获取信号量（停车场）
  RSemaphore park = redisson.getSemaphore("park");
  // 获取一个信号（停车位）
  park.acquire();

  return "OK";
}
```

再定义一个离开车位的方法：

```java
/**
 * 释放车位
 * 总共 3 个车位
 */
@ResponseBody
@RequestMapping("leave")
public String leave() throws InterruptedException {
    // 获取信号量（停车场）
    RSemaphore park = redisson.getSemaphore("park");
    // 释放一个信号（停车位）
    park.release();

    return "OK";
}
```

为了简便，我用 Redis 客户端添加了一个 key：“park”，值等于 3，代表信号量为 park，总共有三个值。

![](./assets/缓存实战3-Redission/image-20210522083049618.png)

然后用 postman 发送 park 请求占用一个停车位。

![](./assets/缓存实战3-Redission/image-20210522083115761.png)

然后在 redis 客户端查看 park 的值，发现已经改为 2 了。继续调用两次，发现 park 的等于 0，当调用第四次的时候，会发现请求一直处于`等待中`，说明车位不够了。如果想要不阻塞，可以用 tryAcquire 或 tryAcquireAsync。

我们再调用离开车位的方法，park 的值变为了 1，代表车位剩余 1 个。

**注意**：多次执行释放信号量操作，剩余信号量会一直增加，而不是到 3 后就封顶了。

其他分布式锁：

- 公平锁（Fair Lock）
- 联锁（MultiLock）
- 红锁（RedLock）
- 读写锁（ReadWriteLock）
- 可过期性信号量（PermitExpirableSemaphore）

- 闭锁（CountDownLatch）

![](./assets/缓存实战3-Redission/image-20210522082941293.png)

还有其他分布式锁就不在本篇展开了，感兴趣的同学可以查看官方文档。

参考资料：

https://github.com/redisson/redisson