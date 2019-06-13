var possibleWords = ['Apple','Apricot','Avocado','Banana','Blackberry','Blackcurrant','Blueberry','Boysenberry','Cherry','Cloudberry','Coconut','Cranberry','Cucumber','Date','Durian','Elderberry','Feijoa','Fig','Gooseberry','Grape','Raisin','Grapefruit','Guava','Huckleberry','Jujube','Kiwi','Kumquat','Lemon','Lime','Lychee','Mango','Marionberry','Melon','Cantaloupe','Watermelon','Mulberry','Orange','Clementine','Mandarine','Tangerine','Papaya','Passionfruit','Peach','Pear','Persimmon','Plantain','Plum','Pineapple','Pineberry','Pomegranate','Quince','Raspberry','Redcurrant','Salak','Satsuma','Soursop','Strawberry','Tamarillo','Yuzu'];
var shhhItsaSecret = "";
var theWordId = document.getElementById("theWord");
var theRemainingGuessesId = document.getElementById("remainingGuesses");
var theletterGuessesId = document.getElementById("letterGuesses");
var theTotalWinsId = document.getElementById("totalWins");
var theTotalLossesId = document.getElementById("totalLosses");
var theSecretWordArray = [];
var theSecretWord = "";
var theLetterGuesses = [];
var theRemainingGuesses = 0;
var totalWins = 0;
var totalLosses = 0;
var moreGuesses = true;
var wonRound = false;
var delayInMilliseconds = 3*1000;
var updateScore;

window.onload = function(){
    startTheGame();
};

function startTheGame(){
    //re-initialize
    updateScore = false;
    theSecretWordArray = [];
    theLetterGuesses = [];
    moreGuesses = true;
    shhhItsaSecret = possibleWords[(Math.trunc(Math.random() * possibleWords.length))];
    console.log(shhhItsaSecret);
    for(i=0; i < shhhItsaSecret.length; i++){
        theSecretWordArray.push(" _ ");
    };
    theRemainingGuesses = (shhhItsaSecret.length * 2);
    theRemainingGuessesId.innerText = theRemainingGuesses;
    theTotalWinsId.innerText = totalWins;
    theTotalLossesId.innerText = totalLosses;
    printTheSecret();
    printTheLetterGuesses();
};

document.onkeyup = function (itsaGuess){
    if(moreGuesses){
        var keyCatch = itsaGuess.key.toLowerCase();
        if (keyCatch.length > 1){
            alert('You have typed "' + itsaGuess.key + '" which is not a valid "letter" key.\nPlease type a "letter" key.\n\nPress \'Ok\' to continue.');
        } else if(!(keyCatch.charCodeAt(0) >= 97 && keyCatch.charCodeAt(0) <= 122)){
            alert('You have typed "' + itsaGuess.key + '" which is not a valid "letter" key.\nPlease type a "letter" key.\n\nPress \'Ok\' to continue.');
        } else {
            var updateRemaining = updateLetterGuesses(keyCatch);
            printTheLetterGuesses();
            checkTheSecret(keyCatch);
            if (updateRemaining){
                trackRemainingCount();
            };
            if(!(theSecretWord.includes("_"))){
                theScoreBoard(true);
                wonRound = true;
                delayStart();
                theWordId.innerText = "Winner, game will refresh shortly"
            };
        };
    };
    if(!moreGuesses){
        theScoreBoard(false);
        wonRound = false;
        delayStart();
        theWordId.innerText = "Try Again, game will refresh shortly"
    }
};

function printTheSecret(){
    theSecretWord = ""; 
    for(i=0; i < theSecretWordArray.length; i++){
        theSecretWord += theSecretWordArray[i];
    };
    theWordId.innerText = theSecretWord;
};

function updateLetterGuesses(keyPress){
    if(moreGuesses){
        if(theLetterGuesses.includes(keyPress)){
            alert("You have already selected the letter: " + keyPress + "\nPlease select a new letter.\n\nPress Ok to continue.");
            return false;
        } else {
            theLetterGuesses += keyPress;
            return true;
        };
    };
};

function trackRemainingCount(){
    theRemainingGuesses--;
    if(theRemainingGuesses <= 0){
        moreGuesses = false;
    };
    
    theRemainingGuessesId.innerText = theRemainingGuesses;
};

function checkTheSecret(keyPress){
    if(shhhItsaSecret.toString().toLowerCase().includes(keyPress)){
        var indices = [];
        for(i=0; i < shhhItsaSecret.length; i++){
            if (shhhItsaSecret[i].toLowerCase() === keyPress){
                indices.push(i);
            };
        };
        console.log(indices);
        for(i=0; i < indices.length; i++){
            theSecretWordArray[indices[i]] = " " + keyPress + " ";
            console.log(theSecretWordArray);
        };
        printTheSecret();
    };
};

function theScoreBoard(Bool){
    if(!(updateScore)){
        if(Bool){
            totalWins++;
            theTotalWinsId.innerText = totalWins;
            theTotalLossesId.innerText = totalLosses;
        } else {
            totalLosses++;
            theTotalWinsId.innerText = totalWins;
            theTotalLossesId.innerText = totalLosses;
        };
        updateScore = true;
    };
};

function printTheLetterGuesses(){
    var tempLetterGuesses = ""; 
    for(i=0; i < theLetterGuesses.length; i++){
        if(i === 0){
            tempLetterGuesses = theLetterGuesses[i];
        } else {
            tempLetterGuesses += ", " + theLetterGuesses[i];
        };
    };
    theletterGuessesId.innerText = tempLetterGuesses;
};

function delayStart(){
    setTimeout(startTheGame, 3000);
}