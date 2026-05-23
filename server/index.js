const http = require('http');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const PORT = process.env.PORT || 3001;
const dataDir = path.join(__dirname, 'data');
const rootDir = path.join(__dirname, '..');
const paymentsFile = path.join(dataDir, 'payments.json');
const activationFile = path.join(dataDir, 'activations.json');
const registrationsFile = path.join(dataDir, 'registrations.json');

fs.mkdirSync(dataDir, { recursive: true });

async function readJson(file) {
  try {
    return JSON.parse(await fsp.readFile(file, 'utf8'));
  } catch {
    return [];
  }
}

async function writeJson(file, data) {
  await fsp.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

function sanitizeRegistration(item = {}) {
  return {
    id: String(item.id || Date.now()),
    createdAt: item.createdAt || new Date().toISOString(),
    date: item.date || new Date().toLocaleString('fr-FR'),
    suivi: String(item.suivi || item.code || '').trim(),
    prenom: String(item.prenom || '').trim(),
    nom: String(item.nom || '').trim(),
    telephone: String(item.telephone || '').trim(),
    age: String(item.age || '').trim(),
    paiement: String(item.paiement || '').trim(),
    transaction_id: String(item.transaction_id || '').trim(),
    status: String(item.status || 'success').trim()
  };
}

function normalizeWebhook(payload = {}) {
  const success = payload.isPaymentSucces === true || payload.event === 'transaction.success';
  return {
    suivi: String(payload.partnerId || payload.stateData?.suivi || '').trim(),
    transaction_id: String(payload.transactionId || '').trim(),
    status: success ? 'success' : 'failed',
    amount: Number(payload.amount || 0),
    fees: Number(payload.fees || 0),
    payment_method: String(payload.method || '').trim(),
    account: payload.account || '',
    performedAt: payload.performedAt || new Date().toISOString(),
    webhook_event: payload.event || (success ? 'transaction.success' : 'transaction.failed'),
    failureCode: payload.failureCode || '',
    failureMessage: payload.failureMessage || ''
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, file) {
  fs.readFile(file, (error, content) => {
    if (error) {
      sendJson(res, 404, { success: false, message: 'File not found' });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw);
}

async function handleApi(req, res, pathname) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (pathname === '/api/payments' && req.method === 'GET') {
    sendJson(res, 200, await readJson(paymentsFile));
    return;
  }

  if (pathname === '/api/registrations' && req.method === 'GET') {
    const registrations = await readJson(registrationsFile);
    sendJson(res, 200, Array.isArray(registrations) ? registrations : []);
    return;
  }

  if (pathname === '/api/registrations' && req.method === 'POST') {
    const registration = sanitizeRegistration(await readBody(req));
    if (!registration.prenom || !registration.nom || !registration.telephone || !registration.age || !registration.suivi) {
      sendJson(res, 400, { success: false, message: 'Missing required registration fields' });
      return;
    }

    const registrations = await readJson(registrationsFile);
    const items = Array.isArray(registrations) ? registrations : [];
    const existingIndex = items.findIndex((item) => item.suivi === registration.suivi);

    if (existingIndex >= 0) items[existingIndex] = { ...items[existingIndex], ...registration };
    else items.unshift(registration);

    await writeJson(registrationsFile, items);
    sendJson(res, 201, { success: true, registration });
    return;
  }

  if (pathname === '/api/kkiapay/webhook' && req.method === 'POST') {
    const expectedSecret = process.env.KKIAPAY_WEBHOOK_SECRET;
    const receivedSecret = req.headers['x-kkiapay-secret'];

    if (expectedSecret && receivedSecret !== expectedSecret) {
      sendJson(res, 401, { success: false, message: 'Invalid webhook signature' });
      return;
    }

    const event = normalizeWebhook(await readBody(req));
    if (!event.suivi || !event.transaction_id) {
      sendJson(res, 400, { success: false, message: 'Missing transaction reference' });
      return;
    }

    const registrations = await readJson(registrationsFile);
    const items = Array.isArray(registrations) ? registrations : [];
    const existingIndex = items.findIndex((item) => item.suivi === event.suivi);

    if (existingIndex >= 0) {
      items[existingIndex] = { ...items[existingIndex], ...event };
    } else {
      items.unshift({
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleString('fr-FR'),
        paiement: event.amount === 30000 ? 'Formation complète (30 000 F)' : 'Inscription seule (5 000 F)',
        prenom: '',
        nom: '',
        telephone: '',
        age: '',
        ...event
      });
    }

    await writeJson(registrationsFile, items);
    sendJson(res, 200, { success: true });
    return;
  }

  if (pathname === '/api/registrations' && req.method === 'DELETE') {
    await writeJson(registrationsFile, []);
    sendJson(res, 200, { success: true });
    return;
  }

  if (pathname === '/api/activate' && req.method === 'POST') {
    const payload = await readBody(req);
    const activations = await readJson(activationFile);
    const items = Array.isArray(activations) ? activations : [];
    items.push({ id: Date.now(), ...payload });
    await writeJson(activationFile, items);
    sendJson(res, 200, { success: true, message: 'Activation request received' });
    return;
  }

  sendJson(res, 404, { success: false, message: 'Not found' });
}

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, pathname);
      return;
    }

    if (pathname === '/' || pathname === '/genia_site.html') {
      sendFile(res, path.join(rootDir, 'genia_site.html'));
      return;
    }

    if (pathname === '/admin' || pathname === '/admin.html') {
      sendFile(res, path.join(rootDir, 'admin.html'));
      return;
    }

    sendJson(res, 404, { success: false, message: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { success: false, message: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`GenIA API listening on http://localhost:${PORT}`);
});
