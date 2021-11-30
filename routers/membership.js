const router = require('express').Router();
const Membership = require('../models/Membership.js');

//? get all Membership
router.get('/', (req, res) => {
  Membership.find()
    .then((Membership) =>
      res.json({
        status: 200,
        success: true,
        data: Membership,
      }),
    )
    .catch((err) =>
      res.status(400).json({
        status: 400,
        success: false,
        message: err.message,
      }),
    );
});

//? post data Membership
router.post('/', async (req, res) => {
  try {
    const membership = new Membership(req.body);
    await membership.save();
    res.status(200).json({ status: 200, success: true, data: membership });
  } catch (err) {
    res.status(400).json({ status: 400, success: false, message: err.message });
  }
});

module.exports = router;
