// Firebase
import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Hooks
import { useState } from "react";
import {useInsertOrder} from '../hooks/useInsertOrder'

export const useRegister = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [acess, setAcess] = useState(false);

  const {insertOrder: insertUser} = useInsertOrder('users')

  const auth = getAuth();

  const register = async (data) => {
    setLoading(true);
    try {

      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.name,
      });

      const infoUser = {
        uid: user.uid,
        name: data.name,
        email: user.email,
      }

      insertUser(infoUser)

      setAcess(true)
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("EMAIL_EXISTS")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  return { register, loading, error, acess };
};
