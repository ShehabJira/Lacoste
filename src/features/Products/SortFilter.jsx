import styled from "styled-components";
import SortRadios from "../../ui/SortRadios";
import FilterCheckboxes from "../../ui/FilterCheckboxes";
import FilterSize from "../../ui/FilterSize";
import FilterColor from "../../ui/FilterColor";
import SaveChanges from "../../ui/SaveChanges";
import { useSearchParams } from "react-router-dom";

const Type = styled.div`
	color: #898989;
	font-size: 10px;
	margin-bottom: 5px;
	letter-spacing: 1px;
	text-transform: uppercase;
	font-weight: 700;
	font-family: "archivo";
`;

function SortFilter({ onCloseDrawer }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { sRule, pref1V, pref2V, pref3V, pref4V } = Object.fromEntries(searchParams.entries());

	function handleSortRule(e) {
		searchParams.set("sRule", e.target.value);
		setSearchParams(searchParams);
	}
	function handleFilterPreferences(name, values, i) {
		searchParams.set(`pref${i}`, name);
		searchParams.set(`pref${i}V`, values);
		setSearchParams(searchParams);
	}

	return (
		<div>
			<h2>Sort & Filter</h2>
			<hr style={{ marginBottom: "15px" }} />

			<Type>Sort by</Type>
			<SortRadios handleSortRule={handleSortRule} sRule={sRule} />

			<Type>Filter by</Type>
			<FilterCheckboxes handleFilterPreferences={handleFilterPreferences} pref1V={pref1V} pref2V={pref2V} />

			<FilterColor handleFilterPreferences={handleFilterPreferences} pref3V={pref3V} />

			<FilterSize handleFilterPreferences={handleFilterPreferences} pref4V={pref4V} />

			<SaveChanges forSorting={true} onCloseDrawer={onCloseDrawer} />
		</div>
	);
}

export default SortFilter;
