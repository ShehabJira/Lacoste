import styled from "styled-components";
import CheckoutStepHeading from "../../ui/CheckoutStepHeading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import InputContainer from "../../ui/InputContainer";
import { useUserInfo } from "../../contexts/UserInfoContext";
import LinkedSteps from "../../ui/LinkedSteps";
import ValidateButton from "../../ui/ValidateButton";
import SpinnerMini from "../../ui/SpinnerMini";
import { useEffect } from "react";

const ShippingAddress = styled.div`
	background-color: #fff;
	box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
	border-radius: 8px;
	@media (min-width: 1024px) {
		padding: 67px;
	}
	@media (max-width: 1024px) {
		padding: 30px 15px;
	}
	& > p:first-child {
		font-size: 18px;
		font-weight: 800;
		margin-bottom: 24px;
	}
	& > p:nth-child(2) {
		font-size: 15px;
		color: #545454;
		margin-bottom: 24px;
	}
	div.deliveryAddress {
		font-size: 18px;
		color: #212121;
		font-weight: 800;
	}
`;
const SubscriptionTitle = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	border: none;
	label {
		transition: 0.3s;
		display: block;
		padding: 8px 16px;
		font-size: 14px;
		color: #191919;
		border-radius: 18px;
		cursor: pointer;
		border: 1px solid #c8c8c8;
	}
	input[type="radio"]:checked + label {
		background-color: #191919;
		color: #fff;
	}
`;
const PhoneRow = styled.div`
	padding-bottom: 6px;
	margin-bottom: 32px;
	font-size: 16px;
	display: flex;
	@media (min-width: 1200px) {
		width: 60%;
		& > div:last-child {
			width: 100%;
		}
	}
	gap: 8px;
	& > div:first-child {
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		flex-direction: column;
		white-space: nowrap;
		span:first-child {
			color: #767676;
		}
	}
`;
const NewsLetter = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	margin-top: 25px;
	@media (max-width: 1024px) {
		margin-left: 15px;
	}
	& input[type="checkbox"] {
		width: 28px;
		height: 20px;
		display: block;
		border-radius: 20px;
		border: 1px solid #cbcbcb;
		outline: none;
		accent-color: #292929;
	}
`;

