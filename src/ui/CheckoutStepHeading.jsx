import { PiCheck } from "react-icons/pi";
import styled from "styled-components";

const StyledCheckoutStepHeading = styled.div`
	display: flex;
	align-items: center;
	@media (min-width: 1024px) {
		padding-bottom: ${(props) => props.$pbLg};
	}
	@media (max-width: 1024px) {
		padding-top: ${(props) => props.$ptSm};
		padding-bottom: ${(props) => props.$pbSm};
		padding-left: 15px;
	}
	span:first-child {
		background-color: ${(props) => (props.$active ? "#38b272" : "#c8c8c8")};
		display: block;
		margin-right: 8px;
		font-size: 10px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: 800;
	}
	span.check {
		background-color: #fff;
		border: 2px solid #38b272;
		svg {
			width: 20px;
			height: 20px;
			color: #38b272;
		}
	}
	span:last-child {
		font-size: 18px;
		font-weight: 800;
		display: block;
		color: ${(props) => (props.$active ? "#292929" : "#c8c8c8")};
	}
`;
function CheckoutStepHeading({ step, heading, pbLg = 0, pbSm = 0, ptSm = 0, active, reached = false }) {
	return (
		<StyledCheckoutStepHeading $pbLg={pbLg} $pbSm={pbSm} $ptSm={ptSm} $active={active}>
			{reached ? (
				<span className="check">
					<PiCheck />
				</span>
			) : (
				<span>{step}</span>
			)}
			<span>{heading}</span>
		</StyledCheckoutStepHeading>
	);
}

export default CheckoutStepHeading;
