require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

const fs = require('fs');

const SECRET_PASSWORD = '123123123'

module.exports = {
    
    callurl(url){
        return new Promise((resolve,reject) => {
            fetch(url)
            .then(response => {
                if(response.status >= 400){
                    throw new Error('la url no es correcta');
                }

                resolve(response.json())
            })
            .catch(err => {
                reject(err)
            });
        })
    },

    writeFile(namefile, data){
        return new Promise(() => {
            fs.writeFile(namefile, JSON.stringify(data), (err) => {
                if(err) throw new Error('No se ha podido guardar la informacion en el archivo');
                return true;
            })
        })  
    },

    getClientById(id){
        return new Promise((resolve,reject) => {
            fs.readFile('data/clients.json', (err, data) => {
                if(err) reject(Error(err));
                
                const  { clients }  = JSON.parse(data);
                const client = clients.find(res => res.id === id)
                
                if(client === undefined){
                    reject(Error('cliente no encontrado'));
                } 

                resolve(client);

            })
        })
    },

    getClientByName(name){
        return new Promise((resolve,reject) => {
            fs.readFile('data/clients.json', (err, data) => {
                if(err) reject(Error(err))

                const { clients } = JSON.parse(data);
                const client = clients.filter(res => res.name === name);

                if(client.length === 0){
                    reject(Error('cliente no encontrado'));
                } 

                resolve(client);
            })
        })
    },

    getPolicieByClientName(name){
        return new Promise((resolve,reject) => {
            fs.readFile('data/clients.json', (errClient, dataClient) => {
                if(errClient) reject(errClient)

                const { clients } = JSON.parse(dataClient);
                const client = clients.find(res => res.name === name);
                
                if(client === undefined){
                    reject(Error('cliente no encontrado'));
                } else {
                fs.readFile('data/policies.json', (errPolicie, dataPolicie) => {
                    if(errPolicie) reject(Error(errPolicie))

                    const { policies } = JSON.parse(dataPolicie);
                    const policie = policies.filter(res => res.clientId === client.id);
                    
                    if(policie.length === 0){
                        reject(Error('polizas no encontradas'));
                    } 

                    resolve(policie);

                })}
            })
            
        })
    },

    getClientByPolicieId(id){
        return new Promise((resolve,reject) => {
            fs.readFile('data/policies.json', (errPolicie, dataPolicie) => {
                if(errPolicie) reject(errPolicie)

                const { policies } = JSON.parse(dataPolicie);
                const policie = policies.find(res => res.id === id);

                if(policie === undefined){
                    reject(Error("Poliza no encontrada"))
                } else{
                    fs.readFile('data/clients.json', (errClient, dataClient) => {
                        if(errClient) reject(errClient)

                        const { clients } = JSON.parse(dataClient);
                        const client = clients.find(res => res.id === policie.clientId);

                        if(client === undefined){
                            reject(Error("Cliente no encontrado"))
                        }
                        resolve(client);
                    })}
            })
        })
    },

    authenticate(email, password){

        return new Promise((resolve,reject) => {
            fs.readFile('data/clients.json', (err,data) => {
                if(err) reject(err)

                const { clients } = JSON.parse(data);
                const client = clients.find(res => res.email === email);
                
                if(client === undefined) reject(Error('El email no es correcto'))

                if(SECRET_PASSWORD !== password) reject(Error('La password no es correcta'))

                resolve(client);
            })
        })
    } 
}