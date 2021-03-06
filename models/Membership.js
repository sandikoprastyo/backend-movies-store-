// relation type on NoSQL Embedded Document
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const membershipSchema = new Schema(
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
    },
    membership: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'memberships',
  },
);

module.exports = mongoose.model('Membership', membershipSchema);
