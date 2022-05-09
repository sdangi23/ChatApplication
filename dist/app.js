"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const database_1 = tslib_1.__importDefault(require("./utils/database"));
const path_1 = tslib_1.__importDefault(require("path"));
dotenv_1.default.config();
const user_1 = tslib_1.__importDefault(require("./models/user"));
const msg_1 = tslib_1.__importDefault(require("./models/msg"));
const group_1 = tslib_1.__importDefault(require("./models/group"));
const usersgroup_1 = tslib_1.__importDefault(require("./models/usersgroup"));
user_1.default.hasMany(msg_1.default);
msg_1.default.belongsTo(user_1.default);
group_1.default.belongsToMany(user_1.default, { through: usersgroup_1.default });
user_1.default.belongsToMany(group_1.default, { through: usersgroup_1.default });
group_1.default.hasMany(msg_1.default);
msg_1.default.belongsTo(group_1.default);
//usergroup - uid, groupid, isAdmin
//msg table : uid, 
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "Views")));
const user_2 = tslib_1.__importDefault(require("./routes/user"));
const msg_2 = tslib_1.__importDefault(require("./routes/msg"));
const grp_1 = tslib_1.__importDefault(require("./routes/grp"));
//Routes
app.use(user_2.default);
app.use(msg_2.default);
app.use(grp_1.default);
app.use((req, res, _next) => {
    res.sendFile(path_1.default.join(__dirname, `../Views/login.html`));
});
const PORT = process.env.PORT || 3000;
database_1.default
    //.sync({ alter: true })
    .sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
});
//# sourceMappingURL=app.js.map