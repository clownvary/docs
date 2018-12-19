# vscode configuration

## vscode 相关使用技巧

### 快捷键 ：

- cmd+k,cmd+t;格式化选中代码
- cmd+alt+up/down;向上多选光标
- cmd+up/...;到文件头，尾...
- shift+cmd+o;在文件中符号之间导航
- ctrl+g;跳转到指定行
- alt+click;多选光标
- shift+alt按住；自由拖动多行选择
- cmd+d;选中同名的单词，并产生光标

### 操作

- 信息预览；在某个类或者方法上右键“查看定义”，可快速预览
- git diff; 在gitt中选中文件右键，查看diff或者，右键选中一个文件右键“对比“，之后再选择另一个文件即可
- markdown,在编辑的文件中cmd+k v,(v不用同时按cmd),就可以分屏预览了
- snippets,代码片段
cmd+shift+p ,输入snippets选择一种语言，设置对应的代码片段，只有在这种语言下才有效
### snippet 语法

```js
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

### extension

- Jest Runner

1. user setting 中设置jest.pathToConfig 值为项目中jest.config文件的地址

2. 项目必须在一个单独的workspace下，或者是workspace下的主项目

3. 打开某个spec文件，编辑

4. integrated terminal 右上角选择jest， `output` panel查看输出

5. debug, 使用vscode内置debug,不用该插件在it...上显示的debug link, 配置launch.json文件如下

```json
   {
        "name": "test jest vscode",
        "type": "node",
        "request": "launch",
        "env": { "NODE_ENV": "test" },
        "cwd": "${workspaceRoot}",
        "program": "${workspaceRoot}/node_modules/.bin/jest",
        "stopOnEntry": false,
        "args": [
            "--runInBand",
            "--config=jest.config.json" // jest 配置文件路径
        ],
        "runtimeArgs": ["--nolazy"],
        "console": "internalConsole",
        "sourceMaps": false,
        "internalConsoleOptions": "openOnSessionStart"
    }

```

- Debugger For Chrome
> 和浏览器下直接调试一样，好处就是不用开浏览器的调试，可以再vscode里直接调试

1. 项目必须server, 然后配置launch configuration 断点启动调试

```json
    {
        "name": "Debug for chrome(dev)",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:8080/burnaby08/ui.do?method=booking&target_tab_id=tab1",
        "sourceMaps": true,
        "webRoot": "${workspaceFolder}",
        "userDataDir": "${workspaceFolder}/.vscode/chrome"// 存贮调试产生的文件
    }
```