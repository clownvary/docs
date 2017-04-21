- keymap

### Atom 

cmd-right, ctrl-E 移动到一行结束

cmd-left, ctrl-A 移动到一行开始

cmd-up 移动到文件开始

cmd-down 移动到文件结束

ctrl-g 移动到指定行 row:column 处

cmd-J 将下一行与当前行合并

ctrl-cmd-up, ctrl-cmd-down 使当前行向上或者向下移动

cmd-click 增加新光标

cmd-shift-L 将多行选取改为多行光标

alt-cmd-[ 折叠

alt-cmd-] 展开

alt-cmd-shift-{ 折叠全部

alt-cmd-shift-} 展开全部


### vscode 相关使用技巧
- 快捷键 ：

	- cmd+k,cmd+t;格式化选中代码
	- cmd+alt+up/down;向上多选光标
	- cmd+up/...;到文件头，尾...
	- shift+cmd+o;在文件中符号之间导航
	- ctrl+g;跳转到指定行
	- alt+click;多选光标
	- shift+alt按住；自由拖动多行选择
	- cmd+d;选中同名的单词，并产生光标
- 操作

	- 信息预览；在某个类或者方法上右键“查看定义”，可快速预览
	- git diff; 在gitt中选中文件右键，查看diff或者，右键选中一个文件右键“对比“，之后再选择另一个文件即可
	- markdown,在编辑的文件中cmd+k v,(v不用同时按cmd),就可以分屏预览了
	- snippets,代码片段
	cmd+shift+p ,输入snippets选择一种语言，设置对应的代码片段，只有在这种语言下才有效
	> snippet 语法
	
	```
	"For Loop": {
        "prefix": "forx",
        "body": [
            "for (var ${1:index} = 0; ${1:index} < ${2:array}.length; ${1:index}++) {",
            "\tvar ${3:element} = ${2:array}[${1:index}];",
            "\t$0",
            "}"
        ],
        "description": "For Loop"
    }
	```
	主要是body里面的，分三种
	
	1.Tabstops，$0,$1..这种的用来表示游标次序和位置，$1第一，***$0是最后***
	
	2.Placeholders，${1:foo}，1是游标顺序，foo是带填充的名
	称
	
	3.$name,使用系统变量，如$TM_FILENAME,是获取当前文件名称，其余查官方文档
	
- 配置文件

```
{
    "window.zoomLevel": 0,
    "workbench.iconTheme": "vscode-great-icons",
    "workbench.colorTheme": "Monokai"
}
extension:
Beautify
es6snippets
quicktask
vscode great icons
终端命令中打开，安装

```
	