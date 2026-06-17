export async function loginUser(payload) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en login');
  }

  return response.json();
}

export async function registerUser(payload) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: payload.nombre,
      apellido: payload.apellido,
      identificacion: payload.identificacion,
      id_identificacion: payload.id_identificacion,
      email: payload.email,
      misisdn: payload.misisdn,
      direccion: payload.direccion,
      fecha_de_nacimiento: payload.fecha_de_nacimiento,
      password: payload.password,
      id_departamento: payload.id_departamento,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en registro');
  }

  return response.json();
}

export async function recoverAccount(payload) {
  const response = await fetch('/api/auth/recover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en recuperación');
  }

  return response.json();
}

export async function getProfile(token) {
  const response = await fetch('/api/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error al obtener perfil');
  }

  return response.json();
}

export async function updateProfile(payload, token) {
  const response = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error al actualizar perfil');
  }

  return response.json();
}
