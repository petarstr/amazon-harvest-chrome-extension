chrome.runtime.onMessage.addListener(function(message, sender){
   if((message.from === 'content') && (message.subject === 'getTabId')){
   	   chrome.pageAction.show(sender.tab.id);
   }
});

    




