import styled from "styled-components";
import CheckboxRadioLabel from "./CheckboxRadioLabel";

const StyledSortRadios = styled.div`
	padding-top: 8px;
	margin-bottom: 32px;
`;

function SortRadios({ handleSortRule, sRule }) {
	return (
		<StyledSortRadios>
			<CheckboxRadioLabel htmlFor="newest">
				<span>Newest</span>
				<input type="radio" name="sortBy" id="newest" value="created_at-dec" onChange={(e) => handleSortRule(e)} checked={sRule === "created_at-dec"} />
			</CheckboxRadioLabel>
			<CheckboxRadioLabel htmlFor="lowToHigh">
				<span>Price Low To high</span>
				<input type="radio" name="sortBy" id="lowToHigh" value="price-asc" onChange={(e) => handleSortRule(e)} checked={sRule === "price-asc"} />
			</CheckboxRadioLabel>
			<CheckboxRadioLabel htmlFor="highToLow">
				<span>Price hight to low</span>
				<input type="radio" name="sortBy" id="highToLow" value="price-dec" onChange={(e) => handleSortRule(e)} checked={sRule === "price-dec"} />
			</CheckboxRadioLabel>
		</StyledSortRadios>
	);
}

export default SortRadios;
