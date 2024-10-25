import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTumblr, FaTwitter, FaYoutube } from "react-icons/fa";
import { PiArrowCounterClockwiseThin, PiChatCircleTextThin, PiCreditCardThin, PiHeadsetThin, PiHeart, PiTruckThin, PiX } from "react-icons/pi";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledFooter = styled.footer`
	hr {
		border: none;
		border-top: solid 1px #e5e5e5;
	}
	a:hover {
		transition: 0.3s;
		color: green;
	}
`;
const FooterButtonArea = styled.div`
	padding: 0 32.5px;
	@media (min-width: 1024px) {
		padding: 0 82px;
	}
	@media (min-width: 1280px) {
		padding: 0 153px;
	}
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	color: #292929;
	button {
		display: block;
		font-size: 14px;
		height: 115px;
		border: none;
		outline: none;
		&:focus {
			outline: none;
		}
		background-color: #fff;
		font-weight: normal;
		svg {
			width: 30px;
			height: 30px;
			pointer-events: none;
		}
	}
`;
const Layout = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: -2;
	opacity: 0;
	transition: 0.3s;
	&.visible {
		opacity: 1;
		z-index: 9999999;
		div:first-child {
			transform: translate(-50%, -35%);
			body[dir="rtl"] & {
				transform: translate(50%, -35%);
				@media (max-width: 768px) {
					transform: none;
					top: 0;
				}
			}
			@media (max-width: 768px) {
				transform: none;
				top: 0;
			}
		}
	}
`;
const Popup = styled.div`
	position: relative;
	top: 30%;
	left: 50%;
	body[dir="rtl"] & {
		left: auto;
		right: 50%;
	}
	width: 40%;
	transition: 0.3s;
	text-align: justify;
	background-color: #fff;
	transform: translate(-50%, -50%);
	body[dir="rtl"] & {
		transform: translate(50%, -50%);
	}
	padding: 60px 40px 40px;
	@media (max-width: 768px) {
		width: 100%;
		height: 100%;
		left: 0;
		top: -20%;
		transform: none;
		body[dir="rtl"] & {
			left: auto;
			right: 0;
			transform: none;
		}
	}

	svg {
		position: absolute;
		right: 20px;
		top: 20px;
		body[dir="rtl"] & {
			right: auto;
			left: 20px;
		}
		width: 17px;
		height: 17px;
		color: #494545;
		&:hover {
			color: #000;
		}
		cursor: pointer;
		path {
			pointer-events: none;
		}
	}
	div {
		color: #292929;
		font-size: 18px;
		line-height: 28px;
	}
	hr {
		margin: 20px 0;
	}
	p {
		margin-top: 0;
		margin-bottom: 16px;
		color: #555555;
	}
