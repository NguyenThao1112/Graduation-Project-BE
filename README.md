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

List ROLE:
ROLE_GUEST: 0,
ROLE_SCHOLAR: 1,
ROLE_ADMIN: 2,

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuMzczMTI5MzkxMjEyNDI0OTQsInJvbGUiOjEsImlhdCI6MTY4NTc4MTQyOSwiZXhwIjoxNjg1Nzg1MDI5fQ.H33p7GmKXyjImGaz7xqW8ykh7oYTjIfuPRofILyJvTs",
    "expire": "2023/06/03 04:37:09",
    "accountId": 2,
    "role": 1,
    "lecturerInfo": {
        "id": 1,
        "name": "Duong Nam",
        "gender": "Nam",
        "avatar": null,
        "dateOfBirth": "1979-05-03T17:00:00.000Z",
        "bio": "Dam me voi cac linh vuc nghien cuu khoa hoc. Phat trien cac ung dung lien quan den CNTT",
        "academicRankId": 1,
        "academicRankGainYear": 2010,
        "academicTitleId": 1,
        "academicTitleGainYear": 2022
    }
}
```

#### Failed response

```javascript
{
    "code": 1,
    "message": "Authenticate failed"
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

#### Get one account by id

```http
GET /api/v1/accounts/1 HTTP/1.1
Host: localhost:3001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuODcwMTQ0MzcxMjU5NjI1Mywicm9sZSI6MSwiaWF0IjoxNjg2MTg5Njk3LCJleHAiOjE2ODYxOTMyOTd9.ySh_NzT85oxCYjX3jPcXPkWaRPR8qZ8FMkxfY9VBU7o
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Get one account successfully!",
    "data": {
        "id": 1,
        "email": "hadtnt71@gmail.com",
        "role": 1,
        "is_deleted": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuODcwMTQ0MzcxMjU5NjI1Mywicm9sZSI6MSwiaWF0IjoxNjg2MTg5Njk3LCJleHAiOjE2ODYxOTMyOTd9.ySh_NzT85oxCYjX3jPcXPkWaRPR8qZ8FMkxfY9VBU7o",
        "token_expired_in": "2023-06-08T03:01:37.000Z",
        "created_at": "2023-06-07T19:01:31.000Z",
        "updated_at": "2023-06-07T19:01:37.000Z"
    }
}
```

#### Failed response

```javascript
{
    "code": 1,
    "message": "Get one account failed!"
}
```

#### Create one account

#### Request

```http
POST /api/v1/accounts HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOjAuMDIxODY1MTUyMzM4MDA2MjMzLCJyb2xlIjoxLCJpYXQiOjE2Nzg4OTIzNTgsImV4cCI6MTY3ODkwMzE1OH0.gpFxXaI9XB0ioVGNysDN8lGYbvF_9z3NYJwhqz74GLw
Content-Type: application/json
Content-Length: 108
```

```javascript
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
GET /api/v1/lecturers/fetch?pageOffset=1&limitSize=10&sort=desc&universityIds=1,2,3,4
```

| Param        | Datatype               | Note                                   |
| ------------ | ---------------------- | -------------------------------------- |
| pageOffset   | integer greater than 0 | using 1-indexing                       |
| limitSize    | integer greater than 0 | maximum number of records to return    |
| sort         | must in ['asc', 'desc']| ordering of sort by name               |
| universityIds| array of integer       | find lecturer which has all university |

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
GET /api/v1/configs/contact-type/fetch?pageOffset=1&limitSize=10
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
GET /api/v1/configs/contact-type/fetch-all
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
POST /api/v1/configs/contact-type/create
```

```javascript
{
    "data": [
        {
            "id": 1,
            "name": "email",
        },
        {   "id": 2,
            "name": "address",
        },
        {
            "id": 3,
            "name": "phone"
        },
        {
            "id": 4,
            "name": "link"
        }
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
PUT /api/v1/configs/contact-type/:id/update
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
DELETE /api/v1/configs/contact-type/delete
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
GET /api/v1/configs/academic-rank/fetch?pageOffset=1&limitSize=10
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
GET /api/v1/configs/academic-rank/fetch-all
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
POST /api/v1/configs/academic-rank/create
```

```javascript
{
    "data": [
        {
            "name": "Tiến sĩ",
        },

         {
            "name": "Phó giáo sư",
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
PUT /api/v1/configs/academic-rank/:id/update
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
DELETE /api/v1/configs/academic-rank/delete
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
GET /api/v1/configs/academic-title/fetch?pageOffset=1&limitSize=10
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
GET /api/v1/configs/academic-title/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get academic title successfully",
    "data": [
        {
            "id": 1,
            "name": "Cử nhân",
        },

         {
            "id": 2,
            "name": "Kỹ sư",
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
POST /api/v1/configs/academic-title/create
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
PUT /api/v1/configs/academic-title/:id/update
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
DELETE /api/v1/configs/academic-title/delete
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
GET /api/v1/configs/tag/fetch?pageOffset=1&limitSize=10
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
GET /api/v1/configs/tag/fetch-all
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
POST /api/v1/configs/tag/create
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
PUT /api/v1/configs/tag/:id/update
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
DELETE /api/v1/configs/tag/delete
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

```javascript
{
    "code": 2,
    "message": "The number of deleted record is not equal to the input: ${deleteCount}/${inputCount}",
}
```

### Activity type

#### Get activity type with pagination

##### Request

```http
GET /api/v1/configs/activity-type/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

##### Success response

```javascript
{
    "code": 0,
    "message": "Get activity type successfully",
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

#### Get all activity type

##### Request

```http
GET /api/v1/configs/activity-type/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get activity type successfully",
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

#### Create multiple activity types

##### Request

```http
POST /api/v1/config/activity-type/create
```

```javascript
{
    "data": [
        {
            "name": "Tham gia viện nghiên cứu",
        },

         {
            "name": "Giảng dạy ở trường Đại học",
        },
    ]
}
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Save activity type successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Update an activity type

##### Request

```http
PUT /api/v1/configs/activity-type/:id/update
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
    "message": "Save activity type successfully",
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
    "message": "The updated activity type is not exists",
}
```

#### Delete multiple activity types

##### Request

```http
DELETE /api/v1/configs/activity-type/delete
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
    "message": "Delete activity types successfully",
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

### University

#### Get university with pagination

##### Request

```http
GET /api/v1/configs/university/fetch?pageOffset=1&limitSize=10
```

| Param      | Datatype               | Note                                |
| ---------- | ---------------------- | ----------------------------------- |
| pageOffset | integer greater than 0 | using 1-indexing                    |
| limitSize  | integer greater than 0 | maximum number of records to return |

##### Success response

```javascript
{
    "code": 0,
    "message": "Get university successfully",
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

#### Get all university

##### Request

```http
GET /api/v1/configs/university/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get university successfully",
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

#### Get all university to filter

##### Request

```http
GET /api/v1/configs/university/fetch-all-to-filter
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get university successfully",
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


#### Create multiple universities

##### Request

```http
POST /api/v1/configs/university/create
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
    "message": "Save university successfully",
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```

#### Update an university

##### Request

```http
PUT /api/v1/configs/university/:id/update
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
    "message": "Save university successfully",
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
    "message": "The updated university is not exists",
}
```

#### Delete multiple universities

##### Request

```http
DELETE /api/v1/configs/university/delete
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
    "message": "Delete universities successfully",
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
### Discipline

#### Get all discipline
##### Request

```http
GET /api/v1/configs/discipline/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get discipline successfully",
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

### Expertise

#### Get all expertise
##### Request

```http
GET /api/v1/configs/expertise/fetch-all
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get expertise successfully",
    "data": [
        {
            "specialization": "Test 0",
            "code": "TEST1",
        },

        {
            "specialization": "Test 1",
            "code": "TEST1",
        }
    ]
}
```


## Lecturer API

### Create multiple lecturers

##### Request

```
POST /api/v1/lecturers/create
```

```javascript
{
    "data": {
        "accountId": 1,
        "name": "Nguyen Van Vu",
        "gender": "male",
        "avatar": "http://image",
        "bio": "Đang là giảng viên trường Đại học Khoa học Tự Nhiên HCMUS",
        "dateOfBirth": "04/05/1977",
        "academicRankId": 1,
        "academicRankGainYear": "2010",
        "academicTitleId": 1,
        "academicTitleGainYear": "2022",
        "expandColumn": null,
        "phdThesises": [
            {
                "projectName": "Ước lượng công nghệ phần mềm cho các dự án Agile",
                "phdName": "Trương Văn Thông",
                "educationLevel": "tiến sĩ"
            },
            {
                "projectName": "Xác định tập dữ liệu huấn luyện phù hợp nhằm hiệu chỉnh mô hình cocomo",
                "phdName": "Huỳnh Thị Phương Thủy",
                "graduationYear": "2016",
                "educationLevel": "Cao học",
                "note": "102.03-2014.34"
            }
        ],
        "books": [
            {
                "book_id": "3"
            },
            {
                "name": "IEEE International Symposium on High Assurance Systems Engineering",
                "publisherName": "IEEE CPS, ISBN-13; 978",
                "publicYear": "2018",
                "coAuthors": "Dongjin Yu, Vu Nguyen, Confeng Jian"
            }
        ],
        "contacts": [
            {
                "contactTypeId": 2,
                "value": "288 Hai Ba Trung"
            },
            {
                "contactTypeId": 3,
                "value": "0962763170"
            }
        ],
        "projects": [
            {
                "name": "Xây dựng môi trường tích hợp trên web hỗ trợ cho đào tạo, nghiên cứu và phát triển dự án trong công nghệ phần mềm",
                "projectCode": "B2013-18-01(ĐHQG HCM)",
                "fromDate": "03/2013",
                "toDate": "03/2016",
                "expenditure": "500",
                "projectRole": "Tham gia",
                "acceptanceDate": "06/08/2016",
                "result": "Đạt"
            }
        ],
        "currentDiscipline": {
            "disciplineId": 1,
            "departmentName": "Khoa công nghệ thông tin",
            "universityId": 1,
            "position": "Phó khoa CNTT, trưởng bộ môn CNPM, khoa CNTT, trường ĐHKHTN-ĐHQG-HCM"
        },
        "researchFields": [
            {
                "researchName": "Ước lượng phần mềm",
                "note": "Software Estimation"
            },
            {
                "researchName": "Quy trình phần mềm",
                "note": "Software Processes"
            }
        ],
        "expertises": [
            {
                "title": "Lĩnh vực",
                "specialization": "Công nghệ thông tin"
            },
            {
                "title": "Chuyên ngành",
                "specialization": "Công nghệ phần mềm"
            }
        ],
        "degrees": [
            {
                "academicTitleId": 1,
                "universityId": 1,
                "specialization": "Công nghệ thông tin",
                "graduationDate": 2019
            },
            {
                "academicTitleId": 2,
                "universityId": 2,
                "specialization": "Khoa học máy tính",
                "graduationDate": 2010,
                "graduationThesisName": "Improved size and effor estimation models for Software Maintainance"
            }
        ],
        "workPositions": [
            {
                "universityId": 2,
                "position": "Phó trưởng khoa",
                "isNow": true,
                "fromDate": 2019
            },
            {
                "company": "Công ty PSV (nay là công ty CSC Việt Nam)",
                "position": "Kỹ sư công nghệ phần mềm",
                "fromDate": 1999,
                "toDate": 2004
            },
            {
                "universityName": "Trường Đại học Nam California",
                "position": "Nghiên cứu sinh, trợ giảng",
                "fromDate": 2004,
                "toDate": 2010
            },
            {
                "universityName": "Trường Đại học Bắc California",
                "position": "Nghiên cứu sinh, trợ giảng",
                "fromDate": 2004,
                "toDate": 2010
            }
        ],
        "activities": [
            {
                "activityTypeId": 1,
                "name": "Journal of Software: Evolution and Process",
                "note": "Phản biện (reviewer)",
                "fromDate": 2019,
                "isNow": true
            },
            {
                "activityTypeName": "Tham gia làm việc tại trường Đại học",
                "name": "Sở khoa học và công nghệ, TPHCM",
                "fromDate": 2020,
                "toDate": 2022,
                "note": "Thành viên tổ chuyên gia"
            },
            {
                "activityTypeName": "Tham gia làm việc tại trường Viện",
                "name": "Sở khoa học và công nghệ, TPHCM",
                "fromDate": 2020,
                "toDate": 2022,
                "note": "Thành viên tổ chuyên gia"
            }
        ]
    }
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

### Get lecturer with pagination with/without lecturer Name's keyword

#### Request

```http
GET /api/v1/lecturers/fetch?pageOffset=1&limitSize=10&sort=asc&universityIds=1,2,3,4,5&expertiseCodes=1,2,3,4
```

| Param         | Datatype               | Note                                                    |
| ------------- | ---------------------- | ------------------------------------------------------- |
| pageOffset    | integer greater than 0 | required, using 1-indexing                              |
| limitSize     | integer greater than 0 | required, maximum number of records to return           |
| keyword       | string                 | not require, the keyword to search the Article with its |
| sort          | must in ['asc', 'desc']| not require, ordering of sort by name                   |
| universityIds | array of integer       | not require, find lecturer which has all university     |
| expertiseCodes| array of string        | not require, find lecturer which has all expertises     |

#### Success response

```javascript
{
    "code": 0,
    "message": "Get lecturers successfully",
    "data": [
        {
            "id": 1,
            "name": "Nguyen Van Vu",
            "gender": "male",
            "avatar": "http://image",
            "dateOfBirth": "1977-05-03T17:00:00.000Z",
            "academicRankId": null,
            "academicRankGainYear": 2010,
            "academicTitleId": 1,
            "academicTitleGainYear": 2022,
            "phdThesises": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "projectName": "Ước lượng công nghệ phần mềm cho các dự án Agile",
                    "phdName": "Trương Văn Thông",
                    "graduationYear": "tiến sĩ",
                    "note": null
                },
                {
                    "id": 2,
                    "lecturerId": 1,
                    "projectName": "Xác định tập dữ liệu huấn luyện phù hợp nhằm hiệu chỉnh mô hình cocomo",
                    "phdName": "Huỳnh Thị Phương Thủy",
                    "graduationYear": "Cao học",
                    "note": "102.03-2014.34"
                }
            ],
            "books": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "name": "IEEE International Symposium on High Assurance Systems Engineering",
                    "projectId": null,
                    "publisherName": "IEEE CPS, ISBN-13; 978",
                    "publicYear": 2018,
                    "coAuthors": "Dongjin Yu, Vu Nguyen, Confeng Jian",
                    "pseudonym": null
                }
            ],
            "projects": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "name": "Xây dựng môi trường tích hợp trên web hỗ trợ cho đào tạo, nghiên cứu và phát triển dự án trong công nghệ phần mềm",
                    "projectCode": "B2013-18-01(ĐHQG HCM)",
                    "fromDate": "03/2013",
                    "toDate": "03/2016",
                    "expenditure": 500,
                    "projectRole": "Tham gia",
                    "acceptanceDate": "2016-08-05T17:00:00.000Z",
                    "result": "Đạt",
                    "note": null,
                    "reference": null
                }
            ],
            "currentDisciplines": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "departmentName": "Khoa công nghệ thông tin",
                    "universityName": "Đại học Khoa học tự nhiên",
                    "position": "Phó khoa CNTT, trưởng bộ môn CNPM, khoa CNTT, trường ĐHKHTN-ĐHQG-HCM"
                }
            ],
            "academicTitles": [
                {
                    "lecturerId": 1,
                    "id": 1,
                    "name": "Tiến sỹ"
                }
            ],
            "expertises": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "title": "Lĩnh vực",
                    "specialization": "Công nghệ thông tin"
                },
                {
                    "id": 2,
                    "lecturerId": 1,
                    "title": "Chuyên ngành",
                    "specialization": "Công nghệ phần mềm"
                }
            ],
            "researchFields": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "researchName": "Ước lượng phần mềm",
                    "note": "Software Estimation"
                },
                {
                    "id": 2,
                    "lecturerId": 1,
                    "researchName": "Quy trình phần mềm",
                    "note": "Software Processes"
                }
            ],
            "degrees": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "academicTitleName": "Tiến sỹ",
                    "universityName": "ĐH KHTN TP.HCM",
                    "specialization": "Công nghệ thông tin",
                    "graduationThesisName": null,
                    "graduationDate": 2019
                },
                {
                    "id": 2,
                    "lecturerId": 1,
                    "academicTitleName": "Tiến sỹ",
                    "universityName": "Đại học Nam California",
                    "specialization": "Khoa học máy tính",
                    "graduationThesisName": "Improved size and effor estimation models for Software Maintainance",
                    "graduationDate": 2010
                }
            ],
            "workPositions": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "universityName": "ĐH KHTN TP.HCM",
                    "company": null,
                    "position": "Phó trưởng khoa",
                    "isNow": 1,
                    "fromDate": 2019,
                    "toDate": null
                },
                {
                    "id": 3,
                    "lecturerId": 1,
                    "universityName": "Trường Đại học Nam California",
                    "company": null,
                    "position": "Nghiên cứu sinh, trợ giảng",
                    "isNow": null,
                    "fromDate": 2004,
                    "toDate": 2010
                },
                {
                    "id": 4,
                    "lecturerId": 1,
                    "universityName": "Trường Đại học Bắc California",
                    "company": null,
                    "position": "Nghiên cứu sinh, trợ giảng",
                    "isNow": null,
                    "fromDate": 2004,
                    "toDate": 2010
                }
            ],
            "activities": [
                {
                    "id": 1,
                    "lecturerId": 1,
                    "activityTypeName": "Tham gia làm việc tại trường Đại học",
                    "activityName": "Journal of Software: Evolution and Process",
                    "note": "Phản biện (reviewer)",
                    "isNow": 1,
                    "fromDate": 2019,
                    "toDate": null
                },
                {
                    "id": 2,
                    "lecturerId": 1,
                    "activityTypeName": "Tham gia làm việc tại trường Đại học",
                    "activityName": "Sở khoa học và công nghệ, TPHCM",
                    "note": "Thành viên tổ chuyên gia",
                    "isNow": null,
                    "fromDate": 2020,
                    "toDate": 2022
                },
                {
                    "id": 3,
                    "lecturerId": 1,
                    "activityTypeName": "Tham gia làm việc tại trường Viện",
                    "activityName": "Sở khoa học và công nghệ, TPHCM",
                    "note": "Thành viên tổ chuyên gia",
                    "isNow": null,
                    "fromDate": 2020,
                    "toDate": 2022
                }
            ]
        },
        {
            "id": 2,
            "name": "Nguyen Van Vu",
            "gender": null,
            "avatar": null,
            "dateOfBirth": null,
            "academicRankId": null,
            "academicRankGainYear": null,
            "academicTitleId": null,
            "academicTitleGainYear": null
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

#### Get all lecturers without pagination

#### Request

```http
GET /api/v1/lecturers/fetch-all
```

#### Success Response

```javascript
{
    "code": 0,
    "message": "Fetch the lecturer from database successfully",
    "data": [
        {
            "id": 1,
            "accountId": 1,
            "name": "Nguyen Van Vu-1",
            "gender": "male",
            "avatar": "http://image",
            "dateOfBirth": "1977-05-03T17:00:00.000Z",
            "bio": "Đang là giảng viên trường Đại học Khoa học Tự Nhiên HCMUS",
            "academicRankId": 1,
            "academicRankGainYear": 2010,
            "academicTitleId": 1,
            "academicTitleGainYear": 2022
        },
        {
            "id": 2,
            "accountId": 1,
            "name": "Nguyen Van Vu",
            "gender": "male",
            "avatar": "http://image",
            "dateOfBirth": "1977-05-03T17:00:00.000Z",
            "bio": null,
            "academicRankId": 1,
            "academicRankGainYear": 2010,
            "academicTitleId": 1,
            "academicTitleGainYear": 2022
        }
    ]
}
```

#### Failed response

```javascript
{
    "code": 1,
    "message": "Get lecturers failed"
}
```

### Get one lecturer

##### Request

```
GET /api/v1/lecturers/detail/:id
```

##### Success response

```javascript
{
    "code": 0,
    "message": "Get one lecturer successfully!",
    "data": [
        {
            "id": 2,
            "name": "Nguyen Van Vu",
            "gender": "male",
            "avatar": "http://image",
            "bio": null,
            "dateOfBirth": "1977-05-03T17:00:00.000Z",
            "academicRankId": 1,
            "academicRankGainYear": 2010,
            "academicTitleId": 1,
            "academicTitleGainYear": 2022,
            "phdThesises": [
                {
                    "id": 3,
                    "lecturerId": 2,
                    "projectName": "Ước lượng công nghệ phần mềm cho các dự án Agile",
                    "phdName": "Trương Văn Thông",
                    "graduationYear": "tiến sĩ",
                    "note": null
                },
                {
                    "id": 4,
                    "lecturerId": 2,
                    "projectName": "Xác định tập dữ liệu huấn luyện phù hợp nhằm hiệu chỉnh mô hình cocomo",
                    "phdName": "Huỳnh Thị Phương Thủy",
                    "graduationYear": "Cao học",
                    "note": "102.03-2014.34"
                }
            ],
            "books": [
                {
                    "id": 2,
                    "lecturerId": 2,
                    "name": "IEEE International Symposium on High Assurance Systems Engineering",
                    "projectId": null,
                    "publisherName": "IEEE CPS, ISBN-13; 978",
                    "publicYear": 2018,
                    "coAuthors": "Dongjin Yu, Vu Nguyen, Confeng Jian",
                    "pseudonym": null
                },
                {
                    "id": 3,
                    "lecturerId": 2,
                    "name": "IEEE International Symposium on High Assurance Systems Engineering",
                    "projectId": null,
                    "publisherName": "IEEE CPS, ISBN-13; 978",
                    "publicYear": 2018,
                    "coAuthors": "Dongjin Yu, Vu Nguyen, Confeng Jian",
                    "pseudonym": null
                }
            ],
            "contacts": [
                {
                    "id": 3,
                    "lecturerId": 2,
                    "value": "288 Hai Ba Trung",
                    "contactTypeName": null
                },
                {
                    "id": 4,
                    "lecturerId": 2,
                    "value": "0962763170",
                    "contactTypeName": null
                }
            ],
            "projects": [
                {
                    "id": 2,
                    "lecturerId": 2,
                    "name": "Xây dựng môi trường tích hợp trên web hỗ trợ cho đào tạo, nghiên cứu và phát triển dự án trong công nghệ phần mềm",
                    "projectCode": "B2013-18-01(ĐHQG HCM)",
                    "fromDate": "03/2013",
                    "toDate": "03/2016",
                    "expenditure": 500,
                    "projectRole": "Tham gia",
                    "acceptanceDate": "2016-08-05T17:00:00.000Z",
                    "result": "Đạt",
                    "note": null,
                    "reference": null
                }
            ],
            "currentDisciplines": [
                {
                    "id": 2,
                    "lecturerId": 2,
                    "departmentName": "Khoa công nghệ thông tin",
                    "universityName": "Trường Đại học Nam California",
                    "position": "Phó khoa CNTT, trưởng bộ môn CNPM, khoa CNTT, trường ĐHKHTN-ĐHQG-HCM"
                }
            ],
            "academicTitles": [
                {
                    "lecturerId": 2,
                    "id": 1,
                    "name": "tiến sĩ"
                }
            ],
            "expertises": [
                {
                    "id": 3,
                    "lecturerId": 2,
                    "title": "Lĩnh vực",
                    "specialization": "Công nghệ thông tin"
                },
                {
                    "id": 4,
                    "lecturerId": 2,
                    "title": "Chuyên ngành",
                    "specialization": "Công nghệ phần mềm"
                }
            ],
            "researchFields": [
                {
                    "id": 3,
                    "lecturerId": 2,
                    "researchName": "Ước lượng phần mềm",
                    "note": "Software Estimation"
                },
                {
                    "id": 4,
                    "lecturerId": 2,
                    "researchName": "Quy trình phần mềm",
                    "note": "Software Processes"
                }
            ],
            "degrees": [
                {
                    "id": 3,
                    "lecturerId": 2,
                    "academicTitleName": "tiến sĩ",
                    "universityName": "Trường Đại học Nam California",
                    "specialization": "Công nghệ thông tin",
                    "graduationThesisName": null,
                    "graduationDate": 2019
                },
                {
                    "id": 4,
                    "lecturerId": 2,
                    "academicTitleName": null,
                    "universityName": "Trường Đại học Bắc California",
                    "specialization": "Khoa học máy tính",
                    "graduationThesisName": "Improved size and effor estimation models for Software Maintainance",
                    "graduationDate": 2010
                }
            ],
            "workPositions": [
                {
                    "id": 5,
                    "lecturerId": 2,
                    "universityName": "Trường Đại học Bắc California",
                    "company": null,
                    "position": "Phó trưởng khoa",
                    "isNow": 1,
                    "fromDate": 2019,
                    "toDate": null
                },
                {
                    "id": 6,
                    "lecturerId": 2,
                    "universityName": null,
                    "company": "Công ty PSV (nay là công ty CSC Việt Nam)",
                    "position": "Kỹ sư công nghệ phần mềm",
                    "isNow": null,
                    "fromDate": 1999,
                    "toDate": 2004
                },
                {
                    "id": 7,
                    "lecturerId": 2,
                    "universityName": "Trường Đại học Nam California",
                    "company": null,
                    "position": "Nghiên cứu sinh, trợ giảng",
                    "isNow": null,
                    "fromDate": 2004,
                    "toDate": 2010
                },
                {
                    "id": 8,
                    "lecturerId": 2,
                    "universityName": "Trường Đại học Bắc California",
                    "company": null,
                    "position": "Nghiên cứu sinh, trợ giảng",
                    "isNow": null,
                    "fromDate": 2004,
                    "toDate": 2010
                }
            ],
            "activities": [
                {
                    "id": 4,
                    "lecturerId": 2,
                    "activityTypeName": "Tham gia làm việc tại trường Đại học",
                    "activityName": "Journal of Software: Evolution and Process",
                    "note": "Phản biện (reviewer)",
                    "isNow": 1,
                    "fromDate": 2019,
                    "toDate": null
                },
                {
                    "id": 5,
                    "lecturerId": 2,
                    "activityTypeName": "Tham gia làm việc tại trường Đại học",
                    "activityName": "Sở khoa học và công nghệ, TPHCM",
                    "note": "Thành viên tổ chuyên gia",
                    "isNow": null,
                    "fromDate": 2020,
                    "toDate": 2022
                },
                {
                    "id": 6,
                    "lecturerId": 2,
                    "activityTypeName": "Tham gia làm việc tại trường Viện",
                    "activityName": "Sở khoa học và công nghệ, TPHCM",
                    "note": "Thành viên tổ chuyên gia",
                    "isNow": null,
                    "fromDate": 2020,
                    "toDate": 2022
                }
            ]
        }
    ]
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Get one lecturer failed!"
}
```

#### Update one lecturer

##### Request

```http
PUT /api/v1/lecturers/:id/update
```

```javascript
{

    "data": {
        "id": 1,
        "name": "Nguyen Van Vu1",
        "gender": "male",
        "avatar": "http://image",
        "dateOfBirth": "04/05/1977",
        "bio": "Giao su truong khoa hoc tu nhien - update1",
        "academicRankId": 1,
        "academicRankGainYear": "2010",
        "academicTitleId": 1,
        "academicTitleGainYear": "2022",
        "expandColumn": null,
        "phdThesises": [
            {
                "id": "1",
                "projectName": "Ước lượng công nghệ phần mềm cho các dự án Agile - update",
                "phdName": "Trương Văn Thông - update",
                "educationLevel": "tiến sĩ",
                "update": true
            },
            {
                "id": "2",
                "projectName": "Xác định tập dữ liệu huấn luyện phù hợp nhằm hiệu chỉnh mô hình cocomo - update",
                "phdName": "Huỳnh Thị Phương Thủy- update",
                "educationLevel": "tiến sĩ",
                "update": true
            }
        ],
        "books": [
            {
                "id": "1",
                "name": "IEEE International Symposium on High Assurance Systems Engineering - update",
                "publisherName": "IEEE CPS, ISBN-13; 978",
                "publicYear": "2018",
                "coAuthors": "Dongjin Yu, Vu Nguyen, Confeng Jian",
                "delete": true
            },
            {
                "create": true,
                "name": "IEEE International Symposium on High Assurance Systems Engineering - new",
                "publisherName": "IEEE CPS, ISBN-13; 978",
                "publicYear": "2018",
                "coAuthors": "Dongjin Yu, Vu Nguyen, Confeng Jian"
            }
        ],
        "contacts": [
            {
                "id": 1,
                "value": "288 Hai Ba Trung1 - update",
                "update": true
            },
            {
                "id": 2,
                "value": "09627631701 - update",
                "update": true
            }
        ],
        "projects": [
            {
                "id": 1,
                "name": "Xây dựng môi trường tích hợp trên web hỗ trợ cho đào tạo, nghiên cứu và phát triển dự án trong công nghệ phần mềm - update",
                "projectCode": "B2013-18-01(ĐHQG HCM)",
                "fromDate": "03/2013",
                "toDate": "03/2016",
                "expenditure": "500",
                "projectRole": "Tham gia",
                "acceptanceDate": "06/08/2016",
                "result": "Đạt",
                "update": true
            },
            {
                "name": "Xây dựng môi trường tích hợp trên web hỗ trợ cho đào tạo, nghiên cứu và phát triển dự án trong công nghệ phần mềm - create",
                "projectCode": "B2013-18-01(ĐHQG HCM)",
                "fromDate": "03/2013",
                "toDate": "03/2016",
                "expenditure": "500",
                "projectRole": "Tham gia",
                "acceptanceDate": "06/08/2016",
                "result": "Đạt",
                "create": true
            },
            {
                "id": 2,
                "delete": true
            }
        ],
        "currentDiscipline": {
            "id": 2,
            "disciplineId": 2,
            "departmentName": "Khoa công nghệ thông tin",
            "universityId": 2,
            "position": "Phó khoa CNTT, trưởng bộ môn CNPM, khoa CNTT, trường ĐHKHTN-ĐHQG-HCM"
        },
        "researchFields": [
            {
                "id": 1,
                "update": true,
                "researchName": "Ước lượng phần mềm - update",
                "note": "Software Estimation"
            },
            {
                "create": true,
                "researchName": "Quy trình phần mềm - create",
                "note": "Software Processes"
            },
            {
                "id": 2,
                "delete": true
            }
        ],
        "expertises": [
            {
                "create": true,
                "title": "Lĩnh vực",
                "specialization": "Công nghệ thông tin - create"
            },
            {
                "id": 1,
                "title": "Chuyên ngành",
                "specialization": "Công nghệ phần mềm - update",
                "update": true
            },
            {
                "id": 2,
                "delete": true
            }
        ],
        "degrees": [
            {
                "id": 1,
                "update": true,
                "academicTitleId": 2,
                "universityId": 2,
                "specialization": "Công nghệ thông tin- update",
                "graduationDate": 2019
            },
            {
                "create": true,
                "academicTitleId": 3,
                "universityId": 3,
                "specialization": "Khoa học máy tính",
                "graduationDate": 2010,
                "graduationThesisName": "Improved size and effor estimation models for Software Maintainance - create"
            },
            {
                "id": 2,
                "delete": true
            }
        ],
        "workPositions": [
            {
                "id": 1,
                "update":true,
                "universityId": 3,
                "position": "Phó trưởng khoa - update",
                "isNow": true,
                "fromDate": 2019
            },
            {
                "create": true,
                "company": "Công ty PSV (nay là công ty CSC Việt Nam) - create",
                "position": "Kỹ sư công nghệ phần mềm",
                "fromDate": 1999,
                "toDate": 2004
            },
            {
                "id": 2,
                "delete": true
            }
        ],
        "activities": [
            {
                "id": 1,
                "update": true,
                "activityTypeId": 2,
                "name": "Journal of Software: Evolution and Process - update",
                "note": "Phản biện (reviewer)",
                "fromDate": 2019,
                "isNow": true
            },
            {
                "create": true,
                "activityTypeId": "3",
                "name": "Sở khoa học và công nghệ, TPHCM",
                "fromDate": 2020,
                "toDate": 2022,
                "note": "Thành viên tổ chuyên gia"
            },
            {
                "id": 2,
                "delete": true
            }
        ]
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
            "id": 1
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

### Get lecturer page size, while paging

#### Request

```http
GET /api/v1/lecturers/page-size?limitSize=10&keyword=test&universityIds=1,2,3&expertiseCodes=1,2,3
```

| Param         | Datatype               | Note                                                          |
| ------------- | ---------------------- | ------------------------------------------------------------- |
| limitSize     | integer greater than 0 | required, maximum number of records to return                 |
| keyword       | string                 | not require, the keyword to search the Lecturer with their id |
| universityIds | array of integer       | not require, find lecturer which has all university           |
| expertiseCodes| array of string        | not require, find lecturer which has all expertises           |

#### Success response

```javascript
{
    "code": 0,
    "message": "Get paging size successfully",
    "data": {
        "number_of_page": 0
    }
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Get paging count failed"
}
```

## Article API

### Get Article with pagination with/without Article Name's keyword

#### Request

```http
GET /api/v1/articles/fetch?pageOffset=1&limitSize=10&keyword=abc&sort=desc
```

| Param      | Datatype               | Note                                                    |
| ---------- | ---------------------- | ------------------------------------------------------- |
| pageOffset | integer greater than 0 | required, using 1-indexing                              |
| limitSize  | integer greater than 0 | required, maximum number of records to return           |
| keyword    | string                 | not require, the keyword to search the Article with its |
| sort       | must in ['asc', 'desc']| not require, ordering of sort by name                   |


#### Success response

```javascript
{
    "code": 0,
    "message": "Get article successfully",
    "data": [
        {
            "id": 96,
            "name": "TEST",
            "journal": "TEST journal",
            "conference": "TEST conference",
            "rank": "test rank", 
            "year": 2023,
            "month": 8,
            "day": 12,
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
                "id": 1,
                "name": "The Impact of Gamification on Learning Outcomes of Computer Science Majors",
                "journal": "ACM Transactions on Computing Education",
                "conference": "",
                "rank": "Q1",
                "year": 2020,
                "month": 8,
                "day": 1,
                "page_from": 8,
                "page_to": 10,
                "volume": 20,
                "issue": 2,
                "city": null,
                "abstract": "Gamification is the use of game elements in domains other than games. Gamification use is often suggested for difficult activities because it enhances users' engagement and motivation level. Due to such benefits, the use of gamification is also proposed in education environments to improve students' performance, engagement, and satisfaction. Computer science in higher education is a tough area of study and thus needs to utilize various already explored benefits of gamification. This research develops an empirical study to evaluate the effectiveness of gamification in teaching computer science in higher education. Along with the learning outcomes, the effect of group size on students' satisfaction level is also measured. Furthermore, the impact of gamification over time is analyzed throughout a semester to observe its effectiveness as a long-term learning technique. The analysis, covering both learning outcome and students' satisfaction, suggests that gamification is an effective tool to teach tough courses at higher education level; however, group size should be taken into account for optimal classroom size and better learning experience.",
                "url_date_accces": "2023-02-27T17:00:00.000Z",
                "ArXivID": "test",
                "DOI": "10.1145/3383456",
                "ISBN": "testISBN",
                "ISSN": "10.1145/3383456",
                "PMID": "testPMID",
                "Scopus": "2-s2.0-85085248397",
                "PII": "testPII",
                "SGR": "85085248397",
                "project_id": "testProjectId",
                "citation_key": "testCitationKey",
                "general_note": "This is the general note for testing",
                "urls": [
                    {
                        "id": 1,
                        "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql"
                    },
                    {
                        "id": 2,
                        "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=moment+date+parse"
                    },
                    {
                        "id": 3,
                        "url": "https://stackoverflow.com/questions/22184747/parse-string-to-date-with-moment-js"
                    }
                ],
                "notes": [
                    {
                        "id": 1,
                        "note": "Sample note test 0"
                    },
                    {
                        "id": 2,
                        "note": "Sample note test 1"
                    },
                    {
                        "id": 3,
                        "note": "Sample note test 2"
                    }
                ],
                "tags": [
                    {
                        "id": 1,
                        "tag_id": 1,
                        "name": "test tag 0"
                    },
                    {
                        "id": 2,
                        "tag_id": 2,
                        "name": "test tag 1"
                    },
                    {
                        "id": 3,
                        "tag_id": 4,
                        "name": "test tag 1"
                    },
                    {
                        "id": 4,
                        "tag_id": 5,
                        "name": "test tag 0"
                    }
                ],
                "authors": [
                    {
                        "id": 1,
                        "lecturer_id": 1,
                        "lecturer_name": null
                    },
                    {
                        "id": 2,
                        "firstName": "first0",
                        "lastName": "last0"
                    },
                    {
                        "id": 3,
                        "firstName": "first1",
                        "lastName": "last1"
                    },
                    {
                        "id": 4,
                        "firstName": "first2",
                        "lastName": "last2"
                    },
                    {
                        "id": 5,
                        "lecturer_id": 2,
                        "lecturer_name": null
                    }
                ],
                "lecturer_id": 1
            },
        ],
        "2": [
            {
                "id": 1,
                "name": "The Impact of Gamification on Learning Outcomes of Computer Science Majors",
                "journal": "ACM Transactions on Computing Education",
                "conference": "",
                "rank": "Q1",
                "year": 2020,
                "month": null,
                "day": null,
                "page_from": 8,
                "page_to": 10,
                "volume": 20,
                "issue": 2,
                "city": null,
                "abstract": "Gamification is the use of game elements in domains other than games. Gamification use is often suggested for difficult activities because it enhances users' engagement and motivation level. Due to such benefits, the use of gamification is also proposed in education environments to improve students' performance, engagement, and satisfaction. Computer science in higher education is a tough area of study and thus needs to utilize various already explored benefits of gamification. This research develops an empirical study to evaluate the effectiveness of gamification in teaching computer science in higher education. Along with the learning outcomes, the effect of group size on students' satisfaction level is also measured. Furthermore, the impact of gamification over time is analyzed throughout a semester to observe its effectiveness as a long-term learning technique. The analysis, covering both learning outcome and students' satisfaction, suggests that gamification is an effective tool to teach tough courses at higher education level; however, group size should be taken into account for optimal classroom size and better learning experience.",
                "url_date_accces": "2023-02-27T17:00:00.000Z",
                "ArXivID": "test",
                "DOI": "10.1145/3383456",
                "ISBN": "testISBN",
                "ISSN": "10.1145/3383456",
                "PMID": "testPMID",
                "Scopus": "2-s2.0-85085248397",
                "PII": "testPII",
                "SGR": "85085248397",
                "project_id": "testProjectId",
                "citation_key": "testCitationKey",
                "general_note": "This is the general note for testing",
                "urls": [
                    {
                        "id": 1,
                        "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql"
                    },
                    {
                        "id": 2,
                        "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=moment+date+parse"
                    },
                    {
                        "id": 3,
                        "url": "https://stackoverflow.com/questions/22184747/parse-string-to-date-with-moment-js"
                    }
                ],
                "notes": [
                    {
                        "id": 1,
                        "note": "Sample note test 0"
                    },
                    {
                        "id": 2,
                        "note": "Sample note test 1"
                    },
                    {
                        "id": 3,
                        "note": "Sample note test 2"
                    }
                ],
                "tags": [
                    {
                        "id": 1,
                        "tag_id": 1,
                        "name": "test tag 0"
                    },
                    {
                        "id": 2,
                        "tag_id": 2,
                        "name": "test tag 1"
                    },
                    {
                        "id": 3,
                        "tag_id": 4,
                        "name": "test tag 1"
                    },
                    {
                        "id": 4,
                        "tag_id": 5,
                        "name": "test tag 0"
                    }
                ],
                "authors": [
                    {
                        "id": 1,
                        "lecturer_id": 1,
                        "lecturer_name": null
                    },
                    {
                        "id": 2,
                        "firstName": "first0",
                        "lastName": "last0"
                    },
                    {
                        "id": 3,
                        "firstName": "first1",
                        "lastName": "last1"
                    },
                    {
                        "id": 4,
                        "firstName": "first2",
                        "lastName": "last2"
                    },
                    {
                        "id": 5,
                        "lecturer_id": 2,
                        "lecturer_name": null
                    }
                ],
                "lecturer_id": 2
            },
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
    "conference": "",
    "rank": "Q1",
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
    "conference": "TEST conf",
    "rank": "Q1",
    "year": 2023,
    "pageFrom": 11,
    "pageTo": 12,
    "volume": 24,
    "issue": 3,
    "month":  3,
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

### Delete multiple articles

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

### Create an article (n-n lectuter)

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
    "conference": "",
    "rank": "Q1",
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

### Get article page size, while paging

#### Request

```http
GET /api/v1/articles/page-size?limitSize=10&keyword=test
```

| Param     | Datatype               | Note                                                          |
| --------- | ---------------------- | ------------------------------------------------------------- |
| limitSize | integer greater than 0 | required, maximum number of records to return                 |
| keyword   | string                 | not require, the keyword to search the Articles with their id |

#### Success response

```javascript
{
    "code": 0,
    "message": "Get paging size successfully",
    "data": {
        "number_of_page": 4
    }
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend"
}
```

### Get one article by id

#### Request

```http
GET /api/v1/articles/detail/:id
```

| Param | Datatype               | Note                                  |
| ----- | ---------------------- | ------------------------------------- |
| id    | integer greater than 0 | required, the id of the given article |

#### Success response

```javascript
{
    "code": 0,
    "message": "Get article by id successfully",
    "data": {
        "id": 3,
        "name": "The Impact of Gamification on Learning Outcomes of Computer Science Majors",
        "journal": "ACM Transactions on Computing Education",
        "conference": "",
        "rank": "Q1",
        "year": 2020,
        "month": null,
        "day": null,
        "page_from": 8,
        "page_to": 10,
        "volume": 20,
        "issue": 2,
        "city": null,
        "abstract": "Gamification is the use of game elements in domains other than games. Gamification use is often suggested for difficult activities because it enhances users' engagement and motivation level. Due to such benefits, the use of gamification is also proposed in education environments to improve students' performance, engagement, and satisfaction. Computer science in higher education is a tough area of study and thus needs to utilize various already explored benefits of gamification. This research develops an empirical study to evaluate the effectiveness of gamification in teaching computer science in higher education. Along with the learning outcomes, the effect of group size on students' satisfaction level is also measured. Furthermore, the impact of gamification over time is analyzed throughout a semester to observe its effectiveness as a long-term learning technique. The analysis, covering both learning outcome and students' satisfaction, suggests that gamification is an effective tool to teach tough courses at higher education level; however, group size should be taken into account for optimal classroom size and better learning experience.",
        "url_date_accces": "2023-02-27T17:00:00.000Z",
        "ArXivID": "test",
        "DOI": "10.1145/3383456",
        "ISBN": "testISBN",
        "ISSN": "10.1145/3383456",
        "PMID": "testPMID",
        "Scopus": "2-s2.0-85085248397",
        "PII": "testPII",
        "SGR": "85085248397",
        "project_id": "testProjectId",
        "citation_key": "testCitationKey",
        "general_note": "This is the general note for testing",
        "urls": [
            {
                "id": 7,
                "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql"
            },
            {
                "id": 8,
                "url": "https://www.google.com/search?channel=fs&client=ubuntu-sn&q=moment+date+parse"
            },
            {
                "id": 9,
                "url": "https://stackoverflow.com/questions/22184747/parse-string-to-date-with-moment-js"
            }
        ],
        "notes": [
            {
                "id": 7,
                "note": "Sample note test 0"
            },
            {
                "id": 8,
                "note": "Sample note test 1"
            },
            {
                "id": 9,
                "note": "Sample note test 2"
            }
        ],
        "tags": [
            {
                "id": 9,
                "tag_id": 5,
                "name": "test tag 0"
            },
            {
                "id": 10,
                "tag_id": 6,
                "name": "test tag 1"
            },
            {
                "id": 11,
                "tag_id": 4,
                "name": "test tag 1"
            },
            {
                "id": 12,
                "tag_id": 5,
                "name": "test tag 0"
            }
        ],
        "authors": [
            {
                "id": 11,
                "lecturer_id": 1,
                "lecturer_name": null
            },
            {
                "id": 12,
                "firstName": "first0",
                "lastName": "last0"
            },
            {
                "id": 13,
                "firstName": "first1",
                "lastName": "last1"
            },
            {
                "id": 14,
                "firstName": "first2",
                "lastName": "last2"
            },
            {
                "id": 15,
                "lecturer_id": 2,
                "lecturer_name": null
            }
        ]
    }
}
```

##### Error response

```javascript
{
    "code": 1,
    "message": "Something went wrong from the backend"
}
```

```javascript
{
    "code": 5,
    "message": "There is no article with the given id"
}
```

## Scopus API

### Retrieve Scopus Author by first name and last name

#### Request

```http
GET /api/v1/scopus/author?firstName=Quan&lastName=Tran
```

| Param     | Datatype | Note     |
| --------- | -------- | -------- |
| firstName | string   | required |
| lastName  | string   | required |

#### Success response

```javascript
{
    "code": 0,
    "message": "Retrieve author from scopus successfully",
    "data": [
        {
            "surname": "Tran",
            "givenName": "Hoang Quan",
            "scopusId": "987654321"
        },
        {
            "surname": "Tran",
            "givenName": "Trung Quan",
            "scopusId": "123456789"
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

### Save Author profile by Scopus Id and Account Id

#### Request

```http
POST /api/v1/scopus/author/save
```

```javascript
{
    "data": {
        "scopusAuthorId": 35176729700,
        "accountId": 1
    }
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Save author successfully",
    "data": {
        "lecturerId": 1,
        "articleIds": [
            13,
            15,
            14
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

### Find Article by DOI

#### Request

```http
POST /api/v1/scopus/article
```

```javascript
{
    "data": {
        "doi": "10.1016/j.amjoto.2023.103800"
    }
}
```

#### Success response

```javascript
{
    "code": 0,
    "message": "Found article with DOI = 10.1016/j.amjoto.2023.103800 successfully!",
    "data": [
        {
            "name": "Support of deep learning to classify vocal fold images in flexible laryngoscopy",
            "volume": "44",
            "ISSN": "01960709",
            "ISBN": null,
            "DOI": "10.1016/j.amjoto.2023.103800",
            "PII": "S0196070923000145",
            "Scopus": "85150394390",
            "urls": [
                "https://api.elsevier.com/content/abstract/scopus_id/85150394390",
                "https://api.elsevier.com/content/abstract/scopus_id/85150394390?field=author,affiliation",
                "https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85150394390&origin=inward",
                "https://www.scopus.com/inward/citedby.uri?partnerID=HzOxMe3b&scp=85150394390&origin=inward",
                "https://api.elsevier.com/content/article/eid/1-s2.0-S0196070923000145"
            ],
            "journal": "American Journal of Otolaryngology - Head and Neck Medicine and Surgery",
            "conference": null,
            "rank": "Q1",
            "abstract": "Purpose: To collect a dataset with adequate laryngoscopy images and identify the appearance of vocal folds and their lesions in flexible laryngoscopy images by objective deep learning models. Methods: We adopted a number of novel deep learning models to train and classify 4549 flexible laryngoscopy images as no vocal fold, normal vocal folds, and abnormal vocal folds. This could help these models recognize vocal folds and their lesions within these images. Ultimately, we made a comparison between the results of the state-of-the-art deep learning models, and another comparison of the results between the computer-aided classification system and ENT doctors. Results: This study exhibited the performance of the deep learning models by evaluating laryngoscopy images collected from 876 patients. The efficiency of the Xception model was higher and steadier than almost the rest of the models. The accuracy of no vocal fold, normal vocal folds, and vocal fold abnormalities on this model were 98.90 %, 97.36 %, and 96.26 %, respectively. Compared to our ENT doctors, the Xception model produced better results than a junior doctor and was near an expert. Conclusion: Our results show that current deep learning models can classify vocal fold images well and effectively assist physicians in vocal fold identification and classification of normal or abnormal vocal folds.",
            "authors": [
                {
                    "firstName": "Bich Anh",
                    "lastName": "Tran"
                },
                {
                    "firstName": "Thao Thi Phuong",
                    "lastName": "Dao"
                },
                {
                    "firstName": "Ho Dang Quy",
                    "lastName": "Dung"
                },
                {
                    "firstName": "Ngoc Boi",
                    "lastName": "Van"
                },
                {
                    "firstName": "Chanh Cong",
                    "lastName": "Ha"
                },
                {
                    "firstName": "Nam Hoang",
                    "lastName": "Pham"
                },
                {
                    "firstName": "Tu Cong Huyen Ton Nu Cam",
                    "lastName": "Nguyen"
                },
                {
                    "firstName": "Tan Cong",
                    "lastName": "Nguyen"
                },
                {
                    "firstName": "Minh Khoi",
                    "lastName": "Pham"
                },
                {
                    "firstName": "Mai Khiem",
                    "lastName": "Tran"
                },
                {
                    "firstName": "Truong Minh",
                    "lastName": "Tran"
                },
                {
                    "firstName": "Minh Triet",
                    "lastName": "Tran"
                },
                {
                    "lecturerId": 1,
                    "lecturerName": "Tran Minh Triet"
                }
            ],

            "tags": [
                {
                    "tag_id": 112,
                    "tag_name": "Computer-aided diagnosis"
                },
                {
                    "tag_id": 113,
                    "tag_name": "Deep learning"
                },
                {
                    "tag_id": 114,
                    "tag_name": "Flexible laryngoscopy"
                },
                {
                    "tag_id": 115,
                    "tag_name": "Vocal folds"
                },
                {
                    "tag_id": 168,
                    "tag_name": "Deep Learning"
                }
            ],
            
            "year": "2023",
            "month": "05",
            "day": "01"
        }
    ]
}
```

#### Error response

```javascript
{
    "code": 0,
    "message": "Found article with DOI = 10.1016/j.amjoto.2023.103800 successfully!",
    "data": null
}


{
    "code": 1,
    "message": "Something went wrong from the backend",
}
```
