## Java实现多线程有几种方法

- 继承Thread类
- 实现Runnable接口
- 实现Callable接口
- 创建线程池

### 继承Thread类

- 继承Thread类
- 重写run()方法
- 调用Thread类的start()方法启动线程

### 实现Runnable接口

- 实现Runnable接口
- 实现run()方法
- new Thread( 实现类的对象 ).start() 启动线程

### 实现Callable接口

- 实现`Callable<返回值类型>`接口
- 实现 `call()`方法，并抛出异常。如 `public Boolean call() throws Exception {}`
- 创建线程池：`ExecutorService threadPool = Executors.newFixedThreadPool(3)`
- 获得Future对象：`Future<Boolean> future = service.submit(Callable接口的实现类对象)`
- 获得返回值：`boolean result = future.get()`

### 创建线程池

#### 三大创建线程池方法

- Executors的newSingleThreadExecutor() ：创建单个线程
- Executors的newFixedThreadPool( n ) ：创建 固定大小的线程池
- Executors的newCachedThreadPool()：创建可伸缩的线程池

#### 七大创建线程池参数

除了上面的三个方法，还可以直接使用new ThreadPoolExecutor() 的方式创建线程池。

ThreadPoolExecutor是ExecutorService接口的实现类。

该实现类的构造方法可以传入七个参数。

分别是核心线程池、线程池最大大小、存活时间、存活时间的单位、阻塞队列、线程工厂、拒绝策略。

#### 推荐创建线程池的方式

推荐使用new ThreadPoolExecutor() 的方式创建线程池，因为手动指定参数可以帮助其他开发者更清楚的知道线程池的详细信息。

newSingleThreadExecutor() 和newFixedThreadPool( n )允许的请求队列长度都为Integer.MAX_VALUE;

newCachedThreadPool()允许创建的线程数量为Integer.MAX_VALUE

因此这三大方法都有可能出现OOM异常。

new ThreadPoolExecutor() 可以通过传入自定义的阻塞队列控制允许的请求队列大小、可以通过传入自定义核心线程池和最大线程池的大小控制最大线程数量，能够有效避免OOM

## 如何停止一个正在运行的线程

1. 线程的执行体执行结束之后会自动停止

2. 还可以在线程中定义一个标志位，通过改变标志位的值停止线程

3. 调用interrupt()方法停止线程。调用stop方法也可以，但是不推荐

   > 第3点原因的解释：
   >
   > 而stop方法会直接停止线程并释放所有锁，有可能导致释放锁时数据没有更新完成，导致其它线程读到了错误的数据，还有可能导致资源（文件流、网络连接等）没有关闭
   >
   > interrupt会向线程发送一个中断信号，线程会根据该信号判断线程停止的时机，在停止前会释放掉锁和需要关闭的资源

## sleep()和wait()的区别

### 所属类不同

- sleep属于Thread类
- wait属于Object

### 使用条件不同

- sleep可以用在任何地方，不会释放线程持有的任何锁
- wait只能用在同步块或者同步方法内。wait方法会使线程释放掉它所持有的对象锁

### 恢复方式不同

- sleep在线程睡眠指定时间后恢复，或者通过抛出InterruptedException恢复
- wait通过notify()或notifyAll()恢复

#### 用途不同

- sleep通常用于模拟延时，或控制线程的执行频率
- wait一般用于线程间通信。

> **什么是对象锁**：
>
> 在 Java 等编程语言中，每个对象都有一个与之关联的锁，也称为监视器锁。当一个线程访问对象的同步方法或同步代码块时，它会获取该对象的锁。在同一时刻，只能有一个线程持有对象的锁，其他试图访问该对象同步资源的线程将被阻塞，直到持有锁的线程释放锁。

## wait()、notify()和notifyAll()的联系

- 调用wait后会使线程进入WAITING或TIMED_WAITING状态，并进入等待集（WaitSet）
- 调用notify后会从等待集中唤醒一个线程，唤醒的顺序要看具体的虚拟机，HotSpot虚拟机会唤醒最先调用wait的线程
- notifyAll会唤醒所有线程争抢cpu资源

### 三者的联系

- wait、notify、notifyAll都需要在同步块或者同步方法中使用
- wait和notify或notifyAll配合实现线程间通信

### notify和notifyAll的区别

- notify会唤醒一个线程，当所有线程都在等待相同的资源，无论唤醒哪个线程都能完成任务时，就使用notify，此时使用notify能够避免唤醒所有线程造成不必要的上下文切换开销
- notifyAll会唤醒所有线程争抢锁，不是特殊情况一般都使用notifAll

## 为什么wait、notify、notifyAll在Object类中

因为将这几个方法定义到Object类中之后，任何对象都拥有了这几个方法。

表示任何对象都能成为线程间通信的条件。

假如将这些方法定义到Thread类中，那么只有Thread类和它的子类才能拥有这些方法，也就是说只有Thread类和它的子类才能成为线程间通信的条件。

## 为什么wait、notify、notifyAll需要在同步代码块中执行

因为在一个线程执行一个对象的wait、notify、notifyAll之前，需要先获得该对象的锁

当该线程执行到该对象的同步代码时，就能确保线程获取到了对象的锁，因此将wait、notify、notifyAll放到同步代码中，能够确保线程在执行这些方法之前就获取对象的锁

如果不放到同步代码中，会抛出IllegalMonitorStateException异常

如果不放到同步代码块中，可能导致wait和notify之间出现竞态条件。

## volatile关键字作用是什么

1. 保证变量的内存可见性

当某个线程对volatile修饰的变量进行修改时，会立即将变量刷新到主存，其它线程要读该变量时，也会将主存的新值更新到cpu缓存中，避免其他线程读到cpu缓存中过期的值

2. 避免指令重排，保证局部有序性

java程序在执行时，为了提高性能，编译器和处理器会对指令进行重排序

在单线程情况下，指令重排不会影响最终结果

而在多线程情况下，指令重排可能会导致最终结果错误，因为不同线程间的操作可能存在依赖关系。例如B线程依赖A线程中一个更新后的值，但是由于指令重排，A线程更新值的操作被排到了后面，导致B线程读到了A线程更新之前的值，导致最后出现错误的结果

因此需要使用volatile关键字，避免某些共享变量进行指令重排

## volatile和Synchronized区别

- volatile是轻量级的同步机制，只能用于变量的可见性和禁止指令重排序，不保证原子性，例如为对象赋值包含了多个操作，这些操作之间可能插入别的操作。开销低。适用于状态标记，比如双重检查锁的单例模式里，对需要实例化的对象加上Volatile关键字，保证对象只实例化一次。

- Synchronized是重量级的同步机制，可以对代码块或者方法进行同步，保证代码块或方法的可见性和原子性，开销大

