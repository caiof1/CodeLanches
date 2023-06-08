// Router
import { Link } from 'react-router-dom'

// CSS
import styles from './ToBack.module.css'

const ToBack = ({link}) => {

    return (
        <div className={styles.container_back}>
            <Link to={link}>
                <div className={styles.line_top}></div>
                <div className={styles.line_bottom}></div>
            </Link>        
        </div>
    )
}

export default ToBack