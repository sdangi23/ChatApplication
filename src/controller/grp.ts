
import user  from "../models/user"
import msg from "../models/msg"
import groups from "../models/group"
import usergroup from "../models/usersgroup"

import { Request, Response} from "express";
import { Op } from "sequelize";


export const createGrp = async (req :Request, res: Response) => {
    try{
        const grpName = req.body.groupName;
        const isAdmin = req.body.isAdmin;
        const uId = req.body.uId;
        let existingGrp:any = await groups.findOne({ where: { grpName: grpName } })
        if(!existingGrp){
            await groups.create({
                grpName: grpName
              })
              existingGrp = await groups.findOne({ where: { grpName: grpName } })
        }
        const gId = existingGrp.grpId;

        await usergroup.create({
            isAdmin: isAdmin,
            GroupGrpId: gId,
            UserId: uId,
          })


        return res.status(201).json({success: true , message: 'User Added to group successfully'});
    }
    catch{ (e: any)=>{
        console.log(e);
        return res.status(404).json({success: false , message: 'Adding User to Group Failed, Try Again...'});
    }        
    }
}

export const getGrps = async (req :Request, res: Response) => {

    try{

    
    const uId = req.user.id;
    console.log('-------------------------' , uId);
    let memberGrpIds: any = [];
    const memberGrps:any = await usergroup.findAll({ where: { UserId: uId } })

    console.log('-------------------------' , memberGrps);

    for (let i = 0; i < memberGrps.length; i++) {
        memberGrpIds.push(memberGrps[i].GroupGrpId);
      }
    const memberOf = await groups.findAll({ where: { grpId: { [Op.or]: memberGrpIds } } })

    return res.status(201).json({success: true , message: 'groups for member fetched from db' , memberOf });

    }
    catch{
        return res.status(404).json({success: true , message: 'error while fetching groups from DB' });

    }

}

export const removeUser = async (req :Request, res: Response) => {
    const uId = req.body.uId;
    const grpId = req.body.grpId;
    const loggedId = req.user.id;

    try{
        const ug = await usergroup.findOne({ where: { UserId: loggedId, GroupGrpId: grpId } });
    if(ug.isAdmin == true){
        await usergroup.destroy({ where: { UserId: uId, GroupGrpId: grpId } });

        return res.json({success: true , message: 'User Deleted Successfully from Chat-Group'})
    }
    return res.json({success: false , message: 'You dont have admin access for the Chat-Group'})

    }catch{
        return res.status(404).json({success: false , message: 'database operation failed, try Again ...'});
    }
    
}