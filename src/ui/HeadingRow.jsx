import styled from "styled-components";

const HeadingRow = styled.div`
	color: #292929;
	line-height: 1.38;
	padding: ${(props) => (props.$paddingAround ? "24px 15px 8px 0" : "66px 0 0")};
	@media (max-width: 992px) {
		padding-top: 40px;
	}
	span {
		display: inline-block;
		margin-bottom: ${(props) => (props.$paddingAround ? "8px" : 0)};
		font-weight: 600;
		font-size: 26px;
		text-align: left;
		width: 50%;
		/* padding: 0 15px 16px 10px; */
	}
	a {
		display: inline-block;
		font-weight: 400;
		text-align: right;
		text-decoration: underline;
		width: 50%;
		/* padding: 0 24px 16px 10px; */
		cursor: pointer;
	}
`;
export default HeadingRow;
