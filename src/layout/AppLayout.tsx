import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import SocketProvider from "../socket/SocketProvider";
import "react-toastify/dist/ReactToastify.css";
import SideBarMenu from "../components/sidebar/SideBarMenu";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

const AppLayout = () => {
  const { data: user, isError, isLoading, isFetching } = useAuth();

  if (isLoading) return <div className="w-full h-dvh bg-[#0f1117]">Cargando...</div>;
  if (isError) return <Navigate to="/" />;
  if (!user && !isFetching) return <Navigate to="/" />; 
  if (!user) return <div className="w-full h-dvh bg-[#0f1117]">Cargando...</div>;

  if (user)
    return (
      <SocketProvider user={user}>
        <div className="min-h-screen bg-bg text-text-primary">
          <SideBarMenu />
          <div className="flex flex-col min-h-screen pl-20 lg:pl-64 transition-[padding] duration-200">
            <main className="flex-1 max-w-screen-2xl w-full mx-auto py-5">
              <Breadcrumbs />
              <Outlet />
            </main>

            <footer className="border-t border-border-subtle py-5">
              <p className="text-center text-xs text-text-muted">
                Todos los derechos reservados © {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </div>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          toastClassName={() =>
            "cursor-pointer relative bg-surface-elevated border border-border text-text-primary text-sm font-medium rounded-xl shadow-lifted flex items-center gap-3 p-4 mb-2 overflow-hidden"
          }
          closeOnClick={true}
        />
      </SocketProvider>
    );
};

export default AppLayout;
