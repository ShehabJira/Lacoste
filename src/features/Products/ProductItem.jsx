import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { PiDotsThreeVertical, PiPlus } from "react-icons/pi";
import SideDrawer from "../../ui/SideDrawer";
import ProductForm from "./ProductForm";
import { useUser } from "../Authentication/useUser";

const Product = styled.div`
	${(props) =>
		props.$forCarousel
			? css`
					padding: 0 0.875vw;
					width: 27vw;
					direction: ltr;
					@media (max-width: 768px) {
						width: 70vw;
					}
			  `
			: css`
					padding: 0 1.875vw;
			  `}
`;
const ImageContainer = styled.div`
	position: relative;
	img {
		transition: 0.5s;
		cursor: pointer;
		display: block;
		aspect-ratio: 1/1;
		width: 100%;
		height: auto;
	}
	img:last-of-type {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
	}
	&.second {
		img:last-of-type {
			opacity: 1;
		}
		img:first-of-type {
			opacity: 0;
		}
	}
	& > span {
		position: absolute;
		left: 8px;
		bottom: 15px;
		background-color: #fff;
		padding: 2px 8px;
		svg {
			width: 12px;
			height: 12px;
			margin-bottom: -2px;
			margin-right: 3px;
		}
	}
	& > svg {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 7px;
		right: 7px;
		padding: 7px;
		box-sizing: content-box;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
		path {
			pointer-events: none;
		}
		@media (hover: hover) {
			&:hover {
				background-color: #fff;
			}
		}
	}
`;
const ProductInfo = styled.div`
	display: grid;
	grid-auto-flow: row;
	gap: 5px;
	font-size: 11px;
	padding: 7px 0 30px;
`;
const BadgeContainer = styled.div`
	display: flex;
	align-items: center;
`;
const Badge = styled.span`
	color: #fff;
	background-color: ${(props) => (props.$newIn ? "#29292999" : " #004526")};
	padding: 0 6.5px;
	font-size: 11px;
	line-height: 24px;
	border-radius: 5px;
	height: 22px;
	margin-right: 10px;
`;
const ProductCaption = styled.div`
	font-size: 13px;
	color: #292929;
	line-height: 20px;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;
const Prices = styled.div`
	font-size: 13px;
	font-weight: 600;
	:not(.oldPrice) {
		color: #004526;
	}
	.oldPrice {
		text-decoration: line-through;
		color: #c8c8c8;
	}
`;

function ProductItem({ product, nOfThisProductModel, forCarousel }) {
	const navigate = useNavigate();
	const { mainCategory, subCategory, lateralCategory, id, color, sizes, images, model, salesPercent, newIn, price } = product;
	const { user } = useUser();
	function moveToTop() {
		window.scrollTo({ top: 0, left: 0 });
	}
	return (
		<Product $forCarousel={forCarousel}>
			<SideDrawer>
				<ImageContainer
					onMouseEnter={(e) => images?.srcs?.length > 1 && e.currentTarget.classList.add("second")}
					onMouseLeave={(e) => images?.srcs?.length > 1 && e.currentTarget.classList.remove("second")}
					onClick={(e) => {
						if (e.target.tagName === "svg") return;
						navigate(
							`/${mainCategory}/${subCategory}/${lateralCategory}/${id}?productModel=${model}&productColor=${color.replaceAll("/", "-")}&productSize=${
								sizes[0]
							}&nModel=${nOfThisProductModel}`
						);
						moveToTop();
					}}
				>
					<img src={images?.srcs?.[0] || ""} alt="first product" fetchpriority="low" />
					<img src={images?.srcs?.[1] || ""} alt="second product" fetchpriority="low" />

					{nOfThisProductModel - 1 > 0 && (
						<span>
							<PiPlus /> {nOfThisProductModel - 1} colour
							{nOfThisProductModel - 1 > 1 ? "s" : ""}
						</span>
						// we substract 1 as we want to exclude the displayed color.
					)}

					{user ? (
						<SideDrawer.Open opens="productForm">
							<PiDotsThreeVertical />
						</SideDrawer.Open>
					) : null}
				</ImageContainer>

				<ProductInfo>
					<BadgeContainer>
						{salesPercent !== 0 && <Badge>{salesPercent}% off</Badge>}
						{newIn && <Badge $newIn="true">New in</Badge>}
					</BadgeContainer>

					<ProductCaption
						onClick={(e) => {
							if (e.target.tagName === "svg") return;
							navigate(
								`/${mainCategory}/${subCategory}/${lateralCategory}/${id}?productModel=${model}&productColor=${color.replaceAll("/", "-")}&productSize=${
									sizes[0]
								}&productQuantity=${1}`
							);
							moveToTop();
						}}
					>
						{model}
					</ProductCaption>

					<Prices>
						<div>{salesPercent ? formatCurrency(Math.round(price - price * (salesPercent / 100))) : formatCurrency(price)}</div>
						{salesPercent !== 0 && <div className="oldPrice">{formatCurrency(price)}</div>}
					</Prices>
				</ProductInfo>
				<SideDrawer.Window name="productForm">
					<ProductForm productToEdit={product} />
				</SideDrawer.Window>
			</SideDrawer>
		</Product>
	);
}

export default ProductItem;
