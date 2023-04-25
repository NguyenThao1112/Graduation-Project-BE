# Preparation to run the code

1. Use must create a .env file in source code, with those format

#App configuration\
APP_PORT = ${your-data-here}\

#Mysql configuration\
DB_PORT=${your-data-here}\
DB_HOST=${your-data-here}\
DB_USER=${your-data-here}\
DB_PASSWORD=${your-data-here}\
DB_NAME=${your-data-here}\
DB_CONNECTION_LIMIT=${your-data-here}\

#JWT configuration\
JWT_SECRET=${your-data-here}\
JWT_EXPIRE=${your-data-here}\

2. Start the MySQL server
3. Run the sql script, inside scripts/database.sql
4. Run the command `npm install` to install all the component required
5. Run the command `npm start` to start the server

example configuration for env:

```javascript
APP_PORT=3001
APP_HOST=localhost
DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=nckh
DB_CONNECTION_LIMIT=100
SOCKET_PATH=/tmp/mysql.sock
JWT_SECRET = secret
JWT_EXPIRE = 24h
```

# API List (update reguraly)

## Authorization API

### Log in

#### Request

```http
POST /api/v1/auth/login
```

```javascript
{
  "email" : string,
  "password" : string,
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Authenticate successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuODcxMzgwNjI5OTY1NDY2MSwiaWF0IjoxNjc3MzMxNTI2LCJleHAiOjE2NzczMzUxMjZ9.JLoBoAREa3GNucvYT-SMkBIfMNvAsqiVrGjYR8i5nww"
}
```

### Sign up

#### Request

```http
POST /api/v1/auth/signup
```

```javascript
{
  "email" : string,
  "password" : string,
  "password2": string,
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Registrate successfully"
}
```

### Forget Password

#### Request

```http
POST /api/v1/auth/forget-password
```

```javascript
{
  "email" : string,
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Please login to the email for reseting password"
}
```

### Verify Forget Password Token

#### Request

```http
GET /api/v1/auth/forget-password?token=${token}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "The token is valid"
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Invalid token"
}
```

```javascript
{
    "code": 2,
    "message": "Expired token"
}
```

### Change Password via Forget Password Token

#### Request

```http
POST /api/v1/auth/forget-change-password
```

```javascript
{
  "token" : string,
  "password": string,
  "password2": string,
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "The password has been changed",
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Invalid token"
}
```

```javascript
{
    "code": 2,
    "message": "Expired token"
}
```

## Account API

### Get all accounts

#### Request

```http
GET /api/v1/accounts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuNjk5MDM2Njk5NTYwOTAwMSwicm9sZSI6MSwiaWF0IjoxNjc4NzIxNjA2LCJleHAiOjE2Nzg3MzI0MDZ9.pyDPS03_NxHVo6kN4F62abj8hTcm67tMAGJzRgbUm20
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Get accounts successfully!",
    "data": [
        {
            "id": 1,
            "email": "hadtnt71@gmail.com",
            "password": "$2b$10$UR0Q6FEUUVkjSWMHubruouMYhnrvIF98AARl7pcFxIL2CpWKRgtse",
            "created_at": "2023-03-06T23:28:48.000Z",
            "updated_at": "2023-03-06T23:28:48.000Z",
            "is_deleted": 0,
            "role": 1,
            "token": null,
            "token_expired_in": null
        },
        {
            "id": 2,
            "email": "hadtnt72@gmail.com",
            "password": "$2b$10$22KmIdPRjT2EI.UIVT3vdOQ07D2DVNDL27RFLNeUzMG6cQGCxbYxW",
            "created_at": "2023-03-12T01:56:20.000Z",
            "updated_at": "2023-03-12T20:31:25.000Z",
            "is_deleted": 0,
            "role": 1,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuNjE4NTYzMDc2MTE4ODg3NCwicm9sZSI6MSwiaWF0IjoxNjc4NzIxNDg1LCJleHAiOjE2Nzg3MzIyODV9.kDTbeEpiUm-7YDb2c3ztWussVhGndx8Y7G5utaARFaQ",
            "token_expired_in": "2023-03-13T04:31:25.000Z"
        },
        {
            "id": 3,
            "email": "hadtnt73@gmail.com",
            "password": "$2b$10$5Yz4JvY0jJN3xvoKZLHZ3OwuvqhSCItZa7FqHeSBk9Jlw5N.H9YU2",
            "created_at": "2023-03-12T20:33:15.000Z",
            "updated_at": "2023-03-12T20:33:26.000Z",
            "is_deleted": 0,
            "role": 1,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuNjk5MDM2Njk5NTYwOTAwMSwicm9sZSI6MSwiaWF0IjoxNjc4NzIxNjA2LCJleHAiOjE2Nzg3MzI0MDZ9.pyDPS03_NxHVo6kN4F62abj8hTcm67tMAGJzRgbUm20",
            "token_expired_in": "2023-03-13T04:33:26.000Z"
        }
    ]
}

```

