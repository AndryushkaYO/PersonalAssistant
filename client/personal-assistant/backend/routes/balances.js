const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const Balance = require('../models/balance');

router.get('', checkAuth, (req, res, next) => {
  Balance.find({
    creator: req.userData.userId,
    // date: req.body.date
  }).then((balances) => {
    res.status(200).json({
      message: 'Balance wheel sent successfully',
      balances
    });
  });
});

router.post('', checkAuth, (req, res, next) => {
  const balance = new Balance({
    date: req.body.date,
    creator: req.userData.userId,
    sectors: req.body.sectors
  });
  balance.save().then((createdBalance) => {
    res.status(201).json({
      message: 'Balance added successfully',
      balance: {
        ...createdBalance,
        id: createdBalance._id
      }
    });
  });
});

router.put('/:id', checkAuth, (req, res, next) => {
  const balance = new Balance({
    _id: req.body.id,
    date: req.body.date,
    sectors: req.body.sectors,
  });
  Balance.updateOne({ _id: req.body.id, creator: req.userData.userId }, balance).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: 'Balance updated successfully'
      });
    } else {
      res.status(401).json({
        message: 'Dont have access to modify habbit'
      });
    }
  });  
});

module.exports = router;
