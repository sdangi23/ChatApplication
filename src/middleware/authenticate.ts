import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import Users from "../models/user";

export async function authenticate(req: Request , res: Response, next:NextFunction) {
    try{
        if(req.header('Authorization')){

            console.log('-----------------------------Inside Header Authenticator-----------------------');
            const rcvdtoken: string = req.header('Authorization');

            const userId = Number(jwt.verify(rcvdtoken , process.env.JWT_SECRET!));

            const foundUser = await Users.findByPk(userId);
            req.user = foundUser;
            console.log('-----------------------------User Authenticated-----------------------');
            next();
            return;
        }

        return res.status(404).json( { success: false, message: 'token not found' } );
    }
    catch(err){
        console.log(err);
        return res.status(404).json( {success: false , message: 'user authentication failed' , error: err} )
    }
}
