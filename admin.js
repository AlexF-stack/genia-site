document.addEventListener('DOMContentLoaded', () => {
  const API_REGISTRATIONS_URL = '/api/registrations';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  document.querySelectorAll('.nav-item').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      event.preventDefault();

      const target = href.substring(1);
      document.querySelectorAll('.section').forEach((section) => section.classList.remove('active'));
      document.getElementById(target)?.classList.add('active');
      document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  document.querySelectorAll('.btn-next').forEach((button) => {
    button.addEventListener('click', () => {
      const current = button.closest('.step');
      const next = document.querySelector(`.step-${button.dataset.next}`);
      if (!current || !next) return;
      current.classList.remove('active');
      next.classList.add('active');
    });
  });

  document.querySelectorAll('.btn-prev').forEach((button) => {
    button.addEventListener('click', () => {
      const current = button.closest('.step');
      const previous = document.querySelector(`.step-${button.dataset.prev}`);
      if (!current || !previous) return;
      current.classList.remove('active');
      previous.classList.add('active');
    });
  });

  const submitBtn = document.getElementById('submitActivation');
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const payload = {
        step1: {
          firstName: document.getElementById('firstName')?.value,
          lastName: document.getElementById('lastName')?.value,
          phone: document.getElementById('phone')?.value
        },
        step2: {
          companyName: document.getElementById('companyName')?.value,
          sector: document.getElementById('sector')?.value
        },
        step3: {
          docs: Array.from(document.getElementById('docs')?.files || []).map((file) => file.name)
        }
      };

      try {
        const response = await fetch('/api/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        showToast(data.success ? 'Demande envoyee.' : 'Erreur lors de l envoi.');
      } catch (error) {
        console.error(error);
        showToast('Erreur reseau.');
      }
    });
  }

  function loadPayments() {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const container = document.getElementById('transactions');
    if (!container) return;

    container.innerHTML = '<h2>Transactions</h2>';
    const table = document.createElement('table');
    table.innerHTML = `
      <tr><th>ID</th><th>Montant</th><th>Statut</th></tr>
      ${payments.map((payment) => `<tr><td>${escapeHtml(payment.transaction_id)}</td><td>${escapeHtml(payment.amount)}</td><td>${escapeHtml(payment.status)}</td></tr>`).join('')}
    `;
    container.appendChild(table);
  }

  async function loadClients() {
    let data = [];
    try {
      const response = await fetch(API_REGISTRATIONS_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error('API unavailable');
      data = await response.json();
      localStorage.setItem('genia_inscriptions_2026', JSON.stringify(data));
    } catch {
      data = JSON.parse(localStorage.getItem('genia_inscriptions_2026') || '[]');
    }

    const container = document.getElementById('clients-list');
    if (!container) return;

    container.innerHTML = '<h2>Inscriptions</h2>';
    const table = document.createElement('table');
    table.innerHTML = `
      <tr><th>Code</th><th>Prenom</th><th>Nom</th><th>Age</th><th>Paiement</th></tr>
      ${data.map((client) => `<tr><td>${escapeHtml(client.suivi || client.code)}</td><td>${escapeHtml(client.prenom)}</td><td>${escapeHtml(client.nom)}</td><td>${escapeHtml(client.age)}</td><td>${escapeHtml(client.paiement || '')}</td></tr>`).join('')}
    `;
    container.appendChild(table);
  }

  loadPayments();
  loadClients();
});
