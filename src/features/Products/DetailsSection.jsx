import styled from "styled-components";
import BreadcrumbsHeader from "../../ui/BreadcrumbsHeader";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";
import { BsChevronRight } from "react-icons/bs";
import { TbChevronLeft, TbChevronRight, TbShoppingBagPlus } from "react-icons/tb";
import Button from "../../ui/Button";
import SideDrawer from "../../ui/SideDrawer";
import ColorSelectedSide from "./ColorSelectedSide";
import SizeSelectedSide from "./SizeSelectedSide";
import { useEffect, useRef, useState } from "react";
import { PiXLight } from "react-icons/pi";
import { useSize } from "../../hooks/useSize";
import { useUserInfo } from "../../contexts/UserInfoContext";
import { useProduct } from "./useProduct";
import FullPageLoading from "../../ui/FullPageLoading";

const Product = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const ProductImages = styled.div`
	position: relative;
	@media (min-width: 1024px) {
		width: 52%;
	}
	@media (max-width: 1200px) {
		margin-bottom: 44px;
	}
	width: 100%;
`;
const Images = styled.div`
	scroll-snap-type: x mandatory;
	display: flex;
	&::-webkit-scrollbar {
		display: none;
	}
	overflow: auto;
	height: 100%;
	img {
		object-fit: cover;
		object-position: top center;
		cursor: zoom-in;
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		scroll-snap-align: start;
	}
`;

const ImagesSlider = styled.div`
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
	width: 60px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	max-height: 80%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	img {
		transition: 0.3s;
		width: 50px;
		height: 50px;
		aspect-ratio: 1/1;
		margin: 5px 0;
		border-radius: 8px;
		opacity: 0.5;
		border: 1px solid transparent;
		cursor: pointer;
	}
	img.active,
	img.userDidNotSelectYet:first-child {
		opacity: 1;
		border: 1px solid #c8c8c8;
	}
	// prevent hover from mobile
	@media (hover: hover) {
		img:hover {
			opacity: 1;
			border: 1px solid #c8c8c8;
		}
	}
	@media (max-width: 768px) {
		flex-wrap: nowrap;
		top: 90%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 60px;
	}
`;

const Magnification = styled.div`
	position: fixed;
	background-color: #fff;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 999999;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	& > svg {
		position: fixed;
		width: 30px;
		height: 30px;
		right: 4%;
		top: 6%;
		color: #6f6f6f;
		z-index: 2;
		cursor: pointer;
	}
	img {
		display: block;
		object-fit: cover;
		object-position: center;
		width: 100%;
		min-height: 100%;
		cursor: all-scroll;
	}
	& > div {
		display: flex;
		position: fixed;
		right: 4%;
		bottom: 6%;
		color: #6f6f6f;
		svg {
			width: 25px;
			height: 25px;
			padding: 6px;
			margin-right: 10px;
			box-sizing: content-box;
			background-color: #fff;
			@media (hover: hover) {
				&:hover {
					background-color: #d0c7c7;
				}
			}
			&.disabled {
				color: #c8c8c8;
				background-color: #fff;
				cursor: not-allowed;
			}
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 3;
			user-select: none;
			cursor: pointer;
		}
	}
`;
const CartBtnMobile = styled.div`
	position: absolute;
	width: 54px;
	height: 54px;
	border-radius: 50%;
	background-color: #105a33;
	cursor: pointer;
	@media (min-width: 769px) {
		display: none;
	}
	top: -70px;
	right: 3%;
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 25px;
		height: 25px;
		color: #fff;
	}
	&.soldOut {
		background-color: #444;
		cursor: not-allowed;
		&::after {
			content: "Sold Out";
			position: absolute;
			display: block;
			top: 105%;
			font-size: 13px;
			white-space: nowrap;
			font-weight: 600;
			left: 0px;
		}
	}
`;
const ProductContent = styled.div`
	position: relative;
	@media (min-width: 1024px) {
		width: 48%;
		padding: 0;
		padding-top: 64px;
	}
	@media (min-width: 1200px) {
		padding-right: calc(100vw / 20);
		padding-left: calc(100vw / 50);
	}
	width: 100%;
`;
const Content = styled.div`
	background-color: white;
	@media (min-width: 1024px) {
		width: 70%;
		padding-bottom: 20px;
	}
	margin: auto;
`;

