import styled from "styled-components";
const StyledSwitch = styled.label`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 12px;
	text-align: center;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	span {
		flex-basis: 25%;
	}
	& > div {
		flex-basis: 50%;
	}
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
	accent-color: red;
	appearance: none;
	-webkit-appearance: none;
	display: none;
	&:checked + div {
		background-color: #22c55e;
	}
	&:checked + div::before {
		left: 50px;
		content: "✓";
		color: #22c55e;
	}
	&:disabled + div {
		cursor: not-allowed;
	}
`;
const SwitchBtn = styled.div`
	max-width: 78px;
	height: 32px;
	background-color: #ccc;
	position: relative;
	border-radius: 16px;
	cursor: pointer;
	transition: 0.3s;
	left: 50%;
	transform: translateX(-50%);
	&::before {
		content: "X";
		font-weight: 700;
		background-color: white;
		color: #aaa;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		position: absolute;
		top: 4px;
		left: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.3s;
	}
`;

function Switch({ id, register, switchName, isWorking }) {
	return (
		<StyledSwitch htmlFor={id}>
			<span>{switchName}</span>
			<div>
				<Checkbox id={id} {...register(id)} disabled={isWorking} />
				<SwitchBtn />
			</div>
		</StyledSwitch>
	);
}

export default Switch;