#### Error response

```javascript
{
    "code": 1,
    "message": "Invalid token"
}
```

#### Request

```http
POST /api/v1/accounts HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuMDIxODY1MTUyMzM4MDA2MjMzLCJyb2xlIjoxLCJpYXQiOjE2Nzg4OTIzNTgsImV4cCI6MTY3ODkwMzE1OH0.gpFxXaI9XB0ioVGNysDN8lGYbvF_9z3NYJwhqz74GLw
Content-Type: application/json
Content-Length: 108

{
    "email": "hadtnt76@gmail.com",
    "password": "Phambinh3107@",
    "password2": "Phambinh3107@"
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Create account successfully!"
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Invalid token"
}
```

#### Request

```http
DELETE /api/v1/accounts/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuMDIxODY1MTUyMzM4MDA2MjMzLCJyb2xlIjoxLCJpYXQiOjE2Nzg4OTIzNTgsImV4cCI6MTY3ODkwMzE1OH0.gpFxXaI9XB0ioVGNysDN8lGYbvF_9z3NYJwhqz74GLw

```

#### Success response

```javascript
{
    "code": 0,
    "message": "Delete account successfully!"
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Invalid token"
}
```

## lecturers API

### Get all lecturers (without pagination)

#### Request

```http
GET /api/v1/lecturers/fetch-all
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Fetch the lecturer from database successfully",
    "data": [
        {
            "id": 1,
            "name": "Test user 1",
            "gender": "male",
            "avatar": "{resources-host}/resources/lecturer/images/avatar/{avatar-url}",
            "date_of_birth": "DD-MM-YYYY", (Example: "26/04/2023")
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },

        {
            "id": 2,
            "name": "Test user 2",
            "gender": "female",
            "avatar": "{resources-host}/resources/images/lecturer/avatar/{avatar-url}",
            "date_of_birth": "DD-MM-YYYY", (Example: "26/04/2023")
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },
    ]
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Fetch the lecturer from database successfully";
}
```

### Get all lecturers with pagination

#### Request

```http
GET /api/v1/lecturers/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

#### Success response

```javascript
{
    "code": 0,
    "message": "Fetch the lecturer from database successfully",
    "data": [
        {
            "id": 1,
            "name": "Test user 1",
            "gender": "male",
            "avatar": "{resources-host}/resources/lecturer/images/avatar/{avatar-url}",
            "date_of_birth": "DD-MM-YYYY", (Example: "26/04/2023")
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },

        {
            "id": 2,
            "name": "Test user 2",
            "gender": "female",
            "avatar": "{resources-host}/resources/images/lecturer/avatar/{avatar-url}",
            "date_of_birth": "DD-MM-YYYY", (Example: "26/04/2023")
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },
    ]
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Fetch the lecturer from database successfully";
}
```

## Configuration API

### Contact type

#### Get contact type with pagination

##### Request

```http
GET /api/v1/config/contact-type/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

##### Success response

