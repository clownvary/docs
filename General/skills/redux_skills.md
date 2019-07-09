# redux 和react-redux

  前者是action,store,reducer这些的概念下的东西，react-redux是***ui绑定库***，只有provider和connect

1.action和*action创建函数*的概念要清楚，创建函数就是返回一个action
 
action文件中一般有一个type常量，还有一个对应的同名（不同名也行）的action创建方法

## action.js

```js

/*
 * action 类型
 */export const ADD_TODO = 'ADD_TODO';
 * 其它的常量

 * action 创建函数
 */export function addTodo(text) {
  return { type: ADD_TODO, text }}
```

reducer.js文件中是根据常量的值来计算state,并不调用action创建方法，创建方法是在
view组件中，互动调用的，一般为事件，不要搞混

2.不要在reducer里修改state,而是返回新的state,一般用object.assign({},state,xx)

3.redux和react进行绑定时用react-redux里的connect方法,这样只订阅需要的state

每个被provider包裹的组件都能接收store=>前提该组件必须是被connect方法连接了的组件，
关于connect方法可以参考[这个](http://www.tuicool.com/articles/MrmYN36)和[官方文档](http://cn.redux.js.org/docs/react-redux/api.html)

> 其实就是注入state(或者选择对应的state),注入action,最后都合并成***组件的props***,方法有些怪异，多看看 

> 组件的props就是property（属性）的缩写，父组件给它穿什么就有有什么，也可以在组件中定义，父组件如果不传就是undefined

- creatStore(reducer, [initialState], enhancer),第一个参数是一个reducer,但一般是传递的一个合并过的reduderApp,(reducer不是state,它只是定义了***不同的state***在***不同的action***下如果产生的而已)，相当于一张state树，当dispatch以后如下（只是传入了action,并没有具体的指明要哪个reducer调用，store怎么知道在哪个reducer上触发action呢？）

其实原因是默认store会在整个的state上判断action(actionType必须唯一)，然后触发，这样明显性能不好，所以在(react-redux)connect的时候mapStateToProps方法会返回你定义的想要获取的state,然后优先在这些的reducer里去判断action,如果符合则触发
[建议看这个](http://www.redux.org.cn/docs/FAQ.html#performance-all-reducers)

---
  ```js
  state的树是由reducer组织起来的，和connect里的没什么关系
  export default connect(
  state => ({
    orderSummary: state.modules.Cart.Checkout.orderSummary,
    applyGiftCardx: state.modules.Cart.Checkout.applyGiftCard//这里的applygitfCardx,只是临时合并到这个组件的props中，总的state树名称还是不变
  })}
  ```
- store.dispatch({type:'add_todo',text:'name'}),本来是要这样触发action,但写法不方便，有了actionAcreator,就可以`store.dispatch(addTodo('name'))`;

4.用了redux后，所有的state都被store管理，原则上组件中就不再出现state,store计算出state,然后以prop的形式往下传
如果不用redux,原生的react 还是得配合state才行
5.官方建议的只在顶层connect是不对的，目前的最佳实践是将组件按照 “展现层（presentational）” 或者 “容器（container）” 分类，并在合理的地方抽象出一个连接的容器组件：
> 不要搞混了，store只能有一个，但connect的组件可以有多个，一般建议是在各个组件*容器*connect，

- UI 组件负责 UI 的呈现，容器组件负责管理*数据和逻辑*

connect 只是返回一个绑定了自定义state和reducer到props的心的组件而已

- [跨reducer共享state](http://www.redux.org.cn/docs/FAQ.html#reducers-share-state)


### 中间件
```js
//签名如下
function md(extraArgs) {
return ({dispatch, state})=> next => action {xxx}
}
```
- 多读[这个](http://www.redux.org.cn/docs/advanced/Middleware.html)

- middleWare,签名为（store)=>next=>action的方法，thunk是一种实现

- 注意本质上我们的目的是要重新包装dispatch，替换dispatch方法，next指代的是dispatch,只不过不是简单的指向系统的store.dispatch,而是下一个被包装过的dispatch，如图
![dispatch](https://pic3.zhimg.com/v2-e5b8f433fec45c09260759fb12e90bb6_r.png)

- applyMiddleware : 为了保证你只能应用 middleware 一次，它作用在 createStore() 上而不是 store 本身。因此它的签名不是 `(store, middlewares) => store`， 而是 `(...middlewares) => (createStore) => createStore`

```javascript
cui 使用符合签名
const middleware = __DEV__ || __STATIC__ ?
   composeEnhancers(applyMiddleware(...middlewareList)) : applyMiddleware(...middlewareList);

  const store = middleware(createStore)(rootReducer, initialState);
```

但是官方文档还有句话： **由于在使用之前需要先应用方法到 createStore() 之上有些麻烦，createStore() 也接受将希望被应用的函数作为“最后“一个可选参数传入**, 所以还有可以当场createStore的第三个参数直接传进去（applyMiddleware只是该可选参数的一种而已，并不是唯一，看官方文档），比较方便，如下

```javascript

import { createStore, combineReducers, applyMiddleware } from 'redux'

let todoApp = combineReducers(reducers)
let store = createStore(
  todoApp,
  // applyMiddleware() 告诉 createStore() 如何处理中间件
  applyMiddleware(logger, crashReporter)
)

```

- applyMiddleware（...middlewares）,是用来串联各个middleware的方法，这样所有的middleware就可以以next()的机制来层层调用dispatch
  - compose,是applyMiddleware中最核心的一个方法，使用它才实现了串联，
    - compose的实现，其实就是一个柯里化得过程，
    ```js
     function compose(...funcs) {
      if (funcs.length === 0) {
        return arg => arg
      }    

      if (funcs.length === 1) {
        return funcs[0]
      }    

      const last = funcs[funcs.length - 1]
      const rest = funcs.slice(0, -1)
      return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
    //就是一个函数执行完后又是另一个函数的参数
    // 如[A,B,C],compose第一次是C，f是B，即B（C），第二次，compose是B（C），f是A，则结果A（B（C））
    // 
    }
    ```
- applyMiddleWare 实现

方法一：

```js
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
    // 循环执行每次改变dispatch的值
    // 注意第一次执行的时候的那个middleware拥有最原始的dispatch， 即store.disptach, 后边的都是包装过得dispatch

  )

  return Object.assign({}, store, { dispatch })
}
```

方法二：因为方法一是循环的实现，并不是串联，所以真正实现是方法二

```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//可以看出compose做的事情就是上一个函数的返回结果作为下一个函数的参数传入。

export default function applyMiddleware(...middlewares) {
   
  return (createStore) => (...args) => {
    // 之后就在这里先建立一个store
    const store = createStore(...args)
    let dispatch = store.dispatch
    let chain = []
    // 将getState 跟dispatch函数暴露出去
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    chain = middlewares.map(middleware => middleware(middlewareAPI))
    
    dispatch = compose(...chain)(store.dispatch)
    // 这里和方法一循环实现不同，实现了串联，然后最右边的middleware接受原始的store.dispatch
    // 所以执行时候右边先执行，然后层层返回
    return {
      ...store,
      dispatch
    }
  }
}
```
- thunk,是一种中间件，只是*让action可以传递方法*，但它没有提供异步方法，一般还得使用ajax或者fetch来实现，像redux-promise就提供了自己的实现

### reducer

```js
   //签名如下
  function (state, action) {xxx}
```

- state 设计：想象成数据库，每个对象想象成单独的表，利用这种扁平的结构，使用引用，而不要使用嵌套的，如下
  ```
  //不要这样
  state:[
    {post1:{
      author:{name:'',age:''},
      comments:[{
        content:'xxxx',
        date:2016/09/12
      },
      {
        content:'xxxx2',
        date:2016/09/12
      }
      ]
    },
    {post2:{
      author:{name:'',age:''},
      comments:[{
        content:'xxxx',
        date:2016/09/12
      },
      {
        content:'xxxx2',
        date:2016/09/12
      }
      ]
    }
    }
  ]
  //要使用以下方式,范式设计，扁平结构，修改一处，多处引用
  state:[
    post:{
      byid:[
        post1:{
       author:'user1',
       comments:['comment1','comment2']
        },
        post2:{
       author:'user2',
       comments:['comment1','comment2']
        }
      ]
    },
    authors:{
      byid:[
        user1:{},
        user2:{}
      ]
    },
    comments:{
      byid:[
        comment1:{}
        comment2:{},
      ]
    }
  ]
  ```

- state的初始值
  - [immutable文档参考](https://yq.aliyun.com/articles/69516)
有两种方法设置初始值，一种是在creatStore的第二个预设参数上设置，另一种是在具体的reducer中使用state= initState，来设置[强烈参考](http://cn.redux.js.org/docs/recipes/reducers/InitializingState.html)

要注意的是优先级的问题，creatStore参数>reducer中initState，如果creatStore没设置，以reducer为准





