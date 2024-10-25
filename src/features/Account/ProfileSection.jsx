import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { PiCreditCard, PiLockKeyLight, PiNotePencil } from "react-icons/pi";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import Button from "../../ui/Button";
import SideDrawer from "../../ui/SideDrawer";
import UpdateInformation from "../Authentication/UpdateInformation";
import UpdatePassword from "../Authentication/UpdatePassword";
import CompleteAddress from "../Authentication/CompleteAddress";
import { useUser } from "../Authentication/useUser";

const StyledProfileSection = styled.div`
	& > div {
		display: flex;
		max-width: 100%;
		flex-wrap: wrap;
	}
`;
const UserInformation = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 100%;
	gap: 15px;
	text-align: center;
	& > div:not(:first-child) {
		border-radius: 10px;
		border: 1px solid #e5e5e5;
		padding: 24px;
		svg {
			width: 24px;
			height: 24px;
		}
		p:first-of-type {
			font-size: 18px;
			color: #999999;
			font-weight: 600;
			line-height: 1.44;
			letter-spacing: -0.5px;
			margin-bottom: 2px;
		}
		p:last-of-type {
			font-size: 15px;
			color: #999999;
			margin-bottom: 16px;
		}
		button {
			margin: auto;
			background-color: #fff;
			color: #292929;
			border: 1px solid #e5e5e5;
			padding: 0 24px;
			height: 40px;
			&:hover {
				border: 1px solid #d1d1d7;
			}
		}
	}
`;
const FirstContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 100%;
	gap: 15px;
	& > div {
		width: calc(50% - 7.5px);
		@media (max-width: 768px) {
			flex: 100%;
			max-width: 100%;
		}
		height: 195px;
		background-color: #fff;
		border-radius: 10px;
		padding: 24px;
		position: relative;
		text-align: left;

		div:first-child {
			display: flex;
			align-items: center;
			svg {
				width: 20px;
				height: 20px;
				@media (max-width: 1024px) {
					width: 17px;
					height: 17px;
				}
				margin: 8px;
				margin-top: 4px;
			}
			span {
				line-height: 1.44;
				font-size: 18px;
				@media (max-width: 1024px) {
					font-size: 15px;
				}
				color: #292929;
				font-weight: 600;
			}
		}
		div:not(:first-child) {
			color: #767676;
			font-size: 15px;
			line-height: 1.43;
			margin: 0 8px 2px;
			@media (max-width: 1024px) {
				font-size: 13px;
			}
		}
		svg:last-child {
			position: absolute;
			right: 40px;
			top: 30px;
			width: 22px;
			height: 22px;
			cursor: pointer;
		}
	}
`;
function ProfileSection() {
	const { user } = useUser();
	const data = user && user.user_metadata ? user.user_metadata : {};
	const { firstName, lastName, phone, email } = data;
	const isAddressCompleted = data.addressName ? true : false;
	return (
		<StyledProfileSection>
			<SideDrawer>
				<UserInformation>
					<FirstContainer>
						<div>
							<div>
								<FaRegUser />
								<span>Informations</span>
							</div>
							<div>
								{firstName} {lastName}
							</div>
							<div>{email}</div>
							<div style={{ letterSpacing: "0.7px" }}>+20{phone}</div>
							<SideDrawer.Open opens="updateInformation">
								<PiNotePencil />
							</SideDrawer.Open>
							<SideDrawer.Window name="updateInformation">
								<UpdateInformation />
							</SideDrawer.Window>
						</div>
						<div>
							<div>
								<PiLockKeyLight />
								<span>Login & password</span>
							</div>
							<div>Login: {email}</div>
							<div>Password: ********</div>
							<SideDrawer.Open opens="updatePassword">
								<PiNotePencil />
							</SideDrawer.Open>
							<SideDrawer.Window name="updatePassword">
								<UpdatePassword userData={user?.user_metadata} />
							</SideDrawer.Window>
						</div>
					</FirstContainer>
					<div>
						<BsGlobeEuropeAfrica />
						<p>{isAddressCompleted ? "Address is completed" : "No address completed"}</p>
						<p>Find here your default addresses</p>
						<SideDrawer.Open opens="completeAddress">
							<Button>{isAddressCompleted ? "Edit Your Address" : "Complete Your Address"}</Button>
						</SideDrawer.Open>
						<SideDrawer.Window name="completeAddress">
							<CompleteAddress />
						</SideDrawer.Window>
					</div>
					<div>
						<PiCreditCard style={{ width: "35px", height: "35px", margin: "12px 8px 4px" }} />
						<p>No payment method saved</p>
						<p>Save your default payment method during checkout</p>
					</div>
				</UserInformation>
			</SideDrawer>
		</StyledProfileSection>
	);
}

export default ProfileSection;
