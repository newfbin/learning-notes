## 统一缓存帝国 - 实战 Spring Cache

![](./assets/缓存实战4-SpringCache/MoNk3ESPsMyb.png)

前三篇讲解的缓存使用和分布式锁的都是基于 Redis 来做缓存的，本篇我来向大家介绍一种兼容所有缓存中间件的方案，不论我们是使用 Redis 还是 Ehcache，都不需要关心如何操作 Redis 或者 Ehcache，这套方案统统帮你搞定。

这套方案就是大名鼎鼎的 `Spring Cache`。什么？你没有听过，没关系，本篇带你一起探索。

缓存系列文章：

[《缓存实战（一）》]()

[《缓存实战（二）Redis分布式锁》]()

[《缓存实战（三）Redisson 分布式锁》]()

## 一、揭开 Spring Cache 的面纱

### 1.1 现有缓存方案的痛点

**试想一种场景**：

1.用户 A 打开 APP，进入到了秒杀商品的详情页，那这个商品数据我们会先去数据库查询，然后返回给客户端。

2.因为有大量用户短时间内进入到了详情页，所以可以把活动列表缓存起来，直接读缓存就可以了。

3.那下次再查询商品时，直接去缓存查询就可以了。如果秒杀商品下架了，缓存的数据不会用到了，就把缓存删掉就可以了。

4.上面几步看起来也没啥问题，但是放缓存，删除缓存这两步是需要我们去手动写代码实现的。有没有一种方式不用写操作缓存的代码？

5.假如现在用的缓存中间件是 Redis，领导说要换成 Ehcache，操作缓存的代码是不是又得重新撸一遍？

**总结下上面场景的痛点：**

- 需要手写操作缓存代码，如添加缓存、更新缓存、删除缓存。
- 切换缓存组件并不容易，或者说没有对缓存层进行抽象封装，依赖具体的缓存中间件。

哪有没有一种方案可以帮助解决上面的两个痛点呢？

这就是今天要介绍的 `Spring Cache`。

### 1.2 Spring Cache 介绍

Spring Cache 是 Spring 提供的一整套的缓存解决方案。虽然它本身并没有提供缓存的实现，但是它提供了一整套的接口和代码规范、配置、注解等，这样它就可以整合各种缓存方案了，比如 Redis、Ehcache，我们也就不用关心操作缓存的细节。

Spring 3.1 开始定义了 org.springframework.cache.Cache 和 org.springframework.cache.CacheManager 接口来统一不同的缓存技术，并支持使用注解来简化我们开发。

`Cache` 接口它包含了缓存的各种操作方式，同时还提供了各种`xxxCache`缓存的实现，比如 RedisCache 针对Redis，EhCacheCache 针对 EhCache，ConcurrentMapCache 针对 ConCurrentMap，具体有哪几种，后面实战中会介绍。

### 1.3 Spring Cache 有什么功效

每次调用某方法，而此方法又是带有缓存功能时，Spring 框架就会检查`指定参数`的那个方法是否已经被调用过，如果之前调用过，就从缓存中取之前调用的结果；如果没有调用过，则再调用一次这个方法，并缓存结果，然后再返回结果，那下次调用这个方法时，就可以直接从缓存中获取结果了。

### 1.4 Spring Cache 的原理是什么？

Spring Cache 主要是作用在类上或者方法上，对类中的方法的返回结果进行缓存。那么如何对方法增强，来实现缓存的功能？

学过 Spring 的同学，肯定能一下子就反应过来，就是用 `AOP`（面向切面编程）。

面向切面编程可以简单地理解为在类上或者方法前加一些说明，就是我们常说的注解。

Spring Cache 的注解会帮忙在方法上创建一个切面（aspect），并触发缓存注解的切点（poinitcut），听起来太绕了，简单点说就是：Spring Cache 的注解会帮忙在调用方法之后，去缓存**方法调用的最终结果**，或者在方法调用之前拿缓存中的结果，或者删除缓存中的结果，这些读、写、删缓存的**脏活**都交给 Spring Cache 来做了，是不是很爽，再也不用自己去写缓存操作的逻辑了。

### 1.5 缓存注解

Spring 提供了四个注解来声明缓存规则。@Cacheable，@CachePut，@CacheEvict，@Caching。

![](./assets/缓存实战4-SpringCache/5nHCzypfT8KP.png)

大家先有个概念，后面我们再来看怎么使用这些缓存注解。

## 二、使用缓存

### 2.1 引入 Spring Cache 依赖

在 pom 文件中引入 spring cache 依赖，如下所示：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

### 2.2 配置使用哪种缓存

Spring Cache 支持很多缓存中间件作为框架中的缓存，总共有 9 种选择：

