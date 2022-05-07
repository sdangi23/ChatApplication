"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const database_1 = tslib_1.__importDefault(require("./utils/database"));
dotenv_1.default.config();
const user_1 = tslib_1.__importDefault(require("./models/user"));
const msg_1 = tslib_1.__importDefault(require("./models/msg"));
user_1.default.hasMany(msg_1.default);
msg_1.default.belongsTo(user_1.default);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const user_2 = tslib_1.__importDefault(require("./routes/user"));
const msg_2 = tslib_1.__importDefault(require("./routes/msg"));
//Routes
app.use(user_2.default);
app.use(msg_2.default);
const PORT = process.env.PORT || 3000;
database_1.default
    .sync({ alter: true })
    //.sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
});
//# sourceMappingURL=app.js.map