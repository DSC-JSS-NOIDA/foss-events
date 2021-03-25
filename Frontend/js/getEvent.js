// Fetch data from events.json file
fetch("./Frontend/data/events.json")
  .then((res) => res.json())
  .then((res) => {
    let cardContainer = document.getElementsByClassName("card-container")[0];
    for (let data in res) {
      let emptyDiv = document.createElement("div");
      emptyDiv.className = "empty_div";
      let eventCard = document.createElement("div");
      eventCard.className = "event_card";
      let eventTitle = document.createElement("div");
      let heading = document.createElement("h3");
      heading.innerText = res[data].title;
      heading.className = "event_title";
      eventTitle.appendChild(heading);
      let startDate = document.createElement("span");
      startDate.className = "date";
      startDate.innerHTML = `<b>Starts:</b> ${res[data].start}`;
      let endDate = document.createElement("span");
      endDate.className = "date";
      endDate.innerHTML = `<b>Ends:</b> ${res[data].end}`;
      let eventDetails = document.createElement("div");
      eventDetails.className = "event_details";
      let eventLink = document.createElement("a");
      Object.assign(eventLink, {
        href: `https://${res[data].website}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "btn btn-primary link",
      });
      let link = document.createElement("h6");
      link.innerText = "More Info";
      eventLink.appendChild(link);
      let organisation = document.createElement("p");
      organisation.className = "event_organisation";
      organisation.innerHTML = `<b>Organisation: ${res[data].organisation}`;
      let loc = document.createElement("h5");
      let eventStatus = res[data].location;
      setEventStatus();
      loc.innerText = eventStatus;
      eventDetails.append(startDate, endDate, organisation, loc, eventLink);
      eventCard.append(eventTitle, eventDetails);
      emptyDiv.appendChild(eventCard);
      cardContainer.appendChild(emptyDiv);

      //function to set the status of event
      function setEventStatus() {
        let endDate = res[data].end.split("/", 3);
        endDate = `${endDate[1]}/${endDate[0]}/${endDate[2]}`;
        endDate = new Date(endDate);
        if (new Date() > endDate) {
          eventStatus = "Offline";
          loc.className = "locationOffline";
        } else {
          loc.className = "locationOnline";
        }
      }
    }
  });

// search an event
let search = document.querySelector(".form-control");
search.addEventListener("keyup", searchTerm);

//function to search the event
function searchTerm(e) {
  var eventList = document.querySelectorAll('.empty_div');
  let input = e.target.value.toLowerCase();
  eventList.forEach(eventItem => {
    let toSearch = eventItem.childNodes[0].children[0].childNodes[0].innerText;
    if (toSearch.toLowerCase().indexOf(input) != -1) {
      eventItem.style.display = 'block';
    }
    else {
      eventItem.style.display = 'none';
    }
  });
}


// filter an event 
let filterBtn = document.getElementById("filterSubmit");
filterBtn.addEventListener('click', filterResult);

// function to filter events
function filterResult(e) {

  var startFilter = document.getElementsByClassName("date-begin");
  var endFilter = document.getElementsByClassName("date-end");

  // checking that the value should not be null for both the input
  if (startFilter[0].valueAsDate === null || endFilter[0].valueAsDate === null)
    alert("Enter both the fields");


  // the start date should always be less than end date 
  else if (+(startFilter[0].valueAsDate) >= +(endFilter[0].valueAsDate))
    alert("The Start Filter should be less than end Filter")

  else {
    // getting the left bound of the input range
    var splitLeft = (startFilter[0].value).split('-');
    var leftDate = new Date(splitLeft[0], splitLeft[1] - 1, splitLeft[2]);


    // getting the right bound of the input range
    var splitRight = (endFilter[0].value).split('-');
    var rightDate = new Date(splitRight[0], splitRight[1] - 1, splitRight[2]);

    var eventList = document.querySelectorAll('.empty_div');

    eventList.forEach((event) => {
      // getting the start dates for all events
      var innerDate = (event.childNodes[0].children[1].childNodes[0].innerText);
      var startSplit = ((innerDate.split(':'))[1]).split('/')

      var startDate = new Date(startSplit[2], startSplit[1] - 1, startSplit[0]);
      


      // getting the end dates for all events
      var outerDate = (event.childNodes[0].children[1].childNodes[1].innerText);
      var endSplit = ((outerDate.split(':'))[1]).split('/')

      var endDate = new Date(endSplit[2], endSplit[1] - 1, endSplit[0]);
     


      // comparison between the dates
      if (rightDate > startDate && leftDate < endDate)
        event.style.display = 'block';
      else {
        event.style.display = 'none';
      }

    })
  }
}


window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("my-form");
  var name = document.getElementById("validationCustom01");
  var email = document.getElementById("validationCustom02");
  var message = document.getElementById("validationCustom03");
  // var button = document.getElementById("my-form-button");
  var status = document.getElementById("status");
  // Success and Error functions for after the form is submitted

  function success() {
    form.value='';
    name.value='';
    email.value='';
    message.value='';
    status.classList.add("success");
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

const toggleSwitch=document.querySelector('.custom-control-input');
const text=document.querySelector('.custom-control-label');
function darkMode(){
  text.children[0].textContent="Dark";
  text.children[1].classList.replace('fa-sun-o','fa-moon-o');
}
function lightMode() {
  text.children[0].textContent = "Light";
  text.children[1].classList.replace("fa-moon-o", "fa-sun-o");
}
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    lightMode();
  }
}
toggleSwitch.addEventListener("change", switchTheme);
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}

//Scroll to top
const Top = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    Top.classList.add("active");
  } else {
    Top.classList.remove("active");
  }
});
