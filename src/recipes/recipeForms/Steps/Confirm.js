import { useForm } from "react-hook-form";
import { useAppState } from "../../../shared/context/app-context";
import { Button, Form, Section, SectionRow } from "../Forms";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import "../App.css";
import { DevTool } from "@hookform/devtools";

export const Confirm = () => {
	const [state] = useAppState();
	const { handleSubmit, control } = useForm({ defaultValues: state });

	const submitData = (data) => {
		console.info(data);
		// Submit data to the server
	};

	const data = [
		{
			title: "Recipe Name",
			url: "/recipes/recipe",
			items: [
				{ name: "Category", value: state.category, required: true },
				{ name: "Name", value: state.name, required: true },
				{ name: "Description", value: state.description, required: true },
			],
		},
		{
			title: "Ingredients",
			url: "/recipes/ingredients",
			items: [
				{ name: "Ingredient", value: state.ingredient },
				{ name: "Unit", value: state.unit },
				{ name: "Quantity", value: state.qty },
			],
		},
		{
			title: "Instructions",
			url: "/recipes/instructions",
			items: [{ name: "Instruction", value: state.instruction }],
		},
		{
			title: "Details",
			url: "/recipes/details",
			items: [
				{ name: "Image", value: state.image },
				{ name: "Website", value: state.url },
				{ name: "Feeds", value: state.feeds },
				{ name: "Cost", value: state.cost },
				{ name: "Price", value: state.price },
			],
		},
	];

	const disableSubmit = data.some((section) =>
		section.items.some((item) => item.required && !item.value)
	);

	return (
		<Form onSubmit={handleSubmit(submitData)}>
			<h1 className='mb-4'>Confirm</h1>
			{data.map(({ title, url, items }) => {
				return (
					<Section title={title} url={url} key={title}>
						{items.map(({ name, value, required }) => {
							const isMissingValue = required && !value;
							return (
								<SectionRow key={name}>
									<div className={isMissingValue ? "text-warning" : ""}>
										{name}
									</div>
									<div>
										{isMissingValue ? (
											<span className={"warning-sign"}>!</span>
										) : (
											value
										)}
									</div>
								</SectionRow>
							);
						})}
					</Section>
				);
			})}

			<div className='d-flex justify-content-start'>
				<Button disabled={disableSubmit}>Submit</Button>
			</div>
			<DevTool control={control} />
		</Form>
	);
};
