"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
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
        const email = req.body.email;
        const password = req.body.password;
        yield user_1.default.findAll({ where: { email: email } })
            .then((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const savedpw = result[0].password;
            yield bcryptjs_1.default.compare(savedpw, password, function (error, _response) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        console.log('------------ in password compare block', error, '---------------------');
                        return res.json({ success: false, message: 'Password you enterred doesnt match' });
                    }
                    else {
                        const token = yield generateToken(result[0].id);
                        return res.json({ success: true, message: 'login Successful', Accesstoken: token });
                    }
                });
            });
        }))
            .catch((err) => {
            console.log(err);
            return res.sendStatus(400).json({ success: false, message: "User not Found" });
        });
    });
}
exports.logIn = logIn;
//# sourceMappingURL=user.js.map