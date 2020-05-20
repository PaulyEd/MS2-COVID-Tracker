$(document).ready(function () {
  // Hide submenus
  //   $("#body-row .collapse").collapse("hide");

  // Collapse/Expand icon
  $("#collapse-icon").addClass("fa-angle-double-left");

  // Collapse click
  $("[data-toggle=sidebar-colapse]").click(function () {
    SidebarCollapse();
  });
  $(".navbar-nav>li>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
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
    } else {
      SeparatorTitle.addClass("d-flex");
    }
  }
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // TABLE POPULATE FUNCTION
  var statsConatiner = document.getElementById("table");
  var data = null;
  var tableBtn = document.getElementById("table-btn");

  var clickDelay = function () {
    $(".table-btn").click(function () {
      // add loader gif
      document.getElementById("body-row").insertAdjacentHTML(
        "beforeend",
        `<div class=" container spinner-container" id="spinner">
            <img src="assets/images/spinner.gif" alt="loading..." />
        </div>`
      );

      $("#table_wrapper").addClass("d-hidden").addClass("d-none");
      $("#table").empty();

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          var ourData = JSON.parse(this.responseText);
          //   console.log(ourData.response);
          //   remove loader gif
          //   $("#spinner").remove();
          $.when(getHTML(ourData.response)).then(setTimeout(showpanel, 1));
        }
      });

      xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
      xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
      xhr.setRequestHeader(
        "x-rapidapi-key",
        "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46"
      );
      xhr.send(data);
      $(".table-btn").unbind();

      // Call the function after 2 second delay
      setTimeout(function () {
        clickDelay();

        // adds classes for table fomatting mainly related to overflow

        $("#table").parent("div").addClass("table_scroll");
        $("#table_wrapper").addClass("table_wrapper");
        $("#table_paginate").children("ul").addClass("pagination-sm");
        setTimeout(showtable, 1);
      }, 2000);
    });
  };
  clickDelay();

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

    for (i = 0; i < data.length; i++) {
      htmlString +=
        `<tr>
      <th scope="row">` +
        data[i].country +
        `</th>` +
        `<td>` +
        data[i].cases.total.toLocaleString("en") +
        `</td>` +
        `<td>` +
        convertToInt(data[i].cases.new) +
        `</td>` +
        `<td>` +
        data[i].deaths.total.toLocaleString("en") +
        `</td>` +
        `<td>` +
        convertToInt(data[i].deaths.new) +
        `</td>`;
    }

    statsConatiner.insertAdjacentHTML("afterbegin", htmlString + `</tbody>`);

    function convertToInt(arrayPoint) {
      if (arrayPoint == null) {
        x = `0`;
      } else x = arrayPoint.replace(/[^a-zA-Z 0-9. < / > , -]+/g, "");
      y = parseInt(x).toLocaleString("en");
      //   console.log(y);
      return y;
    }
  }
  function showpanel() {
    $("#table").DataTable().destroy();
    $("#table").DataTable();
    $("#table_wrapper")
      .removeClass("form-inline")
      .addClass("d-hidden")
      .addClass("d-none");
  }

  function showtable() {
    $("#spinner").remove();
    $("#table").removeClass("d-hidden").removeClass("d-none");
    $("#table_wrapper").removeClass("d-hidden").removeClass("d-none");
  }

  //////////////////////////////////////////////////////////////////////////////

  
  //////////////////////////////////////////////////////////////////////////////
  // TABLE COUNTRIES FUNCTION
  $(".graph-btn").click(function () {
    var dashboard = document.getElementById("dashboardCountry");
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var ourData = JSON.parse(this.responseText);
        getCountries(ourData.response);
      }
    });

    xhr.open("GET", "https://covid-193.p.rapidapi.com/countries");
    xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46"
    );
    xhr.send(data);

    function getCountries(data) {
      var htmlString = `
				<select class="js-example-basic-single" name="state">`;

      for (i = 0; i < data.length; i++) {
        htmlString +=
          `<option value="` + data[i] + `">` + data[i] + `</option>`;
      }
      dashboard.insertAdjacentHTML(
        "afterbegin",
        htmlString + `</select>`
      );

      $(".js-example-basic-single").select2();
      $("#dashboardCountry").toggleClass("d-none");
    }
  });

//////////////////////////////////////////////////////////////////////////////
  // GRAPH POPULATE FUNCTION

$("#get-graph").click(function () {
    var country = "usa";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var historyData = JSON.parse(this.responseText);
        console.log(historyData.response);
        getData(historyData.response);
        // var date = historyData.response[35].day;
        // console.log(date);
      }
    });

    xhr.open(
      "GET",
      `https://covid-193.p.rapidapi.com/history?country=${country}`
    );
    xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46"
    );

    xhr.send(data);
  });

  function getData(data) {
    var ctx = document.getElementById("myChart");
    var xlabels = [];
    var caseData = [];
    var deathData = [];

    for (i = parseInt(data.length) - 1; i >= 0; i--) {
      var dates = data[i].day;
      var cases = data[i].cases.recovered;
      var deaths = data[i].deaths.total;
      xlabels.push(dates);
      caseData.push(cases);
      deathData.push(deaths);
      //   console.log(cases);
    }
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xlabels,
        datasets: [
          {
            label: "# Recovered",
            data: caseData,
            fill: false,
            pointStyle: "line",
            backgroundColor: "rgba(0, 99, 132, 0.2)",
            borderColor: "green",
            borderWidth: 2,
            lineTension: 1,
          },
          {
            label: "# Deaths",
            data: deathData,
            fill: false,
            pointStyle: "line",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "red",
            borderWidth: 2,
            lineTension: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "white",
          },
        },
        title: {
          display: true,
          fontColor: "white",
          text: "Data over time",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
              },
            },
          ],
        },
      },
    });
    $("#dashboard-graphs").toggleClass("d-none");
  }
  //////////////////////////////////////////////////////////////////////////////
  // RESET dashboard-content Container to be built to run before each seperate function
});
