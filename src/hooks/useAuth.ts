import { useQuery } from "@tanstack/react-query";
import { getUser, refreshAccessToken } from "../services/authService";
import { getAccessToken, setAccessToken } from "../utils/auth";

const getCurrentUser = async () => {
  try {
    if (!getAccessToken()) {
      // Solo refresca si NO hay token en memoria (ej. recarga de página, pestaña nueva)
      const { accessToken } = await refreshAccessToken();
      setAccessToken(accessToken);
    } // lo guarda en memoria para que el interceptor lo use
    return await getUser(); // ahora sí, con el token recién puesto, pide el usuario
  } catch {
    setAccessToken(null);
    return null; // no hay sesión válida
  }
};

export const useAuth = () => {
    const { data, isError, isLoading, error, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 minuto — evita refetch inmediato tras setQueryData manual

    });
    return { data, isError, isLoading, error, isFetching };
}