import usertable from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

import {Request, Response} from "express";

function generateToken(id:string){
  return jwt.sign(id,process.env.JWT_SECRET!)
}

export async function signUp(req: Request, res: Response) {

    const name: string = req.body.name;
    const email: string = req.body.email;
    const phone: string = req.body.phone;
    const password: string = req.body.password;
    const hashpassword: string = await bcrypt.hash(password, 10);
    var existinguser = undefined;
    await usertable.findAll({ where: { name: name, email: email } })
      .then((result) => {
        if (result[0]) {
          existinguser = result[0];
        }
      })
      .catch((err) => console.log(err));
    if (existinguser == undefined) {
      usertable.create({
        name: name,
        email: email,
        phone: phone,
        password: hashpassword, 
      })
      .then((result) => {
          res.json({ message: "User Successfully Registered" , result});
      })
      .catch((err) => console.log(err));
    }
    else{
      res.json({ message: "User already exists please login" });
    }
  }


  export async function logIn(req: Request, res: Response) {

    try{
      const email: string = req.body.email;
      const inppw: string = req.body.password;
      const foundUser = await usertable.findOne({ where: {email: email} })
      if(!foundUser){ 
        return res.status(400).json({ success: false, message:"User not Found"})         
      }
        //console.log(foundUser , '-----------------------USER FOUND---------------------------')
        const savedpw = foundUser.password
        const comparison = await bcrypt.compare(inppw , savedpw)
        if(!comparison) {
              //console.log('------------ in password comparison gave falsy result block---------------------')
              return res.status(200).json({ success: false, message: 'Invalid Password, Try Again ...' })
        } 
        const token: string = generateToken(foundUser.id)
        res.status(202).json({success:true, message: 'login Successful' , Accesstoken: token, user: foundUser})
        return;
        
    }
    catch{
      res.status(404).json( {success: false , message: 'Something went wrong, try again'} )
      return 
    }

}

export async function getUsers(_req: Request, res: Response) {
  try{
    const dbusers = await usertable.findAll();
    res.json( {success: true , message:'All users fetched' , dbusers} );
  }
  catch{
    res.json( {success: false , message: 'Database fetching failed' })
  }
}