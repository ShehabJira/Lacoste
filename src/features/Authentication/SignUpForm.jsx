import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import styled from "styled-components";
import AuthButton from "../../ui/AuthButton";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import Description from "../../ui/Description";
import FormDesc from "../../ui/FormDesc";
import Preferences from "../../ui/Preferences";
import useSecurityLevel from "../../hooks/useSecurityLevel";
import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLocation } from "react-router-dom";

const SubscribeToNews = styled.label`
	display: block;
	position: relative;
	line-height: 24px;
	padding: 15px 15px 15px 35px;
	font-size: 12px;
	font-weight: 100;
	color: #606060;
	&:hover input {
		accent-color: #dbdbdb;
	}
	@media (max-width: 767.9px) {
		margin-left: 7px;
	}

	input {
		position: absolute;
		left: 0;
		width: 22px;
		height: 22px;
		accent-color: #fff;
		outline: none;
		z-index: 10;
	}
`;
const InputRow = styled.div`
	display: flex;
	div {
		margin-right: 0;
	}
	@media (max-width: 768px) {
		gap: 50px;
	}
	@media (min-width: 768px) {
		gap: 5px;
		margin-right: -25px;
	}
`;
const SecurityLevel = styled.div`
	& > div {
		display: flex;
		align-items: center;
		gap: 5px;
		span.label {
			display: block;
			margin-bottom: 6px;
			font-size: 11px;
			word-spacing: 2px;
			font-weight: 800;
			letter-spacing: -0.3px;
			margin-top: 6px;
		}
		div.levels {
			display: flex;
			gap: 1px;
			span {
				height: 8px;
				width: 23px;
				background-color: #999999;
			}
		}
	}
	p {
		padding-left: 15px;
		color: #606060;
		font-size: 13px;
		margin-bottom: 16px;
		font-weight: 300;
	}
`;
const Required = styled.div`
	font-size: 12px;
	font-style: italic;
	color: #606060;
	padding-left: 15px;
`;
function SignUpForm({ register, getValues, errors, watch, isSigningUp }) {
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
	const { state } = useLocation();
	const { preTakenEmail } = state ? state : "";
	const insertedPassword = watch("password", "");
	const { securityLevel } = useSecurityLevel(insertedPassword);

	return (
		<>
			<FormDesc>
				<div>
					<Heading>1. Enter your personal information</Heading>
					<Description>
						Creating a Lacoste account is simple and easy. A Lacoste account will allow you to track the delivery of your purchases, manage your personal
						details, benefit from exclusive offers and more. Follow the next quick steps to set up your account today.
					</Description>

					<Input className={errors.userTitle ? "wrong" : ""}>
						<label htmlFor="userTitle">Title *</label>
						<select id="userTitle" {...register("userTitle", { required: "Title address is required!" })}>
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
							<option value="Miss">Miss</option>
						</select>
					</Input>
					<p>{errors?.userTitle?.message}</p>

					<InputRow>
						<div>
							<Input className={errors.firstName ? "wrong" : ""}>
								<label htmlFor="firstName">First Name *</label>
								<input type="text" id="firstName" {...register("firstName", { required: "First name is required!" })} />
							</Input>
							<p>{errors?.firstName?.message}</p>
						</div>
						<div>
							<Input className={errors.lastName ? "wrong" : ""}>
								<label htmlFor="lastName">Last Name *</label>
								<input type="text" id="lastName" {...register("lastName", { required: "Last name is required!" })} />
							</Input>
							<p>{errors?.lastName?.message}</p>
						</div>
					</InputRow>
					<Input className={errors.registerEmail ? "wrong" : ""}>
						<label htmlFor="registerEmail">Email *</label>
						<input type="email" id="registerEmail" defaultValue={preTakenEmail} {...register("registerEmail", { required: "Email address is required!" })} />
					</Input>
					<p>{errors?.registerEmail?.message}</p>

					<Input className={errors.confirmEmail ? "wrong" : ""}>
						<label htmlFor="confirmEmail">Confirm Email *</label>
						<input
							type="email"
							id="confirmEmail"
							{...register("confirmEmail", {
								required: "Confirm email is required!",
								validate: (val) => getValues("registerEmail") === val || "Emails are not the same!",
							})}
						/>
					</Input>
					<p>{errors?.confirmEmail?.message}</p>

					<Input className={errors.password ? "wrong" : ""}>
						<label htmlFor="password">Password *</label>
						<input
							type={passwordVisibility ? "text" : "password"}
							id="password"
							{...register("password", {
								required: "Password is required!",
								validate: () =>
									securityLevel === 5 || " password must contain at least 6 characters, combining upper and lowercase, special characters and numbers.",
							})}
						/>
						{passwordVisibility ? (
							<PiEyeLight onClick={() => setPasswordVisibility((cur) => !cur)} />
						) : (
							<PiEyeSlash onClick={() => setPasswordVisibility((cur) => !cur)} />
						)}
					</Input>
					<p>{errors?.password?.message}</p>

					<Input className={errors.confirmPassword ? "wrong" : ""}>
						<label htmlFor="confirmPassword">Confirm Password *</label>
						<input
							type={confirmPasswordVisibility ? "text" : "password"}
							id="confirmPassword"
							{...register("confirmPassword", {
								required: "Confirm password is required!",
								validate: (val) => getValues("password") === val || "Passwords are not the same!",
							})}
						/>
						{confirmPasswordVisibility ? (
							<PiEyeLight onClick={() => setConfirmPasswordVisibility((cur) => !cur)} />
						) : (
							<PiEyeSlash onClick={() => setConfirmPasswordVisibility((cur) => !cur)} />
						)}
					</Input>
					<p>{errors?.confirmPassword?.message}</p>

					<SecurityLevel>
						<div>
							<span className="label">SECURITY LEVEL</span>
							<div className="levels">
								<span style={securityLevel >= 1 ? { backgroundColor: "#7fcc6e" } : {}}></span>
								<span style={securityLevel >= 2 ? { backgroundColor: "#7fcc6e" } : {}}></span>
								<span style={securityLevel >= 3 ? { backgroundColor: "#7fcc6e" } : {}}></span>
								<span style={securityLevel === 5 ? { backgroundColor: "#7fcc6e" } : {}}></span>
							</div>
						</div>
						<p>For security reasons, your password must contain at least 6 characters, combining upper and lowercase, special characters and numbers.</p>
					</SecurityLevel>

					<Input className={errors.phone ? "phone wrong" : "phone"}>
						<label htmlFor="phone">Phone Number *</label>
						<input
							type="text"
							id="phone"
							autoComplete="true"
							{...register("phone", { required: "Phone is required!", validate: (value) => +value || "Provide a valid phone number" })}
						/>
					</Input>
					<p>{errors?.phone?.message}</p>

					<Required>*required field</Required>
				</div>
			</FormDesc>
			<Preferences>
				<div>
					<Heading>2. Your preferences</Heading>
					<Description>
						Lacoste, data controller, implements processing of personal data relating to you to allow for optimum management of the relationship with its
						clients and to follow up on your order. For more information on how we process your personal data and the period for which we retain this data,
						please consult our Privacy Policy. Pursuant to the legislation in force, you have a right to access, correct, remove, or limit the processing of
						your information, a right of opposition, a right to transfer your data as well as the right to set out guidelines relating to the fate of your data
						after your death, by using our customer service contact form and by selecting the contact reason “Personal Data”. You also have the right to lodge a
						complaint before the competent authority.
					</Description>
					<SubscribeToNews>
						<input type="checkbox" id="newsSubscription" {...register("newsSubscription")} />I would like to receive by email Lacoste's latest news and special
						offers
					</SubscribeToNews>
					<AuthButton type="submit" disabled={isSigningUp}>
						{isSigningUp ? (
							<>
								<span>Creating account</span> <SpinnerMini style={{ marginRight: "0" }} />
							</>
						) : (
							"Create My Account"
						)}
					</AuthButton>
				</div>
			</Preferences>
		</>
	);
}

export default SignUpForm;
