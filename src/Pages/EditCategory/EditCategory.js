// CSS
import styles from "./EditCategory.module.css";

// Hooks
import { useEffect, useState } from "react";
import { useFetchOrder } from "../../hooks/useFetchOrder";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { useFetchCategory } from "../../hooks/useFetchCategory";

// Components
import Loading from "../../components/Loading/Loading";
import ToBack from "../../components/ToBack/ToBack";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Modal from "../../components/Modal/Modal";

// Router
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = ({ setCategorySaveMessage, setCategoryDeleteMessage }) => {
  const { id } = useParams();

  const [error, setError] = useState("");

  const [nameCategory, setNameCategory] = useState("");
  const [newSelectNumber, setNewSelectNumber] = useState(-1);

  const navigate = useNavigate();

  const { document, error: fetchError } = useFetchOrder("categorys", id);
  const { documents } = useFetchCategory("categorys");

  const [numbersDocuments, setNumbersDocuments] = useState([])

  const {
    updateOrder,
    loading,
    error: updateError,
    acess,
  } = useUpdateOrder("categorys");

  const [text, setText] = useState("");
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    setNumbersDocuments([])
    documents.map((doc) => {
      setNumbersDocuments((actualNumbersDocuments) => [
        ...actualNumbersDocuments,
        doc.selectNumber
      ])
      return null
    })
  }, [documents])

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    } else if (updateError) {
      setError(updateError);
    }
  }, [fetchError, updateError]);

  useEffect(() => {
    setNameCategory(document.nameCategory);
    setNewSelectNumber(document.selectNumber);
  }, [document]);

  const deleteCategory = () => {
    setCloseModal(true);
    setText("Deseja excluir?");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (
      newSelectNumber === document.selectNumber &&
      nameCategory === document.nameCategory
    ) {
      setError("Altere alguma informação antes de salvar");
      return;
    }

    if (newSelectNumber !== document.selectNumber) {
      // changing selectNumber in database
      const selectNumberActual = document.selectNumber;
      const selectNumberNew = documents.filter(
        (element) => element.selectNumber === newSelectNumber
      );

      document.selectNumber = selectNumberNew[0].selectNumber;
      selectNumberNew[0].selectNumber = selectNumberActual;

      updateOrder(selectNumberNew[0].id, selectNumberNew[0]);
    }

    // changing nameCategory in database
    document.nameCategory = nameCategory;

    updateOrder(id, document);
  };

  useEffect(() => {
    if (acess) {
      setCategorySaveMessage(true);
      navigate("/category");
    }
  }, [acess]);

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
          onChange={(e) => setNameCategory(e.target.value)}
        />
        <i class="fa-solid fa-burger icon"></i>
      </label>
      <CustomSelect
        document={document.selectNumber}
        documents={numbersDocuments}
        setNewSelectNumber={setNewSelectNumber}
        placeholder={"Selecione a ordem dessa categoria"}
      />
      <button
        className={`btn btn_full_size ${styles.save_category}`}
        type="submit"
      >
        &lt; Salvar categoria /&gt;
      </button>
      <button
        className={`btn btn_full_size ${styles.delete_category}`}
        onClick={deleteCategory}
        type="button"
      >
        &lt; Excluir categoria /&gt;
      </button>
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
      {closeModal && (
        <Modal
          text={text}
          id={id}
          document={document}
          setCloseModal={setCloseModal}
          docCollection={"categorys"}
          setCategoryDeleteMessage={setCategoryDeleteMessage}
        />
      )}
      {error && <span className="error">{error}</span>}
    </form>
  );
};

export default EditCategory;
