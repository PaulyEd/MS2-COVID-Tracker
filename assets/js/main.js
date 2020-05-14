$(document).ready(function () {
  // Hide submenus
//   $("#body-row .collapse").collapse("hide");

  // Collapse/Expand icon
  $("#collapse-icon").addClass("fa-angle-double-left");

  // Collapse click
  $("[data-toggle=sidebar-colapse]").click(function () {
    SidebarCollapse();
  });

  function SidebarCollapse() {
    $(".menu-collapsed").toggleClass("d-none");
    $(".sidebar-submenu").toggleClass("d-none");
    $(".submenu-icon").toggleClass("d-none");
    $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $(".sidebar-separator-title");
    if (SeparatorTitle.hasClass("d-flex")) {
      SeparatorTitle.removeClass("d-flex");
    } else {
      SeparatorTitle.addClass("d-flex");
    }

    // Collapse/Expand icon
    $("#collapse-icon").toggleClass(
      "fa-angle-double-left fa-angle-double-right"
    );
  }
});
///////////////////////////////////////////////////////////////////////////////

var statsConatiner = document.getElementById("dashboardData")
var overviewButton = document.getElementById("overview");

overviewButton.addEventListener("click",function(){
    var ourRequest = new XMLHttpRequest();
ourRequest.open('GET','https://api.thevirustracker.com/free-api?global=stats');
ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    // console.log(ourData.results[0].total_cases);
    renderHTML(ourData);
    }
    ourRequest.send();
} )

function renderHTML(data){
    var htmlString = "";

    for (i=0; i < data.results.length; i++){
        htmlString += "<p>" + data.results[i].total_cases +"-"+ data.results[i].total_deaths +"</p>";
    }

    statsConatiner.insertAdjacentHTML('beforeend',htmlString);
}

///////////////////////////////////////////////////////////////////////////////


// var data = null;
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
// 	if (this.readyState === this.DONE) {
//         var ourData = JSON.parse(this.responseText);
// 		console.log(ourData.response[0].cases.active);
// 	}

// xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics?country=Ireland");
// xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
// xhr.setRequestHeader("x-rapidapi-key", "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46");

// xhr.send(data);


var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var ourData = JSON.parse(this.responseText);
		console.log(ourData.response[0].cases.total);
	}
});

xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46");

xhr.send(data);