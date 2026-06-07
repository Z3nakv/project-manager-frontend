import { Link } from "react-router"

const NotFound = () => {
  return (
    <>
        <h1 className="font-black text-center text-4xl text-white">Pagina No Encontrada</h1>
        <p className="mt-10 text-center text-white">
            Talvez quieras volver a {' '}
            <Link
            className='text-fuchsia-500'
            to={'/'}>
                Proyectos
            </Link>
        </p>
    </>
  )
}

export default NotFound