// CSS
import styles from './Header.module.css'

// Images
import logo from '../../images/LogoCode.png'

// Hooks
import { useLogout } from '../../hooks/useLogout'

const Header = () => {

    const logout = useLogout()

    return (
        <div className={styles.container_header}>
            <img src={logo} alt="Logo code Hamburgueria" width={70} />
            <span onClick={logout}>
                <i class="fa-solid fa-right-from-bracket"></i>
            </span>
        </div>
    )
}

export default Header