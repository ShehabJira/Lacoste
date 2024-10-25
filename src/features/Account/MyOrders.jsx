import FaqSection from "./FaqSection";
import OrdersSection from "./OrdersSection";
import PageContent from "../../ui/PageContent";
import { useUser } from "../Authentication/useUser";
import { useOrders } from "./useOrders";

function MyOrders() {
	const { user, isGettingUser } = useUser();
	const { email } = user && user.user_metadata ? user.user_metadata : "";
	const { orders, isGettingOrders } = useOrders(email);

	return (
		<PageContent>
			<OrdersSection orders={orders} isLoading={isGettingOrders || isGettingUser} />
			<FaqSection />
		</PageContent>
	);
}

export default MyOrders;
