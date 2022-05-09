import {Request ,Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./utils/database";
import path from 'path';

dotenv.config();

import user  from "./models/user"
import msg from "./models/msg"
import groups from "./models/group"
import usergroup from "./models/usersgroup"

user.hasMany(msg)
msg.belongsTo(user)

groups.belongsToMany(user , {through: usergroup})
user.belongsToMany( groups , {through: usergroup})

groups.hasMany(msg)
msg.belongsTo(groups)

//usergroup - uid, groupid, isAdmin
//msg table : uid, 

const app = express();



app.use(cors());
app.use(express.json());
app.use( express.static( path.join( __dirname, "..", "Views" ) ) );

import userRoutes from './routes/user';
import msgRoutes from './routes/msg';
import groupRoutes from './routes/grp';

//Routes
app.use(userRoutes);
app.use(msgRoutes);
app.use(groupRoutes);
app.use((req: Request, res:Response, _next:NextFunction) => {
  res.sendFile(path.join(__dirname , `../Views/${req.url}.html`))
})

const PORT = process.env.PORT || 3000;

database
//.sync({ alter: true })
.sync()
.then( () => {
	app.listen( PORT, () => {
    console.log( `Server is running at ${PORT}` );
  } );
} );
