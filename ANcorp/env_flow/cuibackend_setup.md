# Cui setup (Osx sys)

## Prepare

1. Setup Aui backend, read this [doc](./auibackend_setup.md) ,then start AUI

2. clone [ActiveNetCui](git@gitlab.dev.activenetwork.com:ActiveNet/activenet-cui.git) into the same folder place as ActiveNetAui

3. goto ActiveNetCui folder ，run cmd `git pull`, `./ant.sh fullclean main`

## Debug

1. open `activenet-cui/src/main/config/service.properties`file,then modify `cui.default.server=https://andev.active.com/`

2. append `127.0.0.1 apm0.active.com 127.0.0.1 int-cart.apm.activecommunities.com` to hosts

3. in cui project , run `npm run build:dev`, then goto ActiveNetCui folder,run cmd `./ant.sh debug`

4. visit[https://apm.activecommunities.com/jettytest11/activenet_login](https://apm.activecommunities.com/jettytest11/activenet_login)

> gwang2/1

5. click myCart link in page,then instead *http* of *https*,and append port *8099* to url

> for better experience of development, you should install a plugin of chrome [requestly-redirect-url-mo](https://chrome.google.com/webstore/detail/requestly-redirect-url-mo/mdnleldcmiljblolnjhpnblkcekpdkpa)

If you can open cui page correctly, means it works,then you can config settings in corresponding aui site.
e.g.[https://andev.active.com/cuiuat02/servelet/adminlogin.sdi](https://andev.active.com/cuiuat02/servelet/adminlogin.sdi)

## Tips

1. if server has wrong , u need to kill java process then restart server

2. if u need debug in dev mode, u should run project firstly using dev mode then start cui_backend

3. cmd `full clean` compile CUI in prod mode,`npm run build:dev` compile CUI in dev mode, prod mode files has hash code ,dev has nothing. when u debug CUI, u just need compile CUI then start it in dev mode, if start in prod mode , it can't using hot reload;
