# chrome skills

## More tools

### NetworkCondition , (`shift+cmd+p NetworkCondition` quick start )

This tools have many agent that can simulate **different browsers** to debug.

### Request Blocking, (`shift+cmd+p Blocking` quick start )

Using scenario

1. some request that can't visit in local, e.g `xx.google.com`, and it will block network request , so we can use this tool to block that requests speed network request.

### Living debug

- solution 1

pen `sources` tab , select a js to debug, change code directly and `ctrl+s`will save code temporary, this is a awesome feature for debugging

- solution 2

using `overrides`, (chrome->sources tab->overrides)

[see this](https://segmentfault.com/a/1190000016612065)

> Notice `overrides` is different with `Filesystem(workspace)`, workspace like IDE ,it make you can change/save original file in chrome, `overrides` just save temporary.

### Mobile Capture (`shift+cmd+p  capture` quick start)

This will capture screen or full size screen

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
