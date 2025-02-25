## C# 属性

**属性（Property）** 是类（class）、结构（structure）和接口（interface）的命名（named）成员。类或结构中的成员变量或方法称为 域（Field）。属性（Property）是域（Field）的扩展，且可使用相同的语法来访问。它们使用 **访问器（accessors）** 让私有域的值可被读写或操作。

属性（Property）不会确定存储位置。相反，它们具有可读写或计算它们值的 **访问器（accessors）**。

例如，有一个名为 Student 的类，带有 age、name 和 code 的私有域。我们不能在类的范围以外直接访问这些域，但是我们可以拥有访问这些私有域的属性。

 

### 一、访问器（Accessors）

属性（Property）的**访问器（accessor）**包含有助于获取（读取或计算）或设置（写入）属性的可执行语句。访问器（accessor）声明可包含一个 get 访问器、一个 set 访问器，或者同时包含二者。例如：

```csharp
   // 声明类型为 string 的 Code 属性
   public string Code
   {
      get
      {
         return code;
      }
      set
      {
         code = value;
      }
   }

   // 声明类型为 string 的 Name 属性
   public string Name
   {
      get
      {
        return name;
      }
      set
      {
        name = value;
      }
   }

   // 声明类型为 int 的 Age 属性
   public int Age
   { 
      get
      {
         return age;
      }
      set
      {
         age = value;
      }
   }
```

 

#### 实例

下面的实例演示了属性（Property）的用法：

```csharp
   using System;
   namespace tutorialspoint
   {
      class Student
      {

         private string code = "N.A";
         private string name = "not known";
         private int age = 0;

         // 声明类型为 string 的 Code 属性
         public string Code
         {
            get
            {
               return code;
            }
            set
            {
               code = value;
            }
         }

         // 声明类型为 string 的 Name 属性
         public string Name
         {
            get
            {
               return name;
            }
            set
            {
               name = value;
            }
         }

         // 声明类型为 int 的 Age 属性
         public int Age
         {
            get
            {
               return age;
            }
            set
            {
               age = value;
            }
         }
         public override string ToString()
         {
            return "Code = " + Code +", Name = " + Name + ", Age = " + Age;
         }
       }
       class ExampleDemo
       {
         public static void Main()
         {
            // 创建一个新的 Student 对象
            Student s = new Student();

            // 设置 student 的 code、name 和 age
            s.Code = "001";
            s.Name = "Zara";
            s.Age = 9;
            Console.WriteLine("Student Info: {0}", s);
            // 增加年龄
            s.Age += 1;
            Console.WriteLine("Student Info: {0}", s);
            Console.ReadKey();
          }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Student Info: Code = 001, Name = Zara, Age = 9
   Student Info: Code = 001, Name = Zara, Age = 10
```

 

### 二、抽象属性（Abstract Properties）

抽象类可拥有抽象属性，这些属性应在派生类中被实现。下面的程序说明了这点：

```csharp
   using System;
   namespace tutorialspoint
   {
      public abstract class Person
      {
         public abstract string Name
         {
            get;
            set;
         }
         public abstract int Age
         {
            get;
            set;
         }
      }
      class Student : Person
      {

         private string code = "N.A";
         private string name = "N.A";
         private int age = 0;

         // 声明类型为 string 的 Code 属性
         public string Code
         {
            get
            {
               return code;
            }
            set
            {
               code = value;
            }
         }

         // 声明类型为 string 的 Name 属性
         public override string Name
         {
            get
            {
               return name;
            }
            set
            {
               name = value;
            }
         }

         // 声明类型为 int 的 Age 属性
         public override int Age
         {
            get
            {
               return age;
            }
            set
            {
               age = value;
            }
         }
         public override string ToString()
         {
            return "Code = " + Code +", Name = " + Name + ", Age = " + Age;
         }
      }
      class ExampleDemo
      {
         public static void Main()
         {
            // 创建一个新的 Student 对象
            Student s = new Student();

            // 设置 student 的 code、name 和 age
            s.Code = "001";
            s.Name = "Zara";
            s.Age = 9;
            Console.WriteLine("Student Info:- {0}", s);
            // 增加年龄
            s.Age += 1;
            Console.WriteLine("Student Info:- {0}", s);
            Console.ReadKey();
          }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Student Info: Code = 001, Name = Zara, Age = 9
   Student Info: Code = 001, Name = Zara, Age = 10
```



## C# 索引器

**索引器（Indexer）** 允许一个对象可以像数组一样被索引。当您为类定义一个索引器时，该类的行为就会像一个 **虚拟数组（virtual array）** 一样。您可以使用数组访问运算符（[ ]）来访问该类的实例。

 

### 一、语法

一维索引器的语法如下：

```csharp
   element-type this[int index] 
   {
      // get 访问器
      get 
      {
         // 返回 index 指定的值
      }

      // set 访问器
      set 
      {
         // 设置 index 指定的值 
      }
   }
```

 

### 二、索引器（Indexer）的用途

索引器的行为的声明在某种程度上类似于属性（property）。就像属性（property），您可使用 **get** 和 **set** 访问器来定义索引器。但是，属性返回或设置一个特定的数据成员，而索引器返回或设置对象实例的一个特定值。换句话说，它把实例数据分为更小的部分，并索引每个部分，获取或设置每个部分。

定义一个属性（property）包括提供属性名称。索引器定义的时候不带有名称，但带有 this 关键字，它指向对象实例。下面的实例演示了这个概念：

```csharp
   using System;
   namespace IndexerApplication
   {
      class IndexedNames
      {
         private string[] namelist = new string[size];
         static public int size = 10;
         public IndexedNames()
         {
            for (int i = 0; i < size; i++)
            namelist[i] = "N. A.";
         }
         public string this[int index]
         {
            get
            {
               string tmp;

               if( index >= 0 && index <= size-1 )
               {
                  tmp = namelist[index];
               }
               else
               {
                  tmp = "";
               }

               return ( tmp );
            }
            set
            {
               if( index >= 0 && index <= size-1 )
               {
                  namelist[index] = value;
               }
            }
         }

         static void Main(string[] args)
         {
            IndexedNames names = new IndexedNames();
            names[0] = "Zara";
            names[1] = "Riz";
            names[2] = "Nuha";
            names[3] = "Asif";
            names[4] = "Davinder";
            names[5] = "Sunil";
            names[6] = "Rubic";
            for ( int i = 0; i < IndexedNames.size; i++ )
            {
               Console.WriteLine(names[i]);
            }
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Zara
   Riz
   Nuha
   Asif
   Davinder
   Sunil
   Rubic
   N. A.
   N. A.
   N. A.
```

 

### 三、重载索引器（Indexer）

索引器（Indexer）可被重载。索引器声明的时候也可带有多个参数，且每个参数可以是不同的类型。没有必要让索引器必须是整型的。C# 允许索引器可以是其他类型，例如，字符串类型。

下面的实例演示了重载索引器：

```csharp
   using System;
   namespace IndexerApplication
   {
      class IndexedNames
      {
         private string[] namelist = new string[size];
         static public int size = 10;
         public IndexedNames()
         {
            for (int i = 0; i < size; i++)
            {
             namelist[i] = "N. A.";
            }
         }
         public string this[int index]
         {
            get
            {
               string tmp;

               if( index >= 0 && index <= size-1 )
               {
                  tmp = namelist[index];
               }
               else
               {
                  tmp = "";
               }

               return ( tmp );
            }
            set
            {
               if( index >= 0 && index <= size-1 )
               {
                  namelist[index] = value;
               }
            }
         }
         public int this[string name]
         {
            get
            {
               int index = 0;
               while(index < size)
               {
                  if (namelist[index] == name)
                  {
                   return index;
                  }
                  index++;
               }
               return index;
            }

         }

         static void Main(string[] args)
         {
            IndexedNames names = new IndexedNames();
            names[0] = "Zara";
            names[1] = "Riz";
            names[2] = "Nuha";
            names[3] = "Asif";
            names[4] = "Davinder";
            names[5] = "Sunil";
            names[6] = "Rubic";
            // 使用带有 int 参数的第一个索引器
            for (int i = 0; i < IndexedNames.size; i++)
            {
               Console.WriteLine(names[i]);
            }
            // 使用带有 string 参数的第二个索引器
            Console.WriteLine(names["Nuha"]);
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Zara
   Riz
   Nuha
   Asif
   Davinder
   Sunil
   Rubic
   N. A.
   N. A.
   N. A.
   2
```



## C# 委托

C# 中的委托（Delegate）类似于 C 或 C++ 中函数的指针。**委托（Delegate）** 是存有对某个方法的引用的一种引用类型变量。引用可在运行时被改变。

委托（Delegate）特别用于实现事件和回调方法。所有的委托（Delegate）都派生自 **System.Delegate** 类。

 

### 一、声明委托（Delegate）

委托声明决定了可由该委托引用的方法。委托可指向一个与其具有相同标签的方法。

例如，假设有一个委托：

```csharp
   public delegate int MyDelegate (string s);
```

上面的委托可被用于引用任何一个带有一个单一的 string 参数的方法，并返回一个 int 类型变量。

声明委托的语法如下：

```csharp
   delegate <return type> <delegate-name> <parameter list>
```

 

### 二、实例化委托（Delegate）

一旦声明了委托类型，委托对象必须使用 **new** 关键字来创建，且与一个特定的方法有关。当创建委托时，传递到 **new** 语句的参数就像方法调用一样书写，但是不带有参数。例如：

```csharp
   public delegate void printString(string s);
   ...
   printString ps1 = new printString(WriteToScreen);
   printString ps2 = new printString(WriteToFile);
```

下面的实例演示了委托的声明、实例化和使用，该委托可用于引用带有一个整型参数的方法，并返回一个整型值。

```csharp
   using System;

   delegate int NumberChanger(int n);
   namespace DelegateAppl
   {
      class TestDelegate
      {
         static int num = 10;
         public static int AddNum(int p)
         {
            num += p;
            return num;
         }

         public static int MultNum(int q)
         {
            num *= q;
            return num;
         }
         public static int getNum()
         {
            return num;
         }

         static void Main(string[] args)
         {
            // 创建委托实例
            NumberChanger nc1 = new NumberChanger(AddNum);
            NumberChanger nc2 = new NumberChanger(MultNum);
            // 使用委托对象调用方法
            nc1(25);
            Console.WriteLine("Value of Num: {0}", getNum());
            nc2(5);
            Console.WriteLine("Value of Num: {0}", getNum());
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Value of Num: 35
   Value of Num: 175
```

 

### 三、委托的多播（Multicasting of a Delegate）

委托对象可使用 "+" 运算符进行合并。一个合并委托调用它所合并的两个委托。只有相同类型的委托可被合并。"-" 运算符可用于从合并的委托中移除组件委托。

使用委托的这个有用的特点，您可以创建一个委托被调用时要调用的方法的调用列表。这被称为委托的 **多播（multicasting）**，也叫组播。下面的程序演示了委托的多播：

```csharp
   using System;

   delegate int NumberChanger(int n);
   namespace DelegateAppl
   {
      class TestDelegate
      {
         static int num = 10;
         public static int AddNum(int p)
         {
            num += p;
            return num;
         }

         public static int MultNum(int q)
         {
            num *= q;
            return num;
         }
         public static int getNum()
         {
            return num;
         }

         static void Main(string[] args)
         {
            // 创建委托实例
            NumberChanger nc;
            NumberChanger nc1 = new NumberChanger(AddNum);
            NumberChanger nc2 = new NumberChanger(MultNum);
            nc = nc1;
            nc += nc2;
            // 调用多播
            nc(5);
            Console.WriteLine("Value of Num: {0}", getNum());
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Value of Num: 75
```

 

