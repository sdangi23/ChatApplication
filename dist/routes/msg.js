"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const msg_1 = require("../controller/msg");
const router = (0, express_1.Router)();
router.post("/savemsg", authenticate_1.authenticate, msg_1.saveMsg);
router.get("/getmsg", authenticate_1.authenticate, msg_1.getMsg);
router.get("/updatemsg", authenticate_1.authenticate, msg_1.updateMsg);
exports.default = router;
//# sourceMappingURL=msg.js.map