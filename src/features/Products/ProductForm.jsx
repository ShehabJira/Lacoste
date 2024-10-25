import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Switch from "../../ui/Switch";
import CheckboxBtns from "../../ui/CheckboxBtns";
import styled from "styled-components";
import SettingAvailableItems from "../../ui/SettingAvailableItems";
import { kids, men, women } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useUploadProduct } from "./useUploadProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { useEffect } from "react";
import { useDeleteProduct } from "./useDeleteProduct";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
const Form = styled.form`
	display: grid;
	grid-auto-flow: row;
`;
const FormRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 12px 0;
	text-align: center;
	&:has(button) {
		justify-content: flex-end;
		gap: 15px;
	}
	&:first-child {
		padding-top: 0;
	}
	&:last-child {
		padding-bottom: 0;
	}
	font-family: "archivo", Arial, Helvetica, sans-serif;
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	& > label,
	& > span {
		flex-basis: 25%;
		background-color: #fff;
		font-weight: 500;
		user-select: none;
	}
	& > input,
	& > select {
		padding: 8px 12px;
		flex-basis: 50%;
		border: 1px solid var(--color-grey-300); // #d1d5db
		background-color: var(--color-grey-0); // #fff
		border-radius: var(--border-radius-sm); // 5px
		box-shadow: var(--shadow-sm); // 0 1px 2px rgba(0, 0, 0, 0.04)
	}

	& > p {
		flex-basis: 100%;
		color: red;
	}
	input::file-selector-button {
		font-family: inherit;
		padding: 8px 12px;
		margin-right: 12px;
		transition: color 0.2s, background-color 0.2s;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-weight: 500;
		background-color: #343a40;
		color: #fff;
		&:hover {
			background-color: #292929;
		}
	}
	& > Button:first-of-type {
		background-color: #fff;
		color: #343a40;
		border: 1px solid #e5e7eb;
		border-radius: 5px;
		&:hover {
			background-color: #f9fafb;
			color: #292929;
		}
	}

	& > Button:last-of-type,
	Button:nth-child(2) {
		background-color: #343a40;
		color: #fff;
		border: none;
		border-radius: 5px;
		&:hover {
			background-color: #292929;
			color: #fff;
			border: none;
		}
	}
	& > Button:nth-child(2):not(:last-child) {
		background-color: #d90a0a;
		&:hover {
			background-color: #c10808;
		}
	}
