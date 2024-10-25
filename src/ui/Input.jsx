import styled from "styled-components";

const Input = styled.div`
	position: relative;
	margin-bottom: 30px;
	flex-grow: 1;
	@media (min-width: 768px) {
		margin-right: -25px;
	}
	label {
		display: block;
		margin-bottom: 6px;
		font-size: 12px;
		font-weight: 800;
		letter-spacing: -0.3px;
	}
	input {
		transition: 0.3s;
		display: block;
		border: 1px solid #ededed;
		width: 100%;
		height: 37px;
		padding: 4px 20% 4px 14px;
		font-weight: 100;
		letter-spacing: 1px;
		color: #6c717a;
		outline: none;
		font-size: 13px;
		&:focus {
			border: 1px dotted #292929;
		}
	}
	&.phone {
		margin-right: 0;
		width: calc(100% - 30%);
		&::before {
			content: "+20";
			position: absolute;
			left: 10%;
			top: 50%;
		}
		input {
			margin-left: 30%;
		}
	}
	select {
		min-width: 106px;
		transition: 0.3s;
		color: #6c717a;
		padding: 10px;
		width: 30%;
		height: 37px;
		border: 1px solid #e8e9eb;
		outline: none;
		&:focus {
			border: 1px dotted #292929;
		}
	}
	svg {
		position: absolute;
		width: 20px;
		height: 20px;
		right: 3%;
		top: 55%;
		cursor: pointer;
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
			margin-top: -25px;
			margin-bottom: 10px;
		}
	}
`;

export default Input;
