const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleWare,authUserMiddleWare, } = require("../middleware/authMiddleware");

router.post('/create',OrderController.createOrder)
router.get('/get-order-all/:id' ,OrderController.getAllDetailsOrder)


module.exports = router