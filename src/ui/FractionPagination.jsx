import { useState } from "react";
import styled from "styled-components";
import { PiCaretLeftThin, PiCaretRightThin } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const StyledFractionPagination = styled.div`
	display: flex;
	margin: 0 8px 8px 0;
	@media (max-width: 768px) {
		display: none;
	}
	button {
		background: none;
		border: none;
		height: 0;
	}
	button:focus {
		outline: none;
	}
	button:disabled {
		cursor: default;
		color: inherit;
	}
	svg {
		width: 30px;
		height: 30px;
		body[dir="rtl"] & {
			transform: rotate(180deg);
		}
	}
	.reached {
		color: #d7d7d7;
		cursor: not-allowed;
	}

	div {
		padding: 0 8px 0;
		font-size: 20px;
		height: 20px;
		font-weight: bold;
	}
`;

function FractionPagination({ reff, endPoint, startPoint }) {
	const [fractionPagination, setFractionPagination] = useState(3);
	const {
		i18n: { language },
	} = useTranslation();
	function handleInc(e) {
		if (fractionPagination < endPoint) {
			// Prevent multiple crazy fast clicking.
			const btn = e.currentTarget;
			btn.disabled = true;
			setTimeout(() => (btn.disabled = false), 500);

			setFractionPagination((cur) => cur + 1);
			language === "ar"
				? reff?.scrollBy({
						top: 0,
						left: fractionPagination === 3 ? -0.14 * window.innerWidth : -0.27 * window.innerWidth,
						behavior: "smooth",
				  })
				: reff?.scrollBy({
						top: 0,
						// if we are on fraction 1, we need the next moving foreward to fraction 2 to be a little higher.
						left: fractionPagination === 3 ? 0.14 * window.innerWidth : 0.27 * window.innerWidth,
						behavior: "smooth",
				  });
		}
	}

	function handleDec(e) {
		if (fractionPagination > 3) {
			// Prevent multiple crazy fast clicking.
			const btn = e.currentTarget;
			btn.disabled = true;
			setTimeout(() => (btn.disabled = false), 500);

			setFractionPagination((cur) => cur - 1);
			language === "ar"
				? reff?.scrollBy({
						top: 0,
						left: fractionPagination === 4 ? 0.14 * window.innerWidth : 0.27 * window.innerWidth,
						behavior: "smooth",
				  })
				: reff?.scrollBy({
						top: 0,
						// if we are on fraction 2, we need the next moving back to fraction 1 to be a little higher.
						left: fractionPagination === 4 ? -0.14 * window.innerWidth : -0.27 * window.innerWidth,
						behavior: "smooth",
				  });
		}
	}

	return (
		<StyledFractionPagination>
			<button onClick={(e) => handleDec(e)} className={fractionPagination === 3 || startPoint === 1 ? "reached" : ""}>
				<PiCaretLeftThin />
			</button>
			<div>
				<span>{startPoint || fractionPagination}</span> / <span>{endPoint}</span>
			</div>
			<button onClick={(e) => handleInc(e)} className={fractionPagination === endPoint || endPoint === 1 ? "reached" : ""}>
				<PiCaretRightThin />
			</button>
		</StyledFractionPagination>
	);
}

export default FractionPagination;
