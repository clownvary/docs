# Middlewares

react-base-ui defines some sharable middlewares as part of the infrastructural support for redux projects.

They are:

- Promise Middleware
- Thunk Middleware


### Promise Middleware

Promise Middleware handles FSA actions when it's payload is a promise object, or the payload has a promise property (the name is promise as well).

If the promise is processed successfully, the result will be packaged to the payload. Or the payload will be an error object if the promise is failed.

A FSA action with the same action type will be disptached by the promise middleware, so the promise's result/error can be handled by other
middlewares or reducers.

### Thunk Middleware

Thunk middleware allows you to write action creators that return a function instead of an action.

The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

When you need to perform async operations, you should use thunk. 

For example

1. Request an API, get the result and update the UI by dispaching UI update action.

2. Or more complicated: Request an API, get the result and send multiple child requests in sequence or parallel. After all the results are ready,
update the UI by dispaching UI update action.
