## SpringBoot是什么

SpringBoot是简化Spring应用程序的框架，它的目标就是简化Spring程序的配置和开发复杂性

Spring有内置服务器、简化配置、独立运行的特点。

- 内置服务器：SpringBoot内置了Tomcat、Jetty等服务器，无需再将程序打包为war包部署到服务中，只需要打包为jar包就能够运行
- 简化配置：SpringBoot使用@EnableAutoConfiguration注解自动配置，无需复杂的xml配置
- 独立运行：SpringBoot打包为jar包后可以直接运行，无需部署到服务器上

## SpringBoot核心注解

@SpringBootApplication是SpringBoot的核心注解

它是@Configuration、@EnableAutoConfiguration、@ComponentScan三个注解的组合

## 如何理解SpringBoot中的Starter

SpringBoot中，Starter是一组依赖集合，用于简化构建配置。

开发者只需要引入一个Starter依赖，就能获得该模块所有的相关依赖和配置。而无需手动添加多个相关依赖和配置文件

## 自定义SpringBoot Starter

我制作过一个能够统计ip访问次数的Starter

自定义流程如下：

- 我先创建了一个SpringBoot项目
- 首先创建了service和serviceImpl类，在里面实现统计ip次数的方法。
- 接着创建了一个AutoConfiguration类，该类将serviceImpl类注册为bean
- 接着在src/main/resources/META-INF目录下新建一个spring.factories文件，在该文件中定义该自动配置类
- 之后执行mvn install 命令就能把这个starter安装到本地maven仓库，也可以打包后发布到中央仓库或私有仓库

使用方式：

- 需要该starter的项目的pom文件中引入该starter
- 然后在Contorller接口中通过@Autowired注解，将Starter中的serviceImpl注入进来
- 接着在接口中调用serviceImpl的方法，这样每次访问接口就会统计一次ip的访问次数

之后我对这个starter进行了一个优化：

- 我又在starter项目中定义了一个拦截器，实现了HandlerInteceptor接口并实现了其中的prehandle方法
- 将注入serviceImpl和调用serviceImpl方法的代码都放到了拦截器中
- 这样只需要将starter引入需要引入的项目里，之后每次处理HTTP请求之前都会自动统计ip的访问次数，不需要写任何代码

## 如何在SpringBoot启动时执行特定的代码

- 实现CommandLineRunner接口或ApplicationRunner接口，并实现其中的run方法
- 实现InitialingBean接口并实现afterPropertiesSet方法，可以在Spring容器初始化bean的属性后，执行特定的初始化逻辑
- 可以在方法上使用@PostConstruct注解，这样可以在bean初始化完成后立即执行方法

## 什么是Spring Actuator

SpringActuator是监控SpringBoot应用状态的工具

使用方式：

- 先添加pom依赖，再在配置文件中配置
- 之后可以通过访问不同的url查看不同的信息，比如/actuator/health可以查看应用的健康信息、/actuator/info可以查看一些自定义的信息