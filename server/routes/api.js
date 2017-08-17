const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://localhost:3001';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all shipments
router.get('/shipments', (req, res) => {
  // Get shipments from the mock api
  // This should ideally be replaced with a service that connects to MongoDB or another database/resource
  axios.get('${API}/shipments')
    .then(shipments => {
      res.status(200).json(shipments.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;