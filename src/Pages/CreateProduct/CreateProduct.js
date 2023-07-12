import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import ToBack from "../../components/ToBack/ToBack";
import styles from "./CreateProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useInsertOrder } from "../../hooks/useInsertOrder";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { useFetchProducts } from "../../hooks/useFetchProducts";

const CreateProduct = ({ setProductCreateMessage }) => {
  const [error, setError] = useState("");

  const [nameProduct, setNameProduct] = useState("");
  const [valueProduct, setValueProduct] = useState();
  const [descriptionProduct, setDescriptionProduct] = useState();

  const { documents } = useFetchCategory("categorys");

  const [nameDocuments, setNameDocuments] = useState([]);

  const [newSelectNumber, setNewSelectNumber] = useState();

  const { documents: allUsers } = useFetchProducts("users");

  const { updateOrder } = useUpdateOrder("users");

  const {
    insertOrder,
    loading,
    error: insertError,
    acess,
  } = useInsertOrder("products");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = documents.find(
      (element) => element.nameCategory === newSelectNumber
    );

    const data = {
      nameProduct,
      valueProduct,
      descriptionProduct,
      idCategory: category.id,
    };

    insertOrder(data);
  };

  useEffect(() => {
    setNameDocuments([]);
    documents.map((doc) => {
      setNameDocuments((actualNameDocuments) => [
        ...actualNameDocuments,
        doc.nameCategory,
      ]);
      return null;
    });
  }, [documents]);

  useEffect(() => {
    if (acess) {
      allUsers.map((user) => {
        user.salesProducts?.push({
          nameProduct,
          qtdSales: 0,
          valueSales: 0,
        });

        updateOrder(user.id, user);

        return null;
      });

      setProductCreateMessage(true);
      navigate("/products");
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
      className={styles.container_products}
    >
      <ToBack />
      <label className="label_input">
        <input
          type="text"
          className="input_outline"
          placeholder="Nome do produto"
          value={nameProduct}
          required
          onChange={(e) => setNameProduct(e.target.value)}
        />
        <i class="fa-solid fa-burger icon"></i>
      </label>
      <label className="label_input">
        <input
          type="number"
          className="input_outline"
          placeholder="Valor do produto"
          value={valueProduct}
          required
          onChange={(e) => setValueProduct(e.target.value)}
        />
        <i class="fa-solid fa-sack-dollar icon"></i>
      </label>
      <CustomSelect
        document={nameDocuments[0]}
        documents={nameDocuments}
        setNewSelectNumber={setNewSelectNumber}
        placeholder={"Qual a categoria desse produto?"}
      />
      <label className="label_input">
        <textarea
          className="input_outline"
          placeholder="Descrição do produto"
          value={descriptionProduct}
          required
          onChange={(e) => setDescriptionProduct(e.target.value)}
        ></textarea>
        <i className="fa-solid fa-receipt icon"></i>
      </label>
      <button
        className={`btn btn_full_size ${styles.save_products}`}
        type="submit"
      >
        Criar produto
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

export default CreateProduct;
