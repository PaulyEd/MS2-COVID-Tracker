# COVID-19 Tracker

COVID-19 Tracker is a simplistic dashboard based webstie to provide numerical inforamtion both globally and on a national level related to the coronavirus pandemic. The inforamtion this app proivdes as a visual representation of the free COVID19 API available via Rapid API. 

The app is broke out into 3 main sections as follows:

1. Overiew - Provides a quick snapshot of the important global case numbers in terms of active, deaths, recovered and critical.

2. Tables - Table based data showing every country available via the API, allows for a quick snapshot of the situation on a national level.

3. Graphs - Graphical data showing number of deaths vs number of recovered over time, key for provide a visual of the trend.

## UX & FEATURES

### User Stories
The app is design for the average person who is curious about the coronavirus situation. I know from personal experience everyday in my house at around 6:00pm (right about when the news comes on) I always here the question "oh I wonder what the numbers are today?" (refferring to COVID-19 new cases and deaths). This is a common theme regarding most of the conversations I am having these days "oh have you seen todays numbers?". What most people want in this situation is a quick & concise way to see the situation primarily in their area/country and in a lot of cases due to curiousity what its like globally and in other countries, that is the purpose of this app, minimal frills information presented aesthetically easy to understand.

### Design
As the basis of this app was for data visualisation and presentation I opted to build a dashboard style setup as this would be a common practice & expectation when deisgning a data based app.

**Navbar:** Commonplace on website these days, although doesnt add much value on the larger screen for this app (branding mainly), becomes vital on the mid-smaller screens as the JS functions triggers move from the sidebar to the navbar to allow the data take up more of the screen.

**Sidebar:** Key component of the dashboard style setup, provide a navigation point for the dashboard and helps the side appear less barren (which can be an issue when presenting data). On mid to smaller screens the sidebar disappears as is less important that the data which should be the focus.

**Navbar:** Commonplace on website these days, although doesnt add much value on the larger screen for this app (branding mainly), becomes vital on the mid-smaller screens as the JS functions triggers move from the sidebar to the navbar to allow the data take up more of the screen.

**Jumbotron:** Essential to have some form of information section to provide guidance on data based apps, welcomes the user before providing data provided too soon could cause confusion

**Tables:** Dashboard essential, utilised to show a large volume of data, but with added functionality to allow user to sort & search for the data they want.

**Graphs:** Again dashboard essential for visualising data and trends, common expectation in sitautions like the COVID-19 pandemic where trend over time is a key metric

**Modal:** User guidance easily available for those who need it and out for the way for those who don't need it.

### Wireframes
<img src="/assets/wireframes/wireframe-mobile.png" style="center" width="25%">
<img src="/assets/wireframes/wireframe-desktop.png" style="center" width="40%">


## TECHNOLOGIES USED

