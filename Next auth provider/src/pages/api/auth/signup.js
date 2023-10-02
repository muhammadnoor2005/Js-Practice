import {save} from "@/services/users";

export default function handler(req,res){
    if (req.method !== "POST"){
        res.status(404).send();
    }
    const {email,password} = req.body;
    try{
        save(email,password);
        res.staus(201).send();
    }
    catch(err){
        res.status(400).json({message:err});
    }
}
  