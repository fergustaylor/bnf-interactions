var w = window.innerWidth,
    h = window.innerHeight,
    rx = w / 2,
    ry = h / 2,
    m0,
    rotate = 0;

var splines = [];

var cluster = d3.layout.cluster()
    .size([360, ry - 120])
    .sort(function(a, b) { return d3.ascending(a.key, b.key); });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(.85)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var div = d3.select("body").insert("div", "h2")
    .style("width", w + "px")
    .style("height", w + "px")
    ///
    .style("display", "none")
    .attr("class", "graphic")
    //
    .style("position", "absolute")
    .style("-webkit-backface-visibility", "hidden");

var svg = div.append("svg:svg")
    .attr("width", w)
    .attr("height", w)
    .attr("class", "flex-container")
    .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("data/master.json", function(classes) {

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

  var nodes = cluster.nodes(packages.root(classes2)),
      links = packages.imports(nodes),
      splines = bundle(links);

  var path = svg.selectAll("path.link")
      .data(links)
      .enter().append("svg:path")
      .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key;})
      .attr("value", function(d) {return d.source.key})
      .attr("severity", function(d) {return d.source.Severity[d.source.importstitle.indexOf(d.target.title)];})
      .attr("evidence", function(d) {return d.source.Evidence[d.source.importstitle.indexOf(d.target.title)];})
      .attr("interaction", function(d) {return d.source["Interactions Info"][d.source.importstitle.indexOf(d.target.title)];})
      .attr("d", function(d, i) { return line(splines[i]); });

  svg.selectAll("g.node")
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("id", function(d) { return "node-" + d.key; })
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .append("svg:text")
      .attr("bnflink", function(d) { return d.bnflink; })
      //.attr("bnflink", function(d) { return "https://www.google.co.uk/" })
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.title; })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousedown", click)
      .on("dblclick", clear);

  d3.select("input[type=range]").on("change", function() {
    line.tension(this.value / 100);
    path.attr("d", function(d, i) { return line(splines[i]); });
  });
  endload();
});

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

function mouse(e) {
  return [e.pageX - rx, e.pageY - ry];
}

function mousedown() {
  m0 = mouse(d3.event);
  d3.event.preventDefault();
}

