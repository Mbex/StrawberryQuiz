//GLOBALS
SCORE = 0;
QUESTION_OBJECT = {};
QNUM = 0;

// FUNCTIONS
function restartResetSCORE(){
  document.getElementById("Restart").addEventListener("click", function () {
    SCORE = 0;
  });
}

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

  return new Promise(function(resolve, reject){

    // Populate Question div
    document.getElementById("question").innerHTML = question_object[qIndex].Question;

    // Populate Answer div
    Object.keys(question_object[qIndex].Answers).forEach(function(option){

      var li = document.createElement('li');
      li.setAttribute("id", option);
      li.innerHTML = '<span>'+question_object[qIndex].Answers[option].Answer+'</span>';
      document.getElementById("ulist").appendChild(li);

      resolve(null);
    });
  });
}

function evtButtonClick(ans, correctAns, allAns, question_object, qs, QNUM) {

  document.getElementById(ans).addEventListener("click", function () {

    // Make rest of screen unresponsive
     var overlay = document.createElement("div");
     overlay.className = "overlay";
     var wrapper = document.getElementById('wrapper');
     wrapper.appendChild(overlay);

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

    // show score
    console.log("SCORE: ", SCORE);

    // delayed functionality
    window.setTimeout(function () {
      // Get rid of contents
      document.getElementById("question").innerHTML = "";
      document.getElementById("ulist").innerHTML = "";
      // Remove overlay (blank div)
      overlay.remove()

      // increment and load next question
      QNUM++;
      if( QNUM < qs.length){loadQuestion(question_object, qs, QNUM)}

    }, 3000);

  });

};

var loadQuestion = function(question_object, qs, QNUM){

  var q = qs[QNUM];
  getCorrectAnswer(question_object, q).then(function(correctAns){

    var allAns = Object.keys(question_object[q].Answers);
    populateQAdivs(question_object, q, correctAns, allAns).then( function() {

      allAns.forEach(function(ans){
        evtButtonClick(ans, correctAns, allAns, question_object, qs, QNUM);
      });
    });
  });
}

// MAIN

var fname = document.URL.substr(document.URL.lastIndexOf('/')+1);
if (fname == "question.html") {

  restartResetSCORE();
  loadJSON("questions.json").then(function(QUESTION_OBJECT){

    var qs = Object.keys(QUESTION_OBJECT);

    loadQuestion(QUESTION_OBJECT, qs, QNUM);

  });
};

// restart has to reset score
