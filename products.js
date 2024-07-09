const express = require('express')
const productModel = require('../models/filename')
const productRoutes = express.Router();

productRoutes.get('/products/:minPrice', async (req, res) => {
    const minPrice = req.params.minPrice;
  
    
      const products = await productModel.find({ price: { $gt: minPrice } }).sort({ price: -1 });
      if(products.length >0){
        res.json(products);
      }else{
        res.send(`No products found greater than ${minPrice}`)
      }
      
   
  });