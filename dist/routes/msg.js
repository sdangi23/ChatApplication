"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const msg_1 = tslib_1.__importDefault(require("../controller/msg"));
const router = (0, express_1.Router)();
router.post("/savemsg", authenticate_1.authenticate, msg_1.default);
exports.default = router;
//# sourceMappingURL=msg.js.map