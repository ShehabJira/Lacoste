import { defaultShouldDehydrateMutation } from "@tanstack/react-query";
import supabase, { supabaseUrl } from "./supabase";

export async function getProducts(mainCategory, subCategory, lateralCategory, sz, sortBy, filters, searchQuery) {
	// let { data: products, error } = await supabase.from("products").select("*") // we will not destructure and get our data now
	let query = supabase.from("products").select("*", { count: "exact" });

	// get items by the searchQuery if provided.
	if (searchQuery) {
		query.textSearch("fts", searchQuery, { type: "websearch" });
	}

	// we will do some filtering
	if (mainCategory === "new-in") {
		if (subCategory) query.eq("mainCategory", subCategory);
		if (lateralCategory) query.eq("subCategory", lateralCategory);
		query.eq("newIn", true);
	} else if (mainCategory === "last-chance") {
		if (subCategory) query.eq("mainCategory", subCategory);
		query.neq("salesPercent", 0);
	} else {
		if (mainCategory) query.eq("mainCategory", mainCategory);
		if (subCategory) query.eq("subCategory", subCategory);
		if (lateralCategory) query.eq("lateralCategory", lateralCategory);
	}

	// Filtering
	for (let i = 0; i < filters.length; i++) {
		let sizesCategoriesToSearchIn = `${/[SMLX]/.test(filters[i].value) ? "clothing" : ""} ${filters[i].value.includes("UK") ? "shoes" : ""} ${
			filters[i].value.includes("yrs") ? "children  teen" : ""
		} ${filters[i].value.includes("months") ? "babies" : ""}`;
		sizesCategoriesToSearchIn = sizesCategoriesToSearchIn
			.split(" ")
			.filter((ele) => ele)
			.join(" | ");

		if (filters[i].field === "Gender") query.textSearch("mainCategory", `${filters[i].value.replaceAll(" ", " | ")}`);
		if (filters[i].field === "Product Type") query.textSearch("lateralCategory", `${filters[i].value.replaceAll(" ", " | ")}`);
		if (filters[i].field === "color") query.textSearch("color", `${filters[i].value.replaceAll(" ", " | ")}`);
		if (filters[i].field === "sizes") {
			query.textSearch("subCategory", sizesCategoriesToSearchIn).or(
				filters[i].value
					.split(" ")
					.map((elem) => `sizes.cs.{${parseFloat(elem)}}`)
					.join(",")
			);
		}
	}

	// SORTING
	if (sortBy) query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

	// PAGINATION
	query.range(0, sz);

	// then destructure and get our needed data
	const { data: products = {}, error, count } = await query;

	if (error) throw new Error(error.message);
	return { products, count };
}
export async function getAllProducts(ids, instantSearchQuery) {
	// we need to obtain all products before filtering,sorting or pagination. as we will need them in rare cases.
	let query = supabase.from("products").select("*");

	// if you need some products with a number of ids.
	if (ids) query.in("id", ids);

	// get items by the searchQuery if provided.
	if (instantSearchQuery) {
		query.textSearch("fts", instantSearchQuery, { type: "websearch" });
	}

	const { data: allProducts, error: allProductsError } = await query;
	if (allProductsError) throw new Error(allProductsError.message);
	return allProducts;
}
export async function getProduct(id) {
	let { data: product, error } = await supabase.from("products").select("*").eq("id", id).select().single();
	if (error) throw new Error(error.message);

	return product;
}

export async function uploadUpdateProduct(product, id) {
	const hasImagePath = product?.images?.srcs && product.images.srcs.length > 0 && product.images.srcs[0].startsWith(supabaseUrl);
	// Modify images names from any slashs and make them unique.
	const imagesNames = Array.from(product.images, (image) => `${Math.random()}-${image.name}`.replaceAll("/", "").replaceAll(" ", "-"));
	// First Form their paths to the bucket
	const ImagesPaths = hasImagePath ? product.images.srcs : imagesNames.map((imageName) => `${supabaseUrl}/storage/v1/object/public/images/${imageName}`);

	const imagesObj = { srcs: ImagesPaths };
	let query = supabase.from("products");

	// a) Upload a product            => here we are modifying our query before sending to supabase
	if (!id) query = query.insert([{ ...product, images: imagesObj }]);

	// b) Update a product
	if (id) query = query.update({ ...product, images: imagesObj, fts: defaultShouldDehydrateMutation }).eq("id", id);

	// submitting our modified query to supabase.
	const { data, error } = await query.select().single();

	if (error) throw new Error(error.message);

	if (hasImagePath) return data;

	// Second, if the product uploaded with no errors, then upload the image to the bucket.
	for (let i = 0; i < product?.images?.length; i++) {
		const { error: storageError } = await supabase.storage.from("images").upload(imagesNames[i], product.images[i]);

		// Third, if there was a problem in uploading this image, delete this whole created product.
		if (storageError) {
			await supabase.from("cabins").delete().eq("id", data.id);
			throw new Error("Cabin image could not be uploaded and the cabin was not created");
		}
	}

	return data;
}

export async function deleteProduct(id) {
	// get products images paths before deleting the product
	// const { data: dataImages } = await supabase
	// 	.from("products")
	// 	.select("images")
	// 	.eq("id", id);
	// const imagesNames = dataImages[0].images.srcs.map((image) =>
	// 	image.replace(`${supabaseUrl}/storage/v1/object/public/images/`, "")
	// );

	// Delete the product
	const { error, data } = await supabase.from("products").delete().eq("id", id);
	if (error) throw new Error("Product could not be deleted!");

	// if the product has been deleted successfully, then delete its images
	// if (!error) {
	// 	const { error: imagesErr } = await supabase.storage
	// 		.from("images")
	// 		.remove(imagesNames);
	// 	if (imagesErr)
	// 		throw new Error(
	// 			"There is a problem deleting images of this product in database!"
	// 		);
	// }

	return data;
}
