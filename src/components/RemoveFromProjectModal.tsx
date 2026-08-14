// components/RemovedFromProjectModal.tsx
import { useNavigate } from 'react-router'

type Props = {
    show: boolean
}

const RemovedFromProjectModal = ({ show }: Props) => {
    const navigate = useNavigate();
    if(!show) return null;

    return (
        <div className="fixed inset-0 bg-overlay backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-surface-elevated border border-border rounded-2xl shadow-overlay p-10 max-w-md w-full text-center">
                <div className="w-14 h-14 rounded-full bg-error-subtle flex items-center justify-center mx-auto mb-6">
                    <span className="text-error text-2xl font-bold">✕</span>
                </div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">Acceso revocado</h2>
                <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                    Has sido eliminado como colaborador de este proyecto. Ya no tienes acceso a su contenido.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-2.5 bg-error hover:bg-error-hover text-text-on-primary font-semibold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}

export default RemovedFromProjectModal