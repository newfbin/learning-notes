

## ES版本选择


不同版本的ES差异非常大，包括不局限于ES语 法、架构、API、集群搭建等等。这些差异足以导致不同版本是否能满足你的业务场景以及后续开发维护成本等各种问题。

**先说结论，以个人实践经验及综合考虑推荐使用 7.x 版本中的 7.10版本**

### ES版本对比

以下是通过网上大量资料搜索整理对比了对各个版本差异汇总出的一个表格

| **类型\版本**     | **6.x**                        | **7.x**                                                      | **8.x**                                                      | **建议**                                                     |
| ----------------- | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Licence           | Apache 2.0                     | 7.0 ~ 7.10 Apache 2.07.11++ SSPL                             | SSPL                                                         | 建议选择更友好的Apache2.0版本,SSPL协议对于想要让ES做为PAAS对外提供服务的话，将会面临es厂商的限制 |
| 云厂商支持程度    | 腾讯、阿里云均支持，华为不支持 | 腾讯云支持7.10.1、7.14.2阿里云ES普通版支持7.7、7.10、7.16阿里云ES Serverless只支持7.10.x华为云支持7.6.2, 7.10.2 | 腾讯支持 8.11.3阿里云ES普通版支持8.5、8.9华为不支持          | 各云厂商也主要在推广7.x版本，稳定性及占用率更高，建议选择7.x中的7.10.0版本 |
| 发版时间          | 初版2016                       | 2019年                                                       | 2021年底                                                     | 建议选择7.x版本，经历将近4年，稳定性已经经过验证，6.x和8.x一个太老一个太新 |
| 特性差异          | /                              | 集群配置简化，master选举进行了优化，能够避免集群脑裂问题;索引创建已经去除了type，更加简化;索引查询算法升级，查询性能有优化;提供安全策略;Kibana更轻量化，更易用; | ES API进行了升级方便后续升级使用;更加安全，es默认开启了一些安全功能;新的搜索API 特性，比如支持NLP等; | 7.x基本也能满足目前需求,稳定性也更有保障                     |
| JDK版本           | Java 8                         | 7.0.x-7.4.x 支持87.5.x-7.14.x 支持8-117.15.x-7.17.x 支持8/11/17 |                                                              |                                                              |
| Spring Boot兼容性 | 2.1 ~ 2.2版本对6.x支持         | 2.3 ~ 2.7版本对7.x支持                                       | /                                                            | 这块主要看你Spring Boot框架版本了                            |

### ES客户端SDK版本选择

**结论 ：使用spring官方提供的spring-boot-es-starter**

**以下为各种客户端对比**

| **客户端**                      | **适用版本** | **优点**                                                     | **缺点**                                                     | **建议**          |
| ------------------------------- | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| TransportClient                 | 5.x6.x       | 启动速度快，轻量级，可创建极多连接，与应用程序解耦；推荐使用原生的，ES本身就很简单，灵活性很高 | 分发或查询数据速度较慢，不能获取指定节点数据，高版本已经废弃 | 不建议使用        |
| JestClient                      | 5.x6.x7.x    | 提供Restful API， 原生ES API不具备；若ES集群使用不同的ES版本，使用原生ES API会有问题，而Jest不会；更安全（可以在Http层添加安全处理）；JestClient是ElasticSearch的Java HTTP Rest客户端； JestClient填补了 ElasticSearch缺少HttpRest接口客户端的空白; JestClient可以跨版本 | 18年已经停止更新，7.x、8.x版本兼容性存疑                     | 不建议使用        |
| RestClientlow-level-rest-client | 5.0+         | 基于Http Client 进行的简单封装，RestClient可以跨版本，支持到目前8.x所有版本。 | HttpClient和Jsoup都不直接支持发送DELETE方法带参数的请求（官方高版本已经放弃使用）。使用成本较高 | 不推荐            |
| high-level-rest-client          | 7.2.0-7.16.x | 官方基于RestClient进行的封装，提供一系列API方便对ES的使用    | 在7.17版本后官方又废弃了                                     | 7部分版本推荐使用 |
| New ElasticsearchClient         | 7.17+        | 为最新官方提供的版本                                         | 较高版本es适用                                               | 8.x官方推荐使用   |
| spring-boot-es-starter          | 3.0+         | spring官方封装的ES api，使用起来相对简单,也spring兼容性也能保障，教程也比较多。 | 需要与使用的es版本进行匹配                                   | 推荐使用          |



