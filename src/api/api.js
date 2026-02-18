const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://services.fintbot.pe';

export async function registerUser(payload) {
  const url = `${BASE_URL}/api/auth/users/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    // La API puede no devolver JSON siempre; ignoramos el error de parseo
  }

  if (!response.ok) {
    const message = (data && (data.message || data.detail || data.error)) || 'Error al registrar el usuario';
    throw new Error(message);
  }

  return data;
}
