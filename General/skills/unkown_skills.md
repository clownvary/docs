# 未知知识

## js

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

* npm 包依赖
  
  1. 遍历循环所有包，包括包中依赖的包
  2. 扁平化。（redupe）
     a.遇到**新包**放到最外层项目树下
     b.遇到已有的包，判断两个版本是否在同一范围（相同，或者在可兼容的范围内）
        是：则选择最新的可接受的版本放在外层树下
        否：各自在自己树下生成，版本不同
  3. 按照生成的依赖树安装

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

- SSE(server-sent event)
  
  Html5引入的服务端发送消息机制，比socket 更加轻量，只能单向发送

- 路径动画()
  
  1. css 中使用`motion-path`.
  2. svg里的path.
  3. smil.

- css
  
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

对于 CommonsChunkPlugin，webpack 每次打包实际还是需要去处理这些第三方库，只是打包完之后，能把第三方库和我们自己的代码分开。而
DLLPlugin 则是能把第三方代码完全分离开，即每次只打包项目自身的代码。

2. webpack-dev-server
   
   开启热加载，自带监听,打开网页等功能，需要注意的是有了webpack-dev-server之后，启动命令就可以不用`webpack --watch`了，直接`webpack-dev-server`即可,`webpack-dev-server` build的文件在dist中看不见，`webpack` build的可以看见。

3. htmlWebpackPlugin
   
   如果不配置该插件，要手动把index.htmln挪动到dist文件夹，不然localhost:port不显示任何内容，使用该插件后，会自动依据模板生成index.html文件到dist目录，这时候localhost:port就有内容了。

4. workbox-webpack-plugin

progressive web application - PWA, 离线依然可使用， 注意需要vpn（访问谷歌）

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
  
  4. xxx

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
