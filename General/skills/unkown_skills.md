# 未知知识

## js

* 事件循环机制、调用栈、调用队列

  - 调用栈、调用队列（可视图）[参考](https://github.com/xitu/gold-miner/blob/master/TODO/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with.md)
  [参考2](https://www.jianshu.com/p/12b9f73c5a4f)

  > macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。 
    micro-task包括：process.nextTick（就是then,或者catch）, Promises, Object.observe, MutationObserver 
    **执行顺序**：函数调用栈清空只剩全局执行上下文，然后开始执行所有的micro-task。当**所有可执行**的micro-task执行完毕之后。循环再次执行macro-task中的**一种**任务队列（可能有settimeout队列，settimmediate队列，指的是执行完其中的一种全部队列，不是一种队列中的一个），执行完之后再执行**所有的micro-task**，就这样一直循环

   1.当调用栈中的代码都执行完毕后再把任务队列中的压入调用栈，然后执行。[参考](https://blog.csdn.net/qq_31628337/article/details/71056294) 

   ```js
    console.log(1);
    setTimeout(function(){console.log(2);}, 0);
    console.log(3);
    //输出1，2，3
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
