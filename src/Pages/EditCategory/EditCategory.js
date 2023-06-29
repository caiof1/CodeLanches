// CSS
import styles from "./EditCategory.module.css";

// Hooks
import { useEffect, useState } from "react";
import { useFetchOrder } from "../../hooks/useFetchOrder";

// Components
import Loading from "../../components/Loading/Loading";
import ToBack from "../../components/ToBack/ToBack";
import ModalUpdate from "../../components/ModalUpdate/ModalUpdate";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

// Router
import { useParams } from "react-router-dom";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { useFetchCategory } from "../../hooks/useFetchCategory";

const EditCategory = () => {
  const { id } = useParams();

  const [error, setError] = useState("");

  const {
    document,
    error: fetchError,
  } = useFetchOrder("categorys", id);

  const {documents} = useFetchCategory('categorys')

  const {
    updateDoc,
    loading,
    error: updateError,
  } = useUpdateOrder("categorys");

  const [text, setText] = useState("");
  const [closeModalUpdate, setCloseModalUpdate] = useState(false);

  const [iCanSave, setICanSave] = useState(true);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    } else if (updateError) {
      setError(updateError);
    }
  }, [fetchError, updateError]);

  const deleteCategory = () => {
    setCloseModalUpdate(true);
    setText("Deseja excluir?");
  };

  const saveCategory = () => {
    setError("");
    if (iCanSave) {

    } else {
      setError("Preencha corretamente todos os campos!");
    }
  };

  return (
    <div className={styles.container_category}>
      <ToBack />
      <label className="label_input">
        <input
          type="text"
          className="input_outline"
          value={document.nameCategory}
        />
        <i class="fa-solid fa-burger icon"></i>
      </label>
      <CustomSelect setICanSave={setICanSave} />
      <button
        className={`btn btn_full_size ${styles.save_category}`}
        onClick={saveCategory}
      >
        &lt; Salvar categoria /&gt;
      </button>
      <button
        className={`btn btn_full_size ${styles.delete_category}`}
        onClick={deleteCategory}
      >
        &lt; Excluir categoria /&gt;
      </button>
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
      {closeModalUpdate && (
        <ModalUpdate
          text={text}
          id={id}
          document={document}
          setCloseModalUpdate={setCloseModalUpdate}
        />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default EditCategory;
