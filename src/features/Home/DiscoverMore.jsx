import styled from "styled-components";
import FractionPagination from "../../ui/FractionPagination";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const StyledDiscoverMore = styled.div`
	background-color: #93a491;
	padding: 0 calc(100vw / 25) 40px;
	margin-bottom: 80px;
`;

const Slider = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	padding: 25px 16px 23px 0px;
	.lacoste-inside {
		font-size: 24px;
		img {
			width: 44px;
			height: 33px;
			margin-left: 10px;
			vertical-align: middle;
			filter: invert(100%);
			body[dir="rtl"] & {
				margin-left: 0;
				margin-right: 10px;
			}
		}
	}
`;

const Content = styled.div`
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
	a {
		width: 50vw;
		@media (max-width: 768px) {
			width: 85vw;
			margin-right: 0;
		}
		margin-right: 5.7vw;
		display: block;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
		}
		body[dir="rtl"] & {
			margin-right: 0;
			margin-left: 5.7vw;
		}
	}
	a:focus {
		outline: none;
	}

	.info {
		width: 24.6vw;
		@media (max-width: 1024px) {
			width: 34vw;
		}
		@media (max-width: 768px) {
			width: 90vw;
		}
		@media (min-width: 1500px) {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-start;
		}
		color: #fff;
		p:first-of-type {
			font-variant: small-caps;
			margin-bottom: 16px;
			margin-top: 16px;
			font-size: 10px;
			font-weight: bold;
			line-height: 2;
			letter-spacing: 1.5px;
		}
		h2 {
			font-size: 26px;
			margin-bottom: 8px;
		}
		p:last-of-type {
			font-size: 15px;
			margin-bottom: 40px;
			line-height: 1.7;
		}
	}
`;

function DiscoverMore() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<StyledDiscoverMore>
			<Slider>
				<div className="lacoste-inside">
					{t("lacosteInside")}
					<img src="lacoste-crocodile.png" alt="small logo" loading="lazy" fetchpriority="low" />
				</div>
				<FractionPagination startPoint={1} endPoint={1} />
			</Slider>

			<Content>
				<Link to="/lacoste" onClick={() => window.scrollTo({ top: 0 })}>
					<img src="discover-me.jpg" alt="some kids" loading="lazy" fetchpriority="low" />
				</Link>
				<div className="info">
					<p>{t("lacosteInsideQuote1")}</p>
					<h2>{t("lacosteInsideQuote2")}</h2>
					<p>{t("lacosteInsideQuote3")}</p>
					<Button
						$backgroundColor="#fff"
						color="#292929"
						onClick={() => {
							navigate("/lacoste");
							window.scrollTo({ top: 0, left: 0 });
						}}
					>
						{t("discoverMore")}
					</Button>
				</div>
			</Content>
		</StyledDiscoverMore>
	);
}

export default DiscoverMore;
