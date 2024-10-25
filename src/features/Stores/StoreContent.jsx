import styled from "styled-components";
import Map from "./Map";
import { Outlet } from "react-router-dom";

const StyledStoreContent = styled.div`
	display: flex;
	flex-wrap: wrap-reverse;
	background-color: #f4f4f4;

	& > div:last-child {
		height: 232px;
	}
	@media (min-width: 1024px) {
		flex-wrap: nowrap;
		padding: 40px;
		& > div:last-child {
			width: 50%;
			height: 380px;
		}
	}
`;
const ChangingContent = styled.div`
	background-color: #f4f4f4;
	width: 100%;
	@media (min-width: 1024px) {
		width: 50%;
		padding-right: 40px;
	}
`;
const Content = styled.div`
	background-color: #fff;
	font-family: "archivo";
`;

function StoreContent() {
	return (
		<StyledStoreContent>
			<ChangingContent>
				<Content>
					<Outlet />
				</Content>
			</ChangingContent>
			<Map />
		</StyledStoreContent>
	);
}

export default StoreContent;
