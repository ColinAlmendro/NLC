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
				accessorKey: "area",
				header: "Area",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.area,
					helperText: validationErrors?.area,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							area: undefined,
						}),
					//optionally add validation checking for onBlur or onChange
				},
			},
			{
				accessorKey: "delivery_rate",
				header: "Delivery",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.delivery_rate,
					helperText: validationErrors?.delivery_rate,
					//remove any previous validation errors when user focuses on the input
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							delivery_rate: undefined,
						}),
				},
			},
		],
		[validationErrors]
	);

	//call CREATE hook
	const {
		mutateAsync: createArea,
		isPending: isCreatingArea,
	} = useCreateArea();
	//call READ hook
	const {
		data: fetchedAreas = [],
		isError: isLoadingAreasError,
		isFetching: isFetchingAreas,
		isLoading: isLoadingAreas,
	} = useGetAreas();
	//call UPDATE hook
	const {
		mutateAsync: updateArea,
		isPending: isUpdatingArea,
	} = useUpdateArea();
	//call DELETE hook
	const {
		mutateAsync: deleteArea,
		isPending: isDeletingArea,
	} = useDeleteArea();

	//CREATE action
	const handleCreateArea = async ({ values, table }) => {
		const newValidationErrors = validateArea(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await createArea(values);
		table.setCreatingRow(null); //exit creating mode
	};

	//UPDATE action
	const handleSaveArea = async ({ values, table }) => {
		const newValidationErrors = validateArea(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await updateArea(values);
		table.setEditingRow(null); //exit editing mode
	};

	//DELETE action
	const openDeleteConfirmModal = (row) => {
		if (window.confirm("Are you sure you want to delete this area?")) {
			const res = deleteArea(row.original.id);
			console.log(res);
		}
	};

	const table = useMaterialReactTable({
		columns,
		data: fetchedAreas,
		initialState: {
			columnVisibility: { id: false },
		},
		createDisplayMode: "modal", //default ('row', and 'custom' are also available)
		editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
		enableEditing: true,
		getRowId: (row) => row.id,
		muiToolbarAlertBannerProps: isLoadingAreasError
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
		onCreatingRowSave: handleCreateArea,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSaveArea,
		//optionally customize modal content
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant='h3'>Create New Area</DialogTitle>
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
				<DialogTitle variant='h3'>Edit Area</DialogTitle>
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
				Add Area
			</Button>
		),
		state: {
			isLoading: isLoadingAreas,
			isSaving:
				isCreatingArea || isUpdatingArea || isDeletingArea,
			showAlertBanner: isLoadingAreasError,
			showProgressBars: isFetchingAreas,
		},
	});

	return <MaterialReactTable table={table} />;
};

//CREATE hook (post new area to api)
function useCreateArea() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (area) => {
			////send api update request here

			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();

			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/areas/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify(area),
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
		onMutate: (newAreaInfo) => {
			queryClient.setQueryData(["areas"], (prevAreas) => [
				...prevAreas,
				{
					...newAreaInfo,
					id: (Math.random() + 1).toString(36).substring(7),
				},
			]);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["areas"] }), //refetch areas after mutation, disabled for demo
	});
}

//READ hook (get areas from api)
function useGetAreas() {
	const auth = useContext(AuthContext);
	return useQuery({
		queryKey: ["areas"],
		queryFn: async () => {
			////send api request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve(fakeData);
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/areas/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				console.log("Area list :", data.areas);
				return data.areas;
			} catch (err) {
				console.log(err);
			}
		},
		refetchOnWindowFocus: false,
	});
}

//UPDATE hook (put area in api)
function useUpdateArea() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (area) => {
			////send api update request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();

			// console.log("areaPatch", area);
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL +
						`/areas/edit/${area.id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify(area),
					}
				);
				const data = await response.json();
				console.log("UD", data.areas);
				return data.areas;
			} catch (err) {
				console.log(err);
			}
		},
		//client side optimistic update
		onMutate: (newAreaInfo) => {
			queryClient.setQueryData(["areas"], (prevAreas) =>
				prevAreas?.map((prevArea) =>
					prevArea.id === newAreaInfo.id
						? newAreaInfo
						: prevArea
				)
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["areas"] }), //refetch areas after mutation, disabled for demo
	});
}

//DELETE hook (delete area in api)
function useDeleteArea() {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (areaId) => {
			////send api update request here
			// await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
			// return Promise.resolve();
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL +
						`/areas/delete/${areaId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						// body: JSON.stringify(area),
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
		onMutate: (areaId) => {
			queryClient.setQueryData(["areas"], (prevAreas) =>
				prevAreas?.filter((area) => area.id !== areaId)
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ["areas"] }), //refetch areas after mutation, disabled for demo
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

function validateArea(area) {
	return {
		
		area: !validateRequired(area.area) ? "Area is Required" : "",
		delivery_rate: !validateDecimal(area.delivery_rate)
			? "Delivery rate is Required"
			: "",
		
	};
}
