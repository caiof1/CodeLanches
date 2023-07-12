// CSS
import styles from './Home.module.css'

// Router
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div>
      <section className={styles.container}>
        <div>
          <p>Clique no botão para criar pedidos</p>
          <Link to="/create_order" className='btn'>Fazer pedido</Link>
        </div>
        <div>
          <p>Aqui pode ver todos os pedidos</p>
          <Link to="/orders" className='btn'>Ver pedidos</Link>
        </div>
        <div>
          <p>Adicionar produtos ao cardápio</p>
          <Link to="/products" className='btn'>Produtos</Link>
        </div>
        <div>
          <p>Adicionar novas categorias</p>
          <Link to="/category" className='btn'>Categorias</Link>
        </div>
        <div>
          <p>Adicionar novos colaboradores</p>
          <Link to="/register" className='btn'>Colaboradores</Link>
        </div>
        <div>
          <p>Ver o dashboard</p>
          <Link to="/dashboard" className='btn'>Dashboard</Link>
        </div>
      </section>
    </div>
  )
}

export default Home