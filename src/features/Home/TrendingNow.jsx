import styled from "styled-components";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const StyledTrendingNow = styled.div`
	margin: 0 calc(100vw / 26.5) 150px;
	@media (max-width: 992px) {
		margin: 0 calc(100vw / 26.5) 80px;
	}
`;
const TrendingHeadin = styled.h2`
	margin-bottom: 8px;
	font-size: 50px;
	@media (max-width: 768px) {
		font-size: 30px;
	}
	color: #292929;
	letter-spacing: 2px;
	padding: calc(100vw / 33) 0 16px;
`;
const TrendingObjects = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}
`;
const TrendingObject = styled(Link)`
	display: block;
	position: relative;
	width: 43.5vw;
	@media (max-width: 768px) {
		width: 85vw;
	}
	img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
	}
	.info {
		position: absolute;
		width: 100%;
		height: 97%;
		top: 0;
		left: 0;
		padding: 67px;
		@media (max-width: 445px) {
			padding: 30px;
		}
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		letter-spacing: 0.06rem;
		h3 {
			font-size: 26px;
			line-height: 36px;
			color: #292929;
			margin-bottom: 8px;
		}
	}
`;

function TrendingNow() {
	const { t } = useTranslation();
	return (
		<StyledTrendingNow>
			<TrendingHeadin>{t("trendingNow")}</TrendingHeadin>
			<TrendingObjects>
				<TrendingObject to="/kids" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
					<img src="kids-clothings.jpg" alt="kids clothings" loading="lazy" fetchpriority="low" />
					<div className="info">
						<div>
							<h3>{t("kidsClothing")}</h3>
							<Button>{t("shopNow")}</Button>
						</div>
					</div>
				</TrendingObject>
				<TrendingObject to="/women/leather-goods" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
					<img src="women-leather-goods.jpg" alt="women leather goods" loading="lazy" fetchpriority="low" />
					<div className="info">
						<div>
							<h3>{t("womenLeatherGoods")}</h3>
							<Button>{t("shopNow")}</Button>
						</div>
					</div>
				</TrendingObject>
			</TrendingObjects>
		</StyledTrendingNow>
	);
}

export default TrendingNow;
