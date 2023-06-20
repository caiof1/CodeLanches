// Router
import { Link } from 'react-router-dom'

// CSS
import styles from './ToBack.module.css'

const ToBack = () => {

    return (
        <div className={styles.container_back}>
            <Link to={-1}>
               <i class="fa-solid fa-chevron-left"></i>
            </Link>        
        </div>
    )
}

export default ToBack