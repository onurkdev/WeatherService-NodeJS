const request = require('postman-request')
const geocode = require('./geocode')
const forecast = (address, callback) => {
    
    geocode(address, (error, data) => {
      console.log("passed line 1")
      if (error) {
        callback(error,undefined)
        
        return
      } else {
        const latitude = data.latitude;
        const longtitude = data.longtitude;
        apiurl = `http://api.weatherstack.com/current?access_key=4d8a2882601fa6ea449ff4f1d612e572&query=${latitude},${longtitude}&units=m`;
        
        request({ url: apiurl, json: true }, (error, response) => {
          if (error) {
            callback("Service Unavailable", undefined);
          } else if (response.body.current === undefined) {
            callback("Location cannot be found",undefined);
          } else {
            callback(undefined, {
              temperature: response.body.current.temperature,
              feelslike: response.body.current.feelslike,
              humidity: response.body.current.humidity,
              weatherdesc: response.body.current.weather_descriptions[0],
              city: response.body.location.region,
              
            });
          }
        });
      }
    });
    
}
module.exports = forecast