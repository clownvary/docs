Aui setup (Osx sys)
All below place into an same folder
1.  [buildtools](https://gitlab.dev.activenetwork.com/PlatformServices/buildtools)

    [ActiveNetPackage](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-package)

    [activenet-common](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-common)
    
    [activenet-servlet](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-servlet)
2. install jdk,set `$JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_121.jdk/Contents/Home`(if use zsh,then in ~/.zshrc)
3. cd activenet-servlet ，run cmd `./ant.sh fullclean main`
4. cd `/Users/garywang/active/ActiveNetServlet/config`,
  
   cmd `./start_service.sh`
   > if use other database ,replace files sdi.ini&service.properties

   app will run,if u want to stop it
   cmd `./stop_service.sh`



