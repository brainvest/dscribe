// Waits until the auth server (5001), the Host (5000) and the client (4200) accept connections.
// Used by the "LaunchAll+TestUI" launch configuration so Playwright reuses the servers instead of starting its own.
import net from 'node:net';

const PORTS = {auth: 5001, host: 5000, client: 4200};
const TIMEOUT_MS = 300_000;

const isOpen = (port) =>
	new Promise((resolve) => {
		const socket = net.connect({port, host: 'localhost'});
		socket.once('connect', () => {
			socket.destroy();
			resolve(true);
		});
		socket.once('error', () => resolve(false));
	});

const started = Date.now();
const pending = new Set(Object.keys(PORTS));
while (pending.size > 0) {
	for (const name of [...pending]) {
		if (await isOpen(PORTS[name])) {
			console.log(`${name} is up (port ${PORTS[name]})`);
			pending.delete(name);
		}
	}
	if (pending.size > 0) {
		if (Date.now() - started > TIMEOUT_MS) {
			console.error(`Timed out waiting for: ${[...pending].join(', ')}`);
			process.exit(1);
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
}
