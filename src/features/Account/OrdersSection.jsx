import styled from "styled-components";
import HeadingRow from "../../ui/HeadingRow";
import { BsChevronDown, BsLaptop } from "react-icons/bs";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Accordion from "../../ui/Accordion";
import SummaryItem from "../../ui/SummaryItem";
import Spinner from "../../ui/Spinner";

const StyledOrderSection = styled.div`
	@media (min-width: 1024px) {
		width: 92% !important;
	}
`;
const Orders = styled.div`
	margin: 20px 20px 66px;
	padding: 70px 15px 68px;
	&.hasOrders {
		padding: 60px 15px 40px;
	}
	@media (max-width: 768px) {
		&.hasOrders {
			padding: 30px 15px;
		}
	}
	border: 1px solid #e5e5e5;
	border-radius: 10px;
	text-align: center;
	color: #999999;
	svg {
		width: 55px;
		height: 40px;
		margin-bottom: 16px;
	}
	p {
		margin-bottom: 16px;
		&:first-of-type {
			font-size: 18px;
			font-weight: 600;
		}
		&:last-of-type {
			font-size: 15px;
		}
	}
	button {
		margin: auto;
		width: 200px;
		height: 40px;
	}
`;
const OrderAccordion = styled(Accordion)`
	color: #292929;
	@media (min-width: 600px) {
		margin: 0 50px;
	}
	& {
		border-bottom: none;
	}
	&:not(:last-child) {
		border-bottom: 1px solid #d5d5d5;
	}
	&:nth-child(3) {
		padding-top: 0;
	}
	& > div:first-child {
		line-height: 32px;
		padding-top: 40px;
		position: relative;
		strong {
			position: absolute;
			top: 10px;
			left: 50%;
			transform: translateX(-50%);
			white-space: nowrap;
			font-variant: all-small-caps;
			span:first-child {
				color: #0f5a33;
				text-decoration: underline;
				margin-right: 10px;
			}
			span:last-child {
				font-weight: normal;
			}
		}
	}

	& > div:last-child {
		& > div {
			& > div:not(:last-child) {
				margin-bottom: 24px;
			}
		}
	}
`;
const OrderSummaryItem = styled(SummaryItem)`
	& > div {
		text-align: left;
		& > div:first-child {
			font-weight: 600;
		}
		@media (max-width: 768px) {
			& > div:not(:first-child) {
				line-height: 18px;
			}
		}
	}
	& > img {
		width: 120px;
		height: 120px;
	}
	@media (min-width: 768px) {
		& > img {
			width: 160px;
			height: 160px;
		}
		& > div {
			padding-left: 20px;
			font-size: 15px;
			width: 45%;
		}
	}
	@media (max-width: 768px) {
		& > div {
			div:last-child {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
`;

function OrdersSection({ orders, isLoading }) {
	const navigate = useNavigate();
	const [openedAccordion, setOpenedAccordion] = useState(0);

	return (
		<StyledOrderSection>
			<HeadingRow>
				<span>Orders</span>
			</HeadingRow>

			<Orders className={!orders ? "" : "hasOrders"}>
				{isLoading ? (
					<Spinner />
				) : (
					<>
						{!orders.length ? (
							<>
								<div>
									<BsLaptop />
								</div>
								<p>No order placed yet</p>
								<p>Find all of your orders and details here</p>
								<Button $backgroundColor="#fff" color="#292929" onClick={() => navigate("/lacoste")}>
									Show me products
								</Button>
							</>
						) : (
							<>
								{orders.map((order, i) => (
									<OrderAccordion key={i} className={openedAccordion === i + 1 ? "active" : ""}>
										<div onClick={() => (openedAccordion === i + 1 ? setOpenedAccordion("") : setOpenedAccordion(i + 1))}>
											<strong>
												<span>Order number #{order.id}</span> <span>({new Date(order.created_at).toDateString()})</span>
											</strong>
											<div>
												<span>products</span>
												<span>-</span>
												<span>{order.totalMoney} EGP</span>
											</div>
											<BsChevronDown className={openedAccordion === i + 1 ? "opened" : ""} />
										</div>
										<div>
											<div>
												{order.bag.map((itemObj, i) => (
													<OrderSummaryItem key={`${itemObj.productId}${itemObj.productSize}${i}`}>
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
													</OrderSummaryItem>
												))}
											</div>
										</div>
									</OrderAccordion>
								))}
							</>
						)}
					</>
				)}
			</Orders>
		</StyledOrderSection>
	);
}

export default OrdersSection;
