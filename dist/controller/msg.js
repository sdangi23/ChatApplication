"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.updateMsg = exports.getMsg = exports.saveMsg = void 0;
const tslib_1 = require("tslib");
const msg_1 = tslib_1.__importDefault(require("../models/msg"));
const sequelize_1 = require("sequelize");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const saveMsg = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const message = req.body.message;
        const username = req.user.name;
        const grpId = req.query.id;
        if (!grpId) {
            yield user.createText({ message: message, userName: username });
            return res.status(201).json({ success: true, message: 'Text Saved to DB' });
        }
        else {
            yield user.createText({ message: message, userName: username, GroupGrpId: grpId });
            return res.status(201).json({ success: true, message: 'Text Saved to DB' });
        }
    }
    catch (_a) {
        return res.status(400).json({ success: false, message: 'Database Operation Failed Try Again' });
    }
});
exports.saveMsg = saveMsg;
const getMsg = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const grpId = req.query.id;
        if (!grpId) {
            //console.log('-----------------------------Inside Controller-----------------------');
            const texts = yield msg_1.default.findAll({ where: { GroupGrpId: null } });
            res.status(201).json({ success: true, message: 'Chats retrieved from DB', texts: texts });
            return;
        }
        else {
            const texts = yield msg_1.default.findAll({ where: { GroupGrpId: grpId } });
            return res.status(201).json({ success: true, message: 'Group Chats retrieved from DB', texts: texts });
        }
    }
    catch (_b) {
        return res.status(404).json({ success: false, message: 'Chats retrieval from DB Failed' });
    }
});
exports.getMsg = getMsg;
const updateMsg = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const texts = yield msg_1.default.findAll({ where: { msgid: { [sequelize_1.Op.gte]: id }, GroupGrpId: null } });
        return res.status(201).json({ success: true, message: 'Chats retrieved from DB', texts: texts });
    }
    catch (_c) {
        return res.status(404).json({ success: false, message: 'Chats retrieval from DB Failed' });
    }
});
exports.updateMsg = updateMsg;
const uploadFile = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const username = req.user.name;
        const name = `File-${new Date()}`;
        const file = req.file;
        console.log('---------------- inside uploadFile function ------------');
        const url = yield upoloadToS3(file, name);
        console.log(url);
        const chat = yield user.createText({ message: `File link - ${url}`, userName: username });
        if (chat) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Cannot send file" });
    }
});
exports.uploadFile = uploadFile;
//should be now moved to services folder while optimising the app
const upoloadToS3 = (file, name) => {
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.IAM_USERID,
        secretAccessKey: process.env.IAM_SECRET,
    });
    console.log('---------------- >>> inside S3 service ---- >>>>>>>>>>>>>>', file.path);
    const fileStream = fs_1.default.createReadStream(file.path);
    console.log('---------------- >>> inside S3 service (2nd Time) ---- >>>>>>>>>>>>>>', fileStream);
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: name,
        Body: fileStream,
        ACL: "public-read",
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, s3response) => {
            if (err) {
                reject(err);
            }
            console.log(s3response);
            resolve(s3response.Location);
        });
    });
};
//# sourceMappingURL=msg.js.map