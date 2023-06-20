// CSS
import styles from './Loading.module.css'

// Hooks
import { useState } from 'react' 

const Loading = () => {

    const [active, setActive] = useState(false)

    setInterval(() => {

        setActive((actualActive) => !actualActive)

        return null
        
    }, 5000);

    return (
        <div className={styles.container_loading}>
            <div className={active ? styles.container_max : styles.container_min}>
                <span className={styles.burguer_1}>
                    <i className="fa-solid fa-burger"></i>
                </span>
                <span className={styles.burguer_2}>
                    <i className="fa-solid fa-burger"></i>
                </span>
                <span className={styles.burguer_3}>
                    <i className="fa-solid fa-burger"></i>
                </span>
                <span className={styles.burguer_4}>
                    <i className="fa-solid fa-burger"></i>
                </span>
                <span className={styles.burguer_5}>
                    <i className="fa-solid fa-burger"></i>
                </span>
            </div>
        </div>
    )
}

export default Loading