const mongoose = require('mongoose');
const {Schema} =require('mongoose');

const userSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
    subscribe: {
      type: String,
    },
    membership: {
      type: Schema.Types.ObjectId,
      ref: 'MemberShip',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

module.exports = mongoose.model('User', userSchema);
