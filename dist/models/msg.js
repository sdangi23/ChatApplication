"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const sequelize_1 = require("sequelize");
const msgtable = database_1.default.define('Texts', {
    msgid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    }
});
exports.default = msgtable;
//# sourceMappingURL=msg.js.map