- caffeine：Caffeine 是一种高性能的缓存库，基于 Google Guava。
- couchbase：*CouchBase*是一款非关系型JSON文档数据库。
- generic：由泛型机制和 static 组合实现的泛型缓存机制。
- hazelcast：一个高度可扩展的数据分发和集群平台，可用于实现分布式数据存储、数据缓存。
- infinispan：分布式的集群缓存系统。
- jcache：JCache 作为缓存。它是 JSR107 规范中提到的缓存规范。
- none：没有缓存。
- redis：用 Redis 作为缓存
- simple：用内存作为缓存。

![mark](./assets/缓存实战4-SpringCache/Wqa23dB791ui.png)

我们还是用最熟悉的 Redis 作为缓存吧。配置 Redis 作为缓存也很简单，在配置文件 application.properties 中设置缓存的类型为 Redis 就可以了， 如下所示：

![](./assets/缓存实战4-SpringCache/UUlxryxTUL8J.png)

当然，别忘了还要在 pom 文件中 引入 Redis 的依赖，不然用不了 Redis。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 2.3 测试缓存

那基础的配置已经做好了，现在就是看怎么使用 Spring Cache 了。

（1）启动类上添加 `@EnableCaching`注解。本文案例就是在 启动类 PassjavaQuestionApplication 添加 @EnableCaching注解。

![](./assets/缓存实战4-SpringCache/khp0w8SdtPCy.png)

（2）指定某方法开启缓存功能。在方法上添加 `@Cacheable` 缓存注解就可以了。

@Cacheable 注解中，可以添加四种参数：value，key，condition，unless。首先我们来看下 value 参数。

下面的代码出于演示作用，用了最简单的逻辑，test 方法直接返回一个数字，连数据库查询都没有做。不过没关系，我们主要验证 Spring Cache 是否对方法的结果进行了缓存。

```java
@RequestMapping("/test")
@Cacheable({"hot"})
public int test() {
    return 222;
}
```

大家注意，@Cacheable 注解中小括号里面还含有大括号，大括号里面还有 “hot” 字符串，这个 hot 字符串你可以把它当作一个缓存的名字，然后将 test 方法返回的结果存到 hot 缓存中。我们也可以用 value="hot" 的方式。

第一次调用 test 方法前，既没有 hot 缓存，更没有 test 的结果缓存。

调用 test 方法后，Redis 中就创建出了 hot 缓存了，然后缓存了一个 key，如下图所示：

![](./assets/缓存实战4-SpringCache/Y6bLekSzlQzD.png)

第二次调用 test 方法时，就从缓存 hot 中将 test 方法缓存的结果 222 取出来了，为了验证没有执行 test 中的方法，大家可以在 test 方法中打下 log 或者断点。最后的验证结果肯定是没有走 test 方法的，而是直接从缓存中获取的。

那我们再来测试一个方法，方法名改为 test2，且请求路径也改为 test2 了。

```java
@RequestMapping("/test2")
@Cacheable({"hot"})
public int test2() {
    return 456;
}
```

**大家觉得这两个方法的结果都会缓存吗？还是只会缓存第一个被调用的方法。**

经过测试，执行第一个 test 方法后，再执行 test2 方法，缓存结果一直是 222 不会变。因为他们的 key 都是 默认的 SimpleKey[]，所以两个方法对应的缓存的 key 都叫这个，所以得到的缓存值是一样的。

（3）加上数据库查询的测试。

有的同学可能觉得上面的测试太简单了，test 方法里面啥都没做，还缓存啥呢，完全没必要啊。没关系，大家的顾虑是对的，我们来加上数据库查询，安排~

先说下场景：前端需要查询某个题目的详情，正常逻辑是查询数据库后返回结果。假定这个查询操作非常频繁，我们需要将题目详情进行缓存。我们先看看常规 Redis 缓存方案：

先从 Redis 缓存中查看缓存中是否有该题目，如果缓存中有，则返回缓存中的题目；如果没有，就从数据库中查。查询出题目后，就用 Redis 存起来，然后返回。这里就要写操作 Redis 的代码了：查询 Redis 缓存、更新 Redis 缓存。

```java
// 查询缓存，假定该题目详情缓存的 key=question1
redisTemplate.opsForValue().get("question1"); 
// 更新缓存
redisTemplate.opsForValue().set("question1", questionEntity);
```

那如果用 Spring Cache 注解的话，上面两行代码可以直接干掉了。如下所示，加一个 @Cacheable 注解搞定。

```java
@Cacheable({"question", "hot"})
public QuestionEntity info(Long id) {
    return getById(id); // 查询数据库操作
}
```

其中 question 和 hot 是缓存的名字，我们可以将结果放到不同的缓存中。

结论：

