# API layer

API layer is an important infrastructure layer in our front-end projects. Basically, client side APIs are:
  - Stuff that mirror to the server side REST service APIs
  - Can be accessed any anywhere, anytime
  - Key thing of most of the async-actions


### **How to define a simple API:**

It's quite simple to define a client side API, just call the RestClient.createAPI helper function with HTTP methods and resource url specified.


Example:
```javascript
import { RestClient } from 'react-base-ui';

const HttpMethods = RestClient.Consts.HttpMethods;
const apiSet = {};

const path = `${window.__siteBaseName}`;
apiSet.getCartCount = RestClient.createAPI(HttpMethods.GET, `${path}/cartCount`);
```

### *How to call a simple API:*

Calling API is simple too, you need to import the API set and call the expected one as normal function.

Simple API accepts parameter that follow our data transfer protocol that services handle, which is data structure like {headers: {}, body: {}}

Example:
```javascript

import API from '../api';

API.getCartCount().then((response) => {
    const { cart_count: cartCount } = response.body;
  });
```

The return value of the API call is a Promise, from where you can get the response from the service or catch error if you want. 

In most cases, you don't need to care about the Error, Error handling mechanism will handle it automatically. We will discuss this in other section.


### *How to define an API with parametered URL:*

In some cases, an API may have parametered URL, and the parameter is determined at run time.

Almost nothing need to do, you just specify the parameter fields in URL with templates. 

Example:

```javascript
apiSet.deleteTransaction = RestClient.createAPI(HttpMethods.DELETE, `${path}/transactions/{{id}}`);
```

> **Tips:**
Please notice that we use {{}} to specify parameter in URL. Don't twist it up with ${} used by JavaScript language.


### *How to call an API with parametered URL:*

Calling an API with parametered URL is almost same as simple API, except that the first parameter would be the template's value object itself
which contains what to be filled to the template.

The second parameter of the API call is same as that used in the simple API.


Example:

```javascript
import API from '../api';

const id = 4;
API.deleteTransaction({ id });

```

If the defualt URL template can't meet your requirements, you can define your own URL handler function.

This handler will be called each time when you call the API with URL parameter object. The return value of this handler will be
used in lower layer REST service calls.

Example:

```javascript
apiSet.deleteTransaction = RestClient.createAPI(HttpMethods.DELETE, `${path}/transactions`, function(url, params){
  return `${url}/${params.id || params}`;
} );
```

### *How to mock the API:*

In \_\_STATIC\_\_ build, we need to run/debug API with mocked data. You can do it by calling the 'mock' method and set the mocked function
back to the originl API variable/constants.

'mock' method is only available when the \_\_STATIC\_\_ build flag is on.

Calling an API without mock will log warning messages in \_\_STATIC\_\_ build.

Example:

```javascript
if (__STATIC__) {
  const testPath = '/test/json/Cart/ShoppingCart';
  apiSet.deleteTransaction = apiSet.deleteTransaction.mock(`${testPath}/delete_transaction.json`);
}
```

### *The return value of API call:*

APS calls always return a Promise as we saied above.

The successful result of the Promise is a Response class, which is a wrapper class of the business response defined by the service.


Example:

```javascript
import API from '../api';

API.callService().then(response => {
  console.log(response.success);
  console.log(response.responseCode);
  console.log(response.responseMessage);
  console.log(JSON.stringify(response.headers));
  console.log(JSON.stringify(response.body);
});

```



> **Tips:** We suggest defining all the APIs in an 'api' folder under your business module. In most cases, it is peer to 'actions' and 'reducers' folders.
