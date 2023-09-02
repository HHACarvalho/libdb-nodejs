# MovieDB Node.js API

REST API built with Node.js and Express

# Commands

### Compiles and hot-reloads for development

```
npm start
```

### Run the tests

```
npm test
```

### Compiles for production

```
npm build
```

# Routes

## User

### Sign up - http://localhost:3000/user - POST

Sign up as a new user.

**Body:**

```json
{
    "email": "erica.lopes@gmail.com",
    "password": "12345678",
    "firstName": "Erica",
    "lastName": "Lopes"
}
```

**Returns:** If successful returns the code 201 and a signed JSON Web Token. Otherwise, the code 400 and an error message.

---
___

### Login - http://localhost:3000/user - GET

Login as user.

**Body:**

```json
{
    "email": "erica.lopes@gmail.com",
    "password": "12345678"
}
```

**Returns:** If successful returns the code 200 and a signed JSON Web Token. Otherwise, the code 404 and an error message.

---
___

### Update user profile - http://localhost:3000/user - PUT

Updates the current user's profile (only a logged-in user may preform this request on his own account).

**Pre-requisites:** A successful login to acquire a JWT.

**Body:**

```json
{
    "email": "filipa.lopes@gmail.com",
    "password": "12345678",
    "firstName": "Filipa",
    "lastName": "Lopes"
}
```

**Returns:** If successful returns the code 200 and an updated JSON Web Token. Otherwise, the code 404 and an error message.

---
___

### Update user role - http://localhost:3000/user - PATCH

Updates a user's role (only a logged-in user with sufficient permissions may preform this request).

**Pre-requisites:** A successful login to acquire a JWT and sufficient permissions.

**Parameters:**

| Parameter | Value                 |
|:----------|:----------------------|
| email     | erica.lopes@gmail.com |
| role      | Admin                 |

**Returns:** If successful returns the code 200. Otherwise, the code 404 and an error message.

---
___

### Delete user - http://localhost:3000/user - DELETE

Closes the current user's account (only a logged-in user may preform this request on his own account).

**Pre-requisites:** A successful login to acquire a JWT.

**Parameters:**

| Parameter | Value                 |
|:----------|:----------------------|
| email     | erica.lopes@gmail.com |

**Returns:** If successful returns the code 200 and erases the current JSON Web Token. Otherwise, the code 404 and an error message.

---
___

## Role

### Create role - http://localhost:3000/role - POST

Adds a new role to the database.

**Body:**

```json
{
    "name": "Default",
    "permissions": {
        "manageMovies": false,
        "manageRoles": false,
        "manageUsers": false
    }
}
```

**Returns:** If successful returns the code 201 and a copy of the created role. Otherwise, the code 400 and an error message.

---
___

### Find all roles - http://localhost:3000/role/all - GET

Retrieves a list of all roles.

**Returns:** If successful returns the code 200 and a list of all roles. Otherwise, the code 404 and an error message.

---
___

### Update role - http://localhost:3000/role - PUT

Updates an existing role (sending the name in the parameters allows for renaming).

**Body:**

```json
{
    "name": "Default",
    "permissions": {
        "manageMovies": true,
        "manageRoles": true,
        "manageUsers": true
    }
}
```

**Parameters:**

| Parameter | Value   |
|:----------|:--------|
| name      | Default |

**Returns:** If successful returns the code 200 and a copy of the update role. Otherwise, the code 404 and an error message.

---
___

### Delete role - http://localhost:3000/role - DELETE

Deletes a role from the database.

**Parameters:**

| Parameter | Value   |
|:----------|:--------|
| name      | Default |

**Returns:** If successful returns the code 200 and a copy of the deleted role. Otherwise, the code 404 and an error message.

---
___
