// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, push, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTwFFZyJod5QkiY5OI9sG3IsWC-D5i_9Y",
  authDomain: "quizapp-b8b08.firebaseapp.com",
  projectId: "quizapp-b8b08",
  storageBucket: "quizapp-b8b08.appspot.com",
  messagingSenderId: "560301782775",
  appId: "1:560301782775:web:b6ed234bb04a60dc27c5f2",
  measurementId: "G-YV7JXQE6H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var question = document.getElementById('question');
var option = document.getElementById('option');
var optionParent = document.getElementById('option-parent');
var correctOption = document.getElementById('correctAns');


var options = [];
var correctAns;

window.addOption = function(){
  option.innerHTML =""
  optionParent.innerHTML="";
  options.push(option.value)
  renderOption()
}
 function renderOption(){
  for(var i=0; i<options.length; i++){
    optionParent.innerHTML += `<li onclick="addCorectAns('${options[i]}')">${options[i]}</li>`;
    // optionParent.innerHTML += `<li onclick="addCorectAns('${options[i]}')">${options[i]}</li>`;

  }
 }

window.addCorectAns = function (e){
correctAns = e;
correctOption.innerHTML = correctAns
}
window.subQuest = function() {
  var obj = {
      question: question.value,
      options: options,
      correctAns: correctAns
  };

  var newQuestionRef = push(ref(db, 'qustions/')); 
  var questionKey = newQuestionRef.key; 

  set(ref(db, 'qustions/' + questionKey), obj).then(function(){
    alert("question is added")
    question.value="";
    option.value=""
  }) 
}

