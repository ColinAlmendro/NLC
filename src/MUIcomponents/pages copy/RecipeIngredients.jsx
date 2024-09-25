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
import { fakeData } from "./RecipeIngredients";
import { recipeingredients } from "./RecipeIngredients";
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
				accessorKey: "name",
				header: "Name",
				editVariant: "select",
				editSelectOptions: recipeingredients.name,
				muiEditTextFieldProps: {
					select: true,
					error: !!validationErrors?.name,
					helperText: validationErrors?.name,
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
				accessorKey: "qty",
				header: "Quantity",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.qty,
					helperText: validationErrors?.qty,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							qty: undefined,
						}),
				},
			},
		],
		[validationErrors]
	);

	//call CREATE hook
	const {
		mutateAsync: createRecipeingredient,
		isPending: isCreatingRecipeingredient,
	} = useCreateRecipeingredient();
	//call READ hook
	const {
		data: fetchedRecipeingredients = [],
		isError: isLoadingRecipeingredientsError,
		isFetching: isFetchingRecipeingredients,
		isLoading: isLoadingRecipeingredients,
	} = useGetRecipeingredients();
	//call UPDATE hook
	const {
		mutateAsync: updateRecipeingredient,
		isPending: isUpdatingRecipeingredient,
	} = useUpdateRecipeingredient();
	//call DELETE hook
	const {
		mutateAsync: deleteRecipeingredient,
		isPending: isDeletingRecipeingredient,
	} = useDeleteRecipeingredient();

	//CREATE action
	const handleCreateRecipeingredient = async ({ values, table }) => {
		const newValidationErrors = validateRecipeingredient(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await createRecipeingredient(values);
		table.setCreatingRow(null); //exit creating mode
	};

	//UPDATE action
	const handleSaveRecipeingredient = async ({ values, table }) => {
		const newValidationErrors = validateRecipeingredient(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await updateRecipeingredient(values);
		table.setEditingRow(null); //exit editing mode
	};

	//DELETE action
	const openDeleteConfirmModal = (row) => {
		if (window.confirm("Are you sure you want to delete this recipeingredient?")) {
			const res = deleteRecipeingredient(row.original.id);
			console.log(res);
		}
	};

	const table = useMaterialReactTable({
		columns,
		data: fetchedRecipeingredients,
		initialState: {
			columnVisibility: { id: false },
		},
		createDisplayMode: "modal", //default ('row', and 'custom' are also available)
		editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
		enableEditing: true,
		getRowId: (row) => row.id,
		muiToolbarAlertBannerProps: isLoadingRecipeingredientsError
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
		onCreatingRowSave: handleCreateRecipeingredient,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSaveRecipeingredient,
		//optionally customize modal content
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h3'>Create New Recipeingredient</DialogTitle>
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
				<DialogTitle variant='h3'>Edit Recipeingredient</DialogTitle>
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
				Add New Recipe Ingredient
			</Button>
		),
		state: {
			isLoading: isLoadingRecipeingredients,
			isSaving:
				isCreatingRecipeingredient || isUpdatingRecipeingredient || isDeletingRecipeingredient,
			showAlertBanner: isLoadingRecipeingredientsError,
			showProgressBars: isFetchingRecipeingredients,
		},
	});

	return <MaterialReactTable table={table} />;
};

//CREATE hook (post new recipeingredient to api)
function useCreateRecipeingredient() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (recipeingredient) => {
			////send api update request here

			await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			return Promise.resolve();

			// try {
			// 	const response = await fetch(
			// 		process.env.REACT_APP_BACKEND_URL + "/recipeingredients/new",
			// 		{
			// 			method: "POST",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Authorization: "Bearer " + auth.token,
			// 			},
			// 			body: JSON.stringify(recipeingredient),
			// 		}
			// 	);
			// 	const data = await response.json();
			// 	console.log(data);
			// 	return data;
			// } catch (error) {
			// 	// enter your logic for when there is an error (ex. error toast)

			// 	console.log(error);
			// }
		},
		////client side optimistic update
		onMutate: (newRecipeingredientInfo) => {
			queryClient.setQueryData(["recipeingredients"], (prevRecipeingredients) => [
				...prevRecipeingredients,
				{
					...newRecipeingredientInfo,
					id: (Math.random() + 1).toString(36).substring(7),
				},
			]);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["recipeingredients"] }), //refetch recipeingredients after mutation, disabled for demo
	});
}

