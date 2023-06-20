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
import { useUpdateOrder } from '../../hooks/useUpdateOrder'
import { useFetchOrder } from '../../hooks/useFetchOrder'


const MakeAWish = () => {

    const idControl = 'ZZ4lKQ0pbvoQl52OmeBv'

    const [table, setTable] = useState('')
    const [instructions, setInstructions] = useState('')
    const [products, setProducts] = useState([])
    const [amount, setAmount] = useState(0)
    const [active, setActive] = useState(false)

    const {insertOrder, loading, error} = useInsertOrder('orders')
    const {document} = useFetchOrder('control', idControl)

    const {updateOrder} = useUpdateOrder('control')

    console.log(document)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            table,
            instructions,
            products,
            amount,
            status: 0
        }

        const create = insertOrder(data)

        document.acessAudio = true

        updateOrder(idControl, document)

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

    return (
        <form autoComplete='off' onSubmit={handleSubmit} className={styles.container_create}>
            <ToBack />
            <label className='label_input'>
                <input className='input_outline' required placeholder='< Mesa />' type="text" name="table" value={table} onChange={(e) => setTable(e.target.value)}/>
                <i className="fa-solid fa-chair icon"></i>
            </label>
            <label className='label_input'>
                <textarea className='input_outline' placeholder='< Instruções />' type="text" name="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
                <i className="fa-solid fa-receipt icon"></i>
            </label>
            <button type='button' onClick={() => setActive((actualActive) => !actualActive)} className='btn btn_full_size'>&lt; Adicionar Produto /&gt;</button>
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
            <button type='submit' className='btn btn_full_size'>
                {loading ? <span className='loading'></span> : '< Finalizar Pedido />'}
            </button>
        </form>
    )
}

export default MakeAWish