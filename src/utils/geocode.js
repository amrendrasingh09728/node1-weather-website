
import request from 'postman-request'

export const geocode = (address, callback)=>{
    const url = "https://locationiq.com/v1/search.php?key=pk.38ac5c97def1cacd263d593b35b82b22&q=" + address +"&format=json&limit=1"
    // console.log(url)
    request({url,json:'json'},(error,response) => {
        if(error){
            callback('unable to connect locationiQ',undefined)
        }else if(response.body.error === "Unable to geocode"){
            callback('You must provide a valid address',undefined)
        }else{
            const lat = response.body[0].lat
            const lon = response.body[0].lon
            const display_name = response.body[0].display_name
            const data = {  latitude : lat,
                            longitude : lon,
                        display_name: display_name }
            callback(undefined , data)
        }
    })

}