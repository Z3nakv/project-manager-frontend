import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginView from "./LoginView";

const LoginWithGoogleProvider = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <LoginView />
  </GoogleOAuthProvider>
);

export default LoginWithGoogleProvider;