//////
function click(d) {

  //clear all previous
  svg.selectAll("path")
      .classed("source2", false)

  svg.selectAll("path")
     .classed("target2", false)

  svg.selectAll("g.node")
     .classed("targetnode", false)

  //clear close2
  document.getElementById('close2').innerHTML = '';

  //show "show addition information by hovering.."
  jQuery('#shownotice').show();

  //clear drug
  document.getElementById("drug").innerHTML = '';

  //clear div
  document.getElementById("div").innerHTML = '';

  //clear bottom
  document.getElementById("drugstotal").innerHTML = '';
  document.getElementById("mildmodsevere").innerHTML = '';
  document.getElementById("notstated").innerHTML = '';

  //then colour the new selection.
  svg.selectAll("path.link.target-" + d.key)
      .classed("target2", true)

  svg.selectAll("path.link.source-" + d.key)
      .classed("source2", true)

  // colour text also
  svg.selectAll("g.node.target")
      .classed("targetnode", true)

  // label sidebar
  drugselected = d.title;

  document.getElementById('title').innerHTML = drugselected;
  document.getElementById('bnflink').innerHTML = "See this drug on the BNF";
  document.getElementById('bnflink').setAttribute("href", this.getAttribute('bnflink'));

  druginteractions = svg.selectAll("path.link.source-" + d.key);

  drugtotal = druginteractions[0].length;

  druginfo = [];

  for (i = 0; i < drugtotal; i++) {
  druginfo.push(druginteractions[0][i].__data__.target.title);
  }

  //create sidebar
  for (i = 0; i < druginfo.length; i++) {
  duv2 = document.getElementById('drug');
  var att = document.createAttribute("target");
  att.value = i+1;
  //document.createAttribute("target").value = i+1;
  duv = document.createElement("a");
  var blep = druginfo[i];
  if (druginfo[0] == undefined) {
        blep = "This drug has no interactions with the other drugs listed in this graph.";
    }
  duv.appendChild(document.createTextNode(blep));
  duv2.appendChild(duv).classList.add("showSingle","sidebar2");
  duv2.appendChild(duv).setAttributeNode(att);
  duv3 = document.createElement("br");
  duv2.appendChild(duv3);
  }

// add list all, hide all, line
duv2 = document.getElementById('drug');

//add a break between drugs and the list all/hide all
duv3 = document.createElement("br");
duv2.appendChild(duv3);

//create list all
duv = document.createElement("a");
duv.appendChild(document.createTextNode("List All"));
duv.id = "showall";
duv2.appendChild(duv).classList.add("sidebar2");

//add break
duv3 = document.createElement("br");
duv2.appendChild(duv3);

//create hide all
duv = document.createElement("a");
duv.appendChild(document.createTextNode("Hide All"));
duv.id = "hideall";
duv2.appendChild(duv).classList.add("sidebar2");

//add break
duv3 = document.createElement("br");
//div2.appendChild(div3);

//create line
duv = document.createElement("hr");

////
/// add div code
druginteractionsinfo = d["Interactions Info"]
druginteractionsinfo2 = []
evidenceinfo = d.Evidence
evidenceinfo2 = []
drugtitles = d.importstitle
severityinfo = d.Severity
severityinfo2 = []

/// add severity totals
mildtotal = document.querySelectorAll("[value~="+d.key+"][severity~=Mild]").length
modtotal = document.querySelectorAll("[value~="+d.key+"][severity~=Moderate]").length
sevtotal = document.querySelectorAll("[value~="+d.key+"][severity~=Severe]").length
natotal = document.querySelectorAll("[value~="+d.key+"][severity~=NotSet]").length + document.querySelectorAll("[value~="+d.key+"][severity~=Unknown]").length

//Bottom
document.getElementById('drugstotal').innerHTML = drugtotal+" Interactions Listed";
document.getElementById('mildmodsevere').innerHTML = sevtotal+" Severe | "+modtotal+" Moderate | "+mildtotal+" Mild";
document.getElementById('notstated').innerHTML = natotal+" Not Stated";

//reversed the order so pushes in druginfo order
//create druginteractionsinfo divs
$(document).ready(function() {
for (ii = 0; ii < druginfo.length; ii++) {
for (i = 0; i < drugtitles.length; i++) {
  if (druginfo[ii] == drugtitles[i]) {
    druginteractionsinfo2.push(druginteractionsinfo[i])
    evidenceinfo2.push(evidenceinfo[i])
    severityinfo2.push(severityinfo[i])
}
}
};

for (i = 0; i < druginfo.length; i++) {
  var dav = document.getElementById('div');
  var dav2 = document.createElement("span");
  var dav3 = document.createTextNode(druginteractionsinfo2[i])
  var dav4 = document.createElement("span");

  dav4.appendChild(document.createElement("br"));
  dav4.appendChild(document.createTextNode("Evidence: "+evidenceinfo2[i]+" | Severity: "+severityinfo2[i]));
  dav4.classList.add("evidsev","sidebar2");
  dav2.appendChild(dav3);
  dav.appendChild(dav2);
  dav2.appendChild(dav4);
  dav2.setAttribute('evidence', evidenceinfo2[i]);
  dav2.setAttribute('severity', severityinfo2[i]);
  dav2.classList.add("targetDiv","sidebar2");
  dav2.id = "div"+(i+1);
}

});

//recolour severe text
$(document).ready(function() {
for (i=0; i < document.querySelectorAll(".showSingle").length; i++) {
document.querySelectorAll(".showSingle")[i]
//.classList.add(severityinfo[i]);
.classList.add(severityinfo2[i]);
};
});

////

//show bottom
jQuery('.bottom').show();
//open sidebar
jQuery('.sidebar').show();
jQuery('.hoveroverlap').show();
//
jQuery('#showall').click(function(){
  //hide evidence/severity span
  //jQuery('.evid/sev').hide();
  //
  jQuery('.targetDiv').show();
        });

jQuery('#hideall').click(function(){
  //hide evidence/severity span
  //jQuery('.evid/sev').hide();
  //
  jQuery('.targetDiv').hide();
        });

jQuery('.showSingle').click(function(){
  //hide evidence/severity span
  //jQuery('.evid/sev').hide();
  //
  jQuery('.targetDiv').hide();
  jQuery('#div'+$(this).attr('target')).show();

  //create span based off class.
        });

//colour severe
        for (i=0; i < document.querySelectorAll(".showSingle").length; i++) {
        document.querySelectorAll(".showSingle")[i]
        //.classList.add(severityinfo[i]);
        .classList.add(severityinfo2[i]);
        };

};

