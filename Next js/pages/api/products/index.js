import {getAll} from "@/services/products";
import {save} from "@/services/products"

export default function handler(req,res){
    if (req.method === "GET"){
        const products = getAll();
        return(res.status(200).json(products));
    };
    if (req.method === "POST"){
        const {title,description,price} = req.body;
        save(title,description,price);
        return res.status(201).json({});
    };
    return res.status(404).send();
};

  