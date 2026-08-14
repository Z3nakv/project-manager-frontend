import { Link } from "react-router"

const NotFound = () => {
  return (
    <>
        <h1 className="font-black text-center text-4xl text-text-primary">Pagina No Encontrada</h1>
        <p className="mt-10 text-center text-text-secondary">
            Talvez quieras volver a {' '}
            <Link
            className='text-fuchsia-500'
            to={'/dashboard'}>
                Proyectos
            </Link>
        </p>
    </>
  )
}

export default NotFound