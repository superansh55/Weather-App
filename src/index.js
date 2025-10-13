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


async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  showLoading();

  try {
    const data = await getWeatherData(city);
    const filteredData = convertData(data);
    hideLoading();
    updateWeatherUI(filteredData);
  } catch (err) {
    hideLoading();
    showError(
      `Error: ${err.message}. Please check the city name and try again.`,
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

window.addEventListener("DOMContentLoaded", () => {
  handleSearch();
});

