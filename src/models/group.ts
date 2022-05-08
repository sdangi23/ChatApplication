import sequelize from "../utils/database"
import { DataTypes } from "sequelize"

interface grouptable {
    grpId: number;
    groupname: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const grouptable= sequelize.define('Groups',{
    grpId:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    grpName:{
        type:DataTypes.STRING(128),
        allowNull:false,
        unique:true
    }

})

export default grouptable;