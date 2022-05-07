"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const msg_1 = require("../controller/msg");
const msg_2 = require("../controller/msg");
const router = (0, express_1.Router)();
router.post("/savemsg", authenticate_1.authenticate, msg_1.saveMsg);
router.get("/getmsg", authenticate_1.authenticate, msg_2.getMsg);
exports.default = router;
//# sourceMappingURL=msg.js.map