`;
const FooterMiddleSection = styled.div`
	padding: 41px 15px 0;
	background-color: #f4f4f4;
	display: flex;
	flex-wrap: wrap;
	.col1 {
		/* padding: 0 15px; */

		@media (max-width: 992px) {
			flex: 0 0 100%;
		}
		@media (min-width: 992px) {
			flex: 0 0 50%;
		}
		@media (min-width: 1024px) {
			flex: 0 0 33.33333%;
		}
		.signUp {
			padding: 0 15px;
			@media (max-width: 992px) {
				border-bottom: 0.3px solid #e5e5e5;
				padding-bottom: 26px;
				form {
					margin-bottom: 15px;
				}
			}
			div {
				padding: 16px 0;
			}
			form {
				display: flex;
				margin-bottom: 20px;
				input {
					padding: 4px 8% 4px 14px;
					height: 44px;
					border-radius: 30px;
					border: 1px solid #d3d4d5;
					letter-spacing: 0.5px;
					margin-right: 15px;
					body[dir="rtl"] & {
						margin-right: 0;
						margin-left: 15px;
					}
					outline: none;
					width: 70%;
				}
				Button {
					padding: 12px 30px;
					line-height: 17px;
					a {
						&:hover {
							color: #fff;
						}
					}
				}
			}
			.socialMedia {
				display: flex;
				width: 85%;
				max-width: 395px;
				justify-content: space-around;
				padding-top: 29px;
				margin: auto;
				color: #191919;
				svg {
					width: 18px;
					height: 18px;
				}
			}
		}
		.findBoutique {
			@media (max-width: 1024px) {
				display: none;
			}
			padding: 30px 15px 0 15px;
			div {
				color: #545454;
				font-size: 10px;
				padding-bottom: 16px;
				letter-spacing: 2px;
				font-weight: bold;
			}
			&:last-child {
				max-width: 504px;
			}
		}
	}
	.col2 {
		padding: 0 15px 0 50px;
		@media (max-width: 992px) {
			flex: 0 0 50%;
			padding: 38px 15px 0;
		}
		@media (min-width: 992px) {
			flex: 0 0 25%;
		}
		.about {
			margin-left: 16.6%;
			body[dir="rtl"] & {
				margin-left: 0;
				margin-right: 16.6%;
			}
			color: #545454;
			div {
				margin-bottom: 16px;
				font-size: 10px;
				font-weight: bold;
				letter-spacing: 1.5px;
				line-height: 44.8px;
			}
			ul {
				color: #191919;
				font-size: 13px;
				li {
					margin-bottom: 15px;
					line-height: 1.15;
				}
			}
		}
	}
	.col3 {
		@media (max-width: 992px) {
			flex: 0 0 50%;
			padding-top: 38px;
		}
		@media (min-width: 992px) {
			flex: 0 0 25%;
		}
		@media (min-width: 1024px) {
			flex: 0 0 16.66667%;
		}
		color: #545454;
		.categories {
			padding-left: 30px;
			body[dir="rtl"] & {
				padding-left: 0;
				padding-right: 30px;
			}
			div {
				margin-bottom: 16px;
				font-size: 10px;
				font-weight: bold;
				letter-spacing: 1.5px;
				line-height: 44.8px;
			}
			ul {
				color: #292929;
				font-size: 13px;
				line-height: 1.15;
				li {
					margin-bottom: 15px;
				}
			}
		}
	}
	.col4 {
		@media (min-width: 1024px) {
			flex: 0 0 25%;
			max-width: 25%;
		}
		@media (max-width: 1024px) {
			display: none;
		}

		padding: 0 15px 19px;
		color: #545454;
		.help {
			max-width: 66.66667%;
			div:first-child {
				margin-bottom: 4.5px;
				font-size: 10px;
				font-weight: bold;
				letter-spacing: 1.5px;
				line-height: 44.8px;
			}
			div:last-child {
				p {
					font-size: 11px;
					margin: 4px 0 20px;
				}
				a {
					display: block;
					line-height: 30.4px;
					font-size: 10px;
				}
				a:last-of-type {
					font-size: 13px;
					color: #191919;
				}
				div {
					line-height: 30.4px;
					font-size: 10px;
				}
			}
		}
	}
`;
const FooterLogo = styled.div`
	border-top: 1px solid #e5e5e5;
	display: flex;
	justify-content: center;
	padding: 70px 40px;
	@media (max-width: 768px) {
		padding: 70px 20px;
	}
	background-color: #f4f4f4;
	p {
		font-size: 10px;
		margin-bottom: 15px;
		text-align: center;
		color: #545454;
		letter-spacing: 1.5px;
		line-height: 44.8px;
		font-weight: bold;
	}
	ul {
		display: flex;
		flex-flow: row wrap;
		li {
			background-color: #f4f4f4;
			width: 60px;
			margin: 0 10px;
			&:last-child {
				margin-top: 15px;
				margin-left: 12px;
				body[dir="rtl"] & {
					margin-left: 0;
					margin-right: 12px;
				}
				width: 70px;
				height: 29px;
			}
			img {
				max-width: 100%;
			}
		}
	}
`;
const Copyright = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 10px;
	font-size: 14px;
	direction: ltr;
	@media (max-width: 445px) {
		font-size: 9px;
		padding: 10px 0;
	}
	letter-spacing: 2px;
	text-transform: uppercase;
	color: black;
	font-family: "archivo";
	svg {
		margin: 0 5px;
		width: 20px;
		height: 20px;
		@media (max-width: 445px) {
			width: 15px;
			height: 15px;
		}
	}
`;

