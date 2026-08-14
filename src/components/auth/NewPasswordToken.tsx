import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router';
import { useValidateTokenMutation } from '../../hooks/mutations/useAuthMutation';
import type { ConfirmToken } from '../../types/auth';

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken } : NewPasswordTokenProps) {

    const { mutate } = useValidateTokenMutation({ setIsValidToken })
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate({token});


    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-surface-base border border-border mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block text-text-primary"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border border-border bg-input text-text-primary placeholder:text-text-muted" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border border-border bg-input text-text-primary placeholder:text-text-muted" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border border-border bg-input text-text-primary placeholder:text-text-muted" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border border-border bg-input text-text-primary placeholder:text-text-muted" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border border-border bg-input text-text-primary placeholder:text-text-muted" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border border-border bg-input text-text-primary placeholder:text-text-muted" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-text-muted hover:text-primary font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}