function ContactAndInformation() {
	const navigate = useNavigate();
	const { userState, dispatch, totalMoney } = useUserInfo();
	const { handleSubmit, register, formState, reset } = useForm({
		defaultValues: userState,
	});
	const { errors, dirtyFields, isLoading, isSubmitSuccessful, defaultValues } = formState;

	useEffect(
		function () {
			if (isSubmitSuccessful) {
				navigate("/checkout/payment");
				dispatch({ type: "user/totalMoney", payload: totalMoney });
				window.scrollTo({ top: 0, left: 0 });
				reset();
			}
		},
		[isSubmitSuccessful, navigate, reset, dispatch, totalMoney]
	);

	function onSubmit(data) {
		dispatch({ type: "user/update", payload: data });
	}
	return (
		<div style={{ paddingTop: "32px" }}>
			<LinkedSteps>
				<CheckoutStepHeading reached={true} heading="Bag & options" active={true} />
				<p>Standard Delivery</p>
				<span onClick={() => navigate("/checkout/bag")} role="button">
					Edit
				</span>
			</LinkedSteps>
			<CheckoutStepHeading step="2 / 3" heading="Contact & information" active={true} pbLg="32px" pbSm="32px" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<ShippingAddress>
					<p>Ship To</p>
					<p>Fill in your personal information</p>

					<SubscriptionTitle>
						<div>
							<input type="radio" value="Miss" id="miss" hidden {...register("title", { required: "Title is required!" })} />
							<label htmlFor="miss">Miss*</label>
						</div>
						<div>
							<input type="radio" value="Mrs" id="mrs" hidden {...register("title", { required: "Title is required!" })} />
							<label htmlFor="mrs">Mrs*</label>
						</div>
						<div>
							<input type="radio" value="Mr" id="mr" hidden {...register("title", { required: "Title is required!" })} />
							<label htmlFor="mr">Mr*</label>
						</div>
					</SubscriptionTitle>
					<p style={errors.title ? { display: "block", color: "red" } : { display: "none" }}>{errors?.title?.message}</p>

					<InputContainer className={errors.firstName ? "wrong" : ""}>
						<label htmlFor="firstName" className={dirtyFields.firstName || defaultValues.firstName ? "full" : ""}>
							First name*
						</label>
						<input type="text" id="firstName" {...register("firstName", { required: "First name is required!" })} />
					</InputContainer>
					<p>{errors?.firstName?.message}</p>
					<InputContainer className={errors.lastName ? "wrong" : ""}>
						<label htmlFor="LastName" className={dirtyFields.lastName || defaultValues.lastName ? "full" : ""}>
							Last name*
						</label>
						<input type="text" id="LastName" {...register("lastName", { required: "Last name is required!" })} />
					</InputContainer>
					<p>{errors?.lastName?.message}</p>
					<InputContainer $mb="40px" className={errors.email ? "wrong" : ""}>
						<label htmlFor="email" className={dirtyFields.email || defaultValues.email ? "full" : ""}>
							Email*
						</label>
						<input type="email" id="email" {...register("email", { required: "Email is required!" })} />
					</InputContainer>
					<p>{errors?.email?.message}</p>
					<PhoneRow style={errors.phoneNumber ? { marginTop: "20px" } : { marginTop: "0" }}>
						<div>
							<span>Country code</span> <span>+20</span>
						</div>
						<InputContainer $mt="0" $mb="0" className={errors.phoneNumber ? "wrong" : ""}>
							<label htmlFor="phoneNumber" className={dirtyFields.phoneNumber || defaultValues.phoneNumber ? "full" : ""}>
								Phone number*
							</label>
							<input
								type="text"
								id="phoneNumber"
								{...register("phoneNumber", {
									required: "Phone number is required!",
									validate: (value) => +value || "Provide a valid phone number",
								})}
							/>
						</InputContainer>
					</PhoneRow>
					<p style={errors.phoneNumber ? { display: "block", color: "red", marginTop: "-25px" } : { display: "none" }}>{errors?.phoneNumber?.message}</p>

					<div className="deliveryAddress" style={errors.phoneNumber ? { marginTop: "20px" } : { marginTop: "0" }}>
						Delivery Address
					</div>

					<InputContainer $mt="0" className={errors.flatNumberBuildingName ? "wrong" : ""}>
						<label htmlFor="flatNumberBuildingName" className={dirtyFields.flatNumberBuildingName || defaultValues.flatNumberBuildingName ? "full" : ""}>
							Apartment/flat number, Building name*
						</label>
						<input
							type="text"
							id="flatNumberBuildingName"
							{...register("flatNumberBuildingName", {
								required: "This field is required!",
								minLength: { value: 3, message: "Physical address should contain at least 3 letters" },
							})}
						/>
					</InputContainer>
					<p>{errors?.flatNumberBuildingName?.message}</p>
					<InputContainer>
						<label htmlFor="city" className={userState.city ? "full" : ""}>
							City
						</label>
						<input type="text" name="city" id="city" value={userState.city} disabled />
					</InputContainer>
					<InputContainer style={{ position: "relative" }}>
						<label htmlFor="area" className={userState.area ? "full" : ""}>
							Area
						</label>
						<input type="text" name="city" id="area" value={userState.area} disabled />
						<span
							role="button"
							onClick={() => navigate("/checkout/bag")}
							style={{ position: "absolute", bottom: "30%", right: "5%", color: "#38b272", cursor: "pointer", textDecoration: "underLine" }}
						>
							Edit
						</span>
					</InputContainer>
					<InputContainer>
						<label htmlFor="country" className="full">
							Country
						</label>
						<input type="text" name="country" id="country" value="EG" disabled />
					</InputContainer>
				</ShippingAddress>

				<NewsLetter>
					<input type="checkbox" id="newsLetter" {...register("newsLetter")} />
					<label htmlFor="newsLetter">Join newsletter to receive our offers</label>
				</NewsLetter>

				<ValidateButton $letterSp="2px">
					<Button disabled={Object.keys(errors).length} type="submit">
						{isLoading ? (
							<>
								Validating <SpinnerMini style={{ marginRight: "0" }} />
							</>
						) : (
							"Validate & go to payment"
						)}
					</Button>
				</ValidateButton>
			</form>
			<CheckoutStepHeading step="3 / 3" heading="Payment" active={false} pbSm="32px" />
		</div>
	);
}

export default ContactAndInformation;
