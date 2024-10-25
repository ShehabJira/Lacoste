import { useNavigate, useParams } from "react-router-dom";
import ContentHeading from "./ContentHeading";
import { stores } from "../../utils/constants";
import { BsChevronLeft } from "react-icons/bs";
import StoreItem from "./StoreItem";

function StoresList() {
	const navigate = useNavigate();
	const { country, city } = useParams();
	const storesInThisCity = stores.filter((store) => store.city === city);
	return (
		<>
			<ContentHeading>
				<BsChevronLeft onClick={() => navigate(`/stores/countries/${country}`)} /> {storesInThisCity.length} Store{storesInThisCity.length > 1 ? "s" : ""}
			</ContentHeading>
			<div>
				{storesInThisCity.map((store, i) => (
					<StoreItem store={store} key={`${i}-nonesense`} />
				))}
			</div>
		</>
	);
}

export default StoresList;
