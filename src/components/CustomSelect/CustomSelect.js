// CSS
import styles from "./CustomSelect.module.css";

// Hooks
import { useEffect, useState } from "react";


const CustomSelect = ({ document, documents, setNewSelectNumber, placeholder }) => {

  const [selectActive, setSelectActive] = useState(false);
  const [selectValue, setSelectValue] = useState();

  const [noError, setNoError] = useState()

  useEffect(() => {
    setSelectValue(document)
    setNewSelectNumber(document)
  }, [document])


  const blurSelect = () => {
    setTimeout(() => {
      setSelectActive(false);
    }, 200);
  };

  const changeCategoryNumber = (doc) => {
    setSelectValue(doc)
    if(doc !== document.selectNumber) {
      setNewSelectNumber(doc)
    }
  }

  return (
    <>
      <label className={`label_input ${styles.select}`}>
        <input
          type="text"
          onFocus={() => setSelectActive(true)}
          onBlur={blurSelect}
          value={selectValue}
          onChange={(e) => setNoError(e.target.value)}
          placeholder={placeholder}
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
                  type="button"
                  key={doc}
                  onClick={() => changeCategoryNumber(doc)}
                >
                  {doc}
                </button>
              ))}
          </div>
        )}
      </label>
    </>
  );
};

export default CustomSelect;
