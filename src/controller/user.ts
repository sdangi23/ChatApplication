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

    const email: string = req.body.email;
    const password: string = req.body.password;
    await usertable.findAll({ where: {email: email} })
      .then( async (result) => {
        const savedpw = result[0].password!
        await bcrypt.compare(savedpw, password, async function (error, _response){
          if(error) {
            console.log('------------ in password compare block', error, '---------------------')
            return res.json({ success: false, message: 'Password you enterred doesnt match' })
          }else{
            const token: string = await generateToken(result[0].id!)
            return res.json({success:true, message: 'login Successful' , Accesstoken: token})
          }

        })
      })
      .catch((err) => {
        console.log(err)
        return res.sendStatus(400).json({ success: false, message:"User not Found"})
      });
    }