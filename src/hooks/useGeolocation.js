import { useState } from "react";

// we just want it to receive a default position.
export function useGeolocation(defaultPosition = null) {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState(defaultPosition);
	const [error, setError] = useState(null);

	function getPosition() {
		if (!navigator.geolocation) return setError("Your browser does not support geolocation");

		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
				setIsLoading(false);
			}
		);
	}

	return { isLoading, position, error, getPosition };
}

// This file doesn't have to be a jsx file, cuz we are not exporting any jsx, it's just a javascript function
