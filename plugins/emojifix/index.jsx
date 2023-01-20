const {
	ui: { injectCss },
	flux: { dispatcher },
	observeDom,
} = shelter;

function injectEmoji(elem) {
	console.log(elem.href);
	elem.parentElement.style.display = "contents";
	elem.replaceWith(<img src={elem.href} className="fixedEmoji"></img>);
}

const TRIGGERS = [
	"MESSAGE_CREATE",
	"CHANNEL_SELECT",
	"LOAD_MESSAGES_SUCCESS",
	"UPDATE_CHANNEL_DIMENSIONS",
	"MESSAGE_END_EDIT",
	"MESSAGE_UPDATE",
];

const EMOJI_REGEX = /https?:\/\/.*\/emojis\/([0-9]+).(webp|png|gif)\??.*/;

function onDispatch() {
	console.log("onDispatch");
	const unObserve = observeDom(".anchor-1MIwyf", (elem) => {
		console.log(elem.href);
		unObserve();
		console.log(EMOJI_REGEX.exec(elem.href));
		if (EMOJI_REGEX.exec(elem.href)) {
			injectEmoji(elem);
		}
	});

	setTimeout(unObserve, 500);
}
//http://localhost:8080/dist/emojifix/
export function onLoad() {
	injectCss(`
		.fixedEmoji{
			height: 1.375rem;
			width: 1.375rem;
		}
	`);
	console.log("aaa");
	TRIGGERS.forEach((t) => dispatcher.subscribe(t, onDispatch));
}
export function onUnload() {
	TRIGGERS.forEach((t) => dispatcher.unsubscribe(t, onDispatch));
}
