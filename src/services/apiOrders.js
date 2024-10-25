import supabase from "./supabase";

export async function uploadOrder(order) {
	const { data, error } = await supabase.from("orders").insert([order]).select();
	if (error) throw new Error(error.message);

	return data;
}

export async function getOrders(email) {
	let { data: orders, error } = await supabase.from("orders").select("*").eq("email", email);
	if (error) throw new Error(error.message);

	return orders;
}
