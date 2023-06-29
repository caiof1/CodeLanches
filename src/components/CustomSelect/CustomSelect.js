// CSS
import styles from "./CustomSelect.module.css";

// Hooks
import { useEffect, useState } from "react";
import { useFetchOrder } from "../../hooks/useFetchOrder";
import { useFetchCategory } from "../../hooks/useFetchCategory";

// Router
import { useParams } from "react-router-dom";

const CustomSelect = ({setICanSave}) => {
  const { id } = useParams();

  const [selectActive, setSelectActive] = useState(false);
  const [selectValue, setSelectValue] = useState();

  const [errorSelect, setErrorSelect] = useState(false);

  const { document } = useFetchOrder("categorys", id);

  const { documents } = useFetchCategory("categorys");

  useEffect(() => {
    setSelectValue(document.selectNumber);
  }, [document]);

  const blurSelect = () => {
    setTimeout(() => {
      setSelectActive(false);
    }, 200);
  };

  const changeSelect = (e) => {
    setSelectValue(e.target.value);

    // Verify if number exist in database
    if (
      documents.find(
        (element) => element.selectNumber === parseInt(e.target.value)
      ) !== undefined
    ) {
      setErrorSelect(false);
      setICanSave(true)
    } else {
      setErrorSelect(true);
      setICanSave(false)
    }
  };

  return (
    <>
      {errorSelect && (
        <span className={styles.alert}>
          Ordene corretamente a sua categoria
        </span>
      )}
      <label className={`label_input ${styles.select}`}>
        <input
          type="number"
          onFocus={() => setSelectActive(true)}
          onBlur={blurSelect}
          value={selectValue}
          onChange={changeSelect}
          placeholder="Selecione a ordem dessa categoria"
          className="input_outline"
        />
        <i class="fa-solid fa-list icon"></i>
        <i
          class={`fa-solid fa-angle-down ${styles.icon} ${
            selectActive ? styles.icon_reverse : ""
          }`}
        ></i>
        {selectActive && (
          <div className={styles.options}>
            {documents &&
              documents.map((doc) => (
                <button
                  key={doc.selectNumber}
                  onClick={() => setSelectValue(doc.selectNumber)}
                >
                  {doc.selectNumber}
                </button>
              ))}
          </div>
        )}
      </label>
    </>
  );
};

export default CustomSelect;
