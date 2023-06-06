// Hooks
import { useState } from "react"

// Firebase
import {db} from '../firebase/config'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const useLoginAuth = () => {

    const auth = getAuth()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [acess, setAcess] = useState(false)

    const login = async (data) => {
        setLoading(true)
        setError('')
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setAcess(true)
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado';
            } else if(error.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta.';
            } else {
                systemErrorMessage = 'Ocorreu um erro';
            }

            setError(systemErrorMessage)
            setAcess(false)
        }
        setLoading(false)
    }

    return {login, loading, error, acess}

}