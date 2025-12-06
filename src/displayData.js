let weatherChart = null;

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = { weekday: "long", month: "short", day: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
}

function getShortDay(dateString) {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", { weekday: 'short' });
}


function getWeatherIcon(condition) {
    const c = condition.toLowerCase();
    if (c.includes("partially cloudy")) return "fa-cloud-sun";
    if (c.includes("cloud")) return "fa-cloud";
    if (c.includes("rain")) return "fa-cloud-showers-heavy";
    if (c.includes("storm") || c.includes("thunder")) return "fa-bolt";
    if (c.includes("snow")) return "fa-snowflake";
    if (c.includes("clear")) return "fa-sun";
    if (c.includes("fog") || c.includes("mist")) return "fa-smog";
    return "fa-cloud-sun"; 
}

export function updateWeatherUI(filteredData, unitSymbol) {
  document.getElementById("cityName").textContent = filteredData.currentCity;
  document.getElementById("date").querySelector('span').textContent = formatDate(filteredData.currentDate);
  document.getElementById("temperature").textContent = `${Math.round(filteredData.currentTemp)}${unitSymbol}`;
  document.getElementById("condition").textContent = filteredData.condition;
  document.getElementById("description").textContent = filteredData.description;
  document.getElementById("feelsLike").textContent = `${Math.round(filteredData.feelsLikeTemp)}${unitSymbol}`;
  document.getElementById("humidity").textContent = `${filteredData.humidity}%`;
  document.getElementById("maxTemp").innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${Math.round(filteredData.currentMaxTemp)}°`;
  document.getElementById("minTemp").innerHTML = `<i class="fa-solid fa-arrow-down"></i> ${Math.round(filteredData.currentMinTemp)}°`;
  document.getElementById("uvIndex").textContent = filteredData.uvIndex;
  
 
  const iconClass = getWeatherIcon(filteredData.condition);
  const iconElement = document.getElementById("mainIcon");
  iconElement.className = `fa-solid ${iconClass}`;
  
 
  if(iconClass.includes("sun")) iconElement.style.color = "#ffd700";
  else if(iconClass.includes("rain") || iconClass.includes("cloud")) iconElement.style.color = "#a5b4fc";
  else if(iconClass.includes("bolt")) iconElement.style.color = "#fbbf24";
  else iconElement.style.color = "#fff";

  const aqiVal = filteredData.aqi;
  const aqiElement = document.getElementById("aqi");
  aqiElement.textContent = aqiVal;

  if(aqiVal !== "N/A") {
      if(aqiVal <= 50) aqiElement.style.color = "#4ade80"; 
      else if(aqiVal <= 100) aqiElement.style.color = "#facc15"; 
      else if(aqiVal <= 150) aqiElement.style.color = "#fb923c"; 
      else aqiElement.style.color = "#f87171";
  } else {
      aqiElement.style.color = "#fff";
  }

  renderChart(filteredData.forecast);
  document.getElementById("weatherInfo").classList.add("active");
}

function renderChart(forecastData) {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    const labels = forecastData.map(day => getShortDay(day.date));
    const temps = forecastData.map(day => day.temp);

    if (weatherChart) weatherChart.destroy();

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Temp',
                data: temps,
                borderColor: '#818cf8', 
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(129, 140, 248, 0.4)");
                    gradient.addColorStop(1, "rgba(129, 140, 248, 0.0)");
                    return gradient;
                },
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: '#1e1e2e',
                pointBorderColor: '#818cf8',
                pointBorderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8', font: { family: 'Poppins' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Poppins' } }
                }
            }
        }
    });
}

export function showLoading() {
  document.getElementById("loading").classList.add("active");
  document.getElementById("error").classList.remove("active");
  document.getElementById("weatherInfo").classList.remove("active");
}

export function hideLoading() {
  document.getElementById("loading").classList.remove("active");
}

export function showError(message) {
  const error = document.getElementById("error");
  error.textContent = message;
  error.classList.add("active");
  document.getElementById("weatherInfo").classList.remove("active");
}