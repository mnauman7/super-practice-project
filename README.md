<b>This is a practice project designed to help learn various concepts in Java, Spring Boot, and React.</b>

## Prerequisites 🛠️

Following tools are needed to run/develop the project.

### General Tools
* **Git**: For version control.
* **Docker Desktop**: For containerization and running services.

---

### Backend Tools
* **JDK 17** (Java Development Kit): The environment for compiling and running Java code.
* **Maven**: A tool For build automation and dependency management for Java/JVM-based projects.
* **Code editor** (Eclipse, Cursor, etc.): Your preferred IDE for backend development.
* **Postman**: A tool to test backend endpoints.

---

### Frontend Tools
* **NVM Windows**: Node Version Manager for installing and managing multiple Node.js versions.
* **Node.js v10 and Node.js v16** (install via NVM): Required Node versions to run the project.
* **NPM (Comes bundled with Node.js)**: A tool For dependency management for Node.js and JavaScript projects.
* **Code editor** (VS Code, Cursor, etc.): Your preferred editor for frontend development.

---

### Database Tools
* **DBeaver** (or similar tool to browse MySQL database): A universal database tool to connect to and manage the project's MySQL database.

---

&nbsp;

<b>Run application locally:</b> </br>

1). Run MySql db:
````
1.1). Run the database:
docker compose up db-service -d

1.2). Connect to the database in DBeaver using following details:
URL:
jdbc:mysql://localhost:3306?allowPublicKeyRetrieval=true&useSSL=false

Username:
root

Password:
superpracticeapproot

1.3). Initialize data for the database (only need to do this once)
Execute all the scripts in the database scripts folder in the following order:
schema scripts
update scripts 
````

2). Run UI server (angular, UI):
````
2.1). Build node modules:
nvm use 10 (Switch to node v10)
npm install

2.2). Run project:
nvm use 16 (Switch to node v16)
npm start
````

3). Run App server (java, backend):
````
3.0). Prerequisites:
Make sure the database is up and running before running the backend project.

3.1). Run project:
mvn spring-boot:run

3.2). Test if project is running:
In Postman, hit the following endpoint: GET http://localhost:5050/health

The response message from the endpoint should be: App Service is running!
````

&nbsp;
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