### 四、委托（Delegate）的用途

下面的实例演示了委托的用法。委托 printString 可用于引用带有一个字符串作为输入的方法，并不返回任何东西。

我们使用这个委托来调用两个方法，第一个把字符串打印到控制台，第二个把字符串打印到文件：

```csharp
   using System;
   using System.IO;

   namespace DelegateAppl
   {
      class PrintString
      {
         static FileStream fs;
         static StreamWriter sw;
         // 委托声明
         public delegate void printString(string s);

         // 该方法打印到控制台
         public static void WriteToScreen(string str)
         {
            Console.WriteLine("The String is: {0}", str);
         }
         // 该方法打印到文件
         public static void WriteToFile(string s)
         {
            fs = new FileStream("c:\\message.txt",
            FileMode.Append, FileAccess.Write);
            sw = new StreamWriter(fs);
            sw.WriteLine(s);
            sw.Flush();
            sw.Close();
            fs.Close();
         }
         // 该方法把委托作为参数，并使用它调用方法
         public static void sendString(printString ps)
         {
            ps("Hello World");
         }
         static void Main(string[] args)
         {
            printString ps1 = new printString(WriteToScreen);
            printString ps2 = new printString(WriteToFile);
            sendString(ps1);
            sendString(ps2);
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   The String is: Hello World
```

## C# 事件

**事件（Event）** 基本上说是一个用户操作，如按键、点击、鼠标移动等等，或者是一些出现，如系统生成的通知。应用程序需要在事件发生时响应事件。例如，中断。事件是用于进程间通信。

 

### 一、通过事件使用委托

事件在类中声明且生成，且通过使用同一个类或其他类中的委托与事件处理程序关联。包含事件的类用于发布事件。这被称为 **发布器（publisher）** 类。其他接受该事件的类被称为 **订阅器（subscriber）** 类。事件使用 **发布-订阅（publisher-subscriber）** 模型。 **发布器（publisher）** 是一个包含事件和委托定义的对象。事件和委托之间的联系也定义在这个对象中。发布器（publisher）类的对象调用这个事件，并通知其他的对象。

**订阅器（subscriber）** 是一个接受事件并提供事件处理程序的对象。在发布器（publisher）类中的委托调用订阅器（subscriber）类中的方法（事件处理程序）。

 

### 二、声明事件（Event）

在类的内部声明事件，首先必须声明该事件的委托类型。例如：

```csharp
   public delegate void BoilerLogHandler(string status);
```

然后，声明事件本身，使用 **event** 关键字：

```csharp
   // 基于上面的委托定义事件
   public event BoilerLogHandler BoilerEventLog;
```

上面的代码定义了一个名为 BoilerLogHandler 的委托和一个名为 BoilerEventLog 的事件，该事件在生成的时候会调用委托。

 

#### 实例 1

```csharp
   using System;
   namespace SimpleEvent
   {
     using System;
     /***********发布器类***********/
     public class EventTest
     {
       private int value;

       public delegate void NumManipulationHandler();


       public event NumManipulationHandler ChangeNum;
       protected virtual void OnNumChanged()
       {
         if ( ChangeNum != null )
         {
           ChangeNum(); /* 事件被触发 */
         }else {
           Console.WriteLine( "event not fire" );
           Console.ReadKey(); /* 回车继续 */
         }
       }


       public EventTest()
       {
         int n = 5;
         SetValue( n );
       }


       public void SetValue( int n )
       {
         if ( value != n )
         {
           value = n;
           OnNumChanged();
         }
       }
     }


     /***********订阅器类***********/

     public class subscribEvent
     {
       public void printf()
       {
         Console.WriteLine( "event fire" );
         Console.ReadKey(); /* 回车继续 */
       }
     }

     /***********触发***********/
     public class MainClass
     {
       public static void Main()
       {
         EventTest e = new EventTest(); /* 实例化对象,第一次没有触发事件 */
         subscribEvent v = new subscribEvent(); /* 实例化对象 */
         e.ChangeNum += new EventTest.NumManipulationHandler( v.printf ); /* 注册 */
         e.SetValue( 7 );
         e.SetValue( 11 );
       }
     }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   event not fire
   event fire
   event fire
```

 

#### 实例 2

本实例提供一个简单的用于热水锅炉系统故障排除的应用程序。当维修工程师检查锅炉时，锅炉的温度和压力会随着维修工程师的备注自动记录到日志文件中。

```csharp
   using System;
   using System.IO;

   namespace BoilerEventAppl
   {

      // boiler 类
      class Boiler
      {
         private int temp;
         private int pressure;
         public Boiler(int t, int p)
         {
            temp = t;
            pressure = p;
         }

         public int getTemp()
         {
            return temp;
         }
         public int getPressure()
         {
            return pressure;
         }
      }
      // 事件发布器
      class DelegateBoilerEvent
      {
         public delegate void BoilerLogHandler(string status);

         // 基于上面的委托定义事件
         public event BoilerLogHandler BoilerEventLog;

         public void LogProcess()
         {
            string remarks = "O. K";
            Boiler b = new Boiler(100, 12);
            int t = b.getTemp();
            int p = b.getPressure();
            if(t > 150 || t < 80 || p < 12 || p > 15)
            {
               remarks = "Need Maintenance";
            }
            OnBoilerEventLog("Logging Info:\n");
            OnBoilerEventLog("Temparature " + t + "\nPressure: " + p);
            OnBoilerEventLog("\nMessage: " + remarks);
         }

         protected void OnBoilerEventLog(string message)
         {
            if (BoilerEventLog != null)
            {
               BoilerEventLog(message);
            }
         }
      }
      // 该类保留写入日志文件的条款
      class BoilerInfoLogger
      {
         FileStream fs;
         StreamWriter sw;
         public BoilerInfoLogger(string filename)
         {
            fs = new FileStream(filename, FileMode.Append, FileAccess.Write);
            sw = new StreamWriter(fs);
         }
         public void Logger(string info)
         {
            sw.WriteLine(info);
         }
         public void Close()
         {
            sw.Close();
            fs.Close();
         }
      }
      // 事件订阅器
      public class RecordBoilerInfo
      {
         static void Logger(string info)
         {
            Console.WriteLine(info);
         }//end of Logger

         static void Main(string[] args)
         {
            BoilerInfoLogger filelog = new BoilerInfoLogger("e:\\boiler.txt");
            DelegateBoilerEvent boilerEvent = new DelegateBoilerEvent();
            boilerEvent.BoilerEventLog += new 
            DelegateBoilerEvent.BoilerLogHandler(Logger);
            boilerEvent.BoilerEventLog += new 
            DelegateBoilerEvent.BoilerLogHandler(filelog.Logger);
            boilerEvent.LogProcess();
            Console.ReadLine();
            filelog.Close();
         }//end of main

      }//end of RecordBoilerInfo
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Logging info:

   Temperature 100
   Pressure 12

   Message: O. K
```

## C# 泛型（Generic）

**泛型（Generic）** 允许您延迟编写类或方法中的编程元素的数据类型的规范，直到实际在程序中使用它的时候。换句话说，泛型允许您编写一个可以与任何数据类型一起工作的类或方法。

您可以通过数据类型的替代参数编写类或方法的规范。当编译器遇到类的构造函数或方法的函数调用时，它会生成代码来处理指定的数据类型。下面这个简单的实例将有助于您理解这个概念：

```csharp
    using System;
    using System.Collections.Generic;

    namespace GenericApplication
    {
        public class MyGenericArray<T>
        {
            private T[] array;
            public MyGenericArray(int size)
            {
                array = new T[size + 1];
            }
            public T getItem(int index)
            {
                return array[index];
            }
            public void setItem(int index, T value)
            {
                array[index] = value;
            }
        }

        class Tester
        {
            static void Main(string[] args)
            {
                // 声明一个整型数组
                MyGenericArray<int> intArray = new MyGenericArray<int>(5);
                // 设置值
                for (int c = 0; c < 5; c++)
                {
                    intArray.setItem(c, c*5);
                }
                // 获取值
                for (int c = 0; c < 5; c++)
                {
                    Console.Write(intArray.getItem(c) + " ");
                }
                Console.WriteLine();
                // 声明一个字符数组
                MyGenericArray<char> charArray = new MyGenericArray<char>(5);
                // 设置值
                for (int c = 0; c < 5; c++)
                {
                    charArray.setItem(c, (char)(c+97));
                }
                // 获取值
                for (int c = 0; c < 5; c++)
                {
                    Console.Write(charArray.getItem(c) + " ");
                }
                Console.WriteLine();
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    0 5 10 15 20
    a b c d e
```

 

### 一、泛型（Generic）的特性

使用泛型是一种增强程序功能的技术，具体表现在以下几个方面：

1. 它有助于您最大限度地重用代码、保护类型的安全以及提高性能。
2. 您可以创建泛型集合类。.NET 框架类库在 System.Collections.Generic 命名空间中包含了一些新的泛型集合类。您可以使用这些泛型集合类来替代 System.Collections 中的集合类。
3. 您可以创建自己的泛型接口、泛型类、泛型方法、泛型事件和泛型委托。
4. 您可以对泛型类进行约束以访问特定数据类型的方法。
5. 关于泛型数据类型中使用的类型的信息可在运行时通过使用反射获取。

 

### 二、泛型（Generic）方法

在上面的实例中，我们已经使用了泛型类，我们可以通过类型参数声明泛型方法。下面的程序说明了这个概念：

```csharp
    using System;
    using System.Collections.Generic;

    namespace GenericMethodAppl
    {
        class Program
        {
            static void Swap<T>(ref T lhs, ref T rhs)
            {
                T temp;
                temp = lhs;
                lhs = rhs;
                rhs = temp;
            }
            static void Main(string[] args)
            {
                int a, b;
                char c, d;
                a = 10;
                b = 20;
                c = 'I';
                d = 'V';

                // 在交换之前显示值
                Console.WriteLine("Int values before calling swap:");
                Console.WriteLine("a = {0}, b = {1}", a, b);
                Console.WriteLine("Char values before calling swap:");
                Console.WriteLine("c = {0}, d = {1}", c, d);

                // 调用 swap
                Swap<int>(ref a, ref b);
                Swap<char>(ref c, ref d);

                // 在交换之后显示值
                Console.WriteLine("Int values after calling swap:");
                Console.WriteLine("a = {0}, b = {1}", a, b);
                Console.WriteLine("Char values after calling swap:");
                Console.WriteLine("c = {0}, d = {1}", c, d);
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    Int values before calling swap:
    a = 10, b = 20
    Char values before calling swap:
    c = I, d = V
    Int values after calling swap:
    a = 20, b = 10
    Char values after calling swap:
    c = V, d = I
```

 

### 三、泛型（Generic）委托

您可以通过类型参数定义泛型委托。例如：

```csharp
    delegate T NumberChanger<T>(T n);
```

下面的实例演示了委托的使用：

```csharp
    using System;
    using System.Collections.Generic;

    delegate T NumberChanger<T>(T n);
    namespace GenericDelegateAppl
    {
        class TestDelegate
        {
            static int num = 10;
            public static int AddNum(int p)
            {
                num += p;
                return num;
            }

            public static int MultNum(int q)
            {
                num *= q;
                return num;
            }
            public static int getNum()
            {
                return num;
            }

            static void Main(string[] args)
            {
                // 创建委托实例
                NumberChanger<int> nc1 = new NumberChanger<int>(AddNum);
                NumberChanger<int> nc2 = new NumberChanger<int>(MultNum);
                // 使用委托对象调用方法
                nc1(25);
                Console.WriteLine("Value of Num: {0}", getNum());
                nc2(5);
                Console.WriteLine("Value of Num: {0}", getNum());
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    Value of Num: 35
    Value of Num: 175
```

