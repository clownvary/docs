# React 

- No .bind() or Arrow Functions in JSX Props
  
  本质一句话： 如果oncliK的的事件委托是用的箭头函数，那么每次该函数执行时会生成一个新的函数，正常情况没事，但一旦作为父props传递给子组件时，子组件就会认为props发生变化，从而重新render
  
  传参可以这样 `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`
  [参考1](https://segmentfault.com/a/1190000011007769);
  [参考2](https://www.jianshu.com/p/a3bec4a50b8d)