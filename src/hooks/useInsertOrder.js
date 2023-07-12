import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const useInsertOrder = (docCollection) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acess, setAcess] = useState(false);

  const insertOrder = async (data) => {
    setLoading(true);
    try {
      const newOrder = { ...data, createAt: Timestamp.now() };
      await addDoc(collection(db, docCollection), newOrder);
      setAcess(true);
    } catch (error) {
      setError("Tivemos um problema ao tentar criar o pedido");
    }
    setLoading(false);
  };

  return { insertOrder, loading, error, acess };
};
