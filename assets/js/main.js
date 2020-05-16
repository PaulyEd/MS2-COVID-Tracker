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
       // Collapse/Expand icon
    $("#collapse-icon").toggleClass(
      "fa-angle-double-left fa-angle-double-right"
    );
    
    $(".menu-collapsed").toggleClass("d-none");
    $(".sidebar-submenu").toggleClass("d-none");
    $(".submenu-icon").toggleClass("d-none");
    $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $(".sidebar-separator-title");
    if (SeparatorTitle.hasClass("d-flex")) {
      SeparatorTitle.removeClass("d-flex");
      á;
    } else {
      SeparatorTitle.addClass("d-flex");
    }

   
  }
});
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

var statsConatiner = document.getElementById("table");
var data = null;
var tableBtn = document.getElementById("table-btn");

tableBtn.addEventListener("click", function () {
  $("#table_wrapper").addClass("d-hidden");
  $("#table").empty();
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var ourData = JSON.parse(this.responseText);
      console.log(ourData.response);
      getHTML(ourData.response);
    }
  });

  xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
  xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46"
  );

  xhr.send(data);
  setTimeout(showpanel, 1000);
  setTimeout(showtable, 1000);
});
function getHTML(data) {
  var htmlString = `<thead>
					<tr>
						<th scope="col">Country</th>
						<th scope="col">Total Cases</th>
						<th scope="col">New Cases</th>
						<th scope="col">Total Deaths</th>
						<th scope="col">New Deaths</th>
					</tr>
				</thead>
				<tbody>`;
  var replacedString = "";

  //   dataConatiner.insertAdjacentHTML("beforeend", htmlString);
  for (i = 0; i < data.length; i++) {
    htmlString +=
      `<tr>
      <th scope="row">` +
      data[i].country +
      `</th>` +
      `<td>` +
      data[i].cases.total +
      `</td>` +
      `<td>` +
      data[i].cases.new +
      `</td>` +
      `<td>` +
      data[i].deaths.total +
      `</td>` +
      `<td>` +
      data[i].deaths.new +
      `</td>`;
    replacedString = htmlString.replace(/null/g, 0);
  }

  statsConatiner.insertAdjacentHTML("beforeend", replacedString + `</tbody>`);
}
function showpanel() {
  $("#table").DataTable().destroy();
  $("#table").DataTable();
  $("#table_wrapper").removeClass("form-inline");
}

function showtable() {
  $("#table").removeClass("d-hidden");
  $("#table_wrapper").removeClass("d-hidden");
}

var refreshBtn = document.getElementById("refresh");

refreshBtn.addEventListener("click", function () {});
