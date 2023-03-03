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
