# 第06章 函数、谓词、CASE 表达式

------

> 为什么把这三块合并成一章，因为 谓词 和 CASE 表达式 本质上也是函数。

## 1、函数

函数大致可以分为以下几种：

1、算术函数（用来进行数值计算的函数）

2、字符串函数（用来进行字符串操作的函数）

3、日期函数（用来进行日期操作的函数）

4、转换函数（用来转换数据类型和值的函数

5、聚合函数（用来进行数据聚合的函数）

### （1）COALESCE —— 将 NULL 转换为其他值

```sql
SELECT 
    COALESCE ( NULL, 1 ) AS col_1,
    COALESCE ( NULL, 'test', NULL ) AS col_2,
    COALESCE ( NULL, NULL, '2009-11-01' ) AS col_3;
```

## 2、谓词（运算符）与 NULL【重难点】

### （1）三值逻辑

普通语言里的布尔型只有 **true** 和 **false** 两个值，这种逻辑体系被称为`二值逻辑`。

而 SQL 语言里，除此之外还有第三个值 `unknown`，这种逻辑体系被称为`三值逻辑`（three-valued logic）。关系数据库里引进了`NULL`，所以不得不同时引进第三个布尔值（但是 unknown 值不能被直接引用，直接使用的只能是 NULL）。

> 历史上最早提出三值逻辑（three-valued-logic）体系的是波兰的著名逻辑学家卢卡西维茨（Jan Lukasiewicz, 1878—1956）。在二十世纪二十年代，他定义了“真”和“假”之外的第三个逻辑值“可能”。

### （2）谓词逻辑

`谓词逻辑`中，原子`命题`分解成`个体词`和`谓词`。 个体词是可以独立存在的事或物，包括现实物、精神物和精神事三种。谓词则是用来刻划个体词的性质的词，即刻画事和物之间的某种关系表现的词。如“苹果”是一个现实物个体词，"苹果可以吃"是一个原子命题，“可以吃”是谓词，刻划“苹果”的一个性质，即与动物或人的一个关系。

所以，在谓词逻辑中，谓词的作用是，“**判断（个体词）是否存在满足某种条件**”，且返回`真值`（在三值逻辑里，即 TRUE/ FALSE/ UNKNOWN）。

> 在逻辑中，**真值**（truth value），又称逻辑值（logical value），是指示一个陈述在什么程度上是真的。在计算机编程上多称做布林值、布尔值。
>
> 拓展 —— `排中律`（Law of Excluded Middle）就是指不认可中间状态，对命题真伪的判定黑白分明。是否承认这一定律被认为是**古典逻辑学**和**非古典逻辑学**的分界线。如，约翰的年龄，在现实世界中，“要么是20 岁，要么不是20 岁”——这样的常识在三值逻辑里却未必正确，也有可能未知，即 unknown。故，在 SQL 的世界里，排中律是不成立的。

谓词逻辑的出现具有划时代的意义，原因就在于为命题分析提供了**函数式**的方法。所以谓词可以通俗理解为函数，区别在于**返回值**：

- 函数的返回值有可能是数字、字符串或者日期等
- 谓词的返回值全都是`真值`

### （3）谓词逻辑在 SQL 中的应用

表常常被认为是行的集合，但从谓词逻辑的观点看，也可以认为是命题的集合。

同样，如 WHERE 子句，其实也可以看成是由多个谓词组合而成的新谓词。**只有能让WHERE 子句的返回值为真的命题，才能从表（命题的集合）中查询到**。

### （4）SQL 中的谓词 —— 比较谓词

```sql
=`、`<>`、`>=`、`>`、`<=`、`<
```

> 不等于也可以写作 `!=` ，但是为了兼容性，还是推荐使用 标准sql 里的 `<>`。

### （5）SQL 中的谓词 —— 其他谓词

1、`LIKE`

2、`BETWEEN`

如：WHERE sale_price BETWEEN 100 AND 1000;

> 左闭右闭

3、`IS NULL`、`IS NOT NULL`

> 判断是否为 NULL 就不要用 <> 了，而是用这个。

4、限定谓词 - `IN` （`ANY`）

**IN 是多个 OR 的简便用法**，如 "col" IN (320, 500, 5000); 或 200 IN ("col1", "col2", "col3");

> IN 还有个别称叫 ANY，为了跟下面的 ALL 对应。

5、限定谓词 - `ALL`

**ALL 是 多个AND 的简便用法**，如 "col" ALL (320, 500, 5000); 或 200 ALL ("col1", "col2", "col3");

**拓展：推荐使用极值函数代替 ALL**

```sql
SELECT *
FROM Class_A
WHERE age < ( 
    SELECT MIN(age)
    FROM Class_B
    WHERE city = '东京' 
);
```

