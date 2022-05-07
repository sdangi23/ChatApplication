import {Sequelize} from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

export default  new Sequelize(process.env.DB!, process.env.DB_USER! , process.env.DB_PASSWORD ,{
    dialect:'mysql',
    host:"localhost",
});



