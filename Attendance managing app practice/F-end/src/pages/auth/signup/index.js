import SignupForm from "@/component/SignupForm/SignupForm";
import { parse } from "cookie";

export default function(){
    return(
        <div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <SignupForm/>
            </div>
        </div>
    )
}
export async function getServerSideProps({req}){
    const cookies = req.headers.cookie || '';
    const parsedCookie = parse(cookies);
    
    if(parsedCookie.token){
        return{
            redirect:{
                destination:"/home",
                permanent:false,
            }
        };
    }; 
    return{
        props:{}
    };
};