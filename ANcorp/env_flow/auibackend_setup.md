# Aui setup (Osx sys)

## Prepare

1. clone below projects to your customize folder,all below place into a same folder

   [buildtools](https://gitlab.dev.activenetwork.com/PlatformServices/buildtools)

   [ActiveNetPackage](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-package)

   [activenet-common](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-common)
    
   [activenet-servlet](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-servlet)

2. install jdk,set `$JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_121.jdk/Contents/Home`(if use zsh,then in ~/.zshrc)

3. goto activenet-servlet folder ，run cmd `./ant.sh fullclean main`, if you need to skip test case step , you should edit "build-core" file of build-tools `<target name="main" depends="init,resolve,build,_build-tests,_jar,codegen,_deploy-local">`, remove `_build-tests`;

> if using docker. You need to update DB when have new release , execute `java -jar kitrunner-1.1-SNAPSHOT.jar`


4. in step 3 folder run cmd `./ant debug`,then visit[http://localhost:8080/linux01/servlet/processAdminLogin.sdi](http://localhost:8080/linux01/servlet/processAdminLogin.sdi) app will run,if u want to stop it

5. ~~cd `/Users/garywang/active/ActiveNetServlet/config`~~,
  
   cmd `./start_service.sh`
   > if use other database ,replace files sdi.ini&service.properties

   then visit [http://localhost:8080/linux01/servlet/processAdminLogin.sdi](http://localhost:8080/linux01/servlet/processAdminLogin.sdi)

   app will run,if u want to stop it
   cmd `./stop_service.sh`

## Tips

1. if server has wrong , u need kill java process then restart server