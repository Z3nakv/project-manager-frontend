import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Fragment } from "react/jsx-runtime";

const TASKPROPS = {
  LABELS: "Labels",
  ESTIMATEDDAYS: "EstimatedDays",
} as const;

const initialProps = {
  Labels: false,
  EstimatedDays: false,
};

type SelectTaskPropsModalProps = {
  onConfirm: (fields: string[], quantity:number) => void
}

const SelectTaskPropsModal = ({ onConfirm }: SelectTaskPropsModalProps) => {
  const [taskProps, setTaskProps] = useState(initialProps);
  const [searchParams, setSearchParams] = useSearchParams();
  const viewTaskProps = searchParams.get('viewTaskProps');
  const [quantity, setQuantity] = useState(1);
  
  const handleTaskProps = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    setTaskProps((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setQuantity(+value)
  }

  const handleClose = () => {
    setSearchParams(prev => {
        prev.delete('viewTaskProps');
        return prev;
    })
  }

  const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const selectedFields = Object.entries(taskProps)
      .filter(([, checked]) => checked)
      .map(([field]) => field[0].toLowerCase() + field.slice(1));
    onConfirm(selectedFields, quantity)
  }
  
  return (
    <Transition appear show={!!viewTaskProps} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <DialogTitle>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                      Select the props for new tasks
                    </p>
                  </DialogTitle>

                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <ul className="space-y-2">
                    {Object.values(TASKPROPS).map((label) => 
                      <li
                        key={label}
                        className="flex gap-2 rounded-md border border-slate-800 bg-slate-800/40 p-2.5"
                      >
                        <input
                          name={label}
                          type="checkbox"
                          checked={taskProps[label]}
                          onChange={handleTaskProps}
                          className="mt-1"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-200">
                            {label}
                          </p>
                        </div>
                      </li>
                    )}
                    <div className="text-white flex gap-2 rounded-md border border-slate-800 bg-slate-800/40 p-2.5">
                      <label htmlFor="quantity">How many tasks do you want to create?</label>
                      <select 
                      name="quantity" 
                      id="quantity" 
                      onChange={handleSelectChange}
                      className="w-full text-black">
                        { Array.from({ length: 5 }).map((_,i) => (<option key={i} value={i+1}>{i+1}</option>))}
                      </select>
                    </div>
                    
                  </ul>

                  <button
                    type="submit"
                    className="w-full mt-5 p-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Agregar
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectTaskPropsModal;
