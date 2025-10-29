<b>LLP</b>

## Prerequisites 🛠️

Following tools are needed to Modify the project.

### General Tools
* **Git**: For version control.
* **Docker Desktop**: For containerization and running services.

---

### Backend Tools
* **Maven**: For build automation and dependency management.
* **JDK 17** (Java Development Kit): The environment for compiling and running Java code.
* **Code editor** (Eclipse, Cursor, etc.): Your preferred IDE for backend development.

---

### Frontend Tools
* **NVM Windows**: Node Version Manager for installing and managing multiple Node.js versions.
* **NPM v10.5.2** (install via NVM): The specific version of the Node Package Manager required.
* **Code editor** (VS Code, Cursor, etc.): Your preferred editor for frontend development.

---

### Database Tools
* **DBeaver** (or similar tool to browse MySQL database): A universal database tool to connect to and manage the project's MySQL database.

---

&nbsp;

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
docker compose up db-service -d
````

2). Run UI server (angular, UI):
````
docker compose up ui-service -d
````

3). Run App server (java, backend):
````
docker compose up app-service -d
````

Note: App server is dependent on MySql db, so please wait few mins for db-server container to be ready before starting app-server container.

&nbsp;
&nbsp;

<b>Once all the docker containers are up, access application using following URL:</b> </br>
````
http://localhost:4000/
````
