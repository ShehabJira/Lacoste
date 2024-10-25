import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PiCaretDownLight, PiCaretUpLight, PiX } from "react-icons/pi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	padding-bottom: 5px;
	@media (max-width: 1024px) {
		display: none;
	}
`;
const CategoriesList = styled.ul`
	display: flex;
	margin: 2px;
`;
const CategoryItem = styled.li`
	margin-right: 2px;
	body[dir="rtl"] & {
		margin-right: 0;
		margin-left: 2px;
	}
`;
const Button = styled.button`
	padding: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background-color: #fff;
	&:focus {
		outline: none;
	}
	& span {
		font-size: 15px;
		margin-right: 10px;
		body[dir="rtl"] & {
			margin-right: 0;
			margin-left: 10px;
		}
	}
	&.active {
		font-weight: bold;
	}
	svg {
		pointer-events: none;
	}
`;

const MegaMenu = styled.div`
	background-color: #fff;
	width: 100vw;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	column-gap: calc(100vh / 25);
	position: absolute;
	left: 0;
	top: 150px;
	padding: 20px calc(100vw / 25);
	font-size: 15px;
	font-family: "Archivo", sans-serif;
	& ul {
		background-color: white;
	}
	& ul li:first-child {
		margin-bottom: 14px;
		a:link {
			font-weight: bold;
		}
	}
	& ul li {
		margin-bottom: 20px;
	}
	& ul li a:link:focus {
		outline: none;
	}
	& .close {
		position: absolute;
		top: 10px;
		right: 90px;
		body[dir="rtl"] & {
			right: auto;
			left: 90px;
		}
		font-size: 18px;
		border: none;
		background-color: #fff;
	}
	& .close:focus {
		outline: none;
	}
`;
const Layout = styled.div`
	position: absolute;
	left: 0;
	top: 100%;
	width: 100vw;
	height: 100vh;
	background-color: rgb(0 0 0 / 0.5);
	z-index: -1;
