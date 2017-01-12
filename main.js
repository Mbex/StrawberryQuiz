//GLOBALS
var SCORE = 0;
QUESTION_OBJECT = {};
var CLICKS = 0;

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
    });
  });
}

function populateQAdivs(question_object, qIndex, correctAns, allAns) {

  // Populate Question div
  document.getElementById("question").innerHTML = question_object[qIndex].Question;

  // Populate Answer div
  var answer_list = document.getElementById("ulist");
  Object.keys(question_object[qIndex].Answers).forEach(function(option){

    var info = question_object[qIndex].Answers[option];
    var li = document.createElement('li');
    li.setAttribute("id", option);
    li.innerHTML = '<span>'+info.Answer+'</span>';

    li = evtButtonClick(li, correctAns, allAns, question_object, qIndex);

    answer_list.appendChild(li);

  });
}

function evtButtonClick(li, correctAns, allAns, question_object, qIndex) {

  li.addEventListener("click", function () {

    // Grey out other options
    allAns.forEach( function(ea) {
      document.getElementById(ea).style.backgroundColor = "grey";
    });

    // Change colour of div based on correct answer
    if (this.id == correctAns){
      this.style.backgroundColor = "green";
      SCORE += 1;
    } else {
      this.style.backgroundColor = "red";
      document.getElementById(correctAns).style.backgroundColor = "green";
    };

    // Make rest of screen unresponsive
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    var wrapper = document.getElementById('wrapper');
    wrapper.appendChild(overlay);

    // Get rid of contents
    window.setTimeout(function () {
      document.getElementById("question").innerHTML = "";
      document.getElementById("ulist").innerHTML = "";
      loadQuestion(question_object, qIndex);  !!!!!!!!!!!!!!!!!!!!
    }, 3000);

    // move question on
    q = qs + 1 !!!!!!!!!!!!!!!!!!!!

    // Remove overlay (blank div)
    overlay.remove()

   console.log("SCORE: ", SCORE);
  });

  return li;

};

function loadQuestion(QUESTION_OBJECT, q) {
  getCorrectAnswer(QUESTION_OBJECT, q).then(function(correctAns){
    var allAns = Object.keys(QUESTION_OBJECT[q].Answers);
    populateQAdivs(QUESTION_OBJECT, q, correctAns, allAns);
  });
};


// MAIN
loadJSON("questions.json").then(function(QUESTION_OBJECT){

  var i = 0;
  var qs = Object.keys(QUESTION_OBJECT);
  var q = qs[i];

  loadQuestion(QUESTION_OBJECT, q);

});


// Add event listener to:
//    grey out buttons
//    repopulate div


// restart has to reset score
