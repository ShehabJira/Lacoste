import styled from "styled-components";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "../features/Products/useProducts";
import { useEffect } from "react";

const StyledSaveChanges = styled.div`
	position: sticky;
	left: 0;
	bottom: 0;
	transform: translate(calc(100vw / -25), calc(100vw / 25));
	width: calc(100% + (100vw / 25) * 2);
	z-index: 5000;
	padding: 32px 0;
	background-color: #f4f4f4;
	div {
		display: flex;
		justify-content: ${(props) => (props.$forSorting ? "space-between" : "flex-end")};
		margin-right: 50px;
		button:first-child {
			border: none;
			background-color: transparent;
			text-decoration: underline;
			padding: 9px 0 12px 30px;
			font-size: 15px;
			letter-spacing: 1px;
			font-weight: 100;
			height: 39px;
			width: 163px;
			&:focus {
				outline: none;
			}
		}
		button:last-child {
			padding: 9px 30px 12px;
			height: 39px;
			letter-spacing: 1px;
		}
	}
`;

function SaveChanges({ onCloseDrawer, isLoading, forSorting }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { count } = useProducts();
	const queryClient = useQueryClient();
	const { sRule, pref1, pref1V, pref2, pref2V, pref3, pref3V, pref4, pref4V } = Object.fromEntries(searchParams.entries());

	function handleDelete() {
		setSearchParams({});
		setTimeout(() => {
			onCloseDrawer();
		}, 100);
	}

	useEffect(
		function () {
			queryClient.invalidateQueries({ active: true });
		},
		[sRule, pref1, pref1V, pref2, pref2V, pref3, pref3V, pref4, pref4V, queryClient]
	);

	return (
		<StyledSaveChanges $forSorting={forSorting}>
			<div>
				<button onClick={() => (forSorting ? handleDelete() : onCloseDrawer())} type="reset">
					{forSorting ? "clear all" : "Cancel"}
				</button>

				<Button type="submit" disabled={isLoading} onClick={() => (forSorting ? onCloseDrawer() : "")}>
					{isLoading ? (
						<>
							Saving <SpinnerMini style={{ marginRight: "0" }} />
						</>
					) : forSorting ? (
						`See ${count} Products`
					) : (
						"Save Changes"
					)}
				</Button>
			</div>
		</StyledSaveChanges>
	);
}

export default SaveChanges;
