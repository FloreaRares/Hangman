var word, correctAttempts = 0, incorrectAttempts = 0;
var hangmanImages = ["Images/1.jpg", "Images/2.jpg", "Images/3.jpg", "Images/4.jpg", "Images/5.jpg", "Images/6.jpg"];

function userConfirms() {
	word = $('#word').val().toUpperCase();
	var confirmButton = document.getElementById("confirmWord");
	confirmButton.setAttribute("disabled", "");
	generateCase(word);
	generateKeyboard();
}

function generateCase() {
	for(var i = 0; i < word.length; ++i) {
		$('#wordLetters').append(`
			<input class ="letterCase" id ="` + i + `" type ="text" maxlength="1" disabled/>
		`);
	}
}

function generateKeyboard() {
	for(var i = 65; i <= 90; ++i) {
		$('#keyboard').append(`
			<button type="button" class="btn btn-secondary btn-lg" id ="` + String.fromCharCode(i) + `" onClick ="checkMatch(this.id);">` + String.fromCharCode(i) + `</button> 				   
		`);
	}
}

function correctGuess(pressedButtonId, letterCaseIndex) {
	++correctAttempts;
	var caseMatch = document.getElementById(letterCaseIndex);
	caseMatch.setAttribute("value", pressedButtonId);
	var button = document.getElementById(pressedButtonId);
	button.setAttribute("disabled", "");
	if(correctAttempts == word.length) {
		gameWon();
	}
}

function incorrectGuess(pressedButtonId) {
	++incorrectAttempts;
	document.getElementById("incorrectInput").innerHTML = parseInt(document.getElementById("incorrectInput").innerHTML) + 1;
	var button = document.getElementById(pressedButtonId);
	button.setAttribute("disabled", "");
	if(incorrectAttempts == 6) {
		gameLost();
	}
}

function checkMatch(pressedButtonId) {
	var match = false;
	for(var i = 0; i < word.length; ++i) {
		if(word[i] == pressedButtonId) {
			correctGuess(pressedButtonId, i);
			match = true;
		}	
	}
	if(match == false) {
		incorrectGuess(pressedButtonId);
	}
}

function resetGame() {
	location.reload();
}

function gameWon() {
	$('#outputMessage').append(`
		<span style="font-size: 40px;"><strong>You won!</strong></span>
	`);
	$(':button').prop('disabled', true);
}

function gameLost() {
	$('#outputMessage').append(`
		<span style="font-size: 40px;"><strong>You lost!</strong></span>
	`)
	$(':button').not('#resetButton').prop('disabled', true);
}

