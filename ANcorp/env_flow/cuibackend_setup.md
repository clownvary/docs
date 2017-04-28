Cui setup (Osx sys)
1. Setup Aui backend, read this [doc](./auibackend_setup.md) 
2. clone [ActiveNetCui](git@gitlab.dev.activenetwork.com:ActiveNet/activenet-cui.git) into the same folder place as ActiveNetAui
3. cd ActiveNetCui folder ，run cmd `./ant.sh fullclean main`
5. replace your local hosts file(u can get it from your mentor)
6. cd ActiveNetCui folder,run cmd `./ant debug`
7. visit[https://apm.activecommunities.com/cuiuat01/activenet_login](https://apm.activecommunities.com/cuiuat01/activenet_login)
7. click myCart link in page,then instead *http* of *https*,and append port *8099* to url 

 note:

    - *local dev mode*,u need to append `127.0.0.1 apm0.active.com` to hosts

    - *remote reality mode*,u need to annotate `127.0.0.1 apm0.active.com` in hosts
> PS: 
1. if server has wrong , u need to kill java process then restart server
2. if occur Server error,u need to open `activenet-cui/src/main/config/service.properties`file,then modify `cui.default.server=https://andev.active.com/`



