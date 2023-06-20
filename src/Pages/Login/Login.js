// CSS
import styles from './Login.module.css'

// Images
import logo from '../../images/LogoCode.png'

// Hooks
import { useLoginAuth } from '../../hooks/useLoginAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import Loading from '../../components/Loading/Loading'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordOcult, setPasswordOcult] = useState(false)
    const [isPassword, setIsPassword] = useState('password')
    const navigate = useNavigate()

    const {login, loading, error, acess} = useLoginAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }

        login(data)

        if(acess) {
            navigate('/')
        }

    }

    const ocultPassword = () => {
        setPasswordOcult((actualPasswordOcult) => !actualPasswordOcult)
    }

    useEffect(() => {
        if(passwordOcult) {
            setIsPassword('text')
        } else {
            setIsPassword('password')
        }
    }, [ocultPassword])
        
    return (
        <form onSubmit={handleSubmit} autoComplete='off' className={styles.container_login}>
            <div>
                <img src={logo} alt="Logo Code Hamburgueria" width={139}  />
            </div>
            {/* login inputs */}
            <div className={styles.input_login}>
                <label className='label_input'>
                    <input className='input_outline' required placeholder='< E-mail />' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <i className="fa-solid fa-envelope icon"></i>
                </label>
                <label className='label_input'>
                    <input className='input_outline' required placeholder='< Senha />' type={isPassword} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <i className="fa-solid fa-lock icon"></i>
                    {passwordOcult ? (
                        <i className={'fa-solid fa-eye ' + styles.eye_icon} onClick={ocultPassword}></i>
                    ) : (
                        <i className={'fa-solid fa-eye-slash ' + styles.eye_icon} onClick={ocultPassword}></i>
                    )}
                </label>
                {error && <span className='error'>{error}</span>}
                {loading && <span> <Loading /> </span>}
                <button type='submit' className='btn'>&lt; Entrar /&gt;</button>
            </div>
        </form>
    )
}

export default Login