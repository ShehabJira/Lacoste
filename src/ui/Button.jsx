import styled from "styled-components";

const Button = styled.button`
	display: block;
	letter-spacing: inherit;
	width: ${(props) => (props.$width ? props.$width : "auto")};
	max-width: 100%;
	white-space: nowrap;
	border: ${(props) => (props.$border ? props.$border : "none")};
	background-color: ${(props) => (props.$backgroundColor ? props.$backgroundColor : "#292929")};
	color: ${(props) => (props.color ? props.color : "#fff")};
	padding: 0 20px;
	border-radius: 27px;
	transition: all 0.3s ease-in-out;
	font-size: 15px;
	height: 44px;
	line-height: 22px;
	svg {
		width: 20px;
		height: 20px;
		margin-bottom: -5px;
		margin-right: 10px;
	}
	&:hover {
		border: 1px solid ${(props) => (props.color ? props.color : "#292929")};
		background-color: ${(props) => (props.color ? props.color : "#fff")};
		color: ${(props) => (props.$backgroundColor ? props.$backgroundColor : "#292929")};
	}
`;

export default Button;
