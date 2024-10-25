import { NavLink, Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import styled from "styled-components";

import { useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { useUser } from "../features/Authentication/useUser";
const JumbotronAccountHeader = styled.div`
	height: 300px;
	background-image: url("/desktop-header.webp");
	background-repeat: no-repeat;
	background-position: center left;
	background-size: cover;
	@media (max-width: 768px) {
		background-image: url("/mobile-header.webp");
	}
	hr {
		border: none;
		border-top: 1px solid #d4d4d4;
		margin-top: 16px;
		margin-bottom: 16px;
	}
`;
const Welcome = styled.div`
	display: flex;
	padding: 24px 0 16px;
	@media (min-width: 768px) {
		justify-content: center;
	}
	& > div {
		position: relative;
		padding: 16px 15px;
		height: 187px;
		width: 75%;
		color: #fff;
		h6 {
			position: absolute;
			top: 50%;
			font-size: 22px;
			font-weight: normal;
			margin-bottom: 8px;
			span {
				font-size: 15px;
			}
		}
	}
`;
const AccountScroll = styled.div`
	display: flex;
	/* @media (min-width: 768px) {
		justify-content: center;
	} */
	justify-content: center;
	div {
		display: none;
		@media (min-width: 768px) {
			display: flex;
			justify-content: center;
			width: 91.5%;
		}
		padding: 0 15px;
		position: relative;
		a {
			margin-top: -5px;
			border-bottom: 3px solid transparent;
			transition: 0.3s ease;
			display: block;
			text-align: center;
			padding: 8px 16px;
			font-size: 15px;
			@media (min-width: 768px) and (max-width: 1024px) {
				font-size: 13px;
			}
			line-height: 1.77;
			color: #fff;
			flex: 1;
			white-space: nowrap;
		}
		a.active {
			margin-top: -8px;
			border-bottom: 3px solid #fff;
			font-weight: 500;
			font-size: 16px;
			@media (min-width: 768px) and (max-width: 1024px) {
				font-size: 14px;
			}
		}
	}
`;
const PageAccordion = styled.div`
	@media (min-width: 768px) {
		display: none;
	}
	display: flex;
	align-items: center;
	flex-direction: column;
`;
const AccordionHeading = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 12px;
	width: 95%;
	padding: 12px 30px;
	border-radius: 4px;
	color: #212529;
	letter-spacing: 1px;
	background-color: #f8f9fa;
	transition: 0.3s;
	cursor: pointer;
	&.open {
		background-color: #dae0e5;
	}
	svg {
		width: 20px;
		height: 20px;
	}
`;
const AccordionBody = styled.div`
	display: flex;
	background-color: #fff;
	flex-direction: column;
	width: 95%;
	padding: 8px 0;
	margin-top: 1px;
	z-index: 3;
	border: 1px solid rgba(0, 0, 0, 0.15);
	a {
		transition: 0.3s;
		width: 100%;
		display: block;
		background-color: #fff;
		padding: 4px 24px;
		font-size: 16px;
		white-space: nowrap;
		font-weight: 400;
		&:hover {
			background-color: #f8f9fa;
		}
		&.active,
		&:active {
			background-color: #191919;
			color: #fff;
		}
	}
`;
function AccountPage() {
	const [page, setPage] = useState("dashboard");
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const { user } = useUser();
	const { firstName, lastName } = user && user.user_metadata ? user.user_metadata : "";
	return (
		<>
			<Header />
			<div style={{ backgroundColor: "#f6f6f6" }}>
				<JumbotronAccountHeader>
					<Welcome>
						<div>
							<h6>
								Welcome to your account{" "}
								<span>
									{firstName} {lastName}
								</span>
							</h6>
						</div>
					</Welcome>
					<hr />
					<AccountScroll>
						<div>
							<NavLink to="dashboard">Dashboard</NavLink>
							<NavLink to="profile-and-preferences">Profile & Preferences</NavLink>
							<NavLink to="my-orders">My Orders</NavLink>
							<NavLink to="help-and-contact">Help & Contact</NavLink>
						</div>
					</AccountScroll>
					<PageAccordion>
						<AccordionHeading onClick={() => setIsAccordionOpen((cur) => !cur)} className={isAccordionOpen ? "open" : ""}>
							{page} {isAccordionOpen ? <BiSolidChevronUp /> : <BiSolidChevronDown />}
						</AccordionHeading>
						{isAccordionOpen && (
							<AccordionBody onClick={() => setIsAccordionOpen(false)}>
								<NavLink to="dashboard" onClick={() => setPage("Dashboard")}>
									Dashboard
								</NavLink>
								<NavLink to="profile-and-preferences" onClick={() => setPage("Profile & Preferences")}>
									Profile & Preferences
								</NavLink>
								<NavLink to="my-orders" onClick={() => setPage("My Orders")}>
									My Orders
								</NavLink>
								<NavLink to="help-and-contact" onClick={() => setPage("Help & Contact")}>
									Help & Contact
								</NavLink>
							</AccordionBody>
						)}
					</PageAccordion>
				</JumbotronAccountHeader>
				<Outlet context={[setPage]} />
			</div>
			<Footer />
		</>
	);
}

export default AccountPage;
