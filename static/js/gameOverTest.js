/**
 * Created by mike on 2/6/15.
 */
function isGameOver(){
    if(gameState.movesToWin === gameState.correctMoveCount){
        return true;
        console.log("true");
    }else{
        return false;
        console.log("false");
    }
}