import sequelize from "../utils/database"
import { DataTypes } from "sequelize"

interface msgtable {
    msgid: number;
    userName: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const msgtable= sequelize.define('Texts',{
    msgid:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    userName:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    message:{
        type:DataTypes.STRING(),
        allowNull:false
    }

})

export default msgtable;