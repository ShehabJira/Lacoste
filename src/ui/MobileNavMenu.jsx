import { createPortal } from "react-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsChevronDown, BsChevronLeft, BsChevronRight, BsChevronUp } from "react-icons/bs";
import { PiPackage, PiQuestionLight, PiUser } from "react-icons/pi";
import Button from "./Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbsHeader from "./BreadcrumbsHeader";
import { useUser } from "../features/Authentication/useUser";
import { useSignOut } from "../features/Authentication/useSignOut";
const StyledNav = styled.nav`
	overflow: auto;
	position: fixed;
	transition: 0.3s;
	left: 0;
	width: 100%;
	padding-top: 10px;
	height: 93dvh;
	background-color: white;
	display: block;
	font-family: "Archivo", sans-serif;
	z-index: 1000;
	&.notVisible {
		opacity: 0;
		top: 100%;
		z-index: -1;
	}
	&.visible {
		opacity: 1;
		top: 142px;
		@media (min-width: 768px) {
			top: 92px;
		}
	}
	@media (min-width: 1025px) {
		display: none;
	}
`;

const MenuList = styled.ul`
	li {
		padding: 14px calc(100vw / 25);
	}
`;
const MenuItem = styled.li`
	& > button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border: none;
		background-color: #fff;
		line-height: 1.5;
		&:not(:has(svg)) {
			cursor: auto;
		}
		span {
			font-size: 18px;
			margin-right: 10px;
		}
		svg {
			width: 20px;
			height: 20px;
		}
		&:focus {
			outline: none;
		}
		a:link {
			text-decoration: underline;
			font-size: 18px;
		}
		a.bold {
			font-weight: bold;
		}
	}
`;
const Actions = styled.div`
	padding: 40px calc(100vw / 25) 90px;
	background-color: #fafafa;
`;
const SignAction = styled.div`
	& > button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 30px;
		line-height: 1.6;
		border: none;
		background: none;
		outline: none;
		div {
			display: flex;
			align-items: center;
			svg {
				margin-right: 10px;
				body[dir="rtl"] & {
					margin-right: 0;
					margin-left: 10px;
				}
			}
			span {
				font-size: 18px;
			}
		}
		&:focus {
			outline: none;
		}
		svg {
			width: 20px;
			height: 20px;
		}
	}
`;
const SignSection = styled.div`
	background-color: #fff;
	margin: 0 calc(-100vw / 25);
	padding: 0 calc(100vw / 25);
	div:first-child {
		padding-top: 16px;
		margin-bottom: 32px;
		font-size: 15px;
	}
	div:last-child {
		display: flex;
		padding-bottom: 16px;
		margin-bottom: 48px;
		button:first-child {
			margin-right: 32px;
			body[dir="rtl"] & {
				margin-right: 0;
				margin-left: 32px;
			}
		}
	}
`;
const LinkAction = styled(Link)`
	display: block;
	font-size: 18px;
	text-decoration: underline;
	text-decoration-thickness: 0.5px;
	display: flex;
	align-items: center;
	margin-bottom: 24px;
	svg {
		width: 20px;
		height: 20px;
		margin-right: 10px;
		body[dir="rtl"] & {
			margin-right: 0;
			margin-left: 10px;
		}
	}
`;
const SubmenuList = styled.ul`
	// We will hide the first level using top: -100%, Cuz it will get a transition.
	[data-submenu-level="1"] {
		transition: 0.7s;
		position: absolute;
		left: 0;
		top: -100%;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	// This is how we will show the first level
	[data-submenu-level="1"].pullFromTop {
		top: 0;
	}
	// We will hide all second levels by display none. Note! We can't transition from display none.
	*[data-submenu-level="2"] {
		display: none;
	}
	*[data-submenu-level="2"] {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
`;

