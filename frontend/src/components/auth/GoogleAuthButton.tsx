import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

type GoogleAuthButtonProps = {
  onSuccessToken: (token: string) => void;
  disabled?: boolean;
};

export default function GoogleAuthButton({ onSuccessToken, disabled }: GoogleAuthButtonProps) {
  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => onSuccessToken(access_token),
    onError: () => console.log("Login Failed"),
  });

  return (
    <button
      type="button"
      disabled={disabled}
      className="mt-2 cursor-pointer bg-white w-full flex items-center justify-center gap-3 rounded-lg py-2.5 text-black"
      onClick={() => login()}
    >
      <FaGoogle />
      Continuar con Google
    </button>
  );
}