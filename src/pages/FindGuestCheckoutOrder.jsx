import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { useForm } from "react-hook-form";
import InputContainer from "../ui/InputContainer";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
const FGCO = styled.div`
	margin-bottom: 80px;
	padding: calc(3 * (100vw) / 25) 0;
	@media (min-width: 1024px) {
		background-image: url("/bg_section_newsletter.webp");
		background-size: 100% 43.75rem;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
	}
	& > div {
		@media (min-width: 1024px) {
			width: calc(9 * (100vw) / 25);
		}
		height: fit-content;
		padding: 60px 40px 40px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.1);
		h1 {
			padding: 10px 0;
		}
		p {
			margin-bottom: 16px;
			font-size: 15px;
			color: #191919;
		}
		button {
			text-transform: uppercase;
			border-radius: 0;
			padding: 12px 30px;
			height: 40px;
			background-color: #191919;
			line-height: 18px;
			font-size: 12px;
			letter-spacing: 1px;
			font-weight: 400;
			margin: auto;
			&:hover {
				border: none;
				color: #fff;
				background-color: #285f41;
			}
		}
	}
`;

function FindGuestCheckoutOrder() {
	const { register, handleSubmit, formState } = useForm();
	const navigate = useNavigate();
	const { errors, dirtyFields } = formState;

	function onSubmit(data) {
		// sessionStorage.setItem("guestOrder", JSON.stringify(data));
		navigate(`/guest-order`, { state: { email: data.orderEmail, id: +data.orderNumber }, replace: true });
	}

	return (
		<>
			<Header />
			<FGCO>
				<div>
					<h1>Find your order</h1>
					<p>Please fill the form below</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<InputContainer $smallerLabel={true} $findOrder={true} className={errors.orderNumber ? "wrong" : ""}>
							<label htmlFor="orderNumber" className={dirtyFields.orderNumber ? "full" : ""}>
								Order number
							</label>
							<input type="text" id="orderNumber" {...register("orderNumber", { required: "Please enter your order number" })} />
						</InputContainer>
						<p>{errors?.orderNumber?.message}</p>

						<InputContainer $smallerLabel={true} $findOrder={true} className={errors.orderEmail ? "wrong" : ""}>
							<label htmlFor="orderEmail" className={dirtyFields.orderEmail ? "full" : ""}>
								Order Email
							</label>
							<input type="email" id="orderEmail" {...register("orderEmail", { required: "Email is required" })} />
						</InputContainer>
						<p>{errors?.orderEmail?.message}</p>

						<Button>Find My order</Button>
					</form>
				</div>
			</FGCO>
			<Footer />
		</>
	);
}

export default FindGuestCheckoutOrder;
