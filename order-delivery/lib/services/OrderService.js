const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async allOrders() {
    const order = await Order.produce();

    return order;
  }

  // static async update({ quantity }) {
  //   await sendSms(
  //     process.env.ORDER_HANDLER_NUMBER,
  //     `Updated Order received for ${quantity}`
  //   );

  //   const order = await Order.insert({ quantity });

  //   return order;
  // }

  // static async delete({ quantity }) {
  //   await sendSms(process.env.ORDER_HANDLER_NUMBER, `Order Deleted`);

  //   const order = await Order.delete({ quantity });

  //   return order;
  // }
};
