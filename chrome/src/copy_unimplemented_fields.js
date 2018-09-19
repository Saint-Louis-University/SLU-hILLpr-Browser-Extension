/*
   this content script copies the remaining data (publisher,
   place, and oclc) from the query strings to the ILL form
*/

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
	url = url.replace(/%3D/g, "=");
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var illcat = getParameterByName('illcat');
if(illcat == "true") {
	var el_publisher = document.getElementById('LoanPublisher');
	el_publisher.value = getParameterByName('publisher');
	
	var el_place = document.getElementById('LoanPlace');
	el_place.value = getParameterByName('place');
	
	var el_edition = document.getElementById('LoanEdition');
	el_edition.value = getParameterByName('edition');
	
	var el_oclc = document.getElementById('ESPNumber');
	el_oclc.value = getParameterByName('oclc');
}