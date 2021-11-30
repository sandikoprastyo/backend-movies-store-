const router = require('express').Router();
const Subscribe = require('../models/Subscribe.js');

//? get all Subsribe
router.get('/', (req, res) => {
  Subscribe.find()
    .then((Subscribe) =>
      res.json({
        status: 200,
        success: true,
        data: Subscribe,
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

//? post data Subscribe
router.post('/', async (req, res) => {
  try {
    const subscribe = new Subscribe(req.body);
    await subscribe.save();
    res.status(200).json({ code: 200, success: true, data: subscribe });
  } catch (err) {
    res.status(400).json({ code: 400, success: false, message: err.message });
  }
});

module.exports = router;
