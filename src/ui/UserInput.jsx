import styled from "styled-components";

const UserInput = styled.div`
	margin-bottom: ${(props) => (props.$for === "password" ? "10px" : "40px")};
	border-bottom: 1px solid #e5e5e5;
	label {
		display: block;
		margin-bottom: ${(props) => (props.$for === "password" ? "0" : "6px")};
		font-size: ${(props) => (props.$forAddress ? "15px" : "")};
		color: #6c717a;
		letter-spacing: ${(props) => (props.$forAddress ? "0.8px" : "")};
	}
	input {
		display: block;
		margin-top: 4px;
		padding: ${(props) => (props.$for === "password" ? "0" : "4px 20% 4px 14px")};
		border: none;
		outline: none;
		height: ${(props) => (props.$for === "password" ? "auto" : "39px")};
		width: ${(props) => (props.$for === "password" ? "100%" : "")};
		line-height: ${(props) => (props.$for === "password" ? "22.5px" : "")};
		font-size: 15px;
		color: #191919;
		font-weight: lighter;
		&:focus {
			outline: none;
		}
		&:disabled {
			background-color: #fff;
			color: #c8c8c8;
		}
	}
	& + p {
		display: none;
	}
	&.wrong {
		border-bottom-color: red;
		& + p {
			display: block;
			color: red;
			margin-top: -35px;
			margin-bottom: 10px;
		}
	}
`;
export default UserInput;
