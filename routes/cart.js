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

router.post('/', (req, res)=>{
    const { productId} = req.body;
    console.log('productId', productId)

  const filePath = path.join(__dirname, '..', 'init_data.json');

//   fs.readFile(filePath, 'utf8', (err, jsonData) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return res.status(500).json({ error: 'Failed to read data file' });
//     }

//     // try {
//     //   const parsed = JSON.parse(jsonData);
//     //   const products = parsed.data || {};
//     //   const cart = parsed.cart || { items: [], total: 0 };

//     //   const product = products[productId];
//     //   if (!product) {
//     //     return res.status(404).json({ error: 'Product not found' });
//     //   }

//     //   const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

//     //   if (existingItemIndex >= 0) {
//     //     // Update quantity
//     //     // cart.items[existingItemIndex].quantity += quantity;
//     //   } else {
//     //     cart.items.push({
//     //       id: product.id,
//     //       name: product.name,
//     //       price: parseFloat(product.price),
//     //       img: product.img,
//     //     //   quantity: quantity
//     //     });
//     //   }

//     //   // Recalculate total
//     //   cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     //   // Write back to file
//     //   fs.writeFile(filePath, JSON.stringify({ data: products, cart }, null, 2), (err) => {
//     //     if (err) {
//     //       console.error('Error writing file:', err);
//     //       return res.status(500).json({ error: 'Failed to update cart' });
//     //     }

//     //     res.status(200).json({ message: 'Product added to cart', cart });
//     //   });

//     // } catch (parseErr) {
//     //   console.error('Error parsing JSON:', parseErr);
//     //   return res.status(500).json({ error: 'Invalid JSON format' });
//     // }
//   });
})


module.exports = router;