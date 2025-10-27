<b>This is a practice project designed to help learn various concepts in Java, Spring Boot, and React.</b>

<b>Steps to build docker images:</b>

1). Build app-service docker image (java, backend) </br>
Go to app-service dir and run command:
````
mvn clean install -P buildDocker
````

2). Build angular-ui docker image (frontend UI) </br>
Go to angular-ui dir and run command: 
````
npm install
ng build
docker build -t super-practice-app-ui:latest .
````

&nbsp;
&nbsp;

<b>Run application using docker compose:</b> </br>

1). Run MySql db:
````
docker compose up db-server -d
````

2). Run UI server (angular, UI):
````
docker compose up ui-service -d
````

3). Run App server (java, backend):
````
docker compose up app-server -d
````

Note: App server is dependent on MySql db, so please wait few mins for db-server container to be ready before starting app-server container.

&nbsp;
&nbsp;

<b>Once all the docker containers are up, access application using following URL:</b> </br>
````
http://localhost:4000/
````
