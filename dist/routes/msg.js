"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const msg_1 = require("../controller/msg");
const multer_1 = tslib_1.__importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: '../../uploads' });
const router = (0, express_1.Router)();
router.post("/savemsg", authenticate_1.authenticate, msg_1.saveMsg);
router.get("/getmsg", authenticate_1.authenticate, msg_1.getMsg);
router.get("/updatemsg", authenticate_1.authenticate, msg_1.updateMsg);
router.post("/upload", authenticate_1.authenticate, upload.single("file"), msg_1.uploadFile);
exports.default = router;
//# sourceMappingURL=msg.js.map