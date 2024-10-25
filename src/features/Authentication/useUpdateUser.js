import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
		mutationFn: updateUserApi,
		onSuccess: () => {
			toast.success("Account has been updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { updateUser, isUpdatingUser };
}