function MobileNavMenu() {
	const {
		t,
		i18n: { language },
	} = useTranslation();
	const [showSignMenu, setShowSignMenu] = useState(false);
	const navigate = useNavigate();
	const { user } = useUser();
	const { signOut } = useSignOut();

	function handleClickToShowFirstLevel(e) {
		// console.log(e.target.dataset.submenuTarget);
		const submenu = document.querySelector(`[data-submenu='${e.currentTarget.dataset.submenuTarget}']`);
		submenu.classList.add("pullFromTop");
	}
	function handleClickToHideFirstLevels() {
		const firstLevelSubmenus = document.querySelectorAll(`[data-submenu-level='1']`);
		firstLevelSubmenus.forEach((submenu) => submenu.classList.remove("pullFromTop"));
	}

	function handleClickToShowSecondLevelBranch(e) {
		if (e.target.dataset.submenuTarget) {
			const submenu = document.querySelector(`[data-submenu="${e.target.dataset.submenuTarget}"]`);
			// console.log(submenu);
			submenu.style.display = "block";
		}
		// incase we clicked on the span or the icon inside the button.
		if (e.target.parentElement.dataset.submenuTarget) {
			const btn = e.target.parentElement;
			const submenu = document.querySelector(`[data-submenu="${btn.dataset.submenuTarget}"]`);
			submenu.style.display = "block";
		}
	}
	function handleClickToGoBackFromSecondLevelBranches(e) {
		if (e.target.classList.contains("backArrow")) {
			const breadcrumbs = e.target.parentElement;
			breadcrumbs.parentElement.style.display = "none";
		}
		// incase we clicked on the pass which is inside the icons. (the arrow itself is a react icon pass)
		if (e.target.parentElement.classList.contains("backArrow")) {
			const backArrow = e.target.parentElement;
			const breadcrumbs = backArrow.parentElement;
			breadcrumbs.parentElement.style.display = "none";
		}
	}

	function handleGoingBackFromBreadcrumbs(e) {
		if (e.target.tagName === "SPAN" && (e.target.textContent === "Home" || e.target.textContent === "الرئيسية")) {
			// close second level branches if one is opened
			const submenues = document.querySelectorAll(`[data-submenu-level="2"]`);
			submenues.forEach((submenu) => (submenu.style.display = "none"));

			// Hide first levels
			handleClickToHideFirstLevels();
		}
		if (
			e.target.tagName === "SPAN" &&
			(e.target.previousElementSibling?.previousElementSibling?.textContent === "Home" ||
				e.target.previousElementSibling?.previousElementSibling?.textContent === "الرئيسية")
		) {
			// close second level branches if one is opened
			const submenues = document.querySelectorAll(`[data-submenu-level="2"]`);
			submenues.forEach((submenu) => (submenu.style.display = "none"));
		}
	}

	function handleCloseAndResetMenuOnClickingOnSomeLink(e) {
		if (e.target.localName === "a") {
			// close second level branches if one is opened
			const submenues = document.querySelectorAll(`[data-submenu-level="2"]`);
			submenues.forEach((submenu) => (submenu.style.display = "none"));
			// close first levels
			handleClickToHideFirstLevels();
			// close mobile nav menu
			document.querySelector(".mobileNavMenuBtn").click();
		}
	}
	return createPortal(
		<StyledNav className="mobileNavMenu notVisible">
			<MenuList>
				<BreadcrumbsHeader>
					<span>{t("home")}</span>
				</BreadcrumbsHeader>
				<MenuItem>
					<button data-submenu-target="1" data-submenu-level="1" onClick={handleClickToShowFirstLevel}>
						<span>{t("newIn")}</span>
						{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
					</button>
				</MenuItem>
				<MenuItem>
					<button data-submenu-target="2" data-submenu-level="1" onClick={handleClickToShowFirstLevel}>
						<span>{t("men")}</span>
						{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
					</button>
				</MenuItem>
				<MenuItem>
					<button data-submenu-target="3" data-submenu-level="1" onClick={handleClickToShowFirstLevel}>
						<span>{t("women")}</span>
						{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
					</button>
				</MenuItem>
				<MenuItem>
					<button data-submenu-target="4" data-submenu-level="1" onClick={handleClickToShowFirstLevel}>
						<span>{t("kids")}</span>
						{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
					</button>
				</MenuItem>
				<MenuItem>
					<button data-submenu-target="5" data-submenu-level="1" onClick={handleClickToShowFirstLevel}>
						<span>{t("lastChance")}</span>
						{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
					</button>
				</MenuItem>
				<Actions>
					<SignAction>
						<button onClick={() => !user && setShowSignMenu((cur) => !cur)} style={user ? { cursor: "default" } : {}}>
							{user ? (
								<>
									<div
										onClick={() => {
											signOut();
											document.querySelector(".mobileNavMenuBtn").click();
										}}
										style={user ? { cursor: "pointer" } : {}}
									>
										<PiUser />
										<span>Log out</span>
									</div>
								</>
							) : (
								<>
									<div>
										<PiUser />
										<span>
											{t("signIn")} / {t("signUp")}
										</span>
									</div>
									{showSignMenu ? <BsChevronUp /> : <BsChevronDown />}
								</>
							)}
						</button>
						{showSignMenu && (
							<SignSection>
								<div>{t("signDetails")}</div>
								<div>
									<Button
										$backgroundColor="#fff"
										color="#292929"
										$border="1px solid #ccc"
										onClick={() => {
											document.querySelector(".mobileNavMenuBtn").click();
											navigate("/login/sign-in", { replace: true });
										}}
									>
										{t("signIn")}
									</Button>
									<Button
										onClick={() => {
											document.querySelector(".mobileNavMenuBtn").click();
											navigate("/login/sign-up", { replace: true });
										}}
									>
										{t("createAnAccount")}
									</Button>
								</div>
							</SignSection>
						)}
					</SignAction>
					<LinkAction to="/order-tracking" onClick={() => document.querySelector(".mobileNavMenuBtn").click()}>
						<PiPackage />
						{t("findYourOrder")}
					</LinkAction>
					<LinkAction to="/FAQ" onClick={() => document.querySelector(".mobileNavMenuBtn").click()}>
						<PiQuestionLight />
						{t("FAQ")}
					</LinkAction>
				</Actions>
			</MenuList>

			<SubmenuList
				onClick={(e) => {
					handleClickToShowSecondLevelBranch(e);
					handleClickToGoBackFromSecondLevelBranches(e);
					handleGoingBackFromBreadcrumbs(e);
					handleCloseAndResetMenuOnClickingOnSomeLink(e);
				}}
			>
				<li data-submenu="1" data-submenu-level="1">
					<MenuList>
						<BreadcrumbsHeader>
							<BsArrowLeft onClick={handleClickToHideFirstLevels} />
							<span>{t("home")}</span>
							<span>/</span>
							<span>{t("newIn")}</span>
						</BreadcrumbsHeader>
						<MenuItem>
							<button>
								<Link to="/new-in" className="bold">
									{t("seeAllTheNewIn")}
								</Link>
							</button>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="1.1">
								<span>{t("men")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="1.1" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("newIn")}</span>
									<span>/</span>
									<span>{t("men")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/new-in/men" className="bold">
											{t("seeAllNewInMen")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/men/clothing">{t("clothing")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/men/shoes">{t("shoes")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/men/leather-goods">{t("bagsAndSmallLeatherGoods")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/men/accessories">{t("accessories")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="1.2">
								<span>{t("women")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="1.2" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("newIn")}</span>
									<span>/</span>
									<span>{t("women")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/new-in/women" className="bold">
											{t("seeAllNewInWomen")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/women/clothing">{t("clothing")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/women/shoes">{t("shoes")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/new-in/women/leather-goods">{t("bagsAndSmallLeatherGoods")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
					</MenuList>
				</li>
				<li data-submenu="2" data-submenu-level="1">
					<MenuList>
						<BreadcrumbsHeader>
							<BsArrowLeft onClick={handleClickToHideFirstLevels} />
							<span>{t("home")}</span>
							<span>/</span>
							<span>{t("men")}</span>
						</BreadcrumbsHeader>
						<MenuItem>
							<button data-submenu-target="2.1">
								<span>{t("clothing")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="2.1" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("men")}</span>
									<span>/</span>
									<span>{t("clothing")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/men/clothing" className="bold">
											{t("seeAllMenClothing")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/polo-shirts">{t("poloshirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/t-shirts">{t("tShirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/shirts">{t("shirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/sweatshirts">{t("sweatshirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/jackets-and-coats">{t("jacketsAndCoats")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/trousers-and-shorts">{t("trousersAndShorts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/clothing/swimwear">{t("swimwear")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="2.2">
								<span>{t("shoes")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="2.2" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("men")}</span>
									<span>/</span>
									<span>{t("shoes")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/men/shoes" className="bold">
											{t("seeAllMenShoes")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/shoes/sneakers">{t("sneakers")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/shoes/sliders-and-sandals">{t("slidersAndSandals")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/shoes/socks">{t("socks")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="2.3">
								<span>{t("accessories")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="2.3" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("men")}</span>
									<span>/</span>
									<span>{t("accessories")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/men/accessories" className="bold">
											{t("seeAllMenAccessories")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/accessories/caps-and-hats">{t("capsAndHats")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/accessories/belts">{t("belts")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="2.4">
								<span>{t("leatherGoods")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="2.4" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("men")}</span>
									<span>/</span>
									<span>{t("leatherGoods")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/men/leather-goods" className="bold">
											{t("seeAllMenLeatherGoods")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/leather-goods/bags">{t("bags")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/leather-goods/wallets-and-small-leather-goods">{t("walletsAndSmallLeatherGoods")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/men/leather-goods/business-and-laptop-bags">{t("businessAndLaptopBags")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
					</MenuList>
				</li>
				<li data-submenu="3" data-submenu-level="1">
					<MenuList>
						<BreadcrumbsHeader>
							<BsArrowLeft onClick={handleClickToHideFirstLevels} />
							<span>{t("home")}</span>
							<span>/</span>
							<span>{t("women")}</span>
						</BreadcrumbsHeader>
						<MenuItem>
							<button data-submenu-target="3.1">
								<span>{t("clothing")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="3.1" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("women")}</span>
									<span>/</span>
									<span>{t("clothing")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/women/clothing" className="bold">
											{t("seeAllWomenClothing")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/clothing/polo-shirts">{t("poloshirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/clothing/t-shirts">{t("tShirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/clothing/shirts">{t("shirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/clothing/dresses-and-skirts">{t("dressesAndSkirts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/clothing/trousers-and-shorts">{t("trousersAndShorts")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/clothing/sweatshirts">{t("sweatshirts")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="3.2">
								<span>{t("shoes")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="3.2" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("women")}</span>
									<span>/</span>
									<span>{t("shoes")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/women/shoes" className="bold">
											{t("seeAllWomenShoes")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/shoes/sneakers">{t("sneakers")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/shoes/flipflops-and-sandals">{t("flipflopsAndSandals")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="3.3">
								<span>{t("leatherGoods")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="3.3" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("women")}</span>
									<span>/</span>
									<span>{t("leatherGoods")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/women/leather-goods" className="bold">
											{t("seeAllWomenLeatherGoods")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/leather-goods/tote-bags">{t("toteBags")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/leather-goods/shoulder-bags">{t("shoulderBags")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/women/leather-goods/wallets-and-small-leather-goods">{t("walletsAndSmallLeatherGoods")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
					</MenuList>
				</li>
				<li data-submenu="4" data-submenu-level="1">
					<MenuList>
						<BreadcrumbsHeader>
							<BsArrowLeft onClick={handleClickToHideFirstLevels} />
							<span>{t("home")}</span>
							<span>/</span>
							<span>{t("kids")}</span>
						</BreadcrumbsHeader>
						<MenuItem>
							<button data-submenu-target="4.1">
								<span>{t("babiesMonths")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="4.1" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("kids")}</span>
									<span>/</span>
									<span>{t("babiesMonths")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/kids/babies" className="bold">
											{t("seeAllKidsBabiesMonths")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/babies/clothing">{t("clothing")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/babies/shoes">{t("shoes")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/babies/accessories">{t("accessories")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="4.2">
								<span>{t("childrenYears")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="4.2" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("kids")}</span>
									<span>/</span>
									<span>{t("childrenYears")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/kids/children" className="bold">
											{t("seeAllKidsChildrenYears")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/children/clothing">{t("clothing")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/children/shoes">{t("shoes")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/children/accessories">{t("accessories")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
						<MenuItem>
							<button data-submenu-target="4.3">
								<span>{t("teenYears")}</span>
								{language === "ar" ? <BsChevronLeft /> : <BsChevronRight />}
							</button>
							<SubmenuList data-submenu="4.3" data-submenu-level="2">
								<BreadcrumbsHeader>
									<BsArrowLeft className="backArrow" />
									<span>{t("home")}</span>
									<span>/</span>
									<span>{t("kids")}</span>
									<span>/</span>
									<span>{t("teenYears")}</span>
								</BreadcrumbsHeader>
								<MenuItem>
									<button>
										<Link to="/kids/teen" className="bold">
											{t("seeAllKidsTeenYears")}
										</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/teen/clothing">{t("clothing")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/teen/shoes">{t("shoes")}</Link>
									</button>
								</MenuItem>
								<MenuItem>
									<button>
										<Link to="/kids/teen/accessories">{t("accessories")}</Link>
									</button>
								</MenuItem>
							</SubmenuList>
						</MenuItem>
					</MenuList>
				</li>
				<li data-submenu="5" data-submenu-level="1">
					<MenuList>
						<BreadcrumbsHeader>
							<BsArrowLeft onClick={handleClickToHideFirstLevels} />
							<span>{t("home")}</span>
							<span>/</span>
							<span>{t("lastChance")}</span>
						</BreadcrumbsHeader>
						<MenuItem>
							<button>
								<Link to="/last-chance/men">{t("men")}</Link>
							</button>
						</MenuItem>
						<MenuItem>
							<button>
								<Link to="/last-chance/women">{t("women")}</Link>
							</button>
						</MenuItem>
						<MenuItem>
							<button>
								<Link to="/last-chance/kids">{t("kids")}</Link>
							</button>
						</MenuItem>
					</MenuList>
				</li>
			</SubmenuList>
		</StyledNav>,
		document.body
	);
}

export default MobileNavMenu;
