
# Sistema gerenciador de tarefas

Aplicação desenvolvida para gerenciar tarefas.



## API Reference

#### Save new task

```java
  GET /task/add
```

#### Get all items

```java
  GET /task/all
```

#### Get task by ID

```java
  GET /task/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `long` | **Required**. Task ID |

#### Update task

```java
  GET /delete/{id}
```

#### Delete task

```java
  GET /delete/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `long` | **Required**. Task ID |


## Deployment with docker

If you downloaded the whole project, just make sure your docker is running and your TCP:3306 port isn't being used.

At the project root run:

```bash
  docker-compose up
```

or

```bash
  docker-compose up --build --force-recreate
```

#### If you don't wanna download the project:

Make sure your docker is running and your TCP:3306 port isn't being used.

Create a docker-compose.yaml file and paste the following script: 

```yaml
version: '3'
services:
  task-management-server:
    image: vinicpires/task-management-backend:2.0
    ports:
      - '8080:8080'
      - '5005:5005'
    environment:
      ADDITIONAL_OPTS: -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -Xmx1G -Xms128m -XX:MaxMetaspaceSize=128m
      PROFILE: dev
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/todo_database
    links:
      - db
      - task-management-frontend
    depends_on:
      - db
    networks:
      - server
  db:
    image: vinicpires/todo_database:1.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_HOST=%
      - MYSQL_DATABASE=todo_database
      - MYSQL_ALLOW_EMPTY_PASSWORD=true
      - MYSQL_ROOT_PASSWORD=admin
    volumes:
      - ./docker/volume-mysql:/var/lib/mysql
    networks:
      - server
  task-management-frontend:
    image: vinicpires/task-management-frontend:2.0
    ports:
      - "4200:4200"
    networks:
      - server
networks:
  server:
    driver: bridge

```

## Deployment without docker

To deploy this project locally without docker run

At task-management-frontend 

```bash
  npm install
```

Then

```bash
  npm start
```

At task-management-backend, just run the project using any IDE also make sure you have MySQL installed and a database named "todo_database".