const ContentHeader = styled.h1`
	font-size: 18px;
	margin-bottom: 16px;
	line-height: 28px;
	font-weight: normal;
	@media (max-width: 1024px) {
		padding: 0 76px;
	}
	@media (max-width: 768px) {
		padding: 0 15px;
		margin-bottom: 0;
	}
	@media (min-width: 1200px) {
		margin-bottom: 8px;
	}
`;
const BadgeContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
`;
const Badge = styled.span`
	color: #fff;
	background-color: ${(props) => (props.$newIn ? "#29292999" : " #004526")};
	padding: 0 6.5px;
	font-size: 13px;
	font-family: "archivo";
	line-height: 24px;
	border-radius: 10px;
	height: 22px;
	margin-right: 10px;
`;
const Price = styled.div`
	font-size: 15px;
	height: 41px;
	color: #292929;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
	span {
		line-height: 25px;
	}
	span.oldPrice {
		color: #767676;
		font-size: 13px;
		text-decoration: line-through;
		margin-left: 16px;
		line-height: 23px;
	}
	@media (min-width: 1200px) {
		span {
			display: block;
		}
		span.oldPrice {
			margin-left: 0;
		}
	}
	button {
		@media (min-width: 769px) {
			display: block;
		}
		@media (min-width: 1024px) {
			display: none;
		}
		font-weight: normal;
		padding: 0 31px;
	}
	@media (max-width: 1024px) {
		padding: 0 76px;
		margin-bottom: 33px;
	}
	@media (max-width: 768px) {
		padding: 0 15px;
		margin-bottom: 0;
	}
`;
const Row = styled.div`
	display: flex;
`;
const ItemsColor = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #eee;
	padding: 32px 0;
	@media (max-width: 1024px) {
		padding: 32px 76px;
	}
	@media (max-width: 768px) {
		padding: 32px 15px 24px;
	}
	cursor: pointer;
	svg {
		width: 18px;
		height: 18px;
	}
`;
const ColorSelectedDetails = styled.div`
	font-size: 15px;
	font-family: "archivo";
	line-height: 25px;
	color: #292929;
	& div:last-of-type {
		font-size: 13px;
		text-transform: capitalize;
	}
`;
const Img = styled.img`
	width: 60px;
	height: 60px;
	margin-right: 16px;
	max-width: 100%;
`;
const ItemsSize = styled(ItemsColor)``;
const SizeSelectedDetails = styled(ColorSelectedDetails)`
	b {
		margin: auto;
		color: #004546;
		font-size: 13px;
	}
`;
const Btn = styled(Button)`
	background-color: #105a33;
	font-size: 15px;
	font-family: "archivo";
	height: 52px;
	margin-top: 20px;
	line-height: normal;
	&:hover {
		background-color: #187c48;
		color: #fff;
		outline: none;
		border: none;
	}
	&.soldOut {
		background-color: #444;
		font-weight: 600;
	}
	@media (max-width: 1024px) {
		display: none;
	}
`;

