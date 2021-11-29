const mongoose = require('mongoose');
const {Schema} =require('mongoose');

const membershipSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    subscribe: {
      type: String,
    },
    membership: {
      type: String,
      required: true,
    },
    id_user: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  {
    timestamps: true,
    collection: 'memberships',
  },
);

module.exports = mongoose.model('Membership', membershipSchema);
