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
          <div className="fixed inset-0 bg-overlay backdrop-blur-sm" />
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
              <DialogPanel className="w-full max-w-lg bg-surface-elevated border border-border rounded-xl shadow-overlay p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <DialogTitle>
                    <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
                      Propiedades para nuevas tareas
                    </p>
                  </DialogTitle>

                  <button
                    onClick={handleClose}
                    className="cursor-pointer p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors duration-150"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <ul className="space-y-2">
                    {Object.values(TASKPROPS).map((label) => 
                      <li
                        key={label}
                        className="flex items-center gap-2.5 rounded-lg border border-border bg-input p-2.5"
                      >
                        <input
                          name={label}
                          type="checkbox"
                          checked={taskProps[label]}
                          onChange={handleTaskProps}
                          className="w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {label}
                          </p>
                        </div>
                      </li>
                    )}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-input p-2.5 text-text-primary text-sm">
                      <label htmlFor="quantity" className="text-sm text-text-secondary font-medium">¿Cuántas tareas deseas crear?</label>
                      <select 
                      name="quantity" 
                      id="quantity" 
                      onChange={handleSelectChange}
                      className="bg-surface-base border border-border text-text-primary rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:border-primary cursor-pointer">
                        { Array.from({ length: 5 }).map((_,i) => (<option key={i} value={i+1} className="bg-surface-base text-text-primary">{i+1}</option>))}
                      </select>
                    </div>
                    
                  </ul>

                  <button
                    type="submit"
                    className="w-full mt-5 py-2.5 bg-primary hover:bg-primary-hover text-text-on-primary text-xs font-semibold rounded-xl transition-colors duration-150 shadow-md cursor-pointer"
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
