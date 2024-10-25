import styled from "styled-components";
import Banner from "./Banner";
import InnerHeader from "./InnerHeader";
import NavMenu from "./NavMenu";
import MobileNavMenu from "./MobileNavMenu";
const StyledHeader = styled.header`
	position: sticky;
	top: 0;
	z-index: 80;
	background-color: #fff;
`;

function Header() {
	return (
		<StyledHeader>
			<Banner />
			<InnerHeader />
			<NavMenu />
			<MobileNavMenu />
		</StyledHeader>
	);
}

export default Header;
