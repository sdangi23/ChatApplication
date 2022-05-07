import usertable from "../models/user";
// import { RequestHandler} from 'express'
import {Request, Response, NextFunction} from "express";

interface RequestBody {
    email: string
}

const checkInputs = async ( req: Request, res: Response, next: NextFunction ) => {
    const userData = req.body as RequestBody;
	try {
		let user = await usertable.findOne( {
			where: {
				email: userData.email
			}
		} );
		if ( user ) {
			return res.status(400).json( {
				message: "Email is already registered"
			} );
		}
		return next();
	} catch ( error ) {
		return res.status(500).json( {
			message: "Oops! Something went wrong. Try again later"
		} );
	}
};

export default checkInputs;