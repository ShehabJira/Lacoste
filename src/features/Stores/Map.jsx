import { TileLayer, Marker, Popup, MapContainer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { stores } from "../../utils/constants";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../../ui/Button";
import { Icon } from "leaflet";

const homeIcon = new Icon({
	iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrrezqcO2ovuXx11B-3Uzx1F9IyTrYvOF0oA&s",
	iconSize: [35, 35], // size of the icon
	iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const lacosteIcon = new Icon({
	iconUrl: "https://www.pngplay.com/wp-content/uploads/13/Lacoste-Logo-Download-Free-PNG.png",
	iconSize: [60, 40], // size of the icon
	iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const StyledMapContainer = styled.div`
	position: sticky !important;
	width: 100%;
	top: 370px;
	@media (max-width: 1024px) {
		top: 165px;
	}
	@media (max-width: 768px) {
		top: 175px;
	}
	//----
	& > button {
		font-weight: 700;
		position: absolute;
		z-index: 1000;
		font-size: 18px;
		bottom: 4rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: #00c46a;
		border: none;
		&:hover {
			background-color: #34c86a;
			border: none;
		}
		color: #2d3439;
		box-shadow: 0 0.4rem 1.2rem rgba(36, 42, 46, 0.16);
	}
	.mapContainer {
		flex: 1;
		height: 100%;
		background-color: #42484d;
		position: relative;
	}

	.map {
		height: 100%;
	}

	/* Here we want to style classes that are coming from leaflet. So we want CSS Modules to give us the ACTUAL classnames, not to add some random ID to them, because then they won't match the classnames defined inside the map. The solution is to define these classes as GLOBAL */
	.leaflet-popup .leaflet-popup-content-wrapper {
		background-color: #2d3439;
		color: #ececec;
		border-radius: 5px;
		padding-right: 0.6rem;
	}

	.leaflet-popup .leaflet-popup-content {
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.leaflet-popup .leaflet-popup-content span:first-child {
		font-size: 2.5rem;
		font-size: 18px;
		line-height: 1;
	}

	.leaflet-popup .leaflet-popup-tip {
		background-color: #ffb545;
	}

	.leaflet-popup-content-wrapper {
		border-left: 5px solid #00c46a;
	}
`;

function Map() {
	const [mapPosition, setMapPosition] = useState([30.048004, 31.199671]);

	const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

	const [mapLat, mapLng] = useUrlPosition(); // custom hook to get lat and lng from the url.

	// Synchronizing the mapPosition with mapLat and mapLng.
	useEffect(
		function () {
			if (mapLat && mapLng)
				// if they exist(have a value)
				setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	// Synchronizing the mapPosition with geolocation(to get my location)
	useEffect(
		function () {
			if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		},
		[geolocationPosition]
	);

	return (
		<StyledMapContainer>
			{!geolocationPosition && (
				<Button
					id="positionBtn"
					onClick={() => {
						getPosition();
						document.getElementById("addressBtn").click();
					}}
				>
					{isLoadingPosition ? "Loading..." : "Use my position"}
				</Button>
			)}

			<MapContainer
				className="mapContainer"
				center={mapPosition} //to change this center we need to change it by a component. as within this leaflet library everything works with components.(changing something or taking some positions on clicking)
				zoom={11}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{stores.map((store) => (
					//add a marker to each city you have vistied.
					<Marker position={[store.position.lat, store.position.lng]} key={store.id} icon={lacosteIcon}>
						<Popup>
							<span>{store.storeName}</span>
						</Popup>
					</Marker>
				))}
				{geolocationPosition && (
					<Marker position={[geolocationPosition.lat, geolocationPosition.lng]} icon={homeIcon}>
						<Popup>
							<span>Home </span>
						</Popup>
					</Marker>
				)}

				<ChangeCenter position={mapPosition} />
			</MapContainer>
		</StyledMapContainer>
	);
}
// this below component is our own component, it's not given to us by leaflet.
function ChangeCenter({ position }) {
	const map = useMap(); //useMap() hook is given to us by leaflet, and we need this hook to get the current instance of the map that is currently being displayed
	map.setView(position); // we will reset the current map center position with setView().
	return null; // It's a component. So, it must return some JSX. but this won't show something in the ui. so, we return null which is valid JSX :)
}
export default Map;
