const request = require('postman-request')

const geocode = (address, callback) => {
    var encodedaddress = encodeURIComponent(address)
    const apiurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedaddress}.json?access_token=pk.eyJ1Ijoib251cmtkZXYiLCJhIjoiY2t4cmo1NXljMnM2OTJycWs5NHNlaWhoeiJ9.EkgYcSMHdU5voaW2zZxp3Q&limit=1`
    console.log("passed line 3")
    request({url: apiurl, json: true}, (error, response) => {
        if(error){
            console.log("passed line 4")
            callback('Unable to connect services', undefined)
        }
        else if (response.body.features.length === 0 ){
            console.log("passed line 5")
            callback('Unable to find the location', undefined)
        }
        else{
            console.log("passed line 6")
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longtitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name 
            })
        }
    } )
    console.log("passed line 2")
}

module.exports = geocode