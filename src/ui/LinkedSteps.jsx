import styled from "styled-components";

const LinkedSteps = styled.div`
	position: relative;
	margin-bottom: 16px;
	font-size: 13px;
	color: #767676;
	& > p {
		margin-left: 40px;
		@media (max-width: 1024px) {
			margin-left: 55px;
		}
		padding-top: 4px;
	}
	& > span:first-of-type {
		margin-left: 40px;
		@media (max-width: 1024px) {
			margin-left: 55px;
		}
	}
	& > span:last-of-type {
		cursor: pointer;
		color: #38b272;
		text-decoration: underline;
	}
	&::before {
		content: "";
		position: absolute;
		left: 16px;
		top: 32px;
		width: 1px;
		height: 78%;
		background-color: #e5e5e5;
		@media (max-width: 1024px) {
			left: 31px;
			top: 35px;
			height: 70%;
		}
	}
`;
export default LinkedSteps;
