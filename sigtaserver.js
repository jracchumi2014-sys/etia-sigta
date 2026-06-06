const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'SIGTA local server running' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SIGTA server listening on http://localhost:${PORT}`);
});
