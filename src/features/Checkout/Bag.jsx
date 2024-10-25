import styled from "styled-components";
import CheckoutStepHeading from "../../ui/CheckoutStepHeading";
import { BsChevronDown, BsTrash3 } from "react-icons/bs";
import { useState } from "react";
import Button from "../../ui/Button";
import { useUserInfo } from "../../contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import InputContainer from "../../ui/InputContainer";
import ValidateButton from "../../ui/ValidateButton";
import { useAllProducts } from "../Products/useAllProducts";
import FullPageLoading from "../../ui/FullPageLoading";

const H = styled.h2`
	font-size: 18px;
	font-weight: 800;
	padding-bottom: 30px;
	background-color: #fff;
	border-radius: 8px;
	display: block;
	&.outside {
		display: none;
	}
	&.inside {
		display: block;
	}

	@media (max-width: 1024px) {
		&.inside {
			display: none;
		}
		&.outside {
			display: block;
		}
		padding: 30px 15px;
		margin-bottom: 4px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
		border-radius: 8px;
	}
`;
const BagItems = styled.div`
	background-color: #fff;
	@media (max-width: 1024px) {
		background-color: #f4f4f4;
	}
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
	border-radius: 8px;
	@media (min-width: 1024px) {
		padding: 67px;
	}
`;
const Item = styled.div`
	background-color: #fff;
	border-radius: 8px;
	display: flex;
	&:not(:last-child) {
		margin-bottom: 16px;
	}
	@media (max-width: 1024px) {
		padding: 30px 16px;
		&:not(:last-child) {
			margin-bottom: 4px;
		}
	}
	& > img {
		width: 105px;
		height: 147px;
		object-fit: cover;
		border-radius: 8px;
	}
	@media (min-width: 1024px) {
		img {
			width: 134px;
			height: 188px;
		}
	}
	& > div {
		padding: 0 42px 0 16px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #767676;
		width: 100%;
		div {
			div {
				&:first-child {
					font-size: 15px;
					color: #292929;
				}
				&:not(:first-child) {
					line-height: 25px;
					font-size: 13px;
				}
			}
		}
		div.pricing {
			line-height: 25px;
			font-size: 13px;
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
		svg {
			position: absolute;
			right: 0;
			top: 0;
			width: 22px;
			height: 22px;
			cursor: pointer;
			transition: 0.3s;
			&:hover {
				color: #da2222;
			}
		}
		select {
			position: absolute;
			top: 50%;
			right: 0;
			padding: 2px 10px;
			font-size: 13px;
			color: #292929;
			height: 28px;
			border-radius: 20px;
			background-color: #f4f4f4;
			border: none;
			outline: none;
			cursor: pointer;
		}
	}
`;
const DeliverySelection = styled.div`
	background-color: #fff;
	margin-top: 8px;
	border-radius: 8px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);

	@media (min-width: 1024px) {
		padding: 67px;
	}
	@media (max-width: 1024px) {
		padding: 32px 16px;
	}
	& > div:first-child {
		margin-bottom: 32px;
		p:first-child {
			font-size: 18px;
			font-weight: 800;
			margin-bottom: 16px;
		}
		p:last-child {
			font-size: 15px;
			color: #545454;
			span {
				color: #292929;
				font-weight: 800;
			}
		}
	}
`;
const Options = styled.div`
	background-color: #fff;
	margin-top: 8px;
	border-radius: 8px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
	& > h3 {
		font-size: 18px;
		font-weight: 800;
		color: #292929;
		@media (min-width: 1024px) {
			padding: 67px 67px 16px;
		}
		@media (max-width: 1024px) {
			padding: 30px 15px 16px;
		}
	}
	& > div {
		@media (min-width: 1024px) {
			padding: 32px 67px 67px;
		}
		@media (max-width: 1024px) {
			padding: 32px 15px 30px;
		}
		font-size: 15px;
	}
`;
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
			transition: 0.3s;

			&.opened {
				transform: rotate(180deg);
			}
		}
	}
	& > div:last-child {
		padding-top: 24px;
		& > div {
			color: #545454;
			margin-bottom: 8px;
			&:last-child {
				margin-bottom: 24px;
			}
		}
	}
`;
const CheckoutCoupon = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #ebf7f1;
	border: 0.0625rem solid #38b272;
	border-radius: 8px;
	margin-top: 32px;
	padding: 8px 16px;
	div {
		span:first-child {
			color: #292929;
			font-size: 15px;
		}
		span:last-child {
			font-weight: 800;
			color: #292929;
		}
	}
	svg {
		width: 22px;
		height: 22px;
		cursor: pointer;
		transition: 0.3s;
		&:hover {
			color: #da2222;
		}
	}
`;

