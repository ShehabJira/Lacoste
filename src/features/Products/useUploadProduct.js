import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadUpdateProduct as uploadUpdateProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUploadProduct() {
	const queryClient = useQueryClient();

	const { mutate: uploadProduct, isPending: isUploading } = useMutation({
		mutationFn: uploadUpdateProductApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("New product has been uploaded successfully!");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { uploadProduct, isUploading };
}
