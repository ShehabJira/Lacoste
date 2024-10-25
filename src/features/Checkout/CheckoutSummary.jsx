import { useState } from "react";
import { useUserInfo } from "../../contexts/UserInfoContext";
import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { formatCurrency } from "../../utils/helpers";
import Accordion from "../../ui/Accordion";
import SummaryItem from "../../ui/SummaryItem";

const StyledCheckoutSummary = styled.div`
	@media (min-width: 1024px) {
		position: sticky;
		top: 85px;
		padding: 68px;
		height: calc(100dvh - 85px);
		overflow: hidden;
	}
	@media (max-width: 1024px) {
		padding: 30px 15px;
	}
`;
const H = styled.div`
	padding-bottom: 32px;
	font-size: 18px;
	font-weight: 800;
`;
const Details = styled.div`
	padding-top: 24px;
	color: #292929;
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 8px;
		font-size: 15px;
		&.total {
			padding-top: 16px;
			font-weight: 800;
			color: #292929;
		}
		&.promtionalCode {
			span:last-child {
				color: #187c48;
			}
		}
		&.youSaved {
			span:first-child,
			span:last-child {
				color: #545454;
				font-weight: 800;
				font-size: 13px;
			}
			span:last-child {
				color: #187c48;
			}
		}
		&:last-child {
			padding-bottom: 0;
			padding-top: 32px;
			justify-content: center;
			gap: 8px;
			img {
				width: 40px;
				aspect-ratio: 40/23;
			}
		}
	}
`;

function CheckoutSummary() {
	const [openedAccordion, setOpenedAccordion] = useState("");
	const { userState, totalItemsPrice, nItems, taxFees, promocodeDiscount, totalMoney } = useUserInfo();

	return (
		<StyledCheckoutSummary>
			<H>Order summary</H>
			<Accordion className={openedAccordion === "productsSummary" ? "active" : ""}>
				<div onClick={() => (openedAccordion === "productsSummary" ? setOpenedAccordion("") : setOpenedAccordion("productsSummary"))}>
					<div>
						<span>products</span>
						<span>-</span>
						<span>{totalItemsPrice} EGP</span>
					</div>
					<BsChevronDown className={openedAccordion === "productsSummary" ? "opened" : ""} />
				</div>
				<div>
					<div>
						{userState.bag.map((itemObj) => (
							<SummaryItem key={`${itemObj.productId}${itemObj.productSize}`}>
								<img src={itemObj.image} alt="clothing item" />
								<div>
									<div>{itemObj.productModel}</div>
									<div>{itemObj.productColor}</div>
									<div>Size {itemObj.productSize}</div>
									<div>
										<span>Qty: {itemObj.productQuantity}</span>{" "}
										<span className="pricing">
											<span>{itemObj.totalPrice} EGP</span>
											{itemObj.salesPercent > 0 && <span>{itemObj.totalRegularPrice} EGP</span>}
										</span>
									</div>
								</div>
							</SummaryItem>
						))}
					</div>
				</div>
			</Accordion>
			<Accordion className={openedAccordion === "deliverySummary" ? "active" : ""}>
				<div onClick={() => (openedAccordion === "deliverySummary" ? setOpenedAccordion("") : setOpenedAccordion("deliverySummary"))}>
					<div>
						<span>Delivery</span>
						<span>-</span>
						<span>Free</span>
					</div>
					<BsChevronDown className={openedAccordion === "deliverySummary" ? "opened" : ""} />
				</div>
				<div>
					<div>
						<div>
							{userState.area}, {userState.city}
						</div>
						<div>from 1-7 working days</div>
					</div>
				</div>
			</Accordion>
			<Details>
				<div>
					<span>{nItems} items</span>
					<span>{formatCurrency(totalItemsPrice)}</span>
				</div>
				<div>
					<span>Standard Delivery</span>
					<span>0.00</span>
				</div>
				{userState.hasValidPromocode && (
					<div className="promtionalCode">
						<span>Promotional code - GET10</span>
						<span>-{promocodeDiscount}</span>
					</div>
				)}
				<div>
					<span>Tax fees (included)</span>
					<span>{taxFees}</span>
				</div>
				<div className="total">
					<span>Total</span>
					<span>{totalMoney} EGP</span>
				</div>
				{userState.hasValidPromocode && (
					<div className="youSaved">
						<span>You saved</span>
						<span>{promocodeDiscount} EGP</span>
					</div>
				)}
				<div>
					<img src="/summary-visa.svg" alt="visa" />
					<img src="/summary-mastercard.svg" alt="mastercard" />
					<img src="/summary-apple-pay.svg" alt="apple pay" />
					<img src="/summary-cash-on-delivery.svg" alt="cash on delivery" />
				</div>
			</Details>
		</StyledCheckoutSummary>
	);
}

export default CheckoutSummary;
