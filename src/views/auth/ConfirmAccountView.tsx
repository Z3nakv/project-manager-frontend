import { useState } from "react";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { Link } from "react-router";
import { FiShield } from "react-icons/fi";
import { useConfirmAccountMutation } from "../../hooks/mutations/useAuthMutation";
import type { ConfirmToken } from "../../types/auth";
import DogEar from "../../components/DogEar";

export default function ConfirmAccountView() {

  const [token, setToken] = useState<ConfirmToken['token']>('');

  const { mutate } = useConfirmAccountMutation()

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token });

  const pinFieldClass = "w-11 h-12 rounded-lg text-center font-mono text-lg font-semibold text-text-primary bg-input border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150";

  return (
    <div className="relative pt-4 w-full max-w-sm">
      {/* Pestaña tipo archivo */}
      <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5">
        <FiShield className="h-3 w-3 text-accent" />
        <span className="font-mono text-xs text-text-muted">confirmar.auth</span>
      </div>

      <div className="relative bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted p-8 overflow-hidden text-center">
        <DogEar />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-text-primary">Confirma tu cuenta</h1>
          <p className="text-sm text-text-secondary mt-1">
            Ingresa el código de 6 dígitos que recibiste por email
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="flex justify-center gap-2">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
              <PinInputField className={pinFieldClass} />
              <PinInputField className={pinFieldClass} />
              <PinInputField className={pinFieldClass} />
              <PinInputField className={pinFieldClass} />
              <PinInputField className={pinFieldClass} />
              <PinInputField className={pinFieldClass} />
            </PinInput>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-text-muted mt-6">
          ¿No recibiste el código?{" "}
          <Link
            to="/auth/request-code"
            className="text-accent hover:text-ring font-medium transition-colors duration-150"
          >
            Solicitar uno nuevo
          </Link>
        </p>
      </div>
    </div>
  );
}