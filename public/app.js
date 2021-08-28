var quest, aRealmReborn, heavensWard, stormBlood, shadowBringers,endWalker;
var arrLength, hwLength, sbLength, shbLength, ewLength;
const punc = new RegExp(/[^\s\w]/g);
fetch('/quests/questChains.json')
    .then(response => response.json())
    .then(data=>{
        //Fill quest variables and length variables
        aRealmReborn = data.realmReborn;
        arrLength = aRealmReborn.length;

        heavensWard = data.heavensWard;
        hwLength = heavensWard.length;

        stormBlood = data.stormBlood;
        sbLength = stormBlood.length;

        shadowBringers = data.shadowBringers;
        shbLength = shadowBringers.length;

        endWalker = data.endWalker;
        ewLength = endWalker.length;

        quest = data.realmReborn
        .concat(heavensWard)
        .concat(stormBlood)
        .concat(shadowBringers)
        .concat(endWalker);
        //create an unordered list and href
        ul = document.createElement('ul');
        a = document.createElement('a');
        //Append unordered list to div
        document.getElementById('questList').appendChild(ul)
        quest.forEach(element => {
            //create unique href tag for each quest
            a.href = "#"+element;
            //create a new list element for each quest
            let li = document.createElement('li');
            //append href tag to new list element
            li.appendChild(a);
            //run select function on click
            li.addEventListener('click',function(){select(li)});
            //add text to list item and append to group
            li.innerHTML += element;
            ul.appendChild(li);
        });
    })


//save width value
var widthTotal = 100;
window.addEventListener('load', function() {
    onStart()
})
function onStart(){
    var loadInterval= setInterval(deload,3);
    function deload(){     
        var bar = document.getElementById("progressBarTotal");
        widthTotal--;
        bar.style.width = widthTotal+'%';
        if(widthTotal == 0 ){
            clearInterval(loadInterval);
        } 
    }
}
function getProgress(index) {
    var arcName;
    var percentCurrent;
    var progressCurrent;
    //Spaghetti code
    //Check progress of quest of specific story
    if(index <= arrLength-1){
        currentArc = aRealmReborn;
        arcName = "A Realm Reborn";
        percentCurrent = percentage(index,arrLength-1);
        progressCurrent = `${index+1}/${arrLength}`
    }else if(index > arrLength-1 && index < hwLength+arrLength){
        currentArc = heavensWard;
        arcName = "Heavens Ward";
        percentCurrent = percentage(index%(arrLength-1),hwLength)
        progressCurrent = `${index%arrLength+1}/${hwLength}`
    } else if(index > arrLength+hwLength-1 && index < sbLength + hwLength +arrLength){
        currentArc = stormBlood;
        arcName = "Storm Blood";
        percentCurrent = percentage(index%(arrLength+hwLength-1),sbLength)
        progressCurrent = `${index%(arrLength+hwLength)+1}/${sbLength}`
    } else if(index > arrLength+hwLength+sbLength-1 && index < shbLength + sbLength + hwLength +arrLength){
        currentArc = shadowBringers;
        arcName = "Shadow Bringers";
        percentCurrent = percentage(index%(arrLength+hwLength+sbLength-1),shbLength)
        progressCurrent = `${index%(arrLength+hwLength+sbLength)+1}/${shbLength}`
    }
    //Progress Bar
    var barCurrent = document.getElementById("progressBarCurrent");
    var barTotal = document.getElementById("progressBarTotal");
    var widthCurrent = 0;
    var percentTotal = percentage(index,quest.length-1);
    var currentInterval = setInterval(sceneCurrent,0);
    var totalInterval = setInterval(sceneTotal, 0);
    display();
    //Check if user selected the first quest
    if(percentTotal == 0){
        barTotal.style.width = 0+'%';
        barCurrent.style.width = 0+'%'
        clearInterval(totalInterval);
        clearInterval(currentInterval);
    }
    function display(){
        document.getElementById("questTitle").innerHTML = `${quest[index]}`
        document.getElementById("percentageCurrent").innerHTML = `${percentCurrent}% through <span class="currentArcColor">${arcName}</span>! ${progressCurrent}`;
        document.getElementById("percentageTotal").innerHTML = `${percentTotal}% through the <span class="msqColor">MSQ</span>! ${index+1}/${quest.length}`;
    }
    function sceneCurrent(){
        if(widthCurrent < percentCurrent){
            widthCurrent++;
            barCurrent.style.width = widthCurrent+'%';
            if(widthCurrent == Math.round(percentCurrent) || widthCurrent == Math.ceil(percentCurrent)){ 
                clearInterval(currentInterval);
            }
        }
    }

    function sceneTotal() {
        if(widthTotal < Math.round(percentTotal)) widthTotal++;
        else if(widthTotal > Math.round(percentTotal)) widthTotal--;
        barTotal.style.width = widthTotal+'%';
        if(widthTotal == Math.round(percentTotal) || widthTotal == Math.ceil(percentTotal)) clearInterval(totalInterval);     
    }
}

function percentage(x,y){return (((x+1) * 100)/(y+1)).toFixed(1);}
function search() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.trim();
    var filterRe = new RegExp(filter,"i")
    ul = document.getElementById("questList");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those that don't match the search query
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].innerText;  
        if (txtValue.replace(punc,'').match(filterRe)) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//Clicking on item will autocomplete the search bar and run getProgress
function select(input){
    document.getElementById("myInput").value = input.innerText;
    getProgress(quest.indexOf(input.innerText))
}
//Sending the form will run getProgress
function enter(){
    var input = document.getElementById("myInput").value.trim();
    var re = new RegExp(input,"i");
    //Search for matching quest
    //Check if input empty
    if(!(input.replace(/\s/g,"") == "")){
        for(i = 0;i<quest.length;i++){
            console.log(input)
            //Search ignore puncuation
            if(quest[i].replace(punc,'').match(re)){
                //Autocomplete search bar
                input= quest[i];
                getProgress(i)
                //Break otherwise loops through all matching searches
                break;
            }
        }
    }
}