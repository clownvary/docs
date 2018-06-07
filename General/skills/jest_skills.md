# jest

- 断言基本没变化
- only,skip和mocha相比有变化，***作用域不再跨文件***，只在该测试文件内有效。
- mock 函数，使用jest.fn()创建
    1. mock属性
    2. mockImplementation/mockImplementationOnce
    3. mockReturnValue/mockReturnValueOnce
- jest常用
    1. spyOn()

    ```js
        const video = {
      play() {
        return true;
      },
    };
    test('plays video', () => {
      const spy = jest.spyOn(video, 'play');//不同于expect的createSpy()
      const isPlaying = video.play();
      expect(spy).toHaveBeenCalled();
      expect(isPlaying).toBe(true);
      spy.mockReset();
      spy.mockRestore();
    });
    ```
    2. snapshot 测试
     即首次运行保存某个组件的渲染快照，之后每次渲染都和快照进行比对，如果不匹配就失败，如果组件后面有修改，需要更新快照文件，`jest --updateSnapshot`
     update snapshoot 也可以使用 w 显示更多里面的 u选项
    3. mock modoule

    使用场景如下：

    // tools.js
    ```js

     export const Browser = {
      android: true
     };
    ```
    // index.jsx

    ```js
     import {Browser } from './tools';
     if(Browser.android){
       ....
     }
    ```
    //方法一 index.spec.jsx

    ```js
    import index from 'index';
    // 放在代码块前
    jest.mock('./tools',()=>{
      return {
        android: false
      }
    });
    这样测试文件的上下文运行时，index.jsx中的android就是false了，并不是只有在测试文件上下文中主动调用mock的方法时才会生效。

    ```
    //方法二 index.spec.jsx

    ```js
    import index from 'index';
    import Browser from '.tools'; //只是一个闭包而已，在当前上下文给它不同的变量，就可以模拟不同的返回
    // 放在代码块前
    const temp_browser = Browser.andoid;
    Browser.android = true;
    your test code;...
    Browser.android = temp_browser;//用完后再还原回去
    也可以用来模拟mock,类似doMock
    比如：
    import API from 'tools';
    //test resolve
    API.fetch = jest.fn(()=>Promise.resolve());
    your test code;...
   // test reject
    API.fetch = jest,fn(()=>Promie.reject());
    ```