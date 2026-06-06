window.addEventListener("DOMContentLoaded", () => {
  const chartCanvas = document.getElementById("dashboardChart");
  const authButton = document.getElementById("authButton");
  const token = localStorage.getItem('sigta_token');

  if (authButton) {
    authButton.textContent = token ? 'Cerrar sesión' : 'Iniciar sesión';
    authButton.addEventListener('click', () => {
      if (token) {
        localStorage.removeItem('sigta_token');
        window.location.reload();
      } else {
        window.location.href = 'login.html';
      }
    });
  }

  if (chartCanvas) {
    new Chart(chartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Disponibles", "Prestados", "Mantenimiento", "Baja"],
        datasets: [{
          data: [112, 24, 9, 0],
          backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom", labels: { color: "#d1d5db" } }
        }
      }
    });
  }

  const inventory = document.querySelector("#inventoryTable");
  if (inventory && window.simpleDatatables) {
    new simpleDatatables.DataTable(inventory, { searchable: true, fixedHeight: true });
  }

  if (token) {
    fetch('http://localhost:8080/api/users', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then((response) => response.json())
      .then((users) => {
        const usersTableBody = document.querySelector('#usersTable tbody');
        if (usersTableBody) {
          usersTableBody.innerHTML = '';
          users.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.fullname || ''}</td><td>${user.username || ''}</td><td>${user.role?.name || ''}</td>`;
            usersTableBody.appendChild(row);
          });
        }
      })
      .catch((error) => console.error('Error cargando usuarios:', error));
  }
});
