import styled from "styled-components";

const ContentHeading = styled.h2`
	position: relative;
	background-color: #fff;
	z-index: 5;
	width: 100%;
	padding: 20px 36px 20px 52px;
	border-bottom: 1px solid #e5e5e5;
	font-size: 15px;
	color: #292929;
	text-transform: uppercase;
	@media (max-width: 1024px) {
		position: sticky;
		padding: 14px 36px 14px 52px !important;
		font-size: 12px !important;
		top: 397px;
	}
	svg {
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
`;

export default ContentHeading;
