import { useMemo, useState, useContext } from "react";
import {
	MRT_EditActionButtons,
	DialogProps,
	MaterialReactTable,
	// createRow,
	useMaterialReactTable,
} from "material-react-table";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import {
	QueryClient,
	QueryClientProvider,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import FormRecipe from "./FormRecipe";

import { AuthContext } from "../../../shared/context/auth-context";
//import { StringSchema } from "yup";

const Example = () => {
	const [validationErrors, setValidationErrors] = useState({});

	const columns = useMemo(
		() => [
			{
				accessorKey: "id",
				header: "Id",
				enableEditing: false,
				size: 0,
			},
			{
				accessorKey: "category",
				header: "Category",
				// editVariant: "select",
				// editSelectOptions: categories,
				// muiEditTextFieldProps: {
				// 	select: true,
				// 	error: !!validationErrors?.category,
				// 	helperText: validationErrors?.category,
				// },
			},
			{
				accessorKey: "image",
				header: "Image",
				// render: ({ cell, row }) => (
				// 	<img style={{ height: 36, borderRadius: "50%" }} src={row.image} /> 
				// ),
				// editVariant: "select",
				// editSelectOptions: categories,
				// muiEditTextFieldProps: {
				// 	select: true,
				// 	error: !!validationErrors?.category,
				// 	helperText: validationErrors?.category,
				// },
			},

			{
				accessorKey: "name",
				header: "Name",
				// muiEditTextFieldProps: {
				// 	required: true,
				// 	error: !!validationErrors?.name,
				// 	helperText: validationErrors?.name,
				// 	//remove any previous validation errors when user focuses on the input
				// 	onFocus: () =>
				// 		setValidationErrors({
				// 			...validationErrors,
				// 			name: undefined,
				// 		}),
				////optionally add validation checking for onBlur or onChange
				// },
			},
			{
				accessorKey: "description",
				header: "Description",
				// muiEditTextFieldProps: {
				// 	required: true,
				// 	error: !!validationErrors?.description,
				// 	helperText: validationErrors?.description,
				// 	//remove any previous validation errors when user focuses on the input
				// 	onFocus: () =>
				// 		setValidationErrors({
				// 			...validationErrors,
				// 			description: undefined,
				// 		}),
				// },
			},
			{
				accessorKey: "feeds",
				header: "Serves",
				// muiEditTextFieldProps: {
				// 	// type: "unit",
				// 	required: true,
				// 	error: !!validationErrors?.unit,
				// 	helperText: validationErrors?.unit,
				// 	//remove any previous validation errors when user focuses on the input
				// 	onFocus: () =>
				// 		setValidationErrors({
				// 			...validationErrors,
				// 			unit: undefined,
				// 		}),
				// },
			},
			{
				accessorKey: "cost",
				header: "Cost",
				// muiEditTextFieldProps: {
				// 	// type: "volume",
				// 	required: true,
				// 	error: !!validationErrors?.volume,
				// 	helperText: validationErrors?.volume,
				// 	//remove any previous validation errors when user focuses on the input
				// 	onFocus: () =>
				// 		setValidationErrors({
				// 			...validationErrors,
				// 			volume: undefined,
				// 		}),
				// },
			},
			{
				accessorKey: "price",
				header: "Price",
				// muiEditTextFieldProps: {
				// 	required: true,
				// 	error: !!validationErrors?.price,
				// 	helperText: validationErrors?.price,
				// 	//remove any previous validation errors when user focuses on the input
				// 	onFocus: () =>
				// 		setValidationErrors({
				// 			...validationErrors,
				// 			price: undefined,
				// 		}),
				// },
			},
		],
		[validationErrors]
	);

	//call CREATE hook
	const {
		mutateAsync: createRecipe,
		isPending: isCreatingRecipe,
	} = useCreateRecipe();
	//call READ hook
	const {
		data: fetchedRecipes = [],
		isError: isLoadingRecipesError,
		isFetching: isFetchingRecipes,
		isLoading: isLoadingRecipes,
	} = useGetRecipes();
	//call UPDATE hook
	const {
		mutateAsync: updateRecipe,
		isPending: isUpdatingRecipe,
	} = useUpdateRecipe();
	//call DELETE hook
	const {
		mutateAsync: deleteRecipe,
		isPending: isDeletingRecipe,
	} = useDeleteRecipe();

	//CREATE action
	const handleCreateRecipe = async ({ values, table }) => {
		// const newValidationErrors = validateRecipe(values);
		// if (Object.values(newValidationErrors).some((error) => error)) {
		// 	setValidationErrors(newValidationErrors);
		// 	return;
		// }
		// setValidationErrors({});
		await createRecipe(values);
		table.setCreatingRow(null); //exit creating mode
	};

	//UPDATE action
	const handleSaveRecipe = async ({ values, table }) => {
		// const newValidationErrors = validateRecipe(values);
		// if (Object.values(newValidationErrors).some((error) => error)) {
		// 	setValidationErrors(newValidationErrors);
		// 	return;
		// }
		// setValidationErrors({});
		await updateRecipe(values);
		table.setEditingRow(null); //exit editing mode
	};

	//DELETE action
	const openDeleteConfirmModal = (row) => {
		if (window.confirm("Are you sure you want to delete this recipe?")) {
			const res = deleteRecipe(row.original.id);
			console.log(res);
		}
	};

	const table = useMaterialReactTable({
		columns,
		data: fetchedRecipes,
		initialState: {
			columnVisibility: { id: false },
		},
		createDisplayMode: "modal", //default ('row', and 'custom' are also available)
		editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
		enableEditing: true,
		getRowId: (row) => row.id,
		muiToolbarAlertBannerProps: isLoadingRecipesError
			? {
					color: "error",
					children: "Error loading data",
			  }
			: undefined,
		muiTableContainerProps: {
			sx: {
				minHeight: "500px",
			},
		},
		// muiEditRowDialogProps:{
		// 	sx: {
		// 		maxWidth: "xl",
		// 	},
		// },
		//onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreateRecipe,
		//onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSaveRecipe,
		////optionally customize modal content
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				{/* <DialogTitle variant='h4'>
					Create New Recipe
				</DialogTitle>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						
					}}
				> */}
				<FormRecipe />

				{/* </DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant='text' table={table} row={row} />
				</DialogActions> */}
			</>
		),
		//optionally customize modal content
		renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<Dialog>
					<DialogTitle variant='h3'>Edit Recipe</DialogTitle>
					<DialogContent
						sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
					>
						{internalEditComponents}{" "}
						{/* or render custom edit components here */}
					</DialogContent>
					<DialogActions>
						<MRT_EditActionButtons variant='text' table={table} row={row} />
					</DialogActions>
				</Dialog>
			</>
		),
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title='Edit'>
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title='Delete'>
					<IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Box>
		),
		renderTopToolbarCustomActions: ({ table }) => (
			<Button
				variant='contained'
				onClick={() => {
					table.setCreatingRow(true); 
				}}
			>
				Add Recipe
			</Button>
		),
		state: {
			isLoading: isLoadingRecipes,
			isSaving: isCreatingRecipe || isUpdatingRecipe || isDeletingRecipe,
			showAlertBanner: isLoadingRecipesError,
			showProgressBars: isFetchingRecipes,
		},
	});

	return <MaterialReactTable table={table} />;
};

