import styled from "styled-components";

const AuthButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	min-width: 150px;
	svg {
		width: 20px;
		height: 20px;
	}
	@media (max-width: 768px) {
		width: 180px;
	}
	height: 40px;
	background-color: #292929;
	padding: 12px 0;
	font-size: 13px;
	color: #fff;
	outline: none;
	border: none;
	font-weight: 900;
	letter-spacing: -1px;
	transition: 0.3s;
	border-radius: 4px;
	margin-top: 15px;
	&:hover {
		background-color: #285f41;
	}
`;

export default AuthButton;
