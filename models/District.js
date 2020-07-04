const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const districtSchema = new Schema({
    districtName: {
        type: String
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    },
}, { timestamps: true });

module.exports = mongoose.model('District', districtSchema);