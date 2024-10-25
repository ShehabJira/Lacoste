import Carousel from "../features/Home/Carousel";
import DescriptionAndCare from "../features/Products/DescriptionAndCare";
import DetailsSection from "../features/Products/DetailsSection";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
function ProductDetailsPage() {
	return (
		<>
			<Header />
			<div>
				<DetailsSection />
				<DescriptionAndCare />
				<Carousel heading="You May Also Like" />
			</div>
			<Footer />
		</>
	);
}

export default ProductDetailsPage;
