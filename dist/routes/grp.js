"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const grp_1 = require("../controller/grp");
const router = (0, express_1.Router)();
router.post("/createGrp", authenticate_1.authenticate, grp_1.createGrp);
router.get("/getGrps", authenticate_1.authenticate, grp_1.getGrps);
exports.default = router;
//# sourceMappingURL=grp.js.map