function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
}

export function updateWeatherUI(filteredData) {
  const cityName = document.getElementById("cityName");
  const date = document.getElementById("date");
  const temperature = document.getElementById("temperature");
  const condition = document.getElementById("condition");
  const description = document.getElementById("description");
  const feelsLike = document.getElementById("feelsLike");
  const humidity = document.getElementById("humidity");
  const maxTemp = document.getElementById("maxTemp");
  const minTemp = document.getElementById("minTemp");
  const weatherInfo = document.getElementById("weatherInfo");

  cityName.textContent = filteredData.currentCity;
  date.textContent = formatDate(filteredData.currentDate);
  temperature.textContent = `${Math.round(filteredData.currentTemp)}°F`;
  condition.textContent = filteredData.condition;
  description.textContent = filteredData.description;
  feelsLike.textContent = `${Math.round(filteredData.feelsLikeTemp)}°F`;
  humidity.textContent = `${filteredData.humidity}%`;
  maxTemp.textContent = `${Math.round(filteredData.currentMaxTemp)}°F`;
  minTemp.textContent = `${Math.round(filteredData.currentMinTemp)}°F`;

 
  weatherInfo.classList.add("active");
}

export function showLoading() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const weatherInfo = document.getElementById("weatherInfo");

  loading.classList.add("active");
  error.classList.remove("active");
  weatherInfo.classList.remove("active");
}

export function hideLoading() {
  const loading = document.getElementById("loading");
  loading.classList.remove("active");
}

export function showError(message) {
  const error = document.getElementById("error");
  const weatherInfo = document.getElementById("weatherInfo");

  error.textContent = message;
  error.classList.add("active");
  weatherInfo.classList.remove("active");
}
