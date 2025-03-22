## 8、整合Sentinel完成流控和降级

### maven依赖

使用Sentinel作为gateWay的限流、降级、系统保护工具

```xml
<!--alibaba 流量卫士-->
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-core</artifactId>
    <version>${sentinel.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
</dependency>
```

### 配置文件

客户端配置：在配置文件中增加下列配置，dashboard就可以轻松管理客户端了，还有一种方式是在启动时加入

```yaml
spring:
  cloud:
    sentinel:
      transport:
        ## VM
        ##-Djava.net.preferIPv4Stack=true -Dcsp.sentinel.dashboard.server=localhost:8080 -Dcsp.sentinel.api.port=8666 -Dproject.name=gateway -Dcsp.sentinel.app.type=1
        dashboard: localhost:8880
        port: 8880
```

### 限流规则通用配置

由于sentinel的工作原理其实借助于全局的filter进行请求拦截并计算出是否进行限流、熔断等操作的，增加SentinelGateWayFilter配置

```java
@Bean//拦截请求
@Order(Ordered.HIGHEST_PRECEDENCE)
public GlobalFilter sentinelGatewayFilter() {
    return new SentinelGatewayFilter();
}
```

sentinel 不仅支持通过硬代码方式进行资源的申明，还能通过注解方式进行声明，为了让注解生效，还需要配置切面类SentinelResourceAspect

```java
@Bean
public SentinelResourceAspect sentinelResourceAspect() {
    return new SentinelResourceAspect();
}
```

sentinel拦截包括了视图、静态资源等，需要配置viewResolvers以及拦截之后的异常，我们也可以自定义抛出异常的提示

```java
public SentinelConfig(ObjectProvider<List<ViewResolver>> viewResolversProvider,
                      ServerCodecConfigurer serverCodecConfigurer) {
    this.viewResolvers = viewResolversProvider.getIfAvailable(Collections::emptyList);
    this.serverCodecConfigurer = serverCodecConfigurer;
}

@Bean//自定义异常
@Order(Ordered.HIGHEST_PRECEDENCE)
public ExceptionHandler sentinelGatewayBlockExceptionHandler() {
    // Register the block exception handler for Spring Cloud Gateway.
    return new ExceptionHandler(viewResolvers, serverCodecConfigurer);
}
```

自定义异常提示：当发生限流、熔断异常时，会返回定义的提示信息。

```java
/**
 * 配置限流的异常处理器:SentinelGatewayBlockExceptionHandler
 */
@Bean
@Order(Ordered.HIGHEST_PRECEDENCE)
public SentinelGatewayBlockExceptionHandler sentinelGatewayBlockExceptionHandler() {
    return new SentinelGatewayBlockExceptionHandlerEX(viewResolvers, serverCodecConfigurer);
}
```

不需要额外的配置，sentinel就已经可以正常工作了

### 限流规则设置

1 资源定义：定义API组

```java
private void initCustomizedApis() {
    Set<ApiDefinition> definitions = new HashSet<>();

    ApiDefinition api3 = new ApiDefinition("filter_api_group")
        .setPredicateItems(new HashSet<ApiPredicateItem>() {{
            add(new ApiPathPredicateItem().setPattern("/filter/**")
                .setMatchStrategy(SentinelGatewayConstants.URL_MATCH_STRATEGY_PREFIX));
        }});

    ApiDefinition api4 = new ApiDefinition("service-provider-demo_api_group")
        .setPredicateItems(new HashSet<ApiPredicateItem>() {{
            add(new ApiPathPredicateItem().setPattern("/service-provider-demo/**")
                .setMatchStrategy(SentinelGatewayConstants.URL_MATCH_STRATEGY_PREFIX));
        }});

    definitions.add(api3);
    definitions.add(api4);

    GatewayApiDefinitionManager.loadApiDefinitions(definitions);
}
```

2 定义限流规则

```java
private void initGatewayRules() {
    Set<GatewayFlowRule> rules = new HashSet<>();
    /*设置限流规则
        count: QPS即每秒钟允许的调用次数
        intervalSec: 每隔多少时间统计一次汇总数据，统计时间窗口，单位是秒，默认是 1 秒。
        */
    GatewayFlowRule rule3 = new GatewayFlowRule("filter_api_group")
        .setResourceMode(SentinelGatewayConstants.RESOURCE_MODE_CUSTOM_API_NAME)
        .setCount(1) //qps 1
        .setIntervalSec(1)  //1 s
        ;

    GatewayFlowRule rule4 = new GatewayFlowRule("service-provider-demo_api_group")
        .setResourceMode(SentinelGatewayConstants.RESOURCE_MODE_CUSTOM_API_NAME)
        .setCount(1) //qps 1
        .setIntervalSec(1)  //10 s
        ;
    rules.add(rule4);
    rules.add(rule3);
    GatewayRuleManager.loadRules(rules);

}
```

> 具体请参见学习视频

### 网关限流参数

其中网关限流规则 GatewayFlowRule的字段解释如下：

- resource：资源名称，可以是网关中的 route 名称或者用户自定义的 API 分组名称。

- resourceMode：规则是针对 API Gateway 的 route（RESOURCE_MODE_ROUTE_ID）还是用户在 Sentinel 中定义的 API 分组（RESOURCE_MODE_CUSTOM_API_NAME），默认是 route。

- grade：限流指标维度，同限流规则的 grade 字段。

- count：限流阈值

- intervalSec：统计时间窗口，单位是秒，默认是 1 秒。

- controlBehavior：流量整形的控制效果，同限流规则的 controlBehavior 字段，目前支持快速失败和匀速排队两种模式，默认是快速失败。

- burst：应对突发请求时额外允许的请求数目。

- maxQueueingTimeoutMs：匀速排队模式下的最长排队时间，单位是毫秒，仅在匀速排队模式下生效。

- paramItem

  参数限流配置。若不提供，则代表不针对参数进行限流，该网关规则将会被转换成普通流控规则；否则会转换成热点规则。其中的字段：

  - parseStrategy：从请求中提取参数的策略，目前支持提取来源 IP（PARAM_PARSE_STRATEGY_CLIENT_IP）、Host（PARAM_PARSE_STRATEGY_HOST）、任意 Header（PARAM_PARSE_STRATEGY_HEADER）和任意 URL 参数（PARAM_PARSE_STRATEGY_URL_PARAM）四种模式。
  - fieldName：若提取策略选择 Header 模式或 URL 参数模式，则需要指定对应的 header 名称或 URL 参数名称。
  - pattern：参数值的匹配模式，只有匹配该模式的请求属性值会纳入统计和流控；若为空则统计该请求属性的所有值。（1.6.2 版本开始支持）
  - matchStrategy：参数值的匹配策略，目前支持精确匹配（PARAM_MATCH_STRATEGY_EXACT）、子串匹配（PARAM_MATCH_STRATEGY_CONTAINS）和正则匹配（PARAM_MATCH_STRATEGY_REGEX）。（1.6.2 版本开始支持）

用户可以通过 GatewayRuleManager.loadRules(rules) 手动加载网关规则，或通过 GatewayRuleManager.register2Property(property) 注册动态规则源动态推送（推荐方式）。