推荐原因：**极值函数在统计时会把为 NULL 的数据排除掉**，避免出错。

> ALL 跟 极值函数在语义上还是有细微区别的：
>
> -  ALL 谓词：他的年龄比在东京住的所有学生都小
> -  极值函数：他的年龄比在东京住的年龄最小的学生还要小

但是极值函数也有**隐患，极值函数（聚合函数）在输入为空表（空集）时会返回 NULL**。

建议：使用 COALESCE 函数将极值函数返回的 NULL 处理成合适的值。

> 很像 lodash 的 get 方法，给个返回的默认值。

6、`EXISTS`

例子：有 Product 产品表 和 ShopProduct 店铺表，选取出“大阪店（shop_id:000C）在售商品的销售单价”。

```sql
-- IN 写法
SELECT product_name, sale_price
FROM Product WHERE product_id IN (    
    SELECT product_id    
    FROM ShopProduct      
    WHERE shop_id = '000C'
);

-- EXISTS 写法 [推荐]
SELECT product_name, sale_price
FROM Product AS P WHERE EXISTS (    
    SELECT * -- ①    
    FROM ShopProduct AS SP         
    WHERE SP.shop_id = '000C'    
    AND SP.product_id = P.product_id
);

-- NOT EXISTS 写法 —— “东京店（shop_id:000A）在售之外的商品的销售单价”
SELECT product_name, sale_price
FROM Product AS P  
WHERE NOT EXISTS (    
    SELECT *    
    FROM ShopProduct AS SP     
    WHERE SP.shop_id = '000A'    
    AND SP.product_id = P.product_id
);
```

注意：① 这里的 `SELECT *` ，返回哪些列都没有关系（当然惯例还是用 `*` 最好），因为 EXIST 只关心记录是否存在。

> 拓展：NOT EXISTS 具备有差集运算的功能。

7、`NOT`、`AND`、`OR`

> NOT 运算符用来否定某一条件，但是不能滥用。否则会降低可读性。

### （6）拓展 - N 阶谓词的划分

谓词逻辑中，根据输入值的阶数（order）对谓词进行分类。

= 或者 BETWEEEN 等大多数输入值为**一行**的谓词叫作“`一阶谓词`”，

而像 IN（ANY）、ALL 、EXISTS 还有 HAVING 这样输入值为**行的集合**的谓词叫作“`二阶谓词`”。

> **二阶谓词一般都习惯跟 关联子查询 搭配使用。**
>
> 二阶谓词，如 IN 和 EXISTS 和 HAVING 在很多情况下都是可以互换的，

`三阶谓词`＝输入值为“**集合的集合**”的谓词

`四阶谓词`＝输入值为“**集合的集合的集合**”的谓词

我们可以像上面这样无限地扩展阶数，但是**SQL 里并不会出现三阶以上**的情况，所以不用太在意。

> 使用过List、Hakell 等函数式语言或者Java 的读者可能知道“`高阶函数`”这一概念。它指的是不以一般的原子性的值为参数，而**以函数为参数的函数**。

### （7）运算符

上面从谓词的角度分类，这里我们按照运算符的角度来划分的话：

**1、算术运算符**

```sql
+`、`-`、`*`、`/`、`%
```

**2、比较运算符**

即上面介绍的 比较谓词。

**3、逻辑运算符**

即上面介绍的 其他谓词。

4、其他运算符

`||`：拼接字符串

运算符的**优先级**：（圆括号）> 算术运算符 > 比较运算符 > 逻辑运算符。

其中，逻辑运算符中的优先级：NOT > AND > OR。

### （8）特殊的 NULL

**1、NULL 不是值**

NULL 容易被认为是值的原因恐怕有两个。

第一个是在 C 语言等编程语言里面，NULL 被定义为了一个常量（很多语言将其定义为了整数0），这导致了人们的混淆。但是，其实 SQL 里的 NULL 和其他编程语言里的 NULL 是完全不同的东西。

第二个原因是，IS NULL 这样的谓词是由两个单词构成的，所以人们容易把 IS 当作谓词，而把 NULL 当作值。我们应该把 IS NULL 看作是一个谓词。因此，如果可以的话，写成 IS_NULL 这样也许更合适。

2、因为 NULL 不是值，所以常见的对 NULL 的说法也是错的：“列的值为NULL”、“NULL 值”……

3、**算术运算符 遇上 NULL 结果都是 NULL**

4、**比较运算符 和 逻辑运算符 遇上 NULL 结果基本上是 unknown，或者说，对 NULL 使用谓词后的结果基本上是 unknown**。

为什么说基本上？ 因为有特殊情况，如遇到 OR 和 AND，还是会分别出现结果是 TRUE 和 FALSE 的；或者 EXIST

具体参考下面的真值表：

