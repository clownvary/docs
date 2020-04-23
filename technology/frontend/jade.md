# Jade

> 一定要注意每行的对其和缩进，由此会生成对应的节点，不然有可能出错

- 如果不指定具体的html标签，默认是div

```html
#name
输出
<div id="name">
div#foo.bar.baz
转换为 <div id="foo" class="bar baz"></div>
```

- p 文本,大段的文本用`.`换行追加

```html
p.
  sdsd
  sdsd
  sdssd

```

- 特殊字符转义

```html
p \#{something}
它会输出 <p>#{something}</p>
```

- 单行注释`//xxxxx`,多行注释，把要注释的段缩进在`//`之内就行
- 条件语句最好加上括号，避免出错
- 继承，前置，追加

 这三个功能都需要从别的文件引入，比较容易搞混，区别如下
 1. 继承，前置关键字 **block/extends**，包含是 **include**
 2. 包含只是包含了一个文件内的文本而已，可以是任何东西，继承和前置必须是jade模板
 3. 实例
- 继承

 ```html
 //common.jade
 block head
    <script src='1'></script>
//inherit.jade
extends ./common.jade

html
  block head
   <script src='2'></script>

 ```

 最终渲染如下

 ```html
 <html>
 <script src='2'></script>
 //子类实现,覆写了 <script src='1'></script>
 </html>
 ```

- 前置

 ```html
 //conmon.jade
 block head
    <script src='1'></script>

//inherit.jade
extends ./common.jade
html
  append head
   <script src='2'></script>
 ```

  最终渲染如下

 ```html
 <html>
 <script src='1'></script>//父类的追加
 <script src='2'></script>//自己的实现,不会覆写父类
 </html>
 ```

- 包含

 ```html
 //common.jade
 i am from common

//inherit.jade
html
  include common.jade
 ```

 最终渲染

 ```html
 <html>
 i am from common
 </html>
 ```

- mixin,调用时前面要用+号

```html
mixin pets(pets)
  ul.pets
    - each pet in pets
      li= pet
//调用
-var petsx=['dog','cat']
+pets(petsx) //这样调用，官网出错
```