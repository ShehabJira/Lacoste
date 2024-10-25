import { useContext } from "react";
import { cloneElement } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { PiXLight } from "react-icons/pi";
import styled from "styled-components";
import { useUser } from "../features/Authentication/useUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 1000;
	transition: all 0.5s;
`;
const StyledSideDrawer = styled.aside`
	position: fixed;
	width: 70%;
	height: 100dvh;
	top: 0;
	right: 0;
	direction: ltr;
	background-color: #fff;
	padding: calc(100vw / 25);
	padding-top: 0;
	transition: 0.5s;
	overflow: auto;
	overflow-x: hidden;
	z-index: 9999;
	@media (min-width: 1024px) {
		max-width: 650px;
	}
	@media (max-width: 1024px) {
		width: 100%;
	}

	h2 {
		position: sticky;
		top: 0;
		padding: 64px 0 32px;
		font-size: 18px;
		font-family: "archivo";
		font-weight: 800;
		margin-bottom: 16px;
		background-color: #fff;
		z-index: 4;
	}
`;
const CloseBtn = styled.button`
	&:focus {
		outline: none;
	}
	border: none;
	position: fixed;
	background-color: #fff;
	right: calc(100vw / 25);
	top: 64px;
	color: #6c717a;
	& svg {
		width: 23px;
		height: 23px;
		pointer-events: none;
	}
	z-index: 5;
`;
// 1. Create a context
const SideDrawerContext = createContext();

// 2. Create parent component
function SideDrawer({ children }) {
	const { user } = useUser();
	const navigate = useNavigate();
	const [windowName, setWindowName] = useState("");
	useEffect(
		function () {
			if (windowName) {
				document.body.style.overflow = "hidden";
			} else document.body.style.overflow = "auto";
		},
		[windowName]
	);

	function handleSettingWindowName(opens) {
		// if we the user is not signed-in and want to upload a product, don't set the window of SideDrawer.
		if (opens === "productForm" && !user) {
			toast.error("You need to sign in first!");
			navigate("/login/sign-in");
		} else setWindowName(opens);
	}

	return <SideDrawerContext.Provider value={{ windowName, setWindowName, handleSettingWindowName }}>{children}</SideDrawerContext.Provider>;
}

// 3. Create child components to help implementing the common task
// the role of this whenever the children(button in our case) is clicked, we setWindowName of what it opens.
function Open({ children, opens }) {
	const { handleSettingWindowName } = useContext(SideDrawerContext);
	// we need to add event listener on whatever children we get.
	return cloneElement(children, { onClick: () => handleSettingWindowName(opens) });
}

function Window({ children, name }) {
	const { windowName, setWindowName } = useContext(SideDrawerContext);

	const ref = useRef(null);
	useEffect(
		function () {
			function handleClickOutsideToCloseWindow(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					setWindowName("");
					document.body.style.overflow = "auto";
				}
			}
			document.addEventListener("click", handleClickOutsideToCloseWindow, true);
			return () => document.removeEventListener("click", handleClickOutsideToCloseWindow, true);
		},
		[setWindowName]
	);

	if (windowName !== name) return null;

	return createPortal(
		<Overlay>
			<StyledSideDrawer ref={ref}>
				<CloseBtn
					onClick={() => {
						setWindowName("");
						document.body.style.overflow = "auto";
					}}
				>
					<PiXLight />
				</CloseBtn>
				{cloneElement(children, {
					onCloseDrawer: () => {
						setWindowName("");
						document.body.style.overflow = "auto";
					},
				})}
			</StyledSideDrawer>
		</Overlay>,
		document.body
	);
}

// 4. Add child components as proeprties to parent component
SideDrawer.Open = Open;
SideDrawer.Window = Window;

export default SideDrawer;
