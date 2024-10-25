import styled from "styled-components";

const PageContent = styled.div`
	padding-top: 16px;
	padding-bottom: 66px;
	@media (min-width: 1024px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		& > div {
			width: 90%;
		}
	}
	@media (max-width: 1024px) {
		padding-left: 15px;
		padding-right: 15px;
	}
`;
export default PageContent;
