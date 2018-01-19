## Grid Layout

[参考这个](https://www.jianshu.com/p/d183265a8dad)

- 类似flex
  ```
  wrapper div:
   display: grid;
   grid-template-columns: 100px 10px 100px 10px 100px 10px 100px; //设置列宽度，有几个值就有几列，auto时自动填充剩余的宽度，
   用fr单位可以将容器分为几等份，例如下面分成三等份 grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: auto 10px auto 10px auto;
  child div:
   grid-column-start: 1; 
   grid-column-end: 2;
   grid-row-start: 1; 
   grid-row-end: 2
   简写一：
   grid-column:1 / 2;
   grid-row:1 / 2;
   简写二：
   grid-area: 1 / 1 / 2 / 2;//row start,column start,row end,column end

  ```
定义在网格容器上的属性

- grid-column-gap/grid-row-gap

  网格列间距
  ` grid-row-gap: 15px;`
  简写
  `grid-gap:15px 15px;`
- justify-items/align-items/justify-content/align-conten
  
  主轴/辅轴/网格区域 对齐
  justify-content/align-conten 当网格区域小于网格容器时生效
- grid-auto-flow : row（默认） | column | dense ;
  
  在没有设置网格项的位置时，这个属性控制网格项怎样排列。
  row: 按照行依次从左到右排列。
  column: 按照列依次从上倒下排列。
  dense: 按先后顺序排列。

定义在网格上的属性

- grid-column-start

- grid-column-end

- grid-row-start

- grid-row-end

- grid-column

- grid-row

- grid-area

  定义网格项名字，可以是名字或者网格线区域
  `grid-area:header; 或者 grid-area:1 / 1 / 2 / 2;`

- justify-self

- align-self
  
