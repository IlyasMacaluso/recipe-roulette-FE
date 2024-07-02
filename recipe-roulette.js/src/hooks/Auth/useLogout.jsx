import { useMutation } from "@tanstack/react-query"
import { useAuth } from "./useAuth";
import { useSnackbar } from "../../components/Snackbar/useSnackbar";
import { useLogin } from "../Form/useLogin";

export function useLogout() {
  const { logout } = useAuth();
  const {data} = useLogin()
  const {handleOpenSnackbar} = useSnackbar();

  async function handleFetchLogout() {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: data
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error while fetching data:", error);
      throw new Error("Error while fetching data");
    }
  }

  const mutation = useMutation({
    mutationFn: handleFetchLogout,
    onSuccess: (data) => {
      console.log(data);
      handleOpenSnackbar("You have successfully logged out.");
      logout();
    },
    onError: (error) => {
      handleOpenSnackbar("Logout failed");
      console.error("Logout failed:", error.message);
    },
  });

  function handleLogout() {
    mutation.mutate({user: data});
  }

  return {
    handleLogout
  }
}
