import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import { lazy, Suspense } from "react";
import GlobalStyles from "./styles/GlobalStyles";

import Bag from "./features/Checkout/Bag";
import ContactAndInformation from "./features/Checkout/ContactAndInformation";
import Payment from "./features/Checkout/Payment";
import Dashboard from "./features/Account/Dashboard";
import ProfileAndPreferences from "./features/Account/ProfileAndPreferences";
import MyOrders from "./features/Account/MyOrders";
import HelpAndContact from "./features/Account/HelpAndContact";
import FullPageLoading from "./ui/FullPageLoading";
import PageNotFound from "./pages/PageNotFound";
import CountriesList from "./features/Stores/CountriesList";
import CitiesList from "./features/Stores/CitiesList";
import StoresList from "./features/Stores/StoresList";
import Store from "./features/Stores/Store";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const FindGuestCheckoutOrder = lazy(() => import("./pages/FindGuestCheckoutOrder"));
const GuestOrderPage = lazy(() => import("./pages/GuestOrderPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	});

	return (
		<UserInfoProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<Toaster
					position="top center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: { duration: 3000 },
						error: { duration: 5000 },
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							backgroundColor: "#fff",
							color: "var(--color-grey-700)",
						},
					}}
				/>

				<BrowserRouter>
					<Suspense fallback={<FullPageLoading />}>
						<Routes>
							<Route index element={<HomePage />} />
							<Route path="/lacoste" element={<ProductsPage />} />
							<Route path="/demandware" element={<ProductsPage />} />
							{/* path="lacoste" is not defined as param, so when ProductsPage gets rendered in this route it will not have any params(all will be undefined) so the query will bring all products(no filtering happens) */}
							<Route path="/:mainCategory" element={<ProductsPage />} />
							{/* Men, Women, Kids, Last Chance, New In */}
							<Route path="/:mainCategory/:subCategory" element={<ProductsPage />} />
							{/*Clothing, Accessories...*/}
							<Route path="/:mainCategory/:subCategory/:lateralCategory" element={<ProductsPage />} />
							{/*Poloshirts, Jackets...*/}
							<Route path="/:mainCategory/:subCategory/:lateralCategory/:productId" element={<ProductDetailsPage />} />

							<Route path="/checkout" element={<CheckoutPage />}>
								<Route index element={<Navigate to="bag" replace />} />
								<Route path="bag" element={<Bag />} />
								<Route path="contact" element={<ContactAndInformation />} />
								<Route path="payment" element={<Payment />} />
							</Route>

							<Route path="/login/:action" element={<LoginPage />} />

							<Route path="/account" element={<AccountPage />}>
								<Route index element={<Navigate to="dashboard" replace />} />
								<Route path="dashboard" element={<Dashboard />} />
								<Route path="profile-and-preferences" element={<ProfileAndPreferences />} />
								<Route path="my-orders" element={<MyOrders />} />
								<Route path="help-and-contact" element={<HelpAndContact />} />
							</Route>

							<Route path="/order-tracking" element={<FindGuestCheckoutOrder />} />
							<Route path="/guest-order" element={<GuestOrderPage />} />
							<Route path="/FAQ" element={<FAQPage />} />

							<Route path="/stores" element={<LocationPage />}>
								<Route index element={<Navigate to="countries" />} />
								<Route path="countries" element={<CountriesList />} />
								<Route path="countries/:country" element={<CitiesList />} />
								<Route path="countries/:country/:city" element={<StoresList />} />
								<Route path="countries/:country/:city/:storeName" element={<Store />} />
							</Route>

							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</QueryClientProvider>
		</UserInfoProvider>
	);
}

export default App;
