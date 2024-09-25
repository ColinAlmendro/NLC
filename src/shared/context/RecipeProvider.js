import { createContext, useContext, useEffect, useReducer } from "react";
import reducerRecipe from "./reducerRecipe";

const initialState = {
	recipes: [
		{
			category: "main",
			name: "Saag Aloo",
			description: "Potato and Spinach curry",
			ingredients: [
				{
					ingredient: "667abfdc493f9432cc68fd59",
					unit: "kg",
					qty: 1,
				},
				{
					ingredient: "667ac028493f9432cc68fd5b",
					unit: "kg",
					qty: 1,
				},
			],
			instructions: `1. You will need 150 grams (5 ounces) cleaned baby spinach (4 cups). Or use a mix of spinach with microgreens/ shoots or baby kale/ fenugreek/mustard greens. Rinse them in plenty of water and drain them to a colander. Shake off well to drain down the water completely. Keep this aside. If using baby kale, destem and chop them. Use only the leaves of mustard greens and avoid including the s2. Prep up the following ingredients.
Fine chop 1 small onion to make about half cup
1 medium ripe tomato, deseeded & fine chopped or pureed to make half cup
Chop or slit 1 to 2 green chilies
Peel and mince ginger to make 1 teaspoon
Peel and mince 2 medium garlic cloves to make 1 teaspoon
Half teaspoon Kashmiri red chili powder
Eigth teaspoon turmeric
Half teaspoon Garam masala 
Halfteaspoon coriander powder
Quarter teaspoon cumin powder
Third to half teaspoon salt
Half teaspoon cumin seeds (optional)
Half tablespoon kasuri methi (dried fenugreek leaves, optional)
3. Peel and dice 250 grams potatoes Add them to a bowl of water to prevent discoloring.
4. Heat 2 tablespoons oil in a pan and add cumin seeds.
5. When they begin to sizzle, add the onions and saute for 5 minutes on a medium heat.
6. Add the potatoes, ginger, garlic and green chilies. Saute for a minute or 2 until the ginger garlic smells good.
7. Stir in the spices , turmeric, chili powder, garam masala, cumin powder, coriander powder and salt.
8. Pour half cup water and mix well.
9. Cover and cook on a medium heat until the potatoes are cooked al dente. If required add more water as you cook & you don’t need to stir often. This step takes about 8 to 10 mins. While the potatoes cook, puree the tomatoes and roughly chop your greens.
10. It is very essential not to overcook the potatoes. They should slightly al dente. Cut them with a fork or a butter knife and check.
11. Add the tomatoes all over and mix.
12. Cook on a medium high heat until the raw flavor of tomatoes is gone. Avoid over stirring at this stage as the potatoes can break down and turn mushy. Taste test and adjust your salt or spices. If you want, you may fish out the green chilies at this stage.
13. Make sure your greens are drained well. Begin to add in batches. If you are using greens that take longer than spinach, add them first. I used fenugreek so added it here. Mix and let them wilt. If you are using mustard greens or baby kale, add them here.
14. Add the chopped spinach and give a gentle mix, to wilt.
15. Lastly, add kasuri methi and the microgreens. Turn off. You don’t need to cook. The heat in the pan will wilt them.16. Add a tsp of ghee if you want. Let cool down a bit and squeeze the lemon juice.

Garnish Saag Aloo with chopped coriander leaves or microgreens. Serve with hot steamed Basmati rice,
Quinoa or with whole grain roti, Chapati, Plain Paratha or your favorite flatbreads.`,
			feeds: 6,
			url: "https://www.indianhealthyrecipes.com/saag-aloo/",
			image:
				"https://res.cloudinary.com/dhezas2ju/image/upload/v1722072960/jjnzje6s8admhf0mu0nw.jpg",
			cost: 45,
			price: 95,
		},
	],
	selected_recipe: {},
	filtered_recipes: [],
	main_recipes: [],
	side_recipes: [],
	vegie_recipes: [],
	salad_recipes: [],
	soup_recipes: [],
	// introduction: "",
	// period: "",
	// instruction: "",
	// promotions: [],
	// week: new Date(),
	// prices: [],
	// monday: [],
	// tuesday: [],
	// wednesday: [],
	// thursday: [],
	// friday: [],
	// vegies: [],
	// salads: [],
	// soups: [],
	// isEditing: false,
};

const Context = createContext(initialState);

export const useRecipeValue = () => {
	return useContext(Context);
};

const ContextProvider = ({ children }) => {
	const [recipeState, dispatch] = useReducer(reducerRecipe, initialState);

	return (
		<Context.Provider value={{ recipeState, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
