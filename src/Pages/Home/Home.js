import styles from './Home.module.css'

const Home = () => {

  return (
    <div>
      <section className={styles.container}>
        <div>
          <p>Clique no botão para criar pedidos</p>
          <button className='btn'>Fazer pedido</button>
        </div>
        <div>
          <p>Aqui pode ver todos os pedidos</p>
          <button className='btn'>Ver pedidos</button>
        </div>
        <div>
          <p>Adicionar produtos ao cardápio</p>
          <button className='btn'>Produtos</button>
        </div>
        <div>
          <p>Adicionar novas categorias</p>
          <button className='btn'>Categorias</button>
        </div>
        <div>
          <p>Adicionar novos colaboradores</p>
          <button className='btn'>Colaboradores</button>
        </div>
        <div>
          <p>Ver o dashboard</p>
          <button className='btn'>Dashboard</button>
        </div>
      </section>
    </div>
  )
}

export default Home