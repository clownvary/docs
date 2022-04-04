# Cypress

## Core concept

## 配置

- cypress.json

- Cypress Studio 功能（操作录制）

  cypress.json中 设置`experimentalStudio: true`打开该功能，某些时候很好用

- Cypress selector

 可视化的通过鼠标显示dom选择代码

- support file setup文件

- test suit/case 覆写配置

```javascript
    description('',{browser: '!chrome'},()=>{
        it('', {baseUrl: 'localhost:3022'},()=>{

        })
    })
```

## 语法

- Jquery 同步选择xx.then

```javascript
    cy
  // cy.get() looks for '#element-does-not-exist', repeating the query until...
  // ...it doesn't find the element before its timeout.
  // Cypress halts and fails the test.
  .get('#element-does-not-exist')

  // ...this code is never run...直接访问并交互
  .then(($myElement) => {
    doSomething($myElement)
  })
```
- cy.xx不返回对象，只是yield到下一个进行链式操作，它是异步的

- Alias 共享上下文dom/变量

用法一： this.xx 

```javascript
  beforeEach(() => {
  // alias the users fixtures
  cy.fixture('users.json').as('users')
})
it('utilize users in some way', function () {
  // access the users property
  const user = this.users[0]

  // make sure the header contains the first
  // user's name
  cy.get('header').should('contain', user.name)
})
```

需要注意的是:

1. this 是同步的，必须得等as执行完后才能使用，一般是把as放在hook里

> 错误示范

```javascript
it('is not using aliases correctly', function () {
  cy.fixture('users.json').as('users')

  // nope this won't work
  //
  // this.users is not defined
  // because the 'as' command has only
  // been enqueued - it has not run yet
  const user = this.users[0]
})

//正确可以如下使用
cy.fixture('users.json').then((users) => {
  // now we can avoid the alias altogether
  // and use a callback function
  const user = users[0]

  // passes
  cy.get('header').should('contain', user.name)
})
```

2. 使用this时，测试用例不能使用箭头函数，指向不对

用法二：cy.get('@xxx')

```javascript
// 共享变量
beforeEach(() => {
  // alias the users fixtures
  cy.fixture('users.json').as('users')
})

it('utilize users in some way', function () {
  // use the special '@' syntax to access aliases
  // which avoids the use of 'this'
  cy.get('@users').then((users) => {
    // access the users argument
    const user = users[0]

    // make sure the header contains the first
    // user's name
    cy.get('header').should('contain', user.name)
  })
})

// 共享dom
it('disables on click', () => {
  cy.get('button[type=submit]').as('submitBtn')
  cy.get('@submitBtn').click().should('be.disabled') //不用then
})
```


- 动态生成case

```javascript
describe('if your app uses jQuery', () => {
  ;['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
    it('triggers event: ' + event, () => {
      // if your app uses jQuery, then we can trigger a jQuery
      // event that causes the event callback to fire
      cy.get('#with-jquery')
        .invoke('trigger', event)
        .get('#messages')
        .should('contain', 'the event ' + event + 'was fired')
    })
  })
})
```

- 断言

    - cy.xx.should() 适合cy开头的集成测试（链式调用断言）

    - expect('xx').to.be.xx，适合单元测试（计算结果断言）

- click

  `click({force: true})`,强制点击不检查是否可见/被覆盖/可用等
  
  `click({position: 'leftTop'})` 点击不同位置

- cy.intercept

 类似jest中的mock，可以用来mock请求

 ```javascript
 // 常见用法
cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')
// mock baseUrl+/activities/*下的请求（注意baseUrl,有些包含#和api路径并不一样），返回值为fixture/activities.json
// visit the dashboard, 会触发activities请求，即先mock然后再触发
// the two routes above
cy.visit('http://localhost:8888/dashboard')

// 等待返回
cy.wait('@getActivities').then((response)=>{
  //处理response
}) 
 ```

- cy.fixture

静态数据，一般在fixtures/xxx.json或者xxx.jpg,可以是任何静态数据

- cy.stub()/cy.spy()

stub可以理解为

```javascript
cy.stub(obj, 'method')
// force obj.method() to return "foo"
cy.stub(obj, 'method').returns('foo') // 会改变方法行为，类似jest.mock
cy.spy(obj, 'method');//不会改变方法行为，只是为了判断是否被调用
```

## 调试

### 方法一 debugger

```javascript
it('let me debug when the after the command executes', () => {
  cy.visit('/my/page/path')
  ===
  cy.get('.selector-in-question').click();
  debugger();// 错误方式，因为cy.xx()是异步的，所以得不到selector-in-question元素，应该在then中debugger,注意
  // 此时要先把click等命令去掉，如下
  ===
  cy.get('.selector-in-question').then(($selectedElement) => {
    // Debugger is hit after the cy.visit
    // and cy.get command have completed
    debugger //这样在cypress上重新运行测试用例会在停止浏览器中的对应代码块位置，可以调试上下文，
    // 推荐这种方式
  })
})
```

### 方法二.debug();

```javascript
it('let me debug like a fiend', () => {
  cy.visit('/my/page/path')
  cy.get('.selector-in-question').debug();//也是会在浏览器中对应的地方停住，但和方法一不同，只会把selector-in-question输出在console 面板中，而不是source 面板中查看不了上下文变量
})；
```

### 方法三cy.pause();
```javascript
it('let me debug like a fiend', () => {
  cy.visit('/my/page/path')
  cy.pause();//会暂停在这块，也是在浏览器console中查看
  cy.get('.selector-in-question').click();
})；
```





## Code Coverage

## Visual Testing

## 常见问题

- **只有最后一条command会被retry** [参考](https://docs.cypress.io/guides/core-concepts/retry-ability#Only-the-last-command-is-retried)

```javascript
cy.get('.new-todo').type('todo B{enter}')
cy.get('.todo-list li') // queries immediately, finds 1 <li>, 生成dom有延时的情况，一般来说不会出现这样的问题
  .find('label') // retried, retried, retried with 1 <li>只会等待这条重复执行
  .should('contain', 'todo B') // never succeeds with only 1st <li>

```

解决方案：

    1. 合并命令

```javascript
  cy.get('.new-todo').type('todo B{enter}')
  cy.get('.todo-list li label') // 1 query command
    .should('contain', 'todo B') // assertion
```
    2. 立即断言

```javascript
  cy.get('.new-todo').type('todo A{enter}')
  cy.get('.todo-list li') // command
    .should('have.length', 1) // assertion
    .find('label') // command
    .should('contain', 'todo A') // assertion
```
- cy.as（）hook中使用问题

所有的alias在执行每一条test case时候的会被重置，所以要放在beforeEach中而不是before中

- cy.hover() 

cypress种没有这个方法，会引起一些问题，解决方案

```javascript
cy.get('.nav').trigger('mouseover')
```

## 终极实践

Cypress in all

流程测试
组件测试+visual testing
单元测试

以上汇总成Code Coverage
