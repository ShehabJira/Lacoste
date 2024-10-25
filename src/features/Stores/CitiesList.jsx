import { BsChevronLeft } from "react-icons/bs";
import ContentHeading from "./ContentHeading";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { stores } from "../../utils/constants";

const ContentBody = styled.div`
	padding: 40px 4px 40px 52px;
`;
const Item = styled(Link)`
	display: block;
	padding: 4px 0;
	&:hover {
		text-decoration: underline;
	}
`;

function CitiesList() {
	const navigate = useNavigate();
	const { country } = useParams();

	const cities = stores
		.filter((store) => store.country.toLowerCase() === country.toLowerCase())
		.reduce((arr, store) => {
			if (arr.every((ele) => !ele.includes(store.city))) return [...arr, store.city];
			else return arr;
		}, []);

	return (
		<>
			<ContentHeading>
				<BsChevronLeft onClick={() => navigate(`/stores/countries`)} /> Egypt
			</ContentHeading>
			<ContentBody>
				{cities.map((city, i) => (
					<Item key={i} to={`/stores/countries/${country}/${city}`}>
						{city}
					</Item>
				))}
			</ContentBody>
		</>
	);
}

export default CitiesList;
