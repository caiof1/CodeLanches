// CSS
import styles from "./Category.module.css";

// Components
import ToBack from "../../components/ToBack/ToBack";

// Router
import { Link } from "react-router-dom";

// Hook
import { useFetchCategory } from "../../hooks/useFetchCategory";

const Category = () => {
  const { documents, loading, error } = useFetchCategory("categorys");

  console.log(documents)

  return (
    <div className={styles.container_category}>
      <ToBack />
      <section className={styles.category}>
        {/* Button create new category */}
        <div>
          <Link to="/">
            <button className="btn">&lt; Criar categoria /&gt;</button>
          </Link>
        </div>
        {/* All category */}
        {documents &&
          documents.map((doc) => (
            <div className={`text_outline ${styles.all_category}`}>
              <div>
                <span>{doc.nameCategory}</span>
              </div>
              <div>
                <Link to={`/category/edit_category/${doc.id}`}>Ver</Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Category;
