const District = require('../../models/District');
const State = require('../../models/State');

exports.getDistricts = async(req, res, next) => {
    try {
        const state = req.query.state;
        const states = await State.findOne({ stateName: state });
        const districts = await District.find({ state: states._id });
        res.status(200).json({ Districts: districts, message: 'Districts found successfully' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postDistricts = async(req, res, next) => {
    try {
        const { district, state } = req.body;
        const originalState = await State.findOne({ stateName: state });
        if (!originalState) {
            return res.status(404).json({ message: 'State not found' });
        }
        const newDistrict = new District({ districtName: district, state: originalState._id });
        const newdistrict = await newDistrict.save();
        originalState.districts.push(newdistrict._id);
        await originalState.save();
        res.status(201).json({ district: newdistrict, message: 'District created successfully' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}