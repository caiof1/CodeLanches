// CSS
import styles from "./Collaborator.module.css";

// Router
import { useNavigate } from "react-router-dom";

// Components
import Loading from "../../components/Loading/Loading";
import ToBack from "../../components/ToBack/ToBack";

// Hooks
import { useEffect, useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

const Collaborator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordOcult, setPasswordOcult] = useState(false);
  const [isPassword, setIsPassword] = useState("password");
  const [error, setError] = useState("");
  const [newSelectNumber, setNewSelectNumber] = useState()
  const navigate = useNavigate();

  const { register, loading, error: registerError, acess } = useRegister();

  const ocultPassword = () => {
    setPasswordOcult((actualPasswordOcult) => !actualPasswordOcult);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Utilize a mesma senha nos dois campos");
      return;
    }

    const data = {
      name,
      email,
      password,
    };

    register(data);
  };

  useEffect(() => {
    if (acess) {
      navigate("/");
    }
  }, [acess]);

  useEffect(() => {
    if (registerError) {
      setError(registerError);
    }
  }, [registerError]);

  useEffect(() => {
    if (passwordOcult) {
      setIsPassword("text");
    } else {
      setIsPassword("password");
    }
  }, [ocultPassword]);

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles.container_register}
    >
      <ToBack />
      {/* login inputs */}
      <div className={styles.input_register}>
        <label className="label_input">
          <input
            className="input_outline"
            required
            placeholder="Nome"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i className="fa-solid fa-user icon"></i>
        </label>
        <CustomSelect
          document={'Admin'}
          documents={['Admin', 'Garçom', 'Cozinheiro']}
          setNewSelectNumber={setNewSelectNumber}
          placeholder={"Nivel do colaborador"}
        />
        <label className="label_input">
          <input
            className="input_outline"
            required
            placeholder="E-mail"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="fa-solid fa-envelope icon"></i>
        </label>
        <label className="label_input">
          <input
            className="input_outline"
            required
            placeholder="Senha"
            type={isPassword}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fa-solid fa-lock icon"></i>
          {passwordOcult ? (
            <i
              className={"fa-solid fa-eye " + styles.eye_icon}
              onClick={ocultPassword}
            ></i>
          ) : (
            <i
              className={"fa-solid fa-eye-slash " + styles.eye_icon}
              onClick={ocultPassword}
            ></i>
          )}
        </label>
        <label className="label_input">
          <input
            className="input_outline"
            required
            placeholder="Confirme a senha"
            type={isPassword}
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i className="fa-solid fa-lock icon"></i>
          {passwordOcult ? (
            <i
              className={"fa-solid fa-eye " + styles.eye_icon}
              onClick={ocultPassword}
            ></i>
          ) : (
            <i
              className={"fa-solid fa-eye-slash " + styles.eye_icon}
              onClick={ocultPassword}
            ></i>
          )}
        </label>
        {error && <span className="error">{error}</span>}
        {loading && (
          <span>
            {" "}
            <Loading />{" "}
          </span>
        )}
        <button type="submit" className="btn">
          Entrar
        </button>
      </div>
    </form>
  );
};

export default Collaborator;
