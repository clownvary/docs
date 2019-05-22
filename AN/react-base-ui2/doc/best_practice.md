# This document describes some basic developing rules every FEE need to be on the same page.


Why we need this guideline:
* Consistent coding styles (ESLint helps a lot on shape)
* Clear & clean
* Easy to understand
* Easy to maitain
* Good to quality improvement

> **Note:**
This document is not finished, everyone are welcome to input your suggestions. 

### **1. Use clear and explicit file/module names**

  * File/Module name represents the main content inside it
  * File/Module name is exactly same to the default content
  * Do not use names that are too general and hard to tell
  * Follow file name format for function, class, components

  File name format rules: [TBD]

### **2. Define constants in individual module**

  * Constants are defined in modules
  * Use folder 'consts' to store constants modules
  * Utilize the nature of module to scope constants
  * Constant names are UPPERCASE words joint by "_"
  * Action types as constants, with file name 'actionTypes.js' under 'consts' folder

  Example: export const CONSTANT_NAME = 'CONSTANT VALUE';

### **3. Strictly follow FSA**

  An action MUST

  * be a plain JavaScript object.
  * have a **type** property.

  An action MAY

  * have an **error** property.
  * have a **payload** property.
  * have a **meta** property.

  An action MUST NOT include properties other than type, payload, error, and meta.

  There are always 2 types of actions:
  * Error
  * Non-error

> **Detail Definition:**
  [https://github.com/acdlite/flux-standard-action](https://github.com/acdlite/flux-standard-action)

### **4. Do not lost yourself in Actions**

  * An action type is defined **only** for reducing purpose.
  * An action must have one action type.
  * Do not use [ACTION, ACTION_SUCCESS, ACTION_FAILUR] for promise handling anymore.

> **Self Check:**
  If an action type is defined, but there is no reducer to handle it, that means this action type is redundant.

### **5. Dispatch and forget**

  * Only two things are allowed to be dispached: Thunk and FSA action
  * We don't encourage using dispatch's return value to chain

> **Self Check:**  
If you dispatch an action that is neither thunk nor FSA action, that means you are using dispatch improperly.
>
If an FSA action is dispatched, but there is no reducer handle it, that means you are using dispatch improperly. (Consider using thunk if you need an async operation)

### **6. Async operations**

  * Use thunk for async operations.
  * Call service inside thunk function.
  * Chain the async operations inside thunk function.
  * Deprecate the dependency on PromiseMiddleware for async operation.

### **7. API layer**

  * A client side layer mirroring to the server side services.
  * APIs are available anywhere, anytime.
  * Use folder 'api' to store all API definitions

### **8. Properly use Promise**

Promises are heavily used across our front end projects. There are some mistakes we need to avoid, the most common seen are:

  * Do not lose the tail of a Promise chain

  ```javaScript

  // Incorrect
  function foo() {
    const promise = asyncFunc();
    promise.then(result => {
        ···
    });

    return promise;
  }

  // Correct
  function foo() {
    return asyncFunc().then(result => {
        ···
    });
  }

  ```
  * Do not nest Promises

```javaScript

  // Incorrect
  asyncFunc1()
  .then(result1 => {
      asyncFunc2()
      .then(result2 => {
          ···
      });
  });

  // Correct
  asyncFunc1()
  .then(result1 => {
      return asyncFunc2();
  })
  .then(result2 => {
      ···
  });
  
  ```




