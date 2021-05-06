# vienHealth

vienHealth test

# REST API VIEN application


The entry point for this application  within the `index.js` file.



## Install

    npm install

## Run the app

    npm run start

## Run the tests

    npm run test

# REST API

The REST API to the users registration and login is described below.

## Register a user

### Request

`POST /registration/`

    curl --location --request POST 'http://localhost:1900/api/v1/auth/registration' \

--header 'Content-Type: application/json' \
--data-raw '{
"first_name":"aseye",
"last_name":"lastname",
"email":"@yahoo.com",
"password":"123456"

}'

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
    "first_name": "aseye",
    "last_name": "lastname",
    "email": "vvvvvv@yahoo.com",
    "_id": "6093f723946c30449ed6dd8f",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiYXNleWUiLCJsYXN0X25hbWUiOiJsYXN0bmFtZSIsImVtYWlsIjoidnZ2dnZ2QHlhaG9vLmNvbSIsIl9pZCI6IjYwOTNmNzIzOTQ2YzMwNDQ5ZWQ2ZGQ4ZiIsImlhdCI6MTYyMDMwOTc5NSwiZXhwIjoxNjIwOTE0NTk1fQ.82AawpAXnbKr6n2UsP_c6qw07PnoZnwHQtlzLXaH9-w"

}

## User login

### Request

`POST /login/`

    curl --location --request POST 'http://localhost:1900/api/v1/auth/login' \

--header 'Authorization: Basic cGFnZUB5YWhvby5jb206MTIzNDU2' \

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 OK
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
    "_id": "6092c576f21ad842751324ba",
    "first_name": "aseye",
    "last_name": "lastname",
    "email": "page@yahoo.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDkyYzU3NmYyMWFkODQyNzUxMzI0YmEiLCJmaXJzdF9uYW1lIjoiYXNleWUiLCJsYXN0X25hbWUiOiJsYXN0bmFtZSIsImVtYWlsIjoicGFnZUB5YWhvby5jb20iLCJpYXQiOjE2MjAzMTA1MTIsImV4cCI6MTYyMDkxNTMxMn0.CEZF_ZY16zvafP2J9_oGO9_VSAd0XPDWxxf3x0M9vvc"
}
