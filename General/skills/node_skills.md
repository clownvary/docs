# node_skills

- exports/module.exports [参考](http://weizhifeng.net/node-js-exports-vs-module-exports.html)

    1. 模块导出的最终是module.exports,exports只是前者的一个引用
    2. 如果想把文件导出成一个*特殊的类型，比如类，数组等*，使用moudle.exports, 如果只是想导出实例请使用exports导出一个*实例*
- Buffer 在node中是一个全局变量
- global

    1. __filename/__dirname

    是指当前脚本的模块路径/目录路径，process.cwd()是指node进程的工作目录，不一样
    2. process

        * process.argv :返回执行当前脚本的命令参数数组，如`node main.js ip`，返回
    ```node
    [ '/usr/local/bin/node',
    '/Users/garywang/work/learn/python/node/global.js',
    'ip' ]
    ```
        * process.env :返回shell的环境变量，一般用来判断开发环境，和argv不同
        * process.execPath : 返回node二进制程序的执行路径
- child_process 子进程，一般用来开启新的shell,执行命令等。[参考](http://www.runoob.com/nodejs/nodejs-process.html)
    每个子进程带有三个流，child.stdin, child.stdout 和child.stderr，

    * exec(command[, options], callback),有callback,会把子进程命令的结果以stdout的形式返回，如`callback(err,stdout,stderr)
    `,注意option对象可以设置一些环境变量之类的配置 适合返回数据量不大的命令

    * spawn(command[, args][, options),*没有callback*
     如`spawn('node',['index.js','-ip'])`,就是把所有的参数都和命令分开了。

    * fork(modulePath[, args][, options])是spawn的特殊类型，*注意参数格式，直接是模块名称不是命令*,会创建一个V8实例，出来除了拥有所有的spawn实例方法以外还有一个和父进程通信的信道,通过监听'on','message'方法来通信，*只有fork能通信*

    > parent.js

    ```node
    console.log('parent pid: ' + process.pid);
    var fork = require('child_process').fork;
    //fork方法返回的是子进程
    var child = fork('./child.js');
    console.log('fork return pid: ' + child.pid);
    child.on('message', function(msg){
        console.log('parent get message: ' + JSON.stringify(msg));
    });
    child.send({key: 'parent value'});

    ```

    > child.js

    ```node

    console.log('child pid: ' + process.pid);
    process.on('message', function(msg){
        console.log('child get message: ' +      JSON.stringify(msg));
    });
    process.send({key: 'child value'});
    ```

- readline

    每次读取用户输入的一行，常用来做交互、单行读取文件
    ```node
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '请输入> '
    });
    
    rl.prompt();
    
    rl.on('line', (line) => {
      switch (line.trim()) {
        case 'hello':
          console.log('world!');
          break;
        default:
          console.log(`你输入的是：'${line.trim()}'`);
          break;
      }
      rl.prompt();
    }).on('close', () => {
      console.log('再见!');
      process.exit(0);
    });

    ```