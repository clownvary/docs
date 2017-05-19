- mocha

describe/it.only(xx)只执行当前用例

describe/it.skip(xx)跳过当前用例

- enzyme

	- shallow(shallow<ele>) 只在虚拟dom中渲染第一层（未使用嵌套组件的情况下），大部分情况下应该使用这种
	- full (mount<ele>)加载到真实dom,当需要测试liftcycle,或者使用了自定的嵌套组件， 和有DOM交互的地方使用
	- static(render<ele>) 渲染成html字符，和shallow区别在于使用了第三方库，一般不常用，和shallow功能一样

  1. simulate（‘xx’，{target:{value:text}}）,事件统一没有on前缀，直接是事件名，第二个事件参数是一个模拟对象会和event对象合并到一起传入到事件当中,如：

    ```
      <input click={(e)=>{testFunc(e.target.value)}}/>
      input.simulate('click',{target:{value:123}});
      //用到了哪个属性就模拟哪个属性
    ```
- sinon 

spy,stub,mock,称为test double
	1. 都是针对***方法***的测试
	2. 主要用在有边际效应的方法中（即不是纯方法中中，纯方法给定指定参数会返回相同的结果），比如依赖数据库调用，当前时间，随机变量等

	还有一些应用在耗时比较长（异步），或者需要抛出错误的时候来模拟使用
  
  > 一般都是结合chai断言库使用，很少用sinon.assert


  ```

     it('should call save once', function () {
       //save is a method
          var save = sinon.spy(Database, 'save');
          setupNewUser({ name: 'test' }, function () { });
          save.restore();
          // sinon.assert.calledOnce(save);
          // these all is properties of spy,not method
           expect(save.callCount).equal(1);

      });

  ```

	- spy 

	 测试次数，测试调用参数

  - `spy.withArgs(arg1[, arg2, ...]);`,以该参数怎么怎么样之类的

    ```
        "should call method once with each argument": function () {
        var object = { method: function () {} };
        var spy = sinon.spy(object, "method");
        spy.withArgs(42);
        spy.withArgs(1);

        object.method(42);
        object.method(1);

        assert(spy.withArgs(42).calledOnce);
        assert(spy.withArgs(1).calledOnce);
       }
    ```

	- stub
	 替换原始方法，可以添加自定义的行为或抛出异常,

    - 测异常

      ```
      it('should pass the error into the callback if save fails', function () {
        var expectedError = new Error('oops');
        var save = sinon.stub(Database, 'save');
        save.throws(expectedError);
        var callback = sinon.spy();

        setupNewUser({ name: 'foo' }, callback);

        save.restore();
        //save抛出了错误，try 出错 在catch里捕获到了错误，callback调用了错误，所以要验证catch里的callback
        //这条路径，不是验证save是否抛出了异常
        // sinon.assert.calledWith(callback, expectedError);
         //expect(save.threw(expectedError)).to.be.true;
        //expect(callback.threw(expectedError)).to.be.false;
        
        });
      ```

    - `stub.onCall`,指定第几次调用后的行为，类似的onFirstCall...

    ```
    var callback = sinon.stub();
    callback.onCall(0).returns(1);
    callback.onCall(1).returns(2);
    callback.returns(3);

    callback(); // Returns 1
    callback(); // Returns 2
    callback(); // All following calls return 3 
     }

    ```
    - `stub.yields([arg1,arg2...])`,让stub执行它的第一个回调，如果有参数，以参数执行
    注意yields以后都必须在后面手动触发下

    ```
      function saveUser(user, callback) {
      $.post('/users', {
        first: user.firstname,
        last: user.lastname
      }, callback);
      }

     it('should call callback after saving', function() {

    //We'll stub $.post so a request is not sent
    var post = sinon.stub($, 'post');
    //以www参数执行callback
    post.yields('www');

    //We can use a spy as the callback so it's easy to verify
    var callback = sinon.spy();

    saveUser({ firstname: 'Han', lastname: 'Solo' }, callback);

       post.restore();
       sinon.assert.calledOnce(callback);
       //注意看这个
       sinon.assert.calledWith(callback,'www');
     });
       
     
    ```
    - `stub.yieldTo`,//以给定的参数行驶指定的回调，后面调用就会按照指定的行为执行，相当于替换了原来的异步方法
   
    ```
       //以参数[1，2，3]触发success
       sinon.stub(jQuery, "ajax").yieldsTo("success", [1, 2, 3]);
        jQuery.ajax({
        success: function (data) {
            assertEquals([1, 2, 3], data);
        }
       });

    ```
    - `stub.callsFake(fakeFunction);`,模拟新的调用行为
    
    ```
    var myObj = {};
     myObj.prop = function propFn() {
         return "foo";
     };

     sinon.stub(myObj, prop).callsFake(function fakeFn() {
         return 'bar';
     });

     myObj.prop(); // 'bar'
    ```

	- mock 
	 当你使用stub，包装一个方法后，并且想测试该方法在更多场景下的表现时应该使用mock
    其实就是在expect里把原来需要多个assert的东西，更简洁的表现了出来，更方便的声明多种条件，因为多次的assert更难理解
    注意使用时，都是先包装***对象***，再expect（‘method’）.xxx这样

    ```
       
	    it('should pass object with correct values to save only once', function() {
        var info = { name: 'test' };
        var expectedUser = {
          name: info.name,
          nameLowercase: info.name.toLowerCase()
        };
        var database = sinon.mock(Database);
        database.expects('save').once().withArgs(expectedUser);//相当于做了两次assert

        setupNewUser(info, function() { });

        database.verify();
        database.restore();
       });

	 
    ```
   
 


3. Tips 

  - 一直使用sinon.test(),可以自动清理sinon.spy,避免连续失败，注意在测试异步方法时，应该设置
	   ```
	   sinon.config = {
         useFakeTimers: false
        };
	   ```
	```    
	it('should call save once', sinon.test(function() {
      var save = this.spy(Database, 'save'); //注意变成了this.xx
      setupNewUser({ name: 'test' }, function() { });    

      sinon.assert.calledOnce(save);//断言没变
    }));
	```

	- Create Shared Stubs in beforeEach,别忘了在afterEach中添加restore方法，不然会在别的测试中引起异常

	```
	   describe('Something', function() {
     var save;
     beforeEach(function() {
       save = sinon.stub(Database, 'save');
     });

     afterEach(function() {
       save.restore();
     });

     it('should do something', function() {
       //you can use the stub in tests by accessing the variable
       save.yields('something');
         });
       });
	```
	
	- 测试执行顺序

	```
	 var a = sinon.spy();
       var b = sinon.spy();       

       a();
       b();       

       sinon.assert.callOrder(a, b);
	```