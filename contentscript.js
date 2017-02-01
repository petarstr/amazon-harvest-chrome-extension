chrome.runtime.sendMessage(
{
	from: 'content',
	subject: 'getTabId'
});


//Get Price

var fullPrice = (function (){
	if(document.getElementById('priceblock_ourprice')){
		var getPrice = document.getElementById('priceblock_ourprice').innerHTML;
	return getPrice; 
} 
else if (document.getElementById('unqualified')){
	var section = document.getElementById('unqualified');
	var availableFrom = section.getElementsByClassName('a-color-price')[0].innerText;
	return availableFrom;

} else if (document.getElementById('outOfStock')) {
	return "Out Of Stock";

} else if (document.getElementById('unqualifiedBuyBox')){
	return "See Buying Options";

} else if (document.getElementById('priceblock_saleprice')){
	var price = document.getElementById('priceblock_saleprice').innerText;
	
	return price;
} else
  return 'N/A'

})();


//Get ASIN

var asinNo = (function(){
	if(document.getElementById('detail-bullets')){
var section = document.getElementById('detail-bullets');
var list = section.getElementsByTagName('li');
for (var i = 0; i < list.length; i++){
	if (list[i].innerText.indexOf("ASIN") > -1){
		 var asinFull = list[i].innerText;
		 asinNum = asinFull.substring(asinFull.indexOf(' '));
	}
  }
  return asinNum;
} else if (document.getElementById('productDetails_detailBullets_sections1')){
	var section = document.getElementById('productDetails_detailBullets_sections1');
	var list = section.getElementsByTagName('td');
	for (var i = 0; i < list.length; i++){
	if (list[i].innerText.indexOf("B0") > -1){
		 var asinFull = list[i].innerText;
		 return asinFull;
	}
  }
} else if (document.getElementById('prodDetails')){
	var section = document.getElementById('prodDetails');
	var list = section.getElementsByTagName('td');
	for (var i = 0; i < list.length; i++){
	if (list[i].innerText.indexOf("B0") > -1){
		 var asinFull = list[i].innerText;
		 return asinFull;
	}
  }
} else if (document.getElementById('detail_bullets_id')){
	var section = document.getElementById('detail_bullets_id');
var list = section.getElementsByTagName('li');
for (var i = 0; i < list.length; i++){
	if (list[i].innerText.indexOf("ASIN") > -1){
		 var asinFull = list[i].innerText;
		 asinNum = asinFull.substring(asinFull.indexOf(' '));
		 return asinNum;
	}
  }
} else


  return 'N/A'

})();

//Get UPC

var upcNo = (function() {
    if (document.getElementById("detail-bullets")) {
        var doc = document.getElementById("detail-bullets");
        var list = doc.getElementsByTagName('li');
        for (var i = 0; i < list.length; i++) {
            if (list[i].innerText.indexOf('UPC') > -1) {
                var upcFull = list[i].innerText;
                upcNum = upcFull.substring(upcFull.indexOf(' '));
                return upcNum
            }
        }
        return 'N/A'

    } else if (document.getElementById('prodDetails')) {

        var section = document.getElementById('prodDetails');
        if (section.getElementsByClassName('pdTab')[0]) {
            var list = section.getElementsByClassName('pdTab')[0];
            var wrong = list.getElementsByClassName('label')[0].innerText;
            var upcNum = list.getElementsByClassName('value')[0].innerText;

            if (wrong != "UPC") {
                return 'N/A'
            } else {
                return upcNum;
            }

        } else
            return 'N/A'
    } else
        return 'N/A'
})();

// Get Reviews

 var reviewNo = (function (){
 	var doc = document.getElementById('acrCustomerReviewText');
	if (doc){
	var rev = document.getElementById('acrCustomerReviewText').innerHTML;
	var num = rev.substring(0, rev.indexOf(' '));
            return num
     } else 
	return "0"	  
})();

// Get Rank

var rankNo = (function (){
	if (document.getElementById('SalesRank')){
		var section = document.getElementById('SalesRank');
		var subSection = section.getElementsByClassName("value")[0];
		if(subSection){
			var subSectionText = subSection.innerText;
			var ranking = subSectionText.substring(0, subSectionText.indexOf(" "));
			return ranking;
		} else {
		var rankFull = document.getElementById('SalesRank').innerText;
	    var begin = rankFull.substring(rankFull.indexOf(':')+1);
	    var ranking = begin.substring(0, begin.indexOf('i'));
	    return ranking
	    }
	} else if (document.getElementById('productDetails_detailBullets_sections1')){
		var section = document.getElementById('productDetails_detailBullets_sections1');
		var list = section.getElementsByTagName('td');
		for(var i = 0; i < list.length; i++){
			if (list[i].innerText.indexOf('#') > -1){
				var rankFull = list[i].innerText;
				var begin = rankFull.substring(rankFull.indexOf('#'));
	            var ranking = begin.substring(0, begin.indexOf(' '));
	            return ranking
			} 
		}
	} else
     
     return 'N/A'
	
})();





chrome.runtime.onMessage.addListener(function(message, sender, response){
	if((message.from === 'popup') && (message.subject === 'getData')){
		var objson = {
		title:	document.getElementById("productTitle").innerText,
		price: fullPrice,
		reviews: reviewNo,
		asin: asinNo,
		rank: rankNo,
		upc: upcNo
		};
		response(objson);
	};
});