## C# 集合

集合（Collection）类是专门用于数据存储和检索的类。这些类提供了对栈（stack）、队列（queue）、列表（list）和哈希表（hash table）的支持。大多数集合类实现了相同的接口。 集合（Collection）类服务于不同的目的，如为元素动态分配内存，基于索引访问列表项等等。这些类创建 Object 类的对象的集合。在 C# 中，Object 类是所有数据类型的基类。

 

### 一、各种集合类和它们的用法

下面是各种常用的 System.Collection 命名空间的类。点击下面的链接查看细节。

| 类                     | 描述和用法                                                   |
| :--------------------- | :----------------------------------------------------------- |
| 动态数组（ArrayList）  | 它代表了可被单独索引的对象的有序集合。 它基本上可以替代一个数组。但是，与数组不同的是，您可以使用索引在指定的位置添加和移除项目，动态数组会自动重新调整它的大小。它也允许在列表中进行动态内存分配、增加、搜索、排序各项。 |
| 哈希表（Hashtable）    | 它使用键来访问集合中的元素。 当您使用键访问元素时，则使用哈希表，而且您可以识别一个有用的键值。哈希表中的每一项都有一个键/值对。键用于访问集合中的项目。 |
| 排序列表（SortedList） | 它可以使用键和索引来访问列表中的项。 排序列表是数组和哈希表的组合。它包含一个可使用键或索引访问各项的列表。如果您使用索引访问各项，则它是一个动态数组（ArrayList），如果您使用键访问各项，则它是一个哈希表（Hashtable）。集合中的各项总是按键值排序。 |
| 堆栈（Stack）          | 它代表了一个后进先出的对象集合。 当您需要对各项进行后进先出的访问时，则使用堆栈。当您在列表中添加一项，称为推入元素，当您从列表中移除一项时，称为弹出元素。 |
| 队列（Queue）          | 它代表了一个先进先出的对象集合。 当您需要对各项进行先进先出的访问时，则使用队列。当您在列表中添加一项，称为入队，当您从列表中移除一项时，称为出队。 |
| 点阵列（BitArray）     | 它代表了一个使用值 1 和 0 来表示的二进制数组。 当您需要存储位，但是事先不知道位数时，则使用点阵列。您可以使用整型索引从点阵列集合中访问各项，索引从零开始。 |

## C# 匿名方法

我们已经提到过，委托是用于引用与其具有相同标签的方法。换句话说，您可以使用委托对象调用可由委托引用的方法。

**匿名方法（Anonymous methods）** 提供了一种传递代码块作为委托参数的技术。匿名方法是没有名称只有主体的方法。

在匿名方法中您不需要指定返回类型，它是从方法主体内的 return 语句推断的。

 

### 一、编写匿名方法的语法

匿名方法是通过使用 **delegate** 关键字创建委托实例来声明的。例如：

```csharp
    delegate void NumberChanger(int n);
    ...
    NumberChanger nc = delegate(int x)
    {
        Console.WriteLine("Anonymous Method: {0}", x);
    };
```

代码块 Console.WriteLine("Anonymous Method: {0}", x); 是匿名方法的主体。 委托可以通过匿名方法调用，也可以通过命名方法调用，即，通过向委托对象传递方法参数。 例如：

```csharp
    nc(10);
```

 

#### 实例

下面的实例演示了匿名方法的概念：

```csharp
    using System;

    delegate void NumberChanger(int n);
    namespace DelegateAppl
    {
        class TestDelegate
        {
            static int num = 10;
            public static void AddNum(int p)
            {
                num += p;
                Console.WriteLine("Named Method: {0}", num);
            }

            public static void MultNum(int q)
            {
                num *= q;
                Console.WriteLine("Named Method: {0}", num);
            }
            public static int getNum()
            {
                return num;
            }

            static void Main(string[] args)
            {
                // 使用匿名方法创建委托实例
                NumberChanger nc = delegate(int x)
                {
                   Console.WriteLine("Anonymous Method: {0}", x);
                };

                // 使用匿名方法调用委托
                nc(10);

                // 使用命名方法实例化委托
                nc =  new NumberChanger(AddNum);

                // 使用命名方法调用委托
                nc(5);

                // 使用另一个命名方法实例化委托
                nc =  new NumberChanger(MultNum);

                // 使用命名方法调用委托
                nc(2);
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    Anonymous Method: 10
    Named Method: 15
    Named Method: 30
```

## C# 特性

**特性（Attribute）**是用于在运行时传递程序中各种元素（比如类、方法、结构、枚举、组件等）的行为信息的声明性标签。您可以通过使用特性向程序添加声明性信息。一个声明性标签是通过放置在它所应用的元素前面的方括号（[ ]）来描述的。

特性（Attribute）用于添加元数据，如编译器指令和注释、描述、方法、类等其他信息。.Net 框架提供了两种类型的特性：预定义特性和自定义特性。

 

### 一、规定特性（Attribute）

规定特性（Attribute）的语法如下：

```csharp
    [attribute(positional_parameters, name_parameter = value, ...)]
    element
```

特性（Attribute）的名称和值是在方括号内规定的，放置在它所应用的元素之前。positional_parameters 规定必需的信息，name_parameter 规定可选的信息。

 

### 二、预定义特性（Attribute）

.Net 框架提供了三种预定义特性：

```
    • AttributeUsage
    • Conditional
    • Obsolete
```

#### 2.1 AttributeUsage

预定义特性 **AttributeUsage** 描述了如何使用一个自定义特性类。它规定了特性可应用到的项目的类型。

规定该特性的语法如下：

```csharp
    [AttributeUsage(
       validon,
       AllowMultiple=allowmultiple,
       Inherited=inherited
    )]
```

**其中：**

1. 参数 validon 规定特性可被放置的语言元素。它是枚举器 AttributeTargets 的值的组合。默认值是 AttributeTargets.All。
2. 参数 allowmultiple（可选的）为该特性的 AllowMultiple 属性（property）提供一个布尔值。如果为 true，则该特性是多用的。默认值是 false（单用的）。
3. 参数 inherited（可选的）为该特性的 Inherited 属性（property）提供一个布尔值。如果为 true，则该特性可被派生类继承。默认值是 false（不被继承）。

 

**例如：**

```csharp
    [AttributeUsage(AttributeTargets.Class |
    AttributeTargets.Constructor |
    AttributeTargets.Field |
    AttributeTargets.Method |
    AttributeTargets.Property, 
    AllowMultiple = true)]
```

 

#### 2.2 Conditional

这个预定义特性标记了一个条件方法，其执行依赖于指定的预处理标识符。

它会引起方法调用的条件编译，取决于指定的值，比如 **Debug** 或 **Trace**。例如，当调试代码时显示变量的值。

规定该特性的语法如下：

```csharp
    [Conditional(
       conditionalSymbol
    )]
```

**例如：**

```csharp
    [Conditional("DEBUG")]
```

下面的实例演示了该特性：

```csharp
    #define DEBUG
    using System;
    using System.Diagnostics;
    public class Myclass
    {
        [Conditional("DEBUG")]
        public static void Message(string msg)
        {
            Console.WriteLine(msg);
        }
    }
    class Test
    {
        static void function1()
        {
            Myclass.Message("In Function 1.");
            function2();
        }
        static void function2()
        {
            Myclass.Message("In Function 2.");
        }
        public static void Main()
        {
            Myclass.Message("In Main function.");
            function1();
            Console.ReadKey();
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    In Main function
    In Function 1
    In Function 2
```

 

#### 2.3 Obsolete

这个预定义特性标记了不应被使用的程序实体。它可以让您通知编译器丢弃某个特定的目标元素。例如，当一个新方法被用在一个类中，但是您仍然想要保持类中的旧方法，您可以通过显示一个应该使用新方法，而不是旧方法的消息，来把它标记为 obsolete（过时的）。

规定该特性的语法如下：

```csharp
    [Obsolete(
       message
    )]
    [Obsolete(
       message,
       iserror
    )]
```

**其中：**

1. 参数 message，是一个字符串，描述项目为什么过时的原因以及该替代使用什么。
2. 参数 iserror，是一个布尔值。如果该值为 true，编译器应把该项目的使用当作一个错误。默认值是 false（编译器生成一个警告）。

下面的实例演示了该特性：

```csharp
    using System;
    public class MyClass
    {
       [Obsolete("Don't use OldMethod, use NewMethod instead", true)]
       static void OldMethod()
       { 
          Console.WriteLine("It is the old method");
       }
       static void NewMethod()
       { 
          Console.WriteLine("It is the new method"); 
       }
       public static void Main()
       {
          OldMethod();
       }
    }
```

当您尝试编译该程序时，编译器会给出一个错误消息说明：

```csharp
    Don't use OldMethod, use NewMethod instead
```

 

### 三、创建自定义特性（Attribute）

.Net 框架允许创建自定义特性，用于存储声明性的信息，且可在运行时被检索。该信息根据设计标准和应用程序需要，可与任何目标元素相关。

创建并使用自定义特性包含四个步骤：

```
    • 声明自定义特性
    • 构建自定义特性
    • 在目标程序元素上应用自定义特性
    • 通过反射访问特性
```

最后一个步骤包含编写一个简单的程序来读取元数据以便查找各种符号。元数据是用于描述其他数据的数据和信息。该程序应使用反射来在运行时访问特性。我们将在下一章详细讨论这点。

 

#### 3.1 声明自定义特性

一个新的自定义特性应派生自 **System.Attribute** 类。例如：

```csharp
    // 一个自定义特性 BugFix 被赋给类及其成员
    [AttributeUsage(AttributeTargets.Class |
    AttributeTargets.Constructor |
    AttributeTargets.Field |
    AttributeTargets.Method |
    AttributeTargets.Property,
    AllowMultiple = true)]

    public class DeBugInfo : System.Attribute
```

在上面的代码中，我们已经声明了一个名为 DeBugInfo 的自定义特性。

 

#### 3.2 构建自定义特性

让我们构建一个名为 `DeBugInfo` 的自定义特性，该特性将存储调试程序获得的信息。它存储下面的信息：

```
    • bug 的代码编号
    • 辨认该 bug 的开发人员名字
    • 最后一次审查该代码的日期
    • 一个存储了开发人员标记的字符串消息
```

我们的 DeBugInfo 类将带有三个用于存储前三个信息的私有属性（property）和一个用于存储消息的公有属性（property）。所以 bug 编号、开发人员名字和审查日期将是 DeBugInfo 类的必需的定位（ positional）参数，消息将是一个可选的命名（named）参数。

每个特性必须至少有一个构造函数。必需的定位（ positional）参数应通过构造函数传递。下面的代码演示了 DeBugInfo 类：

