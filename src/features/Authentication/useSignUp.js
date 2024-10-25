import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: signUp, isPending: isSigningUp } = useMutation({
		mutationFn: signUpApi,
		onSuccess: (user) => {
			navigate("/account/dashboard", { replace: true });
			queryClient.setQueryData(["user"], user.user);
			toast.success("Account created successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { signUp, isSigningUp };
}