function Footer() {
	const {
		t,
		i18n: { changeLanguage },
	} = useTranslation();
	const location = useLocation();
	const [footerEmail, setFooterEmail] = useState("");
	const navigate = useNavigate();
	useEffect(
		function () {
			if (location.pathname !== "/") {
				changeLanguage("en");
			}
		},
		[location, changeLanguage]
	);
	function handleShowPopup(e) {
		if (e.target.tagName === "BUTTON") {
			document.body.style.overflow = "hidden";
			e.target.nextSibling.classList.add("visible");
		}
	}
	function handleClosePopup(e) {
		e.target.parentElement.parentElement.classList.remove("visible");
		document.body.style.overflow = "auto";
	}
	//Everything outside the popup is the layout
	function handleClosePopupFromLayout(e) {
		if (e.target.classList.contains("visible")) {
			e.target.classList.remove("visible");
			document.body.style.overflow = "auto";
		}
	}

	return (
		<StyledFooter>
			<hr />
			<FooterButtonArea
				onClick={(e) => {
					handleShowPopup(e);
					handleClosePopupFromLayout(e);
				}}
			>
				<button>
					<PiArrowCounterClockwiseThin />
					{t("freeReturns")}
				</button>
				<Layout>
					<Popup>
						<PiX onClick={handleClosePopup} />
						<div>{t("returnToUsForFree")}</div>
						<hr />
						<p>
							{t("returnToUsForFreeDetails1")} <br /> <br />
							{t("returnToUsForFreeDetails2")} <br /> <br />
							{t("returnToUsForFreeDetails3")}
						</p>
					</Popup>
				</Layout>
				<button>
					<PiCreditCardThin />
					{t("securePayment")}
				</button>
				<Layout>
					<Popup>
						<PiX onClick={handleClosePopup} />
						<div>{t("weKeepYourDetailsSafe")}</div>
						<hr />
						<p>{t("weKeepYourDetailsSafeDetails")}</p>
					</Popup>
				</Layout>
				<button>
					<PiHeadsetThin />
					{t("customerService")}
				</button>
				<Layout>
					<Popup>
						<PiX onClick={handleClosePopup} />
						<div>{t("needAssistance")}</div>
						<hr />
						<p>
							{t("needAssistanceDetails1")} <br /> <br />
							{t("needAssistanceDetails2")}
						</p>
					</Popup>
				</Layout>
				<button>
					<PiChatCircleTextThin /> {t("sendFeedback")}
				</button>
				<Layout>
					<Popup>
						<PiX onClick={handleClosePopup} />
						<div>{t("weCareAboutYourFeedback")}</div>
						<hr />
						<p>
							{t("returnToUsForFreeDetails1")} <br /> <br />
							{t("returnToUsForFreeDetails2")} <br /> <br />
							{t("returnToUsForFreeDetails3")}
						</p>
					</Popup>
				</Layout>
				<button>
					<PiTruckThin /> {t("freeDelivery")}
				</button>
				<Layout>
					<Popup>
						<PiX onClick={handleClosePopup} />
						<div>{t("freeDelivery")}</div>
						<hr />
						<p>
							{t("freeDeliveryDetails1")} <br /> <br /> {t("freeDeliveryDetails2")}
						</p>
					</Popup>
				</Layout>
			</FooterButtonArea>
			<FooterMiddleSection>
				<div className="col1">
					<div className="signUp">
						<div>{t("lacosteNewsLetter")}</div>
						<form onSubmit={(e) => e.preventDefault()}>
							<input
								type="email"
								name="fEmail"
								autoComplete="true"
								id="fEmail"
								placeholder={t("yourEmailAddress")}
								value={footerEmail}
								onChange={(e) => setFooterEmail(e.target.value)}
							/>
							<Button color="#292929" $backgroundColor="#fff" onClick={() => window.scrollTo({ top: 0 })}>
								<Link to="/login/sign-up" state={{ preTakenEmail: footerEmail }}>
									{t("signUp")}
								</Link>
							</Button>
						</form>
						<ul className="socialMedia">
							<li>
								<a href="https://www.instagram.com/lacoste/">
									<FaInstagram />
								</a>
							</li>
							<li>
								<a href="https://www.facebook.com/Lacoste.Middle.East/">
									<FaFacebookF />
								</a>
							</li>
							<li>
								<a href="https://twitter.com/LACOSTE">
									<FaTwitter />
								</a>
							</li>
							<li>
								<a href="https://www.pinterest.fr/lacoste/">
									<FaPinterestP />
								</a>
							</li>
							<li>
								<a href="https://lacoste.tumblr.com/?_gl=1*1ljnlkr*_ga*OTU1NTQzNTEyLjE3MTQxMDIwODQ.*_ga_FLTV4SJ81X*MTcxNDQ1MzAwOC41LjEuMTcxNDQ5MjQ2My4xMC4wLjA.">
									<FaTumblr />
								</a>
							</li>
							<li>
								<a href="https://www.youtube.com/user/lacosteofficial">
									<FaYoutube />
								</a>
							</li>
						</ul>
					</div>
					<div className="findBoutique">
						<div>{t("5storesInEgypt")}</div>
						<Button color="#292929" $backgroundColor="#fff" $width="90%" onClick={() => navigate("/stores")}>
							{t("findABoutique")}
						</Button>
					</div>
				</div>
				<div className="col2">
					<div className="about">
						<div>{t("aboutLacoste")}</div>
						<ul>
							<li>
								<a href="/">{t("theLacosteGroup")}</a>
							</li>
							<li>
								<a href="/">{t("people")}</a>
							</li>
							<li>
								<Link to="/lacoste" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
									{t("products")}
								</Link>
							</li>
							<li>
								<a href="/">{t("commitments")}</a>
							</li>
							<li>
								<a href="/">{t("brandProtection")}</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="col3">
					<div className="categories">
						<div>{t("categories")}</div>
						<ul>
							<li>
								<Link to="/men" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
									{t("mensCollection")}
								</Link>
							</li>
							<li>
								<Link to="/women" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
									{t("womensCollection")}
								</Link>
							</li>
							<li>
								<Link to="/kids" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
									{t("kidsCollection")}
								</Link>
							</li>
							<li>
								<Link to="/men/clothing/polo-shirts" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
									{t("poloShop")}
								</Link>
							</li>
							<li>
								<Link to="/men/shoes" onClick={() => window.scrollTo({ left: 0, top: 0 })}>
									{t("shoeShop")}
								</Link>
							</li>
							<li>
								<a href="/">{t("lacosteLive")}</a>
							</li>
							<li>
								<a href="/">{t("lacosteSport")}</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="col4">
					<div className="help">
						<div>{t("helpAndContacts")}</div>
						<div>
							<a href="/">{t("FAQ")}</a>
							<a href="mailto: shehab.mohamed12333@gmail.com ?subject=Notice from Lacoste project">{t("byEmail")}</a>
							<div>{t("byTelephone")}</div>
							<a href="tel: +201025207423" dir="ltr">
								+20 1025207423
							</a>
							<p>{t("contactOurGuest")}</p>
							<p>{t("localCosts")}</p>
						</div>
					</div>
				</div>
			</FooterMiddleSection>
			<FooterLogo>
				<div>
					<p>{t("paymentsMethods")}</p>
					<ul>
						<li>
							<img src="/visa.svg" alt="visa" loading="lazy" />
						</li>
						<li>
							<img src="/mastercard.svg" alt="mastercard" loading="lazy" />
						</li>
						<li>
							<img src="/cod.webp" alt="cash on delivery" loading="lazy" />
						</li>
					</ul>
				</div>
			</FooterLogo>
			<Copyright>
				Developed with <PiHeart /> by Shehab Jira
			</Copyright>
		</StyledFooter>
	);
}

export default Footer;
