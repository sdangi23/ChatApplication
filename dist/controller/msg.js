"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMsg = exports.getMsg = exports.saveMsg = void 0;
const tslib_1 = require("tslib");
const msg_1 = tslib_1.__importDefault(require("../models/msg"));
const sequelize_1 = require("sequelize");
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
exports.saveMsg = saveMsg;
const getMsg = (_req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('-----------------------------Inside Controller-----------------------');
        const texts = yield msg_1.default.findAll();
        res.status(201).json({ success: true, message: 'Chats retrieved from DB', texts: texts });
        return;
    }
    catch (_b) {
        res.status(404).json({ success: false, message: 'Chats retrieval from DB Failed' });
    }
});
exports.getMsg = getMsg;
const updateMsg = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const texts = yield msg_1.default.findAll({ where: { msgid: { [sequelize_1.Op.gte]: id } } });
        res.status(201).json({ success: true, message: 'Chats retrieved from DB', texts: texts });
        return;
    }
    catch (_c) {
        res.status(404).json({ success: false, message: 'Chats retrieval from DB Failed' });
    }
});
exports.updateMsg = updateMsg;
//# sourceMappingURL=msg.js.map