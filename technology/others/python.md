
# Python笔记

## 字符

* Ascii 最早的只有英文和数字的编码

* Unicode，统一所有语言的编码，但比较大不便于传输

* utf-8，方便传输和更小的编码
 一般工作流程是
 ![proess](http://www.liaoxuefeng.com/files/attachments/001387245992536e2ba28125cf04f5c8985dbc94a02245e000/0)
 字符拼接，类似c语言
print（‘this is my grade %s’ % grade）`

 需要注意的是%转义`%%`,同是也可以使用连接字符+,或者使用多个逗号分隔输出

## 语法

* 字符前加'r',表示需要原始字符
  `name = r"Newlines are indicated by \n"`, 回车会原样输出

* 布尔值，and or not, '==','! ='
* 空值，None

* list、tuple、dict、set

  ```python
   list=['jack','tom','mary']
   list.insert(2,'david')
   list.pop(2)
  ```

  tuple，不可变数列，***是只指向内容不可变，并不是说内容的内容也不可变***

  ```python
    >>> t = ('a', 'b', ['A', 'B'])//注意和list的不同就在于***使用括号包裹***
    >>> t[2][0] = 'X'
    >>> t[2][1] = 'Y'
    >>> t
   ('a', 'b', ['X', 'Y'])//变得是内部的list,tuple的指向位置并没有变，除非内部的内容也是tuple的
  ```

  tuple只有一个元素时

  ```python
    t=(1,)//加一个逗号来消除歧义
  ```

* dict 字典

  ```python
  d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}

  get：d.get('Bob')/d['Bob'],没有d.Bob这种方式

  set：d['new']='new'

  delete: d.pop('Bob')

  clear: d.clear()
  ```

* set 不可重复的序列，和dict相比没有value,y=set('google')//y 为['e', 'o', 'g', 'l']

  可以交、并操作

  ```python
   >>> s1 = set([1, 2, 3])
   >>> s2 = set([2, 3, 4])
   >>> s1 & s2
   {2, 3}
   >>> s1 | s2
   {1, 2, 3, 4}
  ```

* collestions 模块

  1. namedtuple,可以自定义tuple名称和属性

    ```python
    from collestions import namedtuple
    Point = namedtuple('Point',['x','y'])
    p =Point(1,2)
    p.x
    p.y
    ```
  2. defaultdict,设置没有某个键值时默认值，使  会抛出keyerror错  

  3. Counter 计数器

    ```python
      >>> c = Counter("abcdefgab")
      >>> c["a"]
      2
      >>> c["c"]
      1
      >>> c["h"]
      0
    ```
* 条件判断，if-else-elif,注意***不是elseif***
* 循环
   * for ..in x
   * while
   * break 跳出循环
   * continue 结束本轮循环，开始下一轮
* pass 占位符，啥都不做
* string
  1. `*`,重复输出字符串，‘hello*2’=>hellohello
  2. `[:]`,截取字符串，‘hello[1:2]’,截取1到2的字符
    * 逆向截取 `'hello'[-1]` >>> o
    * reverse `'hello'[::-1]` >>> olleh
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
* 元组[参考这个](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/Day07/%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%92%8C%E5%B8%B8%E7%94%A8%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.md)
  1. 不允许删除，但可以删除整个元组，`del tup`
* 字典
  1. dict.items()/keys()/values(),返回对应的值和键，可以遍历
  2. dict.pop([key]),删除某个item
* datetime/time,一般使用datetime模块即可
  1. 日期获取和转换
     ```python
     import time;
     curtime = time.localtime(time.time());
     print(time.strftime("%Y-%m-%d %H:%M:%S",curtime));

     ```
  2. 使用datetime,注意datetime下面还有一个datetime的类，如果没有指定导出则应该再访问一层
    ```python
    from datetime import timedelta 
    datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")；
    datetime.now() + timedelta(hours=10)//加10小时
    datetime.now() + timedelta(days=-1)//减去1天
    ```
* 函数
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

     ```python
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
    * 如果要导入的自定义模块和程序文件不在一个目录，需要追加sys.path，这样才能找到[看这个](https://www.cnblogs.com/Sumomo0516/p/6010575.html)

    ```python
    moduleA
      __init__.py
      Person.py
    moduleB
      main.py

    # 此时main.py要导入Person需要如下设置
    # main.py
    import os, sys
    sys.path.append(os.path.abspath(''))
    import moduleA.Person

    ```

  5. 返回多个值

    ```python
    def get_args():
      return (1,3)
    a,b = get_args()
    ```

* IO
  1. input，接收用户输入,可以接收一个表达式

    ```python
      str = input("请输入：");
      print "你输入的内容是: ", str
    ```
  2. 读写文件都用with 语句

    ```python
      with open('/Users/michael/test.txt', 'w') as f:
      f.write('Hello, world!')
    ```
  3. stringIO,BytesIO和文件IO不同的是，这个两者都是从内容中读写内容，而不是从文件中

* 异常
  1. 捕获语句,*不是catch*,
    ```python
    try:
    xxx;
    except (IOError,ValueError)://只捕获这两种异常类型;
    except :// 不带异常类型则捕获所有的异常
    except ValueType as arg:// 带参数的异常，arg是*这个*异常类型的对应实例参数 
    xxx
    except Exception as arg:// 带参数的异常，arg是*所有*异常类型的对应实例参数 
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
* `if __name__=='__main__'`，意思是如果直接执行改模块则__name__是__main__,如果是被导入到别的模块再执行，__name__就是模块名

* docstring,函数，类，模块都应该包含docstring,说明做了什么返回什么，都用`三引号`，方便换行
* 命名规范，变量

  1. 方法都是小写，没有驼峰，可以使用下划线类
  2. 类首字母大写，常量大写

* 内置全局方法
  * setattr()/getattr()/delattr()/hasattr

  * bin()/oct()/hex(),10进制数转换成2进制/8进制/16进制

  * id(）返回对象内存地址

  * hash()

  * dir()返回模块内部的所有方法、变量、属性

  * var()返回模块内部的所有属性

  * any/all,前者是判断可迭代对象中有*任意一个不为空或者false则返回true*,后者是*所有的都不为空或false,才返回true*

  * filter/map/reduce,和一般的差不多，*唯一不同是调用方式，第一个参数是操作函数，第二个才是可迭代对象*

  * format,格式化字符
      ```python
      site = {"name": "菜鸟教程", "url": "www.runoob.com"}
      print("网站名：{name}, 地址 {url}".format(**site))
      ```
  * sum([0,1,2]) //对迭代对象求和

  * unichr()/chr(),返回编码对应的unicode*字符/字符号（不是编码）*

  * ord()//返回字符的asiic码或者unicode码

  * zip()//拉链函数，组合成一个可遍历对象
     ```python
      >>>a = [1,2,3]
      >>> b = [4,5,6]
      >>> list(zip(a,b))//python3中要加list函数才能显示
      >>> [(1, 4), (2, 5), (3, 6)]
    ```
* 函数式编程
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
  3. 装饰器，类似redux中的中间件[参考](https://github.com/clownvary/learn-practise/blob/gh-pages/pty/demo/decorator.py)
    ```python
     import functools;
      def logtext(text):
          def log(func):
              @functools.wraps(func)//加上这个相当于执行了wrapper.__name__ = func.__name__，不然pnow的__name__指向会是wrapper[参考](https://www.zhihu.com/question/46808546/answer/102887411)
              def wrapper(*param):
                  print(text,func.__name__);
                  func(*param);
              return wrapper;
          return log;
     @logtext('this is test')// 相当于执行了pnow=logtext('this is test')(pnow);,@xxx,是python语法
     //此时的pnow就指向了新的包装过的函数，如果直接调用pnow()相当于调用logtext('this is test')(pnow)(),就会执行内部程序，
     //也可以手动logtext('this is test')(pnow)()，结果是一样的
     def pnow():
         print('2015-6-7');
     pnow();

     //修饰带参数的函数
     def works_for_all(func):
        def inner(*args, **kwargs):
           print("I can decorate any function")
           return func(*args, **kwargs)
     return inner

     @works_for_all
     def divide(a,b):
        ...
    ```
  4. 偏函数，就是把某个函数的某个参数给固定住，返回一个新的函数，这样调用起来比较方便
    ```python
      int('123',base=8);
      //使用偏函数
      import functools;
      int8=functools.partial(int,base=8);
      int8('123');//直接调用这样
    ```
* 面向对象编程
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
        @classmethod   //类方法,第一个参数是类本身，调用时直接person.getClassName()
        def getClassName(cls):
        @staticmethod   //静态方法，调用时直接person.getClassName()
        def getClassName():
            ....
    ```
  4. private变量`__xxx`,表示只能在类内部使用self.xxx访问，protected变量`_xxx`,只允许内部和子类访问,`__init__`,类似这样的是特殊方法,这只是从语法层面进行的一种约定限制，如果知道约定直接访问也可以访问得到
  5. 判断类型
    * ~~import types, types.FunctionType....,判断函数等复杂类型~~
    * 基本类型，if 123==int...
    * ==,is 前者比较内容，后者比较Id(内存地址)
    * isinstance(d, Dog)
    * hasattr(methodA,'__call__')判断是否是函数类型

    ```py
    if(type(1)==type(3))
    if(isinstance(1,int))
    ```
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
      print(Week.Mon.name);
      print(Week.Mon.value);
    ```
* 进程
  1. os.fork(),和一般函数不同，它调用一次返回两次，分别在*父进程和子进程分别返回*

    > 该方法只能用在unix系统下 子进程返回0，父进程返回子进程的pid,子进程只需要调用getppid()就可以拿到父进程的ID。multiprocessing 包可以跨平台

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

* 正则表达式
  1. 以r开头，消除歧义 s = r'ABC\-001' # Python的字符串
* hashlib,常用的hash和sha1等hash算法

    ```python
      import hashlib
      md5 = hashlib.md5()
      md5.update('how to use md5 in python hashlib?'.encode('utf-8'))
      print(md5.hexdigest())
    ```
* 异步IO 
    async/await
    ```python
    import asyncio
    async def hello():
      print("Hello world!")
      r = await asyncio.sleep(1)
      print("Hello again!")
    ```
* CMD(shell)

  * 执行shell脚本使用 Subprocess 模块,[参考](https://www.cnblogs.com/breezey/p/6673901.html)
    * call
    * check_call
    * check_output
* Time [参考](http://www.runoob.com/python/python-date-time.html)

  ```python
  print('timestamp',time.time())
  tuple_time = time.localtime(time.time())
  print('time tuple',tuple_time)
  print('time.strftime',time.strftime('%Y%m%d-%H%M%S',tuple_time))
  ```

* sys.args, 获取参数

  ```python
  import sys, getopt
  arg = sys.argv;
  opts, args = getopt.getopt(arg[1:],'hi:o:',['version=']) //'i: 代表后面是有值的'

  for op,value in opts:
      if op == "-i":
         print('-i',value)
      elif op == "-o":
         print('-o',value)
      elif op == "-h":
         print('-h',value)
      elif op in '--version':
          print('version',value)

  >> python3 xx.py -h -i a.file --version=1.2
  ```
* 列表推倒

  ```python
  listone = [2, 3, 4]
  listtwo = [2*i for i in listone if i > 2] #满足大于2条件时，执行前边的语句
  print(listtwo)
  ```

## 常用库

* [getopt](https://www.jianshu.com/p/a877e5b46b2d)获取命令行参数
* [subprocess](https://www.cnblogs.com/yyds/p/7288916.html)子进程command
* [多版本管理-pyenv-virtualenv](https://www.jianshu.com/p/a877e5b46b2d)或者终极方案[pipenv](https://www.jianshu.com/p/00af447f0005)
* [chardet](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001510905171877ca6fdf08614e446e835ea5d9bce75cf5000)字符编码检测

## 使用注意

> pyenv python的版本管理器 pipenv python中用的包的版本管理器，两个不一样, pyenv+viatualenv插件相当于既有了python的环境管理，也有了第三方包的管理
当使用pyenv进入虚拟环境比如3.8.8时，就在可以不用输入python3 xxx,执行命令，直接输入python就是当前的解释器版本


### pipenv 使用流程 （不推荐使用了）

  1. `cd project`
  2. `pipenv --python 3.x | pipenv --python 2.xx` 这样就创建了一个虚拟的开发环境，如果不使用此命令默认创建基于当前的python版本的环境
  3. `pipenv shell` 激活虚拟环境的shell,不激活的话还是相当于在系统默认的环境下去操作，安装的包在全局，
  4. `pipenv install xxx --dev` 这样这个模块就被安装在了虚拟环境中，和全局的就没有冲突，程序执行时也会从虚拟环境下去寻找
  5. `python index.py` (或者不进入shell,在外层执行 `pipenv run python index.py`)执行具体的脚本或命令
  6. `exit` 退出虚拟环境
  > 可以做一个实验，在虚拟环境下装的包在pipenv shell之后可以正常导入，但一旦退出运行就会报错

### pyenv + viratualenv插件 (不推荐使用了)

- 概念阐述
在开发Python应用程序的时候，系统安装的Python只有一个版本：如3.4。**所有第三方**的包都会被pip安装到Python的**site-packages**目录下。
如果我们要同时开发多个应用程序，那这些应用程序都会共用一个Python，就是安装在系统的Python。如果应用A需要jinja 2.7，而应用B需要jinja 2.6怎么办？
这种情况下，每个应用可能需要各自拥有一套“独立”的Python运行环境。pyenv(配合virtualenv 插件）就是用来为一个应用创建一套“隔离”的Python运行环境。

-  使用

1. 安装pyenv 和virtualenv 插件 [参考](https://www.jianshu.com/p/20cd2fc914c1)[win](https://www.jianshu.com/p/8aaf2525fa80)
2. 确定版本
  ```shell  
    # 1. 查看正在使用的python版本
    $ pyenv version 
      system (set by /usr/local/var/pyenv/version)

    # 2. 查看系统支持的python版本
    $ pyenv versions

    # 3. 查看系统支持的python版本 （如果系统目前的版本里没有你想要的，可以参考列表安装)
    $ pyenv install -l

    # 4. 安装指定版本的pyton
    $ pyenv install 3.6.0

    # 5. pyenv local 设置当前目录使用的python版本
    $ mkdir py3   && cd py3  && pyenv local 3.6.0
    
    # 验证：
    # MacBookPro in /tmp/py3 
    $ python -V
    Python 3.6.0
    
    # MacBookPro in /tmp/py3 
    $ cd
    
    $ python -V
    Python 2.7.10
    
    # 6. 全局切换python版本
    $ pyenv global 3.6.0 （pyenv versions 可查看能使用的版本）
  ```

3. 创建虚拟环境

  ```shell
    # 1. 创建虚拟环境
  $ pyenv virtualenv 3.6.0 py360  (基于3.6.0 别名叫py360)
  
  # 2. 进入环境
  $  pyenv activate py360
   之后就可以在这里安装各种依赖和包，完全独立的
  
  # 验证：
  $ python -V
  Python 3.6.0
  (py360)
  
  # 3. 退出环境
  $ pyenv deactivate py360
  
  # 4. 查看系统python环境
  $ pyenv versions
  * system (set by /usr/local/var/pyenv/version)
    3.6.0
    3.6.0/envs/py360
    py360  别名显示在第二行
    
  # 5. 删除环境
  $ pyenv virtualenv-delete py360
  ```


### anaconda 推荐使用

> 注意安装包时因为使用国内的镜像，需要关闭vpn代理，否则会有奇怪错误抛出
包管理器/ python环境管理器 /跨平台非python语言包管理器/gui图形界面

几点概念：
1. 环境：一个环境就是一个python 版本对应的整个环境，如python 3.8可以有一个环境，3.9可以有一个
2. 包管理： 不同环境的包相互独立，如3.8环境的conda install之后都是在这个环境里
3. 安装.whl文件  切换到对应环境后 `pip install --no-deps D:\download\torch-1.11.0+cu115-cp38-cp38-win_amd64.whl`

基本使用：

创建环境：`conda create -n py38 python=3.8`

查看环境：`conda info -e`

激活环境：`conda activate py38`

推出环境：`conda deactivate py38`



## 代码美化

[fomatter black](https://stackoverflow.com/questions/65101442/formatter-black-is-not-working-on-my-vscode-but-why)


## 其他

* [练习demo](https://github.com/clownvary/learn-practise/blob/gh-pages/pyt/hello.py)
