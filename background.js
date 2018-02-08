browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

function initializePageAction(tab) {
  if (tab.url.match(/worldcat.org\/title/)) {
    browser.pageAction.show(tab.id);
  }
}

browser.pageAction.onClicked.addListener(function () {  
  browser.tabs.executeScript({
    file: "construct_slu_ill_dll_url.js"
  });
});

browser.runtime.onMessage.addListener(get_ill_form);

function get_ill_form(message) {
  browser.tabs.update({url: message.url});
}