三值逻辑的真值表（AND）

| AND  | t    | u    | f    |
| ---- | ---- | ---- | ---- |
| t    | t    | u    | f    |
| u    | u    | u    | f    |
| f    | f    | f    | f    |

三值逻辑的真值表（OR）

| OR   | t    | u    | f    |
| ---- | ---- | ---- | ---- |
| t    | t    | t    | t    |
| u    | t    | u    | u    |
| f    | t    | u    | f    |

### （9）避免使用 NULL

从上面的叙述，你可以看出 NULL 是有多么特殊和多么容易引起错误了。

> NULL 最恐怖的地方就在于即使你认为自己已经完全驾驭它了，但还是一不小心就会被它在背后捅一刀。

1、避免使用的方法

- 加上 NOT NULL 约束

- 使用默认值

- 编号：使用异常编号

  例如 ISO 的性别编号中，除了 “1: 男性”，“2: 女性”，还定义了 “0: 未知”，“9: 不适用” 这两个用于异

  常情况的编号。

- 名字：使用“无名氏”

  例如名字用 “未知” or “UNKNOWN” 代替，类别用"-"代替。

- 数值：使用 0

- 日期：用最大值或最小值代替

  例如开始日期和结束日期，可以使用 0000-01-01 或者 9999-12-31。

2、但你无法100%避免

无法完全消除 NULL 的原因是它扎根于关系数据库的底层中。仅靠上面提到的方法并不足够。

例如，使用外连接，或者 SQL-99 中添加的带 CUBE 或 ROLLUP 的 GROUP BY 时，还是很容易引入 NULL 的。

3、结论

因此我们能做的最多也只是 **“尽量”去避免 NULL 的产生，并在不得不使用时适当使用**。

### （10）拓展 —— EXISTS vs. IN

注意：由于有 NULL 捣鬼，所以 IN 会返回 true / fasle / unknown，而 EXISTS 只会返回 true / false。因此，**IN 和 EXISTS 可以互相替换使用，而 NOT IN 和NOT EXISTS 却不可以。**

> 具体原因可以回去翻阅原书，这里不赘述。

**问：那参数是子查询时，用 IN 还是 EXISTS 更好呢？**

```sql
-- IN
SELECT *
FROM Class_A
WHERE id IN 
(
    SELECT id
    FROM Class_B
);

-- EXISTS
SELECT *
FROM Class_A A
WHERE EXISTS
(
    SELECT *
    FROM Class_B B
    WHERE A.id = B.id
);
```

如果把上例的 Class_A 看成外表，Class_B 看成内表的话。

答：

**维度一：从外表和内表的数据行大小的关系来看**

1、IN 只执行一次，此内表查出后就缓存了，所以 **IN 适合 外表 > 内表** 的情况；

2、EXISTS 是针对外表去作循环，每次循环会跟内表作关联子查询，所以 **EXISTS 适合 外表 < 内表** 的情况；

3、当 内外表 数据差不多大时，IN 与 EXISTS 也差不多。

**维度二：索引的角度**

EXISTS 可以用到索引，而 IN 不行。所以 EXISTS 更佳。

**维度三： 是否全表遍历**

针对内表，EXISTS 只要查到一行数据满足条件就会终止遍历，而 IN 必须遍历整个内表。 所以 EXISTS 更佳。

**维度四： 可读性**

IN 更佳。

**综上所述：还是考虑实际情况。但是 EXISTS 替代 IN 提高性能的可能性更大。**

> 1、要想改善 IN 的性能，除了使用 EXISTS，还可以使用**连接**。
>
> 2、最近有**很多数据库也尝试着改善了 IN 的性能**。例如，在 Oracle 数据库中，如果我们使用了建有索引的列，那么即使使用 IN 也会先扫描索引；PostgreSQL 从版本 7.4 起也改善了使用子查询作为 IN 谓词参数时的查询速度。

注意：其实这个问题也可以当成 **非关联子查询 vs. 关联子查询** 来看待（除了维度三是 EXISTS 特有的优势外，其他的维度都适用）。

## 3、CASE 表达式

`CASE表达式`的语法分为`简单CASE表达式`和`搜索CASE表达式`两种。

由于 搜索CASE 表达式 包含了 简单CASE 表达式 的全部功能，所以有更**强大的表达能力**。

注意：CASE 表达式是一种**表达式**而不是语句，CASE 表达式经常会因为同编程语言里的 CASE 混淆而被叫作 CASE 语句，其实是不对的。（你也可以把 CASE 表达式理解成一种函数，运行后会返回值）

> **编程语言中的 CASE 语句，还有 break 的概念，而 SQL 中的 CASE 表达式没有。**

例子：

