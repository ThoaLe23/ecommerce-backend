const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleWare,authUserMiddleWare, } = require("../middleware/authMiddleware");

router.post('/create',OrderController.createOrder)
router.get('/get-details-order/:id',OrderController.getDetailsOrder)
router.get('/get-order-all/:id' ,OrderController.getAllDetailsOrder)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)


module.exports = router