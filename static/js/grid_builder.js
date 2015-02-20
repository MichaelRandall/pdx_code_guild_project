var NOT_STARTED = 0;
var IN_PROGRESS = 1;
var COMPLETE = 2;


var gameState = {

    move:1,
    gameStateState: NOT_STARTED,
    gameTime:0,
    moveCount:0,
    wrongMoveCount:0,
    correctMoveCount:0,
    moveState:0,
    movesToWin:0,

    moves : [],
	
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

function newGameStart(){
    var request = new XMLHttpRequest();

    request.onload = undefined;
    request.onreadystatechange = function(){
        if((request.readyState == 4) && (request.status == 200)){
            var data = JSON.parse(request.responseText);
            console.log(data);
        }
    };
    request.open("POST","../add_new_game/",true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send();
}


function init(){
	var strtBttn = document.getElementById("startBttn");
	strtBttn.addEventListener('click', function(){
        if(gameState.gameStateState === NOT_STARTED){
            //starts the process of creating a new game on the server
            newGameStart();
            gameState.gameStateState = IN_PROGRESS;
		    //loadGrid();
            buildGameBoard(4);
            gameState.movesToWin = 8;
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