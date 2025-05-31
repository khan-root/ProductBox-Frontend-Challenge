var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();
const fs = require('fs');
const path = require('path');
var items = require('../init_data.json').data;
var curId = _.size(items);

router.get('/', function(req, res){
    const filePath = path.join(__dirname, '..', 'init_data.json');
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        const parsedData = JSON.parse(jsonData);
        const cart = parsedData.cart || { items: [] };
        res.json(cart);
    })
})

router.post('/add-to-cart', (req, res) => {
    const {id} = req.body


    const filePath = path.join(__dirname, '..', 'init_data.json');


  fs.readFile(filePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    try {
      const parsed = JSON.parse(jsonData);
      const products = parsed.data || {};
      const cart = parsed.cart || { items: [] };

      const product = products[id];
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }



      // Check if product already in cart to avoid duplicates
      const exists = cart.items.some(item => item.id === product.id);
      if (!exists) {
        cart.items.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          img: product.img,
        });
      }

      parsed.cart = cart;


      fs.writeFile(filePath, JSON.stringify(parsed, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          return res.status(500).json({ error: 'Failed to update cart' });
        }

        res.status(200).json({ message: 'Product added to cart', cart });
      });

    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});



module.exports = router;