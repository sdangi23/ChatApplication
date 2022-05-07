"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const tslib_1 = require("tslib");
const user_1 = tslib_1.__importDefault(require("../models/user"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
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
//# sourceMappingURL=user.js.map