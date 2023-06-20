// Styles
import styles from "./Modal.module.css";

// Hooks
import { useDeleteOrder } from "../../hooks/useDeleteOrder";
import { useEffect, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

const Modal = ({ item, id, setCloseModal }) => {
  const { deleteOrder, error, acess } = useDeleteOrder("orders");
  const [closeMod, setCloseMod] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (acess) {
      navigate(-1);
    }
  }, [acess, navigate]);

  const closeModals = () => {
    setCloseMod(true);
    setTimeout(() => {
      setCloseModal(false);
    }, 400);
  };

  return (
    <div className={styles.container_modal + " " + (closeMod && styles.modal)}>
      <h2>
        Excluir <span>{item}</span> ?
      </h2>
      {error && <span className="error">{error}</span>}
      <section>
        <button className="btn btn_full_size" onClick={() => deleteOrder(id)}>
          Excluir
        </button>
        <button className="btn btn_full_size" onClick={closeModals}>
          Não excluir
        </button>
      </section>
    </div>
  );
};

export default Modal;
