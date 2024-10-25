import styled from "styled-components";
import { PiCheckThin, PiList, PiMagnifyingGlassThin, PiMapPinLight, PiX, PiXThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsHandbag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { TbBuildingWarehouse } from "react-icons/tb";
import { useUser } from "../features/Authentication/useUser";
import { useSignOut } from "../features/Authentication/useSignOut";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import { useUserInfo } from "../contexts/UserInfoContext";
import SummaryItem from "../ui/SummaryItem";
import Spinner from "../ui/Spinner";
import { useAllProducts } from "../features/Products/useAllProducts";
const StyledInnerHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 60px;
	padding: 0 calc(100vw / 25); // instead of making a container.
	position: relative;
	z-index: 1000;
	@media (min-width: 1024px) {
		padding-top: 10px;
	}
	@media (max-width: 768px) {
		flex-wrap: wrap;
		padding: 8px 15px 17px 15px;
	}
	transition: 0.4s;
`;
const IconsList = styled.ul`
	display: flex;
	align-items: center;
	margin-left: 32px;
	body[dir="rtl"] & {
		margin-left: 0;
		margin-right: 32px;
	}

	@media (max-width: 768px) {
		order: 2;
		margin-left: 0;

		body[dir="rtl"] & {
			margin-right: 0;
		}
	}
`;
const IconItem = styled.li`
	margin-right: 20px;
	body[dir="rtl"] & {
		margin-right: 0;
		margin-left: 20px;
	}
	height: 20px;
	svg {
		width: 20px;
		height: 20px;
	}

	a:focus {
		outline: none;
	}
	// hide the burger icon starting from width 1024px, we will show a nav instead in this large screen.
	&:last-child {
		@media (min-width: 1024px) {
			display: none;
		}
	}
	&.bag {
		position: relative;
		@media (min-width: 1024px) {
			padding-left: 20px;
			border-left: 2px solid #eee;
			body[dir="rtl"] & {
				padding-left: 0;
				border-left: none;
				padding-right: 20px;
				border-right: 2px solid #eee;
			}
		}
		span {
			position: absolute;
			top: -7px;
			right: -7px;
			body[dir="rtl"] & {
				right: auto;
				left: -7px;
			}
			background-color: black;
			color: #fff;
			width: 13px;
			height: 13px;
			font-size: 9px;
			line-height: 13px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	span {
		cursor: pointer;
	}
	&.lang span {
		@media (min-width: 1025px) {
			pointer-events: none;
		}
	}
	&.lang:hover .langMenu {
		@media (min-width: 1025px) {
			height: 400px;
			opacity: 1;
			visibility: visible;
		}
	}
	&.user:hover .userMenu {
		@media (min-width: 1025px) {
			height: 352px;
			opacity: 1;
			visibility: visible;
		}
	}
`;
const Logo = styled.div`
	padding: 13px 10px 10px;
	margin-right: 20px;
	body[dir="rtl"] & {
		margin-right: 0;
		margin-left: 20px;
	}
	& img {
		display: block;
		width: 150px;
		aspect-ratio: 2419/373;
	}
	& img:last-child {
		display: none;
		width: 50px;
		aspect-ratio: 1900/ 1425;
	}
	& a:focus {
		outline: none;
	}
	@media (max-width: 768px) {
		order: 1;
		padding: 5px;
		margin-right: 0;
		body[dir="rtl"] & {
			margin-left: 0;
		}
		& img:first-child {
			display: none;
		}
		& img:last-child {
			display: block;
		}
	}
`;
const Form = styled.form`
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	& svg {
		position: absolute;
		left: 10px;
		body[dir="rtl"] & {
			right: 10px;
			left: auto;
		}
		width: 25px;
		height: 25px;
		color: #a9a9a9;
		cursor: pointer;
	}
	& input {
		width: 100%;
		padding: 1px 26px 1px 48px;
		body[dir="rtl"] & {
			padding: 1px 48px 1px 26px;
		}
		background-color: #f4f4f4;
		border-radius: 800px;
		border: none;
		height: 39px;
		&::placeholder {
			color: #a9a9a9;
		}
		&:focus {
			outline: none;
		}
	}
	@media (max-width: 768px) {
		order: 3;
		margin-top: 5px;
		&.hidden {
			display: none;
		}
		&.visible {
			display: flex;
		}
	}
`;
const SearchResults = styled.div`
	position: absolute;
	left: 0;
	top: 110%;
	&.hasNoResults {
		background-color: #eee;
		border-radius: 8px;
	}
	border-radius: 20px;
	padding: 10px;
	overflow: hidden;
	width: 100%;
	background-color: #fafafa;
	height: fit-content;
	max-height: 300px;
	::-webkit-scrollbar {
		display: none;
	}
	& > div {
		max-height: 300px;
		overflow: auto;
		& > b {
			display: block;
			width: fit-content;
			&.link {
				cursor: pointer;
				margin-bottom: 10px;
				&:hover {
					text-decoration: underline;
				}
			}
		}
		& > div {
			body[dir="rtl"] & > div {
				padding-right: 16px;
				padding-left: 0;
			}
		}
		& > div {
			cursor: pointer;
			border-radius: 8px;
			margin-bottom: 10px;
			padding: 10px;
			border-bottom: 1px solid #e5e5e5;
			transition: 0.3s;
			&:hover {
				background-color: #f5f5f5;
			}
		}
		& > div:last-child {
			margin-bottom: 20px;
			padding-bottom: 0;
			border: none;
		}
	}
`;
const IconMenu = styled.div`
	position: fixed;
	z-index: 2000;
	right: 0;
	body[dir="rtl"] & {
		right: auto;
		left: 0;
	}
	top: 100px;
	background-color: #fff;
	box-shadow: 0 0 3px #e5e5e5;
	transition: 0.4s;
	width: 42%;
	padding: 0 15px;
	&.userMenu {
		width: 33%;
		padding: 12px 0 0;
	}
	height: 0px;
	opacity: 0;
	visibility: hidden;
	@media (max-width: 1024px) {
		transition: none;
		&.clicked {
			width: 100%;
			height: 100dvh;
			visibility: visible;
			opacity: 1;
			top: 0;
		}
	}
`;
const LangContent = styled.div`
	padding: 24px 0 0 24px;
	body[dir="rtl"] & {
		padding: 24px 24px 0 0;
	}
	width: 60%;
	& > div:first-child {
		padding-left: 24px;
		body[dir="rtl"] & {
			padding-left: 0;
			padding-right: 24px;
		}
		display: flex;
		justify-content: space-between;
		svg {
			cursor: pointer;
			@media (min-width: 1025px) {
				display: none;
			}
		}
		p {
			font-size: 18px;
			text-transform: capitalize;
			color: #292929;
			margin: 22px 0 22px;
			font-family: "Metropolis", Arial, Helvetica, sans-serif;
		}
	}
	& > div:last-child {
		padding-left: 24px;
		body[dir="rtl"] & {
			padding-left: 0;
			padding-right: 24px;
		}
		a {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 26px;
			font-size: 12px;
			svg {
				width: 20px;
				height: 20px;
				display: none;
			}
			svg.active {
				display: block;
			}
		}
	}
	@media (max-width: 1024px) {
		width: 100%;
		& > div {
			width: 63%;
			margin: 0 auto;
		}
		& > div:first-child {
			border-bottom: 1px solid #ccc;
			padding: 0 15px;
			p {
				margin: 4px 0 16px;
				font-size: 13px;
			}
			svg {
				width: 20px;
				height: 20px;
				margin-top: 5px;
			}
		}
		& > div:last-child {
			padding-left: 45px;
			body[dir="rtl"] & {
				padding-left: 0;
				padding-right: 45px;
			}
			padding-top: 35px;
			a {
				width: 58%;
			}
		}
	}
`;
const UserContent = styled.div`
	color: #191919;
	font-family: metropolis, Arial, Helvetica, sans-serif;
	text-transform: capitalize;
	letter-spacing: 0.7px;
	word-spacing: 2px;

	div:first-child {
		padding: 40px;
		border-bottom: 1px solid #e5e5e5;
		p:first-child {
			display: flex;
			align-items: center;
			font-weight: 400;
			line-height: 20px;
			svg {
				width: 22px;
				height: 22px;
				margin: 0 10px;
			}
			margin-bottom: 20px;
			font-size: 18px;
		}
		button {
			margin-bottom: 14px;
			padding: 0 30px;
		}
		p:last-of-type {
			font-size: 15px;
			line-height: 25px;
			font-weight: 400;
			a {
				text-decoration: underline;
				margin-left: 4px;
				body[dir="rtl"] & {
					margin-left: 0;
					margin-right: 4px;
				}
			}
		}
	}
	div:last-child {
		padding: 30px 40px;
		a {
			display: flex;
			align-items: center;
			line-height: 25px;
			font-size: 15px;
			svg {
				width: 25px;
				height: 25px;
				margin: 0 10px;
				stroke-width: 1px;
			}
		}
	}

	div.existingUser {
		padding: 40px 54px 54px;
		word-spacing: normal;
		letter-spacing: normal;
		border-bottom: none;
		h2 {
			font-weight: 500;
			font-size: 18px;
			margin-bottom: 20px;
		}
		hr {
			border: none;
			border-top: 1px solid #d4d4d5;
			margin: 16px 0;
		}
		a {
			font-size: 15px;
			line-height: 28px;
			font-weight: 400;
			text-transform: none;
			text-decoration: underline;
			margin-bottom: 20px;
		}
		button {
			background-color: #343a40;
			padding: 12px 30px;
			font-size: 12px;
			height: 40px;
			line-height: 16px;
			letter-spacing: 1.2px;
			margin-bottom: 0;
			&:hover {
				color: #fff;
				border: none;
				background-color: #23272b;
			}
		}
	}
`;

function InnerHeader() {
	const { t } = useTranslation();
	const location = useLocation();
	const [searchQuery, setSearchQuery] = useState("");
	const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);
	const navigate = useNavigate();
	const { nItems } = useUserInfo();
	const { user } = useUser();
	const { signOut, isSigningOut } = useSignOut();
	const { firstName } = user && user.user_metadata ? user.user_metadata : "";
	const {
		i18n: { changeLanguage, language },
	} = useTranslation();
	const { allProducts, isGettingAllProducts } = useAllProducts("", searchQuery);
	// hide search bar while scrolling on mobile.
	useEffect(function () {
		function action() {
			if (window.scrollY >= 0.00000001) document.querySelector(".search").classList.replace("visible", "hidden");
			else document.querySelector(".search").classList.replace("hidden", "visible");
		}
		document.addEventListener("scroll", action);
		return () => document.removeEventListener("scroll", action);
	}, []);

	useEffect(
		function () {
			if (location.pathname !== "/") {
				changeLanguage("en");
			}
		},
		[location, changeLanguage]
	);

	function handleMobileNavMenu(e) {
		window.scrollTo({ top: 0 });

		// incase it's closed and we click, we need to open it.
		if (showMobileNavMenu === false && e?.currentTarget?.className?.includes("mobileNavMenuBtn")) {
			document.body.style.overflow = "hidden";
			document.querySelector(".mobileNavMenu").classList.replace("notVisible", "visible");
			setShowMobileNavMenu(true);
		} else {
			document.body.style.overflow = "auto";
			document.querySelector(".mobileNavMenu").classList.replace("visible", "notVisible");
			// reset by hiding all first levels and second levels.
			// second levels
			const submenues = document.querySelectorAll(`[data-submenu-level="2"]`);
			submenues.forEach((submenu) => (submenu.style.display = "none"));
			// first levels
			const firstLevelSubmenus = document.querySelectorAll(`[data-submenu-level='1']`);
			firstLevelSubmenus.forEach((submenu) => submenu.classList.remove("pullFromTop"));
			setShowMobileNavMenu(false);
		}
	}
	return (
		<StyledInnerHeader
			onLoad={() =>
				language === "ar" && window.location.href === "https://lacoste-shehab.netlify.app/"
					? document.body.setAttribute("dir", "rtl")
					: document.body.setAttribute("dir", "ltr")
			}
		>
			<Logo>
				<Link to="/">
					<img src="/logo.png" alt="logo" />
					<img src="/logo-mini.png" alt="logo" />
				</Link>
			</Logo>

			<Form
				className="search visible"
				onSubmit={(e) => {
					e.preventDefault();
					navigate(`/demandware?query=${searchQuery}`);
				}}
			>
				<PiMagnifyingGlassThin onClick={() => navigate(`/demandware?query=${searchQuery}`)} />
				<input
					type="search"
					id="searchQuery"
					autoComplete="off"
					placeholder={t("search")}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				{searchQuery.length > 0 && (
					<SearchResults className={allProducts?.length ? "" : "hasNoResults"}>
						<div>
							<>
								{allProducts?.length > 0 ? (
									<b onClick={() => navigate(`/demandware/?query=${searchQuery}`)} className="link">
										See {allProducts?.length} results
									</b>
								) : (
									<b>No results found</b>
								)}
							</>
							{isGettingAllProducts ? (
								<Spinner />
							) : (
								allProducts?.slice(0, 8).map((product) => (
									<SummaryItem
										key={`${product.id}`}
										onClick={() => {
											navigate(
												`/${product.mainCategory}/${product.subCategory}/${product.lateralCategory}/${product.id}?productModel=${
													product.model
												}&productColor=${product.color.replaceAll("/", "-")}&productSize=${product.sizes[0]}&nModel=${
													allProducts.filter((prod) => prod.model === product.model)?.length
												}`
											);
											setSearchQuery("");
											window.scrollTo({ top: 0 });
										}}
									>
										<img src={product.images.srcs[0]} alt="clothing item" />
										<div>
											<div>{product.model}</div>
											<div>{product.color}</div>
											<div>
												<span className="pricing">
													<span>{product.price} EGP</span>
													{product.salesPercent > 0 && <span>{product.price - product.price * (product.salesPercent / 100)} EGP</span>}
												</span>
											</div>
										</div>
									</SummaryItem>
								))
							)}
						</div>
					</SearchResults>
				)}
			</Form>

			<IconsList>
				<IconItem className="lang">
					<span
						onClick={() => {
							document.querySelector(".langMenu").classList.toggle("clicked");
							handleMobileNavMenu();
						}}
					>
						{language === "ar" ? "AR" : "EN"}
					</span>
					<IconMenu className="langMenu">
						<LangContent>
							<div>
								<p>Select your language</p>
								<PiXThin onClick={() => document.querySelector(".langMenu").classList.remove("clicked")} />
							</div>
							<div>
								<Link
									to={`${window.location.href}`}
									onClick={() => {
										window.location.href === "https://lacoste-shehab.netlify.app/" && changeLanguage("en");

										window.location.href === "https://lacoste-shehab.netlify.app/" && document.body.setAttribute("dir", "ltr");
									}}
								>
									<div>English</div>
									<PiCheckThin className={language === "ar" ? "" : "active"} />
								</Link>
								<Link
									to={`${window.location.href}`}
									onClick={() => {
										window.location.href === "https://lacoste-shehab.netlify.app/"
											? changeLanguage("ar")
											: window.alert("Sorry! I provided translation in the home page only");
										window.location.href === "https://lacoste-shehab.netlify.app/" && document.body.setAttribute("dir", "rtl");
									}}
								>
									<div>العربية</div>
									<PiCheckThin className={language === "ar" ? "active" : ""} />
								</Link>
							</div>
						</LangContent>
					</IconMenu>
				</IconItem>

				<IconItem>
					<Link to="/stores">
						<PiMapPinLight />
					</Link>
				</IconItem>

				<IconItem className="user">
					<Link to={user ? "/account/dashboard" : "/login/sign-in"}>
						<FaRegUser style={{ width: "16px", height: "16px", marginTop: "2px" }} />
					</Link>
					<IconMenu className="userMenu">
						<UserContent>
							{!user ? (
								<>
									<div>
										<p>
											<FaRegUser /> {t("myAccount")}
										</p>
										<Button
											onClick={() => {
												navigate("/login/sign-in");
												window.scroll({ left: 0, top: 0 });
											}}
										>
											{t("signIn")}
										</Button>
										<p>
											{t("notACustomerYet?")}
											<Link to="/login/sign-up">{t("createAnAccount")}</Link>
										</p>
									</div>
									<div>
										<Link to="/order-tracking">
											<TbBuildingWarehouse />
											{t("lookingForAGuestCheckourOrder?")}
										</Link>
									</div>
								</>
							) : (
								<div className="existingUser">
									<h2>
										{t("hello")} {firstName}
									</h2>
									<hr />
									<Link to="/account/profile-and-preferences">{t("myProfile")}</Link>
									<Link to="/account/my-orders">{t("myOnlineOrders")}</Link>
									<Link to="/account/help-and-contact">{t("customerService")}</Link>
									<Button onClick={() => signOut()} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
										{isSigningOut ? (
											<>
												<span>Loging Out</span>
												<SpinnerMini style={{ marginRight: "0", marginTop: "-6px" }} />
											</>
										) : (
											"LOG OUT"
										)}
									</Button>
								</div>
							)}
						</UserContent>
					</IconMenu>
				</IconItem>

				<IconItem className="bag">
					<Link to="/checkout">
						<BsHandbag />
						<span>{nItems}</span>
					</Link>
				</IconItem>

				<IconItem onClick={handleMobileNavMenu} className="mobileNavMenuBtn">
					<span>{showMobileNavMenu ? <PiX /> : <PiList />}</span>
				</IconItem>
			</IconsList>
		</StyledInnerHeader>
	);
}

export default InnerHeader;
