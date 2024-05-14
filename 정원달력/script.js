document.addEventListener("DOMContentLoaded", function() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const monthYear = document.getElementById("monthYear");
  const daysContainer = document.querySelector(".days");
  const eventForm = document.getElementById("eventForm");

  let currentDate = new Date();
  let events = [];

  function renderCalendar() {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    let daysHTML = '';

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      daysHTML += `<div class="day"></div>`;
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dayClass = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? "day today" : "day";
      let eventHTML = '';

      // Check if there are events on this date
      const eventsOnDate = events.filter(event => event.date.getTime() === date.getTime());
      eventsOnDate.forEach(event => {
        eventHTML += `<div class="event" style="background-color: ${event.color}">${event.name}</div>`;
      });

      daysHTML += `<div class="${dayClass}">${i}${eventHTML}</div>`;
    }

    daysContainer.innerHTML = daysHTML;
  }

  renderCalendar();

  prevBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  eventForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const eventName = document.getElementById("eventName").value;
    const eventStartDate = new Date(document.getElementById("eventStartDate").value);
    const eventEndDate = new Date(document.getElementById("eventEndDate").value);
    const eventColor = document.getElementById("eventColor").value;

    // Add events for each day in the date range
    const dateRange = getDateRange(eventStartDate, eventEndDate);
    dateRange.forEach(date => {
      events.push({ name: eventName, date: date, color: eventColor });
    });

    renderCalendar();

    // Reset form fields
    eventForm.reset();
  });

  // Function to get all dates in a range
  function getDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
});