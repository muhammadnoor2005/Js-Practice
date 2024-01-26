import LoginForm from "@/component/LoginForm/LoginForm";
import { parse } from "cookie";

export default function(){
    return(
        <div>
            <LoginForm/>
        </div>
    )
}
export async function getServerSideProps({req}){
    const cookies = req.headers.cookie || '';
    // console.log(cookies);
    const parsedCookie = parse(cookies);
    // console.log(parsedCookie.token)
  
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