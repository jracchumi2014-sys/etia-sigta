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
      const token = data.token;
      localStorage.setItem('sigta_token', token);
      // store roles/authorities for UI role checks: prefer response, fallback to JWT claim
      try {
        let authorities = data.authorities || data.roles || [];
        let roles = [];
        if (authorities && authorities.length) {
          roles = authorities.map(a => (typeof a === 'string' ? a : (a.authority || a.role || ''))).filter(Boolean);
        } else if (token) {
          // decode JWT payload (base64url)
          try {
            const payload = token.split('.')[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const obj = JSON.parse(jsonPayload);
            if (obj.roles) {
              // roles may be CSV or array
              if (typeof obj.roles === 'string') {
                roles = obj.roles.split(',').map(s => s.trim()).filter(Boolean);
              } else if (Array.isArray(obj.roles)) {
                roles = obj.roles.map(r => (typeof r === 'string' ? r : (r.authority || r.role || ''))).filter(Boolean);
              }
            }
          } catch (e) {
            console.warn('Could not parse roles from JWT', e);
          }
        }
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