function Bag() {
	const [openedAccordion, setOpenedAccordion] = useState("");
	const { dispatch, userState, nItems, promocodeDiscount } = useUserInfo();
	const ids = userState.bag.map((item) => +item.productId); // [779, 778]
	const { allProducts: userSelectedProducts, isGettingAllProducts } = useAllProducts(ids);
	const navigate = useNavigate();

	if (isGettingAllProducts) return <FullPageLoading />;

	function handleApplyPromocode(e) {
		if (userState.userPromocode.toLowerCase() === "get10") {
			e.currentTarget.parentElement.classList.remove("wrong");
			dispatch({ type: "user/hasValidPromocode", payload: true });
		} else {
			e.currentTarget.parentElement.classList.add("wrong");
			dispatch({ type: "user/hasValidPromocode", payload: false });
		}
	}
	function handleDelete(id, size) {
		if (userState.bag.length === 1) {
			sessionStorage.removeItem("userState");
			dispatch({ type: "user/deleteBagItem", payload: { id, size } });
			dispatch({ type: "user/resetBag" });
		} else dispatch({ type: "user/deleteBagItem", payload: { id, size } });
	}

	return (
		<div>
			<CheckoutStepHeading pbLg="32px" pbSm="32px" ptSm="32px" active={true} step="1 / 3" heading="Bag & options" />
			<H className="outside">{nItems} items</H>
			<BagItems>
				<H className="inside">{nItems} items</H>
				{userState.bag.map((item) => (
					<Item key={item.productId + item.productSize}>
						<img src={item.image} alt="clothing" />
						<div>
							<div>
								<div>{item.productModel}</div>
								<div>{item.productColor}</div>
								<div>Size {item.productSize}</div>
							</div>
							<div className="pricing">
								<span>{item.totalPrice} EGP</span>
								{item.salesPercent > 0 && <span> {item.totalRegularPrice} EGP</span>}
							</div>
							<BsTrash3 onClick={() => handleDelete(item.productId, item.productSize)} />
							<select
								value={+item.productQuantity}
								onChange={(e) =>
									dispatch({ type: "user/updateBagItemQuantity", payload: { id: item.productId, size: item.productSize, quantity: e.target.value } })
								}
							>
								{/* {Array.from({ length: +item.productQuantity }, (_, i) => (
									<option value={i + 1} key={i}>
										{i + 1}
									</option>
								))} */}
								{Array.from({ length: userSelectedProducts.find((product) => +product.id === +item.productId).availableItems[item.productSize] }, (_, i) => (
									<option value={i + 1} key={i}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
					</Item>
				))}
			</BagItems>
			<DeliverySelection>
				<div>
					<p>Delivery Selection</p>
					<p>
						To see the most accurate delivery options,
						<span> please enter a city and area name:</span>
					</p>
				</div>
				<InputContainer>
					<label htmlFor="city" className={userState.city ? "full" : ""}>
						City name
					</label>
					<input type="text" name="city" id="city" value={userState.city} onChange={(e) => dispatch({ type: "user/city", payload: e.target.value })} />
				</InputContainer>
				<InputContainer>
					<label htmlFor="area" className={userState.area ? "full" : ""}>
						Area name
					</label>
					<input type="text" name="city" id="area" value={userState.area} onChange={(e) => dispatch({ type: "user/area", payload: e.target.value })} />
				</InputContainer>
			</DeliverySelection>
			<Options>
				<h3>Options</h3>
				<Accordion>
					<div onClick={() => (openedAccordion === "promocode" ? setOpenedAccordion("") : setOpenedAccordion("promocode"))}>
						<div>Add a promo code or coupon</div>
						<BsChevronDown className={openedAccordion === "promocode" ? "opened" : ""} />
					</div>
					<div>
						{openedAccordion === "promocode" && (
							<>
								<InputContainer>
									<label htmlFor="promocode" className={userState.userPromocode ? "full" : ""}>
										Enter a promotion code
									</label>
									<input
										type="text"
										id="promocode"
										name="promocode"
										value={userState.userPromocode}
										onChange={(e) => dispatch({ type: "user/userPromocode", payload: e.target.value })}
									/>
									<Button disabled={userState.userPromocode === ""} onClick={(e) => handleApplyPromocode(e)}>
										Apply
									</Button>
								</InputContainer>
								{userState.hasValidPromocode && (
									<CheckoutCoupon>
										<div>
											<span>GET10 applied </span>
											<span>- {promocodeDiscount} EGP</span>
										</div>
										<BsTrash3
											onClick={() => {
												dispatch({ type: "user/userPromocode", payload: "" });
												dispatch({ type: "user/hasValidPromocode", payload: false });
											}}
										/>
									</CheckoutCoupon>
								)}
								<p style={{ marginTop: "0" }}>Promotion code doesn't exists</p>
							</>
						)}
					</div>
				</Accordion>
			</Options>
			<ValidateButton>
				<Button
					disabled={!userState.city || !userState.area}
					onClick={() => {
						navigate("/checkout/contact");
						window.scrollTo({ top: 0, left: 0 });
					}}
				>
					Continue to checkout
				</Button>
			</ValidateButton>
			<CheckoutStepHeading pbLg="32px" pbSm="15px" active={false} step="2 / 3" heading="Contact & information" />
			<CheckoutStepHeading active={false} step="3 / 3" heading="Payment" pbSm="32px" />
		</div>
	);
}

export default Bag;
