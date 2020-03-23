# chrome skills

## Tricks

- [NetworkCondition](#NetworkCondition)
- [Request Blocking](#Request-Blocking)
- [Living Debug](#Living-Debug)
- [Mobile Capture](#Mobile-Capture)
- [Copy Debug Variable](#Copy-Debug-Variable)

### NetworkCondition

> quick start  `shift+cmd+p NetworkCondition` 

This tools have many agent that can simulate **different browsers** to debug.

### Request Blocking

> quick start `shift+cmd+p Blocking` 

Using scenario

1. some request that can't visit in local, e.g `xx.google.com`, and it will block network request , so we can use this tool to block that requests speed network request.

### Living Debug

- solution 1

pen `sources` tab , select a js to debug, change code directly and `ctrl+s`will save code temporary, this is a awesome feature for debugging

- solution 2

using `overrides`, (chrome->sources tab->overrides)

[see this](https://segmentfault.com/a/1190000016612065)

> Notice `overrides` is different with `Filesystem(workspace)`, workspace like IDE ,it make you can change/save original file in chrome, `overrides` just save temporary.

### Mobile Capture

> quick start `shift+cmd+p  capture`

This will capture screen or full size screen

### Copy Debug Variable

*using scenario*

When your debug is blocking, you can see a variable value, if value is an object , it's not easy to copy or console whole properties, using `copy` command ,you can easy did it.

1. debug and block
2. execute `copy(variable)` in console panel, then you can paste all properties everywhere. 

### Console API

- console.count(obj)/console.countReset(obj)
- console.group(obj)/console.groupEnd(obj)
- console.time(obj)/console.timeEnd(obj)
- console.table(obj)

### Performance 

[see this](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)

> 注意找main时间线里那些function色块有红色脚标的，一般表示这个function有性能问题

### Audit

[see this](https://developers.google.com/web/tools/chrome-devtools/speed/get-started)
