import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAllProducts } from "./useAllProducts";

const Tabs = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	margin-top: 16px;
	margin-bottom: 48px;
`;
const Tab = styled.div`
	width: 50%;
	font-family: "archivo";
	font-size: 15px;
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 8px;
	line-height: 25px;
	color: #292929;
	transition: 0.3s;
	cursor: pointer;
	&.active {
		border-bottom: 1px solid #38b272;
		font-weight: 800;
	}
`;

const ColorsListBadges = styled.div`
	display: flex;
	flex-wrap: wrap;
	@media (max-width: 1024px) {
		flex-wrap: nowrap;
		overflow: auto;
		/* width */
		&::-webkit-scrollbar {
			width: 5px;
		}
		/* Track */
		&::-webkit-scrollbar-track {
			border-radius: 10px;
			background-color: #eee;
		}
		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: #105a33;
			border-radius: 10px;
			width: 2px;
		}
		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: #15803d;
		}
	}
	padding-bottom: 16px;
`;
const Badge = styled.div`
	border: 1px solid #c8c8c8;
	border-radius: 18px;
	font-size: 15px;
	font-family: "archivo";
	color: #292929;
	padding: 8px 16px;
	margin: 0 8px 16px 0;
	line-height: 20px;
	text-transform: capitalize;
	flex-shrink: 0;
	transition: 0.3s;
	cursor: pointer;
	&.active,
	&:hover {
		background-color: #292929;
		color: #fff;
	}
`;
const ColorsListItems = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: start;
	column-gap: 15px;
	padding-top: 16px;
`;
const ColorItem = styled.button`
	border: none;
	background-color: #fff;
	&:focus {
		outline: none;
	}
	img {
		border-radius: 8px;
		margin-bottom: 5px;
		transition: 0.3s;
		max-width: 100%;
	}
	&:hover,
	&.active {
		img {
			border: 1px solid #292929;
		}
	}
	span {
		font-size: 13px;
		font-family: "archivo";
		line-height: 15px;
		margin-bottom: 8px;
		display: inline-block;
		color: #767676;
		span:first-child {
			text-transform: capitalize;
		}
	}
`;
function ColorSelectedSide({ nOfThisProductModel }) {
	const [activeTab, setActiveTab] = useState("all");
	const [activeColor, setActiveColor] = useState("all");
	const { allProducts, isGettingAllProducts } = useAllProducts();
	const searchParams = new URLSearchParams(window.location.search);
	const model = searchParams.get("productModel");

	const { productId } = useParams();
	const id = +productId;

	const navigate = useNavigate();

	if (isGettingAllProducts) return <div>loading...</div>;

	// get all products of that model.
	const modelProducts = allProducts.filter((product) => product.model === model);
	const modelProductsOnSale = modelProducts.filter((product) => product.salesPercent);

	// get all available colors of that model.
	const colors = [...new Set(modelProducts.map((product) => product.color.split(":")[0].trim().toLowerCase()))];

	const colorsOnSale = [...new Set(modelProductsOnSale.map((product) => product.color.split(":")[0].trim().toLowerCase()))];
	const colorsToDisplay = activeTab === "all" ? colors : colorsOnSale;
	const modelProductsToDisplay =
		activeTab === "all"
			? activeColor === "all"
				? modelProducts
				: modelProducts.filter((product) => product.color.split(":")[0].trim().toLowerCase() === activeColor)
			: // activeTab === "sale"
			activeColor === "all"
			? modelProductsOnSale
			: modelProductsOnSale.filter((product) => product.color.split(":")[0].trim().toLowerCase() === activeColor);

	return (
		<div>
			<h2>Select a color</h2>

			<Tabs>
				<Tab
					className={`${activeTab === "all" ? "active" : ""}`}
					onClick={() => {
						setActiveTab("all");
						setActiveColor("all");
					}}
				>
					All colors ({modelProducts.length})
				</Tab>
				<Tab
					className={`${activeTab === "sale" ? "active" : ""}`}
					onClick={() => {
						setActiveTab("sale");
						setActiveColor("all");
					}}
				>
					Colors on sale ({modelProductsOnSale.length})
				</Tab>
			</Tabs>

			<ColorsListBadges>
				{colorsToDisplay.length !== 0 && (
					<Badge className={`${activeColor === "all" ? "active" : ""}`} onClick={() => setActiveColor("all")}>
						All
					</Badge>
				)}
				{colorsToDisplay &&
					colorsToDisplay.map((color) => (
						<Badge className={`${activeColor === color ? "active" : ""}`} onClick={() => setActiveColor(color)} key={color}>
							{color}
						</Badge>
					))}
			</ColorsListBadges>

			<ColorsListItems>
				{modelProductsToDisplay.map((product) => (
					<ColorItem
						className={`${product.id === id ? "active" : ""}`}
						key={product.id}
						onClick={() =>
							navigate(
								`/${product.mainCategory}/${product.subCategory}/${product.lateralCategory}/${product.id}?productModel=${
									product.model
								}&productColor=${product.color.replaceAll("/", "-")}&productSize=${product.sizes[0]}&nModel=${nOfThisProductModel}`,
								{ replace: true }
							)
						}
					>
						<img src={product.images.srcs[0]} alt="an available color" />
						<span>
							<span>{product.color.split(":")[0]}</span> &bull; <span>{product.color.split(":")[1]}</span>
						</span>
					</ColorItem>
				))}
			</ColorsListItems>
		</div>
	);
}

export default ColorSelectedSide;
