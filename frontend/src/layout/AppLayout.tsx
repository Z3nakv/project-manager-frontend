import { Link, Navigate, Outlet } from "react-router";
import Logo from "../components/Logo";
import NavMenu from "../components/NavMenu";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import NotificationCenter from "../components/NotificationCenter";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "../socket/SocketProvider";

const AppLayout = () => {
  const { data: user, isError, isLoading } = useAuth();
  
  if (isLoading) return "Cargando...";

  if (isError) {
    return <Navigate to="/" />;
  }

  if (user)
    return (
  <SocketProvider user={user}>
      <div className="min-h-screen bg-[#151921] flex flex-col">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="bg-[#1e2330] border-b border-[#2d3348] sticky top-0 z-20 shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
          <div className="relative max-w-screen-2xl mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="w-52">
              <Link to={"/dashboard"} className="cursor-pointer">
                <Logo />
              </Link>
              <NotificationCenter />
            </div>

            <NavMenu name={user.name} />
          </div>

        </header>

        {/* ── Main content ───────────────────────────────────── */}
        <main className="flex-1 max-w-screen-2xl w-full mx-auto px-6 py-10">
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
