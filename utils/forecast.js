const request = require('request')

const getforecast =(latitude,longitude,callback)=>{
   
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=a0aaf2c7c3b544150be0961b2548f7c0&query='+latitude+','+longitude
    request({url:weatherUrl,json : true}, (error,response)=>{
        if(error){
            callback('Unable to connect mapbox api',undefined)
        }
        else if(response.body.error){
            callback(response.body.error.info,undefined)
        }
        else{
            console.log(response.body)
        callback(undefined,response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+' degree out. It feels like '+response.body.current.feelslike+' out.')
        }
    })
}
module.exports = {
    getforecast : getforecast
}