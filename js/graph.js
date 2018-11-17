function endload () {

  //new css
  var newcss = document.createElement("link");
  newcss.setAttribute("rel", "stylesheet");
  newcss.setAttribute("href", "css/graphstyle.css");
  document.head.appendChild(newcss);

  //unhide elements
  document.getElementById("open").style.display = "";

  //hide the tensionbaritself
  document.querySelector('#tensionbar > input[type="range"]').style = "display:none;";
  //continue to unhide elements
  document.getElementById("tensionbar").style = "position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;";

  document.getElementsByClassName("notice")[0].style.display = "";
  document.getElementsByClassName("graphic")[0].style.display = "";

  //hide loading graphic
  document.querySelectorAll("div.loading")[0].style.display = "none"
}

function graphit (druginputarray) {

//Clear previous HTML
document.body.innerHTML = '';
document.head.innerHTML = '';

//css
var nodeloading = document.createElement("link");
nodeloading.setAttribute("rel", "stylesheet");
nodeloading.setAttribute("href", "css/loading.css");
document.head.appendChild(nodeloading);

//loading
var x = document.createElement("div");
x.setAttribute("class", "loading");
document.body.appendChild(x);

//////////
//insert.js
var insertjs = document.createElement("script");
insertjs.setAttribute("src", "js/insert.js");
document.body.appendChild(insertjs);

//textscript.js
var textscriptjs = document.createElement("script");
textscriptjs.setAttribute("src", "js/textscript.js");
document.body.appendChild(textscriptjs);

//insert2.js
var insert2 = document.createElement("script");
insert2.setAttribute("src", "js/insert2.js");
document.body.appendChild(insert2);
}

