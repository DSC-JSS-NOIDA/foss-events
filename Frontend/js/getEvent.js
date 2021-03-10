// Fetch data from events.json file
var data;
fetch("./Frontend/data/events.json")
  .then((res) => res.json())
  .then((res) => {
    let cardContainer = document.getElementsByClassName("card-container")[0];
    //!Sorting Events on the basis of start year and month
    res.sort(function (event1, event2) {
      var m1 = new Date(event1.start).getMonth();
      var m2 = new Date(event2.start).getMonth();
      return (new Date(event2.end).getFullYear() - new Date(event1.end).getFullYear()) || (m2 - m1);
    })
    for (let data in res) {

      let emptyDiv = document.createElement("div");
      emptyDiv.className = "empty_div";
      let eventCard = document.createElement("div");
      eventCard.className = "event_card";
      let eventTitle = document.createElement("div");
      let heading = document.createElement("h3");
      heading.innerText = (res[data].title).toUpperCase(); //! Display event title in uppercase
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
      organisation.innerHTML = `<b>Organisation: ${res[data].organisation}`;
      let loc = document.createElement("h5");
      loc.className = "location";
      loc.innerText = res[data].location;
      eventDetails.append(startDate, endDate, organisation, loc, eventLink);
      eventCard.append(eventTitle, eventDetails);
      emptyDiv.appendChild(eventCard);
      cardContainer.appendChild(emptyDiv);
    }
  });

// search an event
let search = document.querySelector('input');
search.addEventListener('keyup', searchTerm);

//function to search the event
function searchTerm(e) {
  let eventList = document.querySelectorAll('.empty_div');
  let input = e.target.value.toLowerCase();
  Array.from(eventList).forEach(eventItem => {
    let toSearch = eventItem.childNodes[0].children[0].childNodes[0].innerText;
    if (toSearch.toLowerCase().indexOf(input) != -1) {
      eventItem.style.display = 'block';
    }
    else {
      eventItem.style.display = 'none';
    }
  })
}
