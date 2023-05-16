import { useCallback, useState } from 'react';
import { createTodo } from '../api/todo';

const useCreateTodo = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = useCallback(async (inputText, setTodos) => {
		try {
			setIsLoading(true);

			const trimmed = inputText.trim();
			if (!trimmed) {
				return alert('Please write something');
			}

			const newItem = { title: trimmed };
			const { data } = await createTodo(newItem);

			if (data) {
				setTodos((prev) => [...prev, data]);
			}
		} catch (error) {
			console.error(error);
			alert('Something went wrong.');
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { isLoading, handleSubmit };
};

export default useCreateTodo;
