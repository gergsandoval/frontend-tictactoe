# TicTacToe - El mejor juego anticuarentena
Hola! Este fue un proyecto del 3er cuatrimestre para la carrera Analista de Sistemas en ORT Argentina.

## La Materia de Backend(Taller de Programacion 2) se enfocaba en aprender
- ES6
- Node.js
- npm
- Promesas
- Programacion asincrónica
- Restful API

## La Materia de Frontend(Programacion en Nuevas Tecnologias 2) se enfocaba en aprender
- ES6
- Programacion orientada a componentes
- React
- React Native
- Fetch API

### Backend
- [Link al repositorio](https://github.com/eltunas/BE_TicTacToe)
- La ultima version entregada se encuentra en la branch [**develop**](https://github.com/eltunas/BE_TicTacToe/tree/develop)
- Utilizamos [express](https://www.npmjs.com/package/express) para hacer el servidor web API
- Utilizamos [socket.io](https://www.npmjs.com/package/socket.io) para implementar la comunicacion en tiempo real
- Utilizamos [mongodb](https://www.npmjs.com/package/mongodb) para la persistir los datos
- Utilizamos [Heroku](https://www.heroku.com/) para subir el servidor a la nube
- Utilizamos el token persistido en cada usuario como capa de seguridad en la mayoria de los endpoints.


### Frontend
- [Link al repositorio](https://github.com/gergsandoval/frontend-tictactoe)
- La ultima version entregada se encuentra en la branch [**develop**](https://github.com/gergsandoval/frontend-tictactoe)
- Utilizamos [Expo](https://expo.io/) como base del proyecto y para realizar un scaffolding inicial
- Realizamos una [autorizacion](https://docs.expo.io/versions/latest/sdk/app-auth/) con google que nos devolvia un token y lo guardabamos en el usuario 
- Utilizabamos ese token para realizar las llamadas a las API
