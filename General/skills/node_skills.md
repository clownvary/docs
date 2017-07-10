## node_skills

- exports/module.exports [参考](http://weizhifeng.net/node-js-exports-vs-module-exports.html)
    
    1. 模块导出的最终是module.exports,exports只是前者的一个引用
    2. 如果想把文件导出成一个*特殊的类型，比如类，数组等*，使用moudle.exports, 如果只是想导出实例请使用exports导出一个*实例*
- Buffer 在node中是一个全局变量
- global

    1. __filename/__dirname
    2. process

        * process.argv :返回执行当前脚本的命令参数数组，如`node main.js ip`，返回
    ```
    [ '/usr/local/bin/node',
    '/Users/garywang/work/learn/python/node/global.js',
    'ip' ]
    ```
        * process.env :返回shell的环境变量，一般用来判断开发环境，和argv不同
        * process.execPath : 返回node二进制程序的执行路径
- child_process 子进程，一般用来开启新的shell,执行命令等。[参考](http://www.runoob.com/nodejs/nodejs-process.html)
    每个子进程带有三个流，child.stdin, child.stdout 和child.stderr，
    * exec(command[, options], callback),有callback,会把子进程命令的结果以stdout的形式返回，如`callback(err,stdout,stderr)`,注意option对象可以设置一些环境变量之类的配置
    适合返回数据量不大的命令
    * spawn(command[, args][, options),*没有callback*
     如`spawn('node',['index.js','-ip'])`,就是把所有的参数都和命令分开了。
    * fork(modulePath[, args][, options])是spawn的特殊类型，*注意参数格式，直接是模块名称不是命令*,会创建一个V8实例，出来除了拥有所有的spawn实例方法以外还有一个和父进程通信的信道,通过监听'on','message'方法来通信，*只有fork能通信*


