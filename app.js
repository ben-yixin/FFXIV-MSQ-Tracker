const totalMSQ = 1000;
const ARR = 5;
const HW = 5;
const SB = 5;
const ShB = 5;
const EW = 5;

function test() {
   var arr= [
        "Close to Home",
        "To the Bannock",
        "Passing Muster",
        "Chasing Shadows",
        "Eggs over Queasy",
        "Surveying the Damage",
        "A Soldier's Breakfast",
        "Spirithold Broken",
        "Guildleves",
        "On to Bentbranch",
        "You Shall Not Trespass",
        "Don't Look Down",
        "In the Grim Darkness of the Forest",
        "Threat Level Elevated",
        "Migrant Marauders",
        "A Hearer Is Often Late",
        "Salvaging the Scene",
        "Leia's Legacy",
        "Dread Is in the Air",
        "To Guard a Guardian",
        "Festive Endeavors",
        "Renewing the Covenant",
        "The Gridanian Envoy",
        "Achievement.png Gone from Gridania",
        "Call of the Sea"
        ]
    var barCurrent = document.getElementById("progressBarCurrent");
    var barTotal = document.getElementById("progressBarTotal");
    var widthCurrent = 0;
    var widthTotal = 0;
    var percentCurrent = percentage(arr.indexOf(arr[15]),24);
    var percentTotal = percentage(arr.indexOf(arr[24]),totalMSQ);
    setInterval(sceneCurrent,10);
    setInterval(sceneTotal, 10);

    function sceneCurrent(){
        if(widthCurrent < percentCurrent){
            widthCurrent++;
            barCurrent.style.width = widthCurrent+'%';
            if(widthCurrent == Math.round(percentCurrent)){ 
                document.getElementById("percentageCurrent").innerHTML = `You are ${percentCurrent}% through {CurrentArc}!`;
            }
        }
    }
    function sceneTotal() {
        if(widthTotal < percentTotal){
            widthTotal++;
            barTotal.style.width = widthTotal+'%';
            if(widthTotal == Math.round(percentTotal)){
                document.getElementById("percentageTotal").innerHTML = `You are ${percentTotal}% through the MSQ!`;
            }
        }
    }
}
function percentage(x,y){
    return ((x * 100)/y).toFixed(2);
}
