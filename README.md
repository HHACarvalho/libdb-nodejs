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

# User route

### Sign up - http://localhost:3000/user/signup - POST

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

**Returns:** If successful, it returns the code 201 and a signed JSON Web Token. Otherwise, the code 400 and an error message.

---

### Login - http://localhost:3000/user/login - GET

Login as an existing user.

**Body:**

```json
{
    "email": "erica.lopes@gmail.com",
    "password": "12345678"
}
```

**Returns:** If successful, it returns the code 200 and a signed JSON Web Token. Otherwise, the code 404 and an error message.

---

### Find all users - http://localhost:3000/user/all - GET

Retrieves a list of all users.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Returns:** If successful, it returns the code 200 and a list of all users. Otherwise, the code 404 and an error message.

---

### Find user - http://localhost:3000/user?userId=VALUE - GET

Retrieves a single user.

**Parameters:**

| Parameter | Value                                |
|:----------|:-------------------------------------|
| userId    | f0000000-b444-b444-b444-f00000000000 |

**Returns:** If successful, it returns the code 200 and a single user. Otherwise, the code 404 and an error message.

---

### Update user profile - http://localhost:3000/user - PUT

Updates the current user's profile.

**Pre-requisites:** A successful login.

**Body:**

```json
{
    "email": "filipa.lopes@gmail.com",
    "password": "12345678",
    "firstName": "Filipa",
    "lastName": "Lopes"
}
```

**Returns:** If successful, it returns the code 200 and an updated JSON Web Token. Otherwise, the code 404 and an error message.

---

### Update user role - http://localhost:3000/user?userId=VALUE&roleName=VALUE - PATCH

Updates a user's role.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Parameters:**

| Parameter | Value                                |
|:----------|:-------------------------------------|
| userId    | f0000000-b444-b444-b444-f00000000000 |
| roleName  | Admin                                |

**Returns:** If successful, it returns the code 200. Otherwise, the code 404 and an error message.

---

### Delete account - http://localhost:3000/user - DELETE

Deletes the current user's account.

**Pre-requisites:** A successful login.

**Returns:** If successful, it returns the code 200 and erases the current JSON Web Token. Otherwise, the code 404 and an error message.

---
___

# Role route

### Create role - http://localhost:3000/role - POST

Adds a new role to the database.

**Pre-requisites:** A successful login and a role with sufficient permissions.

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

**Returns:** If successful, it returns the code 201 and a copy of the created role. Otherwise, the code 400 and an error message.

---

### Find all roles - http://localhost:3000/role/all - GET

Retrieves a list of all roles.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Returns:** If successful, it returns the code 200 and a list of all roles. Otherwise, the code 404 and an error message.

---

### Update role - http://localhost:3000/role?roleName=VALUE - PUT

Updates an existing role.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Parameters:**

| Parameter | Value       |
|:----------|:------------|
| roleName  | ExampleRole |

**Body:**

```json
{
    "name": "ExampleRoleModified",
    "permissions": {
        "manageMovies": true,
        "manageRoles": true,
        "manageUsers": true
    }
}
```

**Returns:** If successful, it returns the code 200 and a copy of the update role. Otherwise, the code 404 and an error message.

---

### Delete role - http://localhost:3000/role?roleName=VALUE - DELETE

Deletes a role from the database.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Parameters:**

| Parameter | Value               |
|:----------|:--------------------|
| roleName  | ExampleRoleModified |

**Returns:** If successful, it returns the code 200 and a copy of the deleted role. Otherwise, the code 404 and an error message.

---
