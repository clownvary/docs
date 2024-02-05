# React 经验技巧总结

- 不要在jsx的render中使用箭头函数
  
  本质一句话： 如果oncliK的的事件委托是用的箭头函数，那么每次该函数执行时会生成一个新的函数，正常情况没事，但一旦作为父props传递给子组件时，子组件就会认为props发生变化，从而重新render
  
  传参可以这样 `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`
  [参考1](https://segmentfault.com/a/1190000011007769);
  [参考2](https://www.jianshu.com/p/a3bec4a50b8d)


- setState 合并

当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。

```js
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
然后你可以分别调用 setState() 来单独地更新它们：


```js
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

- Render Props : 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
  
  ```js
      <DataProvider render={data => ( // 并不一定要命名为render, 只要是传的render函数，任何命名都可以
        <h1>Hello {data.target}</h1>
       )}
       />
  ```
  
    这样就可以封装一些公用的逻辑，在外部接受一个render函数延迟执行render, 本质和HOC差不多

- Hook
  
    a. hook只能在最顶层使用， 不要在循环、条件、嵌套中使用（如有必要，将条件写在hooK里面）

      因为react是按照hook的声明顺序来标示对应的hook的，如果写在条件判断或者循环中每次执行时的顺序可能会有差异，导致hook的值错乱

    b. 只在react 函数中调用hook,即（React 函数组件和自定义的hook中调用）

    c. hook只在函数式组件中有效，class组件无效

- useEffect
  
   a. 性能优化，第二个参数接收一个数组，可以只watch数组里的变量，只在更改时触发effect。如果你要使用此优化方式，请确保数组中包含了所有**外部作用域中会随时间变化并且在 effect 中使用**的变量
   
   b. 如果想执行一次effect（仅在组件挂载和卸载时执行）, 需要给第二个参数传个空数组[],因为传空数组本质是由于此时effect 内部的 props 和 state 就会一直持有其初始值不会变化。

- userLayoutEffect
  
    和useEffect相比，该hook是在重新渲染**绘制**之前执行，这样不会导致页面的闪动

- useRef
  
    本之上和`React.createRef()`差不多
  
  ```js
    // React.createRef()
    const FancyButton = React.forwardRef((props, ref) => (
       <button ref={ref} className="FancyButton">
         {props.children}
       </button>
     ));
  
     // 你可以直接获取 DOM button 的 ref：
     const ref = React.createRef();
     <FancyButton ref={ref}>Click me!</FancyButton>;
  
     // useRef
     function TextInputWithFocusButton() {
       const inputEl = useRef(null);
       const onButtonClick = () => {
         // `current` 指向已挂载到 DOM 上的文本输入元素
         inputEl.current.focus();
       };
       return (
         <>
           <input ref={inputEl} type="text" />
           <button onClick={onButtonClick}>Focus the input</button>
         </>
       );
     }
  ```

- useCallback/useMemo
  
  用来在监听的某些属性改变之后调用，区别是useCallback, 返回的是个**回调函数**，而useMemo返回的是个**值**，参考使用方式。
  
  ```js
   const cb = useCallback(()=>`callback:${name}`,[name]); // 允许你在重新渲染之间保持对相同的回调引用以使得 shouldComponentUpdate 继续工作， 除非name改变
   const memo = useMemo(()=>`memo:${name}`,[name]);
   return (
    <div className="App">
      <h1>Name: {name}</h1>
      <h2>cb name: {cb()}</h2>
      <h2>memo name: {memo}</h2>
      <button onClick={()=>setName(Math.random().toFixed(2)*1000)}>random name</button>
    </div>
  );
  ```
- React.Memo

  React.Memo不同于useMemo, 前者使用来在组件层级通过**浅比较**props的previous 和 next值来觉得是否渲染从而优化组件性能，后者是在组件中通过判断内部props 或 state的值来优化内部的方法等性能。

  浅比较默认只比较两次对象是否是同一引用，不会逐个遍历对象属性去判断，优点是性能好，缺点是可能比较的结果和我们预期的不同，看例子：
  
  ```javascript
    var a = { name:'java'};
    var b = { name:'java'};
    shallowEqual(a,b) 为false, 因为a,b不是同一个对象引用，但其实内部的值是一样的
  ```
  所以在使用React.Memo时应该注意，如果是想要优化组件性能，最好使用深比较，lodash.isEqual是深比较，但如果比较的对象层级较深，本身也比较耗性能。
  > 需要注意props里如果有匿名的函数比如onClick回调，深比较将每次都返回false,因为匿名函数每次都是生成新的
  所以默认的React.Memo适合那些比较的props比较简单且比较少的情况，要根据不同组件来取舍。


- 自定义hook
    a. 必须usexxx命名函数
    b. 内部必须使用原生的hook
    c. 本质就是一个函数，可以返回一个值或者类似useState一样（xxx和setxxx方法, 可以参考useReducer）

- HOC
  
    HOC主要有两种模式， Proxy Props 和Inheritance Inversion
  
  1. Proxy Props
     a. 读取，编辑 WrappedComponent 的props， 没法获取state 和实例方法
     b. 读取WrappedComponent 的ref引用
     
     ```js
     function ppHOC(WrappedComponent) {
      return class PP extends React.Component {
          constructor(pros)
          {
              super(props);
          }
          proc(wrappedComponentInstance) {
            wrappedComponentInstance.method()
         }
         render() {
           const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
           return <WrappedComponent {...props}/>
         }
      }
     }
     ```
  
  2. Inheritance Inversion 反向继承
     
     a. 读取WrappedComponent 的props,state和实例方法
     
     b. 劫持渲染
     
     c. 改写WrappedComponent的生命周期方法
     
     ```javascript
     function iiHOC(WrappedComponent) {
       return class Enhancer extends WrappedComponent {
         render() {
           return super.render()
         }
       }
     }
     ```

- React性能相关

[参考](https://zhuanlan.zhihu.com/p/101507773)

- React性能优化

> 优化前先关闭chrome所有插件，或直接使用匿名模式，因为插件会影响性能结果

> 建议使用whyDidYouRender库，调试组件reRender状态；建议使用chrome=>performance 页签录制操作查看性能报告

1. 列表添加key,优化虚拟dom 比较

key 必须唯一（列表内唯一），不建议使用遍历的index,当顺序改变时会导致bug产生

2. pureComponent/React.memo, 优化判断shouldComponentUpdate , 配合isEqual实现深对比，配合immer实现不可变对象

对于无状态组件即无props的组件，也要使用React.memo包装，如下

```js
function Parent(){}
function Child(){
  xxx
}
<Parent>
<Child/> 
</Parent>
// 每次parent reRender都会导致Child reRender, 因为child虽然没有props参数声明，但其实其值是一个`{}` ,当Parent reRender时，相当于给child又传递了一个{},虽然两次值一样，但由于{} !== {}, 所以还是会更新，所以需要使用React.memo封装下
```

3. useEffect 添加正确依赖，防止非必要触发

  ```js
   
  useEffect(()=>{
     xxx
  },[a]) // 注意如果这里的a是个对象或者数组，会每次都触发，因为是引用比较，解决方案使用use-deep-effect 库进行深度比较或者使用usePrevious 对上一次的值进行比较
  ```

4. 使用useMemo/useCallback缓存不是每次都要更新的值，只有在其依赖值变化是才触发

5. 不要使用箭头函数作为事件回调，因为箭头函数每次都会生成新，当作为props传递的时候会触发reRender

6. 不要使用行内对象，如

  ```javascript
  const style = {width: 200px} ;
   <A style={style} />
  ``` 
  每次生成的都是新的对象导致重新渲染

7. 避免使用会引起浏览器回流（reflow）的css, 如隐藏元素可以使用`opacity: 0` 替代`display: none`

- React 父-子依赖问题

```javascript
// 如下，如果parent负责触发通用的一些api并set到reducer, child中有相关的逻辑必须依赖parent中set的数据
// 正常渲染的顺序会是先渲染child 完了后再渲染parent, 这时候就没法拿到正确的依赖数据了，
// 正确做法是在渲染child前加条件，其条件就是依赖数据是否已存在
<Parent>
<Child/> // => {hasData && <Child/>}
</Parent>
```