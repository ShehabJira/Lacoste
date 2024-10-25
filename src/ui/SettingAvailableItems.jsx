import styled from "styled-components";

const StyledSettingAvailableItems = styled.div`
	width: 50%;
`;
const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 3px;
	label {
		flex-basis: 50%;
	}
	input {
		max-width: 80px;
		border: 1px solid var(--color-grey-300);
		background-color: var(--color-grey-0);
		border-radius: var(--border-radius-sm);
		box-shadow: var(--shadow-sm);
		text-align: center;
	}
`;

function SettingAvailableItems({ obtainedSizes, register, isWorking }) {
	return (
		<StyledSettingAvailableItems>
			{obtainedSizes.length > 0 &&
				obtainedSizes?.map((size, i) => (
					<Row key={`${size}-size`}>
						<label htmlFor={`${size}-size`}>
							{size ? <span>quantity of size {size}</span> : "(fixed size)"}
						</label>
						<input
							key={size}
							type="text"
							id={`${size}-size`}
							{...register(`availableItems.${i}`, {
								validate: (val) =>
									(val > 0 && val !== "") ||
									"Item quantity should be at least 1!",
								setValueAs: (v) => +v,
							})}
							disabled={isWorking}
						/>
					</Row>
				))}
		</StyledSettingAvailableItems>
	);
}

export default SettingAvailableItems;
