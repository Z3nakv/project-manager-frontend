// AddMemberModal.tsx
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router';
import { XMarkIcon } from '@heroicons/react/20/solid';
import AddMemberForm from './AddMemberForm';

export default function AddMemberModal() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('addMember');
    const show = addMember ? true : false;

    const handleClose = () => navigate(location.pathname, { replace: true });

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>

                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] p-6">

                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <Dialog.Title as="h3" className="text-lg font-bold text-slate-100">
                                            Agregar Colaborador
                                        </Dialog.Title>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Busca al integrante por su email
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-[#2d3348] transition-colors duration-150"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>

                                <AddMemberForm />

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}