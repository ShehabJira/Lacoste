import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useSearchParams } from "react-router-dom";
import { useSize } from "../../hooks/useSize";
const SizeArea = styled.div`
	hr {
		border: 1px solid #e5e5e5;
		width: calc(100% + (calc(100vw / 25) * 2));
		position: absolute;
		left: 0;
		bottom: 85px;
		@media (max-width: 1024px) {
			display: none;
		}
	}
`;
const SizeSelectedDetails = styled.div`
	display: flex;
	margin-bottom: 16px;
	padding-bottom: 16px;
	font-family: "archivo";
	color: #292929;
	border-bottom: 1px solid #e5e5e5;
	div:first-child {
		margin-right: 16px;
		font-size: 15px;
	}
	div:nth-child(2) {
		text-transform: capitalize;
		img {
			width: 8px;
			height: 8px;
			display: inline-block;
			border-radius: 50%;
			margin-right: 4px;
			margin-bottom: 2px;
			object-fit: none;
			object-position: center;
		}
	}
`;
const PriceDetails = styled(SizeSelectedDetails)`
	font-family: metropolis, Arial, Helvetica, sans-serif;
	div:first-child {
		font-weight: 600;
		font-size: 15px;
	}
	div:nth-child(2) {
		text-decoration: line-through;
		color: #767676;
		font-size: 13px;
	}
`;
const SizesTable = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 15px;
	button {
		background-color: #fff;
		color: #292929;
		font-family: "archivo";
		font-size: 15px;
		font-weight: 400;
		line-height: 20px;
		height: 45px;
		border-radius: 27px;
		margin-bottom: 16px;
		border: 1px solid #c8c8c8;
		transition: 0.3s;
		outline: none;
		&.exist {
			cursor: pointer;
		}
		&.notExist {
			pointer-events: none;
			color: #c8c8c8;
		}
		&.active,
		&:hover {
			background-color: #292929;
			color: #fff;
		}
		&focus {
			outline: none;
		}
	}
`;
const Btn = styled(Button)`
	background-color: #105a33;
	font-size: 15px;
	font-family: "archivo";
	height: 52px;
	margin-top: 20px;
	border: none;
	&:hover {
		background-color: #187c48;
		color: #fff;
		outline: none;
	}
	position: absolute;
	right: 20px;
	bottom: 15px;
	@media (max-width: 1024px) {
		width: 100%;
		right: 0;
		bottom: 0;
		margin-top: 0;
		border-radius: 0;
	}
	&.soldOut {
		background-color: #444;
		font-weight: 600;
	}
`;

function SizeSelectedSide({ images, salesPercent, price, sizes, addToBag, soldOut, onCloseDrawer }) {
	const [searchParams, setSearchParams] = useSearchParams(); // searchParams is an iterator allowing iteration through all key/value pairs contained in this object in the same order as they appear in the query string.
	const searchParamsObj = Object.fromEntries(searchParams.entries()); // make an object contains a key value pare of each query string.
	const { productColor, productSize } = searchParamsObj; // then desturcture these values.
	// this way is better than doing so many searchParams.get("") to get a certain query string value.

	// that 'searchParams' is the same as the 'searchParams' returned from new URLSearchParams()
	// const searchParams = new URLSearchParams(window.location.search); // new UrlSearchParams => Returns an iterator allowing iteration through all key/value pairs contained in this object in the same order as they appear in the query string.
	// const searchParamsObj = Object.fromEntries(searchParams.entries());
	// console.log(searchParamsObj);
	// Note! if you used this way and you updated some query string in searchParams, you would need a way to update the url with the updated searchParams by causing a rerender. Just like when we used setSearchParams(searchParams)

	// Note!
	// [1] new URLSearchParams() => takes only the query string part of the URL, which you access using window.location.search
	// [2] Search parameters can also be an object
	// const paramsObj = { foo: "bar", baz: "bar" };
	// const searchParams = new URLSearchParams(paramsObj);
	// console.log(searchParams.toString()); // "foo=bar&baz=bar" //by doing this you can set multiple query strings.

	// [3] searchParams has all these methods
	// const paramsString = "q=URLUtils.searchParams&topic=api";
	// const searchParams = new URLSearchParams(paramsString);

	// // Iterating the search parameters
	// for (const p of searchParams) {
	//   console.log(p);
	// }

	// console.log(searchParams.has("topic")); // true
	// console.log(searchParams.has("topic", "fish")); // false
	// console.log(searchParams.get("topic") === "api"); // true
	// console.log(searchParams.getAll("topic")); // ["api"]
	// console.log(searchParams.get("foo") === null); // true
	// console.log(searchParams.append("topic", "webdev"));
	// console.log(searchParams.toString()); // "q=URLUtils.searchParams&topic=api&topic=webdev"
	// console.log(searchParams.set("topic", "More webdev"));
	// console.log(searchParams.toString()); // "q=URLUtils.searchParams&topic=More+webdev"
	// console.log(searchParams.delete("topic"));
	// console.log(searchParams.toString()); // "q=URLUtils.searchParams"

	// [4] An object implementing URLSearchParams can directly be used in a for...of structure to iterate over key/value pairs in the same order as they appear in the query string, for example the following two lines are equivalent:
	// for (const [key, value] of searchParams) {
	// 	console.log(key, value);
	// }
	// for (const [key, value] of searchParams.entries()) {
	// 	console.log(key, value);
	// }

	// => And this to see the key value pair together
	// for (const p of searchParams) {
	// 	console.log(p);
	// }
	function updateUrlSize(newSize) {
		searchParams.set("productSize", newSize); // update searchParams object at first.
		setSearchParams(searchParams, { replace: true }); // then update the url with the new searchParams Object by rerendering the page.
	}
	const chart = useSize();
	return (
		<SizeArea>
			<h2>Select your size</h2>
			<SizeSelectedDetails>
				<div>Colour selected</div>
				<div>
					<img src={images.srcs[0]} alt="color" />
					{productColor.split(":")[0]} &bull; {productColor.split(":")[1]}
				</div>
			</SizeSelectedDetails>
			<PriceDetails>
				<div>{salesPercent !== 0 ? formatCurrency(price - price * (salesPercent / 100)) : formatCurrency(price)}</div>
				<div>{salesPercent !== 0 && formatCurrency(price)}</div>
			</PriceDetails>
			<SizesTable>
				{chart.map((size) => (
					<button
						className={`${sizes.includes(+size.split(" - ")[0]) ? "exist" : "notExist"} ${+size.split(" - ")[0] === +productSize ? "active" : ""}`}
						onClick={() => updateUrlSize(+size.split(" - ")[0])}
						key={size}
					>
						{size}
					</button>
				))}
			</SizesTable>
			<hr />
			<Btn
				onClick={() => {
					addToBag();
					onCloseDrawer();
				}}
				disabled={soldOut}
				className={soldOut ? "soldOut" : ""}
			>
				{soldOut ? "Sold Out" : "Add to bag"}
			</Btn>
		</SizeArea>
	);
}

export default SizeSelectedSide;