//CREATE hook (post new recipe to api)
function useCreateRecipe() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (recipe) => {
			////send api update request here

			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();

			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/recipes/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify(recipe),
					}
				);
				const data = await response.json();
				console.log(data);
				return data;
			} catch (error) {
				// enter your logic for when there is an error (ex. error toast)

				console.log(error);
			}
		},
		////client side optimistic update
		onMutate: (newRecipeInfo) => {
			queryClient.setQueryData(["recipes"], (prevRecipes) => [
				...prevRecipes,
				{
					...newRecipeInfo,
					id: (Math.random() + 1).toString(36).substring(7),
				},
			]);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }), //refetch recipes after mutation, disabled for demo
	});
}

//READ hook (get recipes from api)
function useGetRecipes() {
	const auth = useContext(AuthContext);
	return useQuery({
		queryKey: ["recipes"],
		queryFn: async () => {
			////send api request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve(fakeData);
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/recipes/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				console.log("Recipe list :", data.recipes);
				return data.recipes;
			} catch (err) {
				console.log(err);
			}
		},
		refetchOnWindowFocus: false,
	});
}

//UPDATE hook (put recipe in api)
function useUpdateRecipe() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (recipe) => {
			////send api update request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();

			// console.log("recipePatch", recipe);
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/recipes/edit/${recipe.id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify(recipe),
					}
				);
				const data = await response.json();
				console.log("UD", data.recipes);
				return data.recipes;
			} catch (err) {
				console.log(err);
			}
		},
		//client side optimistic update
		onMutate: (newRecipeInfo) => {
			queryClient.setQueryData(["recipes"], (prevRecipes) =>
				prevRecipes?.map((prevRecipe) =>
					prevRecipe.id === newRecipeInfo.id ? newRecipeInfo : prevRecipe
				)
			);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }), //refetch recipes after mutation, disabled for demo
	});
}

//DELETE hook (delete recipe in api)
function useDeleteRecipe() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (recipeId) => {
			////send api update request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/recipes/delete/${recipeId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						// body: JSON.stringify(recipe),
					}
				);
				const data = await response.json();
				// window.alert(data.message);
				return data.message;
			} catch (err) {
				console.log(err);
			}
		},
		//client side optimistic update
		onMutate: (recipeId) => {
			queryClient.setQueryData(["recipes"], (prevRecipes) =>
				prevRecipes?.filter((recipe) => recipe.id !== recipeId)
			);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }), //refetch recipes after mutation, disabled for demo
	});
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
	//Put this with your other react-query providers near root of your app
	<QueryClientProvider client={queryClient}>
		<Example />
	</QueryClientProvider>
);

export default ExampleWithProviders;

// const validateRequired = (value) => !!value.length;
// const validateNumber = (num) => String(num).match(/^[0-9]+$/);
// const validateDecimal = (dec) => String(dec).match(/[1-9]\d*(?:\.\d{0,2})?/);

// function validateRecipe(recipe) {
// 	return {
// 		category: !validateRequired(recipe.category[0])
// 			? "Category is Required"
// 			: "",
// 		name: !validateRequired(recipe.name) ? "Name is Required" : "",
// 		description: !validateRequired(recipe.description)
// 			? "Description is Required"
// 			: "",
// 		unit: !validateRequired(recipe.unit) ? "Description is Required" : "",
// 		volume: !validateNumber(recipe.volume) ? "Volume is Required" : "",
// 		price: !validateDecimal(recipe.price) ? "Price is Required" : "",
// 	};
// }