function DetailsSection() {
	const { mainCategory, subCategory, lateralCategory, productId } = useParams();
	const searchParams = new URLSearchParams(window.location.search);
	const productSize = searchParams.get("productSize");
	const nOfThisProductModel = searchParams.get("nModel");

	const [imageToMagnify, setImageToMagnify] = useState(0);
	const { product, isLoading } = useProduct(productId);
	const { userState, dispatch } = useUserInfo();
	const chart = useSize();
	const ref = useRef(null);
	const navigate = useNavigate();
	//move to the first image when you move to another product.
	useEffect(
		function () {
			ref.current && moveToImage(1);
			// ref.current &&
			// 	document.querySelector(`[data-number='1']`).scrollIntoView();
		},
		[productId]
	);

	if (isLoading) return <FullPageLoading />;

	const { model, images, price, salesPercent, color, sizes, newIn, availableItems } = product;
	const availableItemsOfThisSize = availableItems[productSize];
	const soldOut = Object.values(availableItems).length === 0;
	const splittedColor = color.split(":");
	// 💡 Get the leftside distance from the image till its parent, and scroll to it.
	function moveToImage(n) {
		const imageToGo = document.querySelector(`[data-number='${n}']`);

		var xPositionToGo = imageToGo.offsetLeft - imageToGo.scrollLeft + imageToGo.clientLeft;

		ref.current.scroll({
			left: xPositionToGo,
			behavior: "smooth",
		});
		xPositionToGo = 0; // to start from the first image if the user went to another product.
	}
	// 💡 If the leftside distance of any image is less than the half of the image container, we need to change the classNames of these images to active(we have some images on Images component and some on the ImagesSlider), and the rest (which their leftside > the container half width) remove active class from them.
	function markActiveImage() {
		const imagesContainer = ref.current;

		imagesContainer.childNodes.forEach((image) => {
			let leftSideDistance = Math.abs(
				image.getBoundingClientRect().left - // the leftside distance of the image till the end of the screen
					imagesContainer.getBoundingClientRect().left // the leftside distance of the container till the end of the screen.
			);

			leftSideDistance < imagesContainer.offsetWidth / 2 //( the image leftside distance till its parent) < (half of parent width)
				? document.querySelectorAll(`[src='${image.src}']`).forEach((img) => {
						img.classList.add("active");
						img.classList.remove("userDidNotSelectYet");
				  })
				: document.querySelectorAll(`[src='${image.src}']`).forEach((img) => img.classList.remove("active", "userDidNotSelectYet"));
		});
	}

	function addToBag() {
		const { productColor, productSize, productModel } = Object.fromEntries(searchParams.entries());

		const itemObj = {
			productId: productId,
			productQuantity: 1,
			salesPercent,
			regularPrice: price,
			totalRegularPrice: price,
			unitPrice: price - price * (salesPercent / 100),
			totalPrice: price - price * (salesPercent / 100),
			image: images.srcs[0],
			productColor,
			productModel,
			productSize,
		};

		// if the user add the same size of the same product to the bag just increase its quantity and adjust its totalPrice, else add the product to the bag.
		if (userState.bag.some((item) => item.productId === productId && item.productSize === productSize)) {
			//before increasing the item check that there is an available quantity of it.
			const itemToIncrease = userState.bag.find((obj) => obj.productId === productId && obj.productSize === productSize);
			if (itemToIncrease.productQuantity >= availableItemsOfThisSize) {
				toast.error("There is no items left of this size!");
				return;
			}

			dispatch({ type: "user/updateBagItem", payload: { productId, productSize } });
			toast.success("Item added to the bag");
		} else {
			toast.success("Item added to the bag");
			dispatch({ type: "user/addToBag", payload: itemObj });
		}
	}
	return (
		<>
			<BreadcrumbsHeader $forPage={true}>
				<span></span>
				<span onClick={() => navigate("/")}>Lacoste Homepage</span>
				<span>/</span>
				<span onClick={() => navigate("/lacoste")}>Lacoste</span>
				<span>/</span>
				<span onClick={() => navigate(`/${mainCategory}`)}>{mainCategory.replaceAll("-", " ").replaceAll("and", "&")}</span>
				<span>/</span>
				<span onClick={() => navigate(`/${mainCategory}/${subCategory}`)}>{subCategory.replaceAll("-", " ").replaceAll("and", "&")}</span>
				<span>/</span>
				<span onClick={() => navigate(`/${mainCategory}/${subCategory}/${lateralCategory}`)}>
					{lateralCategory.replaceAll("-", " ").replaceAll("and", "&")}
				</span>
				<span>/</span>
				<span>{model}</span>
			</BreadcrumbsHeader>

			<Product>
				<ProductImages>
					<Images ref={ref} onScroll={() => markActiveImage()}>
						{images.srcs.map((image, i) => (
							<img
								src={image}
								alt="product"
								key={image}
								data-number={i + 1}
								onClick={() => {
									setImageToMagnify(i + 1);
									document.body.style.overflow = "hidden";
								}}
							/>
						))}
					</Images>
					<ImagesSlider>
						{images.srcs.map((image, i) => (
							<img src={image} alt="model" key={image} className="userDidNotSelectYet" onClick={() => moveToImage(i + 1)} />
						))}
					</ImagesSlider>
					{imageToMagnify > 0 && (
						<Magnification className="magnificationArea">
							<PiXLight
								onClick={() => {
									setImageToMagnify(0);
									document.body.style.overflow = "visible";
								}}
							/>
							<img loading="lazy" src={document.querySelector(`[data-number='${imageToMagnify}']`)?.src} alt="Magnified model" />
							<div>
								<TbChevronLeft
									onClick={() => (imageToMagnify >= 2 ? setImageToMagnify((cur) => cur - 1) : "")}
									className={`${imageToMagnify === 1 ? "disabled" : ""}`}
								/>
								<TbChevronRight
									onClick={() => (imageToMagnify < images.srcs.length ? setImageToMagnify((cur) => cur + 1) : "")}
									className={`${imageToMagnify === images.srcs.length ? "disabled" : ""}`}
								/>
							</div>
						</Magnification>
					)}
				</ProductImages>

				<ProductContent>
					<CartBtnMobile role="button" onClick={() => (soldOut ? "" : addToBag())} className={soldOut ? "soldOut" : ""}>
						<TbShoppingBagPlus />
					</CartBtnMobile>
					<Content>
						<ContentHeader>
							<BadgeContainer>
								{salesPercent !== 0 && <Badge>{salesPercent}% off</Badge>}
								{newIn && <Badge $newIn="true">New in</Badge>}
							</BadgeContainer>
							{model}
						</ContentHeader>

						<Price>
							<div>
								<span>{salesPercent ? formatCurrency(Math.round(price - price * (product.salesPercent / 100))) : formatCurrency(price)}</span>
								<span className="oldPrice">{salesPercent !== 0 && formatCurrency(price)}</span>
							</div>
							<Btn onClick={() => addToBag()} disabled={soldOut} className={soldOut ? "soldOut" : ""}>
								{soldOut ? "Sold Out" : "Add to bag"}
							</Btn>
						</Price>

						<SideDrawer>
							<SideDrawer.Open opens="color">
								<ItemsColor>
									<Row>
										<Img src={images.srcs[3] || images.srcs[0]} alt="" loading="lazy" />
										<ColorSelectedDetails>
											<div>Colour selected {nOfThisProductModel > 1 ? `(+${nOfThisProductModel - 1})` : ``}</div>
											<div>
												{splittedColor[0]} &bull; {splittedColor[1]}
											</div>
										</ColorSelectedDetails>
									</Row>
									<BsChevronRight />
								</ItemsColor>
							</SideDrawer.Open>
							<SideDrawer.Window name="color">
								<ColorSelectedSide nOfThisProductModel={nOfThisProductModel} />
							</SideDrawer.Window>

							{!sizes.includes(0) ? (
								<>
									<SideDrawer.Open opens="size">
										<ItemsSize>
											<SizeSelectedDetails>
												<div>Size selected</div> <div>{chart.filter((size) => parseFloat(size) === +productSize)} </div>
												<b>{availableItemsOfThisSize <= 5 ? `(Only ${availableItemsOfThisSize} items left of this size!)` : ""}</b>
											</SizeSelectedDetails>
											<BsChevronRight />
										</ItemsSize>
									</SideDrawer.Open>
									<SideDrawer.Window name="size">
										<SizeSelectedSide
											sizes={sizes}
											price={price}
											salesPercent={salesPercent}
											images={images}
											soldOut={soldOut}
											addToBag={addToBag}
											onCloseDrawer
										/>
									</SideDrawer.Window>
								</>
							) : (
								<ItemsSize style={{ cursor: "default" }}>
									<SizeSelectedDetails>
										<div
											style={{
												lineHeight: "44px",
												fontWeight: "400",
												fontSize: "15px",
											}}
										>
											Unique Size <b>{availableItemsOfThisSize <= 5 ? `(Only ${availableItemsOfThisSize} items left!)` : ""}</b>
										</div>
									</SizeSelectedDetails>
								</ItemsSize>
							)}
						</SideDrawer>

						<Btn $width="100%" onClick={() => addToBag()} disabled={soldOut} className={soldOut ? "soldOut" : ""}>
							{soldOut ? "Sold Out" : "Add to bag"}
						</Btn>
					</Content>
				</ProductContent>
			</Product>
		</>
	);
}

export default DetailsSection;
