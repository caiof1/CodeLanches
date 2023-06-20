// CSS
import styles from "./DetailOrder.module.css";

// Components
import ToBack from "../../components/ToBack/ToBack";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";

// Router
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import { useFetchOrder } from "../../hooks/useFetchOrder";
import { useState } from "react";
import { useAudioTouch } from "../../hooks/useAudioTouch";
import ModalUpdate from "../../components/ModalUpdate/ModalUpdate";

const DetailOrder = () => {
  const { id } = useParams();

  const { document, loading, error } = useFetchOrder("orders", id);

  const [status, setStatus] = useState();
  const [text, setText] = useState("");

  const [closeModal, setCloseModal] = useState(false);

  const [closeModalUpdate, setCloseModalUpdate] = useState(false);

  const navigate = useNavigate();

  useAudioTouch();

  const readyOrder = () => {
    setCloseModalUpdate(true);
    setStatus(1);
    setText("Pedido já está pronto?");
  };

  const endOrder = () => {
    setCloseModalUpdate(true);
    setStatus(2);
    setText("Fechar conta?");
  };

  return (
    <div className={styles.container_order}>
      <ToBack />
      <label className="label_input">
        <input
          type="text"
          className="input_outline"
          disabled
          value={"Mesa " + document.table}
        />
        <i className="fa-solid fa-chair icon"></i>
      </label>
      <label className="label_input">
        <textarea
          disabled
          className="input_outline"
          value={
            document && document.instructions !== ""
              ? document.instructions
              : "Nenhuma instrução por parte da mesa..."
          }
        ></textarea>
        <i className="fa-solid fa-receipt icon"></i>
      </label>
      <span className={styles.order}>&lt; Pedido /&gt;</span>
      <section className={styles.list_order}>
        {document &&
          document.products?.map((product) => (
            <div className="text_outline">
              <span>
                {product.qtd} - {product.name}
              </span>
              <span>R$ {product.value}</span>
            </div>
          ))}
      </section>
      <div className={styles.amount}>
        <span>Total:</span>
        <span>R$ {document.amount}</span>
      </div>
      <div className={styles.buttons}>
        {document && document.status !== 2 && (
          <button
            onClick={() => navigate(`/orders/edit_order/${id}`)}
            className="btn btn_full_size"
          >
            &lt; Editar pedido /&gt;
          </button>
        )}
        {document && document.status === 0 && (
          <button className="btn btn_full_size" onClick={readyOrder}>
            &lt; Pedido pronto /&gt;
          </button>
        )}
        {document && document.status === 1 && (
          <button className="btn btn_full_size" onClick={endOrder}>
            &lt; Fechar Conta /&gt;
          </button>
        )}
        {document && document.status === 2 && (
          <div className={styles.finaly_order}>
            <span>Pedido Finalizado</span>
          </div>
        )}
        {document && document.status !== 2 && (
          <button
            className="btn btn_full_size"
            onClick={() => setCloseModal(true)}
          >
            &lt; Cancelar pedido /&gt;
          </button>
        )}
      </div>
      {loading && (
        <span className="loading">
          {" "}
          <Loading />{" "}
        </span>
      )}
      {closeModal && (
        <Modal
          item={"Mesa " + document.table}
          id={id}
          setCloseModal={setCloseModal}
        />
      )}

      {closeModalUpdate && (
        <ModalUpdate
          text={text}
          status={status}
          id={id}
          document={document}
          setCloseModalUpdate={setCloseModalUpdate}
        />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default DetailOrder;