```sql
-- 使用 搜索CASE表达式 的情况【推荐】
SELECT product_name,
CASE 
WHEN product_type = '衣服'
THEN 'A ：' || product_type
WHEN product_type = '办公用品'
THEN 'B ：' || product_type
WHEN product_type = '厨房用具'
THEN 'C ：' || product_type
ELSE NULL
END AS abc_product_type
FROM Product;

-- 使用 简单CASE表达式 的情况
SELECT product_name,
CASE product_type
WHEN '衣服' THEN 'A ：' || product_type
WHEN '办公用品' THEN 'B ：' || product_type
WHEN '厨房用具' THEN 'C ：' || product_type
ELSE NULL
END AS abc_product_type
FROM Product;
```

注意：

1、**统一各分支返回的数据类型**。例如用 CAST 函数。

2、ELSE 子句可以省略不写，这时会被默认为 `ELSE NULL`。但还是建议 **养成写 ELSE 子句的习惯**，减少失误。

3、记得写 END 。

4、`WHEN NULL` 错误，`WHEN IS NULL`正确。

### 案例 1、用一条 SQL 语句进行不同条件的统计

统计不同县的男女比例（“县名”的列为：pref_name，“人口”的列为：population）

```sql
-- == old 写法：

-- 男性人口
SELECT pref_name,
SUM(population)
FROM PopTbl2
WHERE sex = '1'
GROUP BY pref_name;
-- 女性人口
SELECT pref_name,
SUM(population)
FROM PopTbl2
WHERE sex = '2'
GROUP BY pref_name;

-- == new 写法：

SELECT pref_name,
-- 男性人口
SUM( CASE WHEN sex = '1' THEN population ELSE 0 END) AS cnt_m,
-- 女性人口
SUM( CASE WHEN sex = '2' THEN population ELSE 0 END) AS cnt_f
FROM PopTbl2
GROUP BY pref_name;
```

**新手用 WHERE 子句进行条件分支，高手用 SELECT 子句进行条件分支。**

### 案例 2、在 CASE 表达式中使用聚合函数

std_id ( 学号) 、club_id ( 社团ID) 、club_name ( 社团名) 、main_club_flg ( 主社团标志)

1. 获取只加入了一个社团的学生的社团ID。
2. 获取加入了多个社团的学生的主社团ID。

```sql
-- == old 写法：

-- 条件1 ：选择只加入了一个社团的学生
SELECT std_id, MAX(club_id) AS main_club
FROM StudentClub
GROUP BY std_id
HAVING COUNT(*) = 1;

-- 条件2 ：选择加入了多个社团的学生
SELECT std_id, club_id AS main_club
FROM StudentClub
WHERE main_club_flg = 'Y' ;

-- == new 写法：

SELECT std_id,
CASE 
WHEN COUNT(*) = 1 THEN MAX(club_id)
ELSE MAX(
    CASE 
    WHEN main_club_flg = 'Y' THEN club_id
    ELSE NULL 
    END
)
END AS main_club
FROM StudentClub
GROUP BY std_id;
```

**新手用 HAVING 子句进行条件分支，高手用 SELECT 子句进行条件分支。**

### 案例 3、用 CHECK 约束定义多个列的条件关系

假设某公司规定 “女性员工的工资必须在 20 万日元以下”

```sql
CONSTRAINT check_salary CHECK
( 
    CASE WHEN sex = '2' THEN 
        CASE WHEN salary <= 200000 THEN 1 
        ELSE 0 
        END
    ELSE 1 
    END = 1 
)
```

### 案例 4、在 UPDATE 语句里进行条件分支，避免多次循环更新的出错

例子1：多次循环更新

例如你要：

1. 对当前工资为 30 万日元以上的员工，降薪 10%。
2. 对当前工资为 25 万日元以上且不满 28 万日元的员工，加薪 20%。

```sql
-- 错误写法：（问题在于，第一次的 UPDATE 操作执行后，“当前工资”发生了变化，如果还用它当作第二次 UPDATE 的判定条件，结果就会出错。）

UPDATE Salaries
SET salary = salary * 0.9
WHERE salary >= 300000;

UPDATE Salaries
SET salary = salary * 1.2
WHERE salary >= 250000 AND salary < 280000;

-- 正确写法：

UPDATE Salaries
SET salary = 
    CASE 
    WHEN salary >= 300000 THEN salary * 0.9
    WHEN salary >= 250000 AND salary < 280000 THEN salary * 1.2
    ELSE salary -- 注意这里的 `ELSE salary` 非常重要
    END;
```

例子2：两个值交换（替代传统的使用中间值的做法）

```sql
UPDATE SomeTable
SET p_key =
    CASE WHEN p_key = 'a' THEN 'b'
    WHEN p_key = 'b' THEN 'a'
    ELSE p_key
    END
WHERE p_key IN ('a', 'b');
```

