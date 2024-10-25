import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import StoresHeader from "../features/Stores/StoresHeader";
import StoreContent from "../features/Stores/StoreContent";

const StyledLocationPage = styled.div``;

function LocationPage() {
	return (
		<>
			<Header />
			<StyledLocationPage>
				<StoresHeader />
				<StoreContent />
			</StyledLocationPage>
			<Footer />
		</>
	);
}

export default LocationPage;