### Languages
* [HTML](https://en.wikipedia.org/wiki/HTML)  - Struture of the page.
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Style of the page.
* [Javascript](https://en.wikipedia.org/wiki/JavaScript) - User and API interaction/animation.

### API
* [COVID-19 Free API](https://rapidapi.com/api-sports/api/covid-193/details)

### Libraries
* [Bootstrap 4.5](https://getbootstrap.com/)
* [Font Awesome 4.7](https://fontawesome.com/v4.7.0/)
* [JQuery 3.5.1](https://jquery.com/)
* [Datatables 1.10.20](https://datatables.net/)
* [Select2 4.1.0](https://select2.org/)
* [Popper.js 1.16.0](https://popper.js.org/)
* [Chart.js 2.8.0](https://www.chartjs.org/)

### Tools
* [Github](https://github.com/) - Repository Hosting.
* [Gitpod](https://www.gitpod.io/) - IDE.
* [Google Chrome developer tools](https://developers.google.com/web/tools/chrome-devtools) - UX Testing.
* [Responsive Test Tools](http://responsivetesttool.com/) - UX Testing.
* [W3C - HTML Validator](https://validator.w3.org/) - Validate HTML.
* [W3C - CSS Validator](https://jigsaw.w3.org/css-validator/) - Validate CSS.
* [PurifyCSS](https://purifycss.online/) - Remove unused CSS.
* [CSS-beautify](https://www.cleancss.com/css-beautify/) - Format CSS.
* [Loading.io](https://loading.io/) - Create loading image.
* [AutoPrefixer](https://autoprefixer.github.io/) - Add vendor prefixes to CSS.
* [Codepen](https://codepen.io/) - Isolated code testing.
* [Figma] (https://www.figma.com/) - Wireframes.

## TESTING



## DEPLOYMENT

### Deploy to Github Pages

1. Open GitHub and go to the projects **'Repository'**
2. Click **'Settings'**
3. Scroll down to the **'GitHub Pages'** section
4. Click on the dropdown under **'Source'** and select the **'Master Branch'** option
5. A green box should appear with the following message **'Your site is published at.../'**


### Cloning a Repository 

1. Go to the main page of the GitHub repository and click on the dropdown menu **'Clone or download'**
2. Copy the URL and go to your local IDE (Integrated Development Environment)
3. In the terminal of your IDE type in **'git clone'** and the paste the URL copied from step 2 
4. Press **Enter** and the clone will be created


## CREDITS

### Media
- The images/icons used in this site were obtained from [Flaticon](https://www.flaticon.com/) & [Loading.io](https://loading.io/) (See Fair Use Disclaimer)

### Acknowledgements

I received inspiration for this project from the below websites:

1. [Worldometers](https://www.worldometers.info/coronavirus/)
2. [Google Covid19](https://news.google.com/covid19/map?hl=en-IE&gl=IE&ceid=IE:en)

### Code Snippets / References
Below links helped me in various parts of the project to overcome issues:
#### Sidebar:
* https://stackoverflow.com/questions/49641293/bootstrap-4-fixed-top-nav-and-fixed-sidebar
* https://www.codeply.com/go/3e0RAjccRO/bootstrap-4-collapsing-sidebar-menu
* https://www.codeply.com/p/FpImnZeaPt
* https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp

#### JSON & AJAX:
* https://www.youtube.com/watch?v=rJesac0_Ftw

#### JQuery:
* https://www.youtube.com/watch?v=rJesac0_Ftw
* https://www.w3schools.com/jquery/html_toggleclass.asp
* https://stackoverflow.com/questions/12934144/how-to-reload-refresh-jquery-datatable
* https://stackoverflow.com/questions/5000415/call-a-function-after-previous-function-is-complete
* https://stackoverflow.com/questions/10932766/disable-the-submit-button-after-clicking-and-enable-it-back-again-after-a-few-se/10932857
* https://stackoverflow.com/questions/12374356/disable-jquery-function-for-x-seconds

#### Chart.js:
* https://www.chartjs.org/docs/latest/getting-started/
* https://medium.com/wdstack/bootstrap-4-chart-js-39006427f08f
* https://www.youtube.com/watch?v=5-ptp9tRApM
* https://stackoverflow.com/questions/39723147/change-x-and-y-axis-font-color
* https://stackoverflow.com/questions/35854244/how-can-i-create-a-horizontal-scrolling-chart-js-line-chart-with-a-locked-y-axis
* https://stackoverflow.com/questions/24785713/chart-js-load-totally-new-data
* https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis

#### Misc:
* https://stackoverflow.com/questions/9372624/formatting-a-number-as-currency-using-css
* https://stackoverflow.com/questions/4537227/javascript-replace-special-chars-with-empty-strings/4537264
* https://getbootstrap.com/docs/4.0/components/pagination/
* https://stackoverflow.com/questions/46462171/using-the-same-function-with-multiple-buttons
* https://stackoverflow.com/questions/50715991/update-javascript-variable-on-a-html-select-value-change
* https://codepen.io/profoj/pen/abzgpLN
* https://stackoverflow.com/questions/8595909/how-to-completely-disable-any-mouse-click
* https://getbootstrap.com/docs/4.4/content/tables/
* https://stackoverflow.com/questions/39260521/how-to-replace-all-the-zeros-in-javascript

## FAIR USE DISCLAIMER
 - The images, icons and graphics used in this project are not owned by me and I have not been given permission to use these, the purpose of their inclusion is purely for visuals within the project and the entire project is for nonprofit educational purposes. If this site was to ever go outside the remit of "nonprofit educational" then these images would be removed prior to such action.