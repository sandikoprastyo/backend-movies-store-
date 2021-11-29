// relation type on NoSQL Embedded Document
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
let User = required('./User');

const transaksiSchema = new Schema(
  {
    user: [User.schema],
    subscribe: {type: String, required: true},
    membership: {type: String, required: true}
  },
  {
    timestamps: true,
    collection: 'transaksis',
  },
);

module.exports = mongoose.model('Transaksi', transaksiSchema);
