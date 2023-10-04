const User = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const { genneralAcessToken, genneralRefreshToken } = require("./JwtService");
const Order = require("../models/OrderProduct");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {orderItems,paymentMethod,itemsPrice,shippingPrice, totalPrice,  fullname, address, phone,user} = newOrder
    try {
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress:{
          fullname, address, phone
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user,
      });
      if (createdOrder) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  
};
