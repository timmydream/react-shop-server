const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const categoriesRouter = require('./router/categoriesRouter');
const itemRouter = require('./router/itemRouter');
const itemModel = require('./models/item');
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mon:123@cluster0.wrlek.mongodb.net/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/categories', categoriesRouter);
app.use('/items', itemRouter);
app.listen(PORT, () => {
  console.log('Server is running...');
});
