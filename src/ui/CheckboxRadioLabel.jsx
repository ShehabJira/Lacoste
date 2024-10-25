import styled from "styled-components";

const CheckboxRadioLabel = styled.label`
	display: flex;
	justify-content: space-between;
	align-items: center;
	line-height: 25px;
	margin-bottom: 10px;
	font-size: 15px;
	color: #292929;
	text-transform: capitalize;
	cursor: pointer;
	letter-spacing: 0.5px;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	&:hover {
		text-decoration: underline;
	}
	input {
		width: 17px;
		height: 17px;
		display: block;
		accent-color: #292929;
		outline: none;
	}
`;

export default CheckboxRadioLabel;
