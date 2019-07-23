# jest

- vscode 没有api 提示，需要安装 `@types/jest`;

- jest 23 后需要安装jest-watch-typeahead 才能使用过滤文件功能

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
      [参考这个库](https://github.com/clownvary/jest-mock-cases)
      [参考2,mock部分](https://github.com/facebook/jest/issues/936)

     ```js
     // mock es6 的class写法，必须返回一个function 即constructor, 然后内部返回的就是class的实例方法
     // jest.requireActual(xxx)/jest.requireMock(xxx)
      jest.mock('./sound-player', () => {
       return function() {
         return {playSoundFile: () => {}};
       };
      );
      //或者这样，这种可以测试sound-player类是否被调用
      jest.mock('./sound-player',()=>{
        return jest.fn().mockImplementation(()=>
        {
          playSoundFile: () => {}
        })
      })
     ```

  4. mock document event手动触发
    ```js
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("scroll", false, true);
      document.dispatchEvent(evt);
    ====
      const event = new CustomEvent('message');
      event.xxx  = {xxx}//任何自定义对象
      window.dispatch(event)/document.dispatchEvent(event);
    ```
  5.mock 系统变量
  
  ```js
  delete window.location
  window.location = {xxx}
  //或者
  Objeact.defineProperty(window,'location',{xxxx});
  ```