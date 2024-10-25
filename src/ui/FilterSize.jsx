import styled from "styled-components";
import { useSize } from "../hooks/useSize";
import CheckboxRadioLabel from "./CheckboxRadioLabel";
import { useParams } from "react-router-dom";
import { charts } from "../utils/constants";

const StyledFilterSizes = styled.div`
	& > div:first-child {
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 1px;
		color: #777777;
		padding: 10px 0;
		margin-bottom: 15px;
		margin-top: 15px;
	}
`;
const SizesTable = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(50px, 100px));
	column-gap: 15px;
	label {
		height: 45px;
		border-radius: 27px;
		margin-bottom: 16px;
		border: 1px solid #c8c8c8;
		transition: 0.3s;
		outline: none;
		overflow: hidden;
	}
	input {
		appearance: none;
		display: none;
	}
	& input:checked + div {
		background-color: #292929;
		color: #fff;
	}
	div {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #292929;
		font-family: "archivo";
		font-size: 15px;
		font-weight: 400;
		line-height: 20px;
	}
`;

function FilterSize({ handleFilterPreferences, pref4V }) {
	const pref4Values = pref4V?.split(" ");
	const chart = useSize();
	const { mainCategory, subCategory, lateralCategory } = useParams();
	if (subCategory === "leather-goods" || subCategory === "accessories" || lateralCategory === "leather-goods" || lateralCategory === "accessories") return null;

	function handleCheckboxChange(e) {
		const name = e.target.name;
		let thisNameCheckboxes = Array.from(document.querySelectorAll(`input[name='${name}']`));
		let checkedBoxesOfThisName = thisNameCheckboxes
			.filter((input) => input.checked)
			.map((input) => input.value)
			.join(" ");

		handleFilterPreferences(name, checkedBoxesOfThisName, 4);
	}

	return (
		<StyledFilterSizes>
			<div>Size</div>
			<SizesTable>
				{chart.map((size) => (
					<CheckboxRadioLabel htmlFor={size} key={size}>
						<input
							type="checkbox"
							value={size.split(" - ").join("-")}
							defaultChecked={pref4Values?.includes(size.split(" - ").join("-"))}
							id={size}
							name="sizes"
							onChange={handleCheckboxChange}
						/>
						<div>{size}</div>
					</CheckboxRadioLabel>
				))}
			</SizesTable>

			{!mainCategory && (
				<SizesTable>
					{charts["shoes"].map((size) => (
						<CheckboxRadioLabel htmlFor={size} key={size}>
							<input
								type="checkbox"
								value={size.split(" - ").join("-")}
								defaultChecked={pref4Values?.includes(size.split(" - ").join("-"))}
								id={size}
								name="sizes"
								onChange={handleCheckboxChange}
							/>
							<div>{size}</div>
						</CheckboxRadioLabel>
					))}
				</SizesTable>
			)}
			{!mainCategory && (
				<SizesTable>
					{charts["children"].map((size) => (
						<CheckboxRadioLabel htmlFor={size} key={size}>
							<input
								type="checkbox"
								value={size.split(" - ").join("-")}
								defaultChecked={pref4Values?.includes(size.split(" - ").join("-"))}
								id={size}
								name="sizes"
								onChange={handleCheckboxChange}
							/>
							<div>{size}</div>
						</CheckboxRadioLabel>
					))}
				</SizesTable>
			)}
			{!mainCategory && (
				<SizesTable>
					{charts["babies"].map((size) => (
						<CheckboxRadioLabel htmlFor={size} key={size}>
							<input
								type="checkbox"
								value={size.split(" - ").join("-")}
								defaultChecked={pref4Values?.includes(size.split(" - ").join("-"))}
								id={size}
								name="sizes"
								onChange={handleCheckboxChange}
							/>
							<div>{size}</div>
						</CheckboxRadioLabel>
					))}
				</SizesTable>
			)}
		</StyledFilterSizes>
	);
}

export default FilterSize;
