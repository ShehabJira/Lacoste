import { useQuery } from "@tanstack/react-query";
import { getOrders as getOrdersApi } from "../../services/apiOrders";

export function useOrders(email) {
	const { data: orders, isLoading: isGettingOrders } = useQuery({ queryKey: ["orders", email], queryFn: () => getOrdersApi(email) });
	return { orders, isGettingOrders };
}
