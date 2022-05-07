"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const sequelize_1 = require("sequelize");
const usertable = database_1.default.define('Users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    }
});
exports.default = usertable;
//# sourceMappingURL=user.js.map