# 未知知识

## js

* 事件循环机制、调用栈、调用队列

  - 调用栈、调用队列（可视图）[参考](https://github.com/xitu/gold-miner/blob/master/TODO/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with.md)
  [参考2](https://www.jianshu.com/p/12b9f73c5a4f)

  > macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。 
    micro-task包括：process.nextTick（就是then,或者catch）, Promises, Object.observe, MutationObserver 
    **执行顺序**：函数调用栈清空只剩全局执行上下文，然后开始执行所有的micro-task。当**所有可执行**的micro-task执行完毕之后。循环再次执行macro-task中的**一种**任务队列（可能有settimeout队列，settimmediate队列，指的是执行完其中的一种全部队列，不是一种队列中的一个），执行完之后再执行**所有的micro-task**，就这样一直循环

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

* escape、encodeURI、encodeURIComponent
  - 区别
    * escape 是对字符串编码，其他两个是对URL编码。其中 ASCII字母、数字、@*/+ ，这几个字符不会被编码，其余的都会。
    * encodeURI,不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'
    * encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'
  - 使用场景
    * 字符串编码使用`escape`
    * URL编码使用`encodeURI`,如`encodeURI('http://')`=>`http://`,但如果使用`encodeURIComponent('http://')`=>`http%3A%2F%2F`
    * URL中的参数用`encodeURIComponent`,这样如果参数中有'http://'这样的字符时就会被编码

* npm 包依赖

    > Project A package.json
    ```js
    { devDependencies: { libA:'xxx' },
      dependencies: { libB:'xxx' }
    }
    ```
    > Project B package.json
    ```js
    { 
      dependencies: { ProjectA:'xxx' }
    }

    ```
    > Project B/test.js
    ```js
    B = require('libB');//虽然项目B中没有直接依赖，但是依赖的项目A中已经有了libB，这样就可以访问到.

    A = require('libA');//undefined
    必须是dependencies
    ```
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
      jquery: 'jQuery'
    }

```

 - commonChunk 用来提取entry里所有入口的公用模块(一般是非第三方库），生成一个名为common的bundle文件，最后被添加到html文件
 - externals 外部扩展是用来把第三方库和自有代码分离，这样webpack打包时会忽略该第三方包，注意，这种方式必须自己手动在html页面引入该第三方包，一般使用cdn方式
 - entry(vendor)针对第三方库,如下

 ```js
   entry: {
        index: './app/main.jsx',
        vendor: ['react', 'react-dom', 'react-router', 'classnames']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
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