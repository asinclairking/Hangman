// Declare global variables
var word = document.getElementById('word'),
    letters = document.getElementById('divkeys'),
    picture = document.getElementById('pic'),
    arrayword, arraywordlength, ctwrong, ctright;

function init() {
    $('#divselect').click(selectword);
    // Rescale the picture if the screen is wider than 700px
    if (window.innerWidth >= 700) {
        picture.getContext('2d').scale(1.5, 1.5);
    }
}

function selectword() {
    var underscores = '',
		fragment = document.createDocumentFragment(),
		alphabetarray = ['A', 'B', 'C', 'D', 'E',
                    'F', 'G', 'H', 'I', 'J',
                    'K', 'L', 'M', 'N', 'O',
                    'P', 'Q', 'R', 'S', 'T',
                    'U', 'V', 'W', 'X', 'Y',
                    'Z'];
    ctwrong = 0;
    ctright = 0;
    // Get the random word from the array
    arrayword = getwordfromarray();
    arraywordlength = arrayword.length;
    // Create a string of underscore characters - 1 underscore for each letter in the array word
    for (var i = 0; i < arraywordlength; i++) {
        underscores += '_';
    }
    // Display the underscores in the word paragraph
    word.innerHTML = underscores;

    // Create a div for each of the alphabet letters which will be used to select the letters
    letters.innerHTML = '';
    for (i = 0; i < 26; i++) {
        var div = document.createElement('div');
        div.innerHTML = alphabetarray[i];
        div.style.cursor = 'pointer';
        div.onclick = selectletter;
        fragment.appendChild(div);
    }
    letters.appendChild(fragment);
    drawpicture();
}

// Get a random word from the array
function getwordfromarray() {
    var arr = new Array('antidisestablishmentarianism', 'bikes', 'cheeseburgers', 'crackerjack', 'fusion', 'mammalian');
    var index = parseInt(arr.length * Math.random());
    return arr[index];
}

// Select a letter
function selectletter() {
    var underscores = word.innerHTML,
        wrongGuess = true;
    // Split the underscores into an array
    underscores = underscores.split('');
    // Check if the selected letter matches a letter in the word
    for (var i = 0; i < arraywordlength; i++) {
        // If a letter is matched then display the letter instead of the underscore
        if (arrayword.charAt(i) == this.innerHTML.toLowerCase()) {
            underscores[i] = this.innerHTML;
            wrongGuess = false;
            // Increment the count of correct letters
            ctright++;
            if (ctright == arraywordlength) {
                drawpicture();
            }
        }
    }
    // If the selected letter was not in the word...
    if (wrongGuess) {
        // ... add 1 to the count of wrong letters
        ctwrong++;
        // ... and draw the next piece of the picture
        drawpicture();
    }
    word.innerHTML = underscores.join('');
    // Blank out the letter
    this.innerHTML = '&nbsp;';
    // Remove the pointer style
    this.style.cursor = 'default';
    // Make the letter unclickable
    this.onclick = null;
}

// Draw the picture
function drawpicture() {
    var contextobj = picture.getContext('2d');
    // clear the canvas
    picture.width = picture.width;
    contextobj.lineWidth = 2;
    contextobj.strokeStyle = 'black';
    contextobj.font = 'bold 18pt Times New Roman, Arial, sans-serif';
    contextobj.fillStyle = 'red';

    if (ctwrong > 0) {
        // draw the base line from left to right
        drawLine(contextobj, 10, 150, 150, 150);
        if (ctwrong > 1) {
            // Draw the vertical line upwards
            drawLine(contextobj, 20, 150, 20, 10);
        }
        if (ctwrong > 2) {
            // Draw the horizontal line from left to right
            contextobj.lineTo(140, 10);
            contextobj.stroke();
        }
        if (ctwrong > 3) {
            // Draw the angle diagonally upwards
            drawLine(contextobj, 20, 40, 50, 10);
            contextobj.stroke();
        }
        if (ctwrong > 4) {
            contextobj.lineWidth = 2;
            // Draw rope
            drawLine(contextobj, 115, 10, 115, 25);
        }
        if (ctwrong > 5) {
            // Draw head
            contextobj.beginPath();
            contextobj.moveTo(130, 40);
            contextobj.arc(115, 40, 15, 0, (Math.PI / 180) * 360);
            contextobj.stroke();
        }
        if (ctwrong > 6) {
            // Draw body
            drawLine(contextobj, 115, 55, 115, 105);
        }
        if (ctwrong > 7) {
            // Draw left arm
            drawLine(contextobj, 115, 70, 90, 90);
        }
        if (ctwrong > 8) {
            // Draw right arm
            drawLine(contextobj, 115, 70, 140, 90);
        }
        if (ctwrong > 9) {
            // Draw left leg
            drawLine(contextobj, 115, 105, 100, 135);
        }
        if (ctwrong > 10) {
            // Draw right leg
            drawLine(contextobj, 115, 105, 130, 135);
            contextobj.fillText('You lose!', 25, 180);
            // Hide the keys
            letters.innerHTML = '';
            // Display the word
            setTimeout(displayword, 200);
        }
    }
    // Check if the word has been guessed correctly
    if (ctright == arraywordlength) {
        // Hide the keys
        letters.innerHTML = '';
        // Display success message
        contextobj.fillText('You win!', 25, 180);
    }
}

function drawLine(context, X1, Y1, X2, Y2) {
    context.beginPath();
    // Set the start point of the line
    context.moveTo(X1, Y1);
    // Set the end point of the line
    context.lineTo(X2, Y2);
    // Draw the line
    context.stroke();
}

// Display the full word
function displayword() {
    var underscores = word.innerHTML;
    underscores = underscores.split('');
    for (i = 0; i < arraywordlength; i++) {
        if (underscores[i] == '_') {
            underscores[i] = '<span>' + arrayword.charAt(i).toUpperCase() + '</span>';
        }
    }
    word.innerHTML = underscores.join('');
}
