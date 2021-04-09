var checklistcontainer = document.getElementById('checklist');
// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();
// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
      // Loop over the JSON array.
     jsonOptions.forEach(function(item) {
        // Create a new <span> element.
        var span = document.createElement('span')
        //span.setAttribute("value", item.title)

        // Create a new <input> element.
        var inputs = document.createElement('input')
        inputs.setAttribute("type", "checkbox")
        //inputs.setAttribute("name", "drugs")
        inputs.setAttribute("value", item.name.substring(i = item.name.lastIndexOf(".") + 1))

        //add event listener to input (to cancel out double-effect by clicking on span)
        inputs.addEventListener("click", function(){
        state = this.checked;
        state = !state;
        this.checked = state;
        });

        // Set the value using the item in the JSON array.
        var checklists = document.createElement('p')
        var checklists5 = document.createTextNode(item.title)
        checklists.appendChild(checklists5)

        //add a break
        //var breaks = document.createElement('br')
        
        // Add the <input> element to the <span>.
        span.appendChild(inputs);
        // Add the <p> element to the <span>.
        span.appendChild(checklists);

        if (item.new === true) {
          var new1 = document.createElement('p')
          var new5 = document.createTextNode("New!")
          new1.appendChild(new5)
          new1.setAttribute("class", "new")
          //add the <p> element to the <span>
          span.appendChild(new1);
        }

        //add event listener to span
        span.addEventListener("click", function(){
        state = this.firstChild.checked;
        state = !state;
        this.firstChild.checked = state;
        });

        //strictly speaking, this could go at the end of the json. not inside repeated each time.
        //hide loading div
        var x = document.getElementsByClassName("loading");
        x[0].style.display = "none";

        //add span to checklistcontainer
        checklistcontainer.appendChild(span);
      });
    }
  }
};

// Set up and make the request.
request.open('GET', './data/master.json', true);
request.send();

//functions for the radio buttons
function showall() {
  var all = $('div#checklist>span')
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'block';
  }
}

function showselected() {
  var all = $('div#checklist>span')
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
  var selected = $('div#checklist>span>input:checked').parent()
  //loop through selected
  for (i = 0; i < selected.length; i++) {
    selected[i].style.display = 'block';
  }
}

function showunselected() {
  var all = $('div#checklist>span')
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
  var unselected = $('div#checklist>span>input').not(':checked').parent()
  //loop through selected
  for (i = 0; i < unselected.length; i++) {
    unselected[i].style.display = 'block';
  }
}

function showsearched(string) {
  var all = $('div#checklist>span')
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
  var searched = $("span:contains("+string+")")
  //loop through searched
  for (i = 0; i < searched.length; i++) {
    searched[i].style.display = 'block';
  }
  //search by capitalised version
  var string2 = string.charAt(0).toUpperCase()+string.slice(1);
  var searched2 = $("span:contains("+string2+")")
  //loop through searched
  for (i = 0; i < searched2.length; i++) {
    searched2[i].style.display = 'block';
  }
}

var druginputarray = [];

function buildgraph() {
  var selected = $('div#checklist>span>input:checked');
  //create array
  for (i = 0; i < selected.length; i++) {
    druginputarray.push(selected[i].value);
  }
  if (druginputarray.length > 0) {
     graphit(druginputarray);
  }
}


function buildlist () {
  var selected = $('div#checklist>span>input:checked');
  //create array
  for (i = 0; i < selected.length; i++) {
    druginputarray.push(selected[i].value);
  }
  if (druginputarray.length > 0) {
     listit(druginputarray);
  }
}
