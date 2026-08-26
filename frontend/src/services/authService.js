const apiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

const authResource = `${apiUrl}/api/auth`;

export const registerUser = async (userData) => {
  const response = await fetch(`${authResource}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Server returned:", text);

    throw new Error(
      "Backend returned an invalid response. Please check the API URL."
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${authResource}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Server returned:", text);

    throw new Error(
      "Backend returned an invalid response. Please check the API URL."
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};