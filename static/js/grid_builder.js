var NOT_STARTED = 0;
var IN_PROGRESS = 1;
var COMPLETE = 2;


var gameDetails = {

    id:0,
    move:1,
    gameState: NOT_STARTED,
    gameTime:0,
    moveCount:0,
    wrongMoveCount:0,
    correctMoveCount:0,
    moveState:0,
    movesToWin:0,
    gridCount:0,
    panelSize:0,
    imageCount:0,
    imageSet:"mahjong_numbers",
    gameDate:0,
    gameStartTime:0,
    gameEndTime:0,

    moves:[],
	
	addMove: function(move){
		this.moves.push(move);
	},
	
	getGameState : function(){
		console.log("get some game state");
	},

	getLastElement : function(){
		return this.moves[this.moves.length - 1];
	},

	checkMoveState : function(){
		if(this.moves.length % 2 !== 0){
			//gameMoveState = "incomplete";
		}
	},

	getMoveTimeDiff : function(){
		console.log(this.moves[3].mvTime - this.moves[1].mvTime);
	}
}


//called when user clicks start button on game.html page
function newGameStart(){
    var request = new XMLHttpRequest();

    request.onload = undefined;
    request.onreadystatechange = function(){
        if((request.readyState == 4) && (request.status == 200)){
            var data = JSON.parse(request.responseText);
            console.log(data);
            gameDetails.id = data.id;
        }
    };
    request.open("POST","../add_new_game/",true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send();
}


//called from buildGameBoard.js when a user completes a move, a move consists of two clicks
function add_moves_current_game(moveDetails){
    var request = new XMLHttpRequest();

    request.onload = undefined;
    request.onreadystatechange = function(){
        if((request.readyState == 4) && (request.status == 200)){
            var data = JSON.parse(request.responseText);
            console.log(data);
        }
    };
    request.open("POST","../add_moves_current_game/",true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(moveDetails);
}

//called when the user wins the game immediately after last winning click
function update_game_final_details(gameOverDetails){
    var request = new XMLHttpRequest();

    request.onload = undefined;
    request.onreadystatechange = function(){
        if((request.readyState == 4) && (request.status == 200)){
            var data = JSON.parse(request.responseText);
            console.log(data);
        }
    };
    request.open("POST","../update_game_final_details/",true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(gameOverDetails);
}

function gmClock(){
	gameDetails.gameTime += 1;
    var timeKeeper = document.getElementById("totTime");
	//console.log(gameTime);
    timeKeeper.innerHTML = gameDetails.gameTime;
}

function myGetMonth(date){
    var myMonth = date.getMonth();
    myMonth++
    return myMonth < 10 ? '0' + myMonth : myMonth;
}

function myGetDate(date){
    var myDate = date.getDate();
    return myDate < 10 ? '0' + myDate : myDate;
}

function init(){
	var strtBttn = document.getElementById("startBttn");
	strtBttn.addEventListener('click', function(){
        if(gameDetails.gameState === NOT_STARTED){

            //starts the process of creating a new game on the server
            newGameStart();

            var startTime = new Date();
            var gmDateString = [];
            var gmYear = startTime.getFullYear();
            var gmMonth = myGetMonth(startTime);
            var gmDate = myGetDate(startTime);

            gmDateString.push(
                gmYear, gmMonth, gmDate
            );
            console.log(gmDateString.join("-"));


            //console.log(startTime);
            //console.log(startTime.toUTCString());
            //console.log(startTime.getUTCHours());
            //console.log(startTime.getUTCMinutes());
            //console.log(startTime.getUTCSeconds());
            //console.log(startTime.getUTCMilliseconds());
            gameDetails.gameStartTime = startTime.getTime();
            gameDetails.gameDate = gmDateString.join("-");
            console.log(gameDetails.gameDate);



            //sets the status of the game to in progress
            gameDetails.gameState = IN_PROGRESS;

		    //loadGrid();
            buildGameBoard(4);

		    //Commented out for testing. Uncomment for full game
		    ntime = setInterval(gmClock, 1000);
        } else {

        }

	});
	var pauseBttn = document.getElementById("pauseBttn");
	pauseBttn.addEventListener("click", function(){
		clearInterval(ntime);
	});
	
	var resumeBttn = document.getElementById("resumeBttn");
	resumeBttn.addEventListener('click', function(){
		ntime = setInterval(gmClock, 1000);
	});
}// JavaScript Document