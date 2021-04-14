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

  
// Filters for Events

// Search Filter Element
const searchWrapper = document.querySelector(".search-input");
const search = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector("i");
search.addEventListener('keyup', applyFilter);

// Event Status Filter Element
let eventStatusFilterElement = document.querySelector('#event-status-filter');
eventStatusFilterElement.addEventListener('change', applyFilter);

// Event Range Start Element
let eventRangeStartElement= document.getElementById("range-start");
eventRangeStartElement.addEventListener('change', applyFilter);

let eventRangeEndElement = document.getElementById("range-end");
eventRangeEndElement.addEventListener('change', applyFilter);

// Filter Event Function
function applyFilter(){
  
  // To remove all class of no_result
  let cardContainer = document.getElementsByClassName("card-container")[0];
  let elements = cardContainer.getElementsByClassName('no_result');
  while (elements[0])
      elements[0].parentNode.removeChild(elements[0])
  // ends

  let eventList = document.querySelectorAll('.empty_div');
  Array.from(eventList).forEach( eventItem => {
    eventItem.style.display = 'block';
  });

  let searchTerm = search.value.toLowerCase();
  filterBySearchTerm(searchTerm, eventList,1);

  let reqStatus = eventStatusFilterElement.value.toLowerCase();
  filterByStatus(reqStatus, eventList);

  let rangeStart = eventRangeStartElement.valueAsDate;
  let rangeEnd = eventRangeEndElement.valueAsDate;
  console.log(rangeStart, rangeEnd)
  filterByRange(rangeStart, rangeEnd, eventList)

}

// Filter by Search Term
function filterBySearchTerm(searchTerm, eventList,check) {
  if(check == 1){
    let userData = searchTerm; //user enetered data
  let suggestions=[];
  Array.from(eventList).forEach( eventItem => {
    let eventTitle = eventItem.querySelector('.event_title').innerText.toLowerCase();
    console.log(eventTitle);
    suggestions.push(eventTitle);
  });

    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{

        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
  }
  
  Array.from(eventList).forEach( eventItem => {

    let eventTitle = eventItem.querySelector('.event_title').innerText.toLowerCase()

    if (eventTitle.indexOf(searchTerm) == -1){
      eventItem.style.display = 'none';
    }
  });
}
function select(element){
  let selectData = element.textContent;
  search.value = selectData.toUpperCase();
  icon.onclick = ()=>{
      
  }
  searchWrapper.classList.remove("active");
  let eventList = document.querySelectorAll('.empty_div');
  let searchTerm = search.value.toLowerCase();
  filterBySearchTerm(searchTerm, eventList,0);
}

function showSuggestions(list){
  let listData;
  if(!list.length){
      userValue = search.value;
      listData = '<li>'+ userValue +'</li>';
  }else{
      listData = list.join('');
  }
  suggBox.innerHTML = listData;
}

// Filter by Status
function filterByStatus(reqStatus, eventList) {
  let notReqClass = '';
  if( reqStatus == 'online') {
    notReqClass = '.locationOffline'
  }
  else if(reqStatus == 'offline') {
    notReqClass = '.locationOnline'
  }
  else {
    return;
  }

  Array.from(eventList).forEach( eventItem => {

    let currentEventStatus = eventItem.querySelector(notReqClass)  

    if (currentEventStatus) {
      eventItem.style.display = 'none';
    }

  });
}

// Filter by Range
function filterByRange(rangeStart, rangeEnd, eventList) {
  if(rangeStart == null) {
    rangeStart = new Date('0001-01-01T00:00:00Z');
  }

  if(rangeEnd == null) {  
    rangeEnd = new Date((new Date().getFullYear()) + 100,1,1);
  }

  // the rangeStart should always be less than rangeEnd
  if (rangeStart.getTime() >= rangeEnd.getTime()) {
    alert("The Range Start should be less than Range End");
    return;
  }
  let eventCount=eventList.length;
  Array.from(eventList).forEach( eventItem => {

    let eventStartDateStr = eventItem.querySelectorAll(".date")[0].innerText.split(':')[1].split('/')
    let eventEndDateStr = eventItem.querySelectorAll(".date")[1].innerText.split(':')[1].split('/')

    
    let eventStartDate = new Date(eventStartDateStr[2], eventStartDateStr[1] - 1, eventStartDateStr[0]);
    let eventEndDate = new Date(eventEndDateStr[2], eventEndDateStr[1] - 1, eventEndDateStr[0]);

    if ( (rangeEnd.getTime() <= eventStartDate.getTime()) || (rangeStart.getTime() >= eventEndDate.getTime())) {
        eventItem.style.display = 'none';
        eventCount--;
    }
  });
  
  // Display for No Search Result
  if(eventCount==0){
    let cardContainer = document.getElementsByClassName("card-container")[0];
    let noResult = document.createElement("div");
    noResult.className = "no_result";
    let heading = document.createElement("h3");
    heading.innerText = "Sorry ! No event to display in this range";
    noResult.appendChild(heading);
    cardContainer.appendChild(noResult); 
  }
}

// Filters for Event Ends

const toggleSwitch=document.querySelector('.custom-control-input');
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
toggleSwitch.addEventListener("change", switchTheme);
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
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

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
