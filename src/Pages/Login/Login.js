// CSS
import styles from './Login.module.css'

// Images
import logo from '../../images/LogoCode.png'

// Hooks
import { useLoginAuth } from '../../hooks/useLoginAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        
    return (
        <form onSubmit={handleSubmit} autoComplete='off' className={styles.container_login}>
            <div>
                <img src={logo} alt="Logo Code Hamburgueria" width={139}  />
            </div>
            {/* login inputs */}
            <div className={styles.input_login}>
                <label className='label_input'>
                    <input className='input_outline' required placeholder='< E-mail />' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <i class="fa-solid fa-envelope icon"></i>
                </label>
                <label className='label_input'>
                    <input className='input_outline' required placeholder='< Senha />' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <i class="fa-solid fa-lock icon"></i>
                </label>
                {error && <span className='error'>{error}</span>}
                <button type='submit' className='btn'>
                    {loading ? <span className='loading'></span> : '< Entrar />'}
                </button>
            </div>
        </form>
    )
}

export default Login