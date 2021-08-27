
var quest, aRealmReborn, heavensWard, stormBlood, shadowBringers,endWalker;
var arrLength, hwLength, sbLength, shbLength, ewLength;
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
   

    function getProgress(index) {
    var currentArc;
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
    var widthTotal = 0;
    var percentTotal = percentage(index,quest.length-1);
    var currentInterval = setInterval(sceneCurrent,1);
    var totalInterval = setInterval(sceneTotal, 1);
   
    //Check if user selected the first quest
    if(percentTotal == 0){
        barTotal.style.width = 0+'%';
        barCurrent.style.width = 0+'%'
        document.getElementById("questTitle").innerHTML = `${quest[index]}`
        document.getElementById("percentageCurrent").innerHTML = `${percentCurrent}% through ${arcName}!${progressCurrent}`;
        document.getElementById("percentageTotal").innerHTML = `0% through the MSQ!`;
        clearInterval(totalInterval);
        clearInterval(currentInterval);
    }

    function sceneCurrent(){
        if(widthCurrent < percentCurrent){
            widthCurrent++;
            barCurrent.style.width = widthCurrent+'%';
            if(widthCurrent == Math.round(percentCurrent) || widthCurrent == Math.ceil(percentCurrent)){ 
                document.getElementById("questTitle").innerHTML = `${quest[index]}`
                document.getElementById("percentageCurrent").innerHTML = `${percentCurrent}% through <span class="currentArcColor">${arcName}</span>! ${progressCurrent}`;
                clearInterval(currentInterval);
            }
        }
    }
    function sceneTotal() {
        if(widthTotal < percentTotal){
            widthTotal++;
            barTotal.style.width = widthTotal+'%';
            if(widthTotal == Math.round(percentTotal) || widthTotal == Math.ceil(percentTotal)){
                document.getElementById("questTitle").innerHTML = `${quest[index]}`
                document.getElementById("percentageTotal").innerHTML = `${percentTotal}% through the MSQ!`;
                clearInterval(totalInterval);
            } 
        }
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
function search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("questList");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//Clicking on item will autocomplete the search bar
function select(input){
    document.getElementById("myInput").value = input.innerText;
    getProgress(quest.indexOf(input.innerText))
}
//Sending the form will run getProgress
function enter(){
    var input = document.getElementById("myInput").value.toUpperCase();
    //search quests for index of item
    for(i = 0;i<quest.length;i++){
        if(quest[i].toUpperCase() == input){
            getProgress(i)
        }
    }
   // getProgress(index)
}