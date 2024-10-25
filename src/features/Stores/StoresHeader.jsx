import styled from "styled-components";
import { TbCurrentLocation } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation";
import SpinnerMini from "../../ui/SpinnerMini";
import { useEffect, useState } from "react";
import { getAddress } from "../../services/apiGeocoding";
const StyledStoresHeader = styled.div`
	background-color: #fff;
	position: sticky;
	top: 150px;
	@media (max-width: 1024px) {
		top: 100px;
	}
	@media (max-width: 768px) {
		top: 112px;
	}
	z-index: 50;
`;
const StoreSearch = styled.div`
	background-color: #fff;
	padding: 40px;
	display: flex;
	@media (max-width: 1024px) {
		gap: 8px;
		padding: 8px;
		background-color: #f4f4f4;
		border-bottom: 1px solid #e5e5e5;
	}
	align-items: center;
	& > button {
		background-color: #fff;
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000;
		border: 1px solid #e5e5e5;
		outline: none;
		&:focus {
			outline: none;
		}
		svg {
			width: 21px;
			height: 21px;
		}
	}
	& > input {
		background-color: #fff;
		padding: 12px;
		height: 48px;
		display: block;
		width: calc(100% - 56px);
		border: 1px solid #e5e5e5;
		outline: none;
		@media (min-width: 1024px) {
			border-left: transparent;
		}
		&:focus {
			outline: none;
		}
		&::placeholder {
			color: #767676;
			letter-spacing: 2px;
		}
	}
`;
const StoreNav = styled.nav`
	background-color: #fff;
	padding: 0 68px;
	line-height: 19px;
	font-size: 13px;
	color: #292929;
	font-family: "archivo";
	& > div {
		display: flex;
		a {
			position: relative;
			padding: 14px 24px;
			cursor: pointer;
		}
		a.active {
			pointer-events: none;
		}
		a.active::before {
			content: "";
			position: absolute;
			width: 50%;
			height: 1px;
			background-color: #000;
			left: 50%;
			top: 100%;
			transform: translateX(-50%);
		}
	}
	@media (max-width: 1024px) {
		& > div {
			display: none;
		}
	}
`;

function StoresHeader() {
	const { country, city, storeName } = useParams();
	const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
	const [address, setAddress] = useState("");

	useEffect(
		function () {
			if (geolocationPosition) {
				getAddress({ latitude: geolocationPosition.lat, longitude: geolocationPosition.lng }).then((data) => {
					setAddress(`${data.city}, ${data.principalSubdivision}, ${data.countryName}`);
				});
			}
		},
		[geolocationPosition]
	);

	return (
		<StyledStoresHeader>
			<StoreSearch>
				<button
					id="addressBtn"
					onClick={() => {
						getPosition();
						document.getElementById("positionBtn")?.click();
					}}
				>
					{isLoadingPosition ? <SpinnerMini /> : <TbCurrentLocation />}
				</button>
				<input type="text" placeholder="City or country..." defaultValue={address} />
			</StoreSearch>
			<StoreNav>
				<div>
					<Link to="/stores/countries" className={decodeURIComponent(window.location.pathname) === "/stores/countries" ? "active" : ""}>
						Africa
					</Link>
					{country && (
						<Link
							to={`/stores/countries/${country}`}
							className={decodeURIComponent(window.location.pathname) === `/stores/countries/${country}` ? "active" : ""}
						>
							{country}
						</Link>
					)}
					{city && (
						<Link
							to={`/stores/countries/${country}/${city}`}
							className={decodeURIComponent(window.location.pathname) === `/stores/countries/${country}/${city}` ? "active" : ""}
						>
							{city}
						</Link>
					)}
					{storeName && (
						<Link
							to={`/stores/countries/${country}/${city}/${storeName}`}
							className={decodeURIComponent(window.location.pathname) === `/stores/countries/${country}/${city}/${storeName}` ? "active" : ""}
						>
							{storeName}
						</Link>
					)}
				</div>
			</StoreNav>
		</StyledStoresHeader>
	);
}

export default StoresHeader;
