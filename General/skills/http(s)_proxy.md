# Http/Https 代理转发相关知识

## 背景需求

1. 公司现有一站点siteA，上面有很多API调用

2. 电脑多有网络请求必须经过公司代理服务器 proxyCom,否则直接拒绝

3. 需要把siteA上面的API请求过滤出来，自动存贮对应的json数据到指定目录，从而方便后面本地mock api  
   

## 实现思路

1. 创建一个本地的node server, e.g. `localhost:5050`

2. 浏览器使用switchyMega 插件设置代理为`localhost:5050`

3. 浏览器上所有的请求理论上应该全部被该server 拦截，从而截取response，做自定义处理

### Http proxy

这一部分其实很好代理，因为http本身是明文传输，所以设置好代理后，会直接捕捉到所有的请求，直接修改即可，这里使用`node-http-proxy` 这个包，方便实现。

#### 代码实现

http->http

```javascript
const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer(); 
roxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    console.log('RAW request from the target');
});
proxy.on('proxyRes', function (proxyRes, req, res) {
    var body = new Buffer('');
    proxyRes.on('data', function (data) {
        body = Buffer.concat([body, data]);
    });
    proxyRes.on('end', function () {
        body = body.toString();
        console.log("res from proxied server:", body);
        res.end("my response to cli");// 所有的原始请求response都会被该结果重写
    });
});

http.createServer(function (req, res) {
    // 直接转发到原始网站
    proxy.web(req, res, {
        target: 'http://' + req.headers.host,
        target: 'https://proxyCom.com',
        selfHandleResponse: true // false时直接原样转发
    });
    // 实际使用时，因为我们所有的请求要走公司的代理服务器proxyCom,同时还有验证用户，所以设置如下
    // proxy.web(req, res, {
    //     target: 'https://proxyCom.com',
    //     auth:'username:password',// 如果不想明文配置，可以如下以base64编码配置在headers中
    //      headers: {
    //          Authorization: 'the calculation result here' // 浏览器console中使用btoa('username:password')
    //      },
    //     selfHandleResponse: true // false时直接原样转发
    // });
}).listen(9000);

```

https->http

```javascript
// 这里创建一个https 的代理服务器，所以要配置对应的证书，并不是说拦截所有的从浏览器
// 来的请求需要配置ssl,（https必须使用mitm攻击才可以）如果我们不加listen相当于没有创建这个代理的server
// 这个https的代理会把所有的 http 请求加密然后转发到localhost 9009上
httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 9009
  },
  ssl: {
    key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
  }
}).listen(8009);
```

https->https

```javascript
// 这个是创建一个https的代理服务器同时转发所有的http请求到对应的https target
// 所有secure意思是代理服务器转发请求时要不要验证target的证书，这个因为是在node中
// 转发，所以可配置，其实和浏览器设置不检查安全证书是一样的，所以就能理解为什么secure
// 只能在这种case中使用了。 
httpProxy.createServer({
  ssl: {
    key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
  },
  target: 'https://localhost:9010',
  secure: true // Depends on your needs, could be false.
}).listen(8000);
```

### Https proxy

Https 相比http 虽然只多了一个字母，但两者实现的复杂度上，https是要远远超过http的，主要是相关的概念比较多，一定要清楚，所以在实现https代理前，我们先了解下相关的概念。

https 访问过程：

![https_procedure](../../resource/https_procedure.png) 

核心过程主要在4, 这里客户端浏览器要去验证服务端发来的证书的合法性，一般是某个权威的CA证书机构颁发的证书，其实证书就是秘钥，所以结论如下：

- CA证书: 核心的颁证机构，也叫根证书，一般是各大机构和操作系统厂商合作预置在用户系统或者浏览器当中

- server 证书: 是在权威CA机构申请的、对应某个域名服务器的证书
  
  所以访问时是浏览器去验证服务端发来的证书是不是`从其系统内根证书（CA）`所申请来的，千万别把两种证书搞混了。

明白了以上概念，我们大致的实现思路也就有了，如下：

1. 创建一个自己的CA根证书，并添加到系统的信任组当中

