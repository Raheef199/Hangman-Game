// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array from Letters
let lettersArray = Array.from(letters);
console.log(lettersArray);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create span
  let span = document.createElement("span");

  // Create letter text node
  let theLetter = document.createTextNode(letter);

  // Append the letter to span
  span.appendChild(theLetter);

  // Add class to span
  span.className = "letter-box";

  // Append span to the letters container
  lettersContainer.appendChild(span);
});

// Object of words + Categories
const words = {
  programming: [
    "java",
    "php",
    "go",
    "scala",
    "javascript",
    "fortran",
    "mysql",
    "python",
    "assembly",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "The Matrix",
    "Fight Club",
    "The Lord of the Rings: The Return of the King",
    "The Empire Strikes Back",
  ],
  people: [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
  ],
  countries: ["Syria", "KSA", "Egypt", "Palestine", "Yemen", "Qatar"],
};

// Get random property
let allKeys = Object.keys(words); // gets all keys from a certain object
console.log(allKeys);

// Random number depending on key length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number depending on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The chosen word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Elements
let lettersGuessContainer = document.querySelector(".letters-guess");

// Set Wrong attempts
let wrongAttempts = 0;

// Select the draw element
let theDraw = document.querySelector(".hangman-draw");

// Convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);

// Create spans depending on word
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    emptySpan.className = "has-space";
  }

  // Append Spans to the letters guess container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

let guessSpansArr = Array.from(guessSpans).filter((span) => {
  span.classList.contains("has-space");
});
console.log(guessSpansArr);

// Handle Clicking on letters
document.addEventListener("click", (e) => {
  // Set The chose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    console.log(theClickedLetter);

    // The chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If the clicked letter equal to one of the chosen word
      if (theClickedLetter == wordLetter) {
        console.log(`Found at index number ${wordIndex}`);

        // Set the status to correct
        theStatus = true;

        // lOOP ON ALL GUESS SPANS
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = theClickedLetter;
            if (
              theClickedLetter ===
                lettersAndSpace[lettersAndSpace.length - 1] &&
              isArrayFull()
            ) {
              wonGame();
            }
          }
        });
      }
    });
    // Outside Loop
    if (theStatus !== true) {
      wrongAttempts++;

      // Add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play fail sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

// If letter chosen by user is wrong

function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word is [ ${randomValueValue} ]`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append to the body
  document.body.appendChild(div);
}

function wonGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Congrats! You Won.`);
  div.className = "won";
  div.appendChild(divText);
  document.body.appendChild(div);
}

function isArrayFull() {
  return lettersAndSpace.length === guessSpansArr.length;
}
