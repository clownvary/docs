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
- 项目结构
    - intl
        如果组件使用injectInl包裹，则intl（intl这个库自有的属性）就被注入组件的props，不用在顶层注入了，intl的内容（defaultLocale、messages等）在appRoot中已经设置好了，所以直接拿就行

    - 各种路径

        * webpack中路径，
        ```
        resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.json'],
        modulesDirectories: ['src', 'i18n', 'test/json', 'node_modules']//
        解析目录名的一个数组到当前目录以及先前的目录，并且是查找模块。这个函数和node怎么找到node_modules很像。比如如果值为["mydir"]，webpack会查找“./mydir”, “../mydir”, “../../mydir”,等等.
        所以这样写了后，文件中直接import from "shared/xxx",就会在src,i18n等目录下查找。

        这个是解析模块路径，和这个webpack的配置文件在哪里无关，因为直接都是文件夹名称开头，表示相对于当前的工作目录的路径，工作目录就是cui/....
        
        一般都用这种写法
           },
           {
      test: /\.json?$/,
      loader: 'json?name=[path][name].[ext]',
      include: [path.resolve('test/json/')]//path.resolve（）返回解析的绝对路径，比如这个就会返回cui/test/json/...
        },

        ```
        * less 文件路径
        ```
        @import "../variable.less" 不同于css的import， import url(xxxx),语法不同

        ```
        less中如果路径中含有‘~’，比如‘~active.css/less/xxx’表示从webpack resolve的路径中去找，
        同样的原理在js或jsx中没有‘~’表示直接在resolve的文件夹下寻找，如‘import * from 'shared/xxxx' 
        如果只是相对当前目录的直接用`./`或者`../`这种,如下
        ```
        @import "~active.css/less/components/form";
        @import "./core/reset.less";

        ```

    - 组件中除了顶层的容器组件之外，其他内部组件都是无状态的，connect的时候只能传入action,不要传入state,这样也方便后边测试


- 测试
    - 组件测试
        - defaul/class,如下
        ```
           // A.jsx
           export class A extends React.PureComponent
           {
           }
           export default injectIntl(connect(
             state,
             dispatch
           )(A));
           
           // A.spec.jsx
           import {A} from 'A'; // like this
           import A from 'A'; // do not like this
           
           import { mountWithIntl } from 'utils/enzymeWithIntl';
           const component = mountWithIntl(<A/>)
        ```
        测试包含connect()的组件时，要使用import class 而不能使用default(但有一种例外，测试中(嵌套组件)如果要.find(xxComponent), import时就要import default的)
        编写包含connect()的组建时，要使用import default，而不能使用class

       - 测试组件内部方法或属性，使用component.instance()
         ```
          class A extends React.component{
            handleClick(){
              xxxx
            }
            componentDidMount(){
              xxx
            }
          }
          // 内部方法测试
           const { component } = setup();
           const _ins = component.instance();
           const spy = expect.spyOn(_ins,'handleClick');//这样就能spy上
           //_ins.handleClick()就可以访问到
           ...
           // 声明周期测试
          //  需要注意的是一定要在组件中声明的方法或者生命周期方法才可以测试
          const spy = expect.spyOn(_ins,'componentDidMount');//这样就能spy上           

         ``` 
