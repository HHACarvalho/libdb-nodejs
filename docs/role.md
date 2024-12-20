# Role endpoints

### Create role - [POST]() /role

Creates a new role.

**Pre-requisites:** A successful login and sufficient permissions.

**Body:**

```json
{
	"name": "Admin",
	"permissions": ["manageRoles", "manageUsers"]
}
```

**Returns:** If successful, the code 201 and a copy of the created role.

```json
{
	"id": "59f965be-5681-4538-9c95-ce7f6d93fda1",
	"name": "Admin",
	"permissions": ["manageRoles", "manageUsers"]
}
```

Otherwise, the code 400 and an error message.

---

### Find all roles - [GET]() /role

Retrieves a list of all roles.

**Returns:** If successful, it returns the code 200 and a list of all roles.

```json
[
    {
        "id": "29680e14-d994-46d5-ba03-2c7c82445dd5",
        "name": "User",
        "permissions": []
    },
    {
        "id": "5f7579fe-dc3b-4508-a974-a92d4b86b24b",
        "name": "Mod",
        "permissions": ["manageRoles"]
    },
	...
]
```

Otherwise, the code 404 and an error message.

---

### Find one role - [GET]() /role/_id_

Retrieves a single role.

**Parameters:**

| Parameter | Type   | Default value |
| :-------- | :----- | :------------ |
| id        | String | null          |

**Returns:** If successful, the code 200 and a single role.

```json
{
	"id": "59f965be-5681-4538-9c95-ce7f6d93fda1",
	"name": "Admin",
	"permissions": ["manageRoles", "manageUsers"]
}
```

Otherwise, the code 404 and an error message.

---

### Update role - [PUT]() /role/_id_

Updates an existing role.

**Pre-requisites:** A successful login and sufficient permissions.

**Parameters:**

| Parameter | Type   | Default value |
| :-------- | :----- | :------------ |
| id        | String | null          |

**Body:**

```json
{
	"name": "Admin",
	"permissions": ["manageRoles", "manageUsers"]
}
```

**Returns:** If successful, the code 200. Otherwise, the code 404 and an error message.

---

### Delete role - [DELETE]() /role/_id_

Deletes an existing role.

**Pre-requisites:** A successful login and sufficient permissions.

**Parameters:**

| Parameter | Type   | Default value |
| :-------- | :----- | :------------ |
| id        | String | null          |

**Returns:** If successful, the code 200. Otherwise, the code 404 and an error message.
