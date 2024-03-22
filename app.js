// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const refence = ref(db,'qustions/')
var questions = []

function getData(){
    onChildAdded(refence,function(data){
        questions.push(data.val())
        questionDisplay();
    })
}
getData()
var quesDspl = document.getElementById("questionDisplay");
var optionDispl = document.getElementById('optionDisplay');
var mainDiv = document.getElementById('mainDiv');
var totalQuestion = document.getElementById('totalQuesN');
var coutnQuestion = document.getElementById('questionCount');
var marks = 0;
var index = 0;

function questionDisplay(){
    optionDispl.innerHTML = "";
    quesDspl.innerHTML= questions[index].question;

    for (var i=0; i<questions[index].options.length; i++){
        var optionValue = questions[index].options[i];
        var correctValue = questions[index].correctAns;
        optionDispl.innerHTML +=`<button onclick="checkQuestion('${optionValue}','${correctValue}')" onclick="changeC(this)" class="col-md-6  p-3 border rounded-4 mt-2 ms-2" id="btn">${questions[index].options[i]}</button>`
        
    }
    totalQuestion.innerHTML=questions.length;
    coutnQuestion.innerHTML = index + 1;
}

window.checkQuestion= function (a,b){
  
    if(a==b) {
        marks++;
    }
    
}

window.nextQuestion=function (){
    if(index+1 === questions.length){
        resultDisplay();
    } else {
        index++;
        questionDisplay();
    }
}

window.resultDisplay=function(){
    var resultShow = document.getElementById('resultDisplay');
    var mark = document.getElementById('marks')
    var outof = document.getElementById('outof')
    var percentage = document.getElementById('percentage')
    
    if (resultShow){
        mainDiv.style.display = "none";
        resultShow.style.display = "block";
        mark.innerHTML = `${marks}`
        outof.innerHTML= `${questions.length}`;
        percentage.innerHTML = `${Math.round((marks*100)/questions.length)}%`

        // resulth.innerHTML = `your reult is ${marks} out of ${questions.length} and percntag is ${Math.round((marks*100)/questions.length)}%`
    }
}

 