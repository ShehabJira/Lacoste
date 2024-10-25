import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../Authentication/useUser";

const StyledCheckoutHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 80;
	background-color: #fff;

	@media (min-width: 1024px) {
		padding: 0 calc(100vw / 25);
		height: 85px;
	}
	@media (max-width: 1024px) {
		padding: 0 16px;
		height: 60px;
	}
	@media (min-width: 992px) {
		padding-left: 68px;
		padding-right: 68px;
	}
`;
const Logo = styled.div`
	cursor: pointer;
	@media (min-width: 1024px) {
		img:first-child {
			display: block;
			max-width: 150px;
		}
		img:last-child {
			display: none;
		}
	}
	@media (max-width: 1024px) {
		img:last-child {
			display: block;
			max-width: 50px;
			transform: scale(1.3);
		}
		img:first-child {
			display: none;
		}
	}
`;
const User = styled.div`
	display: grid;
	place-items: center;
	cursor: pointer;
	svg {
		width: 20px;
		height: 20px;
	}
`;
function CheckoutHeader() {
	const navigate = useNavigate();
	const { user } = useUser();
	return (
		<StyledCheckoutHeader>
			<Logo onClick={() => navigate("/")}>
				<img src="/logo.png" alt="Lacoste Logo" />
				<img src="/logo-mini.png" alt="Lacoste Logo" />
			</Logo>
			<User>
				<FaRegUser onClick={() => navigate(`${user ? "/account/dashboard" : "/login/sign-in"}`)} />
			</User>
		</StyledCheckoutHeader>
	);
}

export default CheckoutHeader;
