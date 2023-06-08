// CSS
import styles from './MakeAWish.module.css'

// Router
import { useNavigate } from 'react-router-dom'

// Components
import PopUpProducts from '../../components/PopUpProducts/PopUpProducts'
import ToBack from '../../components/ToBack/ToBack'

// Hooks
import { useEffect, useState } from 'react'
import { useInsertOrder } from '../../hooks/useInsertOrder'


const MakeAWish = () => {

    const [table, setTable] = useState('')
    const [instructions, setInstructions] = useState('')
    const [products, setProducts] = useState([])
    const [amount, setAmount] = useState(0)
    const [active, setActive] = useState(false)

    const {insertOrder, loading, error} = useInsertOrder('orders')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            table,
            instructions,
            products,
            amount
        }

        const create = insertOrder(data)

        if(create) {
            navigate('/')
        }
    }

    useEffect(() => {
        setAmount(0)
        if(products) {
            products.map((product) => {
                setAmount((actualAmount) => actualAmount + product.value)
                return null
            })
        }
    }, [products])

    console.log(amount)

    return (
        <form autoComplete='off' onSubmit={handleSubmit} className={styles.container_create}>
            <ToBack link={'/'} />
            <label className='label_input'>
                <input className='input_outline' required placeholder='< Mesa />' type="text" name="table" value={table} onChange={(e) => setTable(e.target.value)}/>
                <i class="fa-solid fa-chair icon"></i>
            </label>
            <label className='label_input'>
                <textarea className='input_outline' placeholder='< Instruções />' type="text" name="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
                <i class="fa-solid fa-receipt icon"></i>
            </label>
            <button type='button' onClick={() => setActive((actualActive) => !actualActive)} className='btn'>&lt; Adicionar Produto /&gt;</button>
            {active && <PopUpProducts setActive={setActive} setProducts={setProducts} setAmount={setAmount} />}
            <section className={styles.list_order}>
                {products && products.map((product) => (
                    <div className='text_outline'>
                        <span>{product.qtd} - {product.name}</span>
                        <span>X</span>
                    </div>
                ))}
                <div>
                    <span>Total:</span>
                    <span>R$ {amount}</span>
                </div>
            </section>
            {error && <span className='error'>{error}</span>}
            <button type='submit' className='btn'>
                {loading ? <span className='loading'></span> : '< Finalizar Pedido />'}
            </button>
        </form>
    )
}

export default MakeAWish