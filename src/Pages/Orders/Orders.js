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
import { useSeparateOrders } from "../../hooks/useSeparateOrders";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [searchDocuments, setSearchDocuments] = useState([]);

  // separate orders
  const [onHold, setOnHold] = useState([]);
  const [preparing, setPreparing] = useState([]);
  const [ready, setReady] = useState([]);
  const [end, setEnd] = useState([]);

  const [widthInput, setWidthInput] = useState(false);

  const { documents, loading, error } = useFetchOrders("orders");

  useAudioTouch();

  useSeparateOrders(
    documents,
    setOnHold,
    setPreparing,
    setReady,
    setEnd,
    search
  );

  console.log(onHold, preparing, ready, end);

  const isFocus = (state) => {
    setWidthInput(state);
  };

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
        onHold?.map((doc) => (
          <div key={doc.id} className="text_outline">
            <span>Mesa {doc.table}</span>
            <Link to={`/orders/detail_order/${doc.id}`}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
        ))}
      {onHold && onHold.length === 0 && (
        <section className="noposts">
          <span>Sem pedido em espera</span>
        </section>
      )}
      {/* Order preparing */}
      <div className={styles.div_order}>
        <span className={styles.order}>&lt; Preparando pedido /&gt;</span>
      </div>
      {documents &&
        preparing?.map((doc) => (
          <div key={doc.id} className="text_outline">
            <span>Mesa {doc.table}</span>
            <Link to={`/orders/detail_order/${doc.id}`}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
        ))}
      {preparing && preparing.length === 0 && (
        <section className="noposts">
          <span>Sem pedido em preparo</span>
        </section>
      )}
      {/* Order Ready */}
      <div className={styles.div_order}>
        <span className={styles.order}>&lt; Pedido pronto /&gt;</span>
      </div>
      {documents &&
        ready?.map((doc) => (
          <div key={doc.id} className="text_outline">
            <span>Mesa {doc.table}</span>
            <Link to={`/orders/detail_order/${doc.id}`}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
        ))}
      {ready && ready.length === 0 && (
        <section className="noposts">
          <span>Sem pedido pronto</span>
        </section>
      )}
      {/* Order End */}
      <div className={styles.div_order}>
        <span className={styles.order}>&lt; Conta fechada /&gt;</span>
      </div>
      {documents &&
        end?.map((doc) => (
          <div key={doc.id} className="text_outline">
            <span>Mesa {doc.table}</span>
            <Link to={`/orders/detail_order/${doc.id}`}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
        ))}
      {end && end.length === 0 && (
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
