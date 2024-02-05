# Stable-diffusion 

## 重点概念

1. SD中的模型都是叫做checkpoint,文件后缀是.ckpt
2. 网上下载的各种模型也都是基于sd的基础模型的某个版本训练出来的，所以其中已经包含了sd的基础模型，webui中就可以直接选中二次训练的模型
3. texture-inversion 文本倒置， 和txt2img刚好相反，是通过图片解释其内容从而再次生成图片，比如dreambooth, 通过输入个人的照片然后训练出模型，然后在prompt中使用上一步生成模型的唯一标识符来进行二次生成。
举例个人模型生成名称gary（名称就是训练时给的图片的名字），prompt" gary dress a iron man suit"
4. 训练dreambooth模型时有个重要的参数class即类别（人，狗，飞机）等，要告诉SD我们要训练的是啥，还有个regularization的数据集，来修正我们要训练的模型。
比如我要训练的是牧羊犬，我先导入30张一个牧羊犬的图片，类别输入dog,不必输入牧羊犬，类别不用很精细，regularization的数据集里不需要上传牧羊犬照片，只需要各种各样的狗的照片就行了，不然训练时可能会把牧羊犬拟合偏移成其他的东西，总结就是用来更精确的修正要训练的目标的数据集。
5. 换脸方法
    1. dreambooth训练模型，使用prompt 生成,优点可以学习和生成多样的作品，缺点模型体积大
    2. img2img中 inpanting，遮罩只生成头部
    3. embedding,优点体积小（只有4k）,可以应用于使用相同基础模型（通常是SDv1.5）的任何模型,缺点是它无法学习新内容，**需要关键字触发**

## Lora模型

1. 图像选择质量要高，符合以下要求：
    a. 50-100张，1/3 面部特写，包含不同角度，1/3半身，1/3全身
    b. 单一人物，背景干净
    c. 清晰像素高
    d. 统一命名，统一大小
    e. 打标，参考 https://www.dfldata.xyz/forum.php?mod=viewthread&tid=12983&extra=page%3D1
2. regularization 图像集要求，尺寸和模型图片尺寸一样
3. Hires高清修复
   取样方法：emuler-a/DPM++2M karras（生成的鼻子更真实）
  a. 先生成一堆小图，选择比较满意的，然后设置seed
  b. 开启高清修复，
     - 取样一般选:
       ESRGAN_x4/LDSR(搭配DPM++2M karras) ,重绘幅度Denoising 0.4~0.5
       潜变量（bicubic抗锯齿）（搭配emuler-a),重绘幅度Denoising < 0.25
     - 高清修复steps < 10
# Img2Img inpainting 经验

1. 素材需要高清，不是指分辨率高，而是内容清晰，这将直接影响inpaint only mask绘画的质量，可以先用gigapixel 1倍高清化再做之后处理
2. 尽量使用only mask, 只绘制mask区域速度快，保留原图细节
3. mask区域绘制 比如胸部，尽量画到脖子，给足上下文
4. propmt只描述mask区域内容，denoising 不要太高，一般6左右，可以和原始衣物完美融合，太高会有割裂感 
5. 当想绘制身体上半部和下半部或其他不连续mask 区域时，最好先生成一部分再在其基础上生成另一部分
6. 如果多次都生成不了理想的效果，可以在相对较好的一张图的基础上调整参数再次inpaint，提高出图率

# 高清化经验

- 局部再次mask生成，denosing调低一点即可，相当于重绘mask区域，mask 的width/height适当调高即可生成高清局部
相当于模糊的地方都可以高清化