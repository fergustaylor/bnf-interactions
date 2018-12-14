//because of the different link addresses to bnf-interactions I've had to repeat some .js flies
//this is an amalgam of graph.js, insert.js, and insert2.js

function endload () {

  //hide loading graphic
  document.querySelector("div.loading").style.display = "none";

  //unhide elements
  document.getElementById("open").style.display = "";

  //continue to unhide elements
  document.getElementById("tensionbar").style = "position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;";
  document.querySelector(".notice").style.display = "";
  document.querySelector(".graphic").style.display = "";
}

function graphit (druginputarray) {

  //Clear previous HTML
  document.body.innerHTML = '';
  document.head.innerHTML = '';

  //////////Add new DOM elements
  var head = document.head;
  var body = document.body;

  //meta
  var node1 = document.createElement("meta");
  node1.setAttribute("charset", "UTF-8");
  head.appendChild(node1);

  //title
  var node2 = document.createElement("title");
  var node3 = document.createTextNode("Top 100 Prescribed Drugs");
  node2.appendChild(node3);
  head.appendChild(node2);

  //jquery
  var node6 = document.createElement("script");
  node6.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
  head.appendChild(node6);

  //jquery doubled up?
  var node5 = document.createElement("script");
  node5.setAttribute("src", "https://code.jquery.com/jquery-1.10.2.js");
  head.appendChild(node5);

  //css
  var nodeloading = document.createElement("link");
  nodeloading.setAttribute("rel", "stylesheet");
  nodeloading.setAttribute("href", "../css/loading.css");
  head.appendChild(nodeloading);

  //d3
  var node8 = document.createElement("script");
  node8.setAttribute("src", "../d3/d3.js");
  head.appendChild(node8);

  //d3 doubled up?
  var node7 = document.createElement("script");
  node7.setAttribute("src", "https://d3js.org/d3.v4.min.js");
  head.appendChild(node7);

  //d3
  var node9 = document.createElement("script");
  node9.setAttribute("src", "../d3/d3.layout.js");
  head.appendChild(node9);

  //packages
  var node10 = document.createElement("script");
  node10.setAttribute("src", "../js/packages.js");
  head.appendChild(node10);

  //new css
  var newcss = document.createElement("link");
  newcss.setAttribute("rel", "stylesheet");
  newcss.setAttribute("href", "../css/graphstyle.css");
  head.appendChild(newcss);

  //loading
  var x = document.createElement("div");
  x.setAttribute("class", "loading");
  body.appendChild(x);

  //textscript.js
  var textscriptjs = document.createElement("script");
  textscriptjs.setAttribute("src", "../js/textscript.js");
  body.appendChild(textscriptjs);

  var node11 = document.createElement("a");
  node11.setAttribute("class", "sidebar2");
  node11.setAttribute("id", "open");
  node11.setAttribute("style", "display:none;")

  var node12 = document.createTextNode("☰");
  node11.appendChild(node12);
  body.appendChild(node11);

  var node13 = document.createElement("div");
  node13.setAttribute("class", "sidebar sidebar2");
  node13.setAttribute("style", "display:none;");
  body.appendChild(node13);

  var node14 = document.createElement("a");
  node14.setAttribute("class", "sidebar2");
  node14.setAttribute("id", "close");
  var node15 = document.createTextNode("☰");
  node14.appendChild(node15);
  node13.appendChild(node14);

  var node16 = document.createElement("br");
  node13.appendChild(node16);

  var node17 = document.createElement("a");
  node17.setAttribute("class", "sidebar2");
  node17.setAttribute("id", "title");
  var node18 = document.createTextNode("Click on a drug to get started..");
  node17.appendChild(node18);
  node13.appendChild(node17);

  var node16 = document.createElement("br");
  node13.appendChild(node16);

  var nodebnflink = document.createElement("a");
  nodebnflink.setAttribute("class", "sidebar2");
  nodebnflink.setAttribute("id", "bnflink");
  node13.appendChild(nodebnflink);

  var node16 = document.createElement("br");
  node13.appendChild(node16);

  var node19 = document.createElement("div");
  node19.setAttribute("id", "drug");
  node19.setAttribute("class", "menu sidebar2");
  node13.appendChild(node19);

  var node20 = document.createElement("div");
  node20.setAttribute("class", "hoveroverlap");
  node13.appendChild(node20);

  var node21 = document.createElement("hr");
  node21.setAttribute("style", "height:4px, colour:black;");
  node20.appendChild(node21);

  var node22 = document.createElement("a");
  node22.setAttribute("id", "shownotice");
  var node23 = document.createTextNode("Show additional information by hovering over another drug.");
  node22.appendChild(node23);
  node20.appendChild(node22);

  var node23 = document.createElement("div");
  node23.setAttribute("class", "hoveroverlap2");
  node23.setAttribute("id", "close2");
  node20.appendChild(node23);

  var node24 = document.createElement("hr");
  node24.setAttribute("style", "height:4px, colour:black;");
  node20.appendChild(node24);

  var node25 = document.createElement("section");
  node25.setAttribute("id", "div");
  node25.setAttribute("class", "cnt sidebar2");
  node13.appendChild(node25);

  var node26 = document.createElement("section");
  node26.setAttribute("class", "bottom sidebar2");
  node26.setAttribute("style", "display: none;");
  node13.appendChild(node26);

  var node27 = document.createElement("a");
  node27.setAttribute("id", "drugstotal");
  node27.setAttribute("class", "sidebar2");
  var node28 = document.createTextNode("X Interactions Listed");
  node27.appendChild(node28);
  node26.appendChild(node27);

  var node16 = document.createElement("br");
  node26.appendChild(node16);

  var node29 = document.createElement("a");
  node29.setAttribute("id", "mildmodsevere");
  node29.setAttribute("class", "sidebar2");
  var node30 = document.createTextNode("X Severe | X Moderate | X Mild");
  node29.appendChild(node30);
  node26.appendChild(node29);

  var node16 = document.createElement("br");
  node26.appendChild(node16);

  var node31 = document.createElement("a");
  node31.setAttribute("id", "notstated");
  node31.setAttribute("class", "sidebar2");
  var node32 = document.createTextNode("X Not stated");
  node31.appendChild(node32);
  node26.appendChild(node31);

  var node33 = document.createElement("div");
  node33.setAttribute("id", "tensionbar");
  node33.setAttribute("style", "position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;");
  node33.setAttribute("style", "display:none;");
  body.appendChild(node33);

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

  var node38 = document.createElement("input");
  node38.setAttribute("style", "position:relative;top:3px;");
  node38.setAttribute("type", "range");
  node38.setAttribute("min", "0");
  node38.setAttribute("max", "100");
  node38.setAttribute("value", "85");
  node33.appendChild(node38);

  var node40 = document.createElement("div");
  node40.setAttribute("class", "notice");
  node40.setAttribute("style", "display:none;");
  body.appendChild(node40);

  var node41 = document.createElement("p");
  var node42 = document.createTextNode("This graph is based on ");
  node41.appendChild(node42);

  var node43 = document.createElement("a");
  node43.setAttribute("href", "https://bnf.nice.org.uk/interaction/");
  node43.setAttribute("title", "© NICE 2018. BNF Interactions. Available from https://bnf.nice.org.uk/interaction/ All rights reserved. Subject to Notice of rights. NICE guidance is prepared for the National Health Service in England. All NICE guidance is subject to regular review and may be updated or withdrawn. NICE accepts no responsibility for the use of its content in this product/publication. This graph is based on the work of Mike Bostock. See the Github Repository for full attributions.");
  var node44 = document.createTextNode("the BNF.");
  node43.appendChild(node44);

  node41.appendChild(node43);
  node40.appendChild(node41);

  var node45 = document.createElement("p");
  node45.setAttribute("id", "disclaimer")
  var node46 = document.createTextNode("This data was last updated X.")
  node45.appendChild(node46);
  node40.appendChild(node45);
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
