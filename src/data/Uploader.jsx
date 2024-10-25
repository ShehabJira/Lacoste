import { useState } from "react";
import supabase from "../services/supabase";
import { products } from "./data-products";
import Button from "../ui/Button";
import { PiArrowCounterClockwise } from "react-icons/pi";
import { useQueryClient } from "@tanstack/react-query";

async function deleteProducts() {
	const { error } = await supabase.from("products").delete().gt("id", 0);
	if (error) console.log(error.message);
}

async function createProducts() {
	const { error } = await supabase.from("products").insert(products);
	if (error) console.log(error.message);
}

function Uploader() {
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();
	async function uploadProducts() {
		setIsLoading(true);

		// First, delete existing products.
		await deleteProducts();
		// Second, upload products.
		await createProducts();

		queryClient.invalidateQueries({ queryKey: ["products"] });

		setIsLoading(false);
	}
	return (
		<Button
			onClick={uploadProducts}
			disabled={isLoading}
			title="Reset project to its sample data"
		>
			<PiArrowCounterClockwise /> RESET
		</Button>
	);
}

export default Uploader;
