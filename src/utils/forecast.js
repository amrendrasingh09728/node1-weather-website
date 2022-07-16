
import request from 'postman-request'

export const forecast = (a ,b ,c , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7e327ffa85d5e1be95eaf2e47c360ed3&query="+ a + "," + b
     console.log(url)
    request({url, json :'json'},(error,response) => {
        if(error){
            callback("Can't connect to the weatherStack", undefined)
        }else if(response.body.success===false){
            callback("Unable to find location", undefined)

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