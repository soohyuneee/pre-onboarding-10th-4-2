import apiRequest from "./index";

const RESOURCE = "/todos";
const SEARCH = "/search";

export const getTodoList = async () => {
	try {
		const response = await apiRequest.get(`${RESOURCE}`);

		return response;
	} catch (error) {
		throw new Error("API getTodoList error");
	}
};

export const getTodoSearch = async (query, page) => {
	try {
		const response = await apiRequest.get(SEARCH, {
			params: {
				q: query,
				page: page,
				limit: 10,
			},
		});
		return { resData: response.data };
	} catch (error) {
		throw new Error("API getTodoSearch error");
	}
};

export const createTodo = async (data) => {
	try {
		const response = await apiRequest.post(`${RESOURCE}`, data);

		return response;
	} catch (error) {
		throw new Error("API createTodo error");
	}
};

export const deleteTodo = async (id) => {
	try {
		const response = await apiRequest.delete(`${RESOURCE}/${id}`);

		return response;
	} catch (error) {
		throw new Error("API deleteTodo error");
	}
};
