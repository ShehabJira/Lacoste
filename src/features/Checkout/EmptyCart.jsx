import { BsHandbag } from "react-icons/bs";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledEmptyCart = styled.div`
	background-color: #fafafa;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 68px 68px 80px;
	margin-bottom: 120px;
	@media (max-width: 992px) {
		padding: 32px 14px;
		margin-bottom: 48px;
	}
	div {
		padding: 68px;
		border: 1px dashed #c8c8c8;
		border-radius: 8px;
		width: 100%;
		text-align: center;
		@media (max-width: 992px) {
			background-color: #fff;
			box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
			border: none;
		}
		svg {
			width: 45px;
			height: 45px;
			margin-bottom: 8px;
		}
		p:first-of-type {
			margin-bottom: 8px;
			font-size: 18px;
			font-weight: 700;
		}
		p:last-of-type {
			margin-bottom: 24px;
			font-size: 15px;
		}
		button {
			margin: auto;
			@media (max-width: 992px) {
				background-color: #fff;
			}
		}
	}
`;
function EmptyCart() {
	const navigate = useNavigate();
	return (
		<StyledEmptyCart>
			<div>
				<BsHandbag />
				<p>Your cart is empty</p>
				<p>Discover Lacoste products and news</p>
				<Button $backgroundColor="#fafafa" color="#292929" $border="1px solid #c8c8c8" onClick={() => navigate("/lacoste")}>
					Start Shopping
				</Button>
			</div>
		</StyledEmptyCart>
	);
}

export default EmptyCart;