2. 通过该CA 创建我们要拦截的的对应的站点证书（自动创建），这样在自己这台电脑上，就能通过浏览器的安全验证

3. 创建一个https的server, 动态导入上一步的证书和私钥，这样就能让本地的请求以为我们的server就是它要访问的真实server,达到欺骗的效果

4. 我们的server 转发原始的请求到真实的server上同时拦截返回的请求，做完处理后，再返回给原始的请求

    以上过程，类似于在客户端和服务器端加了一个透明的中间人，两头并不会感知到中间人的存在，所以该过程也称为man in the middle, 即 mitm, 是一种非常危险的攻击方式。

#### 代码实现

这里我们使用`http-mitm-proxy`这个库来实现

```javascript
var Proxy = require('http-mitm-proxy');
var proxy = Proxy();

proxy.onError(function(ctx, err) {
  console.error('proxy error:', err);
});

proxy.onRequest(function(ctx, callback) {
  // ctx(context),当前这个请求的上下文
  if (ctx.clientToProxyRequest.headers.host == 'www.baidu.com'
    && ctx.clientToProxyRequest.url.indexOf('/s') == 0) {
    ctx.use(Proxy.gunzip);

    ctx.onResponseData(function(ctx, chunk, callback) {
      chunk = new Buffer(chunk.toString().replace(/百度/g, '<h3>鸡你太美!</h3>'));//这样会把百度搜索结果中的所以‘百度’字符替换成目标字符，可以自定义我们的其他处理
      return callback(null, chunk);
    });
  }
  return callback();
});

proxy.listen({
	port: 9000
}, e => {
	console.log('proxy listening')
});
```

需要注意的有三点：

1. 可能需要关闭代理发https请求到目标站点的安全检查，`ctx.proxyToServerRequestOptions.rejectUnauthorized  =  false;`[参考](https://github.com/joeferner/node-http-mitm-proxy/issues/60)

2. 在运行以上代码后生成的`.http-mitm-proxy`文件夹中我们需要找到`ca.pem`然后导入到系统的根证书列表中，导入方法可自行查询

3. 查阅文档可发现，`proxy`实例和`ctx`几乎拥有一模一样的生命周期方法，一开始不理解，后来发现其实就是两者控制范围的不同，前者的范围是所有的请求，后者只是当前请求，所以一般针对某个请求的过滤或者特殊处理，可以放在ctx的生命周期中，全局的一些处理放在proxy中

一般情况，以上实现我们就能拦截到对应的请求，但由于我们的请求必须经过公司的proxyCom,所以还得需要补货到的请求**先转发到proxyCom**，由于`http-mitm-proxy`并没有提供**代理的代理** 这样的功能，这里经过查阅资料找到以下解决方案，`node-https-proxy-agent`

#### 最终实现如下

```javascript
var Proxy = require('http-mitm-proxy');
var HttpsProxyAgent = require('https-proxy-agent');
var proxy = Proxy();

var agent = new HttpsProxyAgent({
    host:'https://proxyCom.com',
    port:80,
    headers: {
        Authorization: 'the calculation result here' // 浏览器console中使用btoa('username:password')
    }
});

proxy.onError(function(ctx, err) {
  console.error('proxy error:', err);
});

proxy.onRequest(function(ctx, callback) {
  ctx.proxyToServerRequestOptions.rejectUnauthorized = false; // 关闭代理发https请求到目标站点的安全检查
  if (ctx.clientToProxyRequest.headers.host == 'www.baidu.com'
    && ctx.clientToProxyRequest.url.indexOf('/s') == 0) {
    ctx.use(Proxy.gunzip);

    ctx.onResponseData(function(ctx, chunk, callback) {
      chunk = new Buffer(chunk.toString().replace(/百度/g, '<h3>鸡你太美!</h3>'));
      return callback(null, chunk);
    });
  }
  return callback();
});

proxy.listen({
	port: 9000,
	httpAgent: agent, // 添加agent
	httpsAgent: agent
}, e => {
	console.log('proxy listening')
});
```












