import { useForm } from "react-hook-form";
import FormStyling from "../../ui/FormStyling";
import CivilityInput from "../../ui/CivilityInput";
import { PiAddressBook } from "react-icons/pi";
import SaveChanges from "../../ui/SaveChanges";
import UserInput from "../../ui/UserInput";
import PhoneInput from "../../ui/PhoneInput";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function CompleteAddress({ onCloseDrawer }) {
	const { user } = useUser();
	const { addressName, title, firstName, lastName, apartmentNoAndBuildingName, city, area, phone } = user && user?.user_metadata ? user?.user_metadata : {};
	const { updateUser, isUpdatingUser } = useUpdateUser();
	const { handleSubmit, register, formState } = useForm({
		defaultValues: { addressName, title, firstName, lastName, apartmentNoAndBuildingName, city, area, phone },
	});
	const { errors } = formState;

	function onSubmit(data) {
		const updateUserAddressObj = {
			newUserDataObj: {
				addressName: data.addressName,
				title: data.title,
				firstName: data.firstName,
				lastName: data.lastName,
				apartmentNoAndBuildingName: data.apartmentNoAndBuildingName,
				city: data.city,
				area: data.area,
				phone: data.phone.startsWith("0") ? `${data.phone.slice(1)}` : `${data.phone}`,
			},
		};
		updateUser(updateUserAddressObj, { onSuccess: () => onCloseDrawer() });
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormStyling>
				<h2>
					<PiAddressBook /> Address
				</h2>

				<hr />

				<UserInput className={errors.addressName ? "wrong" : ""} $forAddress={true} style={{ width: "40%" }}>
					<label htmlFor="addressName">Address Name</label>
					<input type="text" id="addressName" {...register("addressName", { required: "Address name is required!" })} />
				</UserInput>
				<p>{errors?.addressName?.message}</p>

				<CivilityInput register={register} errors={errors} forAddress={true} />

				<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<div>
						<UserInput className={errors.firstName ? "wrong" : ""} $forAddress={true}>
							<label htmlFor="firName">First Name</label>
							<input type="text" id="firName" {...register("firstName", { required: "Your first name is required!" })} />
						</UserInput>
						<p>{errors?.firstName?.message}</p>
					</div>
					<div>
						<UserInput className={errors.lastName ? "wrong" : ""} $forAddress={true}>
							<label htmlFor="lasName">Last Name</label>
							<input type="text" id="lasName" {...register("lastName", { required: "Your last name is required!" })} />
						</UserInput>
						<p>{errors?.lastName?.message}</p>
					</div>
				</div>

				<UserInput className={errors.apartmentNoAndBuildingName ? "wrong" : ""} $forAddress={true}>
					<label htmlFor="apartmentNoAndBuildingName">Apartment/Flat Number, Building Name</label>
					<input
						type="text"
						id="apartmentNoAndBuildingName"
						{...register("apartmentNoAndBuildingName", {
							required: "Apartment/Flat Number, Building Name is required!",
							minLength: { value: 3, message: "Physical address should contain at least 3 letters" },
						})}
					/>
				</UserInput>
				<p>{errors?.apartmentNoAndBuildingName?.message}</p>

				<UserInput className={errors.city ? "wrong" : ""} $forAddress={true}>
					<label htmlFor="city">City</label>
					<input type="text" id="city" {...register("city", { required: "City is required!" })} />
				</UserInput>
				<p>{errors?.city?.message}</p>

				<UserInput className={errors.area ? "wrong" : ""} $forAddress={true}>
					<label htmlFor="area">Area</label>
					<input type="text" id="area" {...register("area", { required: "Area is required!" })} />
				</UserInput>
				<p>{errors?.area?.message}</p>

				<PhoneInput className={errors.phone ? "wrong" : ""} $forAddress={true}>
					<label htmlFor="phone">PHONE</label>
					<div>+20</div>
					<input
						type="text"
						id="phone"
						defaultValue={"1025207423"}
						{...register("phone", { required: "Your phone number name is required!", validate: (value) => +value || "Provide a valid phone number" })}
					/>
				</PhoneInput>
				<p>{errors?.phone?.message}</p>

				<UserInput $forAddress={true}>
					<label htmlFor="country">COUNTRY</label>
					<input type="text" id="country" value="EG" disabled />
				</UserInput>
			</FormStyling>
			<SaveChanges onCloseDrawer={onCloseDrawer} errors={errors} isLoading={isUpdatingUser} />
		</form>
	);
}

export default CompleteAddress;
