const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function get(endpoint: string) {
  return fetchWithAuth(endpoint);
}

export async function post(endpoint: string, data: any) {
  return fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function put(endpoint: string, data: any) {
  return fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function del(endpoint: string) {
  return fetchWithAuth(endpoint, {
    method: 'DELETE',
  });
}