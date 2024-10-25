import styled from "styled-components";

const StyledCivilityInput = styled.div`
	padding: ${(props) => (props.$forAddress ? "0 15px 16px 7px" : "0 15px 16px 37px")};
	@media (max-width: 768px) {
		padding: 0 15px 16px 7px;
	}
	& > div:first-child {
		padding: ${(props) => (props.$forAddress ? "0px 15px 0 0px" : "24px 15px 0 24px")};
		margin-bottom: 6px;
		color: #6c717a;
		font-size: 14px;
		letter-spacing: 0.5px;
	}
	& > label {
		padding: 15px 15px 15px 30px;
		margin-right: 16px;
		display: inline-block;
		cursor: pointer;
		position: relative;
		font-size: 14px;
		font-weight: 400;

		input[type="radio"] {
			display: inline-block;
			position: absolute;
			left: 0;
			top: 40%;
			width: 15px;
			height: 15px;
			outline: none;
			accent-color: #292929;
		}
	}
	& + p {
		display: none;
	}
	&.wrong {
		label {
			/* color: red; */
		}
		& + p {
			display: block;
			color: red;
			margin-top: -25px;
			margin-bottom: 20px;
		}
	}
`;
function CivilityInput({ register, errors, forAddress }) {
	return (
		<>
			<StyledCivilityInput $forAddress={forAddress} className={errors.title ? "wrong" : ""}>
				<div>Civility</div>
				<label htmlFor="civilityMr">
					<input type="radio" value="Mr" id="civilityMr" {...register("title", { required: "Civility is required!" })} /> Mr
				</label>
				<label htmlFor="civilityMrs">
					<input type="radio" value="Mrs" id="civilityMrs" {...register("title", { required: "Civility is required!" })} /> Mrs
				</label>
				<label htmlFor="civilityMiss">
					<input type="radio" value="Miss" id="civilityMiss" {...register("title", { required: "Civility is required!" })} /> Miss
				</label>
			</StyledCivilityInput>
			<p>{errors?.title?.message}</p>
		</>
	);
}

export default CivilityInput;
