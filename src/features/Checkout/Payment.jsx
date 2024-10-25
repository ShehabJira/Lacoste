import styled from "styled-components";
import CheckoutStepHeading from "../../ui/CheckoutStepHeading";
import { useNavigate } from "react-router-dom";
import LinkedSteps from "../../ui/LinkedSteps";
import { useEffect, useState } from "react";
import InputContainer from "../../ui/InputContainer";
import Button from "../../ui/Button";
import ValidateButton from "../../ui/ValidateButton";
import { useForm } from "react-hook-form";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUserInfo } from "../../contexts/UserInfoContext";
import { useUploadOrder } from "./useUploadOrder";
import { useUser } from "../Authentication/useUser";
import { useAllProducts } from "../Products/useAllProducts";
import FullPageLoading from "../../ui/FullPageLoading";
import { useUpdateProduct } from "../Products/useUpdateProduct";
import toast from "react-hot-toast";

const StyledPayment = styled.div`
	@media (max-width: 1024px) {
		padding-top: 32px;
		margin-bottom: 32px;
	}
	& > p {
		margin-bottom: 16px;
		color: #292929;
		font-size: 15px;
		@media (max-width: 1024px) {
			margin-left: 15px;
		}
	}
`;
const PaymentMethod = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
	@media (min-width: 1024px) {
		padding: 67px;
	}
	@media (max-width: 1024px) {
		padding: 30px 15px;
	}

	& > p {
		font-size: 18px;
		color: #292929;
		margin-bottom: 16px;
		font-weight: 800;
	}
	& > label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 16px;
		border: 0.0625rem solid #e5e5e5;
		background-color: #fafafa;
		border-radius: 8px;
		& > div {
			display: flex;
			gap: 8px;
			& > span {
				font-size: 15px;
				font-weight: 800;
				color: #292929;
			}
			& > div {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 4px;
				img {
					width: 40px;
					aspect-ratio: 40/24;
				}
			}
		}
		input {
			display: inline-block;
			width: 20px;
			height: 20px;
			outline: none;
			accent-color: #292929;
		}
	}

	& > label:first-of-type {
		margin-bottom: 16px;
	}

	& > label.hasDetails {
		background-color: #ebf7f1;
		border-radius: 8px 8px 0 0;
		border-color: #38b272 #38b272 #eee #38b272;
		margin-bottom: 0;
	}
`;
const Details = styled.div`
	border: 1px solid transparent;
	border-color: transparent #38b272 #38b272 #38b272;
	margin-bottom: 16px;
	padding: 32px 16px 0;
	&:last-child {
		padding: 0 16px;
	}
	border-radius: 0 0 8px 8px;
	div:nth-child(3) {
		display: flex;
		gap: 32px;
	}
	div:nth-child(4) {
		margin: 32px 0;
		span {
			color: #38b272;
			text-decoration: underline;
			cursor: pointer;
		}
	}
