import usertable from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import {Request, Response} from "express";


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