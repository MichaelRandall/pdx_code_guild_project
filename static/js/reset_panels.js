
console.log("resetPanels");
function resetPanels(lstObj, prvObj){
    console.log("This is from the reset_panels page: " + lstObj + ", " + prvObj + ", " + typeof lstObj + " " + typeof prvObj);


    //console.log(document.getElementById(lstObj).childNodes[0].nodeName);
    //console.log(document.getElementById(lstObj).childNodes[0].getAttribute('class')); //panel
    document.getElementById(lstObj).childNodes[0].style.transform="rotateY(0deg)";  //panel under the gamePanel element
    document.getElementById(prvObj).childNodes[0].style.transform="rotateY(0deg)";  //panel under the gamePanel element
    //console.log(document.getElementById(lstObj).childNodes[0] + ", " + document.getElementById(lstObj).childNodes[0].getAttribute('class') + " is the element being affected on reset");
    //console.log(document.getElementById(prvObj).childNodes[0] + ", " + document.getElementById(prvObj).childNodes[0].getAttribute('class') + " is the element being affected on reset");


    //console.log(document.getElementById(lstObj).childNodes[0].childNodes[0].getAttribute('class')); //front face - div elements under the panel element
    //console.log(document.getElementById(lstObj).childNodes[0].childNodes[1].getAttribute('class')); //back face - div elements under the panel element

}