```csharp
    // 一个自定义特性 BugFix 被赋给类及其成员
    [AttributeUsage(AttributeTargets.Class |
    AttributeTargets.Constructor |
    AttributeTargets.Field |
    AttributeTargets.Method |
    AttributeTargets.Property,
    AllowMultiple = true)]

    public class DeBugInfo : System.Attribute
    {
      private int bugNo;
      private string developer;
      private string lastReview;
      public string message;

      public DeBugInfo(int bg, string dev, string d)
      {
          this.bugNo = bg;
          this.developer = dev;
          this.lastReview = d;
      }

      public int BugNo
      {
          get
          {
              return bugNo;
          }
      }
      public string Developer
      {
          get
          {
              return developer;
          }
      }
      public string LastReview
      {
          get
          {
              return lastReview;
          }
      }
      public string Message
      {
          get
          {
              return message;
          }
          set
          {
              message = value;
          }
      }
    }
```

 

#### 3.3 应用自定义特性

通过把特性放置在紧接着它的目标之前，来应用该特性：

```csharp
    [DeBugInfo(45, "Zara Ali", "12/8/2012", Message = "Return type mismatch")]
    [DeBugInfo(49, "Nuha Ali", "10/10/2012", Message = "Unused variable")]
    class Rectangle
    {
      // 成员变量
      protected double length;
      protected double width;
      public Rectangle(double l, double w)
      {
          length = l;
          width = w;
      }
      [DeBugInfo(55, "Zara Ali", "19/10/2012",
      Message = "Return type mismatch")]
      public double GetArea()
      {
          return length * width;
      }
      [DeBugInfo(56, "Zara Ali", "19/10/2012")]
      public void Display()
      {
          Console.WriteLine("Length: {0}", length);
          Console.WriteLine("Width: {0}", width);
          Console.WriteLine("Area: {0}", GetArea());
      }
    }
```

在下一章中，我们将使用 Reflection 类对象来检索这些信息。

## C# 反射

反射指程序可以访问、检测和修改它本身状态或行为的一种能力。

程序集包含模块，而模块包含类型，类型又包含成员。反射则提供了封装程序集、模块和类型的对象。

您可以使用反射动态地创建类型的实例，将类型绑定到现有对象，或从现有对象中获取类型。然后，可以调用类型的方法或访问其字段和属性。

 

#### 优缺点

优点：

1. 反射提高了程序的灵活性和扩展性。
2. 降低耦合性，提高自适应能力。
3. 它允许程序创建和控制任何类的对象，无需提前硬编码目标类。

缺点：

1. 性能问题：使用反射基本上是一种解释操作，用于字段和方法接入时要远慢于直接代码。因此反射机制主要应用在对灵活性和拓展性要求很高的系统框架上，普通程序不建议使用。
2. 使用反射会模糊程序内部逻辑；程序员希望在源代码中看到程序的逻辑，反射却绕过了源代码的技术，因而会带来维护的问题，反射代码比相应的直接代码更复杂。

 

### 一、反射（Reflection）的用途

反射（Reflection）有下列用途：

1. 它允许在运行时查看特性（attribute）信息。
2. 它允许审查集合中的各种类型，以及实例化这些类型。
3. 它允许延迟绑定的方法和属性（property）。
4. 它允许在运行时创建新类型，然后使用这些类型执行一些任务。

 

### 二、查看元数据

我们已经在上面的章节中提到过，使用反射（Reflection）可以查看特性（attribute）信息。

**System.Reflection** 类的 **MemberInfo** 对象需要被初始化，用于发现与类相关的特性（attribute）。为了做到这点，您可以定义目标类的一个对象，如下：

```csharp
   System.Reflection.MemberInfo info = typeof(MyClass);
```

下面的程序演示了这点：

```csharp
   using System;

   [AttributeUsage(AttributeTargets.All)]
   public class HelpAttribute : System.Attribute
   {
      public readonly string Url;

      public string Topic  // Topic 是一个命名（named）参数
      {
         get
         {
            return topic;
         }
         set
         {

            topic = value;
         }
      }

      public HelpAttribute(string url)  // url 是一个定位（positional）参数
      {
         this.Url = url;
      }

      private string topic;
   }
   [HelpAttribute("Information on the class MyClass")]
   class MyClass
   {
   }

   namespace AttributeAppl
   {
      class Program
      {
         static void Main(string[] args)
         {
            System.Reflection.MemberInfo info = typeof(MyClass);
            object[] attributes = info.GetCustomAttributes(true);
            for (int i = 0; i < attributes.Length; i++)
            {
               System.Console.WriteLine(attributes[i]);
            }
            Console.ReadKey();

         }
      }
   }
```

当上面的代码被编译和执行时，它会显示附加到类 MyClass 上的自定义特性：

```csharp
   HelpAttribute
```

 

#### 实例

在本实例中，我们将使用在上一章中创建的 DeBugInfo 特性，并使用反射（Reflection）来读取 Rectangle 类中的元数据。

```csharp
   using System;
   using System.Reflection;
   namespace BugFixApplication
   {
      // 一个自定义特性 BugFix 被赋给类及其成员
      [AttributeUsage(AttributeTargets.Class |
      AttributeTargets.Constructor |
      AttributeTargets.Field |
      AttributeTargets.Method |
      AttributeTargets.Property,
      AllowMultiple = true)]

      public class DeBugInfo : System.Attribute
      {
         private int bugNo;
         private string developer;
         private string lastReview;
         public string message;

         public DeBugInfo(int bg, string dev, string d)
         {
            this.bugNo = bg;
            this.developer = dev;
            this.lastReview = d;
         }

         public int BugNo
         {
            get
            {
               return bugNo;
            }
         }
         public string Developer
         {
            get
            {
               return developer;
            }
         }
         public string LastReview
         {
            get
            {
               return lastReview;
            }
         }
         public string Message
         {
            get
            {
               return message;
            }
            set
            {
               message = value;
            }
         }
      }
      [DeBugInfo(45, "Zara Ali", "12/8/2012",
       Message = "Return type mismatch")]
      [DeBugInfo(49, "Nuha Ali", "10/10/2012",
       Message = "Unused variable")]
      class Rectangle
      {
         // 成员变量
         protected double length;
         protected double width;
         public Rectangle(double l, double w)
         {
            length = l;
            width = w;
         }
         [DeBugInfo(55, "Zara Ali", "19/10/2012",
          Message = "Return type mismatch")]
         public double GetArea()
         {
            return length * width;
         }
         [DeBugInfo(56, "Zara Ali", "19/10/2012")]
         public void Display()
         {
            Console.WriteLine("Length: {0}", length);
            Console.WriteLine("Width: {0}", width);
            Console.WriteLine("Area: {0}", GetArea());
         }
      }//end class Rectangle  

      class ExecuteRectangle
      {
         static void Main(string[] args)
         {
            Rectangle r = new Rectangle(4.5, 7.5);
            r.Display();
            Type type = typeof(Rectangle);
            // 遍历 Rectangle 类的特性
            foreach (Object attributes in type.GetCustomAttributes(false))
            {
               DeBugInfo dbi = (DeBugInfo)attributes;
               if (null != dbi)
               {
                  Console.WriteLine("Bug no: {0}", dbi.BugNo);
                  Console.WriteLine("Developer: {0}", dbi.Developer);
                  Console.WriteLine("Last Reviewed: {0}",
                       dbi.LastReview);
                  Console.WriteLine("Remarks: {0}", dbi.Message);
               }
            }

            // 遍历方法特性
            foreach (MethodInfo m in type.GetMethods())
            {
               foreach (Attribute a in m.GetCustomAttributes(true))
               {
                  DeBugInfo dbi = (DeBugInfo)a;
                  if (null != dbi)
                  {
                     Console.WriteLine("Bug no: {0}, for Method: {1}",
                           dbi.BugNo, m.Name);
                     Console.WriteLine("Developer: {0}", dbi.Developer);
                     Console.WriteLine("Last Reviewed: {0}",
                           dbi.LastReview);
                     Console.WriteLine("Remarks: {0}", dbi.Message);
                  }
               }
            }
            Console.ReadLine();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Length: 4.5
   Width: 7.5
   Area: 33.75
   Bug No: 49
   Developer: Nuha Ali
   Last Reviewed: 10/10/2012
   Remarks: Unused variable
   Bug No: 45
   Developer: Zara Ali
   Last Reviewed: 12/8/2012
   Remarks: Return type mismatch
   Bug No: 55, for Method: GetArea
   Developer: Zara Ali
   Last Reviewed: 19/10/2012
   Remarks: Return type mismatch
   Bug No: 56, for Method: Display
   Developer: Zara Ali
   Last Reviewed: 19/10/2012
   Remarks:
```

## C# 不安全代码

当一个代码块使用 **unsafe** 修饰符标记时，C# 允许在函数中使用指针变量。**不安全代码**或非托管代码是指使用了**指针**变量的代码块。

 

### 一、指针变量

**指针** 是值为另一个变量的地址的变量，即，内存位置的直接地址。就像其他变量或常量，您必须在使用指针存储其他变量地址之前声明指针。

指针变量声明的一般形式为：

```csharp
   type *var-name;
```

以下是有效的指针声明：

```csharp
   int    *ip;    /* 指向一个整数 */
   double *dp;    /* 指向一个双精度数 */
   float  *fp;    /* 指向一个浮点数 */
   char   *ch     /* 指向一个字符 */
```

下面的实例说明了 C# 中使用了 **unsafe** 修饰符时指针的使用：

```csharp
   using System;
   namespace UnsafeCodeApplication
   {
       class Program
       {
           static unsafe void Main(string[] args)
           {
               int var = 20;
               int* p = &var;
               Console.WriteLine("Data is: {0} ",  var);
               Console.WriteLine("Address is: {0}",  (int)p);
               Console.ReadKey();
           }
       }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Data is: 20
   Address is: 99215364
```

您也可以不用声明整个方法作为不安全代码，只需要声明方法的一部分作为不安全代码。下面的实例说明了这点。

 

### 二、使用指针检索数据值

您可以使用 **ToString()** 方法检索存储在指针变量所引用位置的数据。下面的实例演示了这点：

```csharp
   using System;
   namespace UnsafeCodeApplication
   {
      class Program
      {
         public static void Main()
         {
            unsafe
            {
               int var = 20;
               int* p = &var;
               Console.WriteLine("Data is: {0} " , var);
               Console.WriteLine("Data is: {0} " , p->ToString());
               Console.WriteLine("Address is: {0} " , (int)p);
            }
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Data is: 20
   Data is: 20
   Address is: 77128984
```

 

### 三、传递指针作为方法的参数

您可以向方法传递指针变量作为方法的参数。下面的实例说明了这点：

```csharp
   using System;
   namespace UnsafeCodeApplication
   {
      class TestPointer
      {
         public unsafe void swap(int* p, int *q)
         {
            int temp = *p;
            *p = *q;
            *q = temp;
         }

         public unsafe static void Main()
         {
            TestPointer p = new TestPointer();
            int var1 = 10;
            int var2 = 20;
            int* x = &var1;
            int* y = &var2;

            Console.WriteLine("Before Swap: var1:{0}, var2: {1}", var1, var2);
            p.swap(x, y);

            Console.WriteLine("After Swap: var1:{0}, var2: {1}", var1, var2);
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Before Swap: var1: 10, var2: 20
   After Swap: var1: 20, var2: 10
```

 

### 四、使用指针访问数组元素

在 C# 中，数组名称和一个指向与数组数据具有相同数据类型的指针是不同的变量类型。例如，int *p 和 int[] p 是不同的类型。您可以增加指针变量 p，因为它在内存中不是固定的，但是数组地址在内存中是固定的，所以您不能增加数组 p。

因此，如果您需要使用指针变量访问数组数据，可以像我们通常在 C 或 C++ 中所做的那样，使用 fixed 关键字来固定指针。 下面的实例演示了这点：

