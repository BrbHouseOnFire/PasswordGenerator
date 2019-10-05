
// ----------------------------------------------------------
// Database value Setup
// 26 values, array 0
var lowerArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
// 26 values, array 1
var upperArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// 10 values, array 2
var numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
// 16 values, array 3
var symbolsArr = ["!","@","#","$","%","^","&","*","(",")",";",":","-","_","=","+"]
// array of arrays
var database = [lowerArr, upperArr, numbersArr, symbolsArr]


// ----------------------------------------------------------
// Input variable Initialization
var passLength = 0;
var inputLow = false;
var inputUp = false;
var inputNum = false;
var inputSym = false;
var inputs = false;
var arrayChoices = [false, false, false, false];
// array of functions // functions[position](input);
var functions = [getLower, getUpper, getNum, getSym];
// final password
var pass = [];

// ----------------------------------------------------------
// Event Functions

function copy() {


    // IE specific code written by a dork to prevent textarea being shown while dialog is visible.
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text); 
    } 
    // 
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea"); // create a new html textarea element
        textarea.textContent = passBox.innerHTML; // store passBox into the textarea
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Edge browser.
        document.body.appendChild(textarea); // Attach new html element to the DOM
        textarea.select();  // Select the new html element
        textarea.setSelectionRange(0, 99999); // Mobile responsive selection
        try { // error handling (browsers don't like automatic clipboard editing)
            return document.execCommand("copy"); // attempt to copy to the clipboard
        } catch (ex) { // if the browser fails to copy, throw an exception
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally { // regardless of copying result, remove new html element
            document.body.removeChild(textarea);
        }
    }
}

function generate() {
    // Reset input values
    passLength = 0;
    inputLow = false;
    inputUp = false;
    inputNum = false;
    inputSym = false;
    inputs = false;
    arrayChoices = [false, false, false, false];
    // array of functions // functions[position](input);
    functions = [getLower, getUpper, getNum, getSym];
    // final password
    pass = [];
    passdebug = [];

    // ----------------------------------------------------------
    // Ask user for Inputs
    while (passLength < 8 || passLength > 128) {
        passLength = prompt("How many characters would you like in your password? (8-128)");
        if (passLength < 8 || passLength > 128) {
            alert("That was not a valid value.");
        }
    }

    while (inputs === false) {
        inputLow = confirm("Include lowercase letters?");
        inputUp = confirm("Include uppercase letters?");
        inputNum = confirm("Include numbers?");
        inputSym = confirm("Include special characters?");
        // value validation
        if (inputLow === false && inputUp === false && inputNum === false && inputSym === false) {
            alert("You must select OK for at least one choice.");
        }
        else {
            // break loop
            inputs = true;
        }
    }
    if (inputs === true) {
        // define valid database arrays to pull values from
        arrayChoices = [inputLow, inputUp, inputNum, inputSym];
    }
    // ----------------------------------------------------------

    // Based on inputs, choose exactly 1 value from each selection and add to the password.
    // track the position within the password
    var position = 0;
    // guarantee 1 random value for each of the specified picks
    for (var i = 0; i < 4; i++) {
        // if they chose OK for the input type
        if (arrayChoices[i] === true) {
            // grab 1 random value of the specified type and store it into the password
            pass[position] = functions[i]();
            // move forward 1 position within the new password
            position++;
        }
    }

    // Based on passLength and our current position, loop through remaining pass positions
    while (position < passLength) {
        // pick an array to choose from, and pick a value from that array in the database,
        // then store it to the next position in the password
        pass[position] = functions[getArray(arrayChoices)]();
        // advance position within the password
        position++;
    }

    // randomize the password
    pass = shuffle(pass);

    // convert password to a string
    var password = "";
    for (var i = 0; i < pass.length; i++) {
        password = password + pass[i];
    }

    // display password string
    passBox.innerHTML = password;

} // End of Generate Button
// End of Event Functions
// ----------------------------------------------------------


// ----------------------------------------------------------
// Utility Functions
// Returns a random integer between 0 (inclusive) and the input (non-inclusive).
function getRandomInt(int) {
    return Math.floor(Math.random() * Math.floor(int));
}

// grab random character functions
function getLower() {
    return lowerArr[getRandomInt(26)];
}
function getUpper() {
    return upperArr[getRandomInt(26)];
}
function getNum() {
    return numbersArr[getRandomInt(10)];
}
function getSym() {
    return symbolsArr[getRandomInt(16)];
}

// grab a valid array choice
function getArray(array) { // takes in an array of booleans length 4
    // returns a value between 0-3 based on the user's initial input choices
    var value = -1;
    var temp = -1;
    while (value === -1) {
        temp = getRandomInt(4);
        // if array was selected by user
        if (array[temp] === true) {
            // return generic value indicating the randomly selected array
            value = temp;
        }
    }
    return value;
}


// Fisher-Yates (aka Knuth) unbiased array shuffler.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a random remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



