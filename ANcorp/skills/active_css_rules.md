### active.css注意
1.BEM命名
`block__element--modifier`,如`person__male--hand`
2.state
`dropdown.is-open`,使用'.'，is-,has-
    - 不可单独使用
    - 必须驼峰命名
和modifier区别如下：
    - state可以用在布局或者component上
    - state表明这个是一个有可能改变的状态，modifier定义后就不能改变
3.钩子
    - `u-`,表明是工具类，如u-clearfix
    - `t-`,表明是主题
    - `js-`，表明是js钩子，用js来控制

4.规则

    - 不要使用id选择器 

5.使用
- inputgroup,`form__group form__group--warning`，在这个级别上添加，formgroup一样
- formgroup ,...
- 几乎每种组件有自己的size控制，如`checkbox--xl`,...,注意radio-group是没有size的直接在radio上用size控制
- grid,格式如下，
    ```
    // .grid-u-*-12,表示无论在什么屏幕下 都按设置显示
    .grid-u-12-12 .grid-u-sm-6-12 .grid-u-md-4-12 .grid-u-lg-3-12
    ```

6. `infofar == alert alert-info alert-info-inverse`

