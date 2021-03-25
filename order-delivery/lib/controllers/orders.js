const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const getAllOrders = await OrderService.allOrders(req.body);
  });

// .get('/:id', async (req, res, next) => {})

// .put('/:id', async (req, res, next) => {
//   try {
//     const update = await
//   }
// })
// .delete('/:id', async (req, res, next) => {});
