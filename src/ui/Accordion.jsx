import styled from "styled-components";

const Accordion = styled.div`
	border-bottom: 1px solid #e5e5e5;
	&:nth-child(3) {
		padding-top: 24px;
	}
	& > div:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		div {
			span {
				font-size: 15px;
			}
			span:first-child {
				font-size: 10px;
				text-transform: uppercase;
				font-weight: 800;
				margin-right: 2px;
				letter-spacing: 3px;
			}
			span:last-child {
				margin-left: 2px;
			}
		}
		svg {
			width: 16px;
			height: 16px;
			margin: 0;
			transition: 0.3s;

			&.opened {
				transform: rotate(180deg);
			}
		}
	}
	& > div:last-child {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 300ms ease-out;
		& > div {
			padding-top: 24px;
			overflow: hidden;
			& > div {
				color: #545454;
				margin-bottom: 8px;
				&:last-child {
					margin-bottom: 24px;
				}
			}
		}
	}

	&.active > div:last-child {
		grid-template-rows: 1fr;
		transition: grid-template-rows 300ms ease-out;
	}
`;
export default Accordion;
