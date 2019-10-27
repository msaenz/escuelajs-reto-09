const express = require('express');
const path = require('path');
const ProductsService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductsService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const { tags } = req.query
    try {
      const storeProducts = await productService.getProducts({ tags })
      console.log(storeProducts)
      res.status(200).json({ data: storeProducts, message: 'Products listed' })      
    } catch (err) {
      next(err)
    }

  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;