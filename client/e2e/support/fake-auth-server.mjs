// Test-only stand-in for SampleAuthServer, used by the Playwright suite.
//
// It speaks the same contract the client and the Host rely on:
//   POST /auth/login | /auth/refresh | /auth/logout   (client)
//   GET  /.well-known/openid-configuration, /.well-known/jwks   (Host validates bearer tokens through these)
// so the real Host (and the real Metadata database) can be exercised without ever writing a user to the shared
// Auth database. It must never be used outside tests: the credentials are public and the key is ephemeral.
import crypto from 'node:crypto';
import http from 'node:http';

const PORT = Number(process.env.FAKE_AUTH_PORT ?? 5001);
const ISSUER = `http://localhost:${PORT}`;
const USERNAME = process.env.E2E_USERNAME ?? 'e2e-admin';
const PASSWORD = process.env.E2E_PASSWORD ?? 'e2e-password';
const TOKEN_LIFETIME_SECONDS = 300;
const REFRESH_COOKIE = 'e2e_refresh';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
const kid = crypto.randomBytes(8).toString('hex');
const jwk = { ...publicKey.export({ format: 'jwk' }), kid, use: 'sig', alg: 'RS256' };

const b64url = (input) => Buffer.from(input).toString('base64url');

function issueToken() {
	const now = Math.floor(Date.now() / 1000);
	const header = { alg: 'RS256', typ: 'JWT', kid };
	// The Host's permission rows are keyed on the server-side role name, so the test user is an `Admin`.
	const payload = {
		iss: ISSUER,
		sub: '00000000-0000-0000-0000-00000000e2e0',
		name: USERNAME,
		role: 'Admin',
		iat: now,
		nbf: now,
		exp: now + TOKEN_LIFETIME_SECONDS,
	};
	const body = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
	const signature = crypto.sign('RSA-SHA256', Buffer.from(body), privateKey).toString('base64url');
	return `${body}.${signature}`;
}

function readJson(req) {
	return new Promise((resolve) => {
		let data = '';
		req.on('data', (chunk) => (data += chunk));
		req.on('end', () => {
			try {
				resolve(JSON.parse(data || '{}'));
			} catch {
				resolve({});
			}
		});
	});
}

function send(res, status, body, headers = {}) {
	const isJson = body !== undefined && typeof body !== 'string';
	res.writeHead(status, { ...(isJson ? { 'Content-Type': 'application/json' } : {}), ...headers });
	res.end(isJson ? JSON.stringify(body) : body);
}

const hasSession = (req) => (req.headers.cookie ?? '').split(';').some((c) => c.trim() === `${REFRESH_COOKIE}=1`);
const cookie = (value, maxAge) => `${REFRESH_COOKIE}=${value}; Path=/auth; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`;

const server = http.createServer(async (req, res) => {
	const { pathname } = new URL(req.url, ISSUER);

	if (req.method === 'GET' && pathname === '/.well-known/openid-configuration') {
		return send(res, 200, { issuer: ISSUER, jwks_uri: `${ISSUER}/.well-known/jwks` });
	}
	if (req.method === 'GET' && pathname === '/.well-known/jwks') {
		return send(res, 200, { keys: [jwk] });
	}
	if (req.method === 'GET' && pathname === '/health') {
		return send(res, 200, 'ok');
	}
	if (req.method === 'POST' && pathname === '/auth/login') {
		const { username, password } = await readJson(req);
		if (username !== USERNAME || password !== PASSWORD) {
			return send(res, 401);
		}
		return send(res, 200, { accessToken: issueToken() }, { 'Set-Cookie': cookie('1', 60 * 60) });
	}
	if (req.method === 'POST' && pathname === '/auth/refresh') {
		return hasSession(req) ? send(res, 200, { accessToken: issueToken() }) : send(res, 401);
	}
	if (req.method === 'POST' && pathname === '/auth/logout') {
		return send(res, 204, undefined, { 'Set-Cookie': cookie('', 0) });
	}
	send(res, 404);
});

server.listen(PORT, () => console.log(`Fake auth server listening on ${ISSUER}`));
