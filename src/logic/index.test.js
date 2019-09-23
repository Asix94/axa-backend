require('dotenv').config();
const logic = require('../logic');

const {
    env: {
      CLIENTS_DATA : clientsData,
      POLICIES_DATA : policiesData
    }
  } = process;

const clientData = [{
    id : "a0ece5db-cd14-4f21-812f-966633e7be86",
    name : "Britney",
    email : "britneyblankenship@quotezart.com",
    role : "admin"
}]

const policieData = [{
    id : "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
    amountInsured : 399.89,
    email : "inesblankenship@quotezart.com",
    inceptionDate : "2015-07-06T06:55:49Z",
    installmentPayment : true,
    clientId : "a0ece5db-cd14-4f21-812f-966633e7be86"
}]

const fakeUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c55";
const fakeNameClient = "Carlos";

const fakeEmailClient = "carlosrt1994@gmail.com";

const password = "123123123";
const fakePassword = "123412341234";

describe('logic', () => {

    describe('callUrl function test', () => {

        it('should success on correct value in client', () => {
            
            return logic.callurl(clientsData)
            .then(clients => {
                expect(typeof(clients)).toBe('object');
                expect(clients.clients).toEqual(expect.arrayContaining(clientData));
            })
        })

        it('shold success on correct value in policie', () => {

            return logic.callurl(policiesData)
            .then(policies => {
                expect(typeof(policies)).toBe('object');
                expect(policies.policies).toEqual(expect.arrayContaining(policieData));
            })
        })

        it('should fail on incorrect url', () => {
        
            return logic.callurl(fakeUrl)
            .catch(err => {
                expect(err.message).toBe('la url no es correcta')
            })

        })

    })

    describe('writeFile function test', () => {

        it('should success on correct file', () => {
            expect(logic.writeFile('fakefile', clientData)).toBeTruthy()
        })

    })

    describe('getClientById function test', () => {

        it('should success on correct data', () => {
            
            return logic.getClientById(clientData[0].id)
            .then(client => {
                expect(client.id).toEqual(clientData[0].id)
                expect(client.name).toEqual(clientData[0].name)
                expect(client.email).toEqual(clientData[0].email)
                expect(client.role).toEqual(clientData[0].role)
            })

        })

        it('should fail data not found', () => {

            return logic.getClientById(policieData[0].id)
            .catch(err => {
                expect(err.message).toBe('cliente no encontrado')
            })
        })

    })

    describe('getClientByName function test', () => {

        it('should success on correct data', () => {

            return logic.getClientByName(clientData[0].name)
            .then(client => {
                expect(client[0].id).toEqual(clientData[0].id)
                expect(client[0].name).toEqual(clientData[0].name)
                expect(client[0].email).toEqual(clientData[0].email)
                expect(client[0].role).toEqual(clientData[0].role)
            })
        })

        it('should fail data not found', () => {

            return logic.getClientByName(fakeNameClient)
            .catch(err => {
                expect(err.message).toBe('cliente no encontrado')
            })
        })

    })

    describe('getPolicieByClientName function test', () => {

        it('should success on correct data', () => {

            return logic.getPolicieByClientName(clientData[0].name)
            .then(policie => {
                expect(policie[0].id).toEqual(policieData[0].id)
                expect(policie[0].amountInsured).toEqual(policieData[0].amountInsured)
                expect(policie[0].email).toEqual(policieData[0].email)
                expect(policie[0].inceptionDate).toEqual(policieData[0].inceptionDate)
                expect(policie[0].installmentPayment).toEqual(policieData[0].installmentPayment)
                expect(policie[0].clientId).toEqual(policieData[0].clientId)
            })
        })

        it('should fail data not found', () => {

            return logic.getPolicieByClientName(fakeNameClient)
            .catch(err => {
                expect(err.message).toBe('cliente no encontrado')
            })
        })

    })

    describe('getClientByPolicieId function test', () => {

        it('should success on correct data', () => {

            return logic.getClientByPolicieId(policieData[0].id)
            .then(client => {
                expect(client.id).toEqual(clientData[0].id)
                expect(client.name).toEqual(clientData[0].name)
                expect(client.email).toEqual(clientData[0].email)
                expect(client.role).toEqual(clientData[0].role)
            })
        })

        it('should fail data not found', () => {

            return logic.getClientByPolicieId(clientData[0].id)
            .catch(err => {
                expect(err.message).toBe('Poliza no encontrada')
            })
        })
    
    })

    describe('authenticate function test', () => {
        
        it('should success on correct token', () => {

            return logic.authenticate(clientData[0].email, password)
            .then(token => {
                expect(token).toBeTruthy()
            })
        })

        it('should fail password incorrect', () => {

            return logic.authenticate(clientData[0].email, fakePassword)
            .catch(err => {
                expect(err.message).toBe('La password no es correcta')
            })
        })

        it('should fail email incorrect', () => {

            return logic.authenticate(fakeEmailClient, password)
            .catch(err => {
                expect(err.message).toBe('El email no es correcto')
            })
        })

    })

})