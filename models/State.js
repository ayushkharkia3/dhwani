const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateName: {
        type: String
    },
    districts: {
        type: Array,
        districtID: {
            type: Schema.Types.ObjectId,
            ref: 'District'
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('State', stateSchema);