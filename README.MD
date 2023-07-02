# User CRUD Application

This project is a basic CRUD (Create, Read, Update, Delete) application for managing user information. The application utilizes a MongoDB database to store user data. This has been developed as part of the Compass Node.js trial scholarship program challenge.


## Requirements

All dependencies, such as:

- dotenv@^8.2.0
- express@^4.17.1
- mongoose@^5.11.10
- nodemon@^2.0.7

have been pre-installed in the `package.json` file. Additionally, you need to install the following dependencies:

- bcryptjs@^5.0.1 (JavaScript password hashing)
- git-commit-msg-linter@^4.1.0 (Git commit message linter)


To install the JavaScript password hashing dependency, navigate to the base folder and run:

```bash
npm install bcryptjs
```

To install git-commit-msg-linter as a dev dependency, run:

```bash
npm install git-commit-msg-linter --save-dev
```

Please note that before running the application, you need to create a MongoDB database account to establish the connection. Visit [MongoDB](https://cloud.mongodb.com/) to create your account.

Afterward, you can install all the other dependencies by running:

```bash
npm install
```

To start the application, use the following command:

```bash
npm start
```

## API Routes

The application exposes the following routes:

* GET /api/v1/users - Retrieves a list of all users.
* GET /api/v1/users/:id - Retrieves a specific user by ID.
* POST /api/v1/users - Creates a new user.
* PATCH /api/v1/users/:id - Updates an existing user by ID.
* DELETE /api/v1/users/:id - Deletes a user by ID.
