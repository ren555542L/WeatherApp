// http://api.weatherapi.com/v1/current.json?key=4e4f0f01bfee47d1a08132418252606&q=mumbai&aqi=no

const temperatureField = document.querySelector(".Temp p");
const locationField = document.querySelector(".time_location p");
const conditionField = document.querySelector(".condition span");
const dateField = document.querySelector(".time_location span");
const searchField = document.querySelector(".search_area");
const searchButton = document.querySelector(".search_button");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation); // Adding an event listener to the form for submission
// When the form is submitted, it will call the searchForLocation function

let target = "mumbai"; // Default location

const fetchResults = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=4e4f0f01bfee47d1a08132418252606&q=${target}&aqi=no`
    // api is static, so we can add $(var_name) to make it dynamic
    const response = await fetch(url); // Fetching data from the API
    // await - wait for the response to be returned
    const data = await response.json(); // Parsing the response to JSON format
    // await - wait for the data to be parsed
    let location = data.location.name; // Extracting the location name
    let temperature = data.current.temp_c; // Extracting the temperature in Celsius
    let condition = data.current.condition.text; // Extracting the weather condition
    let time = data.location.localtime; // Extracting the local time
    updateUI(location, temperature, condition, time); // Updating the UI with the fetched data
}

function updateUI(location, temperature, condition, time) {
    let splitDate = time.split(" ")[0]; // Splitting the time string to get date and time separately
    // This will split the string into an array where the first element is the time and the second element is the date
    // Update the UI with the fetched data
    let splitTime = time.split(" ")[1]; // Get the time part from the localtime
    let currentDay = getDayName(new Date(splitDate).getDay()); // Get the day of the week from the date
    // This will return a number from 0 (Sunday) to 6 (Saturday)
    locationField.innerText = location; // Set the location field text
    temperatureField.innerText = `${temperature}°C`; // Set the temperature field text
    conditionField.innerText = condition; // Set the weather condition field text
    dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`; // Set the date field text
}

function searchForLocation(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    // This is important to handle the search without reloading the page
    target = searchField.value; // Get the value from the search field
    fetchResults(); // Fetch results for the new location
}

function getDayName(number){
    // switch statement to return the name of the day based on the number
    switch(number){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}