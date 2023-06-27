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
                const {username, senha} = credentials
                console.log(username, senha)
                let user
                const userFirebase = await checkUser(username, senha)

                if(!userFirebase){
                    throw new Error("Usuário ou senha incorretos")
                }
                
                await fetch(`http://localhost:8080/user/username?username=${userFirebase.username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(async (res) => {
                    return await res.json()
                }).then((json) => {
                    console.log(json)
                    user = {
                        id: json.id,
                        name: json.username
                    }
                })
                .catch((err) => console.log(err))
                return user
            }
        })
    ],
    pages: {
        signIn: "/"
    }, 
    secret: process.env.SECRET
})