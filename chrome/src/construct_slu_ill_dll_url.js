/*
  this content script extracts book data from worldcat.org,
  encodes that data in a SLU ILL dll url via query strings,
  and notifies the background script to forward to that url
  
  note, because place, publisher, and oclc do not seem to be
  implemented in the dll, a second content script will run in
  the SLU ILL page to copy that data from the query strings
  to the appropriate form fields
*/

var el_authors = document.getElementById('bib-author-cell');
var vec_authors = el_authors.getElementsByTagName('a');
var authors = vec_authors[0].innerHTML;
for(var i = 1; i < vec_authors.length; i++) {
	authors = authors.concat("; ", vec_authors[i].innerHTML);
}

var el_title = document.getElementsByClassName('title')[0];
var title = el_title.innerHTML;

var el_place_publisher_year = document.getElementById('bib-publisher-cell');
var place = el_place_publisher_year.innerHTML.split(":")[0].trim().replace(" ;", ";");

var publisher = el_place_publisher_year.innerHTML.split(":")[1].split(",")[0].trim();

var date = el_place_publisher_year.innerHTML.split(":")[1].split(",")[1].trim().replace(/\./, "");

var el_edition_format_type = document.getElementById('editionFormatType');
var vec_edition_format_type = el_edition_format_type.innerHTML.split(":");
var edition = "";
if(vec_edition_format_type.length == 4)
	edition = vec_edition_format_type[3].split("<")[0].trim();

var el_out_isbn = document.getElementById('details-standardno');
var el_in_isbn = el_out_isbn.getElementsByTagName('td');
var isbn = el_in_isbn[0].innerHTML;

var el_out_oclc = document.getElementById('details-oclcno');
var el_in_oclc = el_out_oclc.getElementsByTagName('td');
var oclc = el_in_oclc[0].innerHTML;

var base_req_url = "https://illiad.slu.edu/illiad/xii/illiad.dll";
var req_url = base_req_url.concat("?",
                                  "Action=",    "10",      "&",
								  "Form=",      "30",      "&",
								  "aulast=",    authors,   "&",
                                  "title=",     title,     "&",
								  "place=",     place,     "&",
								  "publisher=", publisher, "&",
                                  "date=",      date,      "&",
								  "edition=",    edition,   "&",
								  "isbn=",      isbn,      "&",					              
								  "oclc=",      oclc,      "&",
								  "illcat=",    "true").replace(/ /g, '+');

chrome.runtime.sendMessage({"url": req_url});