function endload () {

  //new css
  var newcss = document.createElement("link");
  newcss.setAttribute("rel", "stylesheet");
  newcss.setAttribute("href", "../css/graphstyle.css");
  document.head.appendChild(newcss);

  //hide loading graphic
  document.querySelectorAll("div.loading")[0].style.display = "none"

  //unhide elements
  document.getElementById("open").style.display = "";

  //continue to unhide elements
  document.getElementById("tensionbar").style = "position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;";

  document.getElementsByClassName("notice")[0].style.display = "";
  document.getElementsByClassName("graphic")[0].style.display = "";
}

function graphit (druginputarray) {

//Clear previous HTML
document.body.innerHTML = '';
document.head.innerHTML = '';

//css
var nodeloading = document.createElement("link");
nodeloading.setAttribute("rel", "stylesheet");
nodeloading.setAttribute("href", "../css/loading.css");
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
textscriptjs.setAttribute("src", "../js/textscript.js");
document.body.appendChild(textscriptjs);

//insert2.js
var insert2 = document.createElement("script");
insert2.setAttribute("src", "js/insert2.js");
document.body.appendChild(insert2);
}

function toggleCheckbox(element) {
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
