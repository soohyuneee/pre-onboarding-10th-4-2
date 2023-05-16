import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

import { getTodoSearch } from '../api/todo';
import useFocus from '../hooks/useFocus';
import useDebounce from '../hooks/useDebounce';
import useCreateTodo from '../hooks/useCreateTodo';

const InputTodo = ({ setTodos }) => {
	const [inputText, setInputText] = useState('');
	const [dropdown, setDropdown] = useState('');
	const { ref, setFocus } = useFocus();

	const debounceSearch = useDebounce(inputText, 500);
	const { isLoading, handleSubmit } = useCreateTodo();

	useEffect(() => {
		setFocus();
	}, [setFocus]);

	useEffect(() => {
		const pageNum = 1;
		if (debounceSearch) {
			(async () => {
				const { resData } = await getTodoSearch(debounceSearch, pageNum);
				setDropdown(resData.result || []);
			})();
		}
	}, [debounceSearch]);

	return (
		<>
			<form
				className="form-container"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(inputText, setTodos);
				}}
			>
				<input
					className="input-text"
					placeholder="Add new todo..."
					ref={ref}
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					disabled={isLoading}
				/>
				{!isLoading ? (
					<button className="input-submit" type="submit">
						<FaPlusCircle className="btn-plus" />
					</button>
				) : (
					<FaSpinner className="spinner" />
				)}
			</form>
			{debounceSearch && (
				<Dropdown dropdown={dropdown} inputText={inputText} setInputText={setInputText} setTodos={setTodos} />
			)}
		</>
	);
};

export default InputTodo;
