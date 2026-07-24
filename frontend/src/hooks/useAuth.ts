import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/authService";


export const useAuth = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!localStorage.getItem('AUTH_TOKEN_JWT')
    })

    return { data, isError, isLoading, error };
}