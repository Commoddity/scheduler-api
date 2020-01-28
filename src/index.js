const PORT = process.env.PORT || 8001;
const ENV = require('./environment');
const HOST = '0.0.0.0';

const app = require('./application')(ENV, { updateAppointment });
const server = require('http').Server(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

function updateAppointment(id, interview) {
	wss.clients.forEach(function eachClient(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(
				JSON.stringify({
					type: 'SET_INTERVIEW',
					id,
					interview
				})
			);
		}
	});
}

server.listen(PORT, HOST, () => {
	console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
