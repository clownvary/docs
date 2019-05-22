
# Introduction into the deployment toolkit

<!-- TOC -->

- [Introduction into the deployment toolkit](#introduction-into-the-deployment-toolkit)
	- [Preface](#preface)
	- [ActiveNetServlet](#activenetservlet)
		- [Build Command](#build-command)
		- [build-jetty.xml](#build-jettyxml)
			- [fullclean](#fullclean)
			- [main](#main)
	- [Important properties](#important-properties)
		- [buildtools/build-shared.xml](#buildtoolsbuild-sharedxml)
		- [buildtools/windows.xml or unix.xml](#buildtoolswindowsxml-or-unixxml)
	- [Execution sequence of targets](#execution-sequence-of-targets)
		- [init](#init)
			- [-init](#-init)
			- [-classpath-init](#-classpath-init)
			- [-post-init](#-post-init)
			- [resolve](#resolve)
			- [build](#build)
			- [_build-tests](#build-tests)
			- [_jar](#jar)
			- [codegen](#codegen)
			- [_deploy-local](#deploy-local)
			- [-pre-deploy](#-pre-deploy)
			- [_deploy](#deploy)
			- [_apidocs](#apidocs)
	- [Build UI - Facility redesign page](#build-ui-facility-redesign-page)
		- [npm install](#npm-install)
		- [npm run release](#npm-run-release)
		- [node node_modules/gulp/bin/gulp.js release](#node-nodemodulesgulpbingulpjs-release)
		- [Execution sequence of tasks](#execution-sequence-of-tasks)
			- [clean.prod](#cleanprod)
			- [build.prod](#buildprod)

<!-- /TOC -->

## Preface
-------------
As you know, we use the same deployment toolkit/web container after integrate to linux, the environment of runtime is exactly the same, either Prod server or Dev local, Stage server or QA server, whether on Windows or Linux.
To my point of view, learning the deployment scripts is the best way which can help us to solve code-independent issues. This article will describe what buildtools does and how our code is deployed to server.

## ActiveNetServlet
---
### Build Command

This command will be used to call bat file *ant.bat* (Windows) or *ant.sh* (Linux) that under root of project.
```shell
ant fullclean main startup
```
It will be translated to a complete java command by ant.bat/ant.sh after you enter it in the terminal: 
```
"C:\Program Files\Java\jdk1.8.0_65\bin\java" 
-classpath "F:\code\ActiveNet_16_3_AUI\buildtools\ant\lib\ant-launcher.jar"
-Dfile.encoding=UTF-8 
-ms512m 
-mx1024m 
-Dant.home="F:\code\ActiveNet_16_3_AUI\buildtools\ant" 
-Dbuildtools.dir="F:\code\ActiveNet_16_3_AUI\buildtools" org.apache.tools.ant.launch.Launcher 
-buildfile build-jetty.xml 
fullclean main startup
```

You can treat the file *ant.bat* as an initialize tool that is used to find folder *buildtools* and *ant*, it also can call all targets that are included at file *build-jetty.xml*. Maybe you have been noticed that all parameters *fullclean*, *main*, and *startup* we entered in terminal was appended to the final execute statement.

![buildtools](build-tools.png)

### build-jetty.xml

This file imports more ant configuration files:
```xml
<import file="${buildtools.dir}/build-core.xml"/>
<import file="${buildtools.dir}/task-tools.xml"/>
<import file="${buildtools.dir}/task-release-service.xml"/>
```
All of them are used to describe ant targets, like *fullclean*, *main*...

#### fullclean
fullclean target will delete and recreate the *deploy* folder. *deploy folder* is defined at file *buildtools/windows.xml or buildtools/unix.xml*, default value is **c:/active** or **${user.home}/active**)

```xml
<!-- build-core.xml -->
<target name="fullclean" depends="clean" description="Delete classes, generated source and deployment directory">
    <delete dir="${deploy.dir}"/>
    <mkdir dir="${deploy.dir}"/>
</target>
```

#### main
The main target will call ivy to resolve dependencies, compile java source code, generate jars and deploy it to local. 
```xml
<!-- build-core.xml -->
<target name="main" depends="init,resolve,build,_build-tests,_jar,codegen,_deploy-local"/>
```

### Important properties

This property determine the build temporary folder.
```java
/* buildtools/build-shared.xml*/
build.dir = "target"
```

This property will determine the folder where is the deploy root.
```java
/* buildtools/windows.xml or unix.xml */
deploy.root = C:/active
```


### Execution sequence of ant targets

+ init
	+ -init
	+ -classpath-init
	+ -post-init
+ resolve
+ build
    + generateLocales
    + -scala-build
+ _build-tests
    + -scala-build-tests
+ _jar
+ codegen
+ _deploy-local
    + _core-server-path
    + -pre-deploy
        + _apidocs
        + jetty-merge
    + _deploy
    + -post-deploy

![main](main.png)
#### init

#### -init
+ displays the current date and time
+ copy file build.properties.in to build.properties
+ make logs directory
+ make gen-src directory

#### -classpath-init
+ -pre-classpath-init
+ -post-classpath-init

#### -post-init
+ do nothing

#### resolve
+ _ivy-init
+ init
+ _internal-resolve
    + retrieve dependencies
+ _write-classpath
    + make target folder
    + write target/classpath.properties file for properties:
        + buildtools.dir
        + classpath.compile.test
        + classpath.compile.main
        + build.jar

#### build
+ make target/classes folder
+ echo jdk version
+ compile java source to classes folder
+ copy *main/resouces* to classes folder

#### _build-tests
+ make target/test-classes folder
+ compile java test code to test-classes folder

#### _jar
+ buildjar
    + Package Jar
    + jar all classes under target/classes and resources
+ buildjars
    + Package API Jar
    + jar all api-jar-fileset

#### codegen
+ call _generate-wsdl
    + wsgen ANWebServices.ActiveNetWS to /web/web-inf/wsdl/ActiveNetWSService.wsdl
    + delete folder /web/web-inf/wsdl/ANWebServices
    + delete file /web/web-inf/wsdl/*.xsd

#### _deploy-local
+ copy core-server-*.zip (web container, includes config, jetty, lib)
+ copy /runtime/*.jar, /runtime/*.war to target/ziptmp/lib
+ copy /target/lib/build/*.jar to target/ziptmp/lib
+ copy ActiveNetServlet/config/* to target/ziptmp/config
+ fix crlf for all plain text files: *.sh, *.properties, *.txt, *.xml
+ make directory ziptmp/jetty/webapps/, and copy some files to this folder (seems useless for ActiveNet)
+ copy ziptmp/config/service.properties to target/lib/service.properties, meanwhile, use regex to replace some varible, e.g. appVersion...

#### -pre-deploy
+ _copy-device-libs
    + -copy-device-files
        + copy device-libs to target/device-lib
        + copy applets from runtime folder to target/device-lib (will use regexmapper to remove the version in filename)
    + copy target/device-lib to deploy.dir/jetty/servlet
    + copy target/device-lib to ziptmp/device-lib 
    + _sign_jars
        + use signjar to sign jars, the keystore ../cert/recnet.keystore 
+ _build-AN-zip
    + zip all classes under target/classes
+ _redo_junit
    + restore the junit related jars to prepare running
+ _undo-core-server
    + restore jars of the web container (jetty)
+ copy ActiveNet.zip to ziptmp/config/ActiveNet.zip
+ copy ActiveNet.zip to deploy.dir(c:/active)/config/ActiveNet.zip
+ copy config/context.xml to ziptmp/jetty/webapps/context.xml
+ copy config/context.xml to deploy.dir(c:/active)/jetty/webapps/context.xml
+ _apidocs
+ jetty-merge

#### _deploy
+ copy zip to target root dir (c:/active)
+ chmod 755 for files under config: *.sh, *.pl, *.pm (make it executeable on linux)

#### _apidocs
+ _docs-test-init
    + get all *ControllerTestCase.classes
    + delete logs folder
    + make logs folder
+ _docs-test-core
    + create pathing.jar to prepare test
    + junit all *ControllerTestCase.class (batch test)
+ _docs-generation-windows
    + execute build-docs.cmd
+ _docs-generation-linux
    + execute build-docs.sh

![build](build-jetty.png)  


## Build UI - Frontend
-----------

```cmd
@REM build-ui.bat
mvnw package -Dmaven.test.skip=true -Dmaven.install.skip=true -Dmaven.resources.skip=true
```
This bat will be tranlated to:
```cmd
@REM mvnw.cmd
"C:\Program Files\Java\jdk1.8.0_65\bin\java.exe"  
-Xmx512m   
-classpath "".\.mvn\wrapper\maven-wrapper.jar"" 
"-Dmaven.multiModuleProjectDirectory=F:\code\ActiveNet_16_3_AUI\ActiveNetServlet" 
org.apache.maven.wrapper.MavenWrapperMain 
package 
-Dmaven.test.skip=true 
-Dmaven.install.skip=true 
-Dmaven.resources.skip=true
```

The `maven package` command will use the `pom.xml` to build ActiveNetUI/AUI project. You can see the logs that are related with UI build will be output to terminal:

```
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building api-docs 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- frontend-maven-plugin:1.0:install-node-and-npm (install node and npm) @ api-docs ---
[INFO] Node v5.8.0 is already installed.
[INFO] NPM 3.7.3 is already installed.
[INFO]
[INFO] --- frontend-maven-plugin:1.0:npm (npm install) @ api-docs ---
[INFO] Running 'npm install' in F:\code\ActiveNet_16_3_AUI\ActiveNetUI\AUI
[WARNING] npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
[WARNING] npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.0.14
[INFO]
[INFO] --- frontend-maven-plugin:1.0:npm (npm run release) @ api-docs ---
[INFO] Running 'npm run release' in F:\code\ActiveNet_16_3_AUI\ActiveNetUI\AUI
[INFO]
[INFO] > ActiveNet-aui@1.0.0 release F:\code\ActiveNet_16_3_AUI\ActiveNetUI\AUI
[INFO] > node node_modules/gulp/bin/gulp.js release
[INFO]
[INFO] [21:17:38] Using gulpfile F:\code\ActiveNet_16_3_AUI\ActiveNetUI\AUI\gulpfile.js
[INFO] [21:17:38] Starting 'release'...
[INFO] [21:17:39] Starting 'clean.prod'...
[INFO] [21:17:39] Finished 'clean.prod' after 41 ms
[INFO] [21:17:39] Starting 'build.prod'...
[INFO] [21:18:13] Finished 'build.prod' after 34 s
[INFO] [21:18:13] Starting 'copy'...
[INFO] [21:18:13] Finished 'copy' after 945 渭s
[INFO] [21:18:13] Finished 'release' after 34 s
[INFO]
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ api-docs ---
[INFO] No sources to compile
[INFO]
[INFO] --- maven-resources-plugin:2.7:testResources (default-testResources) @ api-docs ---
[INFO] Not copying test resources
[INFO]
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ api-docs ---
[INFO] Not compiling test sources
[INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ api-docs ---
[INFO] Tests are skipped.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 54.277 s
[INFO] Finished at: 2016-08-04T21:18:14+08:00
[INFO] Final Memory: 14M/225M
[INFO] ------------------------------------------------------------------------
```

From the build logs, you can find the command were executed:
```
npm install
npm run release
node node_modules/gulp/bin/gulp.js release
```

### npm install

> **npm** is the package manager for JavaScript. 
> Find, share, and reuse packages of code from hundreds of thousands of developers — and assemble them in powerful new ways. 

You can get more details from [official website](https://www.npmjs.com/ "Official website").

This command is to initialize and make sure all node_modules are installed and up to date. It will refer the file `ActiveNetUI/AUI/package.json` to check all node modules.
**package.json** is a file that is used to describe node dependencies.

### npm run release
This command will call the scripts that defined at package.json:
```json
  "scripts": {
    "dev": "node node_modules/gulp/bin/gulp.js dev",
    "prod": "node node_modules/gulp/bin/gulp.js prod",
    "static": "node node_modules/gulp/bin/gulp.js static",
    "release": "node node_modules/gulp/bin/gulp.js release",
    "start": "node node_modules/gulp/bin/gulp.js static",
    "test": "node node_modules/gulp/bin/gulp.js test"
  }
```

### node node_modules/gulp/bin/gulp.js release
> **gulp** is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.

Gulp's role in Javascript is similar to ant in Java.
You can get more details from [github](https://github.com/gulpjs/gulp "github").

All gulp's tasks are defined at `ActiveNetUI\AUI\gulpfile.js`

```javascript
gulp.task("release", function(done) {
  return runSeq("clean.prod", "build.prod", "copy", done);
});
```
### Execution sequence of tasks
+ clean.prod
+ build.prod
+ copy

These tasks are defined under folder `ActiveNetUI\AUI\tasks\` 

#### clean.prod
```javascript
/*app.config.js*/
export const outputDir = {
  "static": path.resolve("dist"),
  "dev": "../../ActiveNetServlet/web/app/facility",
  "prod": "../../ActiveNetServlet/web/app/facility",
  "Backend": "G:/enviroments/ActiveNet/ActiveNetUI/AUI"
};

/*clean.js*/
gulp.task("clean.prod", (done) => {
  return del([outputDir["prod"]], {force: true});
});
```

#### build.prod
```javascript
import configProd from "./webpack/config.prod";
...
gulp.task("build.prod", function(done) {
  modulesParser.parse("prod").then(() => {
    let settings = modulesParser.buildReturns();
    let config = Object.assign({}, configProd);
    Object.assign(config.entry, settings.entry);
    config.plugins = config.plugins.concat(settings.htmlPlugins);
    webpack(config, function(err, stats) {
      if(firstWebpack){
        done();
        firstWebpack = false;
      }
    });
  });
});
```
We use the webpack to package all frontend resources: JS/JSX, css, less, images...
> **webpack** is a module bundler.  
> webpack takes modules with dependencies and generates static assets representing those modules.
> Get more detail [webpack](http://webpack.github.io/docs/what-is-webpack.html "webpack").

This toolkit will generate the web resources (js, images, css, fonts, jsp) to folder `ActiveNetServlet/web/app/facility/`.

All frontend source code you can find at `ActiveNetUI\AUI\src`,  the corresponding relation of webpack's input and output:

|input|output|
|-|:-:|
|jade (template engine)|jsp|
|jsx(react)|js|
|less|css|

### Frontend 

If you are interested in the frontend development, following is a frontend skill/toolkit/framework list you need to study:

+ Language
    + ES5/ES6 - Javascript
        + React
        + Reactive
    + CSS3
        + LESS
    + HTML5
        + Jade - template engine
+ Toolkit
    + babel - jsx compiler
    + gulp - task managment
    + karma - test runner
    + mocha - test framework
    + redux - hotreloading and time travel
    + webpack - module bundler
    + sinon - test spies, stubs and mocks for JavaScript.
+ Javascript libs
    + immutable
    + promise - asynchronous programing


You can also refer `ActiveNetUI/Readme.md`