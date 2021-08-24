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


/*

// Create input element
let search = document.createElement("input");
window.search = search; // Put the element in window so we can access it easily later
search.id = "search"; // This is for the CSS
search.autocomplete = "off"; // Disable browser autocomplete
search.setAttribute("onkeyup","searchDB(this);");
window.onload = function() {
	document.body.appendChild(search);
}

// Search function
function searchDB(elem) {
	let selector = document.getElementById("selector");
	// Check if input is empty
	if (elem.value.trim() !== "") {
		elem.classList.add("dropdown"); // Add dropdown class (for the CSS border-radius)
		// If the selector div element does not exist, create it
		if (selector == null) {
			selector = document.createElement("div");
			selector.id = "selector";
			elem.parentNode.appendChild(selector);
			// Position it below the input element
			selector.style.left = elem.getBoundingClientRect().left + "px";
			selector.style.top = elem.getBoundingClientRect().bottom + "px";
			selector.style.width = elem.getBoundingClientRect().width + "px";
		}
		// Clear everything before new search
		selector.innerHTML = "";
		// Variable if result is empty
		let empty = true;
		for (let item in db) {
			// Join the db elements in one string
			let str = [item.toLowerCase(), db[item][0].toLowerCase(), db[item][1].toLowerCase()].join();
			// If exists, create an item (button)
			if (str.indexOf(elem.value) !== -1) {
				let opt = document.createElement("button");
				opt.setAttribute("onclick","insertValue(this);")
				opt.innerHTML = db[item][0];
				selector.appendChild(opt);
				empty = false;
			}
		}
		// If result is empty, display a disabled button with text
		if (empty == true) {
			let opt = document.createElement("button");
			opt.disabled = true;
			opt.innerHTML = "No results";
			selector.appendChild(opt);
		}
	}
	// Remove selector element if input is empty
	else {
		if (selector !== null) {
			selector.parentNode.removeChild(selector);
			elem.classList.remove("dropdown");
		}
	}
}

// Function to insert the selected item back to the input element
function insertValue(elem) {
	window.search.classList.remove("dropdown");
	window.search.value = elem.innerHTML;
	elem.parentNode.parentNode.removeChild(elem.parentNode);
}*/