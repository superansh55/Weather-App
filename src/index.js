async function getWeatherData(city){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=QDESR9R4TBAV9ZKHBRUTT3SX9`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}

getWeatherData("ghaziabad")
    .then(data => {
        function convertData(){
            let filteredData = {};
          
            filteredData.currentTemp = data.currentConditions.temp;
            return filteredData.currentTemp;
        }
        console.log(convertData()); 
    })
    .catch(error => console.error('Error:', error));