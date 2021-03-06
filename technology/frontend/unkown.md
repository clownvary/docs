# 前端知识补漏

- [JS](#JS)

- [Npm](#npm)

- [浏览器缓存](#浏览器缓存)

- [Css](#css)

- [Web Api](#web-api)

- [webpack](#webpack)

- [Others](#others)

## JS

* 变量赋值，数值型、引用型

[参考](https://stackoverflow.com/a/25117245)

- 变量是存储在内存中的一块区域
- 重新赋值给一个变量会重新指向一个新区域
- 重新赋值给一个变量不会影响指向同一区域的其他变量
- func内的餐宿和变量赋值同名时，如下demo1,可以想象成param1就是一个内部变量，`var param1 = myString`

demo1

```js
function myFunc(param1) {
    param1 = 'world'; // param1相当于只是个内部私有变量，给它的赋值不会影响外部变量的结果

    console.log(param1);   // Logs 'world'
}

var myString = 'hello';
// Calls myFunc and assigns param1 to myString just like param1 = myString
myFunc(myString);

console.log(myString); // logs 'hello'
```

demo2

```js
function myFunc(otherObj) {

    // Let's mutate our object
    otherObj.firstName = 'Sue'; // 不是reassign, 所以会改变存储区域里的值
    console.log(otherObj.firstName); // Logs 'Sue'

    // Now let's re-assign
    otherObj = {
        firstName: 'Jack',
        lastName: 'Frost'
    }; // 是reassign, 所以otherObj得值变了，但不会影响其他指向原区域的变量
    console.log(otherObj.firstName); // Logs 'Jack'

    // Again, otherObj and myObject are assigned to 2 very different objects
    // And mutating one object doesn't magically mutate the other
}

var myObject = {
    firstName: 'Joe',
    lastName: 'Smith'
};

// Calls myFunc and assigns otherObj to myObject just like otherObj = myObject
myFunc(myObject);

console.log(myObject.firstName); // Logs 'Sue', 因为在内部已经改变了存储区域的值，所以是Sue
```

* es6 解构赋值（destructure）设置默认值
  
  在使用 `const { a } = obj`时一般没有什么问题， 但是如果我们想得到a下的b,`const { a :{b}} = obj`,这样写时，在a不存在或者undefined的时候就会报错，block住程序的执行，可以给a设置默认值来避免报错，如下：
  
  `const { a: { b } = {b:'this is test'}} = obj`
  
  或者
  
  `const { a: { b } = {}} = obj`

* export/export default
  
  ```javascript
  // export.js
  export const func1=()=>{xxx}
  export {  // 和直接export 一样，可以通过{...}导入
      func2 :()=>{xxx}
  }
  const m = 100;
  export default {
      m
  }
  
  //import.js 
  import { func1 } from './export.js';
  import { func2 } from './export.js';
  import { m } from './export.js'; // undefined,这种导入方式会找不到,本质上default是把相关的变量挂在了名为default的属性上，所以以下两种方式可导入：
  import {default as x } from './export.js';
  import x from './export.js';
  x.m //ok
  ```

* 事件循环机制、调用栈、调用队列
  
  - 调用栈、调用队列（可视图）[参考](https://github.com/xitu/gold-miner/blob/master/TODO/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with.md)
    [参考2](https://www.jianshu.com/p/12b9f73c5a4f)
  
  > macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。 
  >   micro-task包括：process.nextTick（就是then,或者catch）, Promises, Object.observe, MutationObserver 
  >   **执行顺序**：函数调用栈清空只剩全局执行上下文，然后开始执行*所有*的micro-task。当**所有可执行**的micro-task执行完毕之后。循环再次执行macro-task中的**一种**任务队列（可能有settimeout队列，settimmediate队列，指的是执行完其中的一种全部队列，不是一种队列中的一个），执行完之后再执行**所有的micro-task**，就这样一直循环
  
    **new Promise()内的代码是立即执行, nextTick 和 promise then的是单独的队列，且nextTick比then队列先执行**
  
  1. 当调用栈中的代码都执行完毕后再把任务队列中的压入调用栈，然后执行。[参考](https://blog.csdn.net/qq_31628337/article/details/71056294) 
     
     ```js
     console.log(1);
     setTimeout(function(){console.log(2);}, 0);
     console.log(3);
     //输出1，3, 2
     ```
     
     `settimeout（xx,0)`，就是要把该函数块放入队列，等待其他的调用栈中的都执行完毕，再去把任务队列中的压入调用栈，然后再执行**调用栈**中的代码
  
  2. 经典例子
     
     ```js
      // demo02
     console.log('golb1');
     
     setTimeout(function() {
       console.log('timeout1');
       process.nextTick(function() {
           console.log('timeout1_nextTick');
       })
       new Promise(function(resolve) {
           console.log('timeout1_promise');
           resolve();
       }).then(function() {
           console.log('timeout1_then')
       })
     })
     
     setImmediate(function() {
       console.log('immediate1');
       process.nextTick(function() {
           console.log('immediate1_nextTick');
       })
       new Promise(function(resolve) {
           console.log('immediate1_promise');
           resolve();
       }).then(function() {
           console.log('immediate1_then')
       })
     })
     
     process.nextTick(function() {
       console.log('glob1_nextTick');
     })
     new Promise(function(resolve) {
       console.log('glob1_promise');
       resolve();
     }).then(function() {
       console.log('glob1_then')
     })
     
     setTimeout(function() {
       console.log('timeout2');
       process.nextTick(function() {
           console.log('timeout2_nextTick');
       })
       new Promise(function(resolve) {
           console.log('timeout2_promise');
           resolve();
       }).then(function() {
           console.log('timeout2_then')
       })
     })
     
     process.nextTick(function() {
       console.log('glob2_nextTick');
     })
     new Promise(function(resolve) {
       console.log('glob2_promise');
       resolve();
     }).then(function() {
       console.log('glob2_then')
     })
     
     setImmediate(function() {
       console.log('immediate2');
       process.nextTick(function() {
           console.log('immediate2_nextTick');
       })
       new Promise(function(resolve) {
           console.log('immediate2_promise');
           resolve();
       }).then(function() {
           console.log('immediate2_then')
       })
     })
     ```
     
     ```js
      //执行第一轮宏任务队列（macro）
     golb1
     glob1_promise
     glob2_promise
     //执行第一轮微任务队列（micro）
     glob1_nextTick
     glob2_nextTick
     glob1_then
     glob2_then
     
     第一轮事件循环结束
     
     //执行第二轮宏任务中的setTimeout队列（macro）
     timeout1
     timeout1_promise
     timeout2
     timeout2_promise
     
     //执行第二轮宏任务setTimeout产生的微任务队列（micro）
     timeout1_nextTick
     timeout2_nextTick
     timeout1_then
     timeout2_then
     
     第二轮事件循环结束
     
     //执行第二轮宏任务中setImmediate队列（macro）
     immediate1
     immediate1_promise
     immediate2
     immediate2_promise
     
     //执行第二轮宏任务setImmediate产生的微任务队列（micro）
     immediate1_nextTick
     immediate2_nextTick
     immediate1_then
     immediate2_then    
     ```
- SSE(server-sent event)
  
    Html5引入的服务端发送消息机制，比socket 更加轻量，只能单向发送

- 路径动画()
  
  1. css 中使用`motion-path`.
  2. svg里的path.
  3. smil.

## npm

- 包管理逻辑
  
    1.遍历循环所有包，包括包中依赖的包
  
    2.扁平化dedupe即 deduplicated，去重
  
        a.遇到**新包**放到最外层项目树下
      
        b.遇到已有的包，判断两个版本是否在同一范围（相同，或者在可兼容的范围内）
      
         是：则选择最新的可接受的版本放在外层树下
         否：各自在自己树下生成，版本不同
  
      一般使用如下,(package.json)：
  
  ```js
  scripts:{
      "postinstall":"npm dedupe" // postinstall 是npm的一个hook会在npm install 之后自动执行，还有一些其他的hook 如prebuild，pretest......
  }  
  ```
  
  - 统一设置项目依赖的默认前缀    
  
  ```swift
  npm config set save-prefix="~" 
  ```
  
  - 运行此命令，npm会拿你的`package.json`和`node_modules`目录进行比对，然后把那些在`package.json`中没有引用到的package列出来。  
    还有那些你没有手动添加到`package.json`或者是执行`npm install $package`时没有加`--save`参数的，都会被删掉。
  
  ```undefined
  npm prune
  ```
  
  - 使用`shrinkwrap`命令会在你当前项目中生成一个`npm-shrinkwrap.json`文件。它会将你当前`package.json`中引用的依赖版本锁定，当下次执行`npm install`时，它默认安装的其实是`shrinkwrap.json`中锁定的依赖版本号。  
  
  ```undefined
  npm shrinkwrap
  ```
  
  3.按照生成的依赖树安装
  
   所以有时候外层项目并没有引用依赖一些包，但可以直接使用，就是因为内部依赖        的包的包被提取到了最外层的node_modules里
  
  - dependency/devDependency
    
     project-min install的时候安装，项目**本身的**dependency/devDependency包都会被安装，依赖的依赖下的dependency 包也会被安装，但devDependency不会安装。
    
    ```javascript
    ├── project-main
    ├── package-a (dependency)
    │   └── package-a-1 (devDependency)
    |   └── package-a-2 (dependency)
    └── package-b (devDependency)    
    ```
    
    如图package-a 和package-b , package-a-2都会被安装，但package-a-1不会安装

- dependency/devDependency 和webpack打包
  
  我们开发的应用大概分为两种:
  
  一种是正常的ui app 
  
  一种是供他人使用的libary(纯js,或者组件库)
  
  - 正常的app install自己的包，然后使用webpack打包到dist目录，这时候一般会把dist目录host起来在浏览器访问，dist就是我们最终build的目录，**直接使用即可，无需再install包**
  
  - libary 场景1:
    直接**使用babel 转义后copy到dist 目录**，比如各种组件库就是这样干的，这样就得到了一个es5的**未打包**的组件库，然后修改package.json中的main 属性，入口指向dist.  他人使用的时候**因为要先install 这个libary, 同时会自动install它的dependencies**, 直接import .. from ''即可。
  
  - libary 场景2:
    使用webpack打包，类似于app, 然后修改package.json中的main 属性， 入口指向dist.他人使用的时候直接import .. from ''即可， 相比场景1，**内部依赖已被打包进去，使用不用安装**，可以配合webpack external优化要打的包，避免过大的bundle.

- peerDependencies
  
  > peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。
  
  > Project A package.json
  > 
  > ```js
  >   { peerDependencies: { libA:'1.2' } }
  > ```
  > 
  > Project B package.json
  > 
  > ```js
  >   { 
  >     dependencies: { ProjectA:'xxx' }
  >   }
  >   // B install 时如果没有libA1.2会有警告
  >   UNMET PEER DEPENDENCY libA1.2
  >   必须安装该包，否则会有异常 
  > ```

- package.json 中的main 和module
  
  ```javascript
  {
    "main": "dist/dist.js",
    "module": "dist/dist.es.js"
  }
  ```
  
  相当于在一个包内同时发布了两种模块规范的版本。
  
  当打包工具遇到我们的模块时：
  
  1. 如果它已经支持 `pkg.module` 字段则会优先使用 ES6 模块规范的版本，这样可以启用 Tree Shaking 机制。
  2. 如果它还不识别 `pkg.module` 字段则会使用我们已经编译成 CommonJS 规范的版本，也不会阻碍打包流程。
- 包版本管理方案
  
  使用`npm version patch|minor......`等来直接更改package.json中的version版本号 

## CSS

1. pointer-events: none; 类似a标签不响应事件

2. x:nth-child(n)/x:nth-of-type(n)， n可以是表达式或关键字‘odd‘/'even'（单复数）
   
   前者是选择父元素下第n个子元素，且这个元素类型是x.
   
   后者是选择父元素下的所有x类型的元素中的第n个.（其实自己以前用的nth-child大部分是错的，当成nth-0f-type在用了。

3. vw、vh、vmin、vmax
   
   > vw、vh、vmin、vmax 是一种视窗单位，也是相对单位。它相对的不是父节点或者页面的根节点。而是由视窗（Viewport）大小来决定的，单位 1，代表类似于 1%。

4. counter, 用来生成列表的序号，属性如下：
   
   `counter-reset` 初始化一个counter
   
   `counter-increment` 序号如何增长（注意没有 decrement, 可以用负号表示）
   
   `counter(name,style)` 获取对应名为name的 counter 的当前序号，style是序号样式，默认 decimal,还有罗马字符什么的
   
   `counters(counter, string, style)`,获取名为name的对应的子序号
   
   ```html
   // html
      <ul>
        <li>List item</li>
        <li>List item</li>
        <li>
          List item
          <ul>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
          </ul>
        </li>
      </ul>
   ```
   
   ```css
   // css
      ul {
          counter-reset: counter;
        }
      li::before {
          counter-increment: counter;
          content: counters(counter, '.') ' ';
      }
   ```
   
   ```
   // 效果
   
      1.
      2. 
      3.
          3.1
          3.2
   ```

5. val, css自带变量功能
   
   变量声明`--variable-name:`
   
   使用 val(`--variable-name:`)
   
   ```css
   .custom-variables {
   --some-color: #da7800;
   --some-keyword: italic;
   color: var(--some-color);
   font-style: var(--some-keyword);
   }
   ```
6. vertical-align

    [强烈参考](https://zhuanlan.zhihu.com/p/60197512)

## 浏览器缓存

因为last-modified 只能精确到秒，不如etag精确，所以在优先级上etag更优先

比较顺序cache-control->etag->last-modified

## Web Api

- window.URL.createObjectURL / revokeObjectURL
  用于临时创建一个url给某个文件或二进制对象，一般用于下载，使用完后revokeObjectURL(...)释放文件的引用。
  例子：
  
  ```js
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = window.URL.createObjectURL(blob);
    a.download = 'filename';// download 指定下周的文件名
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
  ```

- escape、encodeURI、encodeURIComponent
  
  - 区别
    * escape 是对字符串编码，其他两个是对URL编码。其中 ASCII字母、数字、@*/+ ，这几个字符不会被编码，其余的都会。
    * encodeURI,不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'
    * encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'
  - 使用场景
    * 字符串编码使用`escape`
    * URL编码使用`encodeURI`,如`encodeURI('http://')`=>`http://`,但如果使用`encodeURIComponent('http://')`=>`http%3A%2F%2F`
    * URL中的参数用`encodeURIComponent`,这样如果参数中有'http://'这样的字符时就会被编码

- Fullscreen

```js
var elem = document.getElementById("ele");
    elem.requestFullscreen()

Document.exitFullscreen()
```

- Notification

```js
if (window.Notification){
        if(Notification.Permission==='granted'){
            var notification = new Notification('Hello Notification',{body:"I hope that all the browser will support this\ function!"});
        }else {
            document.getElementById('requestButton').onclick = function (){
                Notification.requestPermission();
            };
        };
}
```

- offset/scroll 属性
  
  - offsetHeight, 每个元素的高度，包括border, 但不包括margin
  
  - clienHeight, 每个元素的高度，**不包括border,margin**
  
  - offsetTop， 每个元素距离其最近父元素的距离
  
  - scrollHeight，代表当前滚动区域内元素整个的高度，包括不可见的高度
  
  - scrollTop, 当A元素内的B元素的高度 > A 元素的高度，会出现滚动条，B元素向下滚动的距离(即被遮住的高度)就是scrollTop

## webpack

1. commonChunk/external/entry(vendor)/dll

```js
 entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
     })
     }),
     new webpack.optimize.CommonsChunkPlugin({
       name: 'common' // 指定公共 bundle 的名称。
     })
    ],
    externals: {
      jquery: 'jQuery' //key 是jquery 表示应该排除 import $ from 'jquery' 中的 jquery 模块。为了替换这个模块，jQuery 的值将被用来检索一个全局的 jQuery 变量，因为静态引入jquery后是生成了一个全局变量jQuery,所以value是jQuery.
    }
```

- commonChunk(webpack4 已经废弃，建议使用SplitChunksPlugin) 用来提取entry里所有入口的公用模块(一般是非第三方库），生成一个名为common的bundle文件，最后被添加到html文件

- externals 外部扩展是用来把第三方库libary和自有代码分离，这样webpack打包时会忽略该第三方包, 在运行时去使用它的宿主环境去找被忽略的那个包，外部 library 可能是以下任何一种形式：
  
  - **root**：可以通过一个全局变量访问 library（例如，通过 script 标签，即cdn这只是一种方式而已）。
  
  - **commonjs**：可以将 library 作为一个 CommonJS 模块访问。
  
  - **commonjs2**：和上面的类似，但导出的是 `module.exports.default`.
  
  - **amd**：类似于 `commonjs`，但使用 AMD 模块系统。
    
    ```javascript
    externals : {
        lodash : {
            commonjs: "lodash",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
            commonjs2: "lodash",//同上
            amd: "lodash",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
            root: "_"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);所以一般是导入script , 就会给window上绑定一个"_"变量，这样loadsh就能找到了。 这个"_"是不能随便乱写的。如果外部库lodash提供的是全局变量lodash,那你就得使用lodash
        }
      }
    ```
    
    此语法用于描述外部 library 所有可用的访问方式。这里 `lodash` 这个外部 library 可以在 AMD 和 CommonJS 模块系统中通过 `lodash` 访问，但在全局变量形式下用 `_` 访问。`subtract` 可以通过全局 `math` 对象下的属性 `subtract` 访问（例如 `window['math']['subtract']`）。
    
    > 对于external的依赖模块，通常你可以这样做，例如你使用npm发布你的库，你可以将jquery在`package.json`文件中添加到`dependencies`，这样别人`npm install`你发布的库时，jquery也会被自动下载到node_modules供别人打包使用。
    
    所以总结如下：
    
    - 针对正常app, react这些比较大的第三方库我们应该使用dll，然后去引用
    
    - 针对 library, 应该使用external让宿主去install然后在宿主环境中去寻找，宿主环境该打包打包

- entry(vendor)针对第三方库,如下
  
  ```js
  entry: {
       index: './app/main.jsx',
       vendorx: ['react', 'react-dom', 'react-router', 'classnames']
   },
   plugins: [
       new webpack.optimize.CommonsChunkPlugin({
           names: ['vendorx', 'manifest'],//注意这里的names 可以配置entry里的name,比如现在有个vendorx, 它就只会提取vendorx入口里文件的公共模块，如果不配置name,默认提取所有入口的公共模块
       }),
   ]
  ```
  
  这种方式会把所有的第三方库打包到名为vendor的bundle中，然后添加进html文件。
  
  指定manifest会修复每次打包vendor的hash值会变的问题。
  
  - dll针对第三方库[参考](https://www.jianshu.com/p/a5b3c2284bb6)

    在用 Webpack 打包的时候，对于一些不经常更新的第三方库，比如 react，lodash，我们希望能和自己的代码分离开，Webpack 社区有两种方案

    a.CommonsChunkPlugin
    
    b.DLLPlugin
    
    对于 CommonsChunkPlugin，webpack 每次打包实际还是    需要去处理这些第三方库，只是打包完之后，能把第三方库和    我们自己的代码分开。而
    DLLPlugin 则是能把第三方代码完全分离开，即每次只打包    项目自身的代码。

2. webpack-dev-server
   
   开启热加载，自带监听,打开网页等功能，需要注意的是有了webpack-dev-server之后，启动命令就可以不用`webpack --watch`了，直接`webpack-dev-server`即可,`webpack-dev-server` build的文件在dist中看不见，`webpack` build的可以看见。
   
   `contentBase` 是server **静态文件**，
   
   `publicPath` 是server **打包的文件**

```js
   src
    |__base
         |__a.js
         |__b.png
         |__index.html
    |__dist
         |_bundle.js
         |_index.html
```

```json
   {
       webpack-dev-server: {
           contentBase:['base','xxx']//可以server多个目录
           publicPath:'dist'// 不配置默认就是dist文件夹，只不过在内存中看不到
       }，
       output:{
           path:'dist'// dev-server模式下，其实没用，还是优先使用wds的publicPath输出目录
       }
```

   项目结构如图

    1. contentBase内所有文件被server了,一般存储静态文件，所有都能访问到。

    2. base内部的index.html只是作为模板输出到dist中的index.html.

所以可以利用contentBase的特性server静态文件，同时dist文件夹内的也被server，相当于能同时访问两个地方的文件。

3. htmlWebpackPlugin
   
   如果不配置该插件，要手动把index.htmln挪动到dist文件夹，不然localhost:port不显示任何内容，使用该插件后，会自动依据模板生成index.html文件到dist目录，这时候localhost:port就有内容了。

4. workbox-webpack-plugin

        progressive web application - PWA, 离线依然可使用， 注意需要vpn（访问谷歌）

5. publicPath/contentBase
   
   **webpack-dev-server.publicPath**: 开发环境中，所有打包文件的**输出目录**，只在开发环境中起效
   
   **webpack-dev-server.contenBase**: 静态文件的文件html所在的目录，一般和output.path一样
   
   **output.publicPath**: 设置打包输出的**文件内**静态资源的**引用** 前缀

```javascript
   // build:'webpack',
   // dev:'webpack-dev-server'
   output: {
       path: 'dist',
       publicPath:'/output/'
   },
   webpack-dev-server: {
       contenBase:'dist'，
       publicPath:'/dev/'
   }
```

    首先明确以下概念：

1. `webpack-dev-server`的配置只在开发环境有效

2. `webpack-dev-server`的`publicPath`如果不配置，默认和`output`的`publicPath`值一样

3. 两者都存在时，**开发模式**下，由于`webpack-dev-server`编译后的的文件都在内存中，看不见(可以在浏览器访问对应的`localhost:xxx/webpack-dev-server`看到目录结构)，wds实际是默认把输出的编译文件放在了项目的根目录（即开发环境下`output`的path无效，它只是设置再生产环境实际打包的文件路径），而如果配置了wds的`publicPath`，就会把输出的文件从根目录转移到`publicPath`下。
   
   比如现在的配置，在wds下实际的打包文件地址在`dev`目录下，而`dev`目录里的`index.html`或其他的js内的静态资源引用的路径前缀都是`/output/`比如`/output/test.png`，而这种情况下如果访问首页会发现静态资源请求不到，因为现在所有的文件被server在了`/dev`目录下，如下：
   
   ```javascript
   pro
   |--dev
       |-test.png
       |-index.html
   |-package.json
   
   // index.html
   <img src="/output/test.png"/>
   ```

        这样肯定找不到图片，除非`wds`的`publicPath`设置成`/output/`，或者`output`的`publicPath`设置成`dev`,这也是官方建议：开发环境下，没必要设置`wds`的`publicPath`或者和`output`的`publicPath`的设置一样的值。

    4. 两者都存在时，**生产模式**下，`wds`的设置将不再生效，我们只需看`output`的设置。

    此时，会生成真实的打包文件到`/dist/`下，同时内部的静态资源引用会都加上`/output/`前缀（一般用来加cdn），所以在生产环境下，必须得把打包出来的静态资源放对地方，必须现在的就必须放在`/output/`下，不然还是找不到，一般静态资源会被放在cdn上，所以确保cdn服务器上的路径设置正确。

6. 静态资源的引用
   
   在实际生产中有以下几种图片的引用方式：
   
   1. `<img src="photo.jpg" />`
   
   2. `.photo { background: url(photo.jpg);}`
   
   3. `var imgTempl = '<img src="photo.jpg" />';
      document.body.innerHTML = imgTempl;`
   
   4. `import React from 'react';
      import ReactDOM from 'react-dom';
      class App extends React.Component {
      
          render() { return (<img src='photo.jpg' />);
      
       }
      }`
      
      1,3,4的引用方式使用webpack打包后会发现图片并没有打进去，实际上webpack只会自动提取样式文件中的引入，其他引用图片的地址应该如下：
      
      ```javascript
      import photo from 'photo.jpg'
      <img src={photo}/>
      ```
   
           要把静态资源也当成模块导入，这样就能正常打包了

7. Jest + webpack 
   
   1. 使用jest的时候，因为组件中可以直接使用`import from 'style.less'`导入静态文件（webpck功能），所以在jest下，需要模拟出这种功能，让静态资源的也已模块的形似导入，一般使用`identity-obj-proxy`这个库，可以参考jest文档webpack部分。

8. splitChunk
   
   [参考系列文章]([https://www.cnblogs.com/kwzm/p/10314438.html](https://www.cnblogs.com/kwzm/p/10314438.html)
   
   - module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
   - chunk: chunk是webpack根据功能拆分出来的，包含三种情况：
   
   　　　　1、你的项目入口（entry）
   
   　　　　2、通过import()动态引入的代码
   
   　　　　3、通过splitChunks拆分出来的代码
   
   　　　　chunk包含着module，可能是一对多也可能是一对一。
   
   - bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。
     
     默认splitChunk配置如下，会split node_module里的包和最少引用两次以上的代码块_
     
     ```js
     optimization: {
         splitChunks: {
           chunks: 'async',
           minSize: 30000,
           minChunks: 1,
           maxAsyncRequests: 5,
           maxInitialRequests: 3,
           automaticNameDelimiter: '~',
           name: true,
           cacheGroups: {// cacheGroups里的配置可以覆写splitChunks的外层配置，很重要, 同时其内部的条件必须同时满足才能生效
             vendors: {
               test: /[\\/]node_modules[\\/]/,
               priority: -10
             },
             default: {
               minChunks: 2,
               priority: -20,
               reuseExistingChunk: true
             }
           }
         }
       }
     ```
     
     chunks的含义是拆分模块的范围，它有三个值async、initial和all。
     
     - async表示只从异步加载得模块（动态加载import()，不是import xx from xx）里面进行拆分
     
     - initial表示只从入口模块进行拆分
     
     - all表示以上两者都包括
       
       假如只配置了'async',那么入口文件里的vendor的包或者代码块就不会被拆分，都会被打到一个chunk，即入口chunk里
   
   - maxInitialRequests
     
     它表示允许入口（即initial对应的入口，同理maxAsyncRequests是限制dynamic import的）**并行加载的最大请求数**，之所以有这个配置也是为了对拆分数量进行限制，不至于拆分出太多模块导致请求数量过多而得不偿失
     
     拆分规则如下：

     - 入口文件本身算一个请求
     - 如果入口里面有动态加载得模块这个不算在内
     - 通过runtimeChunk拆分出的runtime不算在内
     - 并不算js以外的公共资源请求比如css
     - 如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来

- maxAsyncRequest
  
  - import()文件本身算一个请求
  
  - 并不算js以外的公共资源请求比如css
  
  - 如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来

## others

- eslint
  
  1. extends 
     
     ```javascript
     
      {
      "extends": "an", //会查找名为eslint-config-an的第三方包配置(要先安装)
      }
     ```
  
  2. env
     
     ```javascript
     {
         env:{
            jest: true, // 会开启jest相关的所有全局变量，相关的linter就不会报错了
            node: true  // 同理      
         }
     }
     ```
  
  3. import/resolve
     
     当在webpack中配置了`resolve：{module:['src']}`时，代表webpack会从src下去解析module,但eslint不知道，所以相关的linter会报错，解决办法下载`eslint-import-resolver-webpack`插件并如在`.eslintrc`下配置settings 项：
     
     ```javascript
     "settings": {
           "import/resolver": {
             "webpack": {
               "config": {
                    resolve: {
                         extensions: ['', '.js', '.jsx'],
                         modules: ['src', 'node_modules']
                       }
               }
             }
           }
         }
     ```

- babel
  
   转码过程parsing => transforming => generating 
  
  > babel只是转译新标准引入的语法，比如ES6的箭头函数转译成ES5的函数；而新标准引入的新的原生对象，部分原生对象新增的原型方法，新增的API等（如Proxy、Set等），这些babel是不会转译的。需要用户自行引入polyfill来解决

```js
{
  "presets": ["react", "es2015", "stage-1"], // preset 就是一些预置的插件集合
  // stage-0/1/2/3, 涵盖范围逐渐减小

  "plugins": [
    "transform-runtime",
    "add-module-exports"
  ], // 先执行plugins 再执行preset, plugin正顺序执行，preset 倒叙执行
     // plugins在transforming 阶段执行

  "env": { // env 默认从process.env.BABEL_ENV || process.env.NODE_ENV获取
    "static": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    },
     "test": {
      "plugins": [
        ["istanbul"]
       ]
    }
  }
}
```
