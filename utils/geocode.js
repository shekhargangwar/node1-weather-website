const request = require('request')

const getGeoCode = (address,callback)=>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2dhbmd3YXIiLCJhIjoiY2tiYXJrMW4yMHF1djJ5cGg3czl4ZXRvNSJ9.BqwXFScZYO3AInpDmhRcWg&limit=1'
    request({url: geoCodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect mapbox api',undefined)
        }
        else if(response.body.features.length === 0){
            callback('No data found',undefined)
        }
        else{
        callback(undefined,{
            latitude : response.body.features[0].geometry.coordinates[1],
            longitude : response.body.features[0].geometry.coordinates[0],
            placeName : response.body.features[0].place_name   
        });
        }
    })
}

module.exports ={
    getGeoCode : getGeoCode
}