import styled from "styled-components";

const ValidateButton = styled.div`
	margin: 32px 0;
	button {
		font-family: archivo, Arial, Helvetica, sans-serif;
		letter-spacing: ${(props) => (props.$letterSp ? props.$letterSp : "auto")};
		margin-left: auto;
		margin-right: ${(props) => (props.$center ? "auto" : "0")};
		@media (max-width: 1024px) {
			margin-right: auto;
			width: 345px;
			height: 52px;
		}
		background-color: #105a33;
		&:disabled {
			background-color: #e5e5e5;
			color: #999;
			&:hover {
				border: none;
			}
		}
		&:not(:disabled):hover {
			border: none;
			background-color: #285f41;
			color: #fff;
		}
	}
`;

export default ValidateButton;
