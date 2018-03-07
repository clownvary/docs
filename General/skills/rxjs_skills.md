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
