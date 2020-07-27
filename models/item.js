const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  purchase: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: 
  {
    type: String,
    default: 'empty'
  }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
