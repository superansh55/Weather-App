import "./styles.css";
import { getWeatherData, convertData } from "./getData.js";
import {
  updateWeatherUI,
  showLoading,
  hideLoading,
  showError,
} from "./displayData.js";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const unitSwitch = document.getElementById("unitSwitch");


let currentUnit = 'metric'; 

async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  showLoading();

  try {
  
    const data = await getWeatherData(city, currentUnit);
    const filteredData = convertData(data);
    hideLoading();
    
  
    const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
    updateWeatherUI(filteredData, unitSymbol);
    
  } catch (err) {
    hideLoading();
    showError(
      `Error: ${err.message}. Please check city name.`,
    );
    console.error("Error:", err);
  }
}


searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});


unitSwitch.addEventListener("change", () => {
   
    currentUnit = unitSwitch.checked ? 'us' : 'metric';
    handleSearch(); 
});


window.addEventListener("DOMContentLoaded", () => {
  handleSearch();
});