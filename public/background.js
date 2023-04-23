const functions = {
  'tableTab': 'Table Formatter',
  'imageTab': 'Image Formatter'
};

chrome.runtime.onInstalled.addListener(async () => {
  for (const [subject, title] of Object.entries(functions)) {
    chrome.contextMenus.create({
      id: subject,
      title: title,
      type: 'normal',
      contexts: ['selection']
    });
  }
});

chrome.contextMenus.onClicked.addListener((item) => {
  const itemId = item.menuItemId
  const selectedContent = item.selectionText
  const data = { itemId }

  switch (itemId) {
    case 'tableTab':
      data.mc_content = selectedContent
      break;
    case 'imageTab':
      data.mc_rawUrl = selectedContent
  }

  chrome.storage.local.set(data).then(() => {
    const url = `chrome-extension://${chrome.runtime.id}/index.html`
    chrome.tabs.query({currentWindow: true, url: url}, function(tabs){
      if (tabs.length === 0) {
        chrome.tabs.create({ url: "index.html" })
      } else {
        chrome.tabs.update(tabs[0].id, { url: url, active: true })
      }
    });
  })
});
