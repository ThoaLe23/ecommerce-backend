const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
  return new Promise ( async (resolve, reject) => {
    const { name, image, type, price, countInStock,rating,description, discount} = newProduct
    try{
      const checkProduct = await Product.findOne({
        name: name
      })
      if(checkProduct !== null){
        resolve({
          status: 'OK',
          message: 'The name of product is already'
        })
      }
      const newProduct = await Product.create({
        name, image, type, price, countInStock :Number( countInStock),rating,description, discount
      })
      if(newProduct) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: newProduct
        })
      }
    }catch (e) {
      reject(e)
    }
  })
}

const updateProduct = (id, data) => {
  return new Promise ( async (resolve, reject) => {
    try{
      const checkProduct = await Product.findOne({
        _id: id
      })
      if(checkProduct === null){
        resolve({
          status: 'OK',
          message: 'The product is not defined'
        })
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data,{new: true});  
      resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: updatedProduct
        })  
    }catch (e) {
      reject(e);
    }
  });
}
const deleteProduct = (id) => {
  return new Promise ( async (resolve, reject) => {
    try{
      const checkProduct = await Product.findOne({
        _id: id
      })
      if(checkProduct === null){
        resolve({
          status: 'OK',
          message: 'The product is not defined'
        })
      }
      await Product.findByIdAndDelete(id)      
      resolve({
          status: 'OK',
          message: 'Delete product success'
        })  
    }catch (e) {
      reject(e)
    }
  })
}

const getAllProduct = (sort, filter) => {
  return new Promise ( async (resolve, reject) => {
    try{
    if(filter){
      const label = filter[0]
      const allProductFilter = await Product.find({
        [label]: {'$regex': filter[1]}
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: allProductFilter,  
      })  
    }
    if(sort){
      const objectSort = {}
      objectSort[sort[1]] = sort[0]
      const allProductSort = await Product.find().sort(objectSort)
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: allProductSort,  
      })  
     }
      const allProduct = await Product.find()
      resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: allProduct,
        })  
    }catch (e) {
      reject(e)
    }
  })
}
const getAllType = () => {
  return new Promise ( async (resolve, reject) => {
    try{
      const allType = await Product.distinct('type')
      resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: allType,
        })  
    }catch (e) {
      reject(e)
    }
  })
}

const getDetailProduct = (id) => {
  return new Promise ( async (resolve, reject) => {
    try{
      const product = await Product.findOne({
        _id: id
      })
      if(product === null){
        resolve({
          status: 'OK',
          message: 'The product is not defined'
        })
      }
      resolve({
          status: 'OK',
          message: 'success',
          data: product
        })  
    }catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  getAllType
}