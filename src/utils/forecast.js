
import request from 'postman-request'

export const forecast = (a ,b ,c , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=132b28169a7bce1cb0759563939931d3&query="+ a + "," + b
    request({url, json :'json'},(error,response) => {
        if(error){
            callback("Can't connect to the weatherStack", undefined)
        }else if(response.body.success===false){
            callback("Unable to find locationnnnn", undefined)

        }else{
            const data = {
                location : c,
                temperature : response.body.current.temperature,
                description : response.body.current.weather_descriptions[0],
                chances_Of_Rain : response.body.current.precip
            }
            callback(undefined, data)
        }
    
    })
   

}