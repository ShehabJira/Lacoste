import { FaRegUser } from "react-icons/fa";
import SaveChanges from "../../ui/SaveChanges";
import FormStyling from "../../ui/FormStyling";
import CivilityInput from "../../ui/CivilityInput";
import UserInput from "../../ui/UserInput";
import DisabledContent from "../../ui/DisabledContent";
import PhoneInput from "../../ui/PhoneInput";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

function UpdateInformation({ onCloseDrawer }) {
	const { user } = useUser();
	const { title, firstName, lastName, birthday, phone, email } = user && user?.user_metadata ? user?.user_metadata : {};
	const { updateUser, isUpdatingUser } = useUpdateUser();

	const { handleSubmit, register, formState } = useForm({ defaultValues: { title, firstName, lastName, birthday, phone } });
	const { errors } = formState;

	function onSubmit(data) {
		const updateUserObj = {
			newUserDataObj: {
				title: data.title,
				firstName: data.firstName,
				lastName: data.lastName,
				birthday: data.birthday,
				phone: data.phone.startsWith("0") ? `${data.phone.slice(1)}` : `${data.phone}`,
			},
		};
		updateUser(updateUserObj, { onSuccess: () => onCloseDrawer() });
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormStyling>
				<h2>
					<FaRegUser /> Edit Information
				</h2>

				<hr />

				<CivilityInput register={register} errors={errors} />

				<UserInput className={errors.firstName ? "wrong" : ""}>
					<label htmlFor="fName">First Name:</label>
					<input type="text" id="fName" {...register("firstName", { required: "Your first name is required!" })} />
				</UserInput>
				<p>{errors?.firstName?.message}</p>
				<UserInput className={errors.lastName ? "wrong" : ""}>
					<label htmlFor="lName">Last Name:</label>
					<input type="text" id="lName" {...register("lastName", { required: "Your last name is required!" })} />
				</UserInput>
				<p>{errors?.lastName?.message}</p>
				<UserInput>
					<label htmlFor="birthday">Birthday:</label>
					<input type="date" id="birthday" {...register("birthday")} />
				</UserInput>

				<DisabledContent>
					<label htmlFor="loggedEmail">Login</label>
					<input type="email" id="loggedEmail" disabled defaultValue={email} />
				</DisabledContent>

				<PhoneInput className={errors.phone ? "wrong" : ""}>
					<label htmlFor="phone">Phone Number</label>
					<div>+20</div>
					<input
						type="text"
						id="phone"
						{...register("phone", { required: "Your phone number name is required!", validate: (value) => +value || "Provide a valid phone number" })}
					/>
				</PhoneInput>
				<p>{errors?.phone?.message}</p>
			</FormStyling>
			<SaveChanges onCloseDrawer={onCloseDrawer} isLoading={isUpdatingUser} />
		</form>
	);
}

export default UpdateInformation;
