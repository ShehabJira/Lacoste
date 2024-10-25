import styled from "styled-components";

const SummaryItem = styled.div`
	display: flex;
	& > img {
		width: 85px;
		height: 85px;
		border-radius: 8px;
	}
	& > div {
		padding-left: 16px;
		font-size: 13px;
		& > div:not(:first-child) {
			line-height: 25px;
		}
		div:last-child {
			display: flex;
			justify-content: space-between;
		}
		.pricing {
			& span:first-of-type {
				font-weight: 800;
				color: #222222;
				margin-right: 8px;
			}
			& span:last-of-type:not(:first-of-type) {
				text-decoration: line-through;
				color: #aaaaaa;
			}
		}
	}
`;
export default SummaryItem;
