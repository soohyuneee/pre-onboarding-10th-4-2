import React from 'react';
import useCreateTodo from '../hooks/useCreateTodo';

const Dropdown = ({ dropdown, inputText, setInputText, setTodos }) => {
	const { handleSubmit } = useCreateTodo();

	const handleClick = (idx) => {
		setInputText('');
		handleSubmit(dropdown[idx], setTodos);
	};

	return dropdown.length ? (
		<ul className="drop-list">
			{dropdown.map((item, idx) => (
				<React.Fragment key={idx}>
					<li className="drop-item" onClick={() => handleClick(idx)}>
						{item
							.split(new RegExp(`(${inputText})`, 'gi'))
							.map((text, index) =>
								text.toLowerCase() === inputText.toLowerCase() ? (
									<mark key={index}>{text}</mark>
								) : (
									<React.Fragment key={index}>{text}</React.Fragment>
								)
							)}
					</li>
				</React.Fragment>
			))}
		</ul>
	) : null;
};

export default Dropdown;
