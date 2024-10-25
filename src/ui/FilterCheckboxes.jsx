import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import CheckboxRadioContainer from "./CheckboxRadioLabel";

const StyledFilterCheckboxes = styled.div`
	padding-top: 15px;
`;
const CheckboxesAccordion = styled.div`
	& > div:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		margin-bottom: 15px;
		color: #777777;
		cursor: pointer;
		span {
			font-size: 14px;
			font-weight: 600;
			letter-spacing: 1px;
		}
		svg {
			transition: 0.3s;
			width: 15px;
			height: 15px;
		}
	}
	&.active > div:first-child {
		svg {
			transform: rotate(180deg);
		}
	}
	& > div:last-child {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 300ms ease-out;
		& > div {
			overflow: hidden;
		}
	}
	&.active > div:last-child {
		grid-template-rows: 1fr;
		transition: grid-template-rows 300ms ease-out;
	}
`;

const filtersNeeded = [
	{
		title: "Gender",
		checkboxes: ["men", "women", "kids"],
	},
	{
		title: "Product Type",
		checkboxes: [
			"polo-shirts",
			"sweatshirts",
			"jackets-and-coats",
			"t-shirts",
			"shirts",
			"trousers-and-shorts",
			"swimwear",
			"sneakers",
			"sliders-and-sandals",
			"socks",
			"caps-and-hats",
			"belts",
			"bags",
			"wallets-and-small-leather-goods",
			"bussiness-and-laptop-bags",
			"dresses-and-skirts",
			"flipflops-and-sandals",
			"tote-bags",
			"shoulder-bags",
		],
	},
];
function FilterCheckboxes({ handleFilterPreferences, pref1V, pref2V }) {
	const [pref1Values, pref2Values] = [pref1V?.split(" "), pref2V?.split(" ")];
	const [activeAccordion, setActiveAccordion] = useState(0);
	function handleCheckboxChange(e) {
		const name = e.target.name;
		const nameNumber = filtersNeeded.findIndex((filter) => filter.title === name);
		let thisNameCheckboxes = Array.from(document.querySelectorAll(`input[name='${name}']`));
		let checkedBoxesOfThisName = thisNameCheckboxes
			.filter((input) => input.checked)
			.map((input) => input.value)
			.join(" ");

		handleFilterPreferences(name, checkedBoxesOfThisName, nameNumber + 1);
	}
	return (
		<StyledFilterCheckboxes>
			{filtersNeeded.map((filter, i) => (
				<CheckboxesAccordion className={activeAccordion === i + 1 ? "active" : ""} key={i}>
					<div onClick={() => (activeAccordion === i + 1 ? setActiveAccordion(0) : setActiveAccordion(i + 1))}>
						<span>{filter.title}</span>
						<BsChevronDown />
					</div>
					<div>
						<div>
							{filter.checkboxes.map((checkbox) => (
								<CheckboxRadioContainer htmlFor={checkbox} key={checkbox}>
									<span>
										{checkbox.charAt(0).toUpperCase()}
										{checkbox.slice(1)}
									</span>
									<input
										type="checkbox"
										id={checkbox}
										name={filter.title}
										value={checkbox}
										onChange={handleCheckboxChange}
										defaultChecked={pref1Values?.includes(checkbox) || pref2Values?.includes(checkbox)}
									/>
								</CheckboxRadioContainer>
							))}
						</div>
					</div>
				</CheckboxesAccordion>
			))}
		</StyledFilterCheckboxes>
	);
}

export default FilterCheckboxes;
