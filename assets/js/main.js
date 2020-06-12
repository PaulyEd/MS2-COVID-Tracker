$(document).ready(function () {
  /////////////////SIDE BAR FUNCTIONS////////////////////////////

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
    let SeparatorTitle = $(".sidebar-separator-title");
    if (SeparatorTitle.hasClass("d-flex")) {
      SeparatorTitle.removeClass("d-flex");
    } else {
      SeparatorTitle.addClass("d-flex");
    }
  }
  /////////////////SIDE BAR FUNCTIONS END//////////////////////////

  /////////////////TABLE POPULATE FUNCTION////////////////////////////
  let data = null;
  let clickDelay = function () {
    $(".table-btn").click(function () {
      reset();
    //   adds entire screen overlay to prevent clicking other funcitons while table loading
      $(`<div class="overlay"></div>`).insertAfter(`body`);
      // add loader gif
      document.getElementById("dashboard-content").insertAdjacentHTML(
        "beforeend",
        `<div class=" container spinner-container" id="spinner">
            <img src="assets/images/spinner.gif" alt="loading..." />
        </div>`
      );
      // request to API
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          let ourData = JSON.parse(this.responseText);
          $.when(getTableData(ourData.response)).then(setTimeout(showpanel, 1));
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
        $(".overlay").remove();
        setTimeout(showtable, 1);
      }, 2000);
    });
  };
  clickDelay();
  ///////////////TABLE POPULATE FUNCTION END/////////////////////

  //////////COUNTRIES FOR TABLE FUNCTION////////////////////////
  let country = "";
  $(".graph-btn").click(function () {
    reset();
    let dashboard = document.getElementById("selector-container");
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let ourData = JSON.parse(this.responseText);
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
  });
  //////////COUNTRIES FOR TABLE FUNCTION END/////////////////////

  ///////////////GRAPH DATA FUNCTION/////////////////////

  $("#get-graph").click(function () {
    $("#myChart").remove();
    $(".chartjs-size-monitor").remove();
    $("#graph-container").append(
      '<canvas id="myChart" class="transparent"></canvas>'
    );

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let historyData = JSON.parse(this.responseText);
        
        getChartData(historyData.response);
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
  ///////////////GRAPH DATA FUNCTION END//////////////////

  ///////////////OVERVIEW STATS FUNCTION/////////////////////
  let Delay = function () {
    $(".overview-btn").click(function () {
      $(this).attr("disabled", "disabled");
      reset();
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          let allData = JSON.parse(this.responseText);
          getAll(allData.response);
        }
      });

      xhr.open("GET", `https://covid-193.p.rapidapi.com/statistics`);
      xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
      xhr.setRequestHeader(
        "x-rapidapi-key",
        "90e2122e22msh4c0aac5a8989099p15d268jsn72c57b8e8b46"
      );
      xhr.send(data);

      $(".overview-btn").unbind();
      setTimeout(function () {
        Delay();
      }, 2000);
    });
  };
  Delay();
  ///////////////OVERVIEW STATS FUNCTION END//////////////////

  $(".navbar-brand").click(function () {
    reset();
    $(".jumbotron").removeClass("d-none");
  });

  //////////////////////////Get Functions/////////////////////////
  function getCountries(data) {
    let htmlString = `
				<select id="selectCountry">`;

    for (i = 0; i < data.length; i++) {
      htmlString += `<option value="` + data[i] + `">` + data[i] + `</option>`;
    }

    $("#selector-container").html(`${htmlString} + </select>`);
    $("#selectCountry").select2().unbind();
    $("#selectCountry").select2();
    $("#dashboardCountry").removeClass("d-none");

    //   Use Country selector as variable
    let selectCountry = document.getElementById("selectCountry");
    let lvl = document.getElementById("lvl");
    selectCountry.onchange = function () {
      country = this.options[this.selectedIndex].getAttribute("value");
    };
    selectCountry.onchange();
  }

  function getAll(data) {
    let overviewContainer = document.getElementById("overview");
    let htmlString = ``;

    for (i = 0; i < data.length; i++) {
      if (data[i].country == "All") {
        htmlString +=
          `<div class="row row-overview">
					<div class="col-12 col-md-6">
                    <h2>Total Cases</h2>
                    <h1 class="neutral">` +
          data[i].cases.total.toLocaleString("en") +
          `</h1>
					</div>
					<div class="col-12 col-md-6">
                    <h2>Total Active</h2>
                    <h1 class="neutral">` +
          data[i].cases.active.toLocaleString("en") +
          `</h1>
					</div>
				</div>
                <div class="row row-overview">
					<div class="col-12 col-md-6">
                    <h2>Total Recovered</h2>
                    <h1 class="recoveries">` +
          data[i].cases.recovered.toLocaleString("en") +
          `</h1>
					</div>
					<div class="col-12 col-md-6">
                    <h2>Total Deaths</h2>
                    <h1 class="deaths">` +
          data[i].deaths.total.toLocaleString("en") +
          `</h1>
					</div>
				</div>
                <div class="row row-overview">
					<div class="col-12 col-md-6">
                    <h2>Total Critical</h2>
                    <h1 class="caution">` +
          data[i].cases.critical.toLocaleString("en") +
          `</h1>
					</div>
					<div class="col-12 col-md-6">
                    <h2 data-toggle="popover" data-content="Note: This statistic only represents data for cases that have come to a definitive conclusion">Death Rate</h2>
                    <h1 class="deaths">` +
          //   Death rate calculation
          (
            (parseInt(data[i].deaths.total) /
              (parseInt(data[i].cases.recovered) +
                parseInt(data[i].deaths.total))) *
            100
          ).toFixed(2) +
          `%</h1>
					</div>
				</div>`;
      }
    }
    // Side note on hover for death rate
    overviewContainer.insertAdjacentHTML("afterbegin", htmlString);
    $('[data-toggle="popover"]').popover({
      placement: "top",
      trigger: "hover",
    });
  }

  function getChartData(data) {
    let ctx = document.getElementById("myChart");
    let xlabels = [];
    let caseData = [];
    let deathData = [];

    for (i = parseInt(data.length) - 1; i >= 0; i--) {
      let dates = data[i].day;
      let cases = data[i].cases.recovered;
      let deaths = data[i].deaths.total;
      xlabels.push(dates);
      caseData.push(cases);
      deathData.push(deaths);
    }
    let myChart = new Chart(ctx, {
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
                // thousands separator style
                userCallback: function (value, index, values) {
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(",");
                  return value;
                },
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
    $("#dashboard-graphs").removeClass("d-none");
    $("#card-border").removeClass("border-0");
  }

  function getTableData(data) {
    let statsConatiner = document.getElementById("table");
    let htmlString = `<thead>
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
      if (
        data[i].country == "All" ||
        data[i].country == "North-America" ||
        data[i].country == "Europe" ||
        data[i].country == "Asia" ||
        data[i].country == "South-America"
      ) {
      } else
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
    // remove misc characters and convert to thousands separator style
    function convertToInt(arrayPoint) {
      if (arrayPoint == null) {
        x = `0`;
      } else x = arrayPoint.replace(/[^a-zA-Z 0-9. < / > , -]+/g, "");
      y = parseInt(x).toLocaleString("en");
      return y;
    }
  }

  //////////////////////JQuery based functions//////////////////////////////////

  function reset() {
    $("#overview").html(``);
    $(".jumbotron").addClass("d-none");
    $("#dashboardStats").addClass("d-none");
    $("#dashboardCountry").addClass("d-none");
    $("#dashboard-graphs").addClass("d-none");
    $("#table_wrapper").addClass("d-hidden").addClass("d-none");
    $("#table").empty();
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
    $("#dashboardStats").removeClass("d-none");
  }
});
