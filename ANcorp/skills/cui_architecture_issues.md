- action 中，dispatch时传递的参数只能是对象，或者单个参数，不能是数组或其他
    ```
    //以下是错误的，可以直接提取，默认都是对象，因为提取的时候就会包一层
     API.getCardList().then((response) => {
      const { body: payload } = response;//我们虽然要的是list,但只能取body,不能直接取list，因为是数组
      ///response
      //{body:list:[{},{}]}
      dispatch(uiGiftCardListRaw(payload));
    });
    dispatch(uiGiftCardListRaw(payload));
    ```