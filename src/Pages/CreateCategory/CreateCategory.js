// CSS
import styles from "./CreateCategory.module.css";

// Hooks
import { useEffect, useState } from "react";

// Components
import Loading from "../../components/Loading/Loading";
import ToBack from "../../components/ToBack/ToBack";
import { useInsertOrder } from "../../hooks/useInsertOrder";

// Router
import { useNavigate } from "react-router-dom";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";

const CreateCategory = ({setCategoryCreateMessage}) => {
  const [error, setError] = useState("");

  const [nameCategory, setNameCategory] = useState("");

  const {documents} = useFetchCategory('categorys');

  const {
    insertOrder,
    loading,
    error: insertError,
    acess,
  } = useInsertOrder("categorys");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nameCategory,
      selectNumber: documents.length
    };

    insertOrder(data);
  };

  useEffect(() => {
    if (acess) {

      setCategoryCreateMessage(true);
      navigate("/category");
    }
  }, [acess]);

  useEffect(() => {
    if (insertError) {
      setError(insertError);
    }
  }, [insertError]);

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container_category}
    >
      <ToBack />
      <label className="label_input">
        <input
          type="text"
          className="input_outline"
          placeholder="Nome da categoria"
          value={nameCategory}
          required
          onChange={(e) => setNameCategory(e.target.value)}
        />
        <i class="fa-solid fa-burger icon"></i>
      </label>
      <button
        className={`btn btn_full_size ${styles.save_category}`}
        type="submit"
      >
        Criar categoria
      </button>
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
      {error && <span className="error">{error}</span>}
    </form>
  );
};

export default CreateCategory;
