import { useNavigate, useParams } from "react-router-dom";
import { stores } from "../../utils/constants";
import ContentHeading from "./ContentHeading";
import { BsChevronLeft } from "react-icons/bs";
import StoreItem from "./StoreItem";

function Store() {
	const navigate = useNavigate();
	const { country, city, storeName } = useParams();
	const store = stores.filter((store) => store.storeName === storeName)[0];
	return (
		<>
			<ContentHeading style={{ padding: "39px 72px", fontSize: "18px", whiteSpace: "nowrap" }}>
				<BsChevronLeft onClick={() => navigate(`/stores/countries/${country}/${city}`)} /> {store.storeName}
			</ContentHeading>
			<StoreItem store={store} forDetails={true} />
		</>
	);
}

export default Store;
