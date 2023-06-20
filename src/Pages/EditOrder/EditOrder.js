// CSS
import styles from "./EditOrder.module.css";

// Router
import { useNavigate, useParams } from "react-router-dom";

// Components
import PopUpProducts from "../../components/PopUpProducts/PopUpProducts";
import ToBack from "../../components/ToBack/ToBack";
import Loading from "../../components/Loading/Loading";

// Hooks
import { useEffect, useState } from "react";
import { useFetchOrder } from "../../hooks/useFetchOrder";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { useAudioTouch } from "../../hooks/useAudioTouch";

const EditOrder = () => {
  const [table, setTable] = useState("");
  const [instructions, setInstructions] = useState("");
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(0);
  const [active, setActive] = useState(false);

  const [error, setError] = useState("");

  const { id } = useParams();

  const { document } = useFetchOrder("orders", id);

  const {
    updateOrder,
    loading,
    error: updateError,
    acess,
  } = useUpdateOrder("orders");

  useAudioTouch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      document.table !== table ||
      document.instructions !== instructions ||
      document.products !== products ||
      document.amount !== amount
    ) {
      document.table = table;
      document.instructions = instructions;
      document.products = products;
      document.amount = amount;
      updateOrder(id, document);
    } else {
      setError("Altere algo para salvar");
    }
  };

  useEffect(() => {
    if (acess) {
      navigate(-1);
    }
  }, [acess, navigate]);

  useEffect(() => {
    setTable(document.table);
    setInstructions(document.instructions);
    setProducts(document.products);
    setAmount(document.amount);
  }, [document]);

  useEffect(() => {
    setAmount(0);
    if (products) {
      products.map((product) => {
        setAmount((actualAmount) => actualAmount + product.value);
        return null;
      });
    }
  }, [products]);

  useEffect(() => {
    if (updateError) {
      setError(updateError);
    }
  }, [updateError]);

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container_create}
    >
      <ToBack />
      <label className="label_input">
        <input
          className="input_outline"
          required
          placeholder="< Mesa />"
          type="text"
          name="table"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
        <i className="fa-solid fa-chair icon"></i>
      </label>
      <label className="label_input">
        <textarea
          className="input_outline"
          placeholder="< Instruções />"
          type="text"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <i className="fa-solid fa-receipt icon"></i>
      </label>
      <button
        type="button"
        onClick={() => setActive((actualActive) => !actualActive)}
        className="btn btn_full_size"
      >
        &lt; Adicionar Produto /&gt;
      </button>
      {active && (
        <PopUpProducts
          setActive={setActive}
          setProducts={setProducts}
          setAmount={setAmount}
        />
      )}
      <section className={styles.list_order}>
        {products &&
          products.map((product) => (
            <div className="text_outline">
              <span>
                {product.qtd} - {product.name}
              </span>
              <span>X</span>
            </div>
          ))}
      </section>
      <div className={styles.amount}>
        <span>Total:</span>
        <span>R$ {amount}</span>
      </div>
      {error && <span className="error">{error}</span>}
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
      <button type="submit" className="btn btn_full_size">
        &lt; Salvar pedido /&gt;
      </button>
    </form>
  );
};

export default EditOrder;
