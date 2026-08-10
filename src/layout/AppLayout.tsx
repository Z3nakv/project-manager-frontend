import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import SocketProvider from "../socket/SocketProvider";
import "react-toastify/dist/ReactToastify.css";
import SideBarMenu from "../components/sidebar/SideBarMenu";

const AppLayout = () => {

  const { data: user, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError || !user) return <Navigate to="/" />;
  
  if (user) return (

  <SocketProvider user={user}>

    <SideBarMenu />

      <div className="ml-10 min-h-screen bg-[#151921] flex flex-col">
        
        
       {/* <header className="bg-[#1e2330] ml-10 border-b border-[#2d3348] sticky top-0 z-20 shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
       <div className="relative max-w-screen-2xl mx-auto px-6 py-4 flex  justify-between items-center">
            <SearchBar />
          </div>  
         </header>  */}
        

        {/* ── Main content ───────────────────────────────────── */}
        <main className="flex-1 max-w-screen-2xl w-full mx-auto px-6 py-5">
          <Outlet />
        </main>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="border-t border-[#2d3348] py-5">
          <p className="text-center text-xs text-slate-600">
            Todos los derechos reservados © {new Date().getFullYear()}
          </p>
        </footer>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          toastClassName={() =>
            "cursor-pointer relative bg-[#1e2330] border border-[#2d3348] text-slate-200 text-sm font-medium rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-3 p-4 mb-2 overflow-hidden"
          }
          closeOnClick={true}
        />
      </div>
      </SocketProvider>
    );
};

export default AppLayout;
