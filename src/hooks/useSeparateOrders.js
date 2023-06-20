import { useEffect } from "react"

export const useSeparateOrders = (documents, setOnHold, setPreparing, setReady, setEnd, search) => {
    useEffect(() => {
        documents.map((doc) => {

            if(search) {
                
            } else {
                if(doc.status === 0) {
                    setOnHold([])
                    setOnHold((actualOnHold) => [
                        ...actualOnHold,
                        doc
                    ])
                } else if(doc.status === 1) {
                    setPreparing([])
                    setPreparing((actualPreparing) => [
                        ...actualPreparing,
                        doc
                    ])
                } else if(doc.status === 2) {
                    setReady([])
                    setReady((actualReady) => [
                        ...actualReady,
                        doc
                    ])
                } else if(doc.status === 3) {
                    setEnd([])
                    setEnd((actualEnd) => [
                        ...actualEnd,
                        doc
                    ])
                }
            }

            return null
        })
    }, [documents, search])
}