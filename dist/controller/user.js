"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.logIn = exports.signUp = void 0;
const tslib_1 = require("tslib");
const user_1 = tslib_1.__importDefault(require("../models/user"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function generateToken(id) {
    return jsonwebtoken_1.default.sign(id, process.env.JWT_SECRET);
}
function signUp(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const hashpassword = yield bcryptjs_1.default.hash(password, 10);
        var existinguser = undefined;
        yield user_1.default.findAll({ where: { name: name, email: email } })
            .then((result) => {
            if (result[0]) {
                existinguser = result[0];
            }
        })
            .catch((err) => console.log(err));
        if (existinguser == undefined) {
            user_1.default.create({
                name: name,
                email: email,
                phone: phone,
                password: hashpassword,
            })
                .then((result) => {
                res.json({ message: "User Successfully Registered", result });
            })
                .catch((err) => console.log(err));
        }
        else {
            res.json({ message: "User already exists please login" });
        }
    });
}
exports.signUp = signUp;
function logIn(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const inppw = req.body.password;
            const foundUser = yield user_1.default.findOne({ where: { email: email } });
            if (!foundUser) {
                return res.status(400).json({ success: false, message: "User not Found" });
            }
            //console.log(foundUser , '-----------------------USER FOUND---------------------------')
            const savedpw = foundUser.password;
            const comparison = yield bcryptjs_1.default.compare(inppw, savedpw);
            if (!comparison) {
                //console.log('------------ in password comparison gave falsy result block---------------------')
                return res.status(200).json({ success: false, message: 'Invalid Password, Try Again ...' });
            }
            const token = generateToken(foundUser.id);
            res.status(202).json({ success: true, message: 'login Successful', Accesstoken: token, user: foundUser });
            return;
        }
        catch (_a) {
            res.status(404).json({ success: false, message: 'Something went wrong, try again' });
            return;
        }
    });
}
exports.logIn = logIn;
function getUsers(_req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const dbusers = yield user_1.default.findAll();
            res.json({ success: true, message: 'All users fetched', dbusers });
        }
        catch (_a) {
            res.json({ success: false, message: 'Database fetching failed' });
        }
    });
}
exports.getUsers = getUsers;
//# sourceMappingURL=user.js.map