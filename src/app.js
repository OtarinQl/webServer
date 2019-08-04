const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode.js')
const weathercode = require('./utils/weather.js')

const app = express()

const port = process.env.PORT || 3000

//DEFINICIÓN DE CONSTANTES Y VARIABLES
const dir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')

//CONFIGURACIÓN
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//Con set(), nosotros damos un valor (el segundo término) al primero
//Hay cadenas específicas cuales podemos darle específicos valores 
//(ver documentación)

hbs.registerPartials(partialsPath)

app.use(express.static(dir))

//TODO
app.get('',(req,res)=>res.render('index', 
    {
        title:'Weather App - Home',
        name:'Otarin Ohtome',
        msg:'Gracias por venir!'
    })
    //render básicamente hace uso de un archivo hbs y renderiza 
    //el objeto del segundo argumento.
)

app.get('/about',(req,res)=>res.render('about',
    {
        title:'Acerca de',
        name:'Otarin Ohtome, again.',
    })
)

app.get('/info',(req,res)=>res.render('info',
    {
        title:'Información',
        name:'Otarin Ohtomeme'
    })
)

app.get('/weather',(req,res)=>{
    const query = req.query
    if(query.adress){
        geocode(query.adress, (error,data)=>{
            if(error){
                res.send({ error:'error al localizar la ciudad' })
            } else {
                weathercode(data.latitude,data.longitude,
            (error, data)=>{
                if(error){
                    res.send({ error:'Error al buscar localización.' })
                } else {
                    res.send({
                        location: query.adress, 
                        state: data.state,
                        temperature: data.temperature,
                        precipitation: data.precip
                     })
                }
            }
        )
            }
        })
    } else {
        res.send({
            error:'No se pudo localizar la localidad ingresada'
        })
    }
}
)

// app.get('/gourmew',(req,res)=>res.render('gourmew',
//     {
//         title:'G4y p0rn',
//         name:'Gourmew Chef, the best chef in the world',
//         desc:'o w o'
//     })
// )

//404 pages
// app.get('/gourmew/*',(req,res)=>res.render('error',{
//     title:'La página que buscabas no se encuentra...',
//     msg:'El todo poderoso Gourmew se encuentra en \'owo\'',
//     name:'G0d.'
// }))

app.get('/about/*',(req,res)=>res.render('error',{
    title:'La página que buscabas no se encuentra...'
}))

app.get('/info/*',(req,res)=>res.render('error',{
    title:'La página que buscabas no se encuentra...',
}))

app.get('*',(req,res)=>res.render('error',{
    title:'La página que buscabas no se encuentra...'
}))

app.listen(port, ()=>{
    console.log('El servidor se ha iniciado.')
})
