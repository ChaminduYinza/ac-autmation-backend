const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create place Schema
const acSchema = new Schema(
    {
        did: {
            type: String,
            unique: true,
        },
        roomTemperature: {
            type: String,
        },
        power: {
            type: Boolean,
            default: true,
        },
        age: {
            type: Number
        },
        comfortableTemperature: {
            default: 25,
            type: Number
        },
        roomTemperatureHistory: {
            type: Array,
            default: []
        },
        noOfPersons: {
            type: Number
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('AC', acSchema);
