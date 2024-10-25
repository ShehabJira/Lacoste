import styled from "styled-components";
import { BsChevronRight } from "react-icons/bs";
import SideDrawer from "../../ui/SideDrawer";
import DescriptionSide from "./DescriptionSide";
import DeliverySide from "./DeliverySide";

const StyledDescriptionAndCare = styled.section`
	@media (min-width: 1024px) {
		margin: 64px 0;
	}
`;
const Container = styled.div`
	@media (min-width: 1024px) {
		padding-left: calc(3 * (100vw - 1px) / 25);
		padding-right: calc(3 * (100vw - 1px) / 25);
	}
`;
const Info = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 48px 0;
	font-family: archivo;
	cursor: pointer;
	@media (max-width: 1024px) {
		padding: 32px 76px;
		&:not(:last-child) {
			border-bottom: 1px solid #eee;
		}
	}
	@media (max-width: 768px) {
		padding: 32px 15px 24px;
	}

	h3 {
		align-self: flex-start;
		color: #292929;
		font-size: 15px;
		font-weight: bold;
	}
	div:first-of-type {
		line-height: 25px;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 569px;
		font-size: 15px;
		color: #292929;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		@media (max-width: 1024px) {
			display: none;
		}
	}
	div:last-of-type {
		width: 114px;
		text-align: right;
		svg {
			width: 18px;
			height: 18px;
		}
	}
`;

function DescriptionAndCare() {
	return (
		<StyledDescriptionAndCare>
			<Container>
				<SideDrawer>
					<SideDrawer.Open opens="description">
						<Info>
							<h3>Description and care</h3>
							<div>
								The Original L.12.12 is the very first polo shirt invented by René Lacoste in 1933. With its collar, button placket and Petit Piqué, it
								revolutionised elegant sportswear and freedom of movement. Made using 20 kilometres of thread knitted under two levels of tension and a
								crocodile logo with 2367 stitches, the Original L.12.12 is a real coming together of know-how and expertise.
							</div>
							<div>
								<BsChevronRight />
							</div>
						</Info>
					</SideDrawer.Open>
					<SideDrawer.Window name="description">
						<DescriptionSide />
					</SideDrawer.Window>

					<SideDrawer.Open opens="delivery">
						<Info>
							<h3>FREE DELIVERY AND RETURNS</h3>
							<div>
								Enjoy Free Returns using our easy returns process. We accept returns 14 days from receipt of your order purchased on Lacoste.com.eg. To return a
								product login to your account or if you do not have an account use the link your order shipment email and follow the easy steps. Underwear,
								swimwear, and perfumes cannot be returned, exchanged, or refunded.
							</div>
							<div>
								<BsChevronRight />
							</div>
						</Info>
					</SideDrawer.Open>
					<SideDrawer.Window name="delivery">
						<DeliverySide />
					</SideDrawer.Window>
				</SideDrawer>
			</Container>
		</StyledDescriptionAndCare>
	);
}

export default DescriptionAndCare;
