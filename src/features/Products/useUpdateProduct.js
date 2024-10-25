import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadUpdateProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	const { mutate: updateProduct, isPending: isUpdating } = useMutation({
		mutationFn: ({ product, id }) => uploadUpdateProduct(product, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { updateProduct, isUpdating };
}
