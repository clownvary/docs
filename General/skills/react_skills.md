# React

- 不要再jsx的render中使用箭头函数
  
  本质一句话： 如果oncliK的的事件委托是用的箭头函数，那么每次该函数执行时会生成一个新的函数，正常情况没事，但一旦作为父props传递给子组件时，子组件就会认为props发生变化，从而重新render
  
  传参可以这样 `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`
  [参考1](https://segmentfault.com/a/1190000011007769);
  [参考2](https://www.jianshu.com/p/a3bec4a50b8d)

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
    b. 只在react 函数中调用hook,即（React 函数组件和自定义的hook中调用）
    c. hook只在函数式组件中有效，class组件无效
- useEffect

   a. 性能优化，第二个参数接收一个数组，可以只watch数组里的变量，只在更改时触发effect。如果你要使用此优化方式，请确保数组中包含了所有**外部作用域中会随时间变化并且在 effect 中使用**的变量
   b. 如果想执行一次effect（仅在组件挂载和卸载时执行）, 需要给第二个参数传个空数组

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

- 自定义hook
    a. 必须usexxx命名函数
    b. 内部必须使用原生的hook
    c. 本质就是一个函数，可以返回一个值或者类似useState一样（xxx和setxxx方法, 可以参考useReducer）