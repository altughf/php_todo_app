# PHP & React Restful Api TODO App

Todo application built with a PHP RESTful API back-end, React & Tailwind front-end, fully containerized using Docker.

## Features

- Create, read, update, and delete tasks
- Create, read, update, and delete categories
- Filter by Status, Priority
- Sort tasks by due time, created at, priority
- Pagination with filtered tasks
- Searching tasks & Filter at same time
- Tasks by category page
- Easy install with Docker

## Technologies Used

- Backend: PHP (RESTful API)
- Frontend: React + Tailwind CSS
- Database: MySQL
- Containerization: Docker

## Local System Requirements

```bash
# Install Docker
- Docker / Docker Desktop
```

```bash
# Add your operating system 'host' file to this line :

'127.0.0.1 php-app.link'

Windows > C:\Windows\System32\drivers\etc\host

You may need to restart your system.

[http://php-app.link]
Docker & React 'proxy' pre-ready for this domain.
```

##############################################

## **Install & Initialization**

```bash
# Clone Repository
git clone https://github.com/altughf/php-todo-app
```

### Back-End initialize

```bash
#1 : install back-end packages
cd your-repositories/php-todo-app/engine
composer install
```

```bash
#2 : Start Docker > first time docker will pull all images
cd your-repositories/php-todo-app

docker-compose up -d
```

### Front-End initialize

```bash
#3 : install front-end packages
cd your-repositories/php-todo-app/client
npm install
```

```bash
#4 : initialize react
cd your-repositories/php-todo-app/client
npm start

[http://localhost:3000/]
```

```bash
#5 : initialize tailwind
cd your-repositories/php-todo-app/client
npm run style
```

### Optional Install & Initialization

```bash
# Add database demo tasks > if docker container runned you can access phpmyadmin
import 'php_app_database' with phpmyadmin / [http://localhost:8081/]
```

```bash
# Important ! Only if you take react build.

You can build react to public folder like :

index.html
/static

Apache server pre-ready with .htaccess file.
It separate front-end & back-end api request on same domain.
Now, you can access directly with to 'Todo App' with [http://php-app.link]
```

### Restful Api Endpoints

```bash

# ------------------- # TODOS

# List all todos > Default
GET http://php-app.link/api/todos

# List all todos > Search & Filter Queries
GET http://php-app.link/api/todos?page=1&limit=10&sort=due_date&order=asc&status=&priority=&q=test

# Single todo
GET http://php-app.link/api/todos/{id}

# Create todo
POST http://php-app.link/api/todos

# Update todo
PUT http://php-app.link/api/todos/{id}

# Patch todo
PATCH http://php-app.link/api/todos/{id}

# Delete todo (SOFT)
DELETE http://php-app.link/api/todos/{id}

# ------------------- # CATEGORIES

#List all categories
GET http://php-app.link/api/categories

#List all categories > Filter Queries
GET http://php-app.link/api/categories?page=1&limit=10&sort=due_date&order=asc&status=in_progress

#Single category
GET http://php-app.link/api/categories/{id}

#Create category
POST http://php-app.link/api/categories

#Update category
PUT http://php-app.link/api/categories/{id}

#Delete category (HARD)
DELETE http://php-app.link/api/categories/{id}

#List all todos by categories
GET http://php-app.link/api/categories/{id}/todos

```
