import { Link, Navigate, Outlet } from "react-router";
import Logo from "../components/Logo";
import NavMenu from "../components/NavMenu";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import NotificationCenter from "../components/NotificationCenter";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  const { data: user, isError, isLoading, error } = useAuth();
  const queryClient = useQueryClient();

useEffect(() => {
    if (user?._id) {
      socket.emit("join_user", user._id);

      socket.on("connect", () => {
            socket.emit("join_user", user._id)
        })
    }
    return () => {
        socket.off("connect")
    }
  }, [user]);

  useEffect(() => {

    socket.on("new_notification", () => {    
      queryClient.invalidateQueries({queryKey: ["notifications"]});
    });

    socket.on("project_updated_notification", (message) => {
      toast.info(message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    });

    socket.on("receive_project_deleted", (data) => {
      toast.info(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    });

    socket.on("member_added_notification", (data) => {
      toast.info(data.message)
      queryClient.invalidateQueries({ queryKey: ['projects']})
    })

    socket.on("member_removed_notification", (data) => {   
      toast.info(data.message)
      queryClient.invalidateQueries({ queryKey: ['projects']})
    });

    socket.on("taskCreatedMessage", (data) => {
      toast.info(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", data.project._id] });
    })

    socket.on("task_status_updated_notification", (data) => {
      toast.info(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", data.projectID] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] }); // ✅ agrega esto
    });

    socket.on("taskDeletedMessage", (data) => {
      toast.info(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", data.project._id] });
    });

    socket.on("taskUpdatedMessage", (data) => {
      toast.info(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", data.project._id] });
    });

    

    return () => {
      socket.off("new_notification") 
      socket.off("member_added_notification")
      socket.off("task_status_updated_notification");
      socket.off("receive_project_deleted");
      socket.off("member_removed_notification")
      socket.off("taskCreatedMessage")
      socket.off("taskDeletedMessage")
      socket.off("taskUpdatedMessage")
      socket.off("project_updated_notification")
    };
  }, [queryClient]);

  if (isLoading) return "Cargando...";
console.log(error)
  if (isError) {
    return <Navigate to="/" />;
  }

  if (user)
    return (
      <div className="min-h-screen bg-[#151921] flex flex-col">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="bg-[#1e2330] border-b border-[#2d3348] sticky top-0 z-20 shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
          <div className="max-w-screen-2xl mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="w-52">
              <Link to={"/dashboard"} className="cursor-pointer">
                <Logo />
              </Link>
            </div>

            <NavMenu name={user.name} />
          </div>

          <NotificationCenter />
          
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
    );
};

export default AppLayout;
