const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const orders = require('../lib/controllers/orders');
const Order = require('../lib/models/Order');
const twilioUtils = require('../lib/utils/twilio');

jest.mock('../lib/utils/twilio');

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(async () => {
    await setup(pool);

    twilioUtils.sendSms.mockClear();
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        console.log(twilioUtils.sendSms.mock);
        expect(twilioUtils.sendSms).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: gets all orders in our database', async () => {
    await Order.insert({ quantity: 5 });
    const res = await request(app).get('/api/v1/orders');

    expect(res.body).toEqual([
      {
        id: '1',
        quantity: 5,
      },
    ]);
  });

  it('ASYNC/AWAIT: gets all orders in our database with id 1', async () => {
    await Order.insert({ quantity: 5 });
    const res = await request(app).get('/api/v1/orders/1');

    expect(res.body).toEqual([
      {
        id: '1',
        quantity: 5,
      },
    ]);
  });

  it('updates an order in our database and sends a text message', async () => {
    let newOrder = await Order.insert({ quantity: 5 });

    const res = await request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 8 });

    expect(twilioUtils.sendSms).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: '1',
      quantity: 8,
    });
  });

  it('ASYNC/AWAIT: deletes an order in our database with id 1', async () => {
    await Order.insert({ quantity: 5 }, { quantity: 7 });
    const res = await request(app).delete('/api/v1/orders/1');

    expect(twilioUtils.sendSms).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: '1',
      quantity: 5,
    });
  });

  // it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/orders')
  //     .send({ quantity: 10 });

  //   expect(res.body).toEqual({
  //     id: '1',
  //     quantity: 10,
  //   });
  // });
});
