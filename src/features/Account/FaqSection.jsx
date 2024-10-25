import styled from "styled-components";
import { PiWechatLogoLight } from "react-icons/pi";
import { Link, useOutletContext } from "react-router-dom";

const StyledFaq = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 40px 0;
	& > div {
		background-color: #f6f6f6;
		border-radius: 10px;
		padding: 40px;
		width: 92%;
		margin: 0 auto;
		text-align: center;
		color: #999999;
		div:first-child {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 5px;
			line-height: 1.44;
			svg {
				width: 30px;
				height: 30px;
			}
			span {
				font-size: 18px;
				font-weight: 600;
				color: #292929;
			}
		}
		div:nth-child(2) {
			font-size: 15px;
			line-height: 1.53;
		}
		a {
			display: block;
			margin: auto;
			margin-top: 20px;
			color: #fff;
			border-radius: 22.5px;
			height: 40px;
			width: 134px;
			background-color: #292929;
			padding: 10px 30px 12px;
		}
	}
`;
function FaqSection() {
	const [setPage] = useOutletContext();

	return (
		<StyledFaq>
			<div>
				<div>
					<PiWechatLogoLight />
					<span>FAQ</span>
				</div>
				<div>Our FAQ section helps you get an immediate answer to the most frequently asked questions.</div>
				<Link
					to="/account/help-and-contact"
					onClick={() => {
						setPage("Help & Contact");
						window.scrollTo({ left: 0, top: 0 });
					}}
				>
					Go To Faq
				</Link>
			</div>
		</StyledFaq>
	);
}

export default FaqSection;
