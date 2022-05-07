import sequelize from "../utils/database"
import { DataTypes } from "sequelize"

interface usertable {
    id: number;
    name: string;
    email: string;
    phnumber: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const usertable= sequelize.define('Users',{
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    name:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(128),
        allowNull:false
    }

})

export default usertable;