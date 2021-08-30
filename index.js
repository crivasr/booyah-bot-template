const WebSocketPlus = require("websocketplus");
const fetch = require("node-fetch");
const { v1: uuidv1 } = require('uuid');
require("dotenv").config();

const CHANNEL_ID = "71624195"; // https://booyah.live/channels/71624195
const ROOM_ID = "71200943"; // https://booyah.live/standalone/chatroom/71200943

const DEVICE_ID = uuidv1();

startBot(CHANNEL_ID, ROOM_ID);

function startBot(CHANNEL_ID, ROOM_ID) {
	// solicitar token para conectarse al chat, es de 1 solo uso y expira a los 5 minutos
	fetch(
		`https://booyah.live/api/v3/users/${process.env.BOT_UID}/chat-tokens`,
		{
			headers: {
				"x-csrf-token": `${process.env.BOOYAH_SESSION_KEY}`,
				cookie: `session_key=${process.env.BOOYAH_SESSION_KEY}`,
			},
			referrer: `https://booyah.live/channels/${process.env.BOT_UID}`,
			body: `{"device_id":"${DEVICE_ID}"}`,
			method: "POST",
		}
	)
		.then((response) => response.json())
		.then((json) => {
			// guardar token generado
			token = json.token;

			 // conectarse al chat con el token generado
			const webSocketPlus = new WebSocketPlus(`wss://chat.booyah.live:9511/ws/v2/chat/conns?room_id=${ROOM_ID}&uid=${process.env.BOT_UID}&device_id=${DEVICE_ID}&token=${token}`,
				{
					openMessage: {
						type: "subscribe",
					},
				}
			);

			webSocketPlus.on("open", () => {
				console.log(`Bot is online on room: ${ROOM_ID}, channel: ${CHANNEL_ID}`);
			});

			webSocketPlus.on("error", (message) => {
				console.log("error", message);
			});

			webSocketPlus.on("close", (message) => {
				console.log("close", message);
			});

			webSocketPlus.on("message", (messages) => {
				messages.forEach(async (message) => {
					console.log(message);

					// ignorar todo evento que no sea un mensaje nuevo en el chat
					// ej: mute, ban, emote, host, etc...
					if (message.event != 0) return; 

					const msg = message.data.msg;
					const uid = message.data.uid;

					// ignorar el mensaje si es del bot
					if (uid == process.env.BOT_UID) return; 

					console.log("New message");

					if (msg == "!ping") send_message(webSocketPlus, "pong");
				});
			});

			// enviamos un mensaje vacio cada 1 minuto para que no nos desconecte del chat
			const heartbeat = setInterval(function () {
				console.log("heartbeat");
				send_message(webSocketPlus, "");
			}, 1000 * 60);
		});
}

function send_message(WS, msg) {
	const clt_msg_id = `web-${uuidv1()}`;

	WS.send({ event: 0, data: { clt_msg_id: clt_msg_id, msg: msg } });
}
