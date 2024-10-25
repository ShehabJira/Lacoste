import styled from "styled-components";

const Preferences = styled.div`
	padding: 0 15px;
	width: 100%;
	@media (max-width: 767.98px) {
		padding: 0;
		margin-bottom: 60px;
	}
	@media (min-width: 768px) {
		flex: 0 0 50%;
		max-width: 50%;
		div {
			padding: 0 32px 0 16px;
		}
	}
	padding-bottom: 48px;
`;

export default Preferences;
