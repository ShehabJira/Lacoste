import { createContext, useContext, useReducer } from "react";
const UserContext = createContext();

const initialState = {
	id: Date.now(),
	bag: [],
	city: "",
	area: "",
	userPromocode: "",
	hasValidPromocode: false,
	title: "",
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	flatNumberBuildingName: "",
	newsLetter: false,
	isPaid: false,
	totalMoney: 0,
};

function reducer(userState, action) {
	switch (action.type) {
		case "user/addToBag":
			return { ...userState, bag: [...userState.bag, action.payload] };
		case "user/updateBagItem":
			return {
				...userState,
				bag: userState.bag.map((obj) =>
					obj.productId === action.payload.productId && obj.productSize === action.payload.productSize
						? {
								...obj,
								productQuantity: +obj.productQuantity + 1,
								totalPrice: obj.unitPrice * (+obj.productQuantity + 1),
								totalRegularPrice: obj.regularPrice * (+obj.productQuantity + 1),
						  }
						: obj
				),
			};
		case "user/updateBagItemQuantity":
			return {
				...userState,
				bag: userState.bag.map((obj) =>
					obj.productId === action.payload.id && obj.productSize === action.payload.size
						? {
								...obj,
								productQuantity: action.payload.quantity,
								totalPrice: obj.unitPrice * action.payload.quantity,
								totalRegularPrice: obj.regularPrice * action.payload.quantity,
						  }
						: obj
				),
			};
		case "user/deleteBagItem":
			return { ...userState, bag: userState.bag.filter((obj) => obj.productId !== action.payload.id || obj.productSize !== action.payload.size) };
		case "user/city":
			return { ...userState, city: action.payload };
		case "user/area":
			return { ...userState, area: action.payload };
		case "user/userPromocode":
			return { ...userState, userPromocode: action.payload };
		case "user/hasValidPromocode":
			return { ...userState, hasValidPromocode: action.payload };
		case "user/title":
			return { ...userState, title: action.payload };
		case "user/isPaid":
			return { ...userState, isPaid: action.payload };
		case "user/totalMoney":
			return { ...userState, totalMoney: action.payload };
		case "user/update":
			return { ...userState, ...action.payload };
		case "user/updateInfo":
			return { ...userState, ...action.payload };
		case "user/resetBag":
			return { ...userState, id: Date.now(), bag: [], userPromocode: "", hasValidPromocode: false, isPaid: false, totalMoney: 0 };
		case "user/resetEverything":
			sessionStorage.clear();
			return {
				...userState,
				...initialState,
			};
		default:
			throw new Error("unknown");
	}
}

function UserInfoProvider({ children }) {
	const [userState, dispatch] = useReducer(reducer, initialState);
	const totalItemsPrice = userState?.bag?.reduce((acc, curObj) => acc + curObj.totalPrice, 0);
	const nItems = userState?.bag?.reduce((acc, curObj) => acc + +curObj.productQuantity, 0);
	const taxFees = ((12.28063781321185 * totalItemsPrice) / 100).toFixed(2);
	const promocodeDiscount = ((totalItemsPrice * 10) / 100).toFixed(2);
	const totalMoney = userState.hasValidPromocode ? totalItemsPrice - promocodeDiscount : totalItemsPrice;

	// if the userState has changed, then set it to the sessionStorage
	JSON.stringify(userState) !== JSON.stringify(initialState) && sessionStorage.setItem("userState", JSON.stringify(userState));

	// if the there is something in sessionStorage, then update userState with it.
	sessionStorage.getItem("userState") &&
		JSON.stringify(userState) !== sessionStorage.getItem("userState") && // to prenvent infinte re-renders
		dispatch({ type: "user/update", payload: JSON.parse(sessionStorage.getItem("userState")) });
	return (
		<UserContext.Provider value={{ dispatch, userState, totalItemsPrice, nItems, taxFees, promocodeDiscount, totalMoney }}>{children}</UserContext.Provider>
	);
}

function useUserInfo() {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error("UserInfoContext was used outside its UserInfoProvider!");

	return context;
}

export { UserInfoProvider, useUserInfo };
