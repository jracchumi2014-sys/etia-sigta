const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

const AUTH_TOKEN = 'sigta-admin-token';
const USERS = [
  { username: 'admin', fullname: 'Administrador Principal', role: { name: 'ADMIN' } }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    return res.json({
      token: AUTH_TOKEN,
      username: 'admin',
      authorities: ['ROLE_ADMIN']
    });
  }

  return res.status(401).json({ message: 'Credenciales inválidas' });
});

app.get('/api/users', (req, res) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  return res.json(USERS);
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'SIGTA local server running' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SIGTA server listening on http://localhost:${PORT}`);
});