```csharp
   using System;
   namespace UnsafeCodeApplication
   {
      class TestPointer
      {
         public unsafe static void Main()
         {
            int[]  list = {10, 100, 200};
            fixed(int *ptr = list)

            /* 显示指针中数组地址 */
            for ( int i = 0; i < 3; i++)
            {
               Console.WriteLine("Address of list[{0}]={1}",i,(int)(ptr + i));
               Console.WriteLine("Value of list[{0}]={1}", i, *(ptr + i));
            }
            Console.ReadKey();
         }
      }
   }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
   Address of list[0] = 31627168
   Value of list[0] = 10
   Address of list[1] = 31627172
   Value of list[1] = 100
   Address of list[2] = 31627176
   Value of list[2] = 200
```

 

### 五、编译不安全代码

为了编译不安全代码，您必须切换到命令行编译器指定 **/unsafe** 命令行。

例如，为了编译包含不安全代码的名为 prog1.cs 的程序，需在命令行中输入命令：

```csharp
   csc /unsafe prog1.cs
```

如果您使用的是 Visual Studio IDE，那么您需要在项目属性中启用不安全代码。 步骤如下：

1. 通过双击资源管理器（Solution Explorer）中的属性（properties）节点，打开项目属性（project properties）。
2. 点击 Build 标签页。
3. 选择选项"Allow unsafe code"。

## C# 多线程

**线程** 被定义为程序的执行路径。每个线程都定义了一个独特的控制流。如果您的应用程序涉及到复杂的和耗时的操作，那么设置不同的线程执行路径往往是有益的，每个线程执行特定的工作。

线程是**轻量级进程**。一个使用线程的常见实例是现代操作系统中并行编程的实现。使用线程节省了 CPU 周期的浪费，同时提高了应用程序的效率。

到目前为止我们编写的程序是一个单线程作为应用程序的运行实例的单一的过程运行的。但是，这样子应用程序同时只能执行一个任务。为了同时执行多个任务，它可以被划分为更小的线程。

 

### 一、线程生命周期

线程生命周期开始于 System.Threading.Thread 类的对象被创建时，结束于线程被终止或完成执行时。

下面列出了线程生命周期中的各种状态：

1. 未启动状态：当线程实例被创建但 Start 方法未被调用时的状况。

2. 就绪状态：当线程准备好运行并等待 CPU 周期时的状况。

3. 不可运行状态：下面的几种情况下线程是不可运行的：

   ```
    • 已经调用 Sleep 方法
    • 已经调用 Wait 方法
    • 通过 I/O 操作阻塞
   ```

4. 死亡状态：当线程已完成执行或已中止时的状况。

 

### 二、主线程

在 C# 中，**System.Threading.Thread** 类用于线程的工作。它允许创建并访问多线程应用程序中的单个线程。进程中第一个被执行的线程称为**主线程**。

当 C# 程序开始执行时，主线程自动创建。使用 **Thread** 类创建的线程被主线程的子线程调用。您可以使用 Thread 类的 **CurrentThread** 属性访问线程。

下面的程序演示了主线程的执行：

```csharp
    using System;
    using System.Threading;

    namespace MultithreadingApplication
    {
        class MainThreadProgram
        {
            static void Main(string[] args)
            {
                Thread th = Thread.CurrentThread;
                th.Name = "MainThread";
                Console.WriteLine("This is {0}", th.Name);
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    This is MainThread
```

 

### 三、Thread 类常用的属性和方法

下表列出了 **Thread** 类的一些常用的 **属性**：

| 属性               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| CurrentContext     | 获取线程正在其中执行的当前上下文。                           |
| CurrentCulture     | 获取或设置当前线程的区域性。                                 |
| CurrentPrinciple   | 获取或设置线程的当前负责人（对基于角色的安全性而言）。       |
| CurrentThread      | 获取当前正在运行的线程。                                     |
| CurrentUICulture   | 获取或设置资源管理器使用的当前区域性以便在运行时查找区域性特定的资源。 |
| ExecutionContext   | 获取一个 ExecutionContext 对象，该对象包含有关当前线程的各种上下文的信息。 |
| IsAlive            | 获取一个值，该值指示当前线程的执行状态。                     |
| IsBackground       | 获取或设置一个值，该值指示某个线程是否为后台线程。           |
| IsThreadPoolThread | 获取一个值，该值指示线程是否属于托管线程池。                 |
| ManagedThreadId    | 获取当前托管线程的唯一标识符。                               |
| Name               | 获取或设置线程的名称。                                       |
| Priority           | 获取或设置一个值，该值指示线程的调度优先级。                 |
| ThreadState        | 获取一个值，该值包含当前线程的状态。                         |

 

下表列出了 **Thread** 类的一些常用的 **方法**：

| 序号 | 方法名 & 描述                                                |
| :--- | :----------------------------------------------------------- |
| 1    | public void Abort() 在调用此方法的线程上引发 ThreadAbortException，以开始终止此线程的过程。调用此方法通常会终止线程。 |
| 2    | public static LocalDataStoreSlot AllocateDataSlot() 在所有的线程上分配未命名的数据槽。为了获得更好的性能，请改用以 ThreadStaticAttribute 属性标记的字段。 |
| 3    | public static LocalDataStoreSlot AllocateNamedDataSlot( string name) 在所有线程上分配已命名的数据槽。为了获得更好的性能，请改用以 ThreadStaticAttribute 属性标记的字段。 |
| 4    | public static void BeginCriticalRegion() 通知主机执行将要进入一个代码区域，在该代码区域内线程中止或未经处理的异常的影响可能会危害应用程序域中的其他任务。 |
| 5    | public static void BeginThreadAffinity() 通知主机托管代码将要执行依赖于当前物理操作系统线程的标识的指令。 |
| 6    | public static void EndCriticalRegion() 通知主机执行将要进入一个代码区域，在该代码区域内线程中止或未经处理的异常仅影响当前任务。 |
| 7    | public static void EndThreadAffinity() 通知主机托管代码已执行完依赖于当前物理操作系统线程的标识的指令。 |
| 8    | public static void FreeNamedDataSlot(string name) 为进程中的所有线程消除名称与槽之间的关联。为了获得更好的性能，请改用以 ThreadStaticAttribute 属性标记的字段。 |
| 9    | public static Object GetData( LocalDataStoreSlot slot ) 在当前线程的当前域中从当前线程上指定的槽中检索值。为了获得更好的性能，请改用以 ThreadStaticAttribute 属性标记的字段。 |
| 10   | public static AppDomain GetDomain() 返回当前线程正在其中运行的当前域。 |
| 11   | public static AppDomain GetDomainID() 返回唯一的应用程序域标识符。 |
| 12   | public static LocalDataStoreSlot GetNamedDataSlot( string name ) 查找已命名的数据槽。为了获得更好的性能，请改用以 ThreadStaticAttribute 属性标记的字段。 |
| 13   | public void Interrupt() 中断处于 WaitSleepJoin 线程状态的线程。 |
| 14   | public void Join() 在继续执行标准的 COM 和 SendMessage 消息泵处理期间，阻塞调用线程，直到某个线程终止为止。此方法有不同的重载形式。 |
| 15   | public static void MemoryBarrier() 按如下方式同步内存存取：执行当前线程的处理器在对指令重新排序时，不能采用先执行 MemoryBarrier 调用之后的内存存取，再执行 MemoryBarrier 调用之前的内存存取的方式。 |
| 16   | public static void ResetAbort() 取消为当前线程请求的 Abort。 |
| 17   | public static void SetData( LocalDataStoreSlot slot, Object data ) 在当前正在运行的线程上为此线程的当前域在指定槽中设置数据。为了获得更好的性能，请改用以 ThreadStaticAttribute 属性标记的字段。 |
| 18   | public void Start() 开始一个线程。                           |
| 19   | public static void Sleep( int millisecondsTimeout ) 让线程暂停一段时间。 |
| 20   | public static void SpinWait( int iterations ) 导致线程等待由 iterations 参数定义的时间量。 |
| 21   | public static byte VolatileRead( ref byte address ) public static double VolatileRead( ref double address ) public static int VolatileRead( ref int address ) public static Object VolatileRead( ref Object address ) 读取字段值。无论处理器的数目或处理器缓存的状态如何，该值都是由计算机的任何处理器写入的最新值。此方法有不同的重载形式。这里只给出了一些形式。 |
| 22   | public static void VolatileWrite( ref byte address, byte value ) public static void VolatileWrite( ref double address, double value ) public static void VolatileWrite( ref int address, int value ) public static void VolatileWrite( ref Object address, Object value ) 立即向字段写入一个值，以使该值对计算机中的所有处理器都可见。此方法有不同的重载形式。这里只给出了一些形式。 |
| 23   | public static bool Yield() 导致调用线程执行准备好在当前处理器上运行的另一个线程。由操作系统选择要执行的线程。 |

 

### 四、创建线程

线程是通过扩展 Thread 类创建的。扩展的 Thread 类调用 **Start()** 方法来开始子线程的执行。

下面的程序演示了这个概念：

```csharp
    using System;
    using System.Threading;

    namespace MultithreadingApplication
    {
        class ThreadCreationProgram
        {
            public static void CallToChildThread()
            {
                Console.WriteLine("Child thread starts");
            }

            static void Main(string[] args)
            {
                ThreadStart childref = new ThreadStart(CallToChildThread);
                Console.WriteLine("In Main: Creating the Child thread");
                Thread childThread = new Thread(childref);
                childThread.Start();
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    In Main: Creating the Child thread
    Child thread starts
```

 

### 五、管理线程

Thread 类提供了各种管理线程的方法。

下面的实例演示了 **sleep()** 方法的使用，用于在一个特定的时间暂停线程。

```csharp
    using System;
    using System.Threading;

    namespace MultithreadingApplication
    {
        class ThreadCreationProgram
        {
            public static void CallToChildThread()
            {
                Console.WriteLine("Child thread starts");
                // 线程暂停 5000 毫秒
                int sleepfor = 5000; 
                Console.WriteLine("Child Thread Paused for {0} seconds", 
                                  sleepfor / 1000);
                Thread.Sleep(sleepfor);
                Console.WriteLine("Child thread resumes");
            }

            static void Main(string[] args)
            {
                ThreadStart childref = new ThreadStart(CallToChildThread);
                Console.WriteLine("In Main: Creating the Child thread");
                Thread childThread = new Thread(childref);
                childThread.Start();
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    In Main: Creating the Child thread
    Child thread starts
    Child Thread Paused for 5 seconds
    Child thread resumes
```

 

### 六、销毁线程

**Abort()** 方法用于销毁线程。

通过抛出 **threadabortexception** 在运行时中止线程。这个异常不能被捕获，如果有 finally 块，控制会被送至 finally 块。

下面的程序说明了这点：

```csharp
    using System;
    using System.Threading;

    namespace MultithreadingApplication
    {
        class ThreadCreationProgram
        {
            public static void CallToChildThread()
            {
                try
                {

                    Console.WriteLine("Child thread starts");
                    // 计数到 10
                    for (int counter = 0; counter <= 10; counter++)
                    {
                        Thread.Sleep(500);
                        Console.WriteLine(counter);
                    }
                    Console.WriteLine("Child Thread Completed");

                }
                catch (ThreadAbortException e)
                {
                    Console.WriteLine("Thread Abort Exception");
                }
                finally
                {
                    Console.WriteLine("Couldn't catch the Thread Exception");
                }

            }

            static void Main(string[] args)
            {
                ThreadStart childref = new ThreadStart(CallToChildThread);
                Console.WriteLine("In Main: Creating the Child thread");
                Thread childThread = new Thread(childref);
                childThread.Start();
                // 停止主线程一段时间
                Thread.Sleep(2000);
                // 现在中止子线程
                Console.WriteLine("In Main: Aborting the Child thread");
                childThread.Abort();
                Console.ReadKey();
            }
        }
    }
```