`;

function ProductForm({ productToEdit = {}, onCloseDrawer }) {
	const { id: editId, sizes: editSizes, availableItems: editAvailableItems, ...editValues } = productToEdit;
	const isEditSession = Boolean(editId);

	const { register, formState, handleSubmit, reset, watch, setValue, getValues } = useForm({
		defaultValues: isEditSession ? editValues : {},
	}); // distributing editValues as defaultValues in here will lead to a problem if it contains sizes and availableItems as they are not in the same the shape of their hosting inputs.

	const { mainCategory: mC, subCategory: sC, lateralCategory: lC } = useParams();

	const { uploadProduct, isUploading } = useUploadProduct();
	const { updateProduct, isUpdating } = useUpdateProduct();
	const { deleteProduct, isDeleting } = useDeleteProduct();
	const isWorking = isUploading || isUpdating || isDeleting;

	const { errors } = formState;
	const sizes = watch("sizes", []); // watch will return the value of sizes each time it changes.
	const availableItemsArr = watch("availableItems", []);
	const mainCategory = watch("mainCategory", mC || "men");
	let subCategory = watch("subCategory", sC ? sC : mainCategory === "kids" ? "babies" : "clothing");

	// if we changed mainCategory ourselves we need to reset the value of subCategory
	const formChanged = mainCategory !== mC || subCategory !== sC;
	useEffect(
		function () {
			// const { isDirty } = formState;
			if (mainCategory === "men" && formChanged) setValue("subCategory", "clothing");
			else if (mainCategory === "kids" && formChanged) setValue("subCategory", "babies");
			else if (mainCategory === "women" && formChanged) setValue("subCategory", "clothing");

			// mainCategory === "men"
			// 	? setValue("subCategory", "clothing")
			// 	: mainCategory === "kids"
			// 	? setValue("subCategory", "babies")
			// 	: setValue("subCategory", "clothing");
		},
		[mainCategory, setValue, formChanged]
	);
	// Note! typeof empty array [] is object, and only at the beginning watch returns the 'value' of sizes(not sizes itself, sizes itself is mt arr [] => object) as undefined(Thus, typeof getValues('sizes') will be 'undefined').
	let sectionsToRender = mainCategory === "men" ? men : mainCategory === "women" ? women : kids;

	let categoriesToRender = sectionsToRender[subCategory];

	// The received editSizes may get changed by the user, if it changed, display the user selected sizes.
	// Note! Once the editSizes is added to sizesToDisplay it will be added to sizes, and if you select one more size, sizes will be [the editSizes + the selected size]
	let sizesToDisplay =
		isEditSession &&
		sizes.length === 0 && // to ensure that the user has not select something yet
		typeof getValues("sizes") === "undefined" // to add editSizes only on the first time, as afterwards the typeof sizes will be 'object'
			? editSizes
			: sizes && Array.isArray(sizes)
			? sizes.map((e) => +e)
			: [];

	let availableItemsToDisplay =
		isEditSession && Object.fromEntries(sizesToDisplay.map((size) => [size, editAvailableItems[size] === undefined ? 0 : editAvailableItems[size]]));

	// set the new available items which has been taken to availableItems.
	isEditSession &&
		getValues("availableItems")?.length !== Object.values(availableItemsToDisplay).length &&
		setValue("availableItems", Object.values(availableItemsToDisplay));

	// Reset sizes whenever the subCategory is changed, as if the user selected some sizes from shoes and moved to clothing the sizes selected of shoes would still in clothing.
	// And whenever subCategory is changed to accessories or leather-goods sizes is set to ['0'] as they are unique sizes.
	useEffect(
		function () {
			if (!isEditSession) {
				if (subCategory === "accessories" || subCategory === "leather-goods") setValue("sizes", ["0"]);
				else setValue("sizes", []);

				setValue("availableItems", []);
			}
		},
		[subCategory, setValue, isEditSession, mainCategory]
	);

	// Form an object its keys equal to the productSizes array and each key value will be equal to its correspondent number from the sizesAvailableItemsArr
	const availableItems = availableItemsArr.length ? Object.fromEntries(sizesToDisplay.map((size, i) => [size, availableItemsArr[i]])) : editAvailableItems;

	function onSubmit(data) {
		if (isEditSession) {
			updateProduct(
				{
					product: {
						...data,
						availableItems: availableItems,
						sizes: sizesToDisplay,
					},
					id: editId,
				},
				{
					onSuccess: () => {
						reset();
						onCloseDrawer?.();
						toast.success("Product has been updated successfully!");
					},
				}
			);
		} else {
			uploadProduct(
				{
					...data,
					availableItems: availableItems,
					sizes: sizesToDisplay,
				},
				{
					onSuccess: () => {
						reset();
						onCloseDrawer?.();
					},
				}
			);
		}
	}

	return (
		<>
			<Modal>
				<h2>Upload a product</h2>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormRow>
						<label htmlFor="mainCategory">Gender</label>
						<select id="mainCategory" {...register("mainCategory")} defaultValue={mainCategory} disabled={isWorking}>
							<option value="men">Men</option>
							<option value="women">Women</option>
							<option value="kids">Kids</option>
						</select>
					</FormRow>
					<FormRow>
						<label htmlFor="subCategory">Section</label>
						<select id="subCategory" {...register("subCategory")} defaultValue={subCategory} disabled={isWorking}>
							{sectionsToRender &&
								Object.keys(sectionsToRender).map((section) => (
									<option value={section} key={section}>
										{section.replaceAll("-", " ").replaceAll("and", "&")}
									</option>
								))}
						</select>
					</FormRow>
					<FormRow>
						<label htmlFor="lateralCategory">Category</label>
						<select id="lateralCategory" {...register("lateralCategory")} defaultValue={lC} disabled={isWorking}>
							{categoriesToRender &&
								categoriesToRender.map((category) => (
									<option value={category} key={category}>
										{category.replaceAll("-and-", " & ").replaceAll("-", " ")}
									</option>
								))}
						</select>
					</FormRow>
					<FormRow>
						<label htmlFor="model">Model name</label>
						<input list="models" id="model" {...register("model", { required: "This field is required!" })} disabled={isWorking} />
						<p>{errors?.model?.message}</p>
						<datalist id="models">
							<option value="Smart Paris Polo Shirt Stretch Cotton">Smart Paris Polo Shirt Stretch Cotton</option>
						</datalist>
					</FormRow>
					<FormRow>
						<label htmlFor="color">Color</label>
						<input
							type="text"
							id="color"
							placeholder="white: A32"
							{...register("color", {
								required: "This field is required!",
								pattern: {
									value: /\w+\s?:\s?\w+/gi,
									message: "Separate the color name and its code by a colon eg. => white: A32",
								},
							})}
							disabled={isWorking}
						/>
						<p>{errors?.color?.message}</p>
					</FormRow>
					<FormRow>
						<label htmlFor="price">Price</label>
						<input
							type="text"
							min={1}
							id="price"
							{...register("price", {
								required: "This field is required!",
								min: { value: 1, message: "Price should be at least 1!" },
								setValueAs: (v) => +v,
							})}
							disabled={isWorking}
						/>
						<p>{errors?.price?.message}</p>
					</FormRow>
					<FormRow>
						<label htmlFor="salesPercent">Sales percent</label>
						<input
							type="text"
							min={0}
							defaultValue={0}
							id="salesPercent"
							{...register("salesPercent", {
								required: "This field is required!",
								min: {
									value: 0,
									message: "Sales percent should be at least 0!",
								},
								max: {
									value: 100,
									message: "Sales percent should be at most 100!",
								},
								setValueAs: (v) => +v,
							})}
							disabled={isWorking}
						/>
						<p>{errors?.salesPercent?.message}</p>
					</FormRow>
					<FormRow $else={true}>
						<span>Sizes</span>
						<CheckboxBtns register={register} sizesToDisplay={sizesToDisplay} isWorking={isWorking} subCategory={subCategory} />
						<p>{errors?.sizes?.message}</p>
					</FormRow>

					<FormRow $else={true}>
						<span>{sizesToDisplay ? "Available items for each size" : "Available items for this product"}</span>
						{sizes && <SettingAvailableItems obtainedSizes={sizesToDisplay} register={register} isWorking={isWorking} errors={errors} />}
						<p>{errors?.availableItems?.length > 0 && errors.availableItems[errors.availableItems.length - 1].message}</p>
					</FormRow>

					<Switch id="newIn" switchName="New" register={register} isWorking={isWorking} />

					<FormRow>
						<label htmlFor="images">Product Photos</label>
						<input
							type="file"
							accept="image/*"
							id="images"
							multiple
							{...register("images", {
								required: isEditSession ? false : "This field is required!",
							})}
							disabled={isWorking}
						/>
						<p>{errors?.images?.message}</p>
					</FormRow>
					<FormRow>
						<Button
							onClick={() => {
								reset();
								onCloseDrawer?.();
							}}
							type="reset"
							disabled={isWorking}
						>
							Cancel
						</Button>
						{isEditSession && (
							<Modal.Open opens="delete">
								<Button type="button">Delete</Button>
							</Modal.Open>
						)}
						<Button disabled={isWorking}>
							{isEditSession ? (
								isUpdating ? (
									<>
										<SpinnerMini />
										<span>Updating..</span>
									</>
								) : (
									"Edit Product"
								)
							) : isUploading ? (
								<>
									<SpinnerMini />
									<span>Uploading...</span>
								</>
							) : (
								"Upload Product"
							)}
						</Button>
					</FormRow>
				</Form>
				<Modal.Window name="delete">
					<ConfirmDelete resourceName="product" disabled={isDeleting} onConfirm={() => deleteProduct(editId)} />
				</Modal.Window>
			</Modal>
		</>
	);
}

export default ProductForm;