```javascript
{
    "code": 0,
    "message": "Get contact type successfully",
    "data": [
        {
            "id": 1,
            "name": "Email",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },

         {
            "id": 2,
            "name": "Mobile phone",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Get all contact type

##### Request

```http
GET /api/v1/config/contact-type/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get contact type successfully",
    "data": [
        {
            "id": 1,
            "name": "Email",
        },

         {
            "id": 2,
            "name": "Mobile phone",
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Create multiple contact types

##### Request

```http
POST /api/v1/config/contact-type/create
```

```javascript
{
    "data": [
        {
            "name": "Email",
        },

         {
            "name": "Mobile phone",
        },
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save contact type successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Update a contact type

##### Request

```http
PUT /api/v1/config/contact-type/:id/update
```

```javascript
{
    "id" : 1,
    "name": "Email",
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save contact type successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The updated contact type is not exists",
}
```

#### Delete multiple contact types

##### Request

```http
DELETE /api/v1/config/contact-type/delete
```

```javascript
{
    "data": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Delete contact types successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The number of deleted record is not equal to the input: ${deleteCount}/${inputCount}",
}
```

### Academic rank

#### Get academic rank with pagination

##### Request

```http
GET /api/v1/config/academic-rank/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

##### Success response

```javascript
{
    "code": 0,
    "message": "Get academic rank successfully",
    "data": [
        {
            "id": 1,
            "name": "Test 0",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },

         {
            "id": 2,
            "name": "Test 1",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Get all academic rank

##### Request

```http
GET /api/v1/config/academic-rank/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get academic rank successfully",
    "data": [
        {
            "id": 1,
            "name": "Test 0",
        },

         {
            "id": 2,
            "name": "Test 1",
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Create multiple academic ranks

##### Request

```http
POST /api/v1/config/academic-rank/create
```

```javascript
{
    "data": [
        {
            "name": "Test 0",
        },

         {
            "name": "Test 1",
        },
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save academic rank successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Update a academic rank

##### Request

```http
PUT /api/v1/config/academic-rank/:id/update
```

```javascript
{
    "id" : 1,
    "name": "Test 0",
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save academic rank successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The updated academic rank is not exists",
}
```

#### Delete multiple academic ranks

##### Request

```http
DELETE /api/v1/config/academic-rank/delete
```

```javascript
{
    "data": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Delete academic ranks successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The number of deleted record is not equal to the input: ${deleteCount}/${inputCount}",
}
```

### Academic title

#### Get academic title with pagination

##### Request

```http
GET /api/v1/config/academic-title/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

##### Success response

```javascript
{
    "code": 0,
    "message": "Get academic title successfully",
    "data": [
        {
            "id": 1,
            "name": "Test 0",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },

         {
            "id": 2,
            "name": "Test 1",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Get all academic title

##### Request

```http
GET /api/v1/config/academic-title/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get academic title successfully",
    "data": [
        {
            "id": 1,
            "name": "Test 0",
        },

         {
            "id": 2,
            "name": "Test 1",
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Create multiple academic titles

##### Request

```http
POST /api/v1/config/academic-title/create
```

```javascript
{
    "data": [
        {
            "name": "Test 0",
        },

         {
            "name": "Test 1",
        },
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save academic title successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Update a academic title

##### Request

```http
PUT /api/v1/config/academic-title/:id/update
```

```javascript
{
    "id" : 1,
    "name": "Test 0",
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save academic title successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The updated academic title is not exists",
}
```

#### Delete multiple academic titles

##### Request

```http
DELETE /api/v1/config/academic-title/delete
```

```javascript
{
    "data": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Delete academic titles successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The number of deleted record is not equal to the input: ${deleteCount}/${inputCount}",
}
```

### Tag

#### Get tag with pagination

##### Request

```http
GET /api/v1/config/tag/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

##### Success response

```javascript
{
    "code": 0,
    "message": "Get tag successfully",
    "data": [
        {
            "id": 1,
            "name": "Test 0",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },

         {
            "id": 2,
            "name": "Test 1",
            "created_at": "hh:mm:ss", (Example: "23:59:59"),
            "updated_at": "hh:mm:ss", (Example: "23:59:59"),
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Get all tag

##### Request

```http
GET /api/v1/config/tag/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get tag successfully",
    "data": [
        {
            "id": 1,
            "name": "Test 0",
        },

         {
            "id": 2,
            "name": "Test 1",
        },
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Create multiple tags

##### Request

```http
POST /api/v1/config/tag/create
```

```javascript
{
    "data": [
        {
            "name": "Test 0",
        },

         {
            "name": "Test 1",
        },
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save tag successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Update a tag

##### Request

```http
PUT /api/v1/config/tag/:id/update
```

```javascript
{
    "id" : 1,
    "name": "Test 0",
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save tag successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "The updated tag is not exists",
}
```

#### Delete multiple tags

##### Request

```http
DELETE /api/v1/config/tag/delete
```

````javascript
{
    "data": [
        {
            "id": 1
        },
        {
            "id": 2
        }
    ]
}
##### Success response
```javascript
{
    "code": 0,
    "message": "Delete tags successfully",
}
````

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

````javascript
{
    "code": 2,
    "message": "The number of deleted record is not equal to the input: ${deleteCount}/${inputCount}",
}

### Lecturer
#### Create multiple lecturers

##### Request

```http
POST /api/v1/lecturers/create
````

```javascript
{
    "data": [
        {
            "account_id": 2,
            "name": "test",
            "gender": "male",
            "avatar": null
        }
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Create lecturer successfully!"
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Create lecturer failed!"
}
```

#### Update one lecturer

##### Request

```http
POST /api/v1/lecturers/update/1
```

```javascript
{
    "data":
        {
            "account_id": 4,
            "name": "lecturer 3",
            "gender": "male",
            "avatar": null,
            "date_of_birth": "2001-04-22",
            "academic_rank_id": 1,
            "academic_rank_gain_year": 2022,
            "academic_title_id": 1,
            "academic_title_gain_year": 2023,
            "is_deleted": 0,
            "expand_column": null
        }

}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Update lecturer successfully!"
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Update lecturer failed!"
}
```

#### Delete one lecturer

##### Request

```http
DELETE /api/v1/lecturers/delete
```

```javascript
{
    "data": [
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Delete lecturer successfully!"
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Delete lecturer failed!"
}
```

## Article API

### Get Article with pagination with/without Article Name's keyword

#### Request

```http
GET /api/v1/articles/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                                    |
| ---------- | ---------------------- | ------------------------------------------------------- |
| pageOffset | integer greater than 0 | required, using 1-indexing                              |
| limitSize  | integer greater than 0 | required, maximum number of records to return           |
| keyword    | string                 | not require, the keyword to search the Article with its |

#### Success response

```javascript
{
    "code": 0,
    "message": "Get article successfully",
    "data": [
        {
            "id": 96,
            "name": "TEST",
            "journal": "TEST",
            "year": 2023,
            "page_from": 11,
            "page_to": 12,
            "volume": 24,
            "issue": 3,
            "city": null,
            "abstract": "TEST",
            "url_date_accces": "2023-03-27T17:00:00.000Z",
            "ArXivID": "TEST",
            "DOI": "TEST",
            "ISBN": "TEST",
            "ISSN": "TEST",
            "PMID": "TEST",
            "Scopus": "TEST",
            "PII": "TEST",
            "SGR": "TEST",
            "project_id": "TEST",
            "citation_key": "TEST",
            "general_note": "TEST",
            "urls": [
                {
                    "id": 253,
                    "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=moment+date+parse"
                },
                {
                    "id": 254,
                    "url": "https://stackoverflow.com/questions/22184747/parse-string-to-date-with-moment-js"
                },
                {
                    "id": 255,
                    "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql"
                },
                {
                    "id": 256,
                    "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql"
                }
            ],
            "files": [
                {
                    "id": 26,
                    "path": "b43e3d29-516d-4811-b0a5-58820ec6df44.pdf",
                    "original_file_name": "invoice9-12-01-2023.pdf"
                },
                {
                    "id": 28,
                    "path": "6f589192-7248-4b28-b8eb-54a940b3d4e4.pdf",
                    "original_file_name": "test_file.pdf"
                }
            ],
            "notes": [
                {
                    "id": 256,
                    "note": "Sample note test 1"
                },
                {
                    "id": 257,
                    "note": "Sample note test 2"
                },
                {
                    "id": 258,
                    "note": "Sample note test CREATE"
                },
                {
                    "id": 259,
                    "note": "Sample note test CREATE"
                }
            ],
            "tags": [
                {
                    "id": 188,
                    "tag_id": 164,
                    "name": "test tag 1"
                },
                {
                    "id": 189,
                    "tag_id": 4,
                    "name": "test--1"
                },
                {
                    "id": 190,
                    "tag_id": 5,
                    "name": "test1"
                },
                {
                    "id": 191,
                    "tag_id": 165,
                    "name": "test tag 1"
                },
                {
                    "id": 192,
                    "tag_id": 6,
                    "name": "test2"
                },
                {
                    "id": 193,
                    "tag_id": 166,
                    "name": "test tag 1"
                },
                {
                    "id": 194,
                    "tag_id": 6,
                    "name": "test2"
                }
            ],
            "authors": [
                {
                    "id": 402,
                    "firstName": "first0",
                    "lastName": "last0"
                },
                {
                    "id": 403,
                    "firstName": "first1",
                    "lastName": "last1"
                },
                {
                    "id": 404,
                    "firstName": "first2",
                    "lastName": "last2"
                },
                {
                    "id": 405,
                    "lecturer_id": 2,
                    "lecturer_name": null
                },
                {
                    "id": 406,
                    "lecturer_id": 1,
                    "lecturer_name": null
                },
                {
                    "id": 407,
                    "firstName": "first_keke",
                    "lastName": "last_keke"
                },
                {
                    "id": 408,
                    "lecturer_id": 1,
                    "lecturer_name": null
                },
                {
                    "id": 409,
                    "firstName": "first_keke",
                    "lastName": "last_keke"
                }
            ]
        }
    ]
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

### Get All Article with given Lecturers' id
#### Request 
```http
POST /api/v1/articles/fetch-all
```
```javascript
{
    "data": {
        "lecturerIds": [1, 2, 3, 4]
    }
}
```

#### Success response
```javascript
{
    "code": 0,
    "message": "Get article successfully",
    "data": {
        "1": [
            {
                "id": 96,
                "name": "TEST",
                "journal": "TEST",
                "year": 2023,
                "pageFrom": 11,
                "pageTo": 12,
                "volume": 24,
                "issue": 3,
                "city": null,
                "abstract": "TEST",
                "urlAccessDate": "2023-03-27T17:00:00.000Z",
                "ArXivID": "TEST",
                "DOI": "TEST",
                "ISBN": "TEST",
                "ISSN": "TEST",
                "PMID": "TEST",
                "Scopus": "TEST",
                "PII": "TEST",
                "SGR": "TEST",
                "projectId": "TEST",
                "citationKey": "TEST",
                "generalNote": "TEST",
                "lecturer_id": 1
            },
            {
                "id": 96,
                "name": "TEST",
                "journal": "TEST",
                "year": 2023,
                "pageFrom": 11,
                "pageTo": 12,
                "volume": 24,
                "issue": 3,
                "city": null,
                "abstract": "TEST",
                "urlAccessDate": "2023-03-27T17:00:00.000Z",
                "ArXivID": "TEST",
                "DOI": "TEST",
                "ISBN": "TEST",
                "ISSN": "TEST",
                "PMID": "TEST",
                "Scopus": "TEST",
                "PII": "TEST",
                "SGR": "TEST",
                "projectId": "TEST",
                "citationKey": "TEST",
                "generalNote": "TEST",
                "lecturer_id": 1
            }
        ],
        "2": [
            {
                "id": 96,
                "name": "TEST",
                "journal": "TEST",
                "year": 2023,
                "pageFrom": 11,
                "pageTo": 12,
                "volume": 24,
                "issue": 3,
                "city": null,
                "abstract": "TEST",
                "urlAccessDate": "2023-03-27T17:00:00.000Z",
                "ArXivID": "TEST",
                "DOI": "TEST",
                "ISBN": "TEST",
                "ISSN": "TEST",
                "PMID": "TEST",
                "Scopus": "TEST",
                "PII": "TEST",
                "SGR": "TEST",
                "projectId": "TEST",
                "citationKey": "TEST",
                "generalNote": "TEST",
                "lecturer_id": 2
            }
        ]
    }
}

```
#### Error response
```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

### Create an article
#### Request

```
POST /api/v1/articles/create
```

```javascript
POST /api/v1/articles/create HTTP/1.1
Host: 127.0.0.1:8080
Content-Length: 3659
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="data"

{
    "name": "The Impact of Gamification on Learning Outcomes of Computer Science Majors",
    "journal": "ACM Transactions on Computing Education",
    "year": 2020,
    "pageFrom": 8,
    "pageTo": 10,
    "volume": 20,
    "issue": 2,
    "month":  2,
    "day": 28,
    "abstract": "Gamification is the use of game elements in domains other than games. Gamification use is often suggested for difficult activities because it enhances users' engagement and motivation level. Due to such benefits, the use of gamification is also proposed in education environments to improve students' performance, engagement, and satisfaction. Computer science in higher education is a tough area of study and thus needs to utilize various already explored benefits of gamification. This research develops an empirical study to evaluate the effectiveness of gamification in teaching computer science in higher education. Along with the learning outcomes, the effect of group size on students' satisfaction level is also measured. Furthermore, the impact of gamification over time is analyzed throughout a semester to observe its effectiveness as a long-term learning technique. The analysis, covering both learning outcome and students' satisfaction, suggests that gamification is an effective tool to teach tough courses at higher education level; however, group size should be taken into account for optimal classroom size and better learning experience.",
    "urlAccessDate": "28/02/2023",
    "ArXivID": "test",
    "DOI": "10.1145/3383456",
    "ISBN": "testISBN",
    "ISSN": "10.1145/3383456",
    "PMID": "testPMID",
    "Scopus": "2-s2.0-85085248397",
    "PII": "testPII",
    "SGR": "85085248397",
    "projectId": "testProjectId",
    "citationKey": "testCitationKey",
    "generalNote": "This is the general note for testing",
    "tags": [
        {
            "tag_id": 4
        },
        {
            "tag_id": 5
        },
        {
            "name": "test tag 0"
        },
        {
            "name": "test tag 1"
        }
    ],
    "authors": [
        {
            "lecturerId": 1
        },
        {
            "firstName": "first0",
            "lastName": "last0"
        },
                        {
            "firstName": "first1",
            "lastName": "last1"
        },
                        {
            "firstName": "first2",
            "lastName": "last2"
        },
        {
            "lecturerId": 2
        }
    ],
    "urls": [
        {
            "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql"
        },
        {
            "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=moment+date+parse"
        },
        {
            "url": "https://stackoverflow.com/questions/22184747/parse-string-to-date-with-moment-js"
        }
    ],
    "notes": [
        {
            "note": "Sample note test 0"
        },
        {
            "note": "Sample note test 1"
        },
        {
            "note": "Sample note test 2"
        }
    ]
}
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="invoice9-12-01-2023.pdf"
Content-Type: application/pdf

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="invoice-9-12-01-2023.pdf"
Content-Type: application/pdf

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="invoice-9-12-01-2023-1.pdf"
Content-Type: application/pdf

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Save article successfully,
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "Upload failed. ${overlimitFiles} ${'are' | 'is'} over the file size limit of ${MAX_FILE_SIZE} MB",
}
```

```javascript
{
    "code": 3,
    "message": "Upload failed. Only ${allowedExtensions} files allowed",
}
```

### Update an article

#### Request

```
PUT /api/v1/articles/:id/update
```

```javascript
PUT /api/v1/articles/94/update HTTP/1.1
Host: 127.0.0.1:8080
Content-Length: 2231
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="data"

{
    "name": "TEST",
    "journal": "TEST",
    "year": 2023,
    "pageFrom": 11,
    "pageTo": 12,
    "volume": 24,
    "issue": 3,
    "month":  3,
    "day": 28,
    "abstract": "TEST",
    "urlAccessDate": "28/03/2023",
    "ArXivID": "TEST",
    "DOI": "TEST",
    "ISBN": "TEST",
    "ISSN": "TEST",
    "PMID": "TEST",
    "Scopus": "TEST",
    "PII": "TEST",
    "SGR": "TEST",
    "projectId": "TEST",
    "citationKey": "TEST",
    "generalNote": "TEST",
    "tags": [
        {
            "tag_id": 6,
            "create": true
        },
        {
            "id": 156,
            "delete": true
        },
        {
            "id": 153,
            "delete": true
        },
        {
            "name": "test tag 1",
            "create": true
        }
    ],
    "authors": [
        {
            "lecturerId": 1,
            "create": true
        },
        {
            "firstName": "first_keke",
            "lastName": "last_keke",
            "create": true
        },
        {
            "id": 352,
            "firstName": "first_352",
            "lastName": "last_352",
            "update": true
        },
        {
            "id": 353,
            "delete": true
        }
    ],
    "urls": [
        {
            "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql",
            "create": true
        },
        {
            "id": 227,
            "url": "url_227",
            "update": true
        },
        {
            "id": 228,
            "delete": true
        }
    ],
    "notes": [
        {
            "note": "Sample note test CREATE",
            "create": true
        },
        {
            "id": 230,
            "note": "Sample note test 230",
            "update": true
        },
        {
            "id": 229,
            "delete": true
        }
    ],
    "files": [
        {
            "id": 9,
            "delete": true
        }
    ]
}
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name=""; filename="test_file.pdf"
Content-Type: application/pdf

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW

```

#### Success response

```javascript
{
    "code": 0,
    "message": "Updade article successfully",
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

```javascript
{
    "code": 2,
    "message": "Upload failed. ${overlimitFiles} ${'are' | 'is'} over the file size limit of ${MAX_FILE_SIZE} MB",
}
```

```javascript
{
    "code": 3,
    "message": "Upload failed. Only ${allowedExtensions} files allowed",
}
```

### Update an article

#### Request

```
DELETE /api/v1/articles/delete
```

```javascript
{
    "data": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Delete article(s) successfully",
}
```

#### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```
