// CSS
import styles from "./Products.module.css";

// Components
import ToBack from "../../components/ToBack/ToBack";

// Router
import { Link } from "react-router-dom";

// Hooks
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import Loading from "../../components/Loading/Loading";

const Products = ({
  productSaveMessage,
  setProductSaveMessage,
  productDeleteMessage,
  setProductDeleteMessage,
  productCreateMessage,
  setProductCreateMessage,
}) => {
  const { documents } = useFetchCategory("categorys");
  const { documents: products, loading, error } = useFetchProducts("products");

  setTimeout(() => {
    if (productSaveMessage) {
      setProductSaveMessage(false);
    } else if (productDeleteMessage) {
      setProductDeleteMessage(false);
    } else if (productCreateMessage) {
      setProductCreateMessage(false);
    }
  }, 2000);

  return (
    <div className={styles.container_products}>
      <ToBack />
      <div className={styles.product_category}>
        <Link to="/products/create_product" className={styles.create_product}>
          <button className="btn">Criar produto</button>
        </Link>
        {documents &&
          documents.map((doc) => (
            <>
              <section className={styles.products}>
                <h3>{doc.nameCategory}</h3>
                <hr />
                {products &&
                  products.map((product) => (
                    <>
                      {product.idCategory === doc.id && (
                        <div className={styles.single_product}>
                          <h4>{product.nameProduct}</h4>
                          <p>{product.descriptionProduct}</p>
                          <div className={styles.container_buttons}>
                            <button type="button" className="btn">
                              Editar
                            </button>
                            <span>R$ {product.valueProduct}</span>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </section>
            </>
          ))}
      </div>
      {productSaveMessage && (
        <div className="message_loading">
          <div>
            <span>Produto salvo</span>
          </div>
        </div>
      )}
      {productDeleteMessage && (
        <div className="message_loading message_loading_error">
          <div>
            <span>Produto deletado</span>
          </div>
        </div>
      )}
      {productCreateMessage && (
        <div className="message_loading">
          <div>
            <span>Produto criado</span>
          </div>
        </div>
      )}
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
    </div>
  );
};

export default Products;
