function parse_post(element) {
	console.log('element', element);

	var lyric = element.lyric;

	console.log(lyric);
	return lyric;
}

function open_item(url) {
	chrome.tabs.create({url: url});
	chrome.browserAction.setBadgeText({text:''});
}
