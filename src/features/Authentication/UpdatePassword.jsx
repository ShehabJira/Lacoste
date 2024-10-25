import { PiLockKeyLight } from "react-icons/pi";
import FormStyling from "../../ui/FormStyling";
import UserInput from "../../ui/UserInput";
import SaveChanges from "../../ui/SaveChanges";
import { useState } from "react";
import styled from "styled-components";
import InputContainer from "../../ui/InputContainer";
import { useForm } from "react-hook-form";
import useSecurityLevel from "../../hooks/useSecurityLevel";
import { useUpdateUser } from "../Authentication/useUpdateUser";
import { useUser } from "./useUser";

const ChangePassword = styled.div`
	text-align: right;
	margin-top: 40px;
	text-decoration: underline;
	font-weight: lighter;
	font-size: 15px;
	color: #292929;
	cursor: pointer;
`;
const SecurityLevel = styled.div`
	font-size: 11px;
	margin-top: 40px;
	span {
		color: #292929;
		display: block;
		margin-bottom: 6px;
		padding-left: 7px;
	}
	p {
		color: #909090;
		margin-bottom: 16px;
		padding-left: 7px;
	}
`;
function UpdatePassword({ onCloseDrawer }) {
	const [changePassword, setChangePassword] = useState(false);
	const { handleSubmit, register, formState, getValues, watch } = useForm();
	const { errors, dirtyFields } = formState;
	const { user } = useUser();
	const { email } = user && user?.user_metadata ? user?.user_metadata : {};
	const { updateUser, isUpdatingUser } = useUpdateUser();

	function onSubmit(data) {
		const updatePasswordObj = {
			newPassword: data.newPasswordToEdit,
		};
		updateUser(updatePasswordObj, { onSuccess: () => onCloseDrawer() });
	}

	const insertedPassword = watch("newPasswordToEdit", "");
	const { securityLevel } = useSecurityLevel(insertedPassword);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormStyling $for="password">
				<h2>
					<PiLockKeyLight /> Edit login & password
				</h2>

				<hr />
				{!changePassword ? (
					<>
						<UserInput $for="password">
							<label htmlFor="disabledEditEmail">Login</label>
							<input type="email" id="disabledEditEmail" disabled defaultValue={email} />
						</UserInput>
						<UserInput $for="password" style={{ width: "40%" }}>
							<label htmlFor="disabledEditPassword">Password</label>
							<input type="password" id="disabledEditPassword" disabled defaultValue="******" />
						</UserInput>

						<ChangePassword onClick={() => setChangePassword(true)}>Change Password</ChangePassword>
					</>
				) : (
					<>
						<InputContainer $smallerLabel={true} className={errors.newPasswordToEdit ? "wrong" : ""}>
							<label htmlFor="newPasswordToEdit" className={dirtyFields.newPasswordToEdit ? "full" : ""}>
								New Password
							</label>
							<input
								type="password"
								id="newPasswordToEdit"
								{...register("newPasswordToEdit", {
									required: "New password is requried!",
									validate: () =>
										securityLevel === 5 || " password must contain at least 6 characters, combining upper and lowercase, special characters and numbers.",
								})}
								autoComplete="false"
							/>
						</InputContainer>
						<p>{errors?.newPasswordToEdit?.message}</p>

						<InputContainer $smallerLabel={true} className={errors.confirmPasswordToEdit ? "wrong" : ""}>
							<label htmlFor="confirmPasswordToEdit" className={dirtyFields.confirmPasswordToEdit ? "full" : ""}>
								Confirm New Password
							</label>
							<input
								autoComplete="false"
								type="password"
								id="confirmPasswordToEdit"
								{...register("confirmPasswordToEdit", {
									required: "This field is required!",
									validate: (val) => getValues("newPasswordToEdit") === val || "Passwords are not the same!",
								})}
							/>
						</InputContainer>
						<p>{errors?.confirmPasswordToEdit?.message}</p>

						<SecurityLevel>
							<span>SECURITY LEVEL</span>
							<p>For security reasons, your password must contain at least 6 characters, combining upper and lowercase, special characters and numbers.</p>
						</SecurityLevel>
					</>
				)}
			</FormStyling>

			<SaveChanges onCloseDrawer={onCloseDrawer} isLoading={isUpdatingUser} />
		</form>
	);
}

export default UpdatePassword;
