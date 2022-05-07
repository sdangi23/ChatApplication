import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./utils/database";

dotenv.config();

import user  from "./models/user"
import msg from "./models/msg"
user.hasMany(msg)
msg.belongsTo(user)

const app = express();



app.use(cors());
app.use(express.json());

import userRoutes from './routes/user';
import msgRoutes from './routes/msg';

//Routes
app.use(userRoutes);
app.use(msgRoutes);

const PORT = process.env.PORT || 3000;

database
.sync({ alter: true })
//.sync()
.then( () => {
	app.listen( PORT, () => {
    console.log( `Server is running at ${PORT}` );
  } );
} );
