// Hooks
import { useState } from "react";

// Firebase
import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

export const useDeleteOrder = (docCollection) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, docCollection, id));
      setAcess(true);
    } catch (error) {
      setError("Tivemos um erro ao excluir o pedido");
      console.log(error.message);
    }
    setLoading(false);
  };

  return { deleteOrder, loading, error, acess };
};
