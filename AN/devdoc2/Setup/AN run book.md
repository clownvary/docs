##linux servers list
Automation INT:

* anetintapp01.dev.activenetwork.com
* anetintapp02.dev.activenetwork.com
* int-activenet-05w.an.dev.activenetwork.com
* int-activenet-06w.an.dev.activenetwork.com

Functional INT:

* anetintapp03.dev.activenetwork.com
* anetintapp04.dev.activenetwork.com

Stage:

* stage-activenet-01w.dev.activenetwork.com
* stage-activenet-02w.dev.activenetwork.com

Perf:

* perf-activenet-01w.active.tan ~ perf-activenet-32w.active.tan

Prod-US[^1]:

* prod-activenet-01w.an.active.tan ~ prod-activenet-20w.an.active.tan

Prod-CA[^2]:

* TBD

[^1]: There'll be more servers for the ongoing live sites migration, but all servers follows prod-activenet-[num]w.an.active.tan name convention.
[^2]: There'll be more servers for the ongoing live sites migration, but all servers follows prod-activenet-[num]w.an.active.tan name convention. 

##How to login to linux servers
Unlike windows, linux server doesn't have desktop installed, so they cannot be remote desktop, only way to login is using [SSH](https://en.wikipedia.org/wiki/Secure_Shell).
###from mac or linux
1. open terminal, login to servers using `ssh [username]@[server]`, e.g `ssh jfang1@anetintapp01.dev.activenetwork.com` is to ssh into anetintapp01.dev.activenetwork.com using user jfang1.
2. all test environment servers can be ssh in using `deploy/123!deploy`, submit Service-now ticket to request DEV account to login test environment servers, and TAN account for prod environment servers.
3. [https://iam.activenetwork.com/IAM/selfdesk](https://iam.activenetwork.com/IAM/selfdesk) to reset DEV/TAN account password

###from windows
1. download [Putty](http://www.putty.org/) to login linux using SSH

##ActiveNetServlet runtime structure
1. SSH in a server
2. `cd /opt/active/sites` - change directory to sites folder where all sites are deployed
3. `pwd` - is to show current directory
3. `ls -l` - list all folders in current directory
4. `cd jettytest02` - change directory to jettytest02
5. org folder structures is fixed:

		├── ActiveNetServlet
		│   ├── config
		│   ├── jetty
		│   ├── lib
		│   ├── logs
		│   └── ui
	* config contains all configuration files, include sdi.ini and service.properties
	* jetty contains web resources include html files, jsp files, WEB-INF etc
	* lib contains all depended jars
	* logs contains all logs include application log, performance tracer log, gc log[^3]
	* ui used to be empty

[^3]: log dir is configured in service.properties logDir

###More on runtime structure
1. SSH into a server
2. `cd /opt/active/sites/{org}/ActiveNetServlet` - e.g `cd /opt/active/sites/jettytest02/ActiveNetServlet`
3. `ls -l` gives

		lrwxrwxrwx 1 deploy root 108 Jan 28 00:17 config -> /opt/active/ActiveNet/dev/jettytest02/V15.40.157/Anetintapp03.dev.activenetwork.com/ActiveNetServlet//config
		lrwxrwxrwx 1 deploy root  65 Jan 28 00:17 jetty -> /opt/active/ActiveNet/dev/share/V15.40.157/ActiveNetServlet/jetty
		lrwxrwxrwx 1 deploy root  63 Jan 28 00:17 lib -> /opt/active/ActiveNet/dev/share/V15.40.157/ActiveNetServlet/lib
		lrwxrwxrwx 1 deploy root 105 Jan 28 00:17 logs -> /opt/active/ActiveNet/dev/jettytest02/V15.40.157/Anetintapp03.dev.activenetwork.com/ActiveNetServlet/logs
	* it indicates all files are deployed on NFS instead of local drive
	* /jetty and /lib are shared among servers, i.e applications running in same environment with same version shares web files, and jars. This is to accerlerate deployment

###org configurations
####key settings in service.properties
	appName=ActiveNetServlet-linux01
	appVersion=x.x.x
	httpPort=8080
	jmxPort=9098
	memorySize=521m
	jvm.memory.permgen=200m
	jdk.version=jdk8-1.8.0_31
	jvm.memory.bits=64
	moreJavaOptions=-Dsite.name=/jettytest02/ -Duser.timezone=PST
	jdk.version.target=1.8
	jdk.version.source=1.8
	jdbc.url=jdbc:sqlserver://WL00070199:1433;DatabaseName=ActiveNetServlet
	jdbc.username=recware
	jdbc.password=**A6D44CDF5860EEA1
	jdbc.initialSize=2
	jdbc.minIdle=4
	jdbc.maxIdle=8
	jdbc.maxTotal=16
	logDir=../logs
	logLevel=DEBUG
	jrs.remote.host=10.119.164.21
	jrs.remote.rmiport=1129
* appName: the application name, used to be ActiveNetServlet-{orgName}
* appVersion: code version populated from ActiveNetSites db, note version.sdi uses different strategy to get version
* httpPort: http port
* jmxPort: jmx port
* memorySize: memorySize=xmx=xms, max/min heap size
* jvm.memory.permgen: Maxmetaspace for JDK 1.8+, Permgen for JDK 1.8-
* jdk.version: default JDK version to run the application, if given version is not found in default path, it'll start with JAVA_HOME
* jvm.memory.bits: jvm bits, fixed as 64
* moreJavaOptions: add more java startup options
	* -Dsite.name: is to specify org name in url, this determines the org url patter, e.g -Dsite.name=/jettytest02/ specifies org url to be: http[s]://{host}/jettytest02/servlet/processAdminLogin.sdi 
	* -Duser.timezone: set JDK default timezone, PST for all ANET orgs
* jdk.version.target/source: this does not impact runtime jdk version, but just jdk during compilation
* jdbc.url: jdbc url for org db
* jdbc.*: jdbc/dbcp configurations
* logDir: where log files locate
* logLevel: could be DEBUG/INFO/WARN/ERROR etc, this only applies to default.log in /config, not for AppLogger
* jrs.remote.host/rmiport: JReport server address and rmi port

####sdi.ini
settings in sdi.ini remains same as on windows

##How to start/stop an org

1. `cd /opt/active/sites/jettytest02/ActiveNetServlet/config` - change directory to config/
2. `ls -l` - list all files
	* start_service.sh: start script for linux: `./start_service.sh` to run the script, it'll restart given org if it's already running, otherwise start the org
	* stop_service.sh: stop script for linux: `./stop_service.sh` to stop the script, it could take seconds to stop if there're ongoing jobs
	* start_service.bat: start script for windows, this is mainly for developers windows local
3. to start the org
	* `./start_service.sh`: it starts given org in the background, this is the normal way to start an org
	* `./start_service.sh -f`: it starts given org in non-background mode, quit the session would stop the org; the command is useful when there're startup errors are not logged in log files, like insufficient memory errors. Try this one when start_service.sh not able to start the org
4. to stop the org:
	* `./stop_service.sh`: it stops given org in a gentle way
5. important note: start/stop org using `deploy/123!deploy` for non-prod environment, do `su deploy` before doing this on prod environment, only a few users should have the permission on prod servers

##How to view logs
There're three types of logs generated by application

1. Log in DB generated by AppLogger which remains same as on windows
2. Log in file generated by AppLogger which remains same as on windows
3. Log in file generated by core-server, log level and location is speicified in service.properties

	* startup and application log: named as ActiveNetServlet-{orgname}{instance}.log, which is also {appName}{appInstance}.log from service.properties, /opt/active/sites/jettytest02/ActiveNetServlet/config/default.log is softlink to actual log file for jettytest02, it creates separate files for each startup, `tail -f default.log` to view real time log, or use `more default.log`, or `vi default.log` to view entire log file, refer to [http://www.linfo.org/vi/search.html](http://www.linfo.org/vi/search.html) on how to search key words in log file; to view all log files, go to log dir which is configured in service.properties
	* GC logs: named as {appName}{appInstance}-gc.log, to view all GC activities, it locates in log dir which is configured in service.properties
	* Tracer logs: named as {appName}{appInstance}-tracer.log

##View server metrics
###top - similar to task manager on windows
1. ssh into a server
2. run `top` anywhere
3. press c to show process details
4. press O in uppercase to sort processes by Time, memory, CPU or else
5. press 1 to show CPU cores

####key metrics in top
1. load average: cpu load in 1/5/15 mins, e.g 0.3 1 1.2
2. Mem: memory usage

###free
1. ssh into a server
2. run `free` anywhere or `free -m` to show memory in mega byte

	[deploy@anetintapp03 ~]$ free -m
	
             total       used       free     shared    buffers     cached
		Mem: 7872       5631       2240          0        154        978
		-/+ buffers/cache:  4498    3373
		Swap:         1023          0       1023
from above, 7872M in total, 3373M available

##Script snippets
* start all orgs
```
	for n in /opt/active/sites/*/ActiveNetServlet/config; do echo "starting $n..."; cd $n && ./start_service.sh; done
```
* stop all orgs
```
for n in /opt/active/sites/*/ActiveNetServlet/config; do echo "stoping $n..."; cd $n && ./stop_service.sh; done
```
* get all running org processes
```
ps -ef | grep -E -o 'appName=ActiveNetServlet-\w+’ | sort
```
* get all running java processes
```
ps -ef | grep -i java
```
* find process for specific org
```
ps -ef | grep -i {org name}, e.g ps -ef | grep -i jetytest02
```

###How to setup new server