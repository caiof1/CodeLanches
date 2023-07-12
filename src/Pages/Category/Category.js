// CSS
import styles from "./Category.module.css";

// Components
import ToBack from "../../components/ToBack/ToBack";
import Loading from "../../components/Loading/Loading";

// Router
import { Link, useNavigate } from "react-router-dom";

// Hook
import { useFetchCategory } from "../../hooks/useFetchCategory";

const Category = ({
  categorySaveMessage,
  setCategorySaveMessage,
  categoryDeleteMessage,
  setCategoryDeleteMessage,
  categoryCreateMessage,
  setCategoryCreateMessage
}) => {
  const { documents, loading, error } = useFetchCategory("categorys");
  const navigate = useNavigate()

  setTimeout(() => {
    if (categorySaveMessage) {
      setCategorySaveMessage(false);
    } else if (categoryDeleteMessage) {
      setCategoryDeleteMessage(false);
    } else if (categoryCreateMessage) {
      setCategoryCreateMessage(false);
    }
  }, 2000);

  return (
    <div className={styles.container_category}>
      <ToBack />
      <section className={styles.category}>
        {/* Button create new category */}
        <div>
          <Link to="/category/create_category">
            <button className="btn">Criar categoria</button>
          </Link>
        </div>
        {/* All category */}
        {documents &&
          documents.map((doc) => (
            <div onClick={() => navigate(`/category/edit_category/${doc.id}`)} className={`text_outline ${styles.all_category}`}>
              <div>
                <span>{doc.nameCategory}</span>
              </div>
            </div>
          ))}
      </section>
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
      {documents?.length === 0 && (
        <section className="noposts">
          <span>Sem pedido Preparado</span>
        </section>
      )}
      {/* Message de sucess */}
      {categorySaveMessage && (
        <div className="message_loading">
          <div>
            <span>Categoria salva</span>
          </div>
        </div>
      )}
      {categoryDeleteMessage && (
        <div className="message_loading message_loading_error">
          <div>
            <span>Categoria deletada</span>
          </div>
        </div>
      )}
      {categoryCreateMessage && (
        <div className="message_loading">
          <div>
            <span>Categoria criada</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
