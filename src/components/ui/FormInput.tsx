// components/ui/FormInput.tsx
import { forwardRef } from 'react';
import FieldError from './FieldError';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  labelExtra?: React.ReactNode; // 👈 nuevo
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, labelExtra, ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor={id}>
          {label}
        </label>
        {labelExtra}
      </div>
      <input
        id={id}
        ref={ref}
        className="w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#252d3d] border border-[#2d3348] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150"
        {...rest}
      />
      <FieldError message={error} />
    </div>
  )
);

export default FormInput;