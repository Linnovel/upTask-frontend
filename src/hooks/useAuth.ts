import { getUser } from "@/services/AuthApi"
import { useQuery } from "@tanstack/react-query"

// Hook personalizado para manejar la autenticación del usuario
export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    //
    refetchOnWindowFocus: false,
  })

  return {
    data,
    isError,
    isLoading,
  }
}
