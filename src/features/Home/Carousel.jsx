import styled from "styled-components";
import { useCallback, useState } from "react";
import FractionPagination from "../../ui/FractionPagination";
import { useProducts } from "../Products/useProducts";
import ProductItem from "../Products/ProductItem";
import FullPageLoading from "../../ui/FullPageLoading";
import { useAllProducts } from "../Products/useAllProducts";
const StyledCarousel = styled.div`
	margin-bottom: 20px;
`;
const HeadingBar = styled.div`
	display: flex;
	justify-content: space-between;
	padding: calc(100vw / 35) 80px 0 60px;
	body[dir="rtl"] & {
		padding: calc(100vw / 35) 60px 0 80px;
	}
	@media (max-width: 768px) {
		padding: calc(100vw / 35) 80px 0 30px;
	}
	h2 {
		margin-bottom: 8px;
		font-size: 26px;
	}
`;
const Swiper = styled.div`
	margin-left: 50px;
	body[dir="rtl"] & {
		margin-left: 0;
		margin-right: 50px;
	}
	@media (max-width: 768px) {
		margin-left: 20px;
		body[dir="rtl"] & {
			margin-left: 0;
			margin-right: 20px;
		}
	}
	display: flex;
	overflow: auto;
	@media (min-width: 768px) {
		overflow: hidden;
	}
	&::-webkit-scrollbar {
		display: none;
	}
`;
const Products = styled.div`
	display: flex;
`;

function Carousel({ heading }) {
	const { products, isGettingProducts } = useProducts();
	const { allProducts, isGettingAllProducts } = useAllProducts();

	const [swiperElement, setSwiperElement] = useState(null); // we store the reference of the swiper in state.
	// the normal ref can't be used as when the component first mount it will take the first value of the node which is null or undefined cuz we're fetching our products and they are not exist in the first render, then when it gets updated to the value of the node it will not trigger a re-render, thus we are still using the null or undefined value.

	// Update state from a memoized callback, so we need to update our state only when the node changes.
	// Ref function updates our state when the node changes, remember that functions don't keep its own reference between renders, this will cause our state to be updated in each re-render. In turn, we need to memoize it.
	const Ref = useCallback((node) => {
		if (node !== null) {
			setSwiperElement(node);
		}
	}, []); // Once the callback is triggered with a node, you can consume it as needed. the value of the node is obtained from element that we put our Ref on it.

	if (isGettingProducts || isGettingAllProducts) return <FullPageLoading />;
	if (!products?.length) return null;

	return (
		<StyledCarousel>
			<HeadingBar>
				<h2>{heading}</h2>
				{products.length > 3 && (
					<FractionPagination reff={swiperElement} endPoint={products.length - Math.floor(window.innerWidth / (0.27 * window.innerWidth)) + 3} />
				)}
			</HeadingBar>
			<Swiper ref={Ref}>
				<Products className="Products">
					{products.map((product) => (
						<ProductItem
							key={product.id}
							product={product}
							nOfThisProductModel={allProducts.filter((prod) => prod.model === product.model)?.length}
							products={products}
							forCarousel={true}
						/>
					))}
				</Products>
			</Swiper>
		</StyledCarousel>
	);
}

export default Carousel;
