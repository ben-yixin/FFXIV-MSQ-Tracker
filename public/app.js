var quest = [];
fetch('/quests/questChains.json')
    .then(response => response.json())
    .then(data=>{
        //Fill quest variable with all quests in the file
        quest = data.realmReborn[1]
        .concat(data.heavensWard)
        .concat(data.stormBlood)
        .concat(data.shadowBringers)
        .concat(data.endWalker);
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
    var barCurrent = document.getElementById("progressBarCurrent");
    var barTotal = document.getElementById("progressBarTotal");
    var widthCurrent = 0;
    var widthTotal = 0;
    var percentCurrent = percentage(index,quest.length-1);
    var percentTotal = percentage(index,quest.length-1);
    setInterval(sceneCurrent,10);
    setInterval(sceneTotal, 10);
    //Check if user selected the first quest
    if(percentTotal == 0){
        barTotal.style.width = 0+'%';
        barCurrent.style.width = 0+'%'
        document.getElementById("questTitle").innerHTML = `${quest[index]}`
        document.getElementById("percentageTotal").innerHTML = `${percentTotal}% through the MSQ!`;
    }
    function sceneCurrent(){
        if(widthCurrent < percentCurrent){
            widthCurrent++;
            barCurrent.style.width = widthCurrent+'%';
            if(widthCurrent == Math.round(percentCurrent)){ 
                document.getElementById("questTitle").innerHTML = `${quest[index]}`
                document.getElementById("percentageCurrent").innerHTML = `You are ${percentCurrent}% through {currentArc}!`;
                quest[index]
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
      //a = li[i].getElementsByTagName("li")[0];
      //txtValue = a.textContent || a.innerText;
     
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
}
//Sending the form will run getProgress
function enter(){
    var input = document.getElementById("myInput").value.toUpperCase();
    //search quests for index of item
    for(i = 0;i<quest.length;i++){
        if(quest[i].toUpperCase() == input){
            console.log(`${input} =${quest[i]}`)
            getProgress(i)
        }
    }
   // getProgress(index)
}