const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const RESOURCE_API = 'http://localhost:3001/orders';

/* GET api listing. *
router.get('/', (req, res) => {
  res.send('api works');
});*/

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

// Get, update and delete order by id
router.route('/order/:id')
  .get((req, res) => {
    axios.get(RESOURCE_API+'?orderId='+req.params.id)
    .then(orders => {
      //filtering order by id
      if(orders && orders.data){
        let order = orders.data[0];
        res.status(200).json(order);
      } else {
        res.status(200).send('Order '+ req.params.id +' not found');
      }
      
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error)
    });
  })
  .put((req, res) => {
    console.log(req.body);
    axios.put(RESOURCE_API+'/'+req.params.id, req.body)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
  })
  .delete((req, res) => {
    res.status(200).send('Delete the book' + req.params.id);
  });

// Get all orders
router.route('/order/')
  .post((req, res) => {
    res.status(200).send('Add a book');
  });

module.exports = router;