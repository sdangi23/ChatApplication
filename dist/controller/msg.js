"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const saveMsg = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const message = req.body.message;
        const username = req.user.name;
        yield user.createText({ message: message, userName: username });
        res.status(201).json({ success: true, message: 'Text Saved to DB' });
    }
    catch (_a) {
        res.status(400).json({ success: false, message: 'Database Operation Failed Try Again' });
    }
});
exports.default = saveMsg;
//# sourceMappingURL=msg.js.map