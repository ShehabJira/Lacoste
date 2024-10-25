import { useParams } from "react-router-dom";
import { charts } from "../utils/constants";

export function useSize() {
	const { mainCategory, subCategory, lateralCategory } = useParams();

	let chart;
	if (subCategory === "shoes") chart = charts["shoes"];
	else if (mainCategory === "kids" && subCategory === "babies") chart = charts["babies"];
	else if (mainCategory === "kids" && lateralCategory === "clothing") chart = charts["children"];
	else if (mainCategory === "kids" && lateralCategory === "shoes") chart = charts["children"];
	else chart = charts["clothing"];

	return chart;
}
