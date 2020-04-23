# 浏览器缓存

### 机制
- chrome中resource 中的frame是当前的所有缓存文件
- expires /cache-control 前者是http1.0的标准，后者是1.1的标准，当两者同时出现时，一后者的为准
- etag/if-none-match,是一个hash值代表文件的唯一性，如果有此标签，请求会和response的etag去对比，如果不一样说明文件被更改，服务器会返回
200,否则３０４
- last-modify/if-modify-since，是一个事件戳，通过对比最后修改时间，然后交给服务器区判断返回２００还是３０４
- 流程如下
  
![ss](http://ww3.sinaimg.cn/mw690/6941baebgw1eul013c3gmj20fe0eo75e.jpg)