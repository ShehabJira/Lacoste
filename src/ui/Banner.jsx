import { useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
const fadeIn = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

const StyledBanner = styled.div`
	background-color: black;
	color: #fff;
	font-size: 14px;
	text-align: center;
	display: flex;
	align-items: center;
	& button {
		height: 40px;
		flex-grow: 1.2;
		background-color: black;
		border: none;
		&:focus {
			outline: none;
		}
	}
	& button svg {
		width: 20px;
		height: 20px;
		color: black;
		transition: 0.3s;
		body[dir="rtl"] & {
			transform: rotate(180deg);
		}
	}
	&:hover svg {
		color: white;
	}
	& div {
		flex-grow: 10;
		height: 40px;
		line-height: 40px;
	}
	& div div.visible {
		display: block;
		opacity: 0;
		animation: ${fadeIn} 1s forwards; // we need forwards to prevent the opacity from going back to 0 in the remaining 3secs.
	}
	& div div.not-visible {
		display: none;
		opacity: 0;
	}
`;

function Banner() {
	const { t } = useTranslation();
	const ref1 = useRef();
	const ref2 = useRef();

	function handleSwipe() {
		if (ref1?.current?.classList?.contains("not-visible")) {
			ref1?.current?.classList?.add("visible");
			ref1?.current?.classList?.remove("not-visible");
			ref2?.current?.classList?.add("not-visible");
			ref2?.current?.classList?.remove("visible");
		} else {
			ref1?.current?.classList?.remove("visible");
			ref1?.current?.classList?.add("not-visible");
			ref2?.current?.classList?.remove("not-visible");
			ref2?.current?.classList?.add("visible");
		}
	}

	useEffect(function () {
		const id = setInterval(() => {
			if (ref1?.current?.classList?.contains("visible")) {
				ref1?.current?.classList?.remove("visible");
				ref1?.current?.classList?.add("not-visible");
				ref2?.current?.classList?.add("visible");
				ref2?.current?.classList?.remove("not-visible");
			} else {
				ref1?.current?.classList?.add("visible");
				ref1?.current?.classList?.remove("not-visible");
				ref2?.current?.classList?.remove("visible");
				ref2?.current?.classList?.add("not-visible");
			}
		}, 4000); // every 4 secs, one text will appear and the other will disappear, in the first second of appearance we want to make an animation of fading in to opacity 1, and opacity lasts lasts with the value 1 till the remaining 3 secs ends.
		return () => {
			clearInterval(id);
		};
	}, []);

	return (
		<StyledBanner>
			<button onClick={handleSwipe}>
				<BsChevronLeft />
			</button>
			<div>
				<div ref={ref1} className="visible">
					{t("banInfo1")}
				</div>
				<div ref={ref2} className="not-visible">
					{t("banInfo2")}
				</div>
			</div>
			<button onClick={handleSwipe}>
				<BsChevronRight />
			</button>
		</StyledBanner>
	);
}

export default Banner;
