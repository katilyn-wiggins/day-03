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
    const allOrders = await OrderService.allOrders();
    res.send(allOrders);
  })

  .get('/:id', async (req, res, next) => {
    const allOrdersWithId = await OrderService.allOrdersWithId(req.params.id);
    res.send(allOrdersWithId);
  })

  .put('/:id', async (req, res, next) => {
    const updateOrderWithId = await OrderService.updateWithId(
      req.body,
      req.params.id
    );
    res.send(updateOrderWithId);
  })

  .delete('/:id', async (req, res, next) => {
    const deleteOrderWithId = await OrderService.delete(req.params.id);
    res.send(deleteOrderWithId);
  });
