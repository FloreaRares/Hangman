const hangmanImages = ["Images/1.jpg", "Images/2.jpg", "Images/3.jpg", "Images/4.jpg", "Images/5.jpg", "Images/6.jpg"];
var correctAttempts = 0, incorrectAttempts = 0, word;

function userConfirms() {
	word = document.getElementById("word").value.toUpperCase();
	document.getElementById("confirmWord").setAttribute("disabled", "");
	generateInterface();
}

function generateInterface() {
	for(let i = 0; i < word.length; ++i) {
		document.getElementById("wordLetters").innerHTML += `<input class ="letterCase" id ="` + i + `" type ="text" maxlength="1" disabled/>`; 
	}
	for(let i = 65; i <= 90; ++i) {
		document.getElementById("keyboard").innerHTML += `<button type ="button" class ="btn btn-secondary btn-lg" id ="` + String.fromCharCode(i)+ `" onClick ="checkMatch(this.id);">` + String.fromCharCode(i) + `</button>`; 
	}
}

function correctGuess(pressedButtonId, letterCaseIndex) {
	++correctAttempts;
	document.getElementById(letterCaseIndex).setAttribute("value", pressedButtonId);
	document.getElementById(pressedButtonId).setAttribute("disabled", "");
	if(correctAttempts == word.length) {
		gameEnd("win");                                              
	}
}

function incorrectGuess(pressedButtonId) {
	++incorrectAttempts;
	document.getElementById("incorrectInput").innerHTML = parseInt(document.getElementById("incorrectInput").innerHTML) + 1;
	document.getElementById(pressedButtonId).setAttribute("disabled", "");
	if(incorrectAttempts < 6) {
		document.getElementById("hangmanImage").src = hangmanImages[incorrectAttempts];
	} else {
		gameEnd("lose");                                            
	}
}

function checkMatch(pressedButtonId) {
	var match = false;
	for(let i = 0; i < word.length; ++i) {
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

function gameEnd(gameStatus) {
	if(gameStatus == "win") {
		document.getElementById("outputMessage").innerHTML += '<span style="font-size: 40px;"><strong>You won!</strong></span>';
	} else {
		document.getElementById("outputMessage").innerHTML += '<span style="font-size: 40px;"><strong>You lost!</strong></span>';
	}
	const buttons = document.querySelectorAll(".btn-secondary");
	for(let i = 0; i < buttons.length; ++i) {
		buttons[i].setAttribute("disabled", "");
	}
}


