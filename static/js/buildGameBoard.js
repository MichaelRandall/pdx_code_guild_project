var container = document.getElementById('container');

//numSet holds the group of numbers needed to generate the images for the game, it is populated
//from the generateNumbers function
var numSet = [];

//called from the buildPanels function and updates the numSet array with the number of numbers needed
//to generate the correct quantity of images for the game
function generateNumbers(theCount) {

    var j = 0;
    while (j < 2) {
        for (var i = 1; i <= theCount; i++) {
            numSet.push(i);
        }
        j += 1;
    }
}

//test to see if game is over, call from the buildPanels click event and called when user clicks
//a panel in the game.
function isGameOver(){
    if(gameDetails.movesToWin === gameDetails.correctMoveCount){
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
    gameDetails.gridCount = Math.pow(gridSize, 2);
    gameDetails.imageCount = gridSize * 2;
    gameDetails.panelSize = ((200 / gridSize) - 2);
    gameDetails.movesToWin = gridSize * 2;
    generateNumbers(gameDetails.imageCount);

    for (var i = 0; i < gameDetails.gridCount; i++) {

        gamePanelElement = document.createElement("div");
        gamePanelElement.setAttribute("id", "p_" + i);
        gamePanelElement.setAttribute("state", "unflipped");
        gamePanelElement.classList.add("gamePanel");
        gamePanelElement.style.width = gameDetails.panelSize + "px";
        gamePanelElement.style.height = gameDetails.panelSize + "px";


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
            gameDetails.addMove(theMove);

            //outer if else checks is the click is the first or second part of the move
            if (gameDetails.moveState === 0) {
                var lastObjNum = gameDetails.moves.length - 1;
                var lastObj = gameDetails.moves[lastObjNum];

                lastObj.mvState = "moveIncomplete";

                gameDetails.moveState = 1;
            } else {
                var lastObjNum = gameDetails.moves.length - 1;
                var prevObjNum = gameDetails.moves.length - 2;

                var lastObj = gameDetails.moves[lastObjNum];
                var prevObj = gameDetails.moves[prevObjNum];

                var lastObjIcon = lastObj.icon;
                var prevObjIcon = prevObj.icon;

                console.log(lastObjIcon + ", " + prevObjIcon);

                if (lastObjIcon === prevObjIcon) {

                    lastObj.mvState = "moveMatch";
                    gameDetails.moveCount += 1;
                    console.log(gameDetails.moveCount);
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = gameDetails.moveCount;
                    gameDetails.correctMoveCount += 1;


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
                    gameDetails.moveCount += 1;
                    gameDetails.wrongMoveCount += 1;
                    console.log(gameDetails.moveCount + ", " + gameDetails.wrongMoveCount);
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = gameDetails.moveCount;
                    var wgMvCt = document.getElementById("incorrectCount");
                    wgMvCt.innerHTML = gameDetails.wrongMoveCount;
                    console.log("incorrect guess");
                }
                gameDetails.moveState = 0;
                //add call to update moves object in db with add_moves_current_game
                //add_moves_current_game(gameDetails.id);
            }
        });

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