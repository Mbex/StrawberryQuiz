var SCORE = 0;

function loadJSON(filename, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns
      // undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

// Load question information
loadJSON('questions.json', function(response) {
jsonresponse = JSON.parse(response);
console.log(jsonresponse[0]);
});

// load answer information
loadJSON('answers.json', function(response) {
jsonresponse = JSON.parse(response);
console.log(jsonresponse[0]);
});
