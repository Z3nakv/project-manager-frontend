import { Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LandingView = () => {

  const { data: user, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-200">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-[#1e2330] sticky top-0 bg-[#0a0e17]/90 backdrop-blur-md z-50">
        <Link 
        to={'/dashboard'}
        className="cursor-pointer flex items-center gap-2.5 font-bold text-lg text-white"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm">⬡</div>
          Project <span className="text-indigo-400">Manager</span>
        </Link>
        <Link
          to="/auth/register"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Comenzar gratis
        </Link>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          ✦ Gestión de proyectos en tiempo real
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
          Organiza tu equipo.<br />
          <span className="text-indigo-400">Entrega a tiempo.</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-8">
          Un tablero Kanban colaborativo con notificaciones en tiempo real, roles de equipo y seguimiento de tareas — todo en un solo lugar.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/auth/register"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"
          >
            + Crear proyecto gratis
          </Link>
          <Link
            to="/auth/login"
            className="border border-[#2d3348] hover:border-indigo-500/50 text-slate-400 hover:text-indigo-300 font-semibold px-7 py-3 rounded-xl transition-colors"
          >
            Iniciar sesión →
          </Link>
        </div>
      </section>

      {/* Board Preview */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-[#111827] border border-[#1e2330] rounded-2xl p-6 overflow-x-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">ecommerce ADIDAS — Sprint actual</span>
          </div>
          <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
            {[
              { label: 'Pendiente', color: '#6366f1', tasks: [{ name: 'Diseño de login', meta: 'Límite: 15 jun', badge: 'Vence pronto', badgeColor: 'text-red-400 bg-red-500/10' }, { name: 'API de productos', meta: 'Límite: 20 jun', badge: 'A tiempo', badgeColor: 'text-emerald-400 bg-emerald-500/10' }] },
              { label: 'En progreso', color: '#f59e0b', tasks: [{ name: 'Checkout flow', meta: 'Asignado a: Ana', badge: 'En progreso', badgeColor: 'text-amber-400 bg-amber-500/10' }] },
              { label: 'En revisión', color: '#0ea5e9', tasks: [{ name: 'Diseño responsive', meta: 'Esperando aprobación', badge: '', badgeColor: '' }] },
              { label: 'Completado', color: '#10b981', tasks: [{ name: 'Setup inicial', meta: 'Hace 2 días', badge: '✓ Listo', badgeColor: 'text-emerald-400 bg-emerald-500/10' }] },
            ].map(col => (
              <div key={col.label} className="w-48 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                  <span className="text-xs font-semibold text-slate-400">{col.label}</span>
                  <span className="text-xs text-slate-600 ml-auto">{col.tasks.length}</span>
                </div>
                <div className="h-0.5 rounded-full mb-3" style={{ background: col.color }} />
                {col.tasks.map(task => (
                  <div key={task.name} className="bg-[#1e2330] border border-[#2d3348] rounded-xl p-3 mb-2">
                    <p className="text-xs font-semibold text-slate-200 mb-1">{task.name}</p>
                    <p className="text-[10px] text-slate-500">{task.meta}</p>
                    {task.badge && (
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-2 uppercase tracking-wide ${task.badgeColor}`}>
                        {task.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Funcionalidades</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-3">Todo lo que tu equipo necesita</h2>
        <p className="text-slate-500 mb-10 max-w-lg">Construido para equipos que trabajan rápido y necesitan visibilidad total del proyecto.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '⬡', color: 'bg-indigo-500/10', title: 'Tablero Kanban', desc: 'Arrastra tareas entre columnas con drag & drop. Visualiza el flujo de trabajo.' },
            { icon: '⚡', color: 'bg-amber-500/10', title: 'Tiempo real', desc: 'Los cambios se reflejan al instante para todos los miembros via Socket.io.' },
            { icon: '👥', color: 'bg-emerald-500/10', title: 'Roles de equipo', desc: 'Managers y colaboradores con permisos diferenciados por proyecto.' },
            { icon: '🔔', color: 'bg-sky-500/10', title: 'Notificaciones', desc: 'Historial de actividad persistente. Entérate de cada cambio.' },
            { icon: '📅', color: 'bg-red-500/10', title: 'Fechas límite', desc: 'Asigna deadlines y recibe alertas visuales cuando una tarea vence.' },
            { icon: '📝', color: 'bg-purple-500/10', title: 'Notas en tareas', desc: 'Agrega contexto directamente en cada tarea con historial de cambios.' },
          ].map(f => (
            <div key={f.title} className="bg-[#111827] border border-[#1e2330] hover:border-indigo-500/30 rounded-2xl p-6 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center text-lg mb-4`}>{f.icon}</div>
              <h3 className="text-sm font-bold text-slate-100 mb-1.5">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Realtime section */}
      <section className="bg-[#0d1117] border-y border-[#1e2330] px-6 py-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">En tiempo real</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">Tu equipo siempre sincronizado</h2>
            <p className="text-slate-500 leading-relaxed">Cuando alguien mueve una tarea, todos lo ven al instante. Sin recargar, sin perder contexto.</p>
          </div>
          <div className="flex-1 w-full space-y-3">
            {[
              { initials: 'AR', color: 'bg-indigo-500/20 text-indigo-300', text: 'Adrian movió "Checkout flow" a En revisión', time: 'ahora', unread: true },
              { initials: 'JM', color: 'bg-emerald-500/20 text-emerald-300', text: 'Jorge completó "Tests unitarios"', time: '2m', unread: true },
              { initials: 'LP', color: 'bg-amber-500/20 text-amber-300', text: 'Laura agregó una nota en "API de productos"', time: '5m', unread: false },
              { initials: 'CM', color: 'bg-red-500/20 text-red-300', text: 'Carlos creó la tarea "Deploy a producción"', time: '12m', unread: false },
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#1e2330] border border-[#2d3348] rounded-xl px-4 py-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${n.color}`}>{n.initials}</div>
                <p className="text-xs text-slate-400 flex-1 leading-snug">{n.text}</p>
                <span className="text-xs text-slate-600 shrink-0">{n.time}</span>
                {n.unread && <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Empieza a gestionar<br />proyectos hoy
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Sin tarjeta de crédito. Sin límites en proyectos. Solo tú y tu equipo trabajando mejor.</p>
        <Link
          to="/auth/register"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20 text-base"
        >
          Crear cuenta gratis →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2330] py-6 text-center text-slate-600 text-sm">
        © 2026 Project Manager — Construido con React, Node.js & Socket.io
      </footer>
    </div>
  );
};

export default LandingView;