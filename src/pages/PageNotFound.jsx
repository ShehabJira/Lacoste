import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
const StyledPageNotFound = styled.div`
	text-align: center;
	padding: 8px 45px 80px;
	font-family: metropolis, Arial, Helvetica, sans-serif;
	color: #191919;
	line-height: 1.84;
	div {
		@media (min-width: 992px) {
			width: 65%;
		}
		margin: auto;
	}
	h2 {
		margin: 28px 0 23px;
		font-size: 26px;
		line-height: 1.4;
		letter-spacing: 0.8px;
		font-weight: 600;
	}
	p {
		margin-bottom: 16px;
		padding-bottom: 11px;
		font-size: 17px;
		letter-spacing: 1px;
		font-weight: lighter;
	}
	button {
		padding: 10px;
		height: 40px;
		line-height: 18px;
		margin: auto;
		text-transform: uppercase;
		letter-spacing: 1px;
		border: 1px solid #e5e5e5;
		word-spacing: 3px;
		margin-top: 32px;
		font-weight: lighter;
	}
`;

function PageNotFound() {
	const navigate = useNavigate();
	return (
		<>
			<Header />
			<StyledPageNotFound>
				<h2>This page can not be found.</h2>
				<div>
					<p>Looks like something went wrong. If you are looking for something specific, please use search.</p>
					<p>
						Please forgive us, redeem <b>15% off*</b> on your next order.
					</p>
					<p>
						<b>Use coupon code: 404</b>
					</p>
					<p>
						<b>This offer can not be used on products that are already discounted</b>
					</p>
					<Button
						$backgroundColor="#Fff"
						color="#000"
						onClick={() => {
							navigate("/", { replace: true });
							window.scrollTo({ top: 0 });
						}}
					>
						go to homepage
					</Button>
				</div>
			</StyledPageNotFound>
			<Footer />
		</>
	);
}

export default PageNotFound;
