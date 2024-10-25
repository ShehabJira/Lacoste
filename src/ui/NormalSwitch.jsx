import styled from "styled-components";
import { useUpdateUser } from "../features/Authentication/useUpdateUser";
import { useUser } from "../features/Authentication/useUser";
const StyledSwitch = styled.label``;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
	accent-color: red;
	appearance: none;
	-webkit-appearance: none;
	display: none;
	&:checked + div {
		background-color: #56b381;
	}
	&:checked + div::before {
		left: 30px;
		content: "";
		color: #56b381;
	}
	&:disabled + div {
		cursor: not-allowed;
	}
`;
const SwitchBtn = styled.div`
	width: 60px;
	min-width: 60px;
	max-width: 60px;
	height: 34px;
	max-height: 34px;
	background-color: #e5e5e5;
	position: relative;
	margin-left: auto;
	border-radius: 16px;
	cursor: pointer;
	transition: 0.3s;
	&::before {
		content: "";
		font-weight: 700;
		background-color: white;
		color: #aaa;
		width: 26px;
		height: 26px;
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

function NormalSwitch() {
	const { user } = useUser();
	const { newsLetterSubscription } = user && user?.user_metadata ? user?.user_metadata : {};

	const { updateUser, isUpdatingUser } = useUpdateUser();

	function onChange() {
		updateUser({ newUserDataObj: { newsLetterSubscription: !newsLetterSubscription } });
	}

	return (
		<StyledSwitch htmlFor="news">
			<div>
				<Checkbox id="news" onChange={onChange} disabled={isUpdatingUser} defaultChecked={newsLetterSubscription} />
				<SwitchBtn />
			</div>
		</StyledSwitch>
	);
}

export default NormalSwitch;
