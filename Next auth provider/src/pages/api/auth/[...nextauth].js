import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { getByEmail,verifyPass } from "@/services/users";
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    session:{
        jwt:true
    },
    providers:[
        CredentialsProvider({
            async authorize({email,password}){
                const user = getByEmail(email);
                if (!user){
                    throw new Error("User not found");
                }
                const isValid = await verifyPass(password,user.password);
                if (!isValid){
                    throw new Error("Incorrect password");
                }
                return(email)
            }
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID ??"",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET ??"",
        })
    ]
}
export default NextAuth(authOptions);