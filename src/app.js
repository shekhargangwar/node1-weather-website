const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('../utils/forecast.js')
const geoCode = require('../utils/geocode.js')

//set up express config
const app = express();
const homePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebar config
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//point express to serve directory
app.use(express.static(homePath))

app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather app!',
        name : 'Shekhar'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About Me',
        name : 'Shekhar'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title : 'We are here to help you.',
        name : 'Shekhar'
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        msg : 'Help article not found.',
        name : 'Shekhar'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error :'You must provide address' })
    }
    geoCode.getGeoCode(req.query.address,(error,data)=>{
            if(error){
                return res.send({error})
            }
                forecast.getforecast(data.latitude,data.longitude,(error,forecastData)=>{
                    if(error){
                        return res.send({error})
                    }
                    res.send({
                        forecast : forecastData,
                        location: req.query.address
                    })
                })

        })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg : 'Page not found!',
        name : 'Shekhar'
    })
})
app.listen(3000,()=>{
    console.log('Server is up.')
})