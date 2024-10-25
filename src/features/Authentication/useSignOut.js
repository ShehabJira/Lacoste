import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut as signOutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../contexts/UserInfoContext";

export function useSignOut() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { dispatch } = useUserInfo();

	const { mutate: signOut, isPending: isSigningOut } = useMutation({
		mutationFn: signOutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			toast.success("Signed Out Successfully!");
			dispatch({ type: "user/resetEverything" });
			navigate("/", { replace: true });
		},
	});
	return { signOut, isSigningOut };
}
