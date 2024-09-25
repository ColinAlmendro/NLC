import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography,Box, Divider } from "@mui/material";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import BaseStepper from "../atoms/BaseStepper";
import Form1 from "../molecules/Form1";
import Form2 from "../molecules/Form2";
import Form3 from "../molecules/Form3";
import Form4 from "../molecules/Form4";
import ButtonStepper from "../atoms/ButtonStepper";
import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const steps = ["Recipe", "Ingredients", "Instructions", "Additional"];

function _renderStepContent(step) {
	switch (step) {
		case 1:
			return <Form1 />;
		case 2:
			return <Form2 />;
		case 3:
			return <Form3 />;
		case 4:
			return <Form4 />;

		default:
			return <div>Not Found</div>;
	}
}

const validationSchema = [
	// Form 1
	Yup.object().shape({
		category: Yup.string()
			.required()
			.label("Category")
			.typeError("Category required"),
		name: Yup.string()
			.required()
			.label("Name")
			.typeError("Name required"),
		description: Yup.string()
			.required()
			.label("Description")
			.typeError("Description required"),
	}),
	// Form 2
	Yup.object().shape({
		ingredients: Yup.array().of(Yup.object().shape({
					ingredient: Yup.string()
						.required()
						.label("Ingredient")
						.typeError("Ingredient required"),
					unit: Yup.string()
						.required()
						.label("Unit")
						.typeError("Unit required"),
					qty: Yup.number()
						.required()
						.label("Quantity")
						.typeError("Quantity required"),
				})
			)
			.required()
			.min(1,"Ingredients are required")
			.label("Ingredients")
			.typeError("Ingredients required"),
	}),
	// Form 3
	Yup.object().shape({
		instructions: Yup.string()
			.required()
			.label("Instructions")
			.typeError("Instructions required"),
	}),
	// Form 4
	Yup.object().shape({
		image: Yup.mixed().test("required","Image required", value =>{
			return value && value.length;
		}),
		
		feeds: Yup.number()
			.required()
			.label("Servings")
			.typeError("No. servings required"),
		url: Yup.string()
			.notRequired()
			.label("Website"),
		// .typeError("Website is required"),
		cost: Yup.number()
			.nullable()
			.positive()
			.required()
			.label("Cost")
			.typeError("Cost required"),
		price: Yup.number()
			.nullable()
			.positive()
			.label("Price")
			.typeError("Price required"),
	}),
];

function FormRegistration() {
	const auth = useContext(AuthContext);
	const [activeStep, setActiveStep] = useState(1);
	const currentValidationSchema = validationSchema[activeStep - 1];
	const isLastStep = activeStep === steps.length;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const formProps = useForm({
		defaultValues: {
			category: "",
			name: "",
			description: "",
			ingredients: [],
			instructions: "",
			image: "",
			feeds: "",
			url: "",
			cost: "",
			price: "",
		},
		resolver: yupResolver(currentValidationSchema),
		mode: "all",
	});
	const { handleSubmit, control, formState } = formProps;

	const onSubmit = async (data) => {
		// e.preventDefault();
		console.log("clicked", data);


let file = data.image.file;
if (file) {
	let reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
	}
}


		try {
			const formData = new FormData();
            formData.append("files", data.image.raw);
			formData.append("category", data.category);
			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("ingredients", JSON.stringify(data.ingredients));
			formData.append("instructions", data.instructions);
			formData.append("feeds", data.feeds);
			formData.append("url", data.url);
			formData.append("image", data.image);
			formData.append("cost", data.cost);
			formData.append("price", data.price);

			for (var [key, value] of formData.entries()) {
				console.log("formData »", key, value);
			}

			const responseData = await sendRequest(
				process.env.REACT_APP_BACKEND_URL + "/recipes/new",
				"POST",
				formData
			);
		} catch (err) {}
	};

	function _handleSubmit() {
		if (isLastStep) {
			return handleSubmit(onSubmit)();
		} else {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	}

	function _handleBack() {
		if (activeStep === 1) {
			return;
		}
		setActiveStep(activeStep - 1);
	}

	return (
		<>
			<Container maxWidth='md' sx={{ border: "3px solid", width: 900 }}>
				<Typography variant='h2'>New Recipe</Typography>
				<Divider sx={{ mt: 2 }} />
				<Paper sx={{ height: "100vh" }}>
					<Box pt={2}>
						<BaseStepper activeStep={activeStep} steps={steps} />
					</Box>

					<Divider sx={{ mt: 2 }} />

					<Box p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(_handleSubmit)}>
								{_renderStepContent(activeStep)}
								<ButtonStepper
									steps={steps}
									activeStep={activeStep}
									onClickBack={_handleBack}
									loading={formState.isSubmitting}
								/>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
		</>
	);
}

export default FormRegistration;
