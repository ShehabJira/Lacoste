import { Link } from "react-router-dom";
import styled from "styled-components";
import ContentHeading from "./ContentHeading";

const CountryItem = styled(Link)`
	display: block;
	padding: 40px 4px 40px 52px;
	cursor: pointer;
`;

function CountriesList() {
	return (
		<>
			<ContentHeading>Africa</ContentHeading>
			<CountryItem to="/stores/countries/Egypt">Egypt</CountryItem>
		</>
	);
}

export default CountriesList;
