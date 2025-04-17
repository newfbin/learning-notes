## * String、StringBuffer、StringBuilder的区别



## * 接口和抽象类的区别



## * Java常见的异常类有哪些



## String不可变是如何实现的

String是Java中一个经典的不可变类

String类用final修饰，无法被继承

String本质是一个char数组，用private final修饰，并且没有暴漏set方法，因此无法修改该数组的值

## 将一组数据进行去重排序，用Java中哪个类

`Stream.distinct.sort()`

## 从文件中搜索，哪一行包含指定字符串，该如何操作

- 利用BufferedReader的reaLline()方法逐行读取文件
- 使用String的contains方法检查每行是否包含指定字符串

## 