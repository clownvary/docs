# Aui setup (Osx sys)

## Prepare

1. clone below projects to your customize folder,all below place into a same folder

   [buildtools](https://gitlab.dev.activenetwork.com/PlatformServices/buildtools)

   [ActiveNetPackage](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-package)

   [activenet-common](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-common)
    
   [activenet-servlet](https://gitlab.dev.activenetwork.com/ActiveNet/activenet-servlet)

2. install jdk,set `$JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_121.jdk/Contents/Home`(if use zsh,then in ~/.zshrc)

3. goto activenet-servlet folder ，run cmd `./ant.sh fullclean main`, if you need to skip test case step , you should edit "build-core" file of build-tools `<target name="main" depends="init,resolve,build,_build-tests,_jar,codegen,_deploy-local">`, remove `_build-tests`;

> if using docker, see below initial and update parts.

### Initial
  a. connected db, then open `jettytest08`.

  b. execute below sqls to set **local** mode

  ```sql
  select * from dbo.systeminfo where KEYWORD like 'org_cache%'
  
  update dbo.systeminfo SET KEYWORDVALUE='LOCAL' WHERE SYSTEMINFO_ID=2034
  
  ```

  c. find admin user by below sql, (you need to check user name in case of user updated)

  ```sql
  select * from dbo.system_users where SYSTEMUSER_ID=2
  ```

  then set **RETIRED**,**FAILED_LOGON_COUNT** to 0,**NERVER_EXOIRED** to 1, and using this user's **PASSWORDID** into below sql  

  ```sql
  select * from dbo.passwords where PASSWORD_ID=548
  ```

  then change **UPDATED_ON** to nearly date.

### update

a. change kitrunner.properties db configuration

b. two dbs `ActiveNetSites` and `jettytest08` need to update one by one.

c. execute `java -jar kitrunner-2.1-SNAPSHOT.jar`

4. in step 3 folder run cmd `./ant debug`,then visit[http://localhost:8080/linux01/servlet/processAdminLogin.sdi](http://localhost:8080/linux01/servlet/processAdminLogin.sdi) app will run,if u want to stop it

5. ~~cd `/Users/garywang/active/ActiveNetServlet/config`~~,
  
   cmd `./start_service.sh`
   > if use other database ,replace files sdi.ini&service.properties

   then visit [http://localhost:8080/linux01/servlet/processAdminLogin.sdi](http://localhost:8080/linux01/servlet/processAdminLogin.sdi)

   app will run,if u want to stop it
   cmd `./stop_service.sh`

## Tips

1. if server has wrong , u need kill java process then restart server