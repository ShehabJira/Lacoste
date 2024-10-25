import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Description from "../../ui/Description";
import FormDesc from "../../ui/FormDesc";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Preferences from "../../ui/Preferences";
import styled from "styled-components";
import AuthButton from "../../ui/AuthButton";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
const Head = styled(Heading)`
	font-size: 15px;
	font-weight: 900;
`;
const Descr = styled(Description)`
	font-size: 10px;
	color: #757575;
	font-weight: normal;
	letter-spacing: 0.2px;
	line-height: 1.6;
	margin-bottom: 152px;
`;
function SignInForm({ register, errors, isSigningIn }) {
	const navigate = useNavigate();
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	return (
		<>
			<FormDesc>
				<div style={{ paddingBottom: "100px" }}>
					<Head>I already have an account</Head>

					<Input className={errors.emailAddress ? "wrong" : ""}>
						<label htmlFor="emailAddress">Email address</label>
						<input type="email" id="emailAddress" {...register("emailAddress", { required: "Email address is required!" })} />
					</Input>
					<p>{errors?.emailAddress?.message}</p>

					<Input className={errors.loginPassword ? "wrong" : ""}>
						<label htmlFor="loginPassword">Password</label>
						<input type={passwordVisibility ? "text" : "password"} id="loginPassword" {...register("loginPassword", { required: "Password is required!" })} />
						{passwordVisibility ? (
							<PiEyeLight onClick={() => setPasswordVisibility((cur) => !cur)} />
						) : (
							<PiEyeSlash onClick={() => setPasswordVisibility((cur) => !cur)} />
						)}
					</Input>
					<p>{errors?.loginPassword?.message}</p>

					<div style={{ textAlign: "right" }}>
						<AuthButton
							disabled={isSigningIn}
							style={{ width: "95px", lineHeight: "18px", letterSpacing: "0.5px", marginRight: "-25px", marginTop: "22px" }}
							type="submit"
						>
							{isSigningIn ? (
								<>
									Signing in <SpinnerMini style={{ marginRight: "0" }} />
								</>
							) : (
								"Sign in"
							)}
						</AuthButton>
					</div>
				</div>
			</FormDesc>
			<Preferences>
				<div>
					<Head>I'm a new customer</Head>
					<Descr>
						Creating a Lacoste account is simple and easy. A Lacoste account will allow you to track the delivery of your purchases, manage your personal
						details, benefit from exclusive offers and more. Follow the next quick steps to set up your account today.
					</Descr>
					<div style={{ textAlign: "right" }}>
						<AuthButton style={{ marginTop: "-13px", marginRight: "-25px" }} onClick={() => navigate("/login/sign-up")}>
							Create my account
						</AuthButton>
					</div>
				</div>
			</Preferences>
		</>
	);
}

export default SignInForm;
