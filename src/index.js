require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express(); 
const logic = require('./logic');
const router = require('./routes');

const {
    env: {
      PORT : port,
      CLIENTS_DATA : clientsData,
      POLICIES_DATA : policiesData
    }
  } = process;

  logic.callurl(clientsData)
  .then(clients => {
    logic.writeFile('data/clients.json',clients)
  })

  logic.callurl(policiesData)
  .then(polices => {
    logic.writeFile('data/policies.json',polices)
  })

app.use(cors());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Puerto escuchando en el puerto ${port}`);
    
});

process.on('SIGINT', () => {
    console.log('\nstopping server');
    process.exit();
});
