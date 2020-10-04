# arcadeJS
### ArcadeJS is an online arcade made with JavaScript focusing on more modern UI, fast, and responsive interactivity, and is open source. Our goal is to relive the golden age of arcade video games with a more modern look and fully available for anyone to access and enjoy.

# Technology

## Front-end
- React
- Apollo Client
- GRAPHQL
- Socket.io-client
- Reactstrap
- Bootstrap
- React-lottie
- Phaser (Game Engine)

## Back-end
- Express
- Socket.io
- MongoDB
- Jest
- Supertest
- Apollo Server
- GraphQL
- Redis
- AWS

# API Documentation

## Snake LeaderBoard Endpoints:
1. GET    : /snake/
2. POST   : /snake/

## Whack a Mole LeaderBoard Endpoints:
1. GET    : /whack/
2. POST   : /whack/
​
# Snake LeaderBoard Endpoints

## GET /snake/
Request body:
​
```json
none
```
​
Response (200 - OK):
​
```json
[
  {
    "_id": "5f408865b0568519ecfe70dc",
    "username": "Baril",
    "score": 137
  },
  {...}
]
```
​
## POST /snake/
Request body:
​
```json
{
  "username": "Baril",
  "score": 137
}
```
​
Response (201 - CREATED):
​
```json
{
  "_id": "5f408865b0568519ecfe70dc",
  "username": "Baril",
  "score": 137
}
```

### This error appears when data input is not matched with database

Response (400 - Bad Request)
```json
{
  "message": "Invalid username"
}
```
## Global Error

Response (500 - Internal Server Error)
```json
{
  "message": "error" 
}
