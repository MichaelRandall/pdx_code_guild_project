/**
 * Created by mike on 2/3/15.
 */
//records the game clock for game duration, will need to modify to show seconds, minutes, hours, etc...
function gmClock(){
	gameState.gameTime += 1;
    var timeKeeper = document.getElementById("totTime");
	//console.log(gameTime);
    timeKeeper.innerHTML = gameState.gameTime;
}