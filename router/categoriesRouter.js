const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category');
const itemModel = require('../models/item');

router
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    next();
  })
  .get(async (req, res) => {
    const category = await categoryModel.find({});
    try {
      res.send(category);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const category = new categoryModel(req.body);
    try {
      await category.save();
      res.send(category);
    } catch (err) {
      res.status(500).send(err);
    }
  });

router
  .route('/:id')
  .all((req, res, next) => {
    res.statusCode = 200;
    next();
  })
  .get(async (req, res) => {
    try {
      const category = req.params.id;
      const item = await itemModel.find({ category: category });
      if (!item) res.status(404).send('No items found');
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const category = await categoryModel.findByIdAndDelete(req.params.id).select('category -_id');
      await itemModel.find(category).updateMany({ category: 'empty' });
      res.send(category);
      if (!category) res.status(404).send('No item found');
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
