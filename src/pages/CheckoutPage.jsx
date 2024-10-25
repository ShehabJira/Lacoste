import { Outlet } from "react-router-dom";
import styled from "styled-components";
import CheckoutSummary from "../features/Checkout/CheckoutSummary";
import CheckoutHeader from "../features/Checkout/CheckoutHeader";
import { useUserInfo } from "../contexts/UserInfoContext";
import EmptyCart from "../features/Checkout/EmptyCart";
import Footer from "../ui/Footer";
import { useEffect } from "react";
import { useUser } from "../features/Authentication/useUser";

const StyledCheckoutPage = styled.div`
	background-color: #fafafa;
	line-height: 1.5;
	color: #292929;
	font-family: "archivo", Arial, Helvetica, sans-serif;
	display: flex;
	justify-content: space-between;
	@media (max-width: 1024px) {
		flex-direction: column;
	}
`;
const CheckoutLeftContainer = styled.div`
	width: 100%;
	@media (min-width: 1024px) {
		width: 44%;
		padding: 50px 0;
		margin: 0 auto;
	}
`;
const CheckoutRightContainer = styled.div`
	background-color: #f4f4f4;
	position: relative;
	width: 100%;
	@media (min-width: 1024px) {
		width: 538px;
	}
`;

function CheckoutPage() {
	const { user } = useUser();
	const { nItems, dispatch } = useUserInfo();

	const { title, firstName, lastName, city, area, phone, email, apartmentNoAndBuildingName, newsLetterSubscription } =
		user && user.user_metadata ? user.user_metadata : "";

	useEffect(
		function () {
			if (user) {
				dispatch({
					type: "user/updateInfo",
					payload: {
						title,
						firstName,
						lastName,
						city,
						area,
						phoneNumber: phone,
						email,
						flatNumberBuildingName: apartmentNoAndBuildingName,
						newsLetter: newsLetterSubscription,
					},
				});
			}
		},
		[title, firstName, lastName, city, area, email, phone, apartmentNoAndBuildingName, dispatch, newsLetterSubscription, user]
	);

	if (nItems === 0)
		return (
			<>
				<CheckoutHeader />
				<EmptyCart />
				<Footer />
			</>
		);

	return (
		<>
			<CheckoutHeader />

			<StyledCheckoutPage>
				<CheckoutLeftContainer>
					<Outlet />
				</CheckoutLeftContainer>

				<CheckoutRightContainer>
					<CheckoutSummary />
				</CheckoutRightContainer>
			</StyledCheckoutPage>
		</>
	);
}

export default CheckoutPage;
