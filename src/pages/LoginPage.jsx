import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { useParams } from "react-router-dom";
import SignInForm from "../features/Authentication/SignInForm";
import SignUpForm from "../features/Authentication/SignUpForm";
import { useForm } from "react-hook-form";
import { useSignUp } from "../features/Authentication/useSignUp";
import { useSignIn } from "../features/Authentication/useSignIn";

const StyledLoginPage = styled.div`
	font-family: "archivo";
	margin-top: 24px;
	@media (min-width: 768px) {
		background-image: url("/bg_fid_no.webp");
		padding-top: 50px;
		padding-bottom: 150px;
		&.logIn {
			padding-top: 80px;
			padding-bottom: 80px;
			div {
				top: 0;
			}
		}
	}
	@media (min-width: 544px) {
		padding-left: 30px;
		padding-right: 30px;
	}
	@media (min-width: 1024px) {
		padding-left: 45px;
		padding-right: 45px;
	}
	@media (max-width: 767.9px) {
		padding-left: 22px;
		padding-right: 22px;
	}
`;
const RegisterRectangle = styled.div`
	margin: auto;
	@media (min-width: 768px) {
		width: 100%;
		height: 100%;
		position: relative;
		top: 82px;
		background-color: #fff;
	}
	@media (min-width: 992px) {
		width: 920px;
	}
`;
const Title = styled.div`
	@media (min-width: 768px) {
		padding: 42px 0 37px 44px;
		border-bottom: 1px solid #ededed;
	}
	@media (max-width: 767.98px) {
		padding-left: 15px;
		font-size: 18px;
	}
	font-size: 22px;
	color: #191919;
	font-weight: 900;
	line-height: 2;
`;
const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0 15px;
	@media (max-width: 768px) {
		padding: 0;
	}
`;

function LoginPage() {
	const { action } = useParams();
	const { handleSubmit, register, formState, getValues, watch } = useForm();
	const { errors } = formState;
	const { signUp, isSigningUp } = useSignUp();
	const { signIn, isSigningIn } = useSignIn();

	function onSubmit(data) {
		if (data.phone) {
			const signUpObj = {
				email: data.registerEmail,
				password: data.password,
				userDataObj: {
					title: data.userTitle,
					firstName: data.firstName,
					lastName: data.lastName,
					newsLetterSubscription: data.newsSubscription,
					phone: data.phone.startsWith("0") ? `${data.phone.slice(1)}` : `${data.phone}`,
				},
			};
			signUp(signUpObj);
		} else {
			const signInObj = {
				email: data.emailAddress,
				password: data.loginPassword,
			};
			signIn(signInObj);
		}
	}

	return (
		<>
			<Header />
			<StyledLoginPage className={action === "sign-in" ? "logIn" : ""}>
				<RegisterRectangle>
					<Title>{action === "sign-in" ? "Sign In" : "Sign Up"}</Title>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Row>
							{action === "sign-in" ? (
								<SignInForm register={register} errors={errors} isSigningIn={isSigningIn} />
							) : (
								<SignUpForm register={register} getValues={getValues} errors={errors} watch={watch} isSigningUp={isSigningUp} />
							)}
						</Row>
					</form>
				</RegisterRectangle>
			</StyledLoginPage>
			<Footer />
		</>
	);
}

export default LoginPage;
