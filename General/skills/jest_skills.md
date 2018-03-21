- 断言基本没变化
- only,skip和mocha相比有变化，***作用域不再跨文件***，只在该测试文件内有效。
- mock 函数，使用jest.fn()创建
    - mock属性
    - mockImplementation/mockImplementationOnce
    - mockReturnValue/mockReturnValueOnce
- jest常用
    - spyOn()
    ```
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
    - snapshot 测试
     即首次运行保存某个组件的渲染快照，之后每次渲染都和快照进行比对，如果不匹配就失败，如果组件后面有修改，需要更新快照文件，`jest --updateSnapshot`
    -mock modoule

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
    // index.spec.jsx
  
    ```js
    import index from 'index';
    // 放在代码块前
    jest.mock('./tools',()=>{
      return {
        android: false
      }
    });
    这样测试文件的上下文运行时，index.jsx中的android就是false了，并不是只有在测试文件上下文中主动调用mock的东西才会生效。

    ```




