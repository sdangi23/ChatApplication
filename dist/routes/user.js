"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const checkInputs_1 = tslib_1.__importDefault(require("../middleware/checkInputs"));
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
router.post("/signup", checkInputs_1.default, user_1.signUp);
router.post("/login", user_1.logIn);
exports.default = router;
//# sourceMappingURL=user.js.map