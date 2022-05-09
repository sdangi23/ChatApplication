
import { Request, Response} from "express";
import msgtable from "../models/msg";
import {Op} from "sequelize";

import AWS from "aws-sdk";
import fs from "fs";

export const saveMsg = async(req: Request, res: Response) => {
    try{
    const user = req.user;
    const message: string = req.body.message;
    const username: string = req.user.name;
    const grpId = req.query.id;

    if(!grpId){
        await user.createText( {message: message , userName: username} )

    
        return res.status(201).json({success: true , message: 'Text Saved to DB'})
    }else{
        await user.createText({ message: message, userName: username, GroupGrpId:grpId })

        return res.status(201).json({success: true , message: 'Text Saved to DB'})
    }


    }
    catch{
    
        return res.status(400).json( {success: false, message: 'Database Operation Failed Try Again'});
    }

}

export const getMsg = async (req:Request, res: Response) => {
    try{
        const grpId = req.query.id;
        if(!grpId){
        //console.log('-----------------------------Inside Controller-----------------------');
        const texts = await msgtable.findAll( {where: {GroupGrpId: null}} );
        res.status(201).json( {success: true , message: 'Chats retrieved from DB' , texts: texts})
        return;
        }
        else{
            const texts = await msgtable.findAll( {where:{GroupGrpId: grpId} });
            return res.status(201).json({success: true , message: 'Group Chats retrieved from DB' , texts: texts});
        }
    }
    catch{
        return res.status(404).json( {success: false , message: 'Chats retrieval from DB Failed' } )
    }
}

export const updateMsg = async (req: Request , res: Response) => {
    try{
    const id = req.query.id;         
    const texts = await msgtable.findAll({where: {msgid:{[Op.gte]:id} ,GroupGrpId: null }});

    return res.status(201).json( {success: true , message: 'Chats retrieved from DB' , texts: texts})
    
    }
    catch{
        return res.status(404).json( {success: false , message: 'Chats retrieval from DB Failed' } )
    }
}


export const uploadFile = async (req: Request, res: Response) => {
    try{
        const user = req.user;
        const username: string = req.user.name;
        const name = `File-${new Date()}`
        const file = req.file;
        console.log('---------------- inside uploadFile function ------------');

        const url  = await upoloadToS3(file, name);
        console.log(url);

        const chat = await user.createText( {message: `File link - ${url}` , userName: username} )
        if(chat){
            return res.status(200).json({success: true});
        } else {
            return res.status(401).json({success: false, message: "Something went wrong"});
        }

    } catch(err){
        return res.status(500).json({success: false, message: "Cannot send file"});
    }
}

//should be now moved to services folder while optimising the app
const upoloadToS3 = ( file: string, name: string ) => {
	const s3 = new AWS.S3( {
		accessKeyId: process.env.IAM_USERID,
		secretAccessKey: process.env.IAM_SECRET,
	} );

    console.log('---------------- >>> inside S3 service ---- >>>>>>>>>>>>>>' , file.path)
    const fileStream = fs.createReadStream(file.path);

    console.log('---------------- >>> inside S3 service (2nd Time) ---- >>>>>>>>>>>>>>' , fileStream)

	const params: any = {
		Bucket: process.env.S3_BUCKET,
		Key: name,
		Body: fileStream,
		ACL: "public-read",
	};

	return new Promise( ( resolve, reject ) => {
		s3.upload( params, ( err: object, s3response: any ) => {
			if ( err ) {
				reject( err );
			}
            console.log(s3response);
			resolve( s3response.Location );
		} )
	} )
};