import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"

export async function getUserByEmail(email){
    const userQuery = query(collection(db, "usuario"), where("email", "==", email))

    const userSnapshot = await getDocs(userQuery)
    let user
    userSnapshot.forEach((doc) => {
        user = doc.data()
    })
    if(user){
        user.aluno = await (await getDoc(user.aluno)).data()
        console.log(user)
    }
    return user ? user : ""
}

export async function checkUser(email, senha){
    senha = hashPassword(senha)
    const userQuery = query(collection(db, "usuario"), where("email", "==", email), where("senha", "==", senha))

    const userSnapshot = await getDocs(userQuery)
    let user
    userSnapshot.forEach((doc) => {
        user = doc.data()
    })
    console.log("dentro do checkUser")
    console.log(user)

    return user
}

export async function createUser(user){
    user.aluno = doc(db, `aluno/${user.aluno.id}`)
    user.senha = hashPassword(user.senha)
    const userRef = await addDoc(collection(db, "usuario"), user)
    const userSnap = await getDoc(userRef)
    const usuarioCriado = userSnap.data()
    return usuarioCriado 
}

function hashPassword(senha){
    const { createHash } = require('crypto')
    senha = createHash('sha256').update(senha).digest('hex')

    return senha
}