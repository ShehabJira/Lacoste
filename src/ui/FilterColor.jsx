import styled from "styled-components";

const StyledFilterColors = styled.div`
	& > div:first-child {
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 1px;
		color: #777777;
		padding: 10px 0;
		margin-bottom: 15px;
	}
`;
const Colors = styled.ul`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
	li {
		width: 45px;
		height: 45px;
		padding: 10px;
		input {
			appearance: none;
			display: none;
		}
		input:checked + span::before {
			display: block;
		}
	}
`;
const Circle = styled.span`
	position: relative;
	display: block;
	border-radius: 50%;
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.$backgroundcolor};
	border: 1px solid #e5e5e5;
	transition: 0.5s;
	cursor: pointer;
	&:hover {
		transform: scale(1.3);
	}
	&::before {
		content: "✓";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: ${(props) => props.$backgroundcolor};
		filter: sepia(30) invert(100) saturate(100);
		font-weight: bold;
		font-size: 15px;
		display: none;
	}
`;
const colors = [
	{ color: "#ffc0cb", value: "pink" },
	{ color: "#f5f5dc", value: "khaki" },
	{ color: "#ff0000", value: "red" },
	{ color: "#a52a2a", value: "brown" },
	{ color: "#008000", value: "green" },
	{ color: "#fff", value: "white" },
	{ color: "#808080", value: "grey" },
	{ color: "#000", value: "black" },
	{ color: "#0000ff", value: "blue" },
];

function FilterColor({ handleFilterPreferences, pref3V }) {
	function handleCheckboxChange(e) {
		const name = e.target.name;
		let thisNameCheckboxes = Array.from(document.querySelectorAll(`input[name='${name}']`));
		let checkedBoxesOfThisName = thisNameCheckboxes
			.filter((input) => input.checked)
			.map((input) => input.value)
			.join(" ");

		handleFilterPreferences(name, checkedBoxesOfThisName, 3);
	}
	return (
		<StyledFilterColors>
			<div>Color</div>
			<Colors>
				{colors.map((color) => (
					<li key={color.color}>
						<label htmlFor={color.color}>
							<input
								type="checkbox"
								name="color"
								id={color.color}
								value={color.value}
								onChange={handleCheckboxChange}
								defaultChecked={pref3V?.includes(color.value)}
							/>
							<Circle $backgroundcolor={`${color.color}`}></Circle>
						</label>
					</li>
				))}
			</Colors>
		</StyledFilterColors>
	);
}

export default FilterColor;
