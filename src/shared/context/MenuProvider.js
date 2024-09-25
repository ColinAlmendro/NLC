import { createContext, useContext, useEffect, useReducer } from "react";
import reducerMenu from "./reducerMenu";
// import { AuthContext } from "./auth-context";

const initialState = {
	menus: [
		{
			date: "2020-01-01T00:00:00.000Z",
			// logo:
			// 	"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
			// image:
			// 	"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
			// contact: "Niki Anderson – 084 207 8305 Whatsapp",
			introduction:
				"Hi All,\n it seems as if Wintery weather has finally started, at least the garden will be happy. I prefer Spring and Autumn myself. I’m feeling a bit stuck at the moment and really need input from my clients. Both lamb and beef are becoming increasingly expensive, so I just include them very occasionally in the menu. But I need to know if people are prepared to pay a bit more for meals that include high grade cuts of freerange meat? And then we have the starches/rice that is included in the meal. I try to vary, and offer different options, but are there folk who’d prefer quinoa as a starch? Or couscous? The soups have also not taken off as I’d hoped, so I’ll add them as an extra along with the vegetables and you can choose what you’d like, when!",
				promotion:"",
			// instruction:
			// 	"Orders to be in by 22h00 on Sunday, 04 August 2024. I can be a bit lenient here if folk want to increase or change.",
			// prices: [
			// 	"Single portions (between 350g and 400g) – R95",
			// 	"Double portions (between 800g and 900g) – R180, Premium (*) R200",
			// 	"Family portions (1.2kg plus) – R270, Premium (*) R285",
			// 	"Veggies/salad, single prices vary from R25 to R40; double portion prices vary from R60 to R80",
			// 	"Soups (500ml) – R50",
			// ],
			monday: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "curry",
					maindescription: "monday 1 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidedescription: "monday side chow",
					_id: "66bf9b79ebba9d60d8d3d786",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "spagetti",
					maindescription: "monday 2 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidedescription: "monday side chow",
					_id: "66bf9b79ebba9d60d8d3d787",
				},
			],
			tuesday: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "stirfry",
					maindescription: "tuesday 1 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "noodles",
					sidedescription: "tuesday 1 side chow",
					_id: "66bf9b79ebba9d60d8d3d788",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "lasagne",
					maindescription: "tuesday 2 main chow",
					side: "",
					sidename: "",
					_id: "66bf9b79ebba9d60d8d3d789",
				},
			],
			wednesday: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "steak",
					maindescription: "wednesday 1 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "chips",
					sidedescription: "wednesday 1 side chow",
					_id: "66bf9b79ebba9d60d8d3d78a",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "spagetti",
					maindescription: "wednesday 2 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "noodles",
					sidedescription: "wednesday 2 side chow",
					_id: "66bf9b79ebba9d60d8d3d78b",
				},
			],
			thursday: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "thursday 1 pasta",
					maindescription: "thursday 1 main chow",
					side: "",
					sidename: "",
					sidedescription: "",
					_id: "66bf9b79ebba9d60d8d3d78c",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "moussaka",
					maindescription: "thursday 2 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "salad",
					sidedescription: "thursday 2 side chow",
					_id: "66bf9b79ebba9d60d8d3d78d",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "vegetarian",
					maindescription: "thursday 3 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "couscous",
					sidedescription: "thursday 3 side chow",
					_id: "66bf9b79ebba9d60d8d3d78e",
				},
			],
			friday: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "curry",
					maindescription: "friday 1 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "rice",
					sidedescription: "friday 1 side chow",
					_id: "66bf9b79ebba9d60d8d3d78f",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					main: "665ee0cfaf6b9d78b8a13d2e",
					mainname: "fish",
					maindescription: "friday 2 main chow",
					side: "665ee0cfaf6b9d78b8a13d2e",
					sidename: "mash",
					sidedescription: "friday 2 side chow",
					_id: "66bf9b79ebba9d60d8d3d790",
				},
			],
			vegies: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					veg: "665ee0cfaf6b9d78b8a13d2e",
					vegname: "carrots",
					vegdescription: "carrots",
					_id: "66bf9b79ebba9d60d8d3d791",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					veg: "665ee0cfaf6b9d78b8a13d2e",
					vegname: "broccoli",
					vegdescription: "brocolli",
					_id: "66bf9b79ebba9d60d8d3d792",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					veg: "665ee0cfaf6b9d78b8a13d2e",
					vegname: "peas",
					vegdescription: "peas",
					_id: "66bf9b79ebba9d60d8d3d793",
				},
			],
			salads: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					salad: "665ee0cfaf6b9d78b8a13d2e",
					saladname: "mixed salad",
					saladdescription: "carrots",
					_id: "66bf9b79ebba9d60d8d3d794",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					salad: "665ee0cfaf6b9d78b8a13d2e",
					saladname: "greek",
					_id: "66bf9b79ebba9d60d8d3d795",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					salad: "665ee0cfaf6b9d78b8a13d2e",
					saladname: "tabbouleh",
					saladdescription: "peas",
					_id: "66bf9b79ebba9d60d8d3d796",
				},
			],
			soups: [
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					soup: "665ee0cfaf6b9d78b8a13d2e",
					soupname: "chicken",
					soupdescription: "chicken",
					_id: "66bf9b79ebba9d60d8d3d797",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					soup: "665ee0cfaf6b9d78b8a13d2e",
					soupname: "tomato",
					soupdescription: "tomato",
					_id: "66bf9b79ebba9d60d8d3d798",
				},
				{
					image:
						"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s…",
					soup: "665ee0cfaf6b9d78b8a13d2e",
					soupname: "pea",
					soupdescription: "pea",
					_id: "66bf9b79ebba9d60d8d3d799",
				},
			],
			// note: "Bla bla bla",
			_id: "66bf9b79ebba9d60d8d3d785",
			__v: 0,
		},
	],
	selected_menu: {},
	filtered_menus: [],
	main_recipes: [],
	side_recipes: [],
	vegie_recipes: [],
	salad_recipes: [],
	soup_recipes: [],
	introduction: "",
	period: "",
	instruction: "",
	promotions: [],
	week: new Date(),
	prices: [],
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	vegies: [],
	salads: [],
	soups: [],
	isEditing:false,
};

const Context = createContext(initialState);

export const useMenuValue = () => {
	return useContext(Context);
};

const ContextProvider = ({ children }) => {
	const [menuState, dispatchMenu] = useReducer(reducerMenu, initialState);

	return (
		<Context.Provider value={{ menuState, dispatchMenu }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

