INSERT INTO roles (name) VALUES ('ADMIN'), ('ALMACENERO'), ('COORDINADOR'), ('DOCENTE'), ('ESTUDIANTE');

INSERT INTO usuarios (username, password, fullname, role_id)
VALUES ('admin', '$2b$12$SaaHWfgBkuO2Q7Ebjyd9xOz1IFVivh63UGLh1BEyanXCmZ2g0Qfam', 'Administrador Principal', 1),
       ('estudiante', '$2b$12$Dqhv1BrRiQBtXS8tsx2WrOq3e5/hMYI5tJEzjeu84yy4hmrc7OJh6', 'Estudiante Ejemplo', 5);
