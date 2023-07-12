// CSS
import styles from "./PopUpProducts.module.css";

// Hook
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useFetchCategory } from "../../hooks/useFetchCategory";

const PopUpProducts = ({ setActive, setProducts }) => {
  const { documents, loading, error } = useFetchProducts("products");
  const { documents: categorys } = useFetchCategory("categorys");

  const handleAddProduct = (doc) => {
    const product = {
      qtd: document.getElementById(doc.id).value,
      ...doc,
      value: parseFloat(doc.valueProduct) * document.getElementById(doc.id).value
    };

    setProducts((actualProducts) => [...actualProducts, product]);
  };

  const handleAddCont = (id) => {
    const inputCont = document.getElementById(id)

    inputCont.value = parseInt(inputCont.value) + 1;
  }

  const handleLessCont = (id) => {
    const inputCont = document.getElementById(id)

    if(inputCont.value > 1) {
      inputCont.value = parseInt(inputCont.value) - 1;
    }
  }

  return (
    <div className={styles.container_products}>
      <span
        className={styles.close}
        onClick={() => setActive((actualActive) => !actualActive)}
      >
        X
      </span>
      {categorys &&
        categorys.map((category) => (
          <section className={styles.products}>
            <h3>{category.nameCategory}</h3>
            <hr />
            {documents &&
              documents.map((doc) => (
                <>
                  {doc.idCategory === category.id && (
                    <div key={doc.id} className={styles.single_product}>
                      <h4>{doc.nameProduct}</h4>
                      <p>{doc.descriptionProduct}</p>
                      <div className={styles.container_buttons}>
                        <button
                          type="button"
                          onClick={() => handleAddProduct(doc)}
                          className="btn"
                        >
                          Adicionar
                        </button>
                        <div>
                          <button
                            type="button"
                            id="less"
                            className={styles.button_less}
                            onClick={() => handleLessCont(doc.id)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            disabled
                            value="1"
                            name=""
                            id={doc.id}
                          />
                          <button type="button" id="more" onClick={() => handleAddCont(doc.id)} className={styles.button_more}>
                            +
                          </button>
                          <span>R$ {doc.valueProduct}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
          </section>
        ))}
    </div>
  );
};

export default PopUpProducts;
