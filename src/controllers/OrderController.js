const OrderService = require('../services/OrderService')

const createOrder = async (req,res) => {
  try{
    const { paymentMethod, itemsPrice, shippingPrice, totalPrice,  fullname, address, phone} = req.body
    if( !paymentMethod || !itemsPrice|| !shippingPrice|| !totalPrice|| !fullname|| !address|| !phone) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required'
      })
    } 
    const reponse = await OrderService.createOrder(req.body)
    return res.status(200).json(reponse)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}


module.exports = {
  createOrder,
 
}