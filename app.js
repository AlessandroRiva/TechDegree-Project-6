const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementById('button-start');
const overlay = document.getElementById('overlay');
const overlayStart = document.querySelector("#overlay");
const phraseUl = document.querySelector("#phrase ul");
const h2 = document.querySelector("#overlay h2");
let guesses = 0;
let winArrayLength = 0;
const phrases = [
    'Hi how are you',
    'I like icecream',
    'I love pizza',
    'I hate fish',
    'I like grapes',
]
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const getRandomPhraseAsArray = arr => {
    // generates a random number and gets a random phrase from the array
    const randomNumber = Math.floor(Math.random() * phrases.length)
    const randomPhrase = phrases[randomNumber];
    return randomPhrase.split('');
}

let phraseArray = getRandomPhraseAsArray(phrases);

const addPhraseToDisplay = arr =>  {
    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement("li");
  
      li.textContent = arr[i];
  
      phraseUl.appendChild(li);
  
      if (arr[i] != " " && isNaN(arr[i])) {
        li.className = "letter";
      }
  
      else if (arr[i] === " ") {
        li.className = "space";
      }
  
    }
  }
  
  addPhraseToDisplay(phraseArray);
  

  const checkLetter = button => {
    let matches;
    const letter = document.querySelectorAll(".letter");
    for (let i = 0; i < letter.length; i++) {
      let listItems = letter[i];
      if(listItems.textContent.toLowerCase() === button) {
        listItems.className += " show";
        matches = listItems;
      }else if (matches === undefined)  { 
        matches = null;
   }
    
    }
    return matches;
    
  }

  qwerty.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      let chosen = event.target;
        chosen.className = "chosen";
        chosen.disabled = true;
         
        
    const letterFound = checkLetter(chosen.textContent);
  
    if (letterFound === null) {
      guesses ++;
      chosen.className = "chosen";
      const img = document.querySelectorAll("img");
      img[guesses - 1].src="images/lostHeart.png";
    }   
    
    }
     checkWin();
  });

  function checkWin() {
    let liLetter = document.querySelectorAll("ul li[class='letter']");
    let lishow = document.querySelectorAll("ul li[class='show']");
    
  if (liLetter.length === lishow.length) {
       function win () {
        overlayStart.className = "win";
        overlayStart.style.display = "";
        let youWin = document.createElement("h1");
        youWin.textContent = "Great Job! You Won!";
        overlayStart.insertBefore(youWin, h2);
        startButton.textContent = "Start New Game";
  }
      setTimeout(win, 500);     
       startButton.addEventListener("click", function() {
        window.location.reload();
       });
      
      
      }
       if(guesses >= 5) {
        overlayStart.className = "lose";
        overlayStart.innerHTML = "<h1>You Lost!</h1>";
        overlayStart.style.display = "";
        let restart = document.createElement("a");
        restart.className = "btn__reset";
        restart.textContent = "Play Again!";
        overlayStart.appendChild(restart);
        
        restart.addEventListener("click", function() {
          window.location.reload();
        });
  
     }
  
  }
  





