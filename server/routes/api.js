const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const RESOURCE_API = 'http://localhost:3001/my-shipment-db';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all orders
router.get('/all_orders', (req, res) => {
  console.log('orders');
  //res.status(200).json('{"test":true}');
  // Get shipments from the mock api
  // This should ideally be replaced with a service that connects to MongoDB or another database/resource
  axios.get(RESOURCE_API)
    .then(orders => {
      res.status(200).json(orders.data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error)
    });
});

module.exports = router;