## Elasticsearch新老版本RestAPI

### 版本

版本内容基于`elasticsearch-7.6.1`。部分API可能会和低版本不一致，而且低版本的elasticsearch 支持多个type，7.0 之后已经移除type概念，默认情况下type有且只能有一个： `_doc`。 应该是为了兼容以前的版本，部分关于type的API依旧可以使用，通常还会会给出Deprecation提示。 在elasticsearch8.X中已经移除了类型（type）

### 创建文档

_index、_type（7.x 已固定）、_id三者唯一确定一个具体文档。 如同数据库数据一样，数据库库、表、主键值唯一确定一条数据。

对于elasticsearch 因为是分布式服务，没有提供自增主键，故需要我们手动指定主键ID或者 es使用特定算法生成主键

#### 自动生成唯一_id

上面提到过 7.0后仅支持 _doc 这一种type， 实际使用时会发现依旧可以创建一个额外的type，但是会有Deprecation提示，不建议这么做，先以创建为例 自动生成ID 为例

##### 7.0 以后

```java
POST  person/_doc
{
    "name":"test",
    "age":256,
    "sex":"男"
}
```

返回结果

```json
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "F1YBNH8B6e0WzfSClmq1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

##### 7.0 版本之前

```json
POST  person/doc
{
    "name":"test",
    "age":20,
    "sex":"男"
}
```

因为现在是elasticsearch-7.6.1 版本，故在Kibana上操作上述语句，则会出现以下提示。 但是依旧执行成功了

> \#! Deprecation: [types removal] Specifying types in search requests is deprecated, use the typeless endpoints instead (/{index}/_doc/{id}, /{index}/_doc, or /{index}/_create/{id})

```json
{
  "_index" : "person",
  "_type" : "doc",
  "_id" : "FFbwM38B6e0WzfSCzGrE",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

使用搜索语句时也会提示 type 已移除

> GET person/doc/_search

> \#! Deprecation: [types removal] Specifying types in document get requests is deprecated, use the /{index}/_doc/{id} endpoint instead.

并且会发现使用 _doc 确实可以访问到数据

```yml
GET person/_doc/FFbwM38B6e0WzfSCzGrE
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "FFbwM38B6e0WzfSCzGrE",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : "test",
    "age" : 256,
    "sex" : "男"
  }
}
```

#### 自定义 _id

这三种写法都支持PUT请求方式

**第一种写法**

```java
POST  person/_create/2
{
    "name":"test",
    "age":256,
    "sex":"男"
}
```

返回结果

```json
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "2",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 2,
  "_primary_term" : 1
}
```

- 当文档id不存在时，创建文档
- 当文档Id存在时，抛出异常

**第二种写法**

```curl
POST person/_doc/1/_create
```

**第三种写法**

```curl
POST person/_doc/2?op_type=create
```

**第四种写法**
该方式， id不存在是创建文档，存在时更新文档

```java
POST  person/_doc/2
{ "name":"test"}
```

##### 异常

前三种方式调用多次，会抛出以下异常信息

> **version conflict, document already exists (current version [1])**

因为如果ID已存在，再次调用则会报错。 状态码409

```json
{
  "error": {
    "root_cause": [
      {
        "type": "version_conflict_engine_exception",
        "reason": "[2]: version conflict, document already exists (current version [1])",
        "index_uuid": "rkGDBwl6SCuWSX2UbrVm7Q",
        "shard": "0",
        "index": "person"
      }
    ],
    "type": "version_conflict_engine_exception",
    "reason": "[2]: version conflict, document already exists (current version [1])",
    "index_uuid": "rkGDBwl6SCuWSX2UbrVm7Q",
    "shard": "0",
    "index": "person"
  },
  "status": 409
}
```

> [2]: version conflict, document already exists (current version [1])

【2】中的就是自定义ID

#### 批量插入

批量操作语法

```yml
POST _bulk
{"actionName":{"_index":"indexName","_type":"_doc", "_id":"id"}}
{"field1":"value1","field2":"value2"}
```

actionName 为操作类型：

- create： 创建文档。文档id已存在会冲突抛出异常
- index： 替换文档（创建|更新）。id已存在会替换
- delete：删除文档
- update: 局部更新

批量操作可以同时操作多个不同的索引。 如果是操作某个固定的索引，可以将索引添加中url中，同时在请求体中可以省略这一部分。

**第一种写法**

```java
POST person/_bulk
{"index":{"_id":"6"}}
{"name":"a","age":25,"sex":"男"}
{"index":{"_id":"6"}}
{"name":"b","age":25,"sex":"女"}
```

id为6的数据执行了两次，两次执行都成功。且最后的结果为最后一条数据。

```json
  "_source" : {
    "name" : "b",
    "age" : 25,
    "sex" : "女"
  }
```

**第二种写法**

```java
POST person/_bulk
{"create":{"_id":"7"}}
{"name":"a","age":25,"sex":"男"}
{"create":{"_id":"7"}}
{"name":"b","age":25,"sex":"女"}
```

id为7 的执行了两此，第一条指定成功， 第二条执行失败

```json
{
  "took" : 5,
  "errors" : true,
  "items" : [
    {
      "create" : {
        "_index" : "person",
        "_type" : "_doc",
        "_id" : "7",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 12,
        "_primary_term" : 3,
        "status" : 201
      }
    },
    {
      "create" : {
        "_index" : "person",
        "_type" : "_doc",
        "_id" : "7",
        "status" : 409,
        "error" : {
          "type" : "version_conflict_engine_exception",
          "reason" : "[7]: version conflict, document already exists (current version [3])",
          "index_uuid" : "QN2oJb_FSF-2ePQesU11aQ",
          "shard" : "0",
          "index" : "person"
        }
      }
    }
  ]
}
```

### 删除文档

```
DELETE  person/_doc/1
```

同样的7.0后的版本， 如果指定了其他 type类型。删除会存在提示

> \#! Deprecation: [types removal] Specifying types in document index requests is deprecated, use the /{index}/_doc/{id} endpoint instead.

#### 批量删除

**第一种写法**

```java
POST person/_bulk
{"delete":{"_id":1}}
{"delete":{"_id":2}}
{"delete":{"_id":3}}
```

或

```java
POST _bulk
{"delete":{"_index":"person","_id":1}}
{"delete":{"_index":"person","_id":2}}
{"delete":{"_index":"person","_id":3}}
```

**第二种写法**

批量删除符合特定查询条件的文档

```java
POST person/_delete_by_query
{
  "query":{
    "term": {
      "age": {
        "value": 256
      }
    }
  }
}
```

### 更新文档

#### 单文档更新

##### 覆盖更新

```json
POST person/_doc/2
{
    "name":"test2",
    "age":28,
    "sex":"男",
    "address":"山东"
}
```

更新操作结果

```java
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "2",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 6,
  "_primary_term" : 1
}
```

该操作 实际的功能是upsert, id不存在时新增，id存在时更新。 可以通过返回的数据判断是何种操作，

> “result”: “updated” , 更新操作
> “result”: “created”， 新增操作

##### 局部更新

如果文档包含数据特别多，信息量比较大，仅仅只是更改某个字段，却需要把整个文档数据传输过去，无疑是不合理的。 比如更新user 表的age字段，却要把user的全部字段信息都传递，造成了无意义的带宽浪费。

当然这个更新不仅仅是对已有字段的更新，还可以添加之前不存在的字段
**语法一**
更新文档2 的sex为 女

```java
POST person/_update/2
{
  "doc":{
    "sex" :"女"
  }
}
```

**语法二**
添加一个手机号字段

```java
POST /person/doc/2/_update

{
    "doc": {
        "phone": "12345678901"
    }
}
```

> \#! Deprecation: [types removal] Specifying types in document update requests is deprecated, use the endpoint /{index}/_update/{id} instead.

当使用其他类型时，可以看到这种方式已经不推荐

经过上述的操作，现在文档结果为：

```json
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "2",
  "_version" : 4,
  "_seq_no" : 8,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : "test2",
    "age" : 28,
    "sex" : "女",
    "phone" : "11111111"
  }
}
```

#### 批量更新

相对的批量更新也分为局部和全局更新两种。

一般来说局部更新用的更多一些， 比如新增字段， city

批量覆盖更新

```java
POST person/_bulk
{"index":{"_id":"6"}}
{"name":"a","age":25,"sex":"男", "city":"临沂"}
```

批量局部更新

```java
POST person/_bulk
{"update":{"_id":"6"}}
{"doc":{"city":"临沂"}}
```

### 总结

在 7.0以后的版本，推荐使用以下API

#### 新增

1. 自动生成ID

   根据REST定义PUT请求是幂等操作。如下API每次调用都会生成新的文档，故必须是POST请求

   ```java
   POST user/_doc
   ```

2. 自定义ID

   POST /PUT 都可以

   ```java
   POST user/_doc/1
   ```

   ```java
   POST  user/_create/2
   ```

   ```java
   POST  user/_doc/3/_create
   ```

3. 批量插入

   ```java
   POST person/_bulk
   {"index":{"_id":"6"}}
   {"name":"a","age":25,"sex":"男"}
   ```

   或者如下

   ```java
   POST _bulk
   {"index":{"_index":"person","_id":"6"}}
   {"name":"a","age":25,"sex":"男"}
   ```

#### 更新

1. 覆盖更新

   ```java
   POST user/_doc/1
   ```

2. 局部更新

   ```java
   POST  user/_update/1
   {
   	"doc":{
   		"filed_name" :"filed_value"
   	}
   }
   ```

3. 批量更新

   ```java
   POST person/_bulk
   {"index":{"_id":"6"}}
   {"name":"a","age":25,"sex":"男"}
   ```

4. 批量局部更新

   ```java
   POST person/_bulk
   {"update":{"_id":"6"}}
   {"doc":{"sex":"女"}}
   ```

#### 删除

1. 删除单个文档

   ```java
   DELETE  user/_doc/1
   ```

2. 批量删除

   ```java
   POST user/_delete_by_query
   ```

   ```java
   POST _bulk
   {"delete":{"_index":"person","_id":1}}
   ```

### 其他异常

**mapper_parsing_exception： failed to parse field [age] of type [long] in document with id ‘2’. Preview of field’s value: ‘q1’**

当创建索引时， 如果未指定字段类型。 那么Elasticsearch为对字段类型进行猜测，动态生成了字段和类型的映射关系。

```yml
GET   person/_mapping
{
  "person" : {
    "mappings" : {
      "properties" : {
        "age" : {
          "type" : "long"
        },
        "name" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "phone" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "sex" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
      }
    }
  }
}   
```

可以看到 age 类型为long 类型。当我试图把age修改为非数字的字符串时，则会报错。 es会先尝试把字符串解析成数字

```java
POST person/_update/2
{
  "doc":{
    "age":"q1"
  }
}
{
  "error": {
    "root_cause": [
      {
        "type": "mapper_parsing_exception",
        "reason": "failed to parse field [age] of type [long] in document with id '2'. Preview of field's value: 'q1'"
      }
    ],
    "type": "mapper_parsing_exception",
    "reason": "failed to parse field [age] of type [long] in document with id '2'. Preview of field's value: 'q1'",
    "caused_by": {
      "type": "illegal_argument_exception",
      "reason": "For input string: \"q1\""
    }
  },
  "status": 400
}
```

参看文档： [elasticsearch 官方文档](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)