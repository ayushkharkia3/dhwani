const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

exports.postRegister = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username: username, password: hashedPassword });
        const user = await newUser.save();
        res.status(201).json({ user: user, message: 'User created' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postLogin = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            const error = new Error('A user with this username could not be found.');
            error.statusCode = 404;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
                userId: user._id.toString()
            },
            'somesupersecretsecretDhwaniKey', { expiresIn: "1d" }
        );
        res.status(200).json({ token: token, user: user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}