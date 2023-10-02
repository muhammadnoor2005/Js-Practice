import fs from "fs";
import path from "path"
import { hash,compare} from "bcrypt";

const filePath = path.join(process.cwd(),"src","data","users.json");
export function getAll(){
    const data = fs.readFileSync(filePath);
    return(JSON.parse(data));
}
export function getByEmail(email){
    const data = getAll();
    return data.find(p=>p.email === email);
}
export async function save(email,password){
    const found = getByEmail(email);
    if(found){
        throw new Error("User already exists");
    };
    const data = getAll();
    const hashedPass = await hash(password,12);
    data.push({
        email,
        id:data.length + 1,
        password:hashedPass,
    })
    fs.writeFileSync(filePath,JSON.parse(data));
}
export async function verifyPass(password,hashedpass){
    const isValid = await compare(password,hashedpass);
    return isValid
}