/////

//clear everything on doubleclick
function clear(d) {
  //hide bottom
  jQuery('.bottom').hide();
  //hide sidebar
  jQuery('.sidebar').hide();

  svg.selectAll("path")
      .classed("source2", false)

  svg.selectAll("path")
      .classed("target2", false)

  svg.selectAll("g.node")
     .classed("targetnode", false)

  jQuery('.hoveroverlap').hide();

  //clear drug
  document.getElementById("drug").innerHTML = '';
  var drugselected = null;
  document.getElementById('title').innerHTML = "Click on a drug to get started..";
  document.getElementById('bnflink').innerHTML = '';
  document.getElementById('drugstotal').innerHTML = "X Interactions Listed";
  //clear div
  document.getElementById("div").innerHTML = '';
  //clear bottom
  document.getElementById("drugstotal").innerHTML = '';
  document.getElementById("mildmodsevere").innerHTML = '';
  document.getElementById("notstated").innerHTML = '';
}

function mousemove() {
  if (m0) {
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
    div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
  }
}

function mouseup() {
  if (m0) {
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

    rotate += dm;
    if (rotate > 360) rotate -= 360;
    else if (rotate < 0) rotate += 360;
    m0 = null;

    div.style("-webkit-transform", null);

    svg
    .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
    .selectAll("g.node text")
    .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
    .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; })
  }
}
//var hovering;

function mouseover(d) {
  svg.selectAll("path.link.target-" + d.key)
      .classed("target", true)
      .each(updateNodes("source", true));

  svg.selectAll("path.link.source-" + d.key)
      .classed("source", true)
      .each(updateNodes("target", true));

  //clear close2
  document.getElementById('close2').innerHTML = '';

  var hovering = document.querySelectorAll(".node:hover")[0].__data__.key;
  var drugselected = document.getElementById('title').innerHTML
  var includedinteractions = document.querySelectorAll(".node.targetnode.target");
  var hoverinteractions = document.querySelectorAll(".link.source");

  var dov2 = document.getElementById('close2');
  var dov = document.createElement("a");

  if (hovering == document.getElementById('title').innerHTML) {
      dov.appendChild(document.createTextNode("You're hovering over the selected drug, ("+drugselected+"), try moving the mouse over another drug to compare the two."));
      dov2.appendChild(dov);
      var drugselected = null;
    }
  else {
      dov.appendChild(document.createTextNode("You're hovering over "+hovering+"."));
      dov.appendChild(document.createElement("br"));
      dov.appendChild(document.createTextNode("It has "+hoverinteractions.length+" interactions."));
      dov.appendChild(document.createElement("br"))
      dov.appendChild(document.createTextNode("It shares "+includedinteractions.length+" interaction(s) with "+drugselected+"."));
      dov.appendChild(document.createElement("br"));
      dov.appendChild(document.createElement("br"));
      //
      for (i = 0; i < includedinteractions.length; i++) {
      dov.appendChild(document.createElement("li").appendChild(document.createTextNode("- "+includedinteractions[i].__data__.key)));
      dov.appendChild(document.createElement("br"));
      }
      dov2.appendChild(dov);
    }
    jQuery('#shownotice').hide();
}

function mouseout(d) {
  svg.selectAll("path.link.source-" + d.key)
      .classed("source", false)
      .each(updateNodes("target", false));

  svg.selectAll("path.link.target-" + d.key)
      .classed("target", false)
      .each(updateNodes("source", false));
  document.getElementById('close2').innerHTML = '';
  var hovering = "";
  jQuery('#shownotice').show();
}

function updateNodes(name, value) {
  return function(d) {
    if (value) this.parentNode.appendChild(this);
    svg.select("#node-" + d[name].key).classed(name, value);
  };
}

function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
