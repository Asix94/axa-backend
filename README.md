## Prueba axa - backend

este proyecto usa node, para instalar las dependencias ejecurar este comando

````
npm install
````

para iniciar el proyecto en servidor de desarrollo ejecutar este comando

````
npm start
````

para ejecutar los test de la logica ejecutar este comando

`````
npm test
`````

los endpoints accesibles son:

- http://localhost:3000/api/getClientById/${id}

devuelve un cliente del archivo clients.json especificado por la id que se le pasa por parametro

Ejemplo :

`
client = {
    id : "a0ece5db-cd14-4f21-812f-966633e7be86",
    name : "Britney",
    email : "britneyblankenship@quotezart.com",
    role : "admin"
}
`

- http://localhost:3000/api/getClientByName/${name}

devuelve varios o un cliente del archivo clients.json especificado por el nombre que se le pasa por parametro

Ejemplo :

`
clients = [{
    id : "a0ece5db-cd14-4f21-812f-966633e7be86",
    name : "Britney",
    email : "britneyblankenship@quotezart.com",
    role : "admin"
}]
`

- http://localhost:3000/api/getPolicieByClientName/${name}

devuelve todas las polizas de un cliente del archivo policies.json por el nombre que se le pasa por parametro

Ejemplo :

`
policies = [{
    id : "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
    amountInsured : 399.89,
    email : "inesblankenship@quotezart.com",
    inceptionDate : "2015-07-06T06:55:49Z",
    installmentPayment : true,
    clientId : "a0ece5db-cd14-4f21-812f-966633e7be86"
}]
`

- http://localhost:3000/api/getClientByPolicieId/${id}

devuelve un cliente del archivo clients.json pasando una id de poliza

Ejemplo :

`
client = {
    id : "a0ece5db-cd14-4f21-812f-966633e7be86",
    name : "Britney",
    email : "britneyblankenship@quotezart.com",
    role : "admin"
}
`

- http://localhost:3000/api/authenticate

devuelve un token pasando por body el email y el password del cliente

Ejemplo :

body
`
{
	"email":"britneyblankenship@quotezart.com",
	"password":"123123123"
}
`

result 
`
{
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOnsiaWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJuYW1lIjoiQnJpdG5leSIsImVtYWlsIjoiYnJpdG5leWJsYW5rZW5zaGlwQHF1b3RlemFydC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTY5Mjc0Njc2LCJleHAiOjE1NjkyNzgyNzZ9.mwDriYE2aLYWRLaW2U9GT2lTOJANo8Rt96TkxP3n8Ss"
}
`