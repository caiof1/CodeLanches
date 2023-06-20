// Hooks
import { useEffect, useState } from "react"

// Firebase
import {doc, getDoc} from 'firebase/firestore'
import { db } from "../firebase/config"

export const useFetchOrder = (docCollection, id) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [document, setDocument] = useState([])
    const [cancelled, setCancelled] = useState(false)
    
    useEffect(() => {
        if(cancelled) return

        const fetchOrder = async () => {
            setLoading(true)            
            try {
                const res = await getDoc(doc(db, docCollection, id))

                setDocument(res.data())
            } catch (error) {
                setError('Tivemos um problema ao puxar o pedido')
            }
            setLoading(false)
        }

        fetchOrder()
    }, [docCollection])


    useEffect(() => {
        return () => setCancelled(true)
    }, [])


    return {document, loading, error}
}