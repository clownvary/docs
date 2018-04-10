[练习demo](https://github.com/clownvary/learn-practise/blob/gh-pages/python/hello.py)
- 字符
   * Ascii 最早的只有英文和数字的编码

   * Unicode，统一所有语言的编码，但比较大不便于传输

   * utf-8，方便传输和更小的编码
    一般工作流程是
    ![proess](http://www.liaoxuefeng.com/files/attachments/001387245992536e2ba28125cf04f5c8985dbc94a02245e000/0)
  * 字符拼接，类似c语言
  `print（‘this is my grade %s’ % grade）`

    需要注意的是%转义`%%`,同是也可以使用连接字符+,或者使用多个逗号分隔输出
- 字符前加'r',表示需要原始字符
  `name = r"Newlines are indicated by \n"`, 回车会原样输出

- 布尔值，and or not,没有‘!’这种表示
- 空值，None

- list、tuple、dict、set

  ```
   list=['jack','tom','mary']
   list.insert(2,'david')
   list.pop(2)
  ```
  tuple，不可变数列，***是只指向内容不可变，并不是说内容的内容也不可变***

  ```
    >>> t = ('a', 'b', ['A', 'B'])//注意和list的不同就在于***使用括号包裹***
    >>> t[2][0] = 'X'
    >>> t[2][1] = 'Y'
    >>> t
   ('a', 'b', ['X', 'Y'])//变得是内部的list,tuple的指向位置并没有变，除非内部的内容也是tuple的
  ```
  tuple只有一个元素时
  ```
    t=(1,)//加一个逗号来消除歧义
  ```
  * dict 字典

  d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}

  get：d.get('Bob')/d['Bob'],没有d.Bob这种方式

  set：d['new']='new'

  delete: d.pop('Bob')

  clear: d.clear()

  * set 不可重复的序列，和dict相比没有value,y=set('google')//y 为['e', 'o', 'g', 'l']
  
  可以交、并操作
  ```
   >>> s1 = set([1, 2, 3])
   >>> s2 = set([2, 3, 4])
   >>> s1 & s2
   {2, 3}
   >>> s1 | s2
   {1, 2, 3, 4}
  ```
  * collestions 模块
    1. namedtuple,可以自定义tuple名称和属性并靠属性索引
      ```python
      from collestions import namedtuple
      Point = namedtuple('Point',['x','y'])
      p =Point(1,2)
      p.x
      p.y
      ```
    2.defaultdict,设置没有某个键值时默认值，使其不会抛出keyerror错误
    3. Counter 计数器
      ```
        >>> c = Counter("abcdefgab")
        >>> c["a"]
        2
        >>> c["c"]
        1
        >>> c["h"]
        0
      ```
- 条件判断，if-else-elif,注意***不是elseif***
- 循环
   * for .. x 
   * while 
   * break 跳出循环
   * continue 结束本轮循环，开始下一轮
- pass 占位符，啥都不做
- string 
  1. `*`,重复输出字符串，‘hello*2’=>hellohello
  2. `[:]`,截取字符串，‘hello[1:2]’,截取1到2的字符
  3. `in`/`not in`,是否存在字符串 `h in "hello"`,返回布尔值
  4. `‘’‘` 三引号，用来连接复杂字符
    ```Html
    html = 
    '''
      <HTML><HEAD><TITLE>
      Friends CGI Demo</TITLE></HEAD>
      <BODY><H3>ERROR</H3>
      <B>%s</B><P>
      <FORM><INPUT TYPE=button VALUE=Back
      ONCLICK="window.history.back()"></FORM>
      </BODY></HTML>
    '''
    ```
- 元组
  1. 不允许删除，但可以删除整个元组，`del tup`
- 字典
  1. dict.items()/keys()/values(),返回对应的值和键，可以遍历
  2. dict.pop([key]),删除某个item
- datetime/time,一般使用datetime模块即可
  1. 日期获取和转换
     ```python
     import time;
     curtime = time.localtime(time.time());
     print(time.strftime("%Y-%m-%d %H:%M:%S",curtime));

     ``` 
  2. 使用datetime,注意datetime下面还有一个datetime的类，如果没有指定导出则应该再访问一层
    ```python
    import timedelta from datetime
    datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")；
    datetime.now() + timedelta(hours=10)//加10小时
    datetime.now() + timedelta(days=-1)//减去1天
    ```
- 函数
  1. 参数
    ```python
    def printX(str,str2):
      print(str+str2);

    printX('1','2');//必备参数
    printX(str2='1',str1='2');//关键字参数，顺序可以不一样

    def printX(str,str2,age=32)://缺省参数，如果不传则使用默认的
    def printX(str,str2,*last)://不定长参数，last表示后面所有的参数
    def printX(str,str2,**lastKey)://不定长参数，last表示后面所有的关键字参数，形如printX(1,2,name='test',age='20'),lastKey 即为{name:'test',age:20}
    ```
  2. 匿名函数（lambda）,只能编写简单函数
    lambda [arg1 [,arg2,.....argn]]:expression
     ```
     # 可写函数说明
     sum = lambda arg1, arg2: arg1 + arg2;//类似箭头函数
     sum(1,2);
     ```
    列表生成式 `[x * x for x in range(1, 11)]`,快速生成一个列表
  3. 全局变量/局部变量
     函数体外面定义的就是全局变量，但要注意的是*内部使用全局变量的时候要加global 关键字声明，不然不能使用*
     ```python
     globvar = 0

     def set_globvar_to_one():
         global globvar    # 使用 global 声明全局变量
         globvar = 1
     ```

  4. 模块导入
     import datetime/from datetime import time(只导入time部分) as xxx，*注意语法问题from在前*
     包
     需要有一个__init__.py的文件表示是一个包，这个文件夹下可以有不同的py文件，import的时候就可以指定部分导入
     *可以使用as别名*
     **可以直接导入包**，但默认还是要导出具体的包内模块名，否则使用不了，不像java导入后可以直接package.xx.xxx,
     但可以有个变通的方法就是把具体的导入模块名写在对应的__init__.py文件中,如下
     ```python
     print "__init__"

      from pet import name as pet_name, run as pet_run
      #from animal.pet import name as pet_name, run as pet_run 
      #from .pet import name as pet_name, run as pet_run 
     ```

     `dir（xx）`,返回一个模块里定义的所有模块，变量和函数

- IO
  1. input，接收用户输入,可以接收一个表达式
    ```
      str = input("请输入：");
      print "你输入的内容是: ", str
    ```
  2. 读写文件都用with 语句
    ```
      with open('/Users/michael/test.txt', 'w') as f:
      f.write('Hello, world!')
    ```
  3. stringIO,BytesIO和文件IO不同的是，这个两者都是从内容中读写内容，而不是从文件中
- 异常
  1. 捕获语句,*不是catch*,
    ```python
     try:
     xxx;
     except (IOError,ValueError)://只捕获这两种异常类型;
     except :// 不带异常类型则捕获所有的异常
     except ValueType as arg:// 带参数的异常，arg是这个异常类型的对应实例参数 
     xxx
     finally:
     xxx     
    ```
  2. 触发异常，`raise`，相当于throw
  3. assert 断言处理异常
      ```python
        try:
         assert 1==2,'this is error';//如果为假就抛出错误
         except AssertionError as e:
          print(e);
      ```
- `if __name__=='__main__'`，意思是如果直接执行改模块则__name__是__main__,如果是被导入到别的模块再执行，__name__就是模块名

- docstring,函数，类，模块都应该包含docstring,说明做了什么返回什么，都用`三引号`，方便换行
- 命名规范，变量

  1. 方法都是小写，没有驼峰，可以使用下划线类
  2. 类首字母大写，常量大写

- 内置全局方法
  1. setattr()/getattr()/delattr()/hasattr
     
     bin()/oct()/hex(),10进制数转换成2进制/8进制/16进制
  
     id(）返回对象内存地址

     hash()

     dir()返回模块内部的所有方法、变量、属性

     var()返回模块内部的所有属性

     any/all,前者是判断可迭代对象中有*任意一个不为空或者false则返回true*,后者是*所有的都不为空或false,才返回true*

     filter/map/reduce,和一般的差不多，*唯一不同是调用方式，第一个参数是操作函数，第二个才是可迭代对象*

     format,格式化字符
      ```
      site = {"name": "菜鸟教程", "url": "www.runoob.com"}
      print("网站名：{name}, 地址 {url}".format(**site))
      ```
     sum([0,1,2]) //对迭代对象求和

     unichr()/chr(),返回编码对应的unicode*字符/字符号（不是编码）*

     ord()//返回字符的asiic码或者unicode码

     zip()//拉链函数，组合成一个可遍历对象
     ```
      >>>a = [1,2,3]
      >>> b = [4,5,6]
      >>> list(zip(a,b))//python3中要加list函数才能显示
      >>> [(1, 4), (2, 5), (3, 6)]
    ```
- 函数式编程
  1. 高阶函数，把函数当成变量传入
  2. 返回函数，函数当成结果返回，返回函数中不要引用任何可能会变化的变量
    ```python
      def lazy_sum(*args):
        def sum():
            ax = 0
            for n in args:
                ax = ax + n
            return ax
      return sum;
    lazy_sum(1,2,3)();//这样调用
    ```
  3. 装饰器，类似redux中的中间件
    ```python
     import functools;
      def logtext(text):
          def log(func):
              @functools.wraps(func)//加上这个相当于执行了wrapper.__name__ = func.__name__，不然pnow的__name__指向会是wrapper
              def wrapper(*param):
                  print(text,func.__name__);
                  func(*param);
              return wrapper;
          return log;
     @logtext('this is test')// 相当于执行了pnow=logtext('this is test')(pnow);
     //此时的pnow就指向了新的包装过的函数，如果直接调用pnow()相当于调用logtext('this is test')(pnow)(),就会执行内部程序，
     //也可以手动logtext('this is test')(pnow)()，结果是一样的
     def pnow():
         print('2015-6-7');
     
     pnow();
    ```
  4. 偏函数，就是把某个函数的某个参数给固定住，返回一个新的函数，这样调用起来比较方便
    ```python
      int('123',base=8);
      //使用偏函数
      import functools;
      int8=functools.partial(int,base=8);
      int8('123');//直接调用这样
    ```
- 面向对象编程
  1. 实例化没有new关键字，子类同名方法会覆写父类
  2. 类方法都有self参数，一般调用也不用传入，类似js中的this,代表实例。
  3. 继承`class C(A, B):   # 继承类 A 和 B`,注意*初始化时得手动调用父类的初始化方法*，*调用父类方法得加上self参数*
    ```python
      class person:
    
       def __init__(self,age):
           self.__age=age;//使用私有变量更加健壮
       def getAge(self):
           return self.__age;

     class men(person):
         def __init__(self,sex):
             person.__init__(self,11);//手动调用父类初始化方法
             self.sex=sex;
         def getSex(self):
             print(person.getAge(self));//调用父类方法得加上self参数
             return self.sex;
    ```
  4. private变量`__xxx`,表示只能在类内部使用self.xxx访问，protected变量`_xxx`,只允许内部和子类访问,`__init__`,类似这样的是特殊方法
  5. 判断类型
    - import types, types.FunctionType....,判断函数等复杂类型
    - 基本类型，if 123==int...
    - isinstance(d, Dog)
  6. __slots__类属性，定义之后可以在实例上动态的添加定义过的属性
    ```python
      class person:
        __slots__=('name','age');# 用tuple定义允许绑定的属性名称

      a=person();
      a.name='gary';
      a.age=20;
      a.score=21;//出错，因为没定义过
    ```
  7. @property,属性装饰器,注意访问形式，是x.birth//x.birth=120;不是以方法的形式
    ```python
      class Student(object):

       @property//代表可读，它会创造一个对应的birth.setter
       def birth(self):
           return self._birth

       @birth.setter
       def birth(self, value):
           self._birth = value   

       @property//只读，不可写
       def age(self):
           return 2015 - self._birth
    ```
  8. 枚举类，
    ```python
      from enum import Enum,unique;
      @unique
      class Week(Enum):
          Mon=0
          Thu=1;
          Whe=2;
          Thr=3;
          Fri=4;
      print(Week.Mon);
    ```
- 进程
  1. os.fork(),和一般函数不同，它调用一次返回两次，分别在*父进程和子进程分别返回* 
    > 该方法只能用在unix系统下
      子进程返回0，父进程返回子进程的pid,子进程只需要调用getppid()就可以拿到父进程的ID。
    multiprocessing 包可以跨平台
    > 跨平台
    ```python
      from multiprocessing import Process
      import os
      
      # 子进程要执行的代码
      def run_proc(name):
          print('Run child process %s (%s)...' % (name, os.getpid()))
      
      if __name__=='__main__':
          print('Parent process %s.' % os.getpid())
          p = Process(target=run_proc, args=('test',))
          print('Child process will start.')
          p.start()
          p.join()
          print('Child process end.')
    ```
  2. 分布式进程，*[看demo文件](https://github.com/clownvary/learn-practise/tree/gh-pages/python/manager)*
- 正则表达式 
  1. 以r开头，消除歧义 s = r'ABC\-001' # Python的字符串
- hashlib,常用的hash和sha1等hash算法

    ```python
      import hashlib
      md5 = hashlib.md5()
      md5.update('how to use md5 in python hashlib?'.encode('utf-8'))
      print(md5.hexdigest())
    ```
- 
- 异步IO 
    async/await
    ```python
    import asyncio
    async def hello():
      print("Hello world!")
      r = await asyncio.sleep(1)
      print("Hello again!")
    ```
