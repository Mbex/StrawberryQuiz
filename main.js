//GLOBALS
var SCORE = 0;
var QUESTION_OBJECT = {};

// FUNCTIONS
function loadJSON(filename) {

    return new Promise( function(resolve, reject) {

      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', filename, true);
      xobj.addEventListener('load', function(evt){
          resolve(JSON.parse(xobj.responseText)[0]);
      });
      xobj.addEventListener('error', function(error){
          reject(error);
      })
      xobj.send(null);
    });
}

function getCorrectAnswer(question_object, qIndex) {

  return new Promise( function (resolve, reject){

    var Ans = question_object[qIndex].Answers;
    Object.keys(Ans).forEach(function(option){
      if (Ans[option].Points == 1){
        resolve(option);
      };
      reject(error);
    });
  });
}

function populateQAdivs(question_object, qIndex, correctAns) {

  // Populate Question div
  document.getElementById("question").innerHTML = question_object[qIndex].Question;

  // Populate Answer div
  var answer_list = document.getElementById("ulist");
  Object.keys(question_object[qIndex].Answers).forEach(function(option){

    var info = question_object[qIndex].Answers[option];
    var li = document.createElement('li');
    li.setAttribute("id", option);
    li.innerHTML = '<a>'+info.Answer+'</a>';

    li = evtButtonClick(li, correctAns);

    answer_list.appendChild(li);

  });
}

function evtButtonClick(li, correctAns) {

  li.addEventListener("click", function () {

    // Change colour of div
    if (li.id == correctAns){
      li.style.backgroundColor = "green";
      SCORE += 1;
    } else {
      li.style.backgroundColor = "red";
    };
  });
  return li;
};


// MAIN
loadJSON("questions.json").then(function(QUESTION_OBJECT){

  var q = "Q1";

  getCorrectAnswer(QUESTION_OBJECT, q).then(function(correctAns){

    populateQAdivs(QUESTION_OBJECT, q, correctAns);


  });
});


// Add event listener to:
//    grey out buttons
//    repopulate div
