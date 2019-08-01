const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode.js')
const weathercode = require('./utils/weather.js')

const app = express()

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
        title:'About',
        name:'Otarin Ohtome, again.',
    })
)

app.get('/info',(req,res)=>res.render('info',
    {
        title:'Weather info',
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
                    res.send({ error })
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
    title:'La página que buscabas no se encuentra...',
    msg:'Creo que te perdiste acá, amigo.',
    name:'G0d.'
}))

app.get('/info/*',(req,res)=>res.render('error',{
    title:'La página que buscabas no se encuentra...',
    msg:'Posta man, no sé qué esperabas si info no tiene casi nada jsjs.',
    name:'G0d.'
}))

app.get('*',(req,res)=>res.render('error',{
    title:'La página que buscabas no se encuentra...',
    name:'G0d.'
}))

app.listen(3000,()=>{
    console.log('El servidor se ha iniciado.')
})
/* Las páginas dinámicas son aquellas que están constantemente 
cambiando, agregando información o páginas enteras, editándolos, 
eliminándolos, etc. */

/* Las estáticas, por el contrario, no tienen forma de hacer esto,
para agregar información en ellas tiene que hacerse manualmente, 
reescribiendo los archivos, editando en html, etc. */

/* En este caso, handlebars (hbs) nos permitirá "renderizar"
documentos de forma "dinámica", cosa contraria que haciendo uso
de enteramente Express solo. A su vez nos deja hacer fácilmente
código html para reutilizar en el resto de páginas que, normalmente
se podría hacer, aunque de forma manual. */

/* Los partials básicamente son una pequeña plantilla que permiten
mantener consistencia en nuestra página web. */

/* Express funciona de la siguiente forma. Al acceder a la página web,
este intenta de buscar algo que coincida con lo que se está ingresando,
haciendo uso de los métodos get definidos. Debido a que definimos una
carpeta, donde se pueda acceder a ésta y sus archivos html, Express
primero busca algo que coincida allí. Luego, en caso de no haber
encontrado ninguna situación que coincida, se dirige a los métodos
get, en orden de definición. */

/* Finalmente, se concluye hablando sobre Heroku y Git en nuestra
caja de comandos. Git provee una herramienta muy fundamental, el
control de versión (Version Control). Este nos permite tener "salvados"
de nuestro código de acuerdo a las versiones que se han publicado allí.
 */