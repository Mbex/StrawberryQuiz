var SCORE = 0;
var QUESTION_OBJECT = {};

function loadJSON(filename, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns
      // undefined in async mode so use a callback
      var jsonresponse = callback(xobj.responseText);
      return jsonresponse
    }
  }
  xobj.send(null);
}


// Load question information
question_object = loadJSON('questions.json', function(response) {
  var question_object = JSON.parse(response)[0];

    // populate questions
    document.getElementById("question").innerHTML = question_object.Q1.Question;
    var answer_list = document.getElementById("ulist");


    // populate answers
    Object.keys(question_object.Q1.Answers).forEach(function(option){

        var info = question_object.Q1.Answers[option];
        var li = document.createElement('li');
        li.setAttribute("id", option);
        li.innerHTML = '<a>'+info.Answer+'</a>';

        // Add click event listener to each li element
        // change color
        // add to total
        // grey out buttons
        li.addEventListener("click", function (a) {
          SCORE += info.Points;
          console.log(option, SCORE);
          if (info.Points == 1){
            li.style.backgroundColor = "green";
          } else {
            li.style.backgroundColor = "red";
            document.getElementById('A').style.backgroundColor = "green";
          }
        });

        answer_list.appendChild(li);

    });



});
