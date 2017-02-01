chrome.tabs.query(
	{active: true, 
	currentWindow: true},
	function (tabs){
	chrome.tabs.sendMessage(tabs[0].id, 
		{from: 'popup',
	     subject: 'getData'}, 
		insertData);
        }
	);

function insertData(data){
	document.getElementById('title').innerHTML = data.title;
	document.getElementById('review').innerHTML = data.reviews;
	document.getElementById('price').innerHTML = data.price;
	document.getElementById('asin').innerHTML = data.asin;
	document.getElementById('rank').innerHTML = data.rank;
	document.getElementById('upc').innerHTML = data.upc;
}


function selectInfo(){
	var first = document.getElementById("title");
    var last = document.getElementById("upc");
    
    var range = document.createRange();
    range.setStart(first, 0);
    range.setEnd(last, 1);
    
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

   
    document.execCommand('copy');
}


document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('buttonSelect').onclick = selectInfo;
});



