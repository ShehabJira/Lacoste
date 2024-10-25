import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					// console.log("Clicked Outside");
					handler();
				}
			}
			document.addEventListener("click", handleClick, listenCapturing);

			return () =>
				document.removeEventListener("click", handleClick, listenCapturing); // to avoid listening for the bubbling phase, and only listen for the capturing phase.
		},
		[handler, listenCapturing]
	);
	return ref;
}
