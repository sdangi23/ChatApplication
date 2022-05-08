"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const sequelize_1 = require("sequelize");
const grouptable = database_1.default.define('Groups', {
    grpId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    grpName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    }
});
exports.default = grouptable;
//# sourceMappingURL=group.js.map