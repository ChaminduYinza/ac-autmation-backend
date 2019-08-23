const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create place Schema
const acSchema = new Schema(
    {
        did: {
            type: String,
            unique:true,
        },
        power: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Light', acSchema);
