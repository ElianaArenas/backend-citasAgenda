# backend-citasAgenda

Proyecto backend con NodeJS, Express y Mongo para el agendamiento de citas y eventos utilizado como recurso didáctico para la asignatura de programación web.

## Pre-requisitos 📋

- Tener instalado Nodejs

* [Node.js](https://nodejs.org/en/blog/release/v16.17.0/) - Version 16.17

## Construido con 🔩⚙


* [Express](https://expressjs.com/) 
* [Mongoose](https://mongoosejs.com/)


## Variables de entorno 🟡

Poner las variables de entorno necesarias poder correr el proyecto en un archivo .env en el root del proyecto.


MONGODB_URI= //Agregar la mongo uri

MONGODB_LOCAL=mongodb://localhost/databaseagenda

PORT=4000

HOST=0.0.0.0

HOST_HTTP=http://localhost

LOCAL=1

CLI_PORT=3000

CLI_HOST=http://localhost 

MAILUSER: citagenda50@gmail.com  

MAILPSSWD = cita2022


## Descargar modulos de Node

`  $ npm install `

## Correr el proyecto

`
  $ npm start
  

  $ npm run dev 
`

## Despliegue

Al hacer push a la rama master, se hará el despliegue de manera automatica a Railway.

Made with ❤
