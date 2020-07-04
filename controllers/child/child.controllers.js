const Child = require('../../models/Child');

exports.postChild = async(req, res, next) => {
    try {
        const { name, sex, dob, fatherName, motherName, state, district } = req.body;
        let imageUrl;
        if (req.file.photo) {
            imageUrl = req.files.photo[0].path.replace("\\", '/');
        }
        const newChild = new Child({ name: name, sex: sex, dob: dob, fatherName: fatherName, motherName: motherName, state: state, district: district, imageUrl: imageUrl });
        const child = await newChild.save();
        res.status(201).json({ child: child, message: "Child created successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getChild = async(req, res, next) => {
    try {
        let filters = {};
        for (let key in req.query) {
            filters[key] = req.query[key];
        }
        const child = await Child.find(filters);
        res.status(200).json({ child: child, message: "Successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}