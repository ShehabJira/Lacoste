import styled from "styled-components";
import BreadcrumbsHeader from "../ui/BreadcrumbsHeader";
import Button from "../ui/Button";
import { MdTune } from "react-icons/md";
import { useProducts } from "../features/Products/useProducts";
import ProductItem from "../features/Products/ProductItem";
import CharacterExpress from "../features/Products/CharacterExpress";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PiUploadSimple } from "react-icons/pi";
import SideDrawer from "../ui/SideDrawer";
import SortFilter from "../features/Products/SortFilter";
import ProductForm from "../features/Products/ProductForm";
import Uploader from "../data/Uploader";
import { captions } from "../utils/constants";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import FullPageLoading from "../ui/FullPageLoading";
import PageNotFound from "./PageNotFound";
import NoResults from "../features/Products/NoResults";
import { useAllProducts } from "../features/Products/useAllProducts";

const Page = styled.div`
	@media (min-width: 768px) {
		padding-left: 3.36vw;
		padding-right: 3.36vw;
	}
`;
const H1 = styled.h1`
	color: #292929;
	font-size: 28px;
	margin-bottom: 8px;
	margin-top: -10px;
	padding: 20px 0;
	text-transform: capitalize;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 600;
	@media (max-width: 768px) {
		padding-left: 15px;
		padding-right: 15px;
	}
	display: flex;
	justify-content: space-between;
	button {
		background-color: var(--color-green-700);
		height: 36px;
		line-height: 18px;
		&:hover {
			background-color: #105a33;
			color: #fff;
			outline: none;
			border: none;
		}
		svg {
			margin-right: 5px;
		}
	}
`;
const Caption = styled.div`
	& > div {
		width: 33%;
		@media (max-width: 768px) {
			width: 100%;
			margin-bottom: 16px;
		}
		font-family: metropolis, Arial, Helvetica, sans-serif;
		font-size: 15px;
		color: #292929;
		line-height: 25px;
		margin-bottom: 60px;
	}
	@media (max-width: 768px) {
		padding: 0 15px;
	}
`;

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 15px;
	div {
		@media (max-width: 768px) {
			padding-left: 15px;
		}
	}
	div:first-child {
		width: 150px;
		margin: 28px 1vw;
		font-size: 16px;
		color: #292929;
	}
	div:last-child {
		width: 420px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin: 15px 0;
		@media (max-width: 600px) {
			justify-content: center;
			width: 100%;
		}
		@media (max-width: 370px) {
			button {
				font-size: 11px;
				width: fit-content;
				padding: 0 15px;
				svg {
					width: 17px;
					height: 17px;
					@media (max-width: 291px) {
						display: none;
					}
				}
			}
		}
		button {
			margin-right: 10px;
			background-color: #343a40;
			&:hover {
				outline: none;
				background-color: #23272b;
				border: none;
				color: #fff;
			}
		}
	}
`;
const Products = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 25%);
	row-gap: 15px;
	margin-left: -15px;
	margin-right: -15px;
	padding-bottom: 80px;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 50%);
		margin-left: 0;
		margin-right: 0;
	}
	& > button {
		grid-column: 1/5;
		@media (max-width: 768px) {
			grid-column: 1/3;
		}
		justify-self: center;
		padding: 0 30px;
		height: 50px;
		letter-spacing: 2px;
	}
`;
function ProductsPage() {
	const { mainCategory, subCategory, lateralCategory } = useParams();
	const { products, isGettingProducts, count } = useProducts();
	const { allProducts, isGettingAllProducts } = useAllProducts();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const Subject = lateralCategory ? lateralCategory : subCategory ? subCategory : mainCategory;
	const isLoading = isGettingProducts || isGettingAllProducts;

	function viewMore() {
		const sz = !searchParams.get("sz") ? 11 : +searchParams.get("sz") + 4;
		searchParams.set("sz", sz);
		setSearchParams(searchParams, { replace: true });
	}

	if (isLoading) return <FullPageLoading />;

	if (!count && !searchParams.has("pref1") && !searchParams.has("pref2") && !searchParams.has("pref3") && !searchParams.has("pref4")) return <NoResults />;

	return mainCategory !== "men" &&
		mainCategory !== "women" &&
		mainCategory !== "kids" &&
		mainCategory !== "new-in" &&
		mainCategory !== "last-chance" &&
		!window.location.pathname.startsWith("/demandware") &&
		!window.location.pathname.startsWith("/lacoste") ? (
		<>
			<PageNotFound />
		</>
	) : (
		<>
			<Header />

			<BreadcrumbsHeader $forPage={true}>
				<span></span>
				<span onClick={() => navigate("/")}>Lacoste Homepage</span>
				<span>/</span>
				<span onClick={() => navigate("/lacoste")}>Lacoste</span>
				{subCategory && (
					<>
						<span>/</span>
						<span onClick={() => navigate(`/${mainCategory}`)}>{mainCategory?.replaceAll("-and-", " & ")?.replaceAll("-", " ")}</span>
						<span>/</span>
						<span onClick={() => navigate(`/${mainCategory}/${subCategory}`)}>{subCategory?.replaceAll("-and-", " & ")?.replaceAll("-", " ")}</span>
					</>
				)}
				{lateralCategory && (
					<>
						<span>/</span>
						<span>{lateralCategory?.replaceAll("-and-", " & ")?.replaceAll("-", " ")}</span>
					</>
				)}
			</BreadcrumbsHeader>
			<Page>
				<H1>
					{Subject?.replaceAll("-and-", " & ")?.replaceAll("-", " ")}
					<Uploader />
				</H1>
				{captions[`${Subject}`] && (
					<Caption>
						<div>{captions[`${Subject}`]}</div>
					</Caption>
				)}
				<Row>
					<div>{count} results</div>
					<div>
						<SideDrawer>
							<SideDrawer.Open opens="productForm">
								<Button $width="200px" $backgroundColor="#343a40">
									<PiUploadSimple />
									Upload Product
								</Button>
							</SideDrawer.Open>
							<SideDrawer.Window name="productForm">
								<ProductForm />
							</SideDrawer.Window>

							<SideDrawer.Open opens="sortFilter">
								<Button $width="200px" $backgroundColor="#343a40">
									<MdTune />
									Sort And Filter
								</Button>
							</SideDrawer.Open>
							<SideDrawer.Window name="sortFilter">
								<SortFilter />
							</SideDrawer.Window>
						</SideDrawer>
					</div>
				</Row>
				<Products className="Products">
					{products?.map((product) => (
						<ProductItem
							product={product}
							isLoading={isLoading}
							nOfThisProductModel={allProducts?.filter((prod) => prod.model === product.model)?.length}
							key={product.id}
						/>
					))}
					{products?.length < count && <Button onClick={viewMore}>View More</Button>}
				</Products>
			</Page>
			<CharacterExpress />
			<Footer />
		</>
	);
}

export default ProductsPage;
