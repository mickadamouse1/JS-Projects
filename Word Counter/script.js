var textBox = document.getElementById("textBox");
var btnCount = document.getElementById("btnCount");
var output = document.getElementById("output");
var sentence = textBox.value;

function getNumOfWord(word, sentence) {
  var arr = [];
  for (var i = 0; i < sentence.length; i++) {
    if (sentence[i] == word) {
      if (!word) {
        console.log("Not a word");
      } else {
        arr.push(sentence[i]);
        var numWord = (`${word}: Appeared ${arr.length} times in this sentence.\n`);
        numWord = numWord.charAt(0).toUpperCase() + numWord.slice(1);
      }
    }
  }
  return numWord;
}

function getWord(sentence) {
  var sentence = sentence;
  sentence = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  sentence = sentence.toLowerCase().split(" ");
  var uniqWords = [...new Set(sentence)];
  var arrToPrint = [];
  for (var i = 0; i < uniqWords.length; i++) {
    var outputWord = getNumOfWord(uniqWords[i], sentence);
    arrToPrint.push(outputWord);

  }
  arrToPrint = arrToPrint.join("");
  return arrToPrint;
}

btnCount.onclick = function() {
  sentence = textBox.value.replace(/(\r\n|\n|\r)/gm," ");
  if (sentence) {
    output.innerHTML = getWord(sentence);
  } else {
    console.log("Type something in!");
  }
}
