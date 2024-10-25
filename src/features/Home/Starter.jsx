import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledStarter = styled.div`
	position: relative;
	picture img {
		display: block;
		width: 100%;
		@media (min-width: 1024px) {
			aspect-ratio: 1920/794;
		}
		@media (max-width: 1024px) {
			aspect-ratio: 750/1072;
		}
	}
	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0 0 0 / 0.08);
	}
	& .info {
		position: absolute;
		top: 50%;
		left: 5%;
		body[dir="rtl"] & {
			left: auto;
			right: 5%;
		}
		color: #fff;
		& h1 {
			line-height: 1;
			font-size: 60px;
			margin: 0 0 8px;
			height: 60px;
			font-weight: 600;
			@media (max-width: 768px) {
				font-size: 40px;
				height: 40px;
			}
		}
		& h2 {
			font-size: 17px;
			height: 50px;
			line-height: 50px;
			font-weight: normal;
			margin-bottom: 8px;
			@media (max-width: 768px) {
				height: 40px;
				line-height: 40px;
			}
		}
		& a {
			background-color: white;
			padding: 12px 30px;
			border-radius: 50px;
			color: #000;
			font-size: 15px;
			display: inline-flex;
			letter-spacing: 1px;
		}
	}
`;

function Starter() {
	const { t } = useTranslation();
	return (
		<StyledStarter className="starter">
			<picture>
				<source srcSet="starter.webp" media="(min-width: 1024px)" />
				<source srcSet="starter2.webp" media="(max-width: 1024px)" />
				<img src="starter.webp" alt="starter" fetchriority="high" />
			</picture>
			<div className="info">
				<h1>{t("newArrivals")}</h1>
				<h2>{t("discoverLacoste")}</h2>
				<Link to="/lacoste">{t("shopCollection")}</Link>
			</div>
		</StyledStarter>
	);
}

export default Starter;
