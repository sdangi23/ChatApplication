
import { Request, Response} from "express";
import msgtable from "../models/msg";
import {Op} from "sequelize";

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
        console.log('-----------------------------Inside Controller-----------------------');
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