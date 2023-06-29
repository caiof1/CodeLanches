// CSS
import styles from "./Orders.module.css";

// Components
import ToBack from "../../components/ToBack/ToBack";
import Loading from "../../components/Loading/Loading";

// Router
import { Link } from "react-router-dom";

// Hooks
import { useFetchOrders } from "../../hooks/useFetchOrders";
import { useEffect, useState } from "react";
import { useAudioTouch } from "../../hooks/useAudioTouch";

const Orders = () => {
  const [search, setSearch] = useState("");

  const [widthInput, setWidthInput] = useState(false);

  const { documents, loading, error } = useFetchOrders("orders");

  const [searchDocuments, setSearchDocuments] = useState([]);

  useAudioTouch();

  const isFocus = (state) => {
    setWidthInput(state);
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    setSearchDocuments([]);
    setSearchDocuments((actualSearchDocuments) => [
      ...actualSearchDocuments,
      documents.filter((element) => element.table.includes(e.target.value)),
    ]);
  };

  useEffect(() => {
    setSearchDocuments([]);
    setSearchDocuments((actualSearchDocuments) => [
      ...actualSearchDocuments,
      documents,
    ]);
  }, [documents]);

  return (
    <div className={styles.container_orders}>
      <ToBack />
      <form
        autoComplete="off"
        className={
          widthInput ? "input_exib" : search ? "input_exib" : "input_ocult"
        }
      >
        <input
          type="number"
          className={styles.input_outline}
          placeholder="Procure por alguma mesa"
          name="search"
          value={search}
          onChange={searchChange}
          onFocus={() => isFocus(true)}
          onBlur={() => isFocus(false)}
        />
        <i className={"fa-solid fa-magnifying-glass " + styles.icon}></i>
      </form>

      {/* Order on hold */}
      <div className={styles.div_order}>
        <span className={styles.order}>&lt; Em espera /&gt;</span>
      </div>
      {documents &&
        searchDocuments[0]?.map((doc) => (
          <>
            {doc !== false && doc.status === 0 && (
              <div key={doc.id} className="text_outline">
                <span>Mesa {doc.table}</span>
                <Link to={`/orders/detail_order/${doc.id}`}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </div>
            )}
          </>
        ))}
      {documents &&
        searchDocuments[0]?.filter((element) => element.status === 0).length ===
          0 && (
          <section className="noposts">
            <span>Sem pedido em Espera</span>
          </section>
        )}
      {/* Order preparing */}
      <div className={styles.div_order2}>
        <span className={styles.order}>&lt; Preparando pedido /&gt;</span>
      </div>
      {documents &&
        searchDocuments[0]?.map((doc) => (
          <>
            {doc !== false && doc.status === 1 && (
              <div key={doc.id} className="text_outline">
                <span>Mesa {doc.table}</span>
                <Link to={`/orders/detail_order/${doc.id}`}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </div>
            )}
          </>
        ))}
      {documents &&
        searchDocuments[0]?.filter((element) => element.status === 1).length ===
          0 && (
          <section className="noposts">
            <span>Sem pedido Preparado</span>
          </section>
        )}
      {/* Order Ready */}
      <div className={styles.div_order3}>
        <span className={styles.order}>&lt; Pedido pronto /&gt;</span>
      </div>
      {documents &&
        searchDocuments[0]?.map((doc) => (
          <>
            {doc !== false && doc.status === 2 && (
              <div key={doc.id} className="text_outline">
                <span>Mesa {doc.table}</span>
                <Link to={`/orders/detail_order/${doc.id}`}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </div>
            )}
          </>
        ))}
      {documents &&
        searchDocuments[0]?.filter((element) => element.status === 2).length ===
          0 && (
          <section className="noposts">
            <span>Sem pedido Preparado</span>
          </section>
        )}
      {/* Order End */}
      <div className={styles.div_order4}>
        <span className={styles.order}>&lt; Conta fechada /&gt;</span>
      </div>
      {documents &&
        searchDocuments[0]?.map((doc) => (
          <>
            {doc !== false && doc.status === 3 && (
              <div key={doc.id} className="text_outline">
                <span>Mesa {doc.table}</span>
                <Link to={`/orders/detail_order/${doc.id}`}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </div>
            )}
          </>
        ))}
      {documents &&
        searchDocuments[0]?.filter((element) => element.status === 3).length ===
          0 && (
          <section className="noposts">
            <span>Sem pedido Finalizado</span>
          </section>
        )}
      {loading && (
        <span>
          {" "}
          <Loading />{" "}
        </span>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Orders;
