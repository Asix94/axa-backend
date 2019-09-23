const express = require('express');

const bodyParser = require('body-parser');

const jsonBodyParser = bodyParser.json()
const { getClientById, getClientByName, getPolicieByClientName, getClientByPolicieId, authenticate } = require('./handlers');
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication');

const router = express.Router();

router.get('/getClientById/:id', verificaToken, getClientById);
router.get('/getClientByName/:name', verificaToken, getClientByName);
router.get('/getPolicieByClientName/:name', [verificaToken, verificaAdminRole], getPolicieByClientName);
router.get('/getClientByPolicieId/:id', [verificaToken, verificaAdminRole], getClientByPolicieId);
router.post('/authenticate', jsonBodyParser, authenticate);

module.exports = router;