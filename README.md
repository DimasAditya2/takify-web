# Web Taskify 
This is a simple client-side application that demonstrates basic CRUD (Create, Read, Update, Delete) functionality. The application allows users to manage data by adding, viewing, updating, and deleting items.

## Features
- Create: Users can add new To do to the list.
- Read: Users can view the list of To do.
- Update: Users can edit existing To do.
- Delete: Users can remove To do .

## Technologies Used
React: Front-end framework for building the user interface.
react-router-dom: For handling routing between different pages (if applicable).
Tailwind CSS: For styling the user interface.

## Screenshot

- ### Landing - /home 

![Landing Page](/public/screenshot/landing.png)

- ### Login - /auth/login

![Landing Page](/public/screenshot/login.png)

- ### Register - /auth/register

![Landing Page](/public/screenshot/register.png)

- ### Tasks - /tasks

![Landing Page](/public/screenshot/tasks.png)

- ### Add Page

![Landing Page](/public/screenshot/add.png)

- ### Edit Page

![Landing Page](/public/screenshot/edit.png)

## Getting Started
To get the project running locally, follow these steps:

## Prerequisites
- Node.js: Ensure you have Node.js installed on your machine.
- npm: npm is required for managing packages.

## Installation
Clone the repository:

```bash
git clone https://github.com/yourusername/crud-application.git
```

Navigate to the project directory:
```bash
cd taskify-web
```

Install the necessary dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

Open your browser and navigate to http://localhost:5173 to see the application.

## Available Scripts
- npm start: Runs the app in development mode.
- npm run build: Builds the app for production.
- API Endpoints (if applicable)
- The application interacts with a backend API for CRUD operations. Below are the typical API endpoints:

## Endpoint
- GET /tasks : Fetches a list of To do.
- POST /tasks : Adds a new To do.
- PUT /tasks/ : Updates an existing To do.
- DELETE /tasks : Deletes an To do.
