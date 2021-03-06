# Docker

[参考](https://blog.csphere.cn/archives/22)
[入门到实战](https://yeasy.gitbooks.io/docker_practice/content/image/pull.html)

### 概念

- 拉取镜像,镜像名都是`镜像:标签`这样的格式
- 数据卷

  就是把本地的文件夹或者文件映射到容器中,从而进行独立于容器的持久化,一般是*使用一个数据卷容器来作为其他容器的共享数据的地方*
  常用步骤
  1. 创建一个数据卷容器`docker run -tdi -v /local/data:/data --name data_s ubuntu:14.04`,注意需要在docker中先设置可以被共享的本地的目录,都是绝对路径
  2. 创建其他容器,调用数据卷容器`docker run -ti --volumes-from data_s  --name web1 ubuntu:14.04`,web1当中就有了这个共享的数据卷,路径目录和数据卷容器一样,（一般都用绝对路径)
  
  demo:

  1. 创建一个基于nginx（目录结构）的数据卷容器

  `docker run -itd --name nginx_data -v /Users/garywang/test_data/nginx_html:/usr/share/nginx/html nginx:latest` (注意必基础镜像的目录必须存在，比如/usr/share/nginx/html 就是nginx首页的目录地址)
  
  2. 在本地的 `/Users/garywang/test_data/nginx_html` 目录中新建index.html,自定义内容

  3. 创建新的nginx容器，vloume 来自nginx_data

  `docker run -itd --name nginx_from_volume -p 2035:80  --volumes-from nginx_data nginx:latest`

  4. 浏览器中访问localhost:2035 就会显示自定义的首页内容。


- 网络
  - 端口映射 

  有-P/-p之分,不一样,前者映射*本地随机一个端口号*到*内部容器的开放端口号*上,后者指定本地端口号和容器端口号（甚至ip）格式 `ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`

  `docker run -d -P training/webapp python app.py` 随机映射

  `docker run -d -p 5000:5000 training/webapp python app.py`

  - 查看端口映射配置
  `docker port ContainerName 5000`,输出127.0.0.1:49155

### 命令

- 运行`docker run -it --name con01 busybox:latest`,和拉取的格式不同

  参数 -i 表示这是一个交互容器,会把当前标准输入重定向到容器的标准输入中,而不是终止程序运行,-t 指为这个容器分配一个终端。
-d 表示守护态运行,即后台运行,使用docker attach ContainerName 进入守护态的容器,按 Ctrl+D  可以退出这个容器了。

  > 每次执行 docker run  命令都会创建新的容器,建议一次创建后,使用 docker start/stop  来启动和停用容器。

- 删除`docker rm $(docker ps -a -q)`

- 查看容器, `docker ps -a`, 如果不加-a 只能列出当前运行的容器, -a 可以列出所有的容器包括已经停止的

- 进入容器

  在使用 -d 参数时，容器启动后会进入后台。某些时候需要进入容器进行操作，包括使用 docker attach 命令或 docker exec 命令，推荐大家使用 docker exec 命令（退出时容器不会结束还会守护态后台运行）


- 创建
  - Dockerfile 创建镜像
    1. 创建名称为‘Dockerfile’的文件,一定要是这个
    2. 当前目录执行命令`docker build -t="ouruser/sinatra:v2" .`, 注意后面的'.', 表示当前路径下
  - Commit 创建镜像
    1. 运行一个容器,在容器中进行必要的修改,退出
    2. 运行命令`docker commit -m "Added json gem" -a "Docker Newbee" 0b2616b0e5a8 ouruser/sinatra:v2`, -a 表示作者信息,后面的ID表示以哪个容器为准（容器ID）,后面是标签
  - push 上传镜像
    dockerhub 完成注册,运行命令`docker push xxx:v1`
- 导出/导入 镜像
  - 导出 `docker save -o ubuntu_14.04.tar ubuntu:14.04`
  - 导入 `docker load -i ubuntu_14.04.tar`,导入时*不用指定名称和标签*,会自动写入保存时的
- 导出/导入 容器
  - 导出 `docker export 7691a814370e > ubuntu.tar`
  - 导入 `docker import ubuntu.tar xxx:version` 需要注意的是导入的结果不是在容器中而是作为新的镜像导入,另外和镜 像导入不同的是*需要手动指定名称和标签*
- logs
  - `docker logs containerName` 打印对应容器的日志

# Dockerfile

- CMD 类似ENTRYPOINT,容器启动时会执行，只执行一次，
- RUN, 镜像初始化安装时执行的语句
- WOOKDIR,为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录
- ONBUILD,配置当所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令