当上面的代码被编译和执行时，它会产生下列结果：

```csharp
    In Main: Creating the Child thread
    Child thread starts
    0
    1
    2
    In Main: Aborting the Child thread
    Thread Abort Exception
    Couldn't catch the Thread Exception
```

## C# LINQ

```csharp
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;

namespace LinqTest
{

    class MainClass
    {
        public static void Main(string[] args)
        {


         /*
          * where        筛选操作符定义了返回元素的条件
          * 
          * Select       投射操作符用于把对象转换为另一个类型的新对象。
          * 
          * OrderBy      排序操作符返回的元素的顺序
          * ThenBy
          * OerderByDescending
          * ThenByDescending
          * Reverse
          * 
          * Join         连接操作符用于合并不直接相关的集合。
          * GroupJoin
          * 
          * GroupBy      组合操作符把数组放在组中。
          * ToLookup
          * 
          * Any          如果元素序列满足指定的条件，限定符操作就返回布尔值
          * All
          * Contains     检查某个元素是否在集合中
          * 
          * Take         分区操作符返回集合的一个子集。指定要从集合中提取的元素个数
          * Skip         跳过指定的元素个数
          * TakeWhile
          * SkipWhile
          * 
          * Distinct     Set操作符返回一个集合。从集合中删除重复的元素。
          * Union        需要两个集合，返回出现在其中一个集合中的唯一元素。
          * Intersect    需要两个集合，返回两个集合都有的元素。
          * Except       需要两个集合，返回只出现在一个集合中的元素。
          * Zip          需要两个集合，把两个集合合并为一个
          * 
          * First        这些元素操作符仅返回一个元素。返回第一个满足条件的元素。
          * FirstOrDefault   返回第一个满足条件的元素。如果没有找到，就返回默认值。
          * Last
          * LastOrDefault
          * ElementAt    指定了要返回的元素的位置
          * ElementAtOrDefault
          * Single       只返回一个满足条件的元素。如果有多个元素都满足条件，就抛出一个异常。
          * SingleOrDefault
          * 
          * Count        聚合操作符计算集合的一个值。利用这些聚合操作符，可以计算所有值的总和、所有元素的个数
          * Sum          总和
          * Min          值最小的元素
          * Max          值最大的元素
          * Average      平均值
          * Aggregate    聚合     可以传递一个lambda表达式，该表达式对有所的值进行聚合
          * 
          * ToArray      转换为数组
          * AsEnumerable 转换为IEnumerable
          * ToList       转换为IList
          * ToDictionary 转换为IDictionary
          * Cast<TResult>
          * 
          * Empty        这些生成操作符返回一个新集合。使用Empty时集合是空的
          * Range        返回一系列数字
          * Repeat       返回一个始终重复一个值的集合；返回一个迭代器，该迭代器把同一个值重复特定的次数。
          * 
          */





            // 1. 查询出 Unity1609 的所有冠军 并按照总分排序

            /*
             * 查询表达式必须以 from 子句开头，以 select 或 group 子句结束。
             * 在这两个子句之间，可以使用 where、oderby、join、let 和其他 from 子句。
             */

            var query = from n in Formula.GetChampions()
                        where n.ClassesName == "Unity1609"
                        orderby n.Sum descending
                        select n;

            // 使用扩展方法实现
            var champions = new List<Student>(Formula.GetChampions());
            IEnumerable<Student> result = champions.Where(o => o.ClassesName == "Unity1609").
            OrderByDescending(o => o.Sum).
            Select(n => n);


            foreach (var item in result)
            {
                Console.WriteLine("{0:N}", item);
            }




            // 2. 筛选 
            // 使用where子句，可以合并多个表达式。


            // 3. 用索引筛选 
            // 不能使用LINQ查询的一个例子是Where()方法的重载。在Where()方法的重载时，可以传递第2个参数-索引。
            // 索引是筛选器返回的每个结果的计数器。


            // 4. 类型筛选 
            // 为了进行基于类型的筛选，可以使用OfType<>()扩展方法。

            object[] data1 = { "one", 2, 3, "four" };
            var query1 = data1.OfType<string>();    // 从集合中仅返回字符串


            // 5. 复合的from子句
            // 如果需要根据对象的一个成员进行筛选，而该成员本身是一个系列，就可以使用复合的from子句。
            // 查询元素是集合的元素  扩展方法 SelectMany() 用于迭代序列的序列
            //var query2 = from r in Formula.GetChampions()
            //from c in r.Scores
            //where c > 90
            //orderby r.Sum
            //select r.Name + " " + r.Sum;

            var query2 = Formula.GetChampions().
            SelectMany(source => source.Scores, (source, collection) => new { Stu = source, Scores = collection }).
            Where(newObj => newObj.Stu.Sum > 90).
            OrderBy(newObj => newObj.Stu.Sum).
            Select(newObj => newObj.Stu.Name + " " + newObj.Stu.Sum);


            // 6. 排序
            // 要对序列排序，前面使用了orderby子句。


            // 7. 分组 
            // 要根据一个关键字值对查询结果分组，可以使用group子句。


            //var query3 = from n in Formula.GetChampions()
            //group n by n.ClassesName into g
            //orderby g.Count(), g.Key
            //where g.Count() >= 2
            //select new
            //{
            //    ClassName = g.Key,
            //    Count = g.Count()
            //};

            // GroupBy()  IGrouping  Key
            var query3 = Formula.GetChampions().
            GroupBy(n => n.ClassesName).
            OrderByDescending(group => group.Count()).
            ThenBy(group => group.Key).
            Where(g => g.Count() >= 2).
            Select(g => new { ClassName = g.Key, Count = g.Count() });


            // 8. 对嵌套的对象分组
            // 如果分组的对象应包含嵌套的序列，就可以改变select子句创建的匿名类型
            var query4 = from r in Formula.GetChampions()
                         group r by r.ClassesName into g
                         orderby g.Count() descending, g.Key
                         where g.Count() >= 2
                         select new
                         {
                             ClassName = g.Key,
                             Count = g.Count(),
                             Scores = from r1 in g
                                      orderby r1.Sum descending, r1.Name
                                      select r1.Scores
                         };

            foreach (var item in query4)
            {
                Console.WriteLine(item.ClassName + " " + item.Count);
            }


            // 9. 内连接 
            // 使用join子句可以根据特定的条件合并两个数据源
            var query5 = from n in Formula.GetChampions()
                         from score in n.Scores
                         select new
                         {
                             Name = n.Name,
                             Score = score,
                             ClassName = n.ClassesName,
                             Years = n.Years
                         };
            var query6 = from n in Formula.GetContructorChampions()
                         from y in n.Years
                         select new
                         {
                             ClassName = n.ClassesName,
                             Year = y
                         };
            var query7 = (from n in query5
                          join t in query6 on n.ClassName equals t.ClassName
                          select new
                          {
                              n.ClassName,
                              n.Name,
                              n.Score,
                              t.Year
                          }).Take(10);

            foreach (var item in query7)
            {
                Console.WriteLine("{0},{1},{2},{3}", item.ClassName, item.Name, item.Score, item.Year);
            }


            // 10. 左外连接  
            // 返回左边序列的全部元素，即时它们在右边的序列中没有匹配的元素
            // 使用 join into、 DefaultIfEmpty 定义 
            var query8 = from n in query5
                         join t in query6 on n.ClassName equals t.ClassName into rt
                         from q in rt.DefaultIfEmpty()
                         orderby n.Score
                         select new
                         {
                             Name = n.Name,
                             ClassName = q == null ? "NoClassName" : n.ClassName,
                             Score = n.Score,
                             Year = q == null ? -1 : q.Year
                         };

            foreach (var item in query8)
            {
                Console.WriteLine($"{item.Name},{item.ClassName},{item.Score},{item.Year}");
            }


            // 11. 组连接 
            // 左外连接使用了组连接和into子句。它有一部分语法与组连接相同。只不过组连接不使用DefaultIfEmpty方法。
            // 使用组连接时，可以连接两个独立的序列，对于其中一个序列中的某个元素，另一个序列中存在对应的一个项列表。

            var query9 = from r in query5
                         from y in r.Years
                         join r2 in query6 on
                         new { ClassName = r.ClassName, Year = y }
                         equals
                         new { ClassName = r2.ClassName, Year = r2.Year }
                         into g
                         select new { ClassName = r.ClassName, Name = r.Name, Year = y, Score = r.Score };

            foreach (var item in query9)
            {
                Console.WriteLine($"{item.ClassName},{item.Name},{item.Score},{item.Year}");
            }


            // 12. 集合操作
            // 扩展方法 Distinct()、Union()、Intersect()和Except() 都是集合操作。


            // 13. 合并
            // Zip()方法允许用一个谓词函数把两个相关的序列合并为一个。
            var query10 = query5.Zip(query6, (first, second) => first.ClassName + "," + first.Name + "," + second.Year);


            // 14. 分区
            // 扩展方法 Take() 和 Skip() 等的分区操作可用于分页。
            // 使用 TakeWhile() 和 SkipWhile() 扩展方法，还可以传递一个谓词，根据谓词的结果提取或跳过某些项。


            // 15. 聚合操作符
            // 聚合操作符（如Count()、Sum()、Min()、Max()、Average()和Aggregate()）不返回一个序列，而返回一个值。
            var query11 = from r in Formula.GetChampions()
                          let scoreCount = r.Scores.Count()        // let子句定义了一个变量
                          where scoreCount >= 2
                          orderby scoreCount descending
                          select new
                          {
                              Name = r.Name,
                              ClassName = r.ClassesName
                          };


            // 16. 转换操作符
            // ToList()
            // Lookup<TKey, TElement>   一个键可以对应多个值
            var query12 = (from r in Formula.GetChampions()
                           from s in r.Scores
                           select new
                           {
                               ClassName = r.ClassesName,
                               Name = r.Name,
                               Score = s
                           }).ToLookup(cr => cr.ClassName, cr => cr.Name);

            foreach (var item in query12["Unity1605"])
            {
                Console.WriteLine($"{item}");
            }

            // 如果需要在非类型化的集合上（如ArrayList）使用LINQ查询，就可以使用Cast()方法。

            var list = new System.Collections.ArrayList(Formula.GetChampions() as System.Collections.ICollection);
            var query13 = from r in list.Cast<Student>()
                          where r.ClassesName == "Unity1605"
                          select r;
            foreach (var item in query13)
            {
                Console.WriteLine($"{item.ClassesName}, {item.Name}");
            }


            // 17. 生成操作符
            // 生成操作符Range()、Empty()和Repeat()不是扩展方法，而是返回序列的正常静态方法。
            //var values = Enumerable.Range(1, 20);   // 第一个参数作为起始值，第二个参数作为要填充的项数
            //values = values.Select(n => n * 3);
            //foreach (var item in values)
            //{
            //    Console.WriteLine(item);
            //}
            // Range()方法不返回填充了所定义值的集合，这个方法与其他方法一样，也推迟执行查询，
            // 并返回一个RangeEnumerator，其中只有一条yield return 语句，来递增值。


            // 18. 并行LINQ
            // System.Linq名称空间中包含的类ParalleEnumerable可以分解查询的工作，使其分布在多个线程上。

            //var res = (from x in SampleData().AsParallel()
            //where Math.Log(x) < 4
            //select x).Average();

            var res = SampleData().AsParallel().Where(x => Math.Log(x) < 4).Select(x => x).Average();
            Console.WriteLine(res);

            // 19. 分区器 
            // AsParalle() 方法不仅扩展了IEnuerable<T> 接口，还扩展了 Partitioner 类。通过它，可以影响要创建的分区。
            // Partitioner 类用 System.Collection.ConCurrent 名称空间定义，并且有不同的变体。
            // Create() 方法接受实现了 IList<T> 类的数组或对象。

            var data = SampleData();
            var res1 = (from x in Partitioner.Create(data).AsParallel()
                        where Math.Log(x) < 4
                        select x).Average();
            Console.WriteLine(res1);

            // 也可以调用 WithExecutionMode() 和 WithDegreeOfParallelism() 方法，来影响并行机制。

            // 20. 取消
            // .NET 提供了一种标准方式，来取消长时间运行的任务，这也适用于并行LINQ
            // 要取消长时间运行的查询，可以给查询添加WithCancellation()方法，并传递一个CancellationToken令牌作为参数。
            // CancellationToken令牌从CancellationTokenSource类中创建。
            // 该查询在单独的线程中运行，在该线程中，捕获一个OperationCanceledException类型的异常。
            // 如果取消了查询，就触发这个异常。在主线程中，调用CancellationTokenSource类的Cancel()方法可以取消任务。


            // 21. 表达式树 Expression<T>
        }


        static IEnumerable<int> SampleData()
        {
            const int arraySize = 100000000;
            var r = new Random();
            return Enumerable.Range(0, arraySize).Select(x => r.Next(140)).ToList();
        }
    }




    #region 扩展方法
    /*
     * 扩展方法 ： 定义为静态方法，其第一个参数定义了它扩展的类型，扩展方法在一个静态类中声明。
     *           为了区分扩展方法和一般的静态方法，扩展方法还需要对第一个参数使用 this 关键字。
     * 
     *           扩展方法不能访问它扩展的类型的私有成员。调用扩展方法只是调用静态方法的一种新语法。
     *           string s = "hello";
     *           s.Foo();
     *           StringExtension.Foo(s);
     */

    public static class StringExtension
    {
        public static void Foo(this string s)
        {
            Console.WriteLine("Foo invoked for {0}", s);
        }
    }
    #endregion

    // 2016~2018年间，所有获得第一名的名单
    static class Formula
    {
        public static List<Student> nameList;

        public static IList<Student> GetChampions()
        {
            if (nameList == null)
            {
                nameList = new List<Student>()
                {
                    new Student("张三", 18, "Unity1605", new int[]{99, 98}, new int[]{2016}),
                    new Student("李四", 20, "Unity1605", new int[]{98, 97}, new int[]{2016}),
                    new Student("李四", 20, "Unity1607", new int[]{98, 97}, new int[]{2016}),
                    new Student("刘五", 21, "Unity1609", new int[]{98, 96}, new int[]{2016}),
                    new Student("王二", 21, "Unity1609", new int[]{99, 96}, new int[]{2016}),
                    new Student("王六", 22, "Unity1609", new int[]{94, 95}, new int[]{2017}),
                    new Student("赵六", 23, "Unity1701", new int[]{96, 96}, new int[]{2017}),
                    new Student("田七", 23, "Unity1711", new int[]{95, 97}, new int[]{2017}),
                    new Student("孙二", 22, "Unity1711", new int[]{94, 98}, new int[]{2018}),
                    new Student("王八", 21, "Unity1801", new int[]{99, 99}, new int[]{2018}),
                    new Student("王八", 21, "Unity1805", new int[]{99, 99}, new int[]{2018}),
                };
            }
            return nameList;
        }

        private static List<ClassesChampion> teams;
        public static IList<ClassesChampion> GetContructorChampions()
        {
            if (teams == null)
            {
                teams = new List<ClassesChampion>()
                {
                    new ClassesChampion("Unity1605", 2016),
                    new ClassesChampion("Unity1607", 2016),
                    new ClassesChampion("Unity1609", 2016, 2017),
                    new ClassesChampion("Unity1701", 2017),
                    new ClassesChampion("Unity1711", 2017, 2018),
                    new ClassesChampion("Unity1801", 2018),
                    new ClassesChampion("Unity1803", 2019)
                };
            }
            return teams;
        }
    }

    // 排行榜 获得第一名学员的班级名字和年份
    class ClassesChampion
    {
        public ClassesChampion(string name, params int[] years)
        {
            this.ClassesName = name;
            this.Years = new List<int>(years);
        }

        public string ClassesName { get; private set; }
        public IEnumerable<int> Years { get; private set; }
    }


    class Student : IComparable<Student>, IFormattable
    {
        public string Name { get; private set; }
        public string ClassesName { get; private set; }
        public int Age { get; set; }
        public int Sum { get; private set; }

        public IEnumerable<int> Scores { get; private set; }
        public IEnumerable<int> Years { get; private set; }        // 获得第一名的年份

        public Student(string name, int age, string classesName) : this(name, age, classesName, null, null) { }

        public Student(string name, int age, string classesName, IEnumerable<int> scores, IEnumerable<int> years)
        {
            this.Name = name;
            this.ClassesName = classesName;
            this.Age = age;
            this.Scores = new List<int>(scores);
            this.Years = new List<int>(years);

            foreach (var item in Scores)
            {
                Sum += item;
            }
        }

        public override string ToString()
        {
            return string.Format("[Student: Name={0}, Age={1}]", Name, Age);
        }

        public string ToString(string format)
        {
            return ToString(format, null);
        }

        public string ToString(string format, IFormatProvider formatProvider)
        {
            switch (format)
            {
                case "N":
                    return this.Name;
                default:
                    return ToString();
            }
        }

        public int CompareTo(Student other)
        {
            if (other == null) return 1;
            return this.Sum - other.Sum;
        }
    }
}
```

