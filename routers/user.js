const router = require('express').Router();
const User = require('../models/User.js');
const verifyToken = require("./verifyToken");

//! get all user
router.get('/', (req, res) => {
  User.find()
    .then((user) => res.json({
      status: 200,
      success: true,
      message: user,
    }))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//! get by id user
router.get('/:id', verifyToken, (req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      res.json({
        status: 200,
        success: true,
        message: user,
      }),
    )
    .catch((err) => res.status(400).json('Error: ' + err));
});

//!  delete data user  by id
router.delete('/:userId', verifyToken, async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({
      _id: req.params.userId,
    });
    res.json({
      status: 200,
      success: true,
      message: "OK",
      data: deleteUser
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//! post data user
router.post('/', async (req, res) => {
  const dataUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  });
  try {
    const saveUser = await dataUser.save();
    res.json({
      status: 200,
      success: true,
      message: saveUser
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//!  search name user
router.get('/search/:query', verifyToken, async (req, res) => {
  const reqName = req.params.query;
  User.find(
    {
      firtname: reqName,
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: 'Error',
          }),
        );
      }
    },
  );
});

module.exports = router;
