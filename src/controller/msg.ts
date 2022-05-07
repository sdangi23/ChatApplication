
import { Request, Response} from "express";
import msgtable from "../models/msg";

export const saveMsg = async(req: Request, res: Response) => {
    try{
    const user = req.user;
    const message: string = req.body.message;
    const username: string = req.user.name;

    await user.createText( {message: message , userName: username} )

    
        res.status(201).json({success: true , message: 'Text Saved to DB'})
    }
    catch{
    
        res.status(400).json( {success: false, message: 'Database Operation Failed Try Again'});
    }

}

export const getMsg = async (_req:Request, res: Response) => {
    try{
        console.log('-----------------------------Inside Controller-----------------------');
        const texts = await msgtable.findAll();
        res.status(201).json( {success: true , message: 'Chats retrieved from DB' , texts: texts})
        return;
    }
    catch{
        res.status(404).json( {success: false , message: 'Chats retrieval from DB Failed' } )
    }
}