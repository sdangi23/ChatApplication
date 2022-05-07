import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./utils/database";

dotenv.config();

const app = express();



app.use(cors());
app.use(express.json());

import userRoutes from './routes/user';

//Routes
app.use(userRoutes);

const PORT = process.env.PORT || 3000;

database
//.sync({ alter: true })
.sync()
.then( () => {
	app.listen( PORT, () => {
    console.log( `Server is running at ${PORT}` );
  } );
} );
