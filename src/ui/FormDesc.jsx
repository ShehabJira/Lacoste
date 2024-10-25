import styled from "styled-components";

const FormDesc = styled.div`
	padding-right: 15px;
	padding-bottom: 48px;
	width: 100%;
	border-right: 1px solid #ededed;
	& > div {
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 767.98px) {
		border-right: none;
		border-bottom: 1px solid #ededed;
		padding: 0;
	}
	@media (min-width: 768px) {
		flex: 0 0 50%;
		max-width: 50%;
		& > div {
			padding: 0 32px 0 16px;
		}
	}
`;
export default FormDesc;
