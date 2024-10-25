import { useTranslation } from "react-i18next";
import Header from "../ui/Header";
import Starter from "../features/Home/Starter";
import Waredrobe from "../features/Home/Waredrobe";
import Carousel from "../features/Home/Carousel";
import TrendingNow from "../features/Home/TrendingNow";
import DiscoverMore from "../features/Home/DiscoverMore";
import Footer from "../ui/Footer";

function HomePage() {
	const { t } = useTranslation();
	return (
		<>
			<Header />
			<div>
				<Starter />
				<Waredrobe />
				<Carousel heading={t("topPicksForYou")} />
				<TrendingNow />
				<DiscoverMore />
			</div>
			<Footer />
		</>
	);
}

export default HomePage;
