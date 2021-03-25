//Function to load the data of json file into the website
function loadJSON(res_file){
  let cardContainer = document.getElementsByClassName("card-container")[0];
// As long as cardContainer has a child node, remove it
while (cardContainer.hasChildNodes()) {  
  cardContainer.removeChild(cardContainer.firstChild);
}
  for (let data in res_file) {
    let emptyDiv = document.createElement("div");
    emptyDiv.className = "empty_div";
    let eventCard = document.createElement("div");
    eventCard.className = "event_card";
    let eventTitle = document.createElement("div");
    let heading = document.createElement("h3");
    heading.innerText = res_file[data].title;
    heading.className = "event_title";
    eventTitle.appendChild(heading);
    let startDate = document.createElement("span");
    startDate.className = "date";
    startDate.innerHTML = `<b>Starts:</b> ${res_file[data].start}`;
    let endDate = document.createElement("span");
    endDate.className = "date";
    endDate.innerHTML = `<b>Ends:</b> ${res_file[data].end}`;
    let eventDetails = document.createElement("div");
    eventDetails.className = "event_details";
    let eventLink = document.createElement("a");
    Object.assign(eventLink, {
      href: `https://${res_file[data].website}`,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "btn btn-primary link",
    });
    let link = document.createElement("h6");
    link.innerText = "More Info";
    eventLink.appendChild(link);
    let organisation = document.createElement("p");
    organisation.className = "event_organisation";
    organisation.innerHTML = `<b>Organisation: ${res_file[data].organisation}`;
    let loc = document.createElement("h5");
    let eventStatus = res_file[data].location;
    setEventStatus();
    loc.innerText = eventStatus;
    eventDetails.append(startDate, endDate, organisation, loc, eventLink);
    eventCard.append(eventTitle, eventDetails);
    emptyDiv.appendChild(eventCard);
    cardContainer.appendChild(emptyDiv);

    //function to set the status of event
    function setEventStatus() {
      let endDate = res_file[data].end.split("/", 3);
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
}

// Fetch data from events.json file
fetch("./Frontend/data/events.json")
  .then((res) => res.json())
  .then((res) => { 
    loadJSON(res);
});

// search an event

//functions to calculate the similarity score between two strings

function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
}

function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function sortJSON(res_file, input)
{
  for(let data in res_file)
  {
    if(res_file[data].title.toLowerCase().indexOf(input) != -1)
    {
      res_file[data].score = 1;
    }
    else {
      res_file[data].score = similarity(res_file[data].title.toLowerCase(),input.toLowerCase());
    }
  }
  res_file = res_file.filter(function (a){return a.score >= 0.08});
  res_file.sort(function(a,b){return b.score - a.score });
  loadJSON(res_file);

}



let search = document.querySelector(".form-control");

search.addEventListener("keyup", searchTerm);

//function to search the event
function searchTerm(e) {

  fetch("./Frontend/data/events.json")
  .then((res) => res.json())
  .then((res_file) => { 
    let input = e.target.value.toLowerCase();
    if (input !="")
    {
      sortJSON(res_file,input);
    }
    else
      loadJSON(res_file);
});

}

const toggleSwitch = document.querySelector(".custom-control-input");
const text = document.querySelector(".custom-control-label");
function darkMode() {
  text.children[0].textContent = "Dark";
  text.children[1].classList.replace("fa-sun-o", "fa-moon-o");
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
