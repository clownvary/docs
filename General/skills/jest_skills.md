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

