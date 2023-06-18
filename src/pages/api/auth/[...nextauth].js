import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkUser } from "@/services/user";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "NextAuthCredentials",
            credentials: {},
            async authorize(credentials) {
                const {email, senha} = credentials
                console.log(email, senha)

                const user = await checkUser(email, senha)

                if(!user){
                    throw new Error("E-mail ou senha incorretos")
                }
                console.log("dentro do nextAuth")
                console.log(user)
                return user
            }
        })
    ],
    pages: {
        signIn: "/"
    }, 
    secret: process.env.SECRET
})