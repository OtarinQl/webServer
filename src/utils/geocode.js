const request = require('request')

const geocode = (adress, callback)=>{

    token = 'pk.eyJ1Ijoib3RhcmlucXIiLCJhIjoiY2p4d2UyZGVsMGVzdjNkbXZtOGFpajRvcSJ9.IstlB__mcSeuqZmDAm8eEQ'
    geoAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json'
    
    request({url:geoAPI,json:true,
        qs:{
            access_token:token
        }}, 
        (error, response)=>{
            if(error){
                callback('Error al tratar de conectar con el servidor.', undefined)
            } else if(!response.body.features){
                callback('Error al buscar localización. Por favor, ingrésela nuevamente.', undefined)
            } else {
                callback(undefined, {
                    longitude:response.body.features[0].center[0],
                    latitude: response.body.features[0].center[1],
                    ubic: response.body.features[0].place_name
                })
            }
        }
    )
}

module.exports = geocode