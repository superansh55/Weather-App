

export async function getWeatherData(city) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=QDESR9R4TBAV9ZKHBRUTT3SX9`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
}

export function convertData(data) {
    let filteredData = {};
    
    filteredData.currentTemp = data.currentConditions.temp;
    filteredData.currentCity = data.address;
    filteredData.condition = data.currentConditions.conditions;
    filteredData.feelsLikeTemp = data.currentConditions.feelslike;
    filteredData.humidity = data.currentConditions.humidity;
    filteredData.description = data.description;
    filteredData.currentDate = data.days[0].datetime;
    filteredData.currentMaxTemp = data.days[0].tempmax;
    filteredData.currentMinTemp = data.days[0].tempmin;
    
    return filteredData;
}