function listit (druginputarray) {

//Clear previous HTML
document.body.innerHTML = '';
document.head.innerHTML = '';

//insert.js
var insertjs = document.createElement("script");
insertjs.setAttribute("src", "js/insert.js");
document.body.appendChild(insertjs);

var node40 = document.createElement("div");
node40.setAttribute("class", "notice");

var node41 = document.createElement("p");
var node42 = document.createTextNode("This list is based on ");
node41.appendChild(node42);

var node43 = document.createElement("a");
node43.setAttribute("href", "https://bnf.nice.org.uk/interaction/");
node43.setAttribute("title", "© NICE 2018. BNF Interactions. Available from https://bnf.nice.org.uk/interaction/ All rights reserved. Subject to Notice of rights. NICE guidance is prepared for the National Health Service in England. All NICE guidance is subject to regular review and may be updated or withdrawn. NICE accepts no responsibility for the use of its content in this product/publication.");
var node44 = document.createTextNode("the BNF.");
node43.appendChild(node44);

node41.appendChild(node43);
node40.appendChild(node41);

var node45 = document.createElement("p");
node45.setAttribute("id", "disclaimer")
var node46 = document.createTextNode("This data was last updated X.")
node45.appendChild(node46);
node40.appendChild(node45);

document.body.appendChild(node40);

//new css
var newcss = document.createElement("link");
newcss.setAttribute("rel", "stylesheet");
newcss.setAttribute("href", "css/liststyle.css");
document.head.appendChild(newcss);

d3.json("./data/master.json", function(classes) {

  //Update Timestamp
  document.getElementById('disclaimer').innerHTML = "This data was last updated " + classes[0].Stamp;

  var classes2 = []
  //add key to classes array
  for (ii = 0; ii < classes.length; ii++) {
    classes[ii].key = classes[ii].name.substring(i = classes[ii].name.lastIndexOf(".") + 1)
  }
  //filter classes array
  for (i = 0; i < druginputarray.length; i++) {
    for (ii = 0; ii < classes.length; ii++) {
      if (classes[ii].key == druginputarray[i]) {
        classes2.push(classes[ii])
      }
    }
  };

  var drugslist = document.createElement("div");
      drugslist.setAttribute("class", "inputlist");
    for (q = 0; q < classes2.length; q++) {
      var eachdrug = document.createElement("p");
      eachdrug.setAttribute("class", "showSingle");
      eachdrug.setAttribute("target", q+1);
      var eachdrug5 = document.createTextNode(classes2[q].title);
      eachdrug.appendChild(eachdrug5);
      drugslist.appendChild(eachdrug)
    }

  duv = document.createElement("br");
  drugslist.appendChild(duv);

  duv = document.createElement("br");
  drugslist.appendChild(duv);

  duv = document.createElement("p");
  duv.appendChild(document.createTextNode("List All"));
  duv.id = "showall";
  drugslist.appendChild(duv);

  duv = document.createElement("p");
  duv.appendChild(document.createTextNode("Hide All"));
  duv.id = "hideall";
  drugslist.appendChild(duv);

document.body.appendChild(drugslist);

///
////add the severity checkbox
var node33 = document.createElement("div");
node33.setAttribute("id", "severitybox");

var node34 = document.createElement("form");
node34.setAttribute("name", "cssbox");
node33.appendChild(node34);

var node35 = document.createElement("input");
node35.setAttribute("type", "checkbox");
node35.setAttribute("name", "cssbox");
node35.setAttribute("onchange", "toggleCheckbox(this)");
node34.appendChild(node35);

var node36 = document.createElement("p");
var node37 = document.createTextNode("Colour the severe drug interactions");
node36.appendChild(node37);
node34.appendChild(node36);

document.body.appendChild(node33);
////
///

  var mynode = document.createElement("div");
      mynode.setAttribute("class", "interactionlist");

  for (q = 0; q < classes2.length; q++) {
    var eachdrug = document.createElement("div");
    eachdrug.setAttribute("id", "div"+(q+1));
    eachdrug.setAttribute("class", "targetDiv");

    for (ii = 0; ii < classes2[q].importstitle.length; ii++) {
      for (iii = 0; iii < druginputarray.length; iii++) {
        if (classes2[q].imports[ii].substring(i = classes2[q].imports[ii].lastIndexOf(".") + 1) == druginputarray[iii]) {

          var eachinteraction = document.createElement("p");
          ///
          eachinteraction.setAttribute('severity', classes2[q].Severity[ii]);
          eachinteraction.setAttribute('evidence', classes2[q].Evidence[ii]);
          ///
          var eachinteraction5 = document.createTextNode(classes2[q]["Interactions Info"][ii]);
              eachinteraction.appendChild(eachinteraction5);
              eachdrug.appendChild(eachinteraction);
           }
         }
       }

if (eachdrug.childElementCount > 0) {
var eachtitle = document.createElement("p");
    eachtitle.setAttribute("class", "title");

var eachtitle5 = document.createTextNode(classes2[q].title);
    eachtitle.appendChild(eachtitle5);

  eachdrug.insertBefore(eachtitle, eachdrug.childNodes[0])
}

  mynode.appendChild(eachdrug);
  }
document.body.appendChild(mynode);

$(function() {
  jQuery('.showSingle').click(function(){
    jQuery('.targetDiv').hide();
    jQuery('#div'+$(this).attr('target')).show();
//lets try to add a no drugs notice
    if (!jQuery('#div'+$(this).attr('target'))[0].childElementCount > 0) {
    var notice = document.createElement("p");
    var notice2 = document.createTextNode("This drug has no interactions with the other drugs you've selected.");
    notice.appendChild(notice2);
    jQuery('#div'+$(this).attr('target'))[0].appendChild(notice);
    }
//
          });

  jQuery('#showall').click(function(){
    jQuery('.targetDiv').show();
          });

  jQuery('#hideall').click(function(){
    jQuery('.targetDiv').hide();
          });
});

});

}

function toggleCheckbox(element)
 {
   if (document.cssbox.cssbox.checked==true) {
   var x = document.querySelectorAll("p[severity='Severe']");
   for (i = 0; i < x.length; i++) {
       x[i].style.backgroundColor = "crimson";
     };
   }
   if (document.cssbox.cssbox.checked==false) {
   var x = document.querySelectorAll("p[severity='Severe']");
   for (i = 0; i < x.length; i++) {
       x[i].style.backgroundColor = "";
     };
   }
 }
