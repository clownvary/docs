# New architecture of ActiveNet CUI
This is a code repository at the POC stage.


## Getting Started
Checkout this repo, install dependencies, then start with the following commands:

```js
> git clone https://gitlab.dev.activenetwork.com/ActiveNet/cui.git
> cd cui
> npm install
> npm start
```


## Dev Setup:

* **static**: Make a static build and watch for changes. Ajax will send url to call mock json file.
```js
> npm satrt
```

* **dev**: Make a development build and watch for changes. Ajax will send url to real backend interfaces.
```js
> npm build:dev
```

* **prod**: Make a production build.
```js
> npm build:prod
```

## Framework and library
* **React**: View layer. A componentized design for web pages. Very popular among front-end developers, supported and proved by Facebook. [github](https://github.com/facebook/react)

* **Redux**: A predictable state container for JavaScript apps.It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience.[github adress](https://github.com/reactjs/redux)

* **React-Router**: A complete routing library for React.React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.[github](https://github.com/reactjs/react-router)

* **Immutable**: State storage library. It provides an easy to reason about data storage mechanism. Also from Facebook, it's a perfect companion to React.[github](https://github.com/facebook/immutable-js)

* **AAUI**: ACTIVE AUI components library. With this, we can easily reuse existing components described in the AUI style guide. Similar approaches can be done for CUI components.[gitLab](https://github.com/reactjs/redux) | [demo](http://fee:9005/)


## Automation tools:

* **Webpack**: Provides ES6, React transpilation support as well as modularization, multi-entries, etc. A must have.

* **Babel**: Babel is a compiler for writing next generation JavaScript.


## Redux dev-tools:
DevTools for Redux with hot reloading, action replay, and customizable UI

### Features
* Lets you inspect every state and action payload
* Lets you go back in time by “cancelling” actions
* If you change the reducer code, each “staged” action will be re-evaluated
* If the reducers throw, you will see during which action this happened, and what the error was
* With persistState() store enhancer, you can persist debug sessions across page reloads
