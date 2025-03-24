## @FeignClient 和 @EnableFeignClient的作用和使用场景

### @FeignClient 

**作用**：

`@FeignClient` 注解用于创建一个声明式的 HTTP 客户端。借助这个注解，你能够以接口的形式定义服务之间的调用，并且 Feign 会自动为这个接口生成实现类，从而实现对远程服务的调用。这可以让你像调用本地方法一样调用远程服务，而无需编写繁琐的 HTTP 请求代码。

**使用场景**：

该注解通常被用在接口上，这个接口会定义一系列调用远程服务的方法。以下是一个简单示例：

```java
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

// 定义一个 Feign 客户端，name 为服务名，url 为服务地址
@FeignClient(name = "user-service", url = "http://localhost:8081") 
public interface UserServiceClient {

    // 定义一个调用远程服务的方法
    @GetMapping("/users") 
    String getUsers();
}
```

在这个示例中，`UserServiceClient` 接口定义了一个调用 `user-service` 服务的 `/users` 端点的方法。Feign 会自动创建该接口的实现类，并且将这个方法的调用转化为 HTTP 请求。

### @EnableFeignClient

**作用**：

`@EnableFeignClient` 注解用于启用 Feign 客户端的功能。在 Spring Boot 应用里添加这个注解之后，Spring 会扫描所有被 `@FeignClient` 注解标注的接口，并且为这些接口创建代理对象。

**使用场景**：

此注解一般用在 Spring Boot 应用的主类上，以此来启用 Feign 客户端功能。示例如下：

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

// 启用 Feign 客户端功能
@EnableFeignClients 
@SpringBootApplication
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

在这个示例中，`MyApplication` 类是 Spring Boot 应用的主类，通过添加 `@EnableFeignClients` 注解，Spring 会扫描所有被 `@FeignClient` 注解标注的接口，并为这些接口创建代理对象。