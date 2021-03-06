chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'https?://www.worldcat.org/title/.*' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({
		file: 'construct_slu_ill_dll_url.js'
	});
});

chrome.runtime.onMessage.addListener(function(message) {
	chrome.tabs.update({url: message.url});
});
