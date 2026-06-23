// components/RemovedFromProjectModal.tsx
import { useNavigate } from 'react-router'

type Props = {
    show: boolean
}

const RemovedFromProjectModal = ({ show }: Props) => {
    const navigate = useNavigate()

    if(!show) return null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1e2330] border border-[#2d3348] rounded-xl p-10 max-w-md w-full text-center">
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-red-400 text-2xl">✕</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-100 mb-2">Acceso revocado</h2>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Has sido eliminado como colaborador de este proyecto. Ya no tienes acceso a su contenido.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}

export default RemovedFromProjectModal