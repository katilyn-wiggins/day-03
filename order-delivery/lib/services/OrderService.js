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

  static async allOrdersWithId(id) {
    const order = await Order.produceWithId(id);

    return order;
  }

  static async updateWithId({ quantity }, id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Updated Order received for ${quantity}`
    );

    const order = await Order.update(quantity, id);
    return order;
  }

  static async delete(id) {
    await sendSms(process.env.ORDER_HANDLER_NUMBER, `Order Deleted`);

    const order = await Order.trash(id);

    return order;
  }
};
