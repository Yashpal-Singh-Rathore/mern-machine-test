// Read base URL from environment
const BASE_URL = import.meta.env.VITE_API_URL;

// Helper to build full API path
function buildUrl(path) {
  return `${BASE_URL}${path}`;
}

export async function loginUser(email, password) {
  const response = await fetch(buildUrl("/api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function fetchWithAuth(path, options = {}) {
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
