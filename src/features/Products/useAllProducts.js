import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useAllProducts(ids, instantSearchQuery) {
	const { data: allProducts, isLoading: isGettingAllProducts } = useQuery({
		queryKey: ["products", ids, instantSearchQuery],
		queryFn: () => getAllProducts(ids, instantSearchQuery),
	});

	return { allProducts, isGettingAllProducts };
}
