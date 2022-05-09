"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const user_1 = tslib_1.__importDefault(require("../models/user"));
function authenticate(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (req.header('Authorization')) {
                console.log('-----------------------------Inside Header Authenticator-----------------------');
                const rcvdtoken = req.header('Authorization');
                const userId = Number(jsonwebtoken_1.default.verify(rcvdtoken, process.env.JWT_SECRET));
                const foundUser = yield user_1.default.findByPk(userId);
                req.user = foundUser;
                console.log('-----------------------------User Authenticated-----------------------');
                next();
                return;
            }
            return res.status(404).json({ success: false, message: 'token not found' });
        }
        catch (err) {
            // console.log(err);
            return res.status(404).json({ success: false, message: 'user authentication failed', error: err });
        }
    });
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map