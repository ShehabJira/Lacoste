import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: signIn, isPending: isSigningIn } = useMutation({
		mutationFn: ({ email, password }) => signInApi({ email, password }),
		onSuccess: (user) => {
			toast.success("Welcome Back!");
			navigate("/account/dashboard", { replace: true });
			queryClient.setQueryData(["user"], user.user);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { signIn, isSigningIn };
}
