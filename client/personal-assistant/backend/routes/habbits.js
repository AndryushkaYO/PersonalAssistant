const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const Habbit = require('../models/habbits');

router.get('', checkAuth, (req, res, next) => {
  const startSelectedDate = req.body.startSelectedDate;
  const endSelectedDate = req.body.endSelectedDate;

  Habbit.find({
    creator: req.userData.userId,
  }).then((habbits) => {
    // const filteredHabbits = habbits.filter((date) => date >= startSelectedDate && date <= endSelectedDate);
    const filteredHabbits = habbits;
    res.status(200).json({
      message: 'Habbits sent successfully',
      habbits: filteredHabbits
    });
  });
});

router.post('', checkAuth, (req, res, next) => {
  const habbit = new Habbit({
    name: req.body.name,
    markedDates: req.body.markedDates,
    creator: req.userData.userId,
    visible: req.body.visible
  });
  habbit.save().then((createdHabbit) => {
    res.status(201).json({
      message: 'Habbit added successfully',
      habbit: {
        ...createdHabbit,
        id: createdHabbit._id
      }
    });
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Habbit.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Habbit deleted successfully'
      });
    } else {
      res.status(401).json({
        message: 'Dont have access to delete habbit'
      });
    }
  });  
});

router.put('/:id', checkAuth, (req, res, next) => {
  const habbit = new Habbit({
    _id: req.body.id,
    name: req.body.name,
    visible: req.body.visible,
    markedDates: req.body.markedDates,
  });
  Habbit.updateOne({ _id: req.body.id, creator: req.userData.userId }, habbit).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: 'Habbit updated successfully'
      });
    } else {
      res.status(401).json({
        message: 'Dont have access to modify habbit'
      });
    }
  });  
});

module.exports = router;
