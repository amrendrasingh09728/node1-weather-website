import { dirname } from 'path';
import {fileURLToPath} from 'url';
import path from 'path';
import express from 'express'
import hbs from 'hbs'
import {geocode} from './utils/geocode.js'
import {forecast} from './utils/forecast.js'
const __dirname = dirname(fileURLToPath(
    import.meta.url));
  


let app = express()



//define paths for express config.
const viewsPath  = path.join(__dirname, '../templates/views')
// console.log(viewsPath)
const directory  = path.join(__dirname, '../public')
//console.log(directory)
const partialsPath  = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(directory))

// app.get('',(req, res) => {
//     res.send("<h1>Home Page</h1>")

// })

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Not able to find address'
        })
        
    }

    geocode(req.query.address,(error,{latitude,longitude,display_name}={})=>{
        // console.log("Error : " , error)
        // console.log("Data: " , data)
        if(error){
        res.send({error})}
        
        
        forecast(latitude, longitude,display_name, (error, data) => {
                // console.log('Error', error)
                if(error){
                     res.send({error})
                }else{
                 res.send(data)
                }
              })
        }
    
    )
    


    // res.send({
    //     address : req.query.address
    // })
    // res.render('index', {
    //     title : 'Weather',
    //     name :'Amrendra singh'
    // })

})


app.get('/', (req,res)=>{
    res.render('index', {
        title : 'Weather',
        name :'Amrendra singh'
    })

})

app.get('/about', (req,res)=>{
    res.render('about', {
        title : 'About Me',
        name :'Amrendra singh'
    })

})
app.get('/help', (req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Amrendra Singh'
    }
    )})



app.get('/about/*', (req,res)=>{
    res.render('error',{
        title : 404,
        name : 'Amrendra Singh',
        message : 'About article not found!'
    })
    })


app.get('*', (req,res)=>{
    res.render('error',{
        title: 404,
        name : 'Amrendra singh',
        message : 'Page not Found !'
    })

    
    })








// app.get('/about', (request ,response)=>{
//     response.send("<h1>My name is 'Amrendra'</h1>")

// })
// app.get('/weather', (request ,response)=>{
//     response.send({forecast : "its 50 degrees out", location : 'Rampura'})

// })



app.listen(3000,()=>{
    console.log("server is on up 3000")
})