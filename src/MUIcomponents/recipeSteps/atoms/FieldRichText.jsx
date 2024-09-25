import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
 import { convertToHTML } from "draft-convert";
import { Controller } from "react-hook-form";
 import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichText.css";

function FieldRichText({ name, control }) {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	 const [convertedContent, setConvertedContent] = useState(null);

	useEffect(() => {
		let html = convertToHTML(editorState.getCurrentContent());
		setConvertedContent(html);
	}, [editorState]);

	function createMarkup(html) {
		return {
			__html: DOMPurify.sanitize(html),
		};
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, editorState }, fieldState: { error } }) => {
			 <div className='App'>
					<header className='App-header'>Rich Text Editor Example</header>
					<Editor
						editorState={editorState}
						onEditorStateChange={setEditorState}
						wrapperClassName='wrapper-class'
						editorClassName='editor-class'
						toolbarClassName='toolbar-class'
					/>
					<div
						className='preview'
						dangerouslySetInnerHTML={createMarkup(convertedContent)}
					></div>
				</div>;
			}}
		/>
	);
}

export default FieldRichText;
