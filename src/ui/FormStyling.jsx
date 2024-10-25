import styled from "styled-components";

const FormStyling = styled.div`
	min-height: 1000px;
	h2 {
		svg {
			width: 22px;
			height: 22px;
			margin-bottom: -4px;
			margin-right: 8px;
			margin-left: 8px;
		}
	}
	hr {
		position: relative;
		left: calc(-100vw / 25);
		width: calc(100% + (100vw / 25) * 2);
		border: none;
		border-bottom: 1px solid #e5e5e5;
		margin-bottom: ${(props) => (props.$for === "password" ? "25px" : "50px")};

		@media (max-width: 768px) {
			margin-bottom: 25px;
		}
	}
`;
export default FormStyling;
