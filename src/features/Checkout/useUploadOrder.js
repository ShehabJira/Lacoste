import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadOrder as uploadOrderApi } from "../../services/apiOrders";
import toast from "react-hot-toast";
import { useUserInfo } from "../../contexts/UserInfoContext";

export function useUploadOrder() {
	const queryClient = useQueryClient();
	const { dispatch } = useUserInfo();

	const { mutate: uploadOrder, isPending: isUploadingOrder } = useMutation({
		mutationFn: uploadOrderApi,
		onSuccess: () => {
			toast.success("Order submitted!");
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			dispatch({ type: "user/resetBag" });
		},
		onError: (err) => toast.error(err.message),
	});
	return { uploadOrder, isUploadingOrder };
}
