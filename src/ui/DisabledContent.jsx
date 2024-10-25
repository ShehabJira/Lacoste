import styled from "styled-components";

const DisabledContent = styled.div`
	margin-bottom: 28px;
	display: flex;
	align-items: center;
	label {
		margin-bottom: 6px;
		color: #6c717a;
		display: inline-block;
		flex-grow: 1;
	}
	input {
		border: none;
		height: 39px;
		flex-grow: 8;
		display: inline-block;
		color: #555555;
		background-color: #fff;
		&:disabled {
			background-color: #fff;
		}
	}
`;

export default DisabledContent;
