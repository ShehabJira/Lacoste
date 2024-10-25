import styled, { css } from "styled-components";

const BreadcrumbsHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 14px calc(100vw / 25);

	color: #292929;
	svg {
		width: 25px;
		height: 25px;
		margin-right: 15px;
		cursor: pointer;
		body[dir="rtl"] & {
			transform: rotate(0.5turn);
			margin-right: 0;
			margin-left: 15px;
		}
	}
	// selecting all span children in odd position (the slashes)
	& span:nth-child(2n + 1) {
		padding-left: 1px;
		padding-right: 4px;
	}
	// selecting all span children in even position (the categories)
	& span:nth-child(2n) {
		display: block;
		padding: 4px 4px 4px 0;
	}
	& span:nth-child(2n)::first-letter {
		text-transform: capitalize;
	}
	// selecting the categories but not the last one and not the only type in case we have only category.
	& span:nth-child(2n):not(:only-of-type):not(:last-of-type) {
		text-decoration: underline;
		text-decoration-thickness: 0.5px;
		cursor: pointer;
	}
	${(props) =>
		props.$forPage &&
		css`
			span:not(:last-child) {
				color: #767676;
				font-size: 13px;
			}
			margin-right: 10px;
			body[dir="rtl"] & {
				margin-right: 0;
				margin-left: 10px;
			}
			@media (max-width: 768px) {
				display: none;
			}
		`}
`;

export default BreadcrumbsHeader;
