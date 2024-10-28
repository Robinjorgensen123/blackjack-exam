// Array med alla bokstäver! // Robin
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


    // Hämtar DOM-element för användarinput och visning av ord och felaktiga gissningar // Robin
    const letterInput = document.getElementById('singleLetterInput');
    const wordLabel = document.getElementById('wordLabel');
    const wrongGuessesDisplay = document.getElementById('wrongGuessesDisplay');

    // Skapar och lagrar ett slumpmässigt valt ord från en extern array // Robin
    let secretWord = getRandomWord();

    // Funktion för att hämta ett slumpmässigt ord // Robin
    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * randomWords.length);
        return randomWords[randomIndex];
    }

    // Initierar visningen av det hemliga ordet med understrykningar för varje bokstav // Robin
    let displayedWord = Array(secretWord.length).fill('_').join(' ');
    console.log('Ditt ord är', secretWord);

    // Variabler för att spåra antalet fel och felaktiga bokstäver // Robin
    let wrongGuesses = 0;
    let incorrectLetters = [];
 
    // Kontrollerar om den gissade bokstaven finns i det hemliga ordet // Robin
    const validLetters = function(letter) {
        let found = false; // Flagga för att kolla om bokstaven hittades // Robin

        // Loopar igenom det hemliga ordet // Robin
        for (let i = 0; i < secretWord.length; i++) {
            // Om bokstaven finns, uppdatera visningen // Robin
            if (secretWord[i] === letter) {
                displayedWord = displayedWord.split(''); // Konverterar sträng till array
                displayedWord[i] = letter; // Uppdaterar bokstaven i arrayen
                displayedWord = displayedWord.join(''); // Konverterar tillbaka till sträng
                found = true; // Markerar att bokstaven hittades
            }
        }

        // Om bokstaven inte hittades och den inte redan är i felaktiga bokstäver // Robin
        if (!found && !incorrectLetters.includes(letter)) {
            incorrectLetters.push(letter); // Lägger till felaktig bokstav
        }

        // Uppdaterar visningen av ordet och felaktiga bokstäver // Robin
        wordLabel.innerText = displayedWord;
        wrongGuessesDisplay.innerText = `Wrong letters: ${incorrectLetters.join(', ')}`;
    };

    // Lyssnar efter ENTER-tangenten i input-fältet // Robin
    letterInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const letter = letterInput.value.toLowerCase(); // Hämtar och konverterar bokstaven till små bokstäver
            // Kontrollerar att bokstaven är giltig
            if (letter && letter.length === 1) {
                validLetters(letter); // Kontrollerar bokstaven mot det hemliga ordet
                letterInput.value = ''; // Rensar input-fältet
            }
        }
    });

    // Initialiserar visningen av ordet // Robin
    wordLabel.innerText = displayedWord;

    // Lyssnar efter klick på knappen för att återställa spelet // Robin
    document.querySelector('#reset-game').addEventListener('click', resetGame);

    // Funktion för att återställa spelet // Robin
    function resetGame() {
        secretWord = getRandomWord(); // Väljer ett nytt hemligt ord
        displayedWord = Array(secretWord.length).fill('_').join(' '); // Återställer visningen av ordet
        wrongGuesses = 0; // Återställer antalet fel
        incorrectLetters = []; // Återställer listan med felaktiga bokstäver
        wordLabel.innerText = displayedWord; // Uppdaterar visningen av ordet
        wrongGuessesDisplay.innerText = ''; // Rensar visningen av felaktiga bokstäver
        console.log('Ditt nya ord är:', secretWord); // Loggar det nya hemliga ordet
    }