## C#4.0 协变 和 抗变（逆变）

关于协变和逆变要从面向对象继承说起。继承关系是指子类和父类之间的关系；子类从父类继承所以子类的实例也就是父类的实例。比如说Animal是父类，Dog是从Animal继承的子类；如果一个对象的类型是Dog，那么他必然是Animal。 协变逆变正是利用继承关系 对不同参数类型或返回值类型 的委托或者泛型接口之间做转变。

如果一个方法要接受Dog参数，那么另一个接受Animal参数的方法肯定也可以接受这个方法的参数，这是Animal向Dog方向的转变是逆变。如果一个方法要求的返回值是Animal，那么返回Dog的方法肯定是可以满足其返回值要求的，这是Dog向Animal方向的转变是协变。

由子类向父类方向转变是协变 协变用于返回值类型用out关键字 由父类向子类方向转变是逆变 逆变用于方法的参数类型用in关键字

 

#### 一、定义

一个可变性和子类到父类转换的方向一样，就称作协变；而如果和子类到父类的转换方向相反，就叫抗变！

那到底这个协变或者抗变有什么实际利用价值呢？ 其价值就在于，在.net 4.0之前可以这么写：

```csharp
    Sharp sharp = new Rectange();
```

但是却不能这么写：

```csharp
    IEnumerable<Sharp> sharps = new List<Rectange>();
```

4.0之后，可以允许按上面的写法了，因为泛型接口`IEnumerable<T>`被声明成如下：

```csharp
    public interface IEnumerable<out T> : IEnumerable
```

数组不支持抗变。在.Net 4.0之后，支持协变和抗变的有两种类型：泛型接口和泛型委托。

 

#### 二、泛型接口中的协变和抗变

接下来定义一个泛型接口：

```csharp
    public interface ICovariant<T>  // Covariant 协变的
```

并且让上面的两个类各自继承一下该接口：

```csharp
    public class Sharp : ICovariant<Sharp>  
    {  
    }  

    public class Rectange : Sharp,ICovariant<Rectange>  
    {  
    }
```

编写测试代码：

```csharp
    static void Main(string[] args)  
    {  
        ICovariant<Sharp> isharp = new Sharp();  
        ICovariant<Rectange> irect = new Rectange();  

        isharp = irect;  
    }
```

编译并不能通过，原因是无法将`ICovariant<Rectange>`隐式转化为`ICovariant<Sharp>`！

再将接口修改为：

```csharp
    public interface ICovariant<out T>  
    {  
    }
```

编译顺利通过。这里我为泛型接口的类型参数增加了一个修饰符`out`，它表示这个泛型接口支持对类型T的协变。

即：如果一个泛型接口`IFoo<T>`，`IFoo<TSub>`可以转换为`IFoo<TParent>`的话，我们称这个过程为协变，而且说“这个泛型接口支持对T的协变”。

那我如果反过来呢，考虑如下代码：

```csharp
    static void Main(string[] args)  
    {  
        ICovariant<Sharp> isharp = new Sharp();  
        ICovariant<Rectange> irect = new Rectange();  

        irect = isharp;  
       // isharp =irect;  
    }
```

发现编译又不通过了， 原因是无法将 `ICovariant<Sharp>` 隐式转化为 `ICovariant<Rectange>` ！

将接口修改为：

```csharp
    public interface ICovariant<in T>  
    {  
    }
```

编译顺利通过。这里我将泛型接口的类型参数T修饰符修改成`in`，它表示这个泛型接口支持对类型参数T的抗变。 即：如果一个泛型接口`IFoo<T>`，`IFoo<TParent>`可以转换为`IFoo<TSub>`的话，我们称这个过程为抗变（contravariant），而且说“这个泛型接口支持对T的抗变”！

泛型接口并不单单只有一个参数，所以我们不能简单地说一个接口支持协变还是抗变，只能说一个接口对某个具体的类型参数支持协变或抗变，如`ICovariant<out T1,in T2>`说明该接口对类型参数T1支持协变，对T2支持抗变。

举个例子就是：`ICovariant<Rectange,Sharp>`能够转化成`ICovariant<Sharp,Rectange>`，这里既有协变也有抗变。

以上都是接口并没有属性或方法的情形，接下来给接口添加一些方法：

```csharp
    //这时候，无论如何修饰T，都不能编译通过
    public interface ICovariant<out T>  
    {  
        T Method1();  
        void Method2(T param);  
    }
```

发现无论用`out`还是`in`修饰T参数，根本编译不通过。

原因是，我把仅有的一个类型参数T既用作函数的返回值类型，又用作函数的参数类型。

所以： 1）当我用out修饰时，即允许接口对类型参数T协变，也就是满足从`ICovariant<Rectange>`到`ICovariant<Sharp>`转换，Method1返回值Rectange到Sharp转换没有任何问题：

```csharp
    ICovariant<Sharp> isharp = new Sharp();  
    ICovariant<Rectange> irect = new Rectange();

    isharp = irect;
    Sharp sharp = isharp.Method1();
```

但是对于把T作为参数类型的方法Method2(Rectange)会去替换Method2(Sharp)：

```csharp
    ICovariant<Sharp> isharp = new Sharp();  
    ICovariant<Rectange> irect = new Rectange();  

    isharp = irect;  
    isharp.Method2(new Sharp());
```

即如果执行最后一行代码，会发现参数中，Sharp类型并不能安全转化成Rectange类型，因为Method2(Sharp)实际上已经被替换成 Method2(Rectange) ！

2)同样，当我用in修饰时， 即允许接口对类型参数T抗变，也就是满足从`ICovariant<Sharp>`到`ICovariant<Rectange>`转换：

