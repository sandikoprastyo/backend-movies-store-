const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require('../utils/auth');
require('dotenv').config();

//regex for validation
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
  let { name, phone, email, password, password_confirmation } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: 'required' });
  }
  if (!phone) {
    errors.push({ phone: 'required' });
  }
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid' });
  }
  if (!password) {
    errors.push({ password: 'required' });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: 'required',
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: 'mismatch' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ code: 422, errors: [{ message: 'email already exists' }] });
      } else {
        const user = new User({
          name: name,
          phone: phone,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  code: 200,
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{code: 500, error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }],
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: 'required' });
  }

  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid email' });
  }

  if (!password) {
    errors.push({ passowrd: 'required' });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email })
    .then((User) => {
      if (!User) {
        return res.status(404).json({
          code: 404,
          success: false,
          errors: [{ User: 'not found' }],
        });
      } else {
        bcrypt
          .compare(password, User.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({
                  code: 400,
                  success: false,
                  errors: [{ password: 'incorrect' }]
                });
            }

            const tokens = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET,  { expiresIn: '1h' });
            res.header('token', tokens).json({
              code: 200,
              success: true,
              token: tokens,
              message: User,
            });


            let access_token = createJWT(User.email, User._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ erros: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    code: 200,
                    success: true,
                    token: access_token,
                    message: User,
                  });
                }
              },
            );
          })
          .catch((err) => {
            res.status(500).json({ code: 500, erros: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ code: 500, erros: err });
    });
};
