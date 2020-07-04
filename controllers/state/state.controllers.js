const State = require('../../models/State');

exports.getStates = async(req, res, next) => {
    try {
        const states = await State.find().select('-districts');
        res.status(200).json({ states: states, message: 'States fount successfully' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postStates = async(req, res, next) => {
    try {
        const { state } = req.body;
        const newState = new State({ stateName: state });
        const newstate = await newState.save();
        res.status(201).json({ state: newstate, message: 'State created successfully' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}