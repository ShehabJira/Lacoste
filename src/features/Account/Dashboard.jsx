import styled from "styled-components";
import OrdersSection from "./OrdersSection";
import PageContent from "../../ui/PageContent";
import ProfileSection from "./ProfileSection";
import HeadingRow from "../../ui/HeadingRow";
import { Link, useOutletContext } from "react-router-dom";
import PreferencesSection from "./PreferencesSection";
import FaqSection from "./FaqSection";
import { useUser } from "../Authentication/useUser";
import { useOrders } from "./useOrders";
const Row = styled.div`
	display: flex;
	margin-bottom: 68px;
	@media (max-width: 1024px) {
		flex-wrap: wrap;
		flex-direction: column;
	}
	gap: 15px;
	& > div:first-child {
		width: 70%;
		@media (max-width: 1024px) {
			width: 100%;
		}
	}
	& > div:last-child {
		width: 30%;
		@media (max-width: 1024px) {
			width: 100%;
		}
		& > div:last-child {
			// preferencesSection
			@media (min-width: 1024px) {
				height: 195px;
				& > div > div:nth-child(2) {
					width: calc(70% - 8px);
					margin-right: 8px;
					margin-top: 4px;
				}
				& > div > label {
					width: 30%;
				}
			}
		}
	}
`;
function Dashboard() {
	const [setPage] = useOutletContext();
	const { user, isGettingUser } = useUser();
	const { email } = user && user.user_metadata ? user.user_metadata : "";
	const { orders, isGettingOrders } = useOrders(email);

	return (
		<PageContent>
			<OrdersSection orders={orders} isLoading={isGettingOrders || isGettingUser} />

			<Row>
				<div>
					<HeadingRow $paddingAround={true}>
						<span>Profile</span>
						<Link
							to="/account/profile-and-preferences"
							onClick={() => {
								setPage("Profile & Preferences");
								window.scrollTo({ left: 0, top: 0 });
							}}
						>
							Profile
						</Link>
					</HeadingRow>
					<ProfileSection />
				</div>
				<div>
					<HeadingRow $paddingAround={true}>
						<span>Preferences</span>
						<Link
							to="/account/profile-and-preferences"
							onClick={() => {
								setPage("Profile & Preferences");
								window.scrollTo({ left: 0, top: 0 });
							}}
						>
							Preferences
						</Link>
					</HeadingRow>
					<PreferencesSection />
				</div>
			</Row>

			<FaqSection />
		</PageContent>
	);
}

export default Dashboard;
