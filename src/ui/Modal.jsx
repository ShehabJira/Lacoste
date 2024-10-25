import { cloneElement } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { createContext } from "react";
import { PiXLight } from "react-icons/pi";

import styled from "styled-components";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;
const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 32px 32px;
	transition: all 0.5s;
`;
const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.6rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 28px;
		height: 28px;
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [windowName, setWindowName] = useState("");
	return (
		<ModalContext.Provider value={{ windowName, setWindowName }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens }) {
	const { setWindowName } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => setWindowName(opens) });
}

function Window({ children, name }) {
	const { windowName, setWindowName } = useContext(ModalContext);
	const ref = useRef();

	useEffect(
		function () {
			function action(e) {
				if (ref.current && !ref.current.contains(e.target)) setWindowName("");
			}

			document.addEventListener("click", action, true);
			return () => document.removeEventListener("click", action, true);
		},
		[setWindowName]
	);

	if (windowName !== name) return null;

	return (
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={() => setWindowName("")}>
					<PiXLight />
				</Button>
				<div>
					{cloneElement(children, { onCloseModal: () => setWindowName("") })}
				</div>
			</StyledModal>
		</Overlay>
	);
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
