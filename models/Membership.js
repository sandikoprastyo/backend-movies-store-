const mongoose = require('mongoose');
const {Schema} =require('mongoose');

const membershipSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type_membership: {
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
