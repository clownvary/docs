# MagicaVoxel

## 使用提示


1. Brush -> setting - HDPI 关闭，提升性能

2. 特殊形状如楼梯 圆环等可以在笔刷中的shader中通过设置参数进行绘画  y

3. 鼠标画完一个图形时，**按住cmd键**，会显示该对象的轴，可以拉伸调整，最重要的如果是用shader画的，可以保持聚焦，然后动态调整参数实时看到效果

4. x 红 y 黄 z 蓝

5. 世界地图中可以对大场景中的对象使用layer （分层）管理，选中一个对象，然后点击想放入层*数字前的箭头*,不是数字本身，点击数字小圆点隐藏该图层

6. shader 使用时实时显示参数调整后效果操作： 1. 左侧brush选择shader, attach 2.右侧选择shader,3. 使用鼠标直接画，而不是点击执行按钮

7. 建议使用大小256x256x256, 这样模型更顺滑有细节，默认40出来的完全不是一个效果

## 快捷键

1. 按下shift 删除笔画

2. x+click 新建焦点

3. 选中选区后 ctrl+click 配合转动视图可以随意移动选区

4. ctrl+d 取消选区

5. shift + 选择 多选，shift+alt+选择 减选

6. G 移动物体到地面

7. shift+物体移动箭头 是复制该对象，和ctrl c/v不同，这个是针对整个对象整体

8. 选中多个物体按U融合成一个，和分组不一样(window 不生效)

9. 复制时，多用repeat功能 而不是ctrl c/v

10. shear 切边，快速切出阶梯，屋顶等

11. 色板左边可以加备注

12. 色板中 选中某个颜色 cmd+alt+拖动（ctrl+alt windows），设置选中颜色的渐变， 两端选择两个颜色会在两种颜色之间渐变

13. 色板中选中多个颜色，右键rand 随机填充颜色，和rand命令一样






## Render

1. 材质选发光的时候，可以在摄像机选项中开启bloom,选择面数，大小等调整光线


## command

1. rand 1 10

随机填充色板1到10号颜色，从左下角开始数，1开始计数
常用来做随机效果，完后再删去某一种或几种颜色的色块，形成凹凸不平的效果

2. pal mask

在色板标注出未使用的颜色

3. maze 

如maze 8 生成边长长度为8的迷宫

## 疑问

1. 立体画笔必须基于某个点才能画，所以不能直接在空间中画一个东西出来，可以现在地面画个柱子，再基于柱子去定位去画，最后删除柱子即可

2. 氛围渲染

    - 太阳、光照强度（阴天，晴天），光照角度
    - 天空，颜色
    - 雾气

3. shader画完后物体选择消失，没法调节参数

## 插件和软件

- Jsplacement https://windmillart.net/?p=jsplacement
  8k地图生产器

## Shaders

- List https://github.com/stars/clownvary/lists/voxel
- ArtChanny https://drive.google.com/drive/folders/10sfl7Og5uspGtCWsp1S2_fDdPbKGkuDW
