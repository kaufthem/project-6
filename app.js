const qwerty = document.getElementById('qwerty'), 
phrase = document.getElementById('phrase'),
overlay = document.getElementById('overlay'),
startButton = document.querySelector('.btn__reset'),
tries = document.getElementsByTagName('img');

phrases = [
    'tell me what you see',
    'can you guess the phrase',
    'i love javascript',
    'web development is fun',
    'congratulations you won'
];

let missed = 0,

phraseArray = getRandomPhraseAsArray(phrases);

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    addPhrasetoDisplay(phraseArray);
    startButton.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    return arr[Math.floor(Math.random()*arr.length)].split("");
}

function addPhrasetoDisplay(arr) {
    const list = phrase.getElementsByTagName('ul')[0];
    for (let i = 0; i < arr.length; i++) {
        let item = document.createElement('li'),
            content = document.createTextNode(arr[i]);
        if (arr[i] !== ' ') {
            item.className = 'letter';
        } else {
            item.className = 'space';
        }
        item.appendChild(content);
        list.appendChild(item);
    }
}

function checkLetter(letter) {
    let letters = document.getElementsByClassName('letter'), 
    match = null;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === letter.textContent) {
            letters[i].className += ' show';
            match = letters[i];
        }
    }
    return match;
}

qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === "BUTTON") {
        let letterFound = checkLetter(event.target);
        event.target.className = 'chosen';
        event.target.disabled = true;
        if (letterFound === null) {
            missed++;
            tries[5-missed].src = "images/lostHeart.png";
        }
        checkWin();
    }
});

function checkWin() {
    const letters = document.getElementsByClassName('letter'), 
    revealed = document.getElementsByClassName('show'), 
    overlayTitle = overlay.getElementsByClassName('title')[0];

    if (letters.length === revealed.length) {
        overlay.style.display = '';
        overlay.className = 'win';
        overlayTitle.textContent = "You won!"
    }

    if (missed === 5) {
        overlay.style.display = '';
        overlay.className = 'lose';
        overlayTitle.textContent = "You lost!"
    }
}