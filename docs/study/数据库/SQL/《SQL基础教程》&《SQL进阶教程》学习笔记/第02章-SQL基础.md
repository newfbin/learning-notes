# 第02章 SQL基础

------

## 1、数据库 / 表

### （1）数据库

CREATE DATABASE shop;

DROP DATABASE shop;

### （2）表

```sql
CREATE TABLE Product
(
    product_id CHAR(4) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_type VARCHAR(32) NOT NULL,
    sale_price INTEGER ,
    purchase_price INTEGER ,
    regist_date DATE ,
    PRIMARY KEY (product_id)
);
```

DROP TABLE Product;

## 2、SELECT

- `select *` 的星号无法设定列的显示顺序，这时就会按照 CREATE TABLE 语句的定义对列进行排序。

- `DISTINCE` 针对的是 select 后的所有列的去重，只需要在第一列的前面加就好（或者 * 前面）。因此，`select DISTINCT "a","b"` 不可以写成 `select "a", DISTINCT "b"` 。

  > 下面介绍的 GROUP BY 也可以达到去重的效果。

- 大多数人都喜欢先写 SELECT 再写 FROM，但推荐**先写 FROM 再写 SELECT**，因为符合 SQL 的执行顺序，方便理解。

  > 如果把从 SELECT 子句开始写的方法称为自顶向下法，那么从 FROM 子句开始写的方法就可以称为自底向上法。

