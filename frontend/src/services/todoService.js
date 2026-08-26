const getAuthHeaders = () => {
	const token = localStorage.getItem("token");

	return token
		? {
				Authorization: `Bearer ${token}`,
			}
		: {};
};

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const resource = `${apiUrl}/api/todos`;

const checkResponse = async (response) => {
	let payload = {};

	try {
		payload = await response.json();
	} catch {
		payload = {};
	}

	if (!response.ok) {
		const message = payload?.message || payload?.error || `Request failed with status ${response.status}`;
		throw new Error(message);
	}

	if (payload && typeof payload === 'object') {
		if (!payload.data && payload.todo) payload.data = payload.todo;
		if (!payload.data && payload.todos) payload.data = payload.todos;
	}

	return payload;
};

const request = async (url, options = {}) => {
	try {
		const response = await fetch(url, options);
		return await checkResponse(response);
	} catch (error) {
		if (error instanceof TypeError) {
			throw new Error('Cannot connect to API. Backend server is not running or CORS is blocking the request.');
		}
		throw error;
	}
};

//fetchTodos
export const fetchTodos = (params = {}) => {
	const query = new URLSearchParams();

	if (params.search) query.set('search', params.search);
	if (params.sort) query.set('sort', params.sort);

	return request(`${resource}?${query.toString()}`, {
		headers: {
			...getAuthHeaders(),
		},
	});
};

//createTodo
export const createTodo = (payload) => {
	return request(`${resource}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(payload),
	});
};

//updateTodo
export const updateTodo = (id, payload) => {
	return request(`${resource}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(payload),
	});
};

//toggleTodo
export const toggleTodo = (id) => {
	return request(`${resource}/${id}/toggle`, {
		method: 'PATCH',
		headers: {
			...getAuthHeaders(),
		},
	});
};

//deleteTodo
export const deleteTodo = (id) => {
	return request(`${resource}/${id}`, {
		method: 'DELETE',
		headers: {
			...getAuthHeaders(),
		},
	});
};
