const MsgType = {
	CHAT: 0,
	JOIN_ROOM: 1,
	LEAVE_ROOM: 2,
	LENGTH_LIMIT: 3,
	RATE_LIMIT: 4,
	YOU_ARE_TIMEOUTED: 5, // if user A is timed out, then he send a message, he will receive this event from server, other users will not..
	YOU_ARE_BANNED: 6, // if user A is banned, then he send a message, he will receive this event from server, other users will not.
	ADD_MODERATOR: 7,
	REMOVE_MODERATOR: 8,
	TIMEOUT_USER: 9, // if owner timeouted user A, All users in this chatroom will receive this event, including user A.
	BAN_USER: 10, // if owner banned user A, all users in this chatroom will receive this event, including user A.
	UNBAN_USER: 11, // if owner unbanned user A, all users in this chatroom will receive this event, including user A.
	ADD_STAFF: 12,
	REMOVE_STAFF: 13,
	KEYWORD_DETECTED: 14,
	NEW_FOLLOWER: 15,
	SEND_GIFT: 16,
	CURRENT_USER_BADGES: 17,
	FREEFIRE_PARTY_UP: 18, // triggered when links in https://admin.test.booyah.live/app/domain2game are sent
	SLOW_MODE_CHANGED: 19,
	MSG_MODE_CHANGED: 20, // follower/gifter only mode
	FOLLOWER_ONLY: 21,
	GIFTER_ONLY: 22,
	WIN_LUCKY_DRAW: 23,
	STICKER: 24,
	START_HOSTING: 25, // A start hosting B, then A will receive this message
	STOP_HOSTING: 26, // A stop hosting B, then A will receive this message
	FOLLOWER_ALERT: 27,
	LATEST_GIFTER: 28,
	NEW_HOSTER: 29, // A start hosting B, then B will receive this message
	GIFTER_RANK: 30,
	LUCKY_DRAW_START: 31,
	LUCKY_DRAW_CANCEL: 32,
	LUCKY_DRAW_FINISH: 33,
	ALERT_CUSTOM_CONFIG_MODIFY: 34,
	ALERT_CUSTOM_CONFIG_TEST: 35,
	STICKER_BLOCK_CHANGED: 36,
};

const SendMsgType = {
	CHAT: 0,
	STICKER: 1,
};

const BadgeCode = {
	redtv: 101, // red.tv is one of the old name of booyah.live
	youtube: 102,
	facebook: 104,
	owner: 201,
	moderator: 202,
	staff: 301,
	contentCreator: 303,
	gifterTop1: 401,
	gifterTop2: 402,
	gifterTop3: 403,
	gifterOthers: 404,
};

const Restriction = {
	off: 0,
	followerOnly: 1,
	gifterOnly: 2,
};

const SlowMode = {
	normal: 0, // 3 msg per 15s
	s1: 1, // 1 msg per 1s
	s5: 5, // 1 msg per 5s
	s15: 15, // 1 msg per 15s
	s30: 30, // 1 msg per 30s
	s60: 60, // 1 msg per 60s
	s120: 120, // 1 msg per 120s
	s300: 300, // 1 msg per 300s
	s600: 600, // 1 msg per 600s
};

const HiddenBanner = {
	all: 0,
	freeGift: 1,
	coinGift: 2,
	lootdrop: 3,
};

const ShownSystemMessage = {
	all: 0,
	freeGift: 1,
	coinGift: 2,
	hosting: 3,
	lootdropWinner: 4,
	chatModeration: 5,
};

const DashboardMsgType = {
	chatMessage: 0,
	systemMessage: 1,
};

module.exports = {
	MsgType: MsgType,
	SendMsgType: SendMsgType,
	BadgeCode: BadgeCode,
	Restriction: Restriction,
	SlowMode: SlowMode,
	HiddenBanner: HiddenBanner,
	ShownSystemMessage: ShownSystemMessage,
	DashboardMsgType: DashboardMsgType,
};
