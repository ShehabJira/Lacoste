import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledWaredrobe = styled.div``;
const Header = styled.h2`
	font-size: 50px;
	line-height: 60px;
	color: #292929;
	margin-bottom: 8px;
	letter-spacing: 2px;
	margin: 0 15px 8px;
	padding: calc(100vw / 33) 15px 0 calc(100vw / 33);
	body[dir="rtl"] & {
		padding: calc(100vw / 33) calc(100vw / 33) 0 15px;
	}
	@media (max-width: 768px) {
		padding: calc(100vw / 13) 15px 0 calc(100vw / 13);
		body[dir="rtl"] & {
			padding: calc(100vw / 13) calc(100vw / 13) 0 15px;
		}
		font-size: 30px;
		line-height: 40px;
	}
`;
const WaredrobeMenu = styled.div`
	display: flex;
	color: #545454;
	font-size: 16px;
	@media (min-width: 768px) {
		padding-right: 65px;
		margin: 20px 0 25px 10px;
		body[dir="rtl"] & {
			padding-right: 0;
			padding-left: 65px;
			margin: 20px 10px 25px 0;
		}
	}
	@media (max-width: 768px) {
		padding: 0 15px 48px;
		flex-direction: column;
	}
	a {
		width: calc(100% / 3);
		@media (max-width: 768px) {
			width: 100%;
		}
		@media (min-width: 769px) {
			padding-left: 65px;
			body[dir="rtl"] & {
				padding-left: 0;
				padding-right: 65px;
			}
		}
		text-decoration: underline;
		margin-bottom: 48px;
	}
	a:focus {
		outline: none;
	}
	img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		margin-bottom: 5px;
	}
`;

function Waredrobe() {
	const { t } = useTranslation();
	return (
		<StyledWaredrobe>
			<Header>{t("wardrobe")}</Header>
			<WaredrobeMenu>
				<Link to="/men">
					<figure>
						<picture>
							<source srcSet="waredrobe-men1.jpg" media="(min-width: 1024px)" />
							<source srcSet="waredrobe-men2.jpg" media="(max-width: 1023px)" />
							<img src="waredrobe-men1.jpg" alt="Men Clothing" fetchpriority="low" />
						</picture>
						<figcaption>{t("menClothing")}</figcaption>
					</figure>
				</Link>
				<Link to="/men/shoes">
					<figure>
						<picture>
							<source srcSet="waredrobe-footwear1.jpg" media="(min-width: 1024px)" />
							<source srcSet="waredrobe-footwear2.jpg" media="(max-width: 1023px)" />
							<img src="waredrobe-footwear1.jpg" alt="Footwear" fetchpriority="low" />
						</picture>
						<figcaption>{t("footwear")}</figcaption>
					</figure>
				</Link>
				<Link to="/women">
					<figure>
						<picture>
							<source srcSet="waredrobe-women1.jpg" media="(min-width: 1024px)" />
							<source srcSet="waredrobe-women2.jpg" media="(max-width: 1023px)" />
							<img src="waredrobe-women1.jpg" alt="Women Clothing" fetchpriority="low" />
						</picture>
						<figcaption>{t("womenClothing")}</figcaption>
					</figure>
				</Link>
			</WaredrobeMenu>
		</StyledWaredrobe>
	);
}

export default Waredrobe;
