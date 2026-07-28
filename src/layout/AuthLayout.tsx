
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Logo from '../components/Logo'

const AuthLayout = () => {
  return (
    <>
      <div className="bg-[#0f1117] min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Logo />
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
};

export default AuthLayout