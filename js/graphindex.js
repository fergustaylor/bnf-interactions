jQuery(function(){

jQuery('#close').click(function(){
  jQuery('.sidebar').hide();
        });

jQuery('#open').click(function(){
  jQuery('.sidebar').show();
        });
});

function toggleCheckbox(element)
 {
   if (document.cssbox.cssbox.checked==true) {
   //var x = document.querySelectorAll("path.Severe");
   var x = document.querySelectorAll("path[severity='Severe']");
   for (i = 0; i < x.length; i++) {
       x[i].style.stroke = "crimson";
     };
   }
   if (document.cssbox.cssbox.checked==false) {
   //var x = document.querySelectorAll("path.Severe");
   var x = document.querySelectorAll("path[severity='Severe']");
   var i;
   for (i = 0; i < x.length; i++) {
       x[i].style.stroke = "1f77b4";
     };
   }
 }
