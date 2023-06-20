// Hooks
import { useState, useEffect } from "react";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";

// CSS
import styles from "./ModalUpdate.module.css";

// Router
import { useNavigate } from "react-router-dom";

const ModalUpdate = ({ text, status, id, document, setCloseModalUpdate }) => {
  const [closeMod, setCloseMod] = useState(false);
  const { updateOrder, error, acess } = useUpdateOrder("orders");

  const navigate = useNavigate()

  const updateOrders = () => {
    document.status = status;

    updateOrder(id, document);
  };

  useEffect(() => {
    if (acess) {
      navigate(-1);
    }
  }, [acess, navigate]);

  const closeModals = () => {
    setCloseMod(true);
    setTimeout(() => {
      setCloseModalUpdate(false);
    }, 400);
  };
  return (
    <div className={styles.container_modal + " " + (closeMod && styles.modal)}>
      <h2>{text}</h2>
      {error && <span className="error">{error}</span>}
      <section>
        <button className="btn btn_full_size" onClick={updateOrders}>
          Sim
        </button>
        <button className="btn btn_full_size" onClick={closeModals}>Não</button>
      </section>
    </div>
  );
};

export default ModalUpdate;
