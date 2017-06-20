- 字符
   * Ascii 最早的只有英文和数字的编码

   * Unicode，统一所有语言的编码，但比较大不便于传输

   * utf-8，方便传输和更小的编码
    一般工作流程是
    ![proess](http://www.liaoxuefeng.com/files/attachments/001387245992536e2ba28125cf04f5c8985dbc94a02245e000/0)
  * 字符拼接，类似c语言
  `print（‘this is my grade %s’ % grade）`

    需要注意的是%转义`%%`,同是连接符号不是+，而是%

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

  * set 不可重复的序列，和dict相比没有value

  可以交、并操作
  ```
   >>> s1 = set([1, 2, 3])
   >>> s2 = set([2, 3, 4])
   >>> s1 & s2
   {2, 3}
   >>> s1 | s2
   {1, 2, 3, 4}
  ```
- 条件判断，if-else-elif,注意***不是elseif***
- 循环
   * for .. x 
   * while 
   * break 跳出循环
   * continue 结束本轮循环，开始下一轮



