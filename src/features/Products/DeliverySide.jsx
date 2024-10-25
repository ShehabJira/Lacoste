import styled from "styled-components";
const ReturnSection = styled.section`
	font-family: metropolis, Arial, Helvetica, sans-serif;
	padding-bottom: 32px;
	border-bottom: 1px solid #e5e5e5;
	div:first-child {
		font-size: 18px;
		margin: 32px 0 16px;
		color: #191919;
		line-height: 28px;
	}
	div:last-child {
		font-size: 15px;
		color: #767676;
		line-height: 25px;
	}
`;
const DeliverySection = styled(ReturnSection)`
	border-bottom: none;
`;
function DeliverySide() {
	return (
		<div>
			<h2>FREE DELIVERY AND RETURNS</h2>
			<ReturnSection>
				<div>Free returns</div>
				<div>
					Enjoy Free Returns using our easy returns process. We accept returns
					14 days from receipt of your order purchased on Lacoste.com.eg. To
					return a product login to your account or if you do not have an
					account use the link your order shipment email and follow the easy
					steps. Underwear, swimwear, and perfumes cannot be returned,
					exchanged, or refunded.
				</div>
			</ReturnSection>
			<DeliverySection>
				<div>Standard delivery</div>
				<div>
					Enjoy FREE Standard Delivery on all orders. Orders take up to 2-4 days
					to be delivered between Saturday and Thursday.
				</div>
			</DeliverySection>
		</div>
	);
}

export default DeliverySide;
