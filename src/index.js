const express = require("express");
const dotenv = require('dotenv');
const  mongoose = require("mongoose");
dotenv.config()

const app = express()
const port =process.env.PORT || 3002

app.get('/',(req,res) => {
   res.send('Hello world 111')
})

console.log('process.env.MONGO_DB',process.env.MONGO_DB)

mongoose.connect(`mongodb+srv://lekimthoa1223:${process.env.MONGO_DB}@cluster0.rilr6c5.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log('Connect DB success!')
})
.catch((err) => {
  console.log(err)
})
app.listen(port,() => {
  console.log('Server is running in port: ',+port)
})