import styled, { css } from "styled-components";

const InputContainer = styled.div`
	position: relative;
	width: 100%;
	@media (min-width: 1200px) {
		width: 60%;
		${(props) =>
			props.$findOrder &&
			css`
				width: 100%;
			`}
	}
	label {
		transition: 0.3s;
		position: absolute;
		background-color: #fff;
		bottom: 1px;
		left: 0;
		font-size: ${(props) => (props.$smallerLabel ? "14px" : "16px")};
		font-weight: 400;
		color: #767676;
		width: 100%;
		${(props) =>
			props.$findOrder &&
			css`
				left: 20px;
				bottom: 30%;
				width: fit-content;
			`}
	}
	&:focus-within label,
	label.full {
		bottom: 27px;
		font-size: ${(props) => (props.$smallerLabel ? "12px" : "13px")};
		${(props) =>
			props.$findOrder &&
			css`
				bottom: 85%;
				left: 10px;
			`}
	}
	&:focus-within input {
		border-bottom: 1px solid #000;
		${(props) =>
			props.$findOrder &&
			css`
				border: 1px solid #000;
			`}
	}

	input {
		padding: 30px 20% 0.25rem 0;
		margin-top: ${(props) => (props.$mt ? props.$mt : "20px")};
		margin-bottom: ${(props) => (props.$mb ? props.$mb : "32px")};
		display: block;
		height: 50px;
		width: 100%;
		border: none;
		border-bottom: 1px solid #eee;
		font-size: 16px;
		text-overflow: ellipsis;
		&:focus {
			outline: none;
		}
		${(props) =>
			props.$findOrder &&
			css`
				border: 1px solid #eee;
				padding: 4px 20% 4px 14px;
				margin-bottom: 25px;
				@media (min-width: 992px) {
					margin-bottom: 40px;
				}
			`}
	}
	&:has(button) {
		display: flex;
		align-items: center;
		@media (min-width: 1200px) {
			width: 85%;
			margin: auto;
		}
		label {
			width: auto;
		}
		input {
			margin-bottom: 0;
			margin-top: 0;
		}
		button {
			margin-left: 16px;
			padding: 12px 24px;
			background-color: #191919;
			line-height: 10px;
		}
		button:disabled {
			background-color: #e5e5e5;
			color: #999;
			&:hover {
				border: none;
			}
		}
		button:not(:disabled):hover {
			border: none;
			background-color: #285f41;
			color: #fff;
		}
	}
	& ~ p {
		display: none;
	}
	&.wrong {
		label {
			color: red;
		}
		input {
			border-bottom-color: red;
			${(props) =>
				props.$findOrder &&
				css`
					border-color: red;
				`}
		}
		& ~ p {
			display: block;
			color: red;
			margin-top: -25px;
		}
	}
	&:has(input:disabled) {
		input,
		label {
			background-color: #fff;
			color: #cbcbcb;
		}
	}
`;
export default InputContainer;
