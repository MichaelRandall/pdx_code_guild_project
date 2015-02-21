/**
 * Created by mike on 2/6/15.
 */
//generate numbers takes an integer representing the number of images needed for half the game board
//loops through and adds those numbers twice to the array, numSet
var container = document.getElementById('container');

var numSet = [];
function generateNumbers(theCount) {

    var j = 0;
    while (j < 2) {
        for (var i = 1; i <= theCount; i++) {
            numSet.push(i);
        }
        j += 1;
    }
}


function isGameOver(){
    if(gameState.movesToWin === gameState.correctMoveCount){
        return true;
        console.log("true");
    }else{
        return false;
        console.log("false");
    }
}


//builds the game panels, called from loadGrid function
function buildPanels(gridSize) {
    theBoard = document.getElementById("gameBoard");
    var newGridSize = gridSize * gridSize;
    var panelSize = ((200 / gridSize) - 2) + "px";
    var imagesNeeded = newGridSize / 2;
    gameState.movesToWin = newGridSize / 2;
    generateNumbers(imagesNeeded);

    for (var i = 0; i < newGridSize; i++) {

        gamePanelElement = document.createElement("div");
        gamePanelElement.setAttribute("id", "p_" + i);
        gamePanelElement.setAttribute("state", "unflipped");
        gamePanelElement.classList.add("gamePanel");
        gamePanelElement.style.width = panelSize;
        gamePanelElement.style.height = panelSize;


        indPanel = document.createElement("div");
        indPanel.setAttribute("class", "panel");


        cardFront = document.createElement("div");
        cardFront.setAttribute("class", "card front face");
        cardFront.style.backgroundImage = "url('/static/images/Mahjong_Cover.png')";


        cardBack = document.createElement("div");
        cardBack.setAttribute("class", "card back face");
        var cardTypeNum = numSet.pop();
        var cardType = "T" + cardTypeNum + ".png";
        cardBack.style.backgroundImage = "url('/static/images/" + cardType + "')";
        gamePanelElement.setAttribute("icon", cardType);

        indPanel.appendChild(cardFront);
        indPanel.appendChild(cardBack);
        gamePanelElement.appendChild(indPanel);

        gamePanelElement.addEventListener("click", function (e) {
            console.log(this + ", " + this.childNodes[0].getAttribute('class') + " is being rotated on the initial click");

            //rotates each individual div on the Y axis
            this.childNodes[0].style.transform = "rotateY(180deg)"; //the div element with the class panel, nested under the gamePanel div


            var panelID = this.getAttribute('id');
            var panelState = this.setAttribute('state', 'flipped');
            panelState = this.getAttribute('state');
            var panelIcon = this.getAttribute('icon');
            var theTime = new Date();
            var moveTime = theTime.getTime();

            var theMove = {id: panelID, icon: panelIcon, mvTime: moveTime};
            //console.log(theMove); uncomment to see each time attribute info is pushed to the moves array
            gameState.addMove(theMove);


            if (gameState.moveState === 0) {
                var lastObjNum = gameState.moves.length - 1;
                var lastObj = gameState.moves[lastObjNum];

                lastObj.mvState = "moveIncomplete";


                gameState.moveState = 1;
            } else {
                var lastObjNum = gameState.moves.length - 1;
                var prevObjNum = gameState.moves.length - 2;

                var lastObj = gameState.moves[lastObjNum];
                var prevObj = gameState.moves[prevObjNum];

                var lastObjIcon = lastObj.icon;
                var prevObjIcon = prevObj.icon;

                console.log(lastObjIcon + ", " + prevObjIcon);

                if (lastObjIcon === prevObjIcon) {

                    lastObj.mvState = "moveMatch";
                    gameState.moveCount += 1;
                    console.log(gameState.moveCount);
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = gameState.moveCount;
                    gameState.correctMoveCount += 1;
                    var gmover = isGameOver();
                    console.log(gmover);
                    if(isGameOver()){
                        console.log("You win");
                        clearInterval(ntime);
                    }else{
                        console.log("correct guess");
                    }

                } else {
                    lastObj.mvState = "moveNoMatch";
                    console.log("Calling reset panels function. lastObj is a: " + typeof lastObj);
                    setTimeout(function () {
                        resetPanels(lastObj.id, prevObj.id);
                    }, 2000);
                    gameState.moveCount += 1;
                    gameState.wrongMoveCount += 1;
                    console.log(gameState.moveCount + ", " + gameState.wrongMoveCount);
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = gameState.moveCount;
                    var wgMvCt = document.getElementById("incorrectCount");
                    wgMvCt.innerHTML = gameState.wrongMoveCount;
                    console.log("incorrect guess");
                }
                gameState.moveState = 0;
                //add call to update moves object in db with update_existing_game
            }
        });
        //indGamePanel.appendChild(gamePanelElement);
        theBoard.appendChild(gamePanelElement);
    }
}


function buildGameBoard(tile_count) {
    $( "#container" ).empty();
    console.log("buildGameBoard function called");
    var gameBoard = document.createElement("div");
    gameBoard.setAttribute("id", "gameBoard");
    container = document.getElementById("container");
    container.appendChild(gameBoard);
    buildPanels(tile_count);
}