const express = require('express');
const router = express.Router();

const RESOURCE_API = 'http://localhost:3000/db/orders';

// declare axios for making http requests
const axios = require('axios');

// Filter orders
router.post('/orders', (req, res) => {

  console.log('router.post orders');
   
  let orderFilter = req.body;
  let filterParameter = '';

  if(orderFilter.companyName){
    filterParameter = '/?companyName='+orderFilter.companyName;
  } else if(orderFilter.customerAddress){
    filterParameter = '/?customerAddress='+orderFilter.customerAddress;
  }

  console.log('filterParameter', filterParameter);

  // Get shipments from the mock api
  // This should ideally be replaced with a service that connects to MongoDB or another database/resource
  axios.get(RESOURCE_API + filterParameter)
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

    axios.get(RESOURCE_API+'/'+req.params.id)
    .then(orders => {
      //filtering order by id
      if(orders && orders.data){
        let order = orders.data;
        console.log(order);
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
    axios.put(RESOURCE_API+'/'+req.params.id, req.body)
    .then(response => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
  })
  .delete((req, res) => {
    axios.delete(RESOURCE_API+'/'+req.params.id)
    .then(response => {
      res.status(200).send('Order '+ req.params.id+' was deleted successfully.');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
  });

// add order
router.route('/order/')
  .post((req, res) => {
    axios.post(RESOURCE_API, req.body)
      .then(response => {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  });

module.exports = router;