import sequelize from "../utils/database"
import { DataTypes } from "sequelize"


const usersGroups= sequelize.define('UserGroups',{
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }

})

export default usersGroups;