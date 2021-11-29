// relation type on NoSQL Embedded Document
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const membershipSchema = new Schema(
  {
    membership_name: String,
    user: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
    collection: 'memberships',
  },
);

module.exports = mongoose.model('Membership', membershipSchema);
