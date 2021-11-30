// relation type on NoSQL Embedded Document
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const subscribeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subscribe: {
      type: String,
      required: true,
    },
    membership: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'subscribes',
  },
);

module.exports = mongoose.model('Subscribe', subscribeSchema);
