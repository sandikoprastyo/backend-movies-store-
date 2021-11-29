const router = require('express').Router();
const User = require('../models/User.js');
const verifyToken = require('./verifyToken');

//! get all user
router.get('/', (req, res) => {
  User.find()
    .then((user) =>
      res.json({
        status: 200,
        success: true,
        message: user,
      }),
    )
    .catch((err) => res.status(400).json('Error: ' + err));
});

//! get by id user
router.get('/:id', (req, res) => {
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
      message: 'OK',
      data: deleteUser,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//! post data user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const membership = await Membership.findById({ _id: user.membership })
    membership.user.push(user)
    await membership.save()

    res.status(200).json({success: true, data: user})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
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
