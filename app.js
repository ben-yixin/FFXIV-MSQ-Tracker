const totalMSQ = 1000;
const ARR = 5;
const HW = 5;
const SB = 5;
const ShB = 5;
const EW = 5;
var quest = [];
fetch('./Quests/questChains.json')
    .then(response => response.json())
    .then(data=>{
        console.log(data.gridania);
        quest = data.gridania;
        ul = document.createElement('ul');
        document.getElementById('questList').appendChild(ul)
        data.gridania.forEach(element => {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += element;
        });
       // document.getElementById('questList').innerHTML = data.gridania;
    })




function test() {
   var arr= quest;
    var barCurrent = document.getElementById("progressBarCurrent");
    var barTotal = document.getElementById("progressBarTotal");
    var widthCurrent = 0;
    var widthTotal = 0;
    var percentCurrent = percentage(arr.indexOf(arr[15]),24);
    var percentTotal = percentage(arr.indexOf(arr[24]),24);
    setInterval(sceneCurrent,10);
    setInterval(sceneTotal, 10);
    var checkOne = false;
    var checkTwo = false;
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
    console.log(checkOne)
    if(checkOne === true && checkTwo === true){
        document.getElementById("percentageCurrent").innerHTML = `You are ${percentCurrent}% through {CurrentArc}!`;
        document.getElementById("percentageTotal").innerHTML = `You are ${percentTotal}% through the MSQ!`;
    }
}
/*
function scene(width,percent,element,id){
    if(width < percent){
        width++;
        element.style.width = width+'%';
        if(width == Math.round(percent)){
           check = true;
        }
    }
}
*/
function percentage(x,y){
    return ((x * 100)/y).toFixed(2);
}
