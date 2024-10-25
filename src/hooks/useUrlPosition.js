// This hook get the lat and lng from the url and return them.
import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
    const [searchParams] = useSearchParams();
    // setSearchParams({lat: 23, lng: 50});  // if you want to set them. but remember to use it inside a handler function
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return [lat, lng];
}
