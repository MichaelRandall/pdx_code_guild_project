var container = document.getElementById('container');

//numSet holds the group of numbers needed to generate the images for the game, it is populated
//from the generateNumbers function
//var numSet = [];

//called from the buildPanels function and updates the numSet array with the number of numbers needed
//to generate the correct quantity of images for the game
function generateNumbers(theCount) {
    var numSet = [];
    var j = 0;
    while (j < 2) {
        for (var i = 1; i <= theCount; i++) {
            numSet.push(i);
        }
        j += 1;
    }
    _.shuffle(numSet);
    console.log(numSet);
    _.shuffle(numSet);
    console.log(_.shuffle(numSet));
    return _.shuffle(numSet);
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
    numsArray = generateNumbers(gameDetails.imageCount);
    console.log(numsArray);

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
        var cardTypeNum = numsArray.pop();
        var cardType = "T" + cardTypeNum + ".png";
        cardBack.style.backgroundImage = "url('/static/images/" + cardType + "')";
        gamePanelElement.setAttribute("icon", cardType);

        indPanel.appendChild(cardFront);
        indPanel.appendChild(cardBack);
        gamePanelElement.appendChild(indPanel);

        gamePanelElement.addEventListener("click", function (e) {
            //console.log(this + ", " + this.childNodes[0].getAttribute('class') + " is being rotated on the initial click");

            //rotates each individual div on the Y axis
            this.childNodes[0].style.transform = "rotateY(180deg)"; //the div element with the class panel, nested under the gamePanel div


            var panelID = this.getAttribute('id');
            var panelState = this.setAttribute('state', 'flipped');
            panelState = this.getAttribute('state');
            var panelIcon = this.getAttribute('icon');
            var theTime = new Date();
            var moveTime = (theTime.getTime() / 1000);

            var theMove = {id: panelID, icon: panelIcon, mvTime: moveTime};
            //console.log(theMove); uncomment to see each time attribute info is pushed to the moves array
            gameDetails.addMove(theMove);

            //outer if else checks is the click is the first or second part of the move
            //the first if checks if the click is the first, the else handles the second click
            //the nested if checks if there is a match between the first and second click
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

                //var lastObjIcon = lastObj.icon;
                //var lastObjTime = lastObj.mvTime;
                //var lastObjState = lastObj.mvState;
                //var prevObjIcon = prevObj.icon;
                //var prevObjTime = prevObj.mvTime;
                //var prevObjState = prevObj.mvState;

                //console.log("Passed from second (most recent) click: " + lastObjIcon + ", " +  lastObjTime + ", " + lastObjState);
                //console.log("Passed from first (B4 most recent) click: " + prevObjIcon + ", " +  prevObjTime + ", " + prevObjState);
                //console.log("This move took " + (lastObjTime - prevObjTime) + " seconds");
                //console.log(typeof lastObjTime + ", " + lastObjTime % 1);
                //console.log(Math.floor(lastObjTime) - Math.floor(prevObjTime));


                //checks to see if there is a match between two picks
                if (lastObj.icon === prevObj.icon) {

                    lastObj.mvState = "moveMatch";
                    gameDetails.moveCount += 1;
                    console.log(gameDetails.moveCount);
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = gameDetails.moveCount;
                    gameDetails.correctMoveCount += 1;


                    var gm_over = isGameOver();
                    console.log(gm_over);

                    //if game is over, set the game end time, and stop the clock counter, tell user they won
                    //if game is NOT over, tell user they have a correct guess
                    if(isGameOver()){
                        console.log("You win");


                        var endTime = new Date();

                        gameDetails.gameEndTime = (endTime.getTime() / 1000);
                        console.log(gameDetails.gameDate, gameDetails.gameStartTime, gameDetails.gameEndTime);
                        //console.log(gameDetails.moves);
                        clearInterval(ntime);
                        //update moves here with correct end-of-game guess
                        var gmDetailsList = [];
                        gmDetailsList.push(
                            encodeURIComponent("gm_id")
                            + "=" + encodeURIComponent(gameDetails.id)
                        );
                        gmDetailsList.push(
                          encodeURIComponent("gm_start_date")
                            + '=' + encodeURIComponent(gameDetails.gameDate)
                        );
                        gmDetailsList.push(
                            encodeURIComponent("gm_start_time")
                            + "=" + encodeURIComponent(gameDetails.gameStartTime)
                        );
                        gmDetailsList.push(
                            encodeURIComponent("gm_end_time")
                            + "=" + encodeURIComponent(gameDetails.gameEndTime)
                        );
                        gmDetailsList.push(
                            encodeURIComponent("gm_tot_moves")
                            + "=" + encodeURIComponent((gameDetails.moveCount))
                        );
                        gmDetailsList.push(
                            encodeURIComponent("gm_incorrect_moves")
                            + "=" + encodeURIComponent(gameDetails.wrongMoveCount)
                        );
                        gmDetailsList.push(
                            encodeURIComponent("gm_icon_set")
                            + "=" + encodeURIComponent(gameDetails.imageSet)
                        );
                        gmDetailsList.push(
                            encodeURIComponent("gm_grid_count")
                            + "=" + encodeURIComponent(gameDetails.gridCount)
                        );
                        update_game_final_details(gmDetailsList.join("&"));



                        //pass gameid,start_time, end_time, outcome, items_clicked
                        var mvDetailsList = [];
                        mvDetailsList.push(
                            encodeURIComponent("gameID")
                            + '=' + encodeURIComponent(gameDetails.id)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_start")
                            + '=' + encodeURIComponent(prevObj.mvTime)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_end")
                            + '=' + encodeURIComponent(lastObj.mvTime)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_outcome")
                            + '=' + encodeURIComponent(lastObj.mvState)
                        );

                        //console.log(mvDetailsList);
                        add_moves_current_game(mvDetailsList.join("&"));

                        //update game details on server here.
                        //update_game_final_details();
                    }else{
                        console.log("correct guess");
                        //update moves here with correct guess, but not end of game
                        //pass gameid,start_time, end_time, outcome, items_clicked
                        var mvDetailsList = [];
                        mvDetailsList.push(
                            encodeURIComponent("gameID")
                            + '=' + encodeURIComponent(gameDetails.id)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_start")
                            + '=' + encodeURIComponent(prevObj.mvTime)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_end")
                            + '=' + encodeURIComponent(lastObj.mvTime)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_outcome")
                            + '=' + encodeURIComponent(lastObj.mvState)
                        );

                        console.log(mvDetailsList);
                        add_moves_current_game(mvDetailsList.join("&"));
                    }

                //no match, so do something else

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
                    //update moves here with incorrect guess
                    //pass gameid,start_time, end_time, outcome, items_clicked
                    var mvDetailsList = [];
                        mvDetailsList.push(
                            encodeURIComponent("gameID")
                            + '=' + encodeURIComponent(gameDetails.id)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_start")
                            + '=' + encodeURIComponent(prevObj.mvTime)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_end")
                            + '=' + encodeURIComponent(lastObj.mvTime)
                        );
                        mvDetailsList.push(
                            encodeURIComponent("move_outcome")
                            + '=' + encodeURIComponent(lastObj.mvState)
                        );
                        console.log(mvDetailsList);
                        add_moves_current_game(mvDetailsList.join("&"));
                }
                gameDetails.moveState = 0;
                //add call to update moves object in db with add_moves_current_game
                //add_moves_current_game(gameDetails.id, mvStart, mvEnd, mvOutCome);
                console.log(gameDetails.id);
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