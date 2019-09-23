const getClientById = require('./getClientById');
const getClientByName = require('./getClientByName');
const getPolicieByClientName = require('./getPolicieByClientName');
const getClientByPolicieId = require('./getClientByPolicieId');
const authenticate = require('./authenticate');

module.exports = {
    getClientById,
    getClientByName,
    getPolicieByClientName,
    getClientByPolicieId,
    authenticate
}