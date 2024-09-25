import React, { useReducer, useEffect } from "react";
import Select from "react-select";
import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
//	console.log("state", state);
//	console.log("action", action.type);
	switch (action.type) {
		case "CHANGE":
   			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		case "TOUCH": {
			return {
				...state,
				isTouched: true,
			};
		}
		default:
			return state;
	}
  
};

const InputSelect = (props) => {
  const catOptions = [...props.options]
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isTouched: false,
		isValid: props.initialValid || false,
	});

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			val: event.value,
			validators: props.validators,
		});
    dispatch({
			type: "TOUCH",
		});
	};

	const touchHandler = () => {
		dispatch({
			type: "TOUCH",
		});
	};
	//console.log("catOptions", props.options);
	// const element =
	//   <Select
	//       id={props.id}
	//     //  type="select"
	//     //  placeholder={props.placeholder}
	//       onChange={changeHandler}
	//       onBlur={touchHandler}
	//       value={inputState.value}
	//       options={props.options}
	//     />
console.log("inputstate", inputState.value);
	return (
		<div
			className={`form-control ${!inputState.isValid &&
				inputState.isTouched &&
				"form-control--invalid"}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{/* {element} */}
			{/* <Select
				id={props.id}
				//  type="select"
				//  placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				options={props.options}
			/> */}
			<Select
				id={props.id}
				//  type="select"
				//  placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				options={props.options}
        
			>
				{catOptions.map(o => (
				<option key={o.value} value={o.value}>
					{o.label}
				</option>
				))}
			</Select>
      
     {/* /> */}
			{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};

export default InputSelect;
