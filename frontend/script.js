// Mood history data
let moodData = {
stress:0,
sad:0,
angry:0,
happy:0,
neutral:0
};

let chart;


// Quotes based on mood
const quotes = {

stress:[
"Take a deep breath. Everything will be okay.",
"Small steps every day lead to big changes.",
"Relax your mind and let go of stress."
],

sad:[
"Difficult roads often lead to beautiful destinations.",
"You are stronger than you think.",
"Every day is a new beginning."
],

angry:[
"Peace begins with a calm mind.",
"Pause, breathe, and choose calmness.",
"Anger fades when patience grows."
],

happy:[
"Keep shining and spreading positivity.",
"Happiness grows when shared.",
"Your smile makes the world brighter."
],

neutral:[
"Believe in yourself.",
"Stay positive and keep moving forward.",
"Every moment is a fresh start."
]

};



// Mood detection
function detectMood(message){

message = message.toLowerCase();

if(message.includes("stress") || message.includes("tired") || message.includes("pressure")){
return "stress";
}

else if(message.includes("sad") || message.includes("upset") || message.includes("unhappy")){
return "sad";
}

else if(message.includes("angry") || message.includes("mad")){
return "angry";
}

else if(message.includes("happy") || message.includes("good") || message.includes("great")){
return "happy";
}

else{
return "neutral";
}

}



// Main chat function
function sendMessage(){

let input = document.getElementById("userInput");
let message = input.value;

if(message.trim() === "") return;

let messageArea = document.getElementById("messages");


// Show user message
let userMsg = document.createElement("p");
userMsg.className = "user";
userMsg.innerHTML = "<b>You:</b> " + message;
messageArea.appendChild(userMsg);


// Detect mood
let mood = detectMood(message);


// Update mood history
moodData[mood]++;
updateChart();
updateStressLevel();


// Typing animation
let typingMsg = document.createElement("p");
typingMsg.className = "bot";
typingMsg.innerHTML = "<i>SerenityAI is typing...</i>";
messageArea.appendChild(typingMsg);


// AI response delay
setTimeout(function(){

typingMsg.remove();

let response = "";

if(mood === "stress"){
response = "It sounds like you're feeling stressed. Try taking a deep breath and relaxing for a moment.";
}
else if(mood === "sad"){
response = "I'm sorry you're feeling sad. Remember that difficult moments pass.";
}
else if(mood === "angry"){
response = "Take a moment to pause and breathe. Calmness can help clear the mind.";
}
else if(mood === "happy"){
response = "That's wonderful to hear! Keep spreading positivity.";
}
else{
response = "I'm here for you. Tell me more about how you're feeling.";
}


// Random quote
let moodQuotes = quotes[mood];
let randomQuote = moodQuotes[Math.floor(Math.random()*moodQuotes.length)];

response += "<br><br><i>Quote:</i> " + randomQuote;


// Game suggestion
let gameSuggestion = "";

if(mood === "stress"){
gameSuggestion = '<a href="breathing.html" target="_blank">Play Breathing Relaxation Exercise</a>';
}
else if(mood === "sad"){
gameSuggestion = '<a href="bubble.html" target="_blank">Play Bubble Pop Relaxation Game</a>';
}
else if(mood === "angry"){
gameSuggestion = '<a href="breathing.html" target="_blank">Play Breathing Relaxation Exercise</a>';
}
else if(mood === "happy"){
gameSuggestion = '<a href="bubble.html" target="_blank">Play Bubble Pop Game</a>';
}
else{
gameSuggestion = '<a href="bubble.html" target="_blank">Try a Relaxation Game</a>';
}

response += "<br><br><b>Relaxation Activity:</b> " + gameSuggestion;


// Show AI response
let botMsg = document.createElement("p");
botMsg.className = "bot";
botMsg.innerHTML = "<b>SerenityAI:</b> " + response;
messageArea.appendChild(botMsg);

},1500);


// Clear input
input.value = "";

}



// Mood chart
function updateChart(){

let ctx = document.getElementById("moodChart").getContext("2d");

if(chart){
chart.destroy();
}

chart = new Chart(ctx,{
type:"bar",
data:{
labels:["Stress","Sad","Angry","Happy","Neutral"],
datasets:[{
label:"Mood Count",
data:[
moodData.stress,
moodData.sad,
moodData.angry,
moodData.happy,
moodData.neutral
]
}]
},
options:{
responsive:true
}
});

}



// Stress level indicator
function updateStressLevel(){

let stress = moodData.stress;
let sad = moodData.sad;
let angry = moodData.angry;

let totalNegative = stress + sad + angry;

let levelText = document.getElementById("stressLevel");

if(!levelText) return;

if(totalNegative <= 2){
levelText.innerHTML = "Stress Level: Low";
}
else if(totalNegative <= 5){
levelText.innerHTML = "Stress Level: Medium";
}
else{
levelText.innerHTML = "Stress Level: High";
}

}
