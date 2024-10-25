import { useLocation } from "react-router-dom";
import OrdersSection from "../features/Account/OrdersSection";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import PageContent from "../ui/PageContent";
import { useOrders } from "../features/Account/useOrders";

function GuestOrderPage() {
	const { state } = useLocation();
	const { email, id } = state ? state : {};

	const { orders, isGettingOrders } = useOrders(email);
	const guestOrder = orders?.filter((order) => order.id === id);

	return (
		<>
			<Header />
			<PageContent style={{ backgroundColor: "#f6f6f6" }}>
				<OrdersSection orders={guestOrder} isLoading={isGettingOrders} />
			</PageContent>
			<Footer />
		</>
	);
}

export default GuestOrderPage;
