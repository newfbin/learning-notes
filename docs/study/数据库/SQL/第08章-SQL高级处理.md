# 第08章 SQL高级处理

------

本章介绍的 窗口函数 和 GROUPING 运算符都是为了实现 OLAP 用途而添加的功能，是 SQL 里比较新的功能。

> 截止到 2016 年 5 月，Oracle、SQL Server、DB2、PostgreSQL 的最新版本都已经支持这些功能了，但MySQL 的最新版本 5.7 还是不支持这些功能。

`OLAP` 是 OnLine Analytical Processing 的简称，意思是**对数据库数据进行实时分析处理**，用来诸如**生成报表**。例如，市场分析、创建财务报表、创建计划等日常性商务工作。

## 1、窗口函数

> 下面会结合原书 + 我之前的一篇文章《 [PostgreSQL 窗口函数 ( Window Functions ) 如何使用？](https://www.cnblogs.com/xjnotxj/p/11198566.html)》+ 自己的理解，梳理下。

### （1）窗口函数和聚合的区别

窗口函数跟聚合还是挺像的，但区别是：

**窗口函数不会像聚合一样将参与计算的行合并成一行输出，而是将计算出来的结果带回到了计算行上。**

### （2）用法

完整示例：

```sql
SELECT "product_name", "product_type", "sale_price",
AVG ("sale_price") OVER ( 
    PARTITION BY "product_type"
    ORDER BY "sale_price" 
    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING ) AS "avg"
FROM "Product";
```

1、`AVG (sale_price)` 为`窗口函数`。

窗口函数大体可以分为以下两种：

- 所有的**聚合函数**都能用作窗口函数，如（SUM、AVG、COUNT、MAX、MIN）
- RANK、DENSE_RANK、ROW_NUMBER 等`专用窗口函数`

问：专用窗口函数 跟 聚合函数 的用法区别 ？

答：

- 由于专用窗口函数无需参数，因此通常括号中都是空的。而聚合函数一般都需要传参来指定列名。
- 原则上**窗口函数只能在 SELECT 子句中使用**。其理由是，在 DBMS 内部，窗口函数是对 WHERE 子句或者 GROUP BY 子句处理后的“结果”进行的操作。

2、`PARTITION BY "product_type"` 的 `PARTITION BY`，类似于 GROUP BY。通过 PARTITION BY 分组后的记录集合称为`窗口`。此处的**窗口并非“窗户”的意思，而是代表`范围`**。

PARTITION BY 可以**省略**，代表全部记录集合为一个窗口。

3、`ORDER BY "sale_price"` 的 `ORDER BY`，是在窗口函数调用前，先把每个窗口内的记录集合排序。

问：为什么用 GROUP BY 的时候不需要加 ORDER BY ？

答：因为跟 GROUP BY 一起使用的聚合函数针对的记录集合是每一个分组，排不排序不影响最终结果，而窗口函数针对的记录集合是每一个窗口里的子范围（这个子范围即”框架“，下面即将介绍 ），所以排序很关键。

ORDER BY 可以**省略**，即默认排序。

4、`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` 中，`ROWS` 用来定义窗口内的（行）范围，称为`框架`。

有三种写法：

① ROWS 2 PRECEDING -- 之前

② ROWS 2 FOLLOWING -- 之后

③ ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING -- 之间

> 可用 `UNBOUNDED` 代替数字表示**无边界**。

以 ① 为例，ROWS 2 PRECEDING 就是将窗口内的范围指定为“**截止到之前 2 行**”，也就是将作为汇总对象的记录限定为如下的 “**最靠近的 3 行**”：

● 自身（当前记录）

● 之前1行的记录

● 之前2行的记录

这样的统计方法称为`移动平均`（moving average）。

> 由于这种方法在希望实时把握“最近状态”时非常方便，因此常常会应用在对股市趋势的实时跟踪当中。

ROWS 可以**省略**，默认值为：

- 若不指定 `ORDER BY`，默认使用窗口内所有行，等于 `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`
- 若指定了 `ORDER BY`，默认使用窗口内第一行到当前值 ，等于`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`

### （3）应用场景

**例子1（用于累计）：**

```sql
SELECT product_id, product_name, sale_price,
AVG (sale_price) OVER (ORDER BY product_id) AS current_avg
FROM Product;
```

结果：

```sql
product_id | product_name | sale_price | current_avg
----------+-----------+-------------+-----------------------
0001 | T恤衫 | 1000 | 1000.0000000000000000 ←(1000)/1
0002 | 打孔器 | 500 | 750.0000000000000000 ←(1000+500)/2
0003 | 运动T恤 | 4000 | 1833.3333333333333333 ←(1000+500+4000)/3
0004 | 菜刀 | 3000 | 2125.0000000000000000 ←(1000+500+4000+3000)/4
0005 | 高压锅 | 6800 | 3060.0000000000000000 ←(1000+500+4000+3000+6800)/5
0006 | 叉子 | 500 | 2633.3333333333333333
0007 | 擦菜板 | 880 | 2382.8571428571428571
0008 | 圆珠笔 | 100 | 2097.5000000000000000 
```

**例子2（用于排名）：**

先介绍 3 个专用窗口函数，用来排名的。

- `RANK`函数

计算排序时，如果存在相同位次的记录，则会跳过之后的位次。

例：有3 条记录排在第1 位时：1 位、1 位、1 位、4 位……

- `DENSE_RANK`函数

同样是计算排序，即使存在相同位次的记录，也不会跳过之后的位次。

例：有3 条记录排在第1 位时：1 位、1 位、1 位、2 位……

- `ROW_NUMBER`函数

赋予唯一的连续位次。

例：有3 条记录排在第1 位时：1 位、2 位、3 位、4 位……

例子：

```sql
SELECT product_name, product_type, sale_price,
RANK () OVER (ORDER BY sale_price) AS ranking,
DENSE_RANK () OVER (ORDER BY sale_price) AS dense_ranking,
ROW_NUMBER () OVER (ORDER BY sale_price) AS row_num
FROM Product;
```

结果：

```sql
product_name | product_type | sale_price | ranking | dense_ranking | row_num

圆珠笔 | 办公用品 | 100 | 1 | 1 | 1

叉子 | 厨房用具 | 500 | 2 | 2 | 2

打孔器 | 办公用品 | 500 | 2 | 2 | 3

擦菜板 | 厨房用具 | 880 | 4 | 3 | 4

T恤衫 | 衣服 | 1000 | 5 | 4 | 5

菜刀 | 厨房用具 | 3000 | 6 | 5 | 6

运动T恤 | 衣服 | 4000 | 7 | 6 | 7

高压锅 | 厨房用具 | 6800 | 8 | 7 | 8
```

------

> 上面的 累计 和 排名，本质上都属于同一种计算逻辑，即冯·诺依曼型递归集。

### （4）提取 OVER 变量

如果在 SQL 里写了很多重复的 OVER()，可以提取成一个 window 变量，简化代码。

```sql
SELECT *, 
    avg("score") OVER window_frame as "subject_avg_score",
    avg("score") OVER window_frame as "subject_avg_score_2",
    avg("score") OVER window_frame as "subject_avg_score_3"
FROM "testScore" 
window window_frame as (PARTITION BY "subject")
```

## 2、GROUPING 运算符

### 1、ROLLUPーー同时得出合计和小计 ( GROUPING 函数ーー让 NULL 更加容易分辨 )

`ROLLUP` 可以用来同时得出**合计和小计**。而避免用 UNION 繁琐的方式。

### （1）只用 ROLLUP

```sql
SELECT product_type, regist_date, SUM(sale_price) AS sum_price
FROM Product
GROUP BY ROLLUP(product_type, regist_date);
```

结果：

| product_type | regist_date | sum_price |
| ------------ | ----------- | --------- |
|              |             | 16780     |
| 厨房用具     |             | 11180     |
| 厨房用具     | 2008-04-28  | 880       |
| 厨房用具     | 2009-01-15  | 6800      |
| 厨房用具     | 2009-09-20  | 3500      |
| 办公用品     |             | 600       |
| 办公用品     | 2009-09-11  | 500       |
| 办公用品     | 2009-11-11  | 100       |
| 衣服         |             | 5000      |
| 衣服         | 2009-09-20  | 1000      |
| 衣服         |             | 4000      |

`GROUP BY ROLLUP (product_type, regist_date);` 的结果等于：

① GROUP BY ()

② GROUP BY (product_type)

③ GROUP BY (product_type, regist_date)

三者的 UNION。

其中 ① 中的 GROUP BY () 表示没有聚合键，也就相当于没有 GROUP BY 子句（**这时会得到全部数据的合计行的记录**）。

上面结果中，第 1、2、3、7、10、12 行称为`超级分组记录`（super group row）。

### （2）用 ROLLUP + GROUPING

```sql
SELECT

 CASE WHEN GROUPING(product_type) = 1
THEN '商品种类 合计'
ELSE product_type END AS product_type,

 CASE WHEN GROUPING(regist_date) = 1
THEN '登记日期 合计'
ELSE CAST(regist_date AS VARCHAR(16)) END AS regist_date,

 SUM(sale_price) AS sum_price
FROM Product
GROUP BY ROLLUP(product_type, regist_date);
```

上面 *（1）只用 ROLLUP* 的例子，超级分组记录都存在 null 数据的情况，为了避免阅读的混淆，SQL 提供了一个用来判断超级分组记录的 NULL 的特定函数—— `GROUPING` 函数。**该函数在其参数列的值为超级分组记录所产生的 NULL 时返回 1 ，其他情况返回 0**。

结果：

| product_type  | regist_date   | sum_price |
| ------------- | ------------- | --------- |
| 商品种类 合计 | 登记日期 合计 | 16780     |
| 厨房用具      | 登记日期 合计 | 11180     |
| 厨房用具      | 2008-04-28    | 880       |
| 厨房用具      | 2009-01-15    | 6800      |
| 厨房用具      | 2009-09-20    | 3500      |
| 办公用品      | 登记日期 合计 | 600       |
| 办公用品      | 2009-09-11    | 500       |
| 办公用品      | 2009-11-11    | 100       |
| 衣服          | 登记日期 合计 | 5000      |
| 衣服          | 2009-09-20    | 1000      |
| 衣服          |               | 4000      |

### 2、CUBE——用数据来搭积木

上面 *（2）用 ROLLUP + GROUPING* 的例子，直接把 ROLLUP 改写成 CUBE 就行：

```sql
SELECT

 CASE WHEN GROUPING(product_type) = 1
THEN '商品种类 合计'
ELSE product_type END AS product_type,

 CASE WHEN GROUPING(regist_date) = 1
THEN '登记日期 合计'
ELSE CAST(regist_date AS VARCHAR(16)) END AS regist_date,

 SUM(sale_price) AS sum_price
FROM Product
GROUP BY CUBE(product_type, regist_date);
```

`GROUP BY CUBE (product_type, regist_date);` 的结果等于

① GROUP BY ()

② GROUP BY (product_type)

**③ GROUP BY (regist_date) ←新添的组合**

④ GROUP BY (product_type, regist_date)

三者的 UNION。

CUBE 生成的 GROUP BY 组合，是 **2 的 n 次方**（n 是聚合键的个数）。

> 这就是 CUBE 如此起名的由来。

结果（第3-8行是比之前多出来的）：

| product_type  | regist_date   | sum_price |
| ------------- | ------------- | --------- |
| 商品种类 合计 | 登记日期 合计 | 16780     |
| 商品种类 合计 | 2008-04-28    | 880       |
| 商品种类 合计 | 2009-01-15    | 6800      |
| 商品种类 合计 | 2009-09-11    | 500       |
| 商品种类 合计 | 2009-09-20    | 4500      |
| 商品种类 合计 | 2009-11-11    | 100       |
| 商品种类 合计 |               | 4000      |
| 厨房用具      | 登记日期 合计 | 11180     |
| 厨房用具      | 2008-04-28    | 880       |
| 厨房用具      | 2009-01-15    | 6800      |
| 厨房用具      | 2009-09-20    | 3500      |
| 办公用品      | 登记日期 合计 | 600       |
| 办公用品      | 2009-09-11    | 500       |
| 办公用品      | 2009-11-11    | 100       |
| 衣服          | 登记日期 合计 | 5000      |
| 衣服          | 2009-09-20    | 1000      |
| 衣服          |               | 4000      |

### 3、GROUPING SETS——取得期望的积木

因为 GROUPING SETS 会获得不固定结果，因此与 ROLLUP 或者CUBE 比起来，使用GROUPING SETS 的机会很少。

这里姑且略过。

