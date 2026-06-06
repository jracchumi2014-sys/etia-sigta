INSERT INTO roles (name) VALUES ('ADMIN'), ('ALMACENERO'), ('COORDINADOR'), ('DOCENTE'), ('ESTUDIANTE');

INSERT INTO usuarios (username, password, fullname, role_id)
VALUES ('admin', '$2a$10$7q3vnpo9pHz9TfP1qBcdMOWLc8qvPqF9DXB0ZuxQHBn5Ov9Y.v0fu', 'Administrador Principal', 1);
