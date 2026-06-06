# Backend SIGTA

El backend está diseñado con Java 21 y Spring Boot.

Para ejecutar el backend:
1. Instala Java 21.
2. Configura MariaDB con la base de datos sigta.
3. Ajusta las credenciales en ackend/src/main/resources/application.properties.
4. Ejecuta mvn spring-boot:run desde D:/SIGTA/backend.

La API inicial expone:
- GET /api/assets
