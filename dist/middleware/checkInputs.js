"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = tslib_1.__importDefault(require("../models/user"));
const checkInputs = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        let user = yield user_1.default.findOne({
            where: {
                email: userData.email
            }
        });
        if (user) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }
        return next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong. Try again later"
        });
    }
});
exports.default = checkInputs;
//# sourceMappingURL=checkInputs.js.map