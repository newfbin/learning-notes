# 第13章 进阶-SQL与 集合论

------

SQL 其中一个数学基础就是构建在集合论上。

我们通过画`维恩图`，可以很大程度地加深对 SQL 的理解。

## 1、全称量化和存在量化

### （1）判断集合之间的包含关系

**SQL 并没有提供任何用于检查集合的包含关系或者相等性的谓词**。IN 谓词只能用来检查元素是否属于某个集合（∈），而不能检查集合是否是某个集合的子集（∪）。

> 据说，IBM 过去研制的第一个关系数据库实验系统——System R 曾经实现了用 **CONTAINS** 这一谓词来检查集合间的包含关系，但是后来因为性能原因被删除掉了，直到现在也没有恢复。

而判断集合之间的包含关系，就是下面要提到的：全称量化。

### （2）全称量词和存在量词

“所有的 x 都满足条件P”或者“存在（至少一个）满足条件 P 的 x”。

前者称为“`全称量词`”，后者称为“`存在量词`”，分别记作 ∀ 、∃。

> 其实，全称量词的符号其实是将字母 A 上下颠倒而形成的，存在量词则是将字母 E 左右颠倒而形成的。
> “对于所有的x，……”的英语是“for All x，…”，而“存在满足……的x”的英语是“there Exists x that…”，这就是这两个符号的由来。

但可惜，SQL 只支持 `EXISTS`（存在量词），不支持 `FORALL`（全称量词）。

**但全称量词和存在量词只要定义了一个，另一个就可以被推导出来。**

### （3）全称量化 ⇔ 存在量化

通过`德·摩根定律`，来进行 “**肯定⇔双重否定**” 之间的转换。

即在 SQL 中，**为了表达全称量化，需要将 “所有的行都满足条件 P” 这样的命题转换成 “不存在不满足条件 P 的行“，然后使用存在量词。**

例子1：

**查询条件为肯定的：“所有科目分数都在50 分以上”，转换成它的双重否定：“没有一个科目分数不满50 分”，然后用 NOT EXISTS 来表示转换后的命题**，即：

```sql
SELECT DISTINCT student_id
FROM TestScores TS1
WHERE NOT EXISTS -- 不存在满足以下条件的行
(
    SELECT *
    FROM TestScores TS2
    WHERE TS2.student_id = TS1.student_id
    AND TS2.score < 50 -- 分数不满 50 分的科目
); 
```

例子2：

“所有队员都处于待命状态”转化成“不存在不处于待命状态的队员”

不光可以用 NOT EXISTS ，也可以有其他方式：

```sql
-- 方法一：用谓词表达全称量化命题
SELECT team_id, member
FROM Teams T1
WHERE NOT EXISTS
(
    SELECT *
    FROM Teams T2
    WHERE T1.team_id = T2.team_id
    AND status <> '待命' 
);

-- 方法二：用集合表达全称量化命题(1)
SELECT team_id
FROM Teams
GROUP BY team_id
HAVING COUNT(*) = SUM(
    CASE WHEN status = '待命'
    THEN 1
    ELSE 0 
    END
);

-- 方法三：用集合表达全称量化命题(2)
SELECT team_id
FROM Teams
GROUP BY team_id
HAVING MAX(status) = '待命'
AND MIN(status) = '待命';

-- 方法四、比上面方式的更直观的展示方式（但性能比上面差)：列表显示各个队伍是否所有队员都在待命
SELECT team_id,
CASE 
    WHEN MAX(status) = '待命' AND MIN(status) = '待命'
    THEN '全都在待命'
    ELSE '队长！人手不够' 
    END AS status
FROM Teams
GROUP BY team_id;
```

NOT EXISTS 写法跟 其他方法（ HAVING 子句或者 ALL 谓词）的区别：

- NOT EXISTS 写法可读性差
- NOT EXISTS 性能更好

## 2、调查集合性质

下面是整理的在调查集合性质时经常用到的条件。

这些条件可以在 HAVING 子句中使用，也可以通过SELECT 子句写在CASE 表达式里使用。

| No   | 条件表达式                             | 用途                                 |
| ---- | -------------------------------------- | ------------------------------------ |
| 1    | COUNT (DISTINCT col) = COUNT (col)     | col 列没有重复的值                   |
| 2    | COUNT(*) = COUNT(col)                  | col 列不存在NULL                     |
| 3    | COUNT(*) = MAX(col)                    | col 列是连续的编号（起始值是1）      |
| 4    | COUNT(*) = MAX(col) - MIN(col) + 1 col | 列是连续的编号（起始值是任意整数）   |
| 5    | MIN(col) = MAX(col)                    | col 列都是相同值，或者是NULL         |
| 6    | MIN(col) * MAX(col) > 0                | col 列全是正数或全是负数             |
| 7    | MIN(col) * MAX(col) < 0                | col 列的最大值是正数，最小值是负数   |
| 8    | MIN(ABS(col)) = 0                      | col 列最少有一个是0                  |
| 9    | MIN(col - 常量) = - MAX(col - 常量)    | col 列的最大值和最小值与指定常量等距 |

