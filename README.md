# MovieDB NodeJS API

REST API built with NodeJS and Express

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

### Sign Up - http://localhost:3000/user - POST

Sign up as a new user

**Body:**

```json
{
    "email": "erica.lopes@gmail.com",
    "password": "12345678",
    "firstName": "Erica",
    "lastName": "Lopes"
}
```

### Login - http://localhost:3000/user - GET

Login as user

**Body:**

```json
{
    "email": "erica.lopes@gmail.com",
    "password": "12345678"
}
```

### Update Profile - http://localhost:3000/user - PUT

Updates the current user's profile (only a logged-in user may preform this request on his own account).

**Body:**

```json
{
    "email": "filipa.lopes@gmail.com",
    "password": "12345678",
    "firstName": "Filipa",
    "lastName": "Lopes"
}
```

### Update User Role - http://localhost:3000/user - PATCH

Updates a user's role (only a logged-in user with sufficient permissions may preform this request).

**Parameters:**

| Parameter | Value                 |
|-----------|-----------------------|
| email     | erica.lopes@gmail.com |
| role      | Admin                 |

### Delete User - http://localhost:3000/user - DELETE

Closes the current user's account (only a logged-in user may preform this request on his own account).

**Parameters:**

| Parameter | Value                 |
|-----------|-----------------------|
| email     | erica.lopes@gmail.com |

___

## Role

### Create Role - http://localhost:3000/role - POST

Creates a new role with no permissions.

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

### Find All Roles - http://localhost:3000/role/all - GET

Retrieves a list of all roles.

### Update Role - http://localhost:3000/role - PUT

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
|-----------|---------|
| name      | Default |

### Delete Role - http://localhost:3000/role - DELETE

Deletes a role.

**Parameters:**

| Parameter | Value   |
|-----------|---------|
| name      | Default |

---