```csharp
    ICovariant<Sharp> isharp = new Sharp();  
    ICovariant<Rectange> irect = new Rectange();  

    //isharp = irect;  
    irect = isharp;  
    irect.Method2(new Rectange());
```

Method2(Sharp)会去替换Method2(Rectange)，所以上面的最后一句代码无论以Rectange类型还是Sharp类型为参数都没有任何问题； 但是Method1返回的将是Sharp类型：

```csharp
    ICovariant<Sharp> isharp = new Sharp();  
    ICovariant<Rectange> irect = new Rectange();  

    //isharp = irect;  
    irect = isharp;  
    Rectange rect = irect.Method1();
```

执行最后一句代码，同样将会是不安全的！

综上：在没有额外机制的限制下，接口进行协变或抗变都是类型不安全的。.NET 4.0有了改进，它允许在类型参数的声明时增加一个额外的描述，以确定这个类型参数的使用范围，这个额外的描述即in,out修饰符，它们俩的用法如下： 如果一个类型参数仅仅能用于函数的返回值，那么这个类型参数就对协变相容，用out修饰。而相反，一个类型参数如果仅能用于方法参数，那么这个类型参数就对抗变相容，用in修饰。

所以，需要将上面的接口拆成两个接口即可：

```csharp
    public interface ICovariant<out T>  
    {  
        T Method1();  

    }  

    public interface IContravariant<in T>  
    {  
        void Method2(T param);  
    }
```

.net中很多接口都仅将参数用于函数返回类型或函数参数类型，如：

```csharp
    public interface IComparable<in T> 


    public interface IEnumerable<out T> : IEnumerable
```

几个重要的注意点： 1.仅有泛型接口和泛型委托支持对类型参数的可变性，泛型类或泛型方法是不支持的。 2.值类型不参与协变或抗变，`IFoo<int>`永远无法协变成`IFoo<object>`，不管有无声明out。因为.NET泛型，每个值类型会生成专属的封闭构造类型，与引用类型版本不兼容。 3.声明属性时要注意，可读写的属性会将类型同时用于参数和返回值。因此只有只读属性才允许使用out类型参数，只写属性能够使用in参数。

接下来将接口代码改成：

```csharp
    public interface ICovariant<out T>  
    {  
        T Method1();  
        void Method3(IContravariant<T> param);  
    }  

    public interface IContravariant<in T>  
    {  
        void Method2(T param);  
    }
```

同样是可以编译通过的.

我们需要费一些周折来理解这个问题。现在我们考虑`ICovariant<Rectange>`，它应该能够协变成`ICovariant<Sharp>`，因为Rectange是Sharp的子类。因此Method3(Rectange)也就协变成了Method3(Sharp)。当我们调用这个协变,Method3(Sharp)必须能够安全变成Method3(Rectange)才能满足原函数的需要(具体原因上面已经示例过了）。这里对Method3的参数类型要求是Sharp能够抗变成Rectange！也就是说，如果一个接口需要对类型参数T协变，那么这个接口所有方法的参数类型必须支持对类型参数T的抗变（如果T有作为某些方法的参数类型）。 同理我们也可以看出，如果接口要支持对T抗变，那么接口中方法的参数类型都必须支持对T协变才行。这就是方法参数的协变-抗变互换原则。所以，我们并不能简单地说out参数只能用于方法返回类型参数，它确实只能直接用于声明返回值类型，但是只要一个支持抗变的类型协助，out类型参数就也可以用于参数类型！（即上面的例子），换句话说，in除了直接声明方法参数类型支持抗变之外，也仅能借助支持协变的类型才能用于方法参数，仅支持对T抗变的类型作为方法参数类型也是不允许的。

既然方法类型参数协变和抗变有上面的互换影响。那么方法的返回值类型会不会有同样的问题呢？ 将接口修改为:

```csharp
    public interface IContravariant<in T>  
    {  

    }  
    public interface ICovariant<out T>  
    {  

    }  

    public interface ITest<out T1, in T2>  
    {  
        ICovariant<T1> test1();  
        IContravariant<T2> test2();  
    }
```

我们看到和刚刚正好相反，如果一个接口需要对类型参数T进行协变或抗变，那么这个接口所有方法的返回值类型必须支持对T同样方向的协变或抗变（如果有某些方法的返回值是T类型）。这就是方法返回值的协变-抗变一致原则。也就是说，即使in参数也可以用于方法的返回值类型，只要借助一个可以抗变的类型作为桥梁即可。

 

#### 三、泛型委托中的协变和抗变

泛型委托的协变抗变，与泛型接口协变抗变类似。继续延用Sharp，Rectange类作为示例： 新建一个简单的泛型接口：

```csharp
    public delegate void MyDelegate1<T>();
```

测试代码：

```csharp
    MyDelegate1<Sharp> sharp1 = new MyDelegate1<Sharp>(MethodForParent1);  
    MyDelegate1<Rectange> rect1 = new MyDelegate1<Rectange>(MethodForChild1);  
    sharp1 = rect1;
```

其中两个方法为：

```csharp
    public static void MethodForParent1()   
    {  
        Console.WriteLine("Test1");  
    }  
    public static void MethodForChild1()  
    {  
        Console.WriteLine("Test2");  
    }
```

编译并不能通过，因为无法将`MyDelegate1<Rectange>`隐式转化为`MyDelegate1<Sharp>`，接下来我将接口修改为支持对类型参数T协变，即加out修饰符：

```csharp
    public delegate void MyDelegate1<out T>();
```

编译顺利用过。 同样，如果反过来，对类型参数T进行抗变：

```csharp
    MyDelegate1<Sharp> sharp1 = new MyDelegate1<Sharp>(MethodForParent1);  
    MyDelegate1<Rectange> rect1 = new MyDelegate1<Rectange>(MethodForChild1);  
    //sharp1 = rect1;  
    rect1 = sharp1;
```

只需将修饰符改为in即可：

```csharp
    public delegate void MyDelegate1<in T>();
```

考虑第二个委托：

```csharp
    public delegate T MyDelegate2<out T>();
```

测试代码：

```csharp
    MyDelegate2<Sharp> sharp2 = new MyDelegate2<Sharp>(MethodForParent2);  
    MyDelegate2<Rectange> rect2 = new MyDelegate2<Rectange>(MethodForChild2);  
    sharp2 = rect2;
```

其中两个方法为：

```csharp
    public static Sharp MethodForParent2()  
    {  
        return new Sharp();  
    }  
    public static Rectange MethodForChild2()  
    {  
        return new Rectange();  
    }
```

该委托对类型参数T进行协变没有任何问题，编译通过；如果我要对T进行抗变呢？是否只要将修饰符改成in就OK了？ 测试如下：

```csharp
    public delegate T MyDelegate2<in T>(); 

    MyDelegate2<Sharp> sharp2 = new MyDelegate2<Sharp>(MethodForParent2);  
    MyDelegate2<Rectange> rect2 = new MyDelegate2<Rectange>(MethodForChild2);  
    //sharp2 = rect2;  
    rect2 = sharp2;
```

错误如下： 变体无效: 类型参数“T”必须为对于“`MyDelegate2<T>.Invoke()`”有效的 协变式。“T”为 逆变。 意思就是：这里的类型参数T已经被声明成抗变，如果上面的最后一句有效，那么以后rect2()执行结果返回的将是一个Sharp类型的实例， 如果再出现这种代码：

```csharp
    Rectange rectange = rect2();
```

那么这将是一个从Sharp类到Rectange类的不安全的类型转换！所以如果类型参数T抗变，并且要用于方法返回类型，那么方法的返回类型也必须支持抗变。即上面所说的方法返回类型协变-抗变一致原则。

那么如何对上面的返回类型进行抗变呢？很简单，只要借助一个支持抗变的泛型委托作为方法返回类型即可：

```csharp
    public delegate Contra<T> MyDelegate2<in T>();  
    public delegate void Contra<in T>();
```

具体的方法也需要对应着修改一下：

```csharp
    public static Contra<Sharp> MethodForParent3()  
    {  
        return new Contra<Sharp>(MethodForParent1);  
    }  
    public static Contra<Rectange> MethodForChild3()  
    {  
        return new Contra<Rectange>(MethodForChild1);  
    }
```

测试代码：

```csharp
    MyDelegate2<Sharp> sharp2 = new MyDelegate2<Sharp>(MethodForParent3);  
    MyDelegate2<Rectange> rect2 = new MyDelegate2<Rectange>(MethodForChild3);  
    rect2 = sharp2;
```

编译通过。

接下来考虑第三个委托：

```csharp
    public delegate T MyDelegate3<T>(T param);
```

首先，对类型参数T进行协变：

```csharp
    public delegate T MyDelegate3<out T>(T param);
```

对应的方法及测试代码：

```csharp
    public static Sharp MethodForParent4(Sharp param)  
    {  
        return new Sharp();  
    }  
    public static Rectange MethodForChild4(Rectange param)  
    {  
        return new Rectange();  
    }  

    MyDelegate3<Sharp> sharp3 = new MyDelegate3<Sharp>(MethodForParent4);  
    MyDelegate3<Rectange> rect3 = new MyDelegate3<Rectange>(MethodForChild4);  
    sharp3 = rect3;
```

和泛型接口类似，这里的委托类型参数T被同时用作方法返回类型和方法参数类型，不管修饰符改成in或out,编译都无法通过。所以如果用out修饰T，那么方法参数param的参数类型T就需借助一样东西来转换一下：一个对类型参数T能抗变的泛型委托。 即：

```csharp
    public delegate T MyDelegate3<out T>(Contra<T> param);
```

两个方法也需对应着修改：

```csharp
    public static Sharp MethodForParent4(Contra<Sharp> param)  
    {  
        return new Sharp();  
    }  
    public static Rectange MethodForChild4(Contra<Rectange> param)  
    {  
        return new Rectange();  
    }
```

这就是上面所说的方法参数的协变-抗变互换原则

同理，如果对该委托类型参数T进行抗变，那么根据方法返回类型协变-抗变一致原则，方法返回参数也是要借助一个对类型参数能抗变的泛型委托：

```csharp
    public delegate Contra<T> MyDelegate3<in T>(T param);
```

两个方法也需对应着修改为：

```csharp
    public static Contra<Sharp> MethodForParent4(Sharp param)  
    {  
        return new Contra<Sharp>(MethodForParent1);  
    }  
    public static Contra<Rectange> MethodForChild4(Rectange param)  
    {  
        return new Contra<Rectange>(MethodForChild1);  
    }
```

推广到一般的泛型委托：

```csharp
    public delegate T1 MyDelegate4<T1,T2,T3>(T2 param1,T3 param2);
```

可能三个参数T1，T2，T3会有各自的抗变和协变，如：

```csharp
    public delegate T1 MyDelegate4<out T1,in T2,in T3>(T2 param1,T3 param2);
```

这是一种最理想的情况，T1支持协变，用于方法返回值；T2，T3支持抗变，用于方法参数。

但是如果变成：

```csharp
    public delegate T1 MyDelegate4<in T1,out T2,in T3>(T2 param1,T3 param2);
```

那么对应的T1，T2类型参数就会出问题，原因上面都已经分析过了。于是就需要修改T1对应的方法返回类型，T2对应的方法参数类型，如何修改？只要根据上面提到的： 1）方法返回类型的协变-抗变一致原则； 2）方法参数类型的协变-抗变互换原则！

对应本篇的例子，就可以修改成：

```csharp
    public delegate Contra<T1> MyDelegate4<in T1, out T2, in T3>(Contra<T2> param1, T3 param2);
```