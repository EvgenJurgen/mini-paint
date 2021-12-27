import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, firestore } from '../configs/firebase.config'


export const useSignUp = (email:string, password:string) =>{
    return createUserWithEmailAndPassword(auth, email, password)
}

export const useLogIn = (email:string, password:string) =>{
    return signInWithEmailAndPassword(auth, email,password)
}

export const useLogOut = () =>{
    return signOut(auth)
}

export const useAddDoc = (collectionName:string, payload:any) =>{
    const collectionRef = collection(firestore, collectionName)
    addDoc(collectionRef, payload)
}