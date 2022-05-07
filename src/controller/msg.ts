
import { Request, Response} from "express";

const saveMsg = async(req: Request, res: Response) => {
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

export default saveMsg;