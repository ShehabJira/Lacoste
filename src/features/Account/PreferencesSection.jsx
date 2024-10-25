import styled from "styled-components";
import { PiEnvelopeLight } from "react-icons/pi";
import NormalSwitch from "../../ui/NormalSwitch";

const StyledPreferenceSection = styled.div`
	background-color: #fff;
	border-radius: 10px;
	margin-bottom: 40px;
	padding: 24px;
	@media (max-width: 544px) {
		padding: 16px;
	}

	& > div {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		& > div:first-child {
			display: flex;
			align-items: center;
			flex-grow: 3;
			line-height: 1.44;
			white-space: nowrap;
			@media (max-width: 768px) {
				flex: 100%;
			}
			svg {
				width: 24px;
				min-width: 24px;
				height: 24px;
				min-height: 24px;
				color: #909090;
				margin: 0 8px 0 0;
				@media (max-width: 768px) {
					margin: 0 5px 0 0;
				}
			}
			span {
				font-size: 18px;
				font-weight: 600;
				@media (max-width: 1024px) {
					font-size: 15px;
				}
				color: #292929;
			}
		}
		div:nth-child(2) {
			font-size: 15px;
			color: #767676;
			flex-grow: 5;
			@media (max-width: 768px) {
				font-size: 12px;
				width: calc(70% - 8px);
				margin-right: 8px;
				margin-top: 8px;
			}
		}
		label:nth-child(3) {
			flex-grow: 2;
			@media (max-width: 768px) {
				width: 30%;
			}
		}
	}
`;

function PreferencesSection() {
	return (
		<StyledPreferenceSection>
			{/*⬇ we need this extra div, as when we increase the height in dashboard this div will gather its content at the top.*/}
			<div>
				<div>
					<PiEnvelopeLight />
					<span>Newsletters & interests</span>
				</div>
				<div>Subscribe to our newsletter, enjoy exclusive offers</div>
				<NormalSwitch />
			</div>
		</StyledPreferenceSection>
	);
}

export default PreferencesSection;
