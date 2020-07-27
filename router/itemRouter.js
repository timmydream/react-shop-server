const express = require('express');
const router = express.Router();
const itemModel = require('../models/item');

router
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    next();
  })
  .get(async (req, res) => {
    const item = await itemModel.find({});
    try {
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const item = new itemModel(req.body);
    try {
      await item.save();
      res.send(item);
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
  .delete(async (req, res) => {
    try {
      const item = await itemModel.findByIdAndDelete(req.params.id);
      if (!item) res.status(404).send('No item found');
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .put(async (req, res) => {
    itemModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2));
    });
  });

module.exports = router;
