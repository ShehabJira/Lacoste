import styled, { css } from "styled-components";

const PhoneInput = styled.div`
	display: flex;
	align-items: center;
	height: 39px;
	line-height: 39px;
	${(props) =>
		props.$forAddress &&
		css`
			position: relative;
			margin-top: 60px;
			margin-bottom: 40px;
			div {
				flex: 0 0 calc(30% - 15px);
				max-width: calc(30% - 15px);
				margin-left: 0;
			}
			input {
				flex: 0 0 60%;
				max-width: 60%;
			}
		`}
	label {
		margin-bottom: 6px;
		color: #6c717a;
		display: inline-block;
		flex: 0 0 25%;
		max-width: 25%;
		${(props) =>
			props.$forAddress &&
			css`
				position: absolute;
				top: -30px;
				left: 0;
			`}
	}
	& > div {
		text-align: right;
		color: #767676;
		font-size: 15px;
		margin: 0 15px;
		border-bottom: 1px solid #e5e5e5;
		display: inline-block;
		flex: 0 0 calc(25% - 30px);
		max-width: calc(25% - 30px);
		${(props) =>
			props.$forAddress &&
			css`
				flex: 0 0 calc(30% - 15px);
				max-width: calc(30% - 15px);
				margin-left: 0;
			`}
	}
	input {
		display: inline-block;
		padding: 4px 10% 4px 14px;
		border: none;
		outline: none;
		height: 39px;
		letter-spacing: 1px;
		font-weight: lighter;
		font-size: 15px;
		color: #191919;
		border-bottom: 1px solid #e5e5e5;
		font-weight: lighter;
		flex: 0 0 50%;
		max-width: 50%;
		&:focus {
			outline: none;
		}
		${(props) =>
			props.$forAddress &&
			css`
				flex: 1;
				max-width: 70%;
			`}
	}

	& + p {
		display: none;
	}
	&.wrong {
		input {
			border-bottom-color: red;
		}
		& + p {
			display: block;
			color: red;
			margin-top: 15px;
			margin-bottom: 10px;
			${(props) =>
				props.$forAddress &&
				css`
					margin-top: -30px;
				`}
		}
	}
`;
export default PhoneInput;
