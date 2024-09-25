// import { AuthContext } from "../../shared/context/auth-context";

// export const recipeingredients = async () => {
// 	const auth = useContext(AuthContext);

// 	try {
// 		const response = await fetch(
// 			process.env.REACT_APP_BACKEND_URL + "/ingredients/list",
// 			{
// 				method: "GET",
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: "Bearer " + auth.token,
// 				},
// 				// body: JSON.stringify(ingredient),
// 			}
// 		);
// 		const data = await response.json();
// 		console.log("Ingredient list :", data.ingredients);
// 		return data.ingredients;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const ingredients = [
//         {
//             "_id": "667419fd2e14694d8f640a27",
//             "category": [
//                 "Vegetable"
//             ],
//             "name": "Carrots",
//             "description": "Large carrots",
//             "unit": "kilogram",
//             "volume": 1,
//             "price": 30.45,
//             "__v": 0,
//             "id": "667419fd2e14694d8f640a27"
//         },
//         {
//             "_id": "66757cbe68ee8db4fdf82bef",
//             "category": [
//                 "Oil"
//             ],
//             "name": "Olive Oil",
//             "description": "virgin",
//             "unit": "l",
//             "volume": 1,
//             "price": 270.5,
//             "__v": 0,
//             "id": "66757cbe68ee8db4fdf82bef"
//         },
//         {
//             "_id": "667583d168ee8db4fdf82bf3",
//             "category": [
//                 "Canned"
//             ],
//             "name": "Beans",
//             "description": "Kidney",
//             "unit": "g",
//             "volume": 350,
//             "price": 22.8,
//             "__v": 0,
//             "id": "667583d168ee8db4fdf82bf3"
//         },
//         {
//             "_id": "66758b7768ee8db4fdf82bfb",
//             "category": [
//                 "Vegetable"
//             ],
//             "name": "Cabbage",
//             "description": "Green",
//             "unit": "kg",
//             "volume": 1,
//             "price": 30.98,
//             "__v": 0,
//             "id": "66758b7768ee8db4fdf82bfb"
//         },
//         {
//             "_id": "66758ca768ee8db4fdf82c01",
//             "category": [
//                 "Herbs & Spice"
//             ],
//             "name": "Paprika",
//             "description": "Smoked",
//             "unit": "g",
//             "volume": 250,
//             "price": 40,
//             "__v": 1,
//             "id": "66758ca768ee8db4fdf82c01"
//         },
//         {
//             "_id": "667590d768ee8db4fdf82c05",
//             "category": [
//                 "Meat"
//             ],
//             "name": "Chicken",
//             "description": "Thighs",
//             "unit": "kg",
//             "volume": 1,
//             "price": 99,
//             "__v": 0,
//             "id": "667590d768ee8db4fdf82c05"
//         },
//         {
//             "_id": "667871841d93dc011d488906",
//             "category": [
//                 "Fish"
//             ],
//             "name": "Hake",
//             "description": "Hake fillet",
//             "unit": "kilogram",
//             "volume": 1,
//             "price": 120.75,
//             "__v": 0,
//             "id": "667871841d93dc011d488906"
//         }
//     ]

// export const fakeData = [
// 					{
// 						id: "667abfdc493f9432cc68fd59",
// 						name: "Potatoes",
// 						unit: "Kg",
// 						qty: 1.5,
// 					},
// 				];

const recipeingredients = [
	{
		_id: "667419fd2e14694d8f640a27",
		category: "Vegetable",
		name: "Carrots",
		description: "Large carrots",
		unit: "kilogram",
		volume: 1,
		price: 30.45,
		__v: 0,
		id: "667419fd2e14694d8f640a27",
	},
	{
		_id: "66757cbe68ee8db4fdf82bef",
		category: "Oil",
		name: "Olive Oil",
		description: "virgin",
		unit: "l",
		volume: 1,
		price: 270.5,
		__v: 0,
		id: "66757cbe68ee8db4fdf82bef",
	},
	{
		_id: "667583d168ee8db4fdf82bf3",
		category: "Canned",
		name: "Beans",
		description: "Kidney",
		unit: "g",
		volume: 350,
		price: 22.8,
		__v: 0,
		id: "667583d168ee8db4fdf82bf3",
	},
	{
		_id: "66758b7768ee8db4fdf82bfb",
		category: "Vegetable",
		name: "Cabbage",
		description: "Green",
		unit: "kg",
		volume: 1,
		price: 30.98,
		__v: 0,
		id: "66758b7768ee8db4fdf82bfb",
	},
	{
		_id: "66758ca768ee8db4fdf82c01",
		category: "Herbs & Spice",
		name: "Paprika",
		description: "Smoked",
		unit: "g",
		volume: 250,
		price: 40,
		__v: 1,
		id: "66758ca768ee8db4fdf82c01",
	},
	{
		_id: "667590d768ee8db4fdf82c05",
		category: "Meat",
		name: "Chicken",
		description: "Thighs",
		unit: "kg",
		volume: 1,
		price: 99,
		__v: 0,
		id: "667590d768ee8db4fdf82c05",
	},
	{
		_id: "667871841d93dc011d488906",
		category: "Fish",
		name: "Hake",
		description: "Hake fillet",
		unit: "kilogram",
		volume: 1,
		price: 120.75,
		__v: 0,
		id: "667871841d93dc011d488906",
	},
];
export default recipeingredients;
