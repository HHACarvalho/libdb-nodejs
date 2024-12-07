# User endpoints

### Sign up - [POST]() /user/signup

Creates a new user.

**Body:**

```json
{
	"email": "hugo.carvalho@mail.com",
	"password": "12345678",
	"firstName": "Hugo",
	"lastName": "Carvalho"
}
```

**Returns:** If successful, the code 201 and a signed JSON Web Token. Otherwise, the code 400 and an error message.

---

### Login - [POST]() /user/login

Login as an existing user.

**Body:**

```json
{
	"email": "hugo.carvalho@mail.com",
	"password": "12345678"
}
```

**Returns:** If successful, the code 200 and a signed JSON Web Token. Otherwise, the code 404 and an error message.

---

### Find all users - [GET]() /user?_pageNumber_&_pageSize_

Retrieves a list of users.

**Parameters:**

| Parameter  | Type   | Default value |
| :--------- | :----- | :------------ |
| pageNumber | Number | 1             |
| pageSize   | Number | 16            |

**Returns:** If successful, the code 200 and a list of users.

```json
[
    {
        "firstName": "Hugo",
        "lastName": "Carvalho",
        "role": "Admin"
    },
    {
        "firstName": "Afonso",
        "lastName": "Esteves",
        "role": "Mod"
    }
	...
]
```

Otherwise, the code 404 and an error message.

---

### Find users - [GET]() /user/search?_pageNumber_&_pageSize_&_firstName_&_lastName_&_roleId_

Retrieves a list of users matching the specified criteria.

**Parameters:**

| Parameter  | Type   | Default value |
| :--------- | :----- | :------------ |
| pageNumber | number | 1             |
| pageSize   | number | 16            |
| firstName  | string | null          |
| lastName   | string | null          |
| roleId     | string | null          |

**Returns:** If successful, the code 200 and a list of users.

```json
[
    {
        "firstName": "Hugo",
        "lastName": "Carvalho",
        "role": "Admin"
    },
    {
        "firstName": "Afonso",
        "lastName": "Esteves",
        "role": "Mod"
    }
	...
]
```

Otherwise, the code 404 and an error message.

---

### Find one user - [GET]() /user/_id_

Retrieves a single user.

**Parameters:**

| Parameter | Type   | Default value |
| :-------- | :----- | :------------ |
| id        | String | null          |

**Returns:** If successful, the code 200 and a single user.

```json
{
	"id": "6506fb6e-d894-4280-8a19-4c63eb71b8d3",
	"email": "hugo.carvalho@mail.com",
	"firstName": "Hugo",
	"lastName": "Carvalho",
	"role": "Admin"
}
```

Otherwise, the code 404 and an error message.

---

### Update user profile - [PUT]() /user/profile

Updates the current user's profile information.

**Pre-requisites:** A successful login.

**Body:**

```json
{
	"email": "hugo.carvalho@mail.com",
	"password": "12345678",
	"firstName": "Hugo",
	"lastName": "Carvalho"
}
```

**Returns:** If successful, the code 200 and an updated JSON Web Token. Otherwise, the code 404 and an error message.

---

### Update user role - [PUT]() /user/role?_userId_&_roleId_

Updates the role of a user.

**Pre-requisites:** A successful login and sufficient permissions.

**Parameters:**

| Parameter | Type   | Default value |
| :-------- | :----- | :------------ |
| userId    | String | null          |
| roleId    | String | null          |

**Returns:** If successful, the code 200. Otherwise, the code 404 and an error message.

---

### Delete current user - [DELETE]() /user

Deletes the current user.

**Pre-requisites:** A successful login.

**Returns:** If successful, the code 200 and it erases the current JSON Web Token. Otherwise, the code 404 and an error message.

---

### Delete user - [DELETE]() /user/_id_

Deletes an existing user.

**Pre-requisites:** A successful login and sufficient permissions.

**Parameters:**

| Parameter | Type   | Default value |
| :-------- | :----- | :------------ |
| id        | String | null          |

**Returns:** If successful, the code 200. Otherwise, the code 404 and an error message.
