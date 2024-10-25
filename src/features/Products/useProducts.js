import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { useParams } from "react-router-dom";

export function useProducts() {
	const { mainCategory, subCategory, lateralCategory } = useParams();
	const queryClient = useQueryClient();
	const searchParams = new URLSearchParams(window.location.search);

	// PAGINATION
	const sz = !searchParams.get("sz") ? 7 : +searchParams.get("sz");

	// SEARCHING
	const searchQuery = searchParams.get("query") ? searchParams.get("query") : "";

	// FILTERING
	const { pref1, pref1V, pref2, pref2V, pref3, pref3V, pref4, pref4V } = Object.fromEntries(searchParams.entries());
	let filters = [
		{ field: pref1, value: pref1V },
		{ field: pref2, value: pref2V },
		{ field: pref3, value: pref3V },
		{ field: pref4, value: pref4V },
	];
	filters = filters.filter((filter) => filter.field && filter.value);

	//  SORTING
	const sRule = searchParams.get("sRule") || "id-asc";
	const [field, direction] = sRule.split("-");
	const sortBy = { field, direction };

	// USE QUERY
	const { data: { products, count } = {}, isLoading: isGettingProducts } = useQuery({
		queryKey: ["products", mainCategory, subCategory, lateralCategory, sz, searchQuery],
		queryFn: () => getProducts(mainCategory, subCategory, lateralCategory, sz, sortBy, filters, searchQuery),
	});

	// only prefetch if there are some products left.
	const productsLeft = count - products?.length;
	if (productsLeft)
		queryClient.prefetchQuery({
			queryKey: ["products", mainCategory, subCategory, lateralCategory, sz + 4, searchQuery],
			queryFn: () => getProducts(mainCategory, subCategory, lateralCategory, sz + 4, sortBy, filters, searchQuery),
		});

	return { products, isGettingProducts, count };
}

// useMutation returns a mutation fn that can accept arguments from you, so that you can mutate what you want.
// but useQuery returns only the data, so it doesn't return something so you can use to pass the data through. you
// can only pass the data into here to the getProducts directly by getting the data into here by useParams or anything
// or by passing the data into here through the useProducts custom hook itself.

// export function useProducts({ mainCategory, subCategory, lateralCategory }) {

// 	const { data: products, isLoading } = useQuery({
// 		queryKey: ["products", mainCategory, subCategory, lateralCategory],
// 		queryFn: () => getProducts(mainCategory, subCategory, lateralCategory),
// 		retry: false,
// 	});
// 	return { products, isLoading };
// }

// in useMutaiton we don't pass the data into the custom hook like that way. we pass the data to the mutationFn returned by the custom hook.
// Thus, queryFn doesn't receive anything(only for reading data => querying), but mutationFn does.
