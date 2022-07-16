
console.log("loading js file in browser !")



const formSubmit = document.querySelector('form')
const search =  document.querySelector('input')
const address = document.getElementById('location')
const temp = document.getElementById('temp')

formSubmit.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            address.innerHTML = `<p style="color:#E13C3C">${data.error}. Try another search</p>`
            temp.innerHTML = `<p></p>`
        }else{
            console.log(data)

            address.innerHTML = `<p style="color:#03c03c">${data.location}</p>`
            temp.innerHTML =  `<p style="color:#03c03c">It is ${data.description} and temperature is ${data.temperature} degrees out. There is ${data.chances_Of_Rain}% chance of rain.</p>`
        
        }

        
        
        
    })
})

})