import styled from "styled-components";
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";
import Button from "../../ui/Button";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const StyledNoResults = styled.div`
	background-image: url("/no-result-bg.webp");
	padding: 90px 15px 200px;
	position: relative;
	& > div:first-child {
		font-family: "archivo";
		@media (min-width: 992px) {
			padding-top: 60px;
			width: 75%;
		}
		margin: auto;
		color: #fff;
		text-align: center;
		p:first-child {
			font-size: 50px;
			@media (max-width: 768px) {
				font-size: 30px;
			}
			line-height: normal;
		}
		p:nth-child(2),
		p:nth-child(3) {
			font-size: 22px;
			@media (max-width: 768px) {
				font-size: 17px;
			}
			margin: 30px 0 40px;
		}
		span {
			font-size: 18px;
			font-style: italic;
			font-weight: 200;
			@media (max-width: 768px) {
				font-size: 14px;
			}
		}
	}
	& > div:last-child {
		position: absolute;
		width: 100%;
		bottom: 20px;
		left: 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		button {
			border-radius: 0;
			width: calc((100% - 60px) / 3);
			font-size: 11px;
			@media (min-width: 390px) {
				font-size: 13px;
			}
			@media (min-width: 768px) {
				width: calc((100% - 220px) / 3);
				font-size: 18px;
			}
			text-align: left;
			padding: 15px;
			font-weight: 600;
			height: fit-content;
			border: none;
			text-decoration-color: black;
			svg {
				margin-left: 10px;
				@media (max-width: 768px) {
					display: none;
				}
			}
			&:hover {
				border: none;
				background-color: #292929;
				color: #fff;
				text-decoration: underline;
				text-decoration-color: black;
			}
		}
	}
`;
function NoResults() {
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(window.location.search);
	const query = searchParams.get("query") ? searchParams.get("query") : "";
	return (
		<>
			<Header />
			<StyledNoResults>
				<div>
					{query ? (
						<p>
							Sorry, we couldn't find any results for <q>{query}</q>
						</p>
					) : (
						<p>Sorry, we couldn't find any results</p>
					)}
					<p>Please try a new search term or browse through one of our product categories</p>
					<p>To get 10% off your purchase, use GET10 at checkout</p>
					<span>*This offer can not be used on already discounted products</span>
				</div>
				<div>
					<Button onClick={() => navigate("/men")}>
						Shop Men <BsArrowRight />
					</Button>
					<Button onClick={() => navigate("/women")}>
						Shop Women <BsArrowRight />
					</Button>
					<Button onClick={() => navigate("/kids")}>
						Shop Kids <BsArrowRight />
					</Button>
				</div>
			</StyledNoResults>
			<Footer />
		</>
	);
}

export default NoResults;