- 如果没有指定请求参数，则缓存生成的 key name，是默认自动生成的，叫做 SimpleKey[]。
- 如果指定了请求参数，则缓存的 key  name 就是请求参数，比如上面 info 方法，key 等于我传入的 id = 1。
- 缓存中 key 对应的 value 默认使用 JDK 序列化后的数据。
- value 的过期时间为 -1，表示永不过期。

### 2.4 自定义配置类

上面保存的缓存数据都是默认设置，我们也可以自己定义配置，如下所示，在配置文件 application.properties 添加如下配置：

```
# 使用 Redis 作为缓存组件
spring.cache.type=redis
# 缓存过期时间为 3600s
spring.cache.redis.time-to-live=3600000
# 缓存的键的名字前缀
spring.cache.redis.key-prefix=passjava_
# 是否使用缓存前缀
spring.cache.redis.use-key-prefix=true
# 是否缓存控制，防止缓存穿透
spring.cache.redis.cache-null-values=true
```

然后需要加一个配置类：MyCacheConfig。可以在我的开源项目 passjava 获取完整源码。

```java
RedisCacheConfiguration redisCacheConfiguration(CacheProperties cacheProperties) {
}
```

### 2.5 自定义 key

然后我们可以指定 key 的值，可以在 @Cacheable 注解里面加上 key 的值 `#root.method.name`。这是一种特有的表达式，称作 `SpEL` 表达式，这里代表用方法名作为缓存 key 的名字。

```java
@Cacheable(value = {"hot"}, key = "#root.method.name")
```

接下来就是见证奇迹的时刻，调用 test 方法和 test2 方法，发现有两个不同的 key，一个是 passjava_test1，另外一个 passjava_test2，它们的 key 就是前缀 passjava_ + 方法名 组成。

![](./assets/缓存实战4-SpringCache/g9Lc2BlzHdRo.png)

SpEL 表达式还有很多其它规则，如下所示：

![](./assets/缓存实战4-SpringCache/63Il4nlIRKAR.png)

可以根据项目需要选择合适的表达式来自定义 key。

### 2.6 自定义条件

除了设置缓存条目的 key，我们还可以自定义条件来决定是否将缓存功能关闭。这里就要用到@Cacheable 另外两个属性：condition 和 unless，它俩的格式还是用 SpEL 表达式。对应的四个属性总结如下：

![](./assets/缓存实战4-SpringCache/WbWBKbtKu2fQ.png)

代码示例如下：

```JAVA
@Cacheable(value = "hot", unless = "#result.message.containss('NoCache')")
```

当放回的结果 message 字段包含有 NoCache 就不会进行缓存。

### 2.7 更新注解

@CachePut 也是用来更新缓存，和 @Cacheable 非常相似，不同点是 @CachePut 注解的方法始终都会执行，返回值也会也会放到缓存中。通常用在保存的方法上。

保存成功后，可以将 key 设置保存实例的 id。这个怎么做呢？

之前我们说过 key 可以通过 SpEL 表达式来指定，这里就可以搭配 #result.id 来实现。

这里还是用个例子来说明用法：创建题目的方法，返回题目实例，其中包含有题目 id。

```java
@RequestMapping("/create")
@CachePut(value = "hot", key = "#result.id")
public QuestionEntity create(@Valid @RequestBody QuestionEntity question){
    return IQuestionService.createQuestion(question);
}
```

保存的 id 是自增的，值为 123，所以缓存中的 key = passjava_123。

![](./assets/缓存实战4-SpringCache/MxAx7uWJkYWV.png)

### 2.8 删除缓存注解

@CacheEvict 注解的方法在调用时不会在缓存中添加任何东西，但是会从从缓存中移除之前的缓存结果。

示例代码如下：

```java
@RequestMapping("/remove/{id}")
@CacheEvict(value = "hot")
public R remove(@PathVariable("id") Long id){
    IQuestionService.removeById(id);
    return R.ok();
}
```

删除条目的 key 与传递进来的 id 相同。我测试的时候传的 id = 123，经过前缀passjava_组装后就是 passjava_123，所以将之前缓存的 passjava_123 删除了。重复执行也不会报错。

注意：@CacheEvict 和 @Cacheable、@CachePut 不同，它能够应用在返回值为 void 的方法上。

@CacheEvict 还有些属性可供使用，总结如下：

![](./assets/缓存实战4-SpringCache/yRJhA5tlAXhp.png)

## 三、 总结

本文通过传统使用缓存的方式的痛点引出 Spring 框架中的 Cache 组件。然后详细介绍了 Spring Cache 组件的用法：

- 五大注解。 @Cacheable、@CachePut、@CacheEvict、@Caching,、@CacheConfig。
- 如何自定义缓存条目的 key。
- 如何自定义 Cache 配置。
- 如何自定义缓存的条件。



参考资料：

www.passjava.cn

Spring in Action