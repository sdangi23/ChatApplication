"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const sequelize_1 = require("sequelize");
const usersGroups = database_1.default.define('UserGroups', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
});
exports.default = usersGroups;
//# sourceMappingURL=usersgroup.js.map