document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginMessage.textContent = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        loginMessage.textContent = 'Usuario o contraseña incorrectos.';
        console.error('Login failed:', errorData);
        return;
      }

      const data = await response.json();
      localStorage.setItem('sigta_token', data.token);
      // store roles/authorities for UI role checks
      try {
        const authorities = data.authorities || data.roles || [];
        const roles = authorities.map(a => (typeof a === 'string' ? a : (a.authority || a.role || ''))).filter(Boolean);
        localStorage.setItem('sigta_roles', JSON.stringify(roles));
      } catch (e) {
        localStorage.setItem('sigta_roles', JSON.stringify([]));
      }
      localStorage.setItem('sigta_user', data.username || '');
      window.location.href = 'index.html';
    } catch (error) {
      loginMessage.textContent = 'No se pudo conectar con el backend.';
      console.error(error);
    }
  });
});
