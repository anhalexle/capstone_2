const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateVN = moment.tz(Date.now(), "Asia/Bangkok").format();
// console.log(typeof(dateVN))
const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 1,
        maxlength: 100,
    },
    type: {
        type: String,
        enum: ['volt', 'current','frequency','pf','integral_power','instantaneous_power'],
        default: 'volt',
    },
    value: {
        type: Number,
        default: 0,
    },
    address: {
        type: Number,
        required: [true, 'Please provide an address'],
    },
    created_date: {
        type: String,
        default: dateVN,
    }
}, { timestamps: { createdAt: true, updatedAt: false } })



module.exports = mongoose.model('Data',dataSchema,'data_api');