`;
function NavMenu() {
	const { t } = useTranslation();
	const [activeCategory, setActiveCategory] = useState("");
	const ref = useRef();
	useEffect(
		function () {
			if (activeCategory === "") {
				document.body.style.overflow = "auto";
			} else {
				document.body.style.overflow = "hidden";
			}
		},
		[activeCategory]
	);

	useEffect(function () {
		function handleClick(e) {
			// if we click outside the navMenu we need to close it.
			if (ref.current && !ref.current.contains(e.target)) {
				setActiveCategory("");
			}
			// if we click on some link inside the navMenu we need to close it.
			if (ref.current && e.target.localName === "a") {
				setActiveCategory("");
			}
		}
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);

	return (
		<StyledNav>
			<CategoriesList ref={ref}>
				<CategoryItem>
					<Button onClick={() => setActiveCategory((cur) => (cur === "new-in" ? "" : "new-in"))} className={activeCategory === "new-in" ? "active" : ""}>
						<span>{t("newIn")}</span>
						{activeCategory === "new-in" ? <PiCaretUpLight /> : <PiCaretDownLight />}
					</Button>
					{activeCategory === "new-in" && (
						<MegaMenu>
							<ul>
								<li>
									<Link to="/new-in">{t("seeAllTheNewIn")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/new-in/men">{t("men")}</Link>
								</li>
								<li>
									<Link to="/new-in/men/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/new-in/men/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/new-in/men/leather-goods">{t("bagsAndSmallLeatherGoods")}</Link>
								</li>
								<li>
									<Link to="/new-in/men/accessories">{t("accessories")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/new-in/women">{t("women")}</Link>
								</li>
								<li>
									<Link to="/new-in/women/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/new-in/women/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/new-in/women/leather-goods">{t("bagsAndSmallLeatherGoods")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/new-in/kids">{t("kids")}</Link>
								</li>
								<li>
									<Link to="/new-in/kids/babies">{t("babiesMonths")}</Link>
								</li>
								<li>
									<Link to="/new-in/kids/children">{t("childrenYears")}</Link>
								</li>
								<li>
									<Link to="/new-in/kids/teen">{t("teenYears")}</Link>
								</li>
							</ul>

							<button className="close" onClick={() => setActiveCategory("")}>
								<PiX />
							</button>
						</MegaMenu>
					)}
				</CategoryItem>

				<CategoryItem>
					<Button onClick={() => setActiveCategory((cur) => (cur === "men" ? "" : "men"))} className={activeCategory === "men" ? "active" : ""}>
						<span>{t("men")}</span>
						{activeCategory === "men" ? <PiCaretUpLight /> : <PiCaretDownLight />}
					</Button>
					{activeCategory === "men" && (
						<MegaMenu>
							<ul>
								<li>
									<Link to="/men/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/polo-shirts">{t("poloshirts")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/sweatshirts">{t("sweatshirts")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/jackets-and-coats">{t("jacketsAndCoats")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/t-shirts">{t("tShirts")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/shirts">{t("shirts")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/trousers-and-shorts">{t("trousersAndShorts")}</Link>
								</li>
								<li>
									<Link to="/men/clothing/swimwear">{t("swimwear")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/men/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/men/shoes/sneakers">{t("sneakers")}</Link>
								</li>
								<li>
									<Link to="/men/shoes/sliders-and-sandals">{t("slidersAndSandals")}</Link>
								</li>
								<li>
									<Link to="/men/shoes/socks">{t("socks")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/men/accessories">{t("accessories")}</Link>
								</li>
								<li>
									<Link to="/men/accessories/caps-and-hats">{t("capsAndHats")}</Link>
								</li>
								<li>
									<Link to="/men/accessories/belts">{t("belts")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/men/leather-goods">{t("leatherGoods")}</Link>
								</li>
								<li>
									<Link to="/men/leather-goods/bags">{t("bags")}</Link>
								</li>
								<li>
									<Link to="/men/leather-goods/wallets-and-small-leather-goods">{t("walletsAndSmallLeatherGoods")}</Link>
								</li>
								<li>
									<Link to="/men/leather-goods/business-and-laptop-bags">{t("businessAndLaptopBags")}</Link>
								</li>
							</ul>

							<button className="close" onClick={() => setActiveCategory("")}>
								<PiX />
							</button>
						</MegaMenu>
					)}
				</CategoryItem>

				<CategoryItem>
					<Button onClick={() => setActiveCategory((cur) => (cur === "women" ? "" : "women"))} className={activeCategory === "women" ? "active" : ""}>
						<span>{t("women")}</span>
						{activeCategory === "women" ? <PiCaretUpLight /> : <PiCaretDownLight />}
					</Button>
					{activeCategory === "women" && (
						<MegaMenu>
							<ul>
								<li>
									<Link to="/women/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/women/clothing/polo-shirts">{t("poloshirts")}</Link>
								</li>
								<li>
									<Link to="/women/clothing/dresses-and-skirts">{t("dressesAndSkirts")}</Link>
								</li>
								<li>
									<Link to="/women/clothing/sweatshirts">{t("sweatshirts")}</Link>
								</li>
								<li>
									<Link to="/women/clothing/trousers-and-shorts">{t("trousersAndShorts")}</Link>
								</li>
								<li>
									<Link to="/women/clothing/t-shirts">{t("tShirts")}</Link>
								</li>
								<li>
									<Link to="/women/clothing/shirts">{t("shirts")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/women/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/women/shoes/sneakers">{t("sneakers")}</Link>
								</li>
								<li>
									<Link to="/women/shoes/flipflops-and-sandals">{t("flipflopsAndSandals")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/women/leather-goods">{t("leatherGoods")}</Link>
								</li>
								<li>
									<Link to="/women/leather-goods/tote-bags">{t("toteBags")}</Link>
								</li>
								<li>
									<Link to="/women/leather-goods/shoulder-bags">{t("shoulderBags")}</Link>
								</li>
								<li>
									<Link to="/women/leather-goods/wallets-and-small-leather-goods">{t("walletsAndSmallLeatherGoods")}</Link>
								</li>
							</ul>

							<button className="close" onClick={() => setActiveCategory("")}>
								<PiX />
							</button>
						</MegaMenu>
					)}
				</CategoryItem>

				<CategoryItem>
					<Button onClick={() => setActiveCategory((cur) => (cur === "kids" ? "" : "kids"))} className={activeCategory === "kids" ? "active" : ""}>
						<span>{t("kids")}</span>
						{activeCategory === "kids" ? <PiCaretUpLight /> : <PiCaretDownLight />}
					</Button>
					{activeCategory === "kids" && (
						<MegaMenu>
							<ul>
								<li>
									<Link to="/kids/babies">{t("babiesMonths")}</Link>
								</li>
								<li>
									<Link to="/kids/babies/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/kids/babies/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/kids/babies/accessories">{t("accessories")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/kids/children">{t("childrenYears")}</Link>
								</li>
								<li>
									<Link to="/kids/children/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/kids/children/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/kids/children/accessories">{t("accessories")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/kids/teen">{t("teenYears")}</Link>
								</li>
								<li>
									<Link to="/kids/teen/clothing">{t("clothing")}</Link>
								</li>
								<li>
									<Link to="/kids/teen/shoes">{t("shoes")}</Link>
								</li>
								<li>
									<Link to="/kids/teen/accessories">{t("accessories")}</Link>
								</li>
							</ul>

							<button className="close" onClick={() => setActiveCategory("")}>
								<PiX />
							</button>
						</MegaMenu>
					)}
				</CategoryItem>

				<CategoryItem>
					<Button
						onClick={() => setActiveCategory((cur) => (cur === "last-chance" ? "" : "last-chance"))}
						className={activeCategory === "last-chance" ? "active" : ""}
					>
						<span>{t("lastChance")}</span>
						{activeCategory === "last-chance" ? <PiCaretUpLight /> : <PiCaretDownLight />}
					</Button>
					{activeCategory === "last-chance" && (
						<MegaMenu>
							<ul>
								<li>
									<Link to="/last-chance/men">{t("men")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/last-chance/women">{t("women")}</Link>
								</li>
							</ul>

							<ul>
								<li>
									<Link to="/last-chance/kids">{t("kids")}</Link>
								</li>
							</ul>

							<button className="close" onClick={() => setActiveCategory("")}>
								<PiX />
							</button>
						</MegaMenu>
					)}
				</CategoryItem>
			</CategoriesList>
			{activeCategory !== "" && <Layout></Layout>}
		</StyledNav>
	);
}

export default NavMenu;
