// CSS
import styles from "./MakeAWish.module.css";

// Router
import { useNavigate } from "react-router-dom";

// Components
import PopUpProducts from "../../components/PopUpProducts/PopUpProducts";
import ToBack from "../../components/ToBack/ToBack";

// Hooks
import { useEffect, useState } from "react";
import { useInsertOrder } from "../../hooks/useInsertOrder";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { useFetchOrder } from "../../hooks/useFetchOrder";
import { useFetchUser } from "../../hooks/useFetchUser";

const MakeAWish = ({user}) => {
  const idControl = "ZZ4lKQ0pbvoQl52OmeBv";

  const [table, setTable] = useState("");
  const [instructions, setInstructions] = useState("");
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(0);

  const [active, setActive] = useState(false);

  const { insertOrder, loading, error } = useInsertOrder("orders");
  const { document } = useFetchOrder("control", idControl);

  const {documents} = useFetchUser(user.uid, 'users')

  const { updateOrder } = useUpdateOrder("control");

  const {updateOrder: updateUser} = useUpdateOrder('users');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let userDoc = documents[0];

    products.map((product) => {

      for(let i = 0; i < userDoc.salesProducts?.length; i++) {

        if(userDoc.salesProducts[i].nameProduct === product.nameProduct) {
          userDoc.salesProducts[i].qtdSales += parseInt(product.qtd)
          userDoc.salesProducts[i].valueSales += product.value

          updateUser(userDoc.id, userDoc)
        }

      }

      return null
    }) 

    const data = {
      table,
      instructions,
      products,
      amount,
      status: 0,
      uidCollaborator: user.uid
    };

    const create = insertOrder(data);

    document.acessAudio = true;

    updateOrder(idControl, document);

    if (create) {
      navigate("/");
    }
  };

  const handleRemoveProduct = (product) => {
    setProducts((actualProduct) =>
      actualProduct.filter((element) => element !== product)
    );
  };

  useEffect(() => {
    setAmount(0);
    if (products) {
      products.map((product) => {
        setAmount((actualAmount) => actualAmount + product.value);
        return null;
      });
    }
  }, [products]);

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
          placeholder="Mesa"
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
          placeholder="Instruções"
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
        Adicionar Produto
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
                {product.qtd} - {product.nameProduct}
              </span>
              <span
                className={styles.remove_product}
                onClick={() => handleRemoveProduct(product)}
              >
                <i class="fa-solid fa-trash"></i>
              </span>
            </div>
          ))}
        <div>
          <span>Total:</span>
          <span>R$ {amount}</span>
        </div>
      </section>
      {error && <span className="error">{error}</span>}
      <button type="submit" className="btn btn_full_size">
        {loading ? <span className="loading"></span> : "Finalizar Pedido"}
      </button>
    </form>
  );
};

export default MakeAWish;
