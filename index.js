const WebSocket = require("ws");
const fetch = require("node-fetch");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

const { MsgType, SendMsgType } = require("./types");

const CHANNEL_ID = "71624195"; // https://booyah.live/channels/71624195

const DEVICE_ID = uuidv1();

const headers = {
	"booyah-session-key": `${process.env.BOOYAH_SESSION_KEY}`,
	"x-csrf-token": `${process.env.BOOYAH_SESSION_KEY}`,
	cookie: `session_key=${process.env.BOOYAH_SESSION_KEY}`,
};

startBot(CHANNEL_ID);

async function startBot(CHANNEL_ID) {
	const ROOM_ID = await getChatroomId(CHANNEL_ID)
	const token = await generateToken();

	// connect to chat with the generated token
	const webSocket = new WebSocket(
		`wss://chat.booyah.live:9511/ws/v2/chat/conns?room_id=${ROOM_ID}&uid=${process.env.BOT_UID}&device_id=${DEVICE_ID}&token=${token}`
	);

	webSocket.on("open", () => {
		console.log(`Bot is online on room: ${ROOM_ID}, channel: ${CHANNEL_ID}`);

		// Send empty message every minute to prevent disconnection
		setInterval(function () {
			heartbeat(webSocket);
		}, 1000 * 60);
	});

	webSocket.on("error", (message) => {
		console.log("error", message);
	});

	webSocket.on("close", (code) => {
		console.log("Conection lost, error code:", code);
	});

	webSocket.on("message", (buffer) => {
		// ws sends binary buffer instead of string or JSON
		// we have to decode it and parse it to JSON
		const messages = decodeBufferToJSON(buffer);

		messages.forEach(async (message) => {
			console.log(message);
			const uid = message.data.uid;

			// ignore messages from the bot
			if (uid == process.env.BOT_UID) return;

			if (message.event == MsgType.CHAT) {
				const msg = message.data.msg;

				if (msg == "!ping") sendMessage(webSocket, "pong");
			} else if (message.event == MsgType.STICKER) {
				const sticker = message.data.sticker_id;

				// send the same sticker
				sendSticker(webSocket, sticker);
			}
		});
	});
}

function sendMessage(ws, msg) {
	ws.send(`{ "event": "${SendMsgType.CHAT}", "data": {"msg": "${msg}" } }`);
}

function sendSticker(ws, id) {
	ws.send(
		`{ "event": "${SendMsgType.STICKER}", "data": {"sticker_id": "${id}" } }`
	);
}

function heartbeat(ws) {
	console.log("heartbeat");
	ws.send('{"msg": "" }');
}

function decodeBufferToJSON(buffer) {
	const json = buffer.toString("utf8");
	const jsonp = JSON.parse(json);
	return jsonp;
}

async function getChatroomId(channel) {
	const response = await fetch(
		`https://booyah.live/api/v3/channels/${channel}`, 
		{
			headers: headers,
		}
	);
	const json = await response.json();
	return json.channel.chatroom_id;
}

async function generateToken() {
	// request a one password time token that expires in 5 minutes if it's not used
	const response = await fetch(
		`https://booyah.live/api/v3/users/${process.env.BOT_UID}/chat-tokens`,
		{
			headers: headers,
			body: `{"device_id":"${DEVICE_ID}"}`,
			method: "POST",
		}
	);

	const json = await response.json();
	const token = json.token;
	return token;
}
