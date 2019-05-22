# [Changelog](/../blob/develop/CHANGELOG.md)

# New front-end architecture of ActiveNet AUI
This new architecture is based on the [Arch Reform Base](https://gitlab.dev.activenetwork.com/fee/arch-reform-base) provided by FEE team.

## Framework and library
-----------------------------------------------------------
* **React**: View layer. A componentized design for web pages. Very popular among front-end developers, supported and proved by Facebook. [github](https://github.com/facebook/react)

* **Redux**: A predictable state container for JavaScript apps.It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience.[github adress](https://github.com/reactjs/redux)

* **React-Router**: A complete routing library for React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.[github](https://github.com/reactjs/react-router)

* **Redux-Form**: A validation library works with React Redux to enable an html form in React to use Redux to store all of its state.[github](https://github.com/erikras/redux-form)

* **Immutable**: State storage library. It provides an easy to reason about data storage mechanism. Also from Facebook, it's a perfect companion to React.[github](https://github.com/facebook/immutable-js)

* **React-base-ui**: ACTIVE AUI components library. With this, we can easily reuse existing components described in the AUI style guide. Similar approaches can be done for CUI components.[gitLab](https://gitlab.dev.activenetwork.com/ActiveNet/react-base-ui)


## Automation tools:

* **Webpack**: Provides ES6, React transpilation support as well as modularization, multi-entries, etc. A must have.

* **Babel**: Babel is a compiler for writing next generation JavaScript.


## Redux dev-tools:
DevTools for Redux with hot reloading, action replay, and customizable UI

## Steps to run the AUI from local
-----------------------------------------------------------

1. install git
2. install node
3. download the repository
```
git clone https://gitlab.dev.activenetwork.com/ActiveNet/aui.git
```
4. enter the root directory
```
cd aui
```
5. run `npm install` in the command line
6. run `npm start` in the command line to start the local server. If the the server start successfully you will see the booking page open in your default browser automatically. And any changes to the file can be immediately manifested in the browser. Cool!
