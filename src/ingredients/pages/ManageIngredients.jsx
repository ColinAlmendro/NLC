import { useMemo, useState, useContext } from "react";
import {
	MRT_EditActionButtons,
	MaterialReactTable,
	// createRow,
	useMaterialReactTable,
} from "material-react-table";
import {
	Box,
	Button,
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
import { categories } from "./IngredientCategories";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { AuthContext } from "../../shared/context/auth-context";
import { StringSchema } from "yup";

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
				editVariant: "select",
				editSelectOptions: categories,
				muiEditTextFieldProps: {
					select: true,
					error: !!validationErrors?.category,
					helperText: validationErrors?.category,
				},
			},
			{
				accessorKey: "name",
				header: "Name",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.name,
					helperText: validationErrors?.name,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							name: undefined,
						}),
					//optionally add validation checking for onBlur or onChange
				},
			},
			{
				accessorKey: "description",
				header: "Description",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.description,
					helperText: validationErrors?.description,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							description: undefined,
						}),
				},
			},
			{
				accessorKey: "unit",
				header: "Unit",
				muiEditTextFieldProps: {
					// type: "unit",
					required: true,
					error: !!validationErrors?.unit,
					helperText: validationErrors?.unit,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							unit: undefined,
						}),
				},
			},
			{
				accessorKey: "volume",
				header: "Volume",
				muiEditTextFieldProps: {
					// type: "volume",
					required: true,
					error: !!validationErrors?.volume,
					helperText: validationErrors?.volume,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							volume: undefined,
						}),
				},
			},
			{
				accessorKey: "price",
				header: "Price",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.price,
					helperText: validationErrors?.price,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							price: undefined,
						}),
				},
			},
		],
		[validationErrors]
	);

	//call CREATE hook
	const {
		mutateAsync: createIngredient,
		isPending: isCreatingIngredient,
	} = useCreateIngredient();
	//call READ hook
	const {
		data: fetchedIngredients = [],
		isError: isLoadingIngredientsError,
		isFetching: isFetchingIngredients,
		isLoading: isLoadingIngredients,
	} = useGetIngredients();
	//call UPDATE hook
	const {
		mutateAsync: updateIngredient,
		isPending: isUpdatingIngredient,
	} = useUpdateIngredient();
	//call DELETE hook
	const {
		mutateAsync: deleteIngredient,
		isPending: isDeletingIngredient,
	} = useDeleteIngredient();

	//CREATE action
	const handleCreateIngredient = async ({ values, table }) => {
		const newValidationErrors = validateIngredient(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await createIngredient(values);
		table.setCreatingRow(null); //exit creating mode
	};

	//UPDATE action
	const handleSaveIngredient = async ({ values, table }) => {
		const newValidationErrors = validateIngredient(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await updateIngredient(values);
		table.setEditingRow(null); //exit editing mode
	};

	//DELETE action
	const openDeleteConfirmModal = (row) => {
		if (window.confirm("Are you sure you want to delete this ingredient?")) {
			const res = deleteIngredient(row.original.id);
			console.log(res);
		}
	};

	const table = useMaterialReactTable({
		columns,
		data: fetchedIngredients,
		initialState: {
			columnVisibility: { id: false },
		},
		createDisplayMode: "modal", //default ('row', and 'custom' are also available)
		editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
		enableEditing: true,
		getRowId: (row) => row.id,
		muiToolbarAlertBannerProps: isLoadingIngredientsError
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
		onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreateIngredient,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSaveIngredient,
		//optionally customize modal content
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h3'>Create New Ingredient</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
				>
					{internalEditComponents} {/* or render custom edit components here */}
				</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant='text' table={table} row={row} />
				</DialogActions>
			</>
		),
		//optionally customize modal content
		renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h3'>Edit Ingredient</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					{internalEditComponents} {/* or render custom edit components here */}
				</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant='text' table={table} row={row} />
				</DialogActions>
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
					table.setCreatingRow(true); //simplest way to open the create row modal with no default values
					//or you can pass in a row object to set default values with the `createRow` helper function
					// table.setCreatingRow(
					//   createRow(table, {
					//     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
					//   }),
					// );
				}}
			>
				Add Ingredient
			</Button>
		),
		state: {
			isLoading: isLoadingIngredients,
			isSaving:
				isCreatingIngredient || isUpdatingIngredient || isDeletingIngredient,
			showAlertBanner: isLoadingIngredientsError,
			showProgressBars: isFetchingIngredients,
		},
	});

	return <MaterialReactTable table={table} />;
};

//CREATE hook (post new ingredient to api)
function useCreateIngredient() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (ingredient) => {
			////send api update request here

			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();

			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/ingredients/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify(ingredient),
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
		onMutate: (newIngredientInfo) => {
			queryClient.setQueryData(["ingredients"], (prevIngredients) => [
				...prevIngredients,
				{
					...newIngredientInfo,
					id: (Math.random() + 1).toString(36).substring(7),
				},
			]);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["ingredients"] }), //refetch ingredients after mutation, disabled for demo
	});
}

//READ hook (get ingredients from api)
function useGetIngredients() {
	const auth = useContext(AuthContext);
	return useQuery({
		queryKey: ["ingredients"],
		queryFn: async () => {
			////send api request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve(fakeData);
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/ingredients/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				console.log("Ingredient list :", data.ingredients);
				return data.ingredients;
			} catch (err) {
				console.log(err);
			}
		},
		refetchOnWindowFocus: false,
	});
}

//UPDATE hook (put ingredient in api)
function useUpdateIngredient() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (ingredient) => {
			////send api update request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();

			// console.log("ingredientPatch", ingredient);
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL +
						`/ingredients/edit/${ingredient.id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify(ingredient),
					}
				);
				const data = await response.json();
				console.log("UD", data.ingredients);
				return data.ingredients;
			} catch (err) {
				console.log(err);
			}
		},
		//client side optimistic update
		onMutate: (newIngredientInfo) => {
			queryClient.setQueryData(["ingredients"], (prevIngredients) =>
				prevIngredients?.map((prevIngredient) =>
					prevIngredient.id === newIngredientInfo.id
						? newIngredientInfo
						: prevIngredient
				)
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["ingredients"] }), //refetch ingredients after mutation, disabled for demo
	});
}

//DELETE hook (delete ingredient in api)
function useDeleteIngredient() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (ingredientId) => {
			////send api update request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL +
						`/ingredients/delete/${ingredientId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						// body: JSON.stringify(ingredient),
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
		onMutate: (ingredientId) => {
			queryClient.setQueryData(["ingredients"], (prevIngredients) =>
				prevIngredients?.filter((ingredient) => ingredient.id !== ingredientId)
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["ingredients"] }), //refetch ingredients after mutation, disabled for demo
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

const validateRequired = (value) => !!value.length;
const validateNumber = (num) => String(num).match(/^[0-9]+$/);
const validateDecimal = (dec) => String(dec).match(/[1-9]\d*(?:\.\d{0,2})?/);

function validateIngredient(ingredient) {
	return {
		category: !validateRequired(ingredient.category[0])
			? "Category is Required"
			: "",
		name: !validateRequired(ingredient.name) ? "Name is Required" : "",
		description: !validateRequired(ingredient.description)
			? "Description is Required"
			: "",
		unit: !validateRequired(ingredient.unit) ? "Description is Required" : "",
		volume: !validateNumber(ingredient.volume) ? "Volume is Required" : "",
		price: !validateDecimal(ingredient.price) ? "Price is Required" : "",
	};
}
