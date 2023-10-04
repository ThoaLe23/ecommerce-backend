const ProductService = require('../services/ProductService')

const createProduct = async (req,res) => {
  try{
    const { name, image, type, price, countInStock,rating,description, discount} = req.body
    if(!name || !image || !image || !type || !price  || !countInStock || !rating || !discount) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required'
      })
    } 
    const reponse = await ProductService.createProduct(req.body)
    return res.status(200).json(reponse)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateProduct = async (req,res) => {
  try{
    const productId = req.params.id
    const data = req.body
    if(!productId) {
          return res.status(200).json({
            status: 'ERR',
            message: 'The productId is required'
          })
        }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailProduct = async (req,res) => {
  try{
    const productId = req.params.id
    //const token = req.headers
    if(!productId) {
          return res.status(200).json({
            status: 'ERR',
            message: 'The productId is required'
          })
        }
    const response = await ProductService.getDetailProduct(productId)
    return res.status(200).json(response)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}
const getAllProduct = async (req,res) => {
  try{
    const {sort, filter} = req.query
    const response = await ProductService.getAllProduct(sort,filter)
    return res.status(200).json(response)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}
const deleteProduct  = async (req,res) => {
  try{
    const productId = req.params.id
    //const token = req.headers
    if(!productId) {
          return res.status(200).json({
            status: 'ERR',
            message: 'The productId is required'
          })
        }
    const response = await ProductService.deleteProduct(productId)
    return res.status(200).json(response)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}
const getAllType = async (req,res) => {
  try{
    const response = await ProductService.getAllType()
    return res.status(200).json(response)
  }catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  getAllType
}