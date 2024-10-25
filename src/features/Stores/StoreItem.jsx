import { useEffect, useState } from "react";
import { BsFileEarmarkText, BsPersonWalking } from "react-icons/bs";
import { PiMapPinLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const StyledStoreItem = styled(NavLink)`
	position: relative;
	padding: 40px 18px 40px 50px;
	border-bottom: 1px solid #e5e5e5;
	display: block;
	color: #767676;
	font-size: 11px;
	&:hover {
		background-color: #fafafa;
	}
	svg {
		position: absolute;
		left: 30px;
		top: 43px;
		width: 15px;
		height: 15px;
		color: #191919;
	}
	b {
		color: #000;
		margin-right: 2px;
		font-weight: 700;
	}
	& > b:last-child {
		margin-top: 36px;
		display: block;
	}
	h4 {
		font-size: 15px;
		margin-bottom: 2px;
		color: #191919;
	}
	& > div {
		margin-bottom: 2px;
	}
	& > div:nth-child(6) {
		display: flex;
		gap: 3px;
		span {
			display: block;
		}
	}
`;
const StyledStoreItemForDetails = styled.div`
	padding: 32px 74px 40px;
	border-bottom: 1px solid #e5e5e5;
	display: block;
	color: #767676;
	font-size: 11px;

	b {
		margin-top: 24px;
		color: #000;
		display: flex;
		align-items: center;
		gap: 5px;
		&:first-of-type,
		&:nth-of-type(2) {
			text-transform: uppercase;
		}
		&:last-child {
			margin-top: 80px;
		}
		svg {
			width: 14px;
			height: 14px;
		}
	}
	span {
		display: block;
	}
`;
const days = {
	Sunday: 0,
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thursday: 4,
	Friday: 5,
	Saturday: 6,
};

function StoreItem({ store, forDetails }) {
	const {
		storesHours,
		storeName,
		address,
		phone,
		city,
		country,
		position: { lat, lng },
	} = store;
	const today = new Date().getDay();
	const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
	const [currentMinute, setCurrentMinute] = useState(() => new Date().getMinutes());
	// const currentHour = new Date().getHours();
	// const currentMinute = new Date().getMinutes();

	const workingDays = storesHours.map((workingHour) =>
		workingHour
			.split(" ")
			.filter((e) => e !== "-")
			.splice(0, 2)
			.map((e) => (e !== "-" ? days[e] : "-"))
	);
	const indexOfCurrentWorkingDayInWorkingHoursStatments = workingDays.map((workingDay) => +today >= +workingDay[0] && today <= workingDay[1]).indexOf(true);

	// Output ex: 10:00 AM
	const openHour = storesHours[indexOfCurrentWorkingDayInWorkingHoursStatments]
		.split(" ")
		.filter((e) => e !== "-")
		.splice(2, 4)
		.slice(0, 2)
		.join(" ");

	// Output ex: 11:59 PM
	const closeHour = storesHours[indexOfCurrentWorkingDayInWorkingHoursStatments]
		.split(" ")
		.filter((e) => e !== "-")
		.splice(2, 4)
		.slice(2, 4)
		.join(" ");

	const openHourIn24Format = convertTo24HourFormat(openHour); // Output ex: 10:00
	const closeHourIn24Format = convertTo24HourFormat(closeHour); // Output ex: 23:59

	const isOpen =
		currentHour >= openHourIn24Format.split(":")[0] &&
		currentHour <= closeHourIn24Format.split(":")[0] &&
		currentMinute >= openHourIn24Format.split(":")[1] &&
		currentMinute <= closeHourIn24Format.split(":")[1];

	function convertTo24HourFormat(timeString) {
		const [time, period] = timeString.split(" ");
		const [hour, minute] = time.split(":");
		let formattedHour = parseInt(hour);

		if (period === "PM") {
			formattedHour += 12;
		}

		return `${formattedHour}:${minute}`;
	}

	// Update currentHour and currentMinute each sec.
	useEffect(function () {
		const id = setInterval(() => {
			setCurrentHour(new Date().getHours());
			setCurrentMinute(new Date().getMinutes());
		}, 1000);

		return () => clearInterval(id);
	}, []);

	return !forDetails ? (
		<StyledStoreItem to={`/stores/countries/${country}/${city}/${storeName}?lat=${lat}&lng=${lng}`}>
			<PiMapPinLight />
			<h4>{storeName}</h4>
			<div>{address}</div>
			<div>{city}</div>
			<div>
				<b>Phone:</b>
				{phone}
			</div>
			<div>
				<b>Store hours:</b>
				<div>
					{storesHours.map((workingHour, i) => (
						<span key={i}>{workingHour}</span>
					))}
				</div>
			</div>
			<b>{isOpen ? `Open untill ${closeHour}` : `Opens at ${openHour}`}</b>
		</StyledStoreItem>
	) : (
		<StyledStoreItemForDetails>
			<div>{address}</div>
			<div>{city}</div>

			<b>Store Hours</b>
			{storesHours.map((workingHour, i) => (
				<span key={i}>{workingHour}</span>
			))}

			<b>phone</b>
			<div>{phone}</div>

			<b>
				<BsPersonWalking /> Directions
			</b>
			<b onClick={() => window.print()} style={{ cursor: "pointer" }}>
				<BsFileEarmarkText />
				Print
			</b>
			<b>{isOpen ? `Open untill ${closeHour}` : `Opens at ${openHour}`}</b>
		</StyledStoreItemForDetails>
	);
}

export default StoreItem;
