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

# API List (update reguraly)

## Authorization

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
