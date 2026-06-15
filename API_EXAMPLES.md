# Ejemplos de uso de la API

Prueba estos comandos en PowerShell o bash para verificar que la API funciona correctamente.

## 1. Registrar un nuevo usuario

```bash
curl -X POST http://localhost:4000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@test.com",
    "password": "test123"
  }'
```

**Respuesta esperada (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente.",
  "user": {
    "id_user": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@test.com"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 2. Iniciar sesión

```bash
curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email": "juan@test.com",
    "password": "test123"
  }'
```

**Respuesta esperada (200):**
```json
{
  "success": true,
  "message": "Login exitoso.",
  "user": {
    "id_user": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@test.com"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 3. Obtener perfil (requiere token)

Reemplaza `<TOKEN>` con el token recibido en login:

```bash
curl -X GET http://localhost:4000/api/auth/profile `
  -H "Authorization: Bearer <TOKEN>"
```

**Respuesta esperada (200):**
```json
{
  "success": true,
  "user": {
    "id_user": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@test.com"
  }
}
```

---

## 4. Ver todos los usuarios (sin autenticación)

```bash
curl -X GET http://localhost:4000/api/auth/users
```

**Respuesta esperada (200):**
```json
{
  "success": true,
  "message": "2 usuarios encontrados.",
  "users": [
    {
      "id_user": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan@test.com",
      "estado": "activo"
    },
    {
      "id_user": 2,
      "nombre": "María",
      "apellido": "López",
      "email": "maria@test.com",
      "estado": "activo"
    }
  ]
}
```

---

## 5. Verificar que el servidor está activo

```bash
curl -X GET http://localhost:4000/api/health
```

**Respuesta esperada (200):**
```json
{"status": "OK"}
```

---

## Errores comunes

### Email ya existe

```bash
curl -X POST http://localhost:4000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "nombre": "Otro",
    "apellido": "Usuario",
    "email": "juan@test.com",
    "password": "otra123"
  }'
```

**Respuesta (409):**
```json
{
  "success": false,
  "message": "El email ya está registrado."
}
```

### Credenciales inválidas

```bash
curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email": "juan@test.com",
    "password": "contraseña_incorrecta"
  }'
```

**Respuesta (401):**
```json
{
  "success": false,
  "message": "Credenciales inválidas."
}
```

### Token expirado o inválido

```bash
curl -X GET http://localhost:4000/api/auth/profile `
  -H "Authorization: Bearer token_invalido"
```

**Respuesta (401):**
```json
{
  "success": false,
  "message": "Token inválido o expirado."
}
```

---

## Notas

- El servidor debe estar corriendo en `http://localhost:4000`
- Los comandos usan **backticks** (`) para multilinea en PowerShell
- En bash, usa **backslash** (\) para multilinea
- Los tokens JWT expiran en 1 hora
- Guarda el token después de login/register para usarlo en requests autenticados