`;
const toastBtnStyle = {
	marginLeft: "8px",
	padding: "4px 8px",
	fontSize: "16px",
	borderRadius: "4px",
	outline: "none",
	border: "1px solid #e5e5e5",
	fontWeight: "100",
	transition: "300ms",
};

function Payment() {
	const navigate = useNavigate();
	const [showDetails, setShowDetails] = useState("");
	const { userState, dispatch } = useUserInfo();
	const { register, handleSubmit, formState, reset } = useForm();
	const { errors, dirtyFields, isSubmitSuccessful, isLoading } = formState;

	const { uploadOrder, isUploadingOrder } = useUploadOrder();
	const { updateProduct } = useUpdateProduct();
	const ids = userState.bag.map((item) => +item.productId); // [779, 778]
	const { allProducts: userSelectedProducts, isGettingAllProducts } = useAllProducts(ids);
	const { user } = useUser();
	useEffect(
		function () {
			if (isSubmitSuccessful) {
				navigate(`${user ? "/account/my-orders" : "/"}`);
				window.scrollTo({ top: 0, left: 0 });
				reset();
			}
		},
		[isSubmitSuccessful, reset, navigate, user]
	);

	if (isGettingAllProducts) return <FullPageLoading />;

	function onSubmit(data) {
		dispatch({ type: "user/isPaid", payload: true });
		sendOrder();
	}

	function sendOrder() {
		const tokenQuantities = Object.fromEntries(
			userSelectedProducts.map((product) => [
				product.id,
				Object.fromEntries(userState.bag.filter((item) => +item.productId === +product.id).map((item) => [item.productSize, item.productQuantity])),
			])
		); // {779: {'2': 2, '4': 1}, 780: {'2': 1}}

		userSelectedProducts.forEach((product) => {
			for (const sizeKey in product.availableItems) {
				for (const tokenSizeKey in tokenQuantities[product.id]) {
					if (+sizeKey === +tokenSizeKey) {
						if (+product.availableItems[sizeKey] - +tokenQuantities[product.id][tokenSizeKey] === 0) {
							delete product.availableItems[sizeKey];
							product.sizes = product.sizes.filter((size) => +size !== +sizeKey);
						} else product.availableItems[sizeKey] = +product.availableItems[sizeKey] - +tokenQuantities[product.id][tokenSizeKey];
					}
				}
			}
		});

		// update all the products the user has selected in supabase.
		for (let i = 0; i < userSelectedProducts.length; i++) updateProduct({ product: userSelectedProducts[i], id: userSelectedProducts[i].id });

		toast(
			(t) => (
				<span>
					Order number: <b>{userState.id}</b>
					<button
						style={toastBtnStyle}
						onClick={(e) => {
							navigator.clipboard.writeText(userState.id);
							e.target.innerHTML = "Copied";
							e.target.style.backgroundColor = "#15803d";
							e.target.style.color = "#fff";
						}}
					>
						Copy
					</button>
					<button style={toastBtnStyle} onClick={() => toast.dismiss(t.id)}>
						Dismiss
					</button>
				</span>
			),
			{ duration: 900000 }
		);

		uploadOrder(userState);
	}

	return (
		<StyledPayment>
			<LinkedSteps>
				<CheckoutStepHeading reached={true} heading="Bag & options" active={true} />
				<p>Standard Delivery</p>
				<span onClick={() => navigate("/checkout/bag")} role="button">
					Edit
				</span>
			</LinkedSteps>
			<LinkedSteps>
				<CheckoutStepHeading reached={true} heading="Contact & information" active={true} />
				<p>
					{userState.title}. {userState.firstName} {userState.lastName} - {userState.area}, {userState.flatNumberBuildingName}
				</p>
				<span>{userState.city}</span> |{" "}
				<span onClick={() => navigate("/checkout/contact")} role="button">
					Edit
				</span>
			</LinkedSteps>
			<CheckoutStepHeading step="3 / 3" heading="Payment" active={true} pbLg="32px" pbSm="32px" />
			<p>Please select a payment method to place an order.</p>

			<PaymentMethod>
				<p>Select a method</p>
				<label htmlFor="card" className={showDetails === "cardDetails" ? "hasDetails" : ""}>
					<div>
						<span>Credit Card</span>
						<div>
							<img src="/summary-visa.svg" alt="visa" />
							<img src="/summary-mastercard.svg" alt="mastercard" />
							<img src="/summary-apple-pay.svg" alt="apple pay" />
						</div>
					</div>
					<input type="radio" id="card" name="paymentMethod" onClick={() => setShowDetails("cardDetails")} />
				</label>
				{showDetails === "cardDetails" && (
					<Details>
						<form onSubmit={handleSubmit(onSubmit)}>
							<InputContainer $mt="0" className={errors.cardName ? "wrong" : ""}>
								<label htmlFor="cardName" className={dirtyFields.cardName ? "full" : ""}>
									Credit card holder name*
								</label>
								<input type="text" id="cardName" placeholder="Enter your name" {...register("cardName", { required: "Card name is required!" })} />
							</InputContainer>
							<InputContainer $mt="0" className={errors.cardNumber ? "wrong" : ""}>
								<label htmlFor="cardNumber" className={dirtyFields.cardNumber ? "full" : ""}>
									Card number*
								</label>
								<input
									type="text"
									id="cardNumber"
									placeholder="xxxx xxxx xxxx xxxx"
									{...register("cardNumber", {
										required: "Card number is required!",
										validate: (value) => (value.length === 16 && +value) || "Card number should consist of 16 digits!",
									})}
								/>
							</InputContainer>
							<div>
								<InputContainer $mt="0" $mb="0" className={errors.expirationDate ? "wrong" : ""}>
									<label htmlFor="expirationDate" className={dirtyFields.expirationDate ? "full" : ""}>
										Expiration date*
									</label>
									<input
										type="text"
										id="expirationDate"
										placeholder="MM / YY"
										{...register("expirationDate", { required: "Expiration date is required!", pattern: /[0-9]{1,2}\/[0-9]{1,2}/ })}
									/>
								</InputContainer>
								<InputContainer $mt="0" $mb="0" className={errors.securityCode ? "wrong" : ""}>
									<label htmlFor="securityCode" className={dirtyFields.securityCode ? "full" : ""}>
										Security code*
									</label>
									<input
										type="text"
										id="securityCode"
										placeholder="xxx"
										{...register("securityCode", {
											required: "Security code is required!",
											validate: (value) => value.length === 3 || "Security code should consist of 3 digits!",
										})}
									/>
								</InputContainer>
							</div>
							<div>
								By validating my order, I declare to have read and accepted without reservations the <span>general conditions of sale.</span>
							</div>
							<ValidateButton $letterSp="2px" $center>
								<Button disabled={Object.keys(errors).length || isUploadingOrder} type="submit">
									{isLoading ? (
										<>
											Validating
											<SpinnerMini style={{ marginRight: "0" }} />
										</>
									) : (
										"Validate and pay"
									)}
								</Button>
							</ValidateButton>
						</form>
					</Details>
				)}
				<label htmlFor="cash" className={showDetails === "cashDetails" ? "hasDetails" : ""}>
					<div>
						<span>Cash On Delivery</span>
						<div>
							<img src="/summary-cash-on-delivery.svg" alt="cash on delivery" />
						</div>
					</div>
					<input type="radio" id="cash" name="paymentMethod" onClick={() => setShowDetails("cashDetails")} />
				</label>
				{showDetails === "cashDetails" && (
					<Details>
						<ValidateButton $letterSp="2px" $center>
							<Button
								onClick={() => {
									navigate(`${user ? "/account/my-orders" : "/"}`);
									window.scrollTo({ top: 0, left: 0 });
									sendOrder();
								}}
								disabled={isUploadingOrder}
							>
								Checkout
							</Button>
						</ValidateButton>
					</Details>
				)}
			</PaymentMethod>
		</StyledPayment>
	);
}

export default Payment;
