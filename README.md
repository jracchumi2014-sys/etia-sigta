# SIGTA Inicio Rápido

1. Abre `D:\SIGTA\frontend\index.html` en el navegador para ver la interfaz inicial.
2. Usa `D:\SIGTA\database\schema.sql` para crear la base de datos.
3. Ejecuta el backend con Maven desde `D:\SIGTA\backend`.

## Autenticación
- Usa `POST /api/auth/login` con JSON `{ "username": "admin", "password": "admin123" }`.
- El backend devuelve un token JWT Bearer para acceder a `/api/**`.

## API inicial
- `GET /api/assets`
- `GET /api/users`
- `GET /api/loans`

## Datos iniciales
- `backend/src/main/resources/data.sql` carga roles y un usuario admin de ejemplo.
