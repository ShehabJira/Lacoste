import styled from "styled-components";
import { charts } from "../utils/constants";
const StyledCheckboxBtns = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	width: 50%;
`;
const CheckboxBtn = styled.label`
	margin: 3px 3px;
	cursor: pointer;
	font-size: 13px;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
	appearance: none;
	display: none;
	&:checked + div {
		background-color: #22c55e;
	}
	&:disabled + div {
		cursor: not-allowed;
	}
`;
const Btn = styled.div`
	width: 80px;
	height: 40px;
	border-radius: 15px;
	background-color: #ccc;
	color: #fff;
	display: grid;
	place-items: center;
`;

function CheckboxBtns({ register, sizesToDisplay, isWorking, subCategory }) {
	const chartToDisplay = charts[subCategory];
	const chartSizesArr = chartToDisplay?.toString()?.split(",");

	return (
		<StyledCheckboxBtns>
			{chartToDisplay ? (
				chartSizesArr?.map((chartSize) => (
					<CheckboxBtn htmlFor={chartSize} key={chartSize.split(" - ")[0]}>
						<Checkbox
							id={chartSize}
							value={chartSize.split(" - ")[0]}
							{...register("sizes", {
								validate: () =>
									sizesToDisplay?.length > 0 ||
									"You must provide at least 1 size!",
							})}
							defaultChecked={
								sizesToDisplay &&
								sizesToDisplay.includes(+chartSize.split(" - ")[0])
							}
							disabled={isWorking}
						/>
						<Btn>{chartSize}</Btn>
					</CheckboxBtn>
				))
			) : (
				<span>Unique Size</span>
			)}
		</StyledCheckboxBtns>
	);
}

export default CheckboxBtns;
