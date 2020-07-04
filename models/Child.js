const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({
    name: { type: String },
    sex: {
        type: String,
        enum: ['Male', 'Female']
    },
    dob: {
        type: Date
    },
    fatherName: {
        type: String
    },
    motherName: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Child', childSchema);