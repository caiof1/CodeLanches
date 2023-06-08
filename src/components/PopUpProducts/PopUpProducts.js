import styles from './PopUpProducts.module.css'

const PopUpProducts = ({setActive, setProducts, setAmount}) => {

    const handleAddProduct = () => {
        const product = {
            name: 'X-tudo',
            qtd: 2,
            value: 20.00
        }

        setProducts((actualProducts) => [
            ...actualProducts,
            product
        ])
    }

    return (
        <div className={styles.container_products}>
            <span className={styles.close} onClick={() => setActive((actualActive) => !actualActive)}>X</span>
            <section className={styles.products}>
                <h3>Hamburgueria</h3>
                <hr />
                <div className={styles.single_product}>
                    <h4>X-Tudo</h4>
                    <p>O X-tudo acompanha: Carne de 120g, queijo cheedar, mussarela, cebola roxa, alface, tomate, molho verde caseiro, molho rosa caseiro.</p>
                    <div className={styles.container_buttons}>
                        <button type='button' onClick={handleAddProduct} className='btn'>Adicionar</button>
                        <div>
                            <button type='button'>-</button>
                            <input type="number" disabled value="1" name="" id="" />
                            <button type='button'>+</button>
                        </div>
                        <span>R$ 20,00</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PopUpProducts