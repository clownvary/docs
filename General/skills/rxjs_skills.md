> 参考[这个](https://segmentfault.com/a/1190000008464065#articleHeader4)

# Observable

简单理解就是数据发射器（如何产生数据)

- 可以被unsubscribe

# Observer

简单理解就是数据监听器（如何处理数据）

- 本质上是有next/error/complete方法的一个对象

# Subject

即是Observable （可以被subscribe）
又是Observer (本身有next方法，可以直接多播数据)

# 操作符

- 静态操作符（用来产生observable的）
 `Rx.Observable.interval(1000);`

- 实例操作符（用来对observable进行操作的）
  `const observable=Rx.Observable.interval(1000); observable.map(xxx)`;

## 多播、单播

- subject 共享Observable execution

- 普通的Observable 每个都是独立的Observable execution

    [看这个](https://segmentfault.com/q/1010000007868880)


### 注意
- subscribe(next,[err],[complete])
后两个参数是可选的，即错误回调和完成回调，有一些是没有完成回调的，比如interval是无穷的，其实subscribe里面的就是一个observer(观察者)对象，是这个对象订阅了外面的Observable，不是Obseervable订阅了自己
- 及时销毁订阅，unsubscribe,一般使用ng2内置的async通道来自动取消

{{xxx}}|async 用于promise/observable

- Rx.Notification.createOnnext

- subject

和observable的区别是subject可以多路广播共享一个作用域，后者是独立的作用域[看这个](https://segmentfault.com/q/1010000007868880)

***这样理解***
subject既可以被观察，也能当做observer处理事件，当它作为observer时相当于一个proxy，就是说本来一个普通的Observable （称为A)以subject(称为B)作为observer后，这个A上的subscribe（即B）被触发时，**B上的subscribe也会被触发**，所以就相当于B是个桥梁使A间接的触发了多路广播

既是观察者（可以订阅被观察者）又是被观察者（可以重新触发/发送新的值）

其实Subscribe（next,err,comple）
就是subscbe({
    next:funcA(x),
    err:xx,
    completed:xx
})的简写
由于subject同时也是observe所以就相当于也具有next，err等属性，所以会有subject.next(4)（注意参数就是funcA(4))
这种方法，其实就是调用的observer中的next回调,然后广播，并不是别的什么next方法

### operator
大全
[参考这个](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/categories.md)

#### 合并类 操作符

 1. pluck,提取目的源的某个属性，参数可以是一个或多个,如下
 
 ```
 var clicks = Rx.Observable.fromEvent(document, 'click');
var tagNames = clicks.pluck('target','tagName');// 提取event.target.tagName
var target = clicks.pluck('target');// 提取event.target

tagNames.subscribe(x => console.log(x));
 ``` 
 - zip 
 联想记忆 ***拉链***
 
和combineLatest不同在于zip 要求源1的第一个数据和源2的第一个数据组成一对，产生结果流的第一个数据；源1的第二个数据和源2的第二个数据组成一对，产生结果流的第二个数据。而 combineLatest 不需要等待另一个源数据流产生数据，只要有一个产生，结果流就会产生。
> 重要的区别点在于 zip 严格的需要多个源数据流中的每一个的相同顺序的元素配对。

 - combineLatest
  
合并两个数据流的最后一次数据

#### 创建类操作符

- from

from 可以支持从数组、类似数组的对象、Promise、iterable 对象或类似Observable的对象（其实这个主要指ES2015中的Observable）来创建一个Observable
```
var array = [10, 20, 30];
var result$ = Rx.Observable.from(array);
result$.subscribe(x => console.log(x));
```
- fromEvent
一般用来操作DOM事件

```
var click$ = Rx.Observable.fromEvent(document, 'click');
click$.subscribe(x => console.log(x));

```

- fromEventPattern
```
function addClickHandler(handler) {
  document.addEventListener('click', handler);
}

function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}

var click$ = Rx.Observable.fromEventPattern(
  addClickHandler,
  removeClickHandler
);
click$.subscribe(x => console.log(x));
```
- Interval

```
let source = Rx.Observable
    .interval(500 /* ms */)
    .take(3);

let subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

```

- Timer
 1. `Rx.Obserable.timer(2000)` 延迟2000毫秒后返回一个值为0的observable
 2. `Rx.Obserable.timer(2000,100)`延迟2000毫秒后每隔100毫秒返回一个值为自增的observable，***类似interval***
 
#### 过滤类操作符
- filter

Filter操作只允许数据流中满足其predicate测试的元素发射出去，这个predicate函数接受3个参数：

1. 原始数据流元素
2. 索引,这个是指该元素在源数据流中的位置（从0开始）
3. 源Observable对象

```
// 提取0-5中的偶数
let source = Rx.Observable.range(0, 5)
  .filter(function (x, idx, obs) {
    return x % 2 === 0;
  });
```
- debounceTime
抖动时间，类似delay
debounce是空闲时间必须大于或等于 一定值的时候，才会执行调用方法。

