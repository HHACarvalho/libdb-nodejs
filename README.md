# LibDB Node.js API

RESTful API built with Node.js and Express used for the authentication portion of the project.

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

Default API url - http://localhost:3000

# User route

### Sign up - POST /user/signup

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

### Login - GET /user/login

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

### Find all users - GET /user/all

Retrieves a list of all users.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Returns:** If successful, it returns the code 200 and a list of all users. Otherwise, the code 404 and an error message.

---

### Find user - GET /user?userId

Retrieves a single user by their ID.

**Parameters:**

| Parameter | Value                                |
| :-------- | :----------------------------------- |
| userId    | f0000000-b444-b444-b444-f00000000000 |

**Returns:** If successful, it returns the code 200 and a single user. Otherwise, the code 404 and an error message.

---

### Update user profile - PUT /user

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

### Update user role - PATCH /user?userId&roleName

Updates a user's role.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Parameters:**

| Parameter | Value                                |
| :-------- | :----------------------------------- |
| userId    | f0000000-b444-b444-b444-f00000000000 |
| roleName  | Admin                                |

**Returns:** If successful, it returns the code 200. Otherwise, the code 404 and an error message.

---

### Delete account - DELETE /user

Deletes the current user's account.

**Pre-requisites:** A successful login.

**Returns:** If successful, it returns the code 200 and erases the current JSON Web Token. Otherwise, the code 404 and an error message.

---

---

# Role route

### Create role - POST /role

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

### Find all roles - GET /role/all

Retrieves a list of all roles.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Returns:** If successful, it returns the code 200 and a list of all roles. Otherwise, the code 404 and an error message.

---

### Update role - PUT /role?roleName

Updates an existing role.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Parameters:**

| Parameter | Value       |
| :-------- | :---------- |
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

### Delete role - DELETE /role?roleName

Deletes a role from the database.

**Pre-requisites:** A successful login and a role with sufficient permissions.

**Parameters:**

| Parameter | Value               |
| :-------- | :------------------ |
| roleName  | ExampleRoleModified |

**Returns:** If successful, it returns the code 200 and a copy of the deleted role. Otherwise, the code 404 and an error message.

---
