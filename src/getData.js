export async function getWeatherData(city, unitGroup = 'metric') {
    const key = 'QDESR9R4TBAV9ZKHBRUTT3SX9'; 
   
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${key}&include=days,current&elements=%2Baqius`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}

export function convertData(data) {
    let filteredData = {};
    
    filteredData.currentTemp = data.currentConditions.temp;
    filteredData.currentCity = data.address;
    filteredData.condition = data.currentConditions.conditions;
    filteredData.feelsLikeTemp = data.currentConditions.feelslike;
    filteredData.humidity = data.currentConditions.humidity;
    filteredData.uvIndex = data.currentConditions.uvindex;
    
   
    filteredData.aqi = data.currentConditions.aqius ?? "N/A";
    
  
    if (data.days && data.days.length > 0) {
        filteredData.description = data.days[0].description;
    } else {
        filteredData.description = data.description || "Weather data available";
    }
    
    filteredData.currentDate = data.days[0].datetime;
    filteredData.currentMaxTemp = data.days[0].tempmax;
    filteredData.currentMinTemp = data.days[0].tempmin;

    filteredData.forecast = data.days.slice(0, 7).map(day => ({
        date: day.datetime,
        temp: day.temp,
        max: day.tempmax,
        min: day.tempmin
    }));
    
    return filteredData;
}