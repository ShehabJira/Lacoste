import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
		mutationFn: deleteProductApi,
		onSuccess: () => {
			toast.success("Product has been deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { deleteProduct, isDeleting };
}
