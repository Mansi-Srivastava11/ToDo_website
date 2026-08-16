const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const resource = `${apiUrl}/api/todos`;

const checkResponse = async (response) => {
	const payload = await response.json();

	if (!response.ok) {
		throw new Error(payload.message || 'Server returned an error');
	}

	// normalize backend responses: some endpoints return `todo` while others return `data`
	if (payload && typeof payload === 'object') {
		if (!payload.data && payload.todo) payload.data = payload.todo;
		if (!payload.data && payload.todos) payload.data = payload.todos;
	}

	return payload;
};

export const fetchTodos = (params = {}) => {
const query = new URLSearchParams();

if (params.search) query.set('search', params.search);
if (params.sort) query.set('sort', params.sort);

return fetch(`${resource}?${query.toString()}`)
.then(checkResponse);
};

export const createTodo = (payload) => {
return fetch(`${resource}/create`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(payload),
}).then(checkResponse);
};

export const updateTodo = (id, payload) => {
return fetch(`${resource}/${id}`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(payload),
}).then(checkResponse);
};

export const toggleTodo = (id) => {
return fetch(`${resource}/${id}/toggle`, {
method: 'PATCH',
}).then(checkResponse);
};

export const deleteTodo = (id) => {
return fetch(`${resource}/${id}`, {
method: 'DELETE',
}).then(checkResponse);
};