//READ hook (get recipeingredients from api)
function useGetRecipeingredients() {
	const auth = useContext(AuthContext);
	return useQuery({
		queryKey: ["recipeingredients"],
		queryFn: async () => {
			////send api request here
			await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			return Promise.resolve(fakeData);
			// try {
			// 	const response = await fetch(
			// 		process.env.REACT_APP_BACKEND_URL + "/recipeingredients/list",
			// 		{
			// 			method: "GET",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Authorization: "Bearer " + auth.token,
			// 			},
			// 			// body: JSON.stringify(recipeingredient),
			// 		}
			// 	);
			// 	const data = await response.json();
			// 	console.log("Recipeingredient list :", data.recipeingredients);
			// 	return data.recipeingredients;
			// } catch (err) {
			// 	console.log(err);
			// }
		},
		refetchOnWindowFocus: false,
	});
}

//UPDATE hook (put recipeingredient in api)
function useUpdateRecipeingredient() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (recipeingredient) => {
			////send api update request here
			await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			return Promise.resolve();

			console.log("recipeingredientPatch", recipeingredient);
			// try {
			// 	const response = await fetch(
			// 		process.env.REACT_APP_BACKEND_URL +
			// 			`/recipeingredients/edit/${recipeingredient.id}`,
			// 		{
			// 			method: "PATCH",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Authorization: "Bearer " + auth.token,
			// 			},
			// 			body: JSON.stringify(recipeingredient),
			// 		}
			// 	);
			// 	const data = await response.json();
			// 	console.log("UD", data.recipeingredients);
			// 	return data.recipeingredients;
			// } catch (err) {
			// 	console.log(err);
			// }
		},
		//client side optimistic update
		onMutate: (newRecipeingredientInfo) => {
			queryClient.setQueryData(["recipeingredients"], (prevRecipeingredients) =>
				prevRecipeingredients?.map((prevRecipeingredient) =>
					prevRecipeingredient.id === newRecipeingredientInfo.id
						? newRecipeingredientInfo
						: prevRecipeingredient
				)
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["recipeingredients"] }), //refetch recipeingredients after mutation, disabled for demo
	});
}

//DELETE hook (delete recipeingredient in api)
function useDeleteRecipeingredient() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (recipeingredientId) => {
			////send api update request here
			await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			return Promise.resolve();
			// try {
			// 	const response = await fetch(
			// 		process.env.REACT_APP_BACKEND_URL +
			// 			`/recipeingredients/delete/${recipeingredientId}`,
			// 		{
			// 			method: "DELETE",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Authorization: "Bearer " + auth.token,
			// 			},
			// 			// body: JSON.stringify(recipeingredient),
			// 		}
			// 	);
			// 	const data = await response.json();
			// 	// window.alert(data.message);
			// 	return data.message;
			// } catch (err) {
			// 	console.log(err);
			// }
		},
		//client side optimistic update
		onMutate: (recipeingredientId) => {
			queryClient.setQueryData(["recipeingredients"], (prevRecipeingredients) =>
				prevRecipeingredients?.filter((recipeingredient) => recipeingredient.id !== recipeingredientId)
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["recipeingredients"] }), //refetch recipeingredients after mutation, disabled for demo
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
const validateDecimal = (dec) => String(dec).match(/[1-9]\d*(?:\.\d{0,2})?/);

function validateRecipeingredient(recipeingredient) {
	return {
		name: !validateRequired(recipeingredient.name) ? "Name is Required" : "",
		unit: !validateRequired(recipeingredient.unit) ? "Unit is Required" : "",
		qty: !validateDecimal(recipeingredient.qty) ? "Quantity is Required" : "",
	};
}
