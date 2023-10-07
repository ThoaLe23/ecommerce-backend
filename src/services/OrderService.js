const User = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const { genneralAcessToken, genneralRefreshToken } = require("./JwtService");
const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel")

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {orderItems , paymentMethod,itemsPrice,shippingPrice, totalPrice,  fullname, address, phone ,user} = newOrder
    try {
      const promises = orderItems.map( async(order) => {
          const productData = await Product.findOneAndUpdate(
          {
          _id: order.product, 
          countInStock: {$gte: order.amount}
          },
          {$inc: {
            countInStock: -order.amount,
            selled: +order.amount
            }},
          {new: true}
        ) 
        console.log(productData)
        if(productData){
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
        })
        if (createdOrder) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        }}
      else{
        return {
          status: "ERR",
          message: "ERROR",
          id: order.product,
        };
      }
       
  })
    const results = await Promise.all(promises)
    const newData = results && results.filter((item) => item.id)
    if(newData.length){
      resolve({
        status: 'ERR',
        message: `Sản phẩm với id ${newData.join(',')} không đủ hàng`
      })
    }
    resolve({
      status: 'OK',
      message: 'SUCCESS'
    })
    console.log(results)
    } catch (e) {
      reject(e);
    }
  });
};
const getAllDetailsOrder = (id) => {
  return new Promise ( async (resolve, reject) => {
    try{
      const order = await Order.find({
        user : id
      })
      if(order === null){
        resolve({
          status: 'OK',
          message: 'The order is not defined'
        })
      }
      resolve({
          status: 'OK',
          message: 'success',
          data: order
        })  
    }catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  createOrder,
  getAllDetailsOrder
  
};
