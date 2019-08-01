const request = require('request')

const weathercode = (latitude, longitude, callback)=>{

    const weatherAPI = 'https://api.darksky.net/forecast/bbadd512123b32f96284d2b6c219714c/' + latitude + ',' + longitude

    request({url:weatherAPI,json:true,qs:{
        lang:'es',
        units:'si'
    }},
    (error, response)=>{
        if(error){
            callback('No se ha podido conectar al servidor.', undefined)
        } else if(response.body.error){
            callback('Error al buscar datos por coordenadas. Intente nuevamente.', undefined)
        } else {
            callback(undefined,{
                state:response.body.currently.summary,
                temperature:response.body.currently.temperature,
                precip:response.body.currently.precipProbability
            })
        }
    })

}

module.exports = weathercode