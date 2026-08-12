import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import SocketProvider from "../socket/SocketProvider";
import "react-toastify/dist/ReactToastify.css";
import SideBarMenu from "../components/sidebar/SideBarMenu";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

const AppLayout = () => {
  const { data: user, isError, isLoading, isFetching } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/" />;
  if (!user && !isFetching) return <Navigate to="/" />; // sin usuario Y sin fetch en curso
  if (!user) return "Cargando..."; // sin usuario pero todavía resolviendo, no rebotes aún
  
  if (user)
    return (
      <SocketProvider user={user}>
        
        <div className="min-h-screen bg-[#151921] flex ">
          <SideBarMenu />
          <div className="flex-1 flex flex-col min-w-0">

            

            <main className="flex-1 max-w-screen-2xl w-full mx-auto pl-6 py-5">
              <Breadcrumbs />
              <Outlet />
            </main>

            {/* ── Footer ─────────────────────────────────────────── */}
            <footer className="border-t border-[#2d3348] py-5">
              <p className="text-center text-xs text-slate-600">
                Todos los derechos reservados © {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </div>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          toastClassName={() =>
            "cursor-pointer relative bg-[#1e2330] border border-[#2d3348] text-slate-200 text-sm font-medium rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-3 p-4 mb-2 overflow-hidden"
          }
          closeOnClick={true}
        />
      </SocketProvider>
    );
};

export default AppLayout;
