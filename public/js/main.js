var phrase = $(".phrase").text();
var words = phrase.split(" ");
var numberOfWords = words.length;
var phraseLength = $("#phrase-length");

phraseLength.text(numberOfWords);

//console.log(phraseLength)