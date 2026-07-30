import { useQuery } from "@tanstack/react-query";
import { getUser, refreshAccessToken } from "../services/authService";
import { setAccessToken } from "../utils/auth";

const getCurrentUser = async () => {
  try {
    const { accessToken } = await refreshAccessToken(); // intenta renovar usando la cookie
    setAccessToken(accessToken); // lo guarda en memoria para que el interceptor lo use
    return await getUser(); // ahora sí, con el token recién puesto, pide el usuario
  } catch {
    setAccessToken(null);
    return null; // no hay sesión válida
  }
};

export const useAuth = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });
    return { data, isError, isLoading, error };
}