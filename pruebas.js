var origen_url = 'https://nominatim.openstreetmap.org/search.php?q=Telde&format=jsonv2';
fetch(origen_url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if (data && data[0] && data[0].lat && data[0].lon) {
            var originCoords=[data[0].lat, data[0].lon];//Coordenadas origen
        }

        var destino_url = 'https://nominatim.openstreetmap.org/search.php?q=Arucas&format=jsonv2';
        fetch(destino_url)
            .then(function(response){
                return response.json();
            })
            .then(function(data2){
                var destinationCoords=[parseFloat(data2[0].lat), parseFloat(data2[0].lon)];//Coordenadas destino
                //var routeURL = 'https://api.openrouteservice.org/v2/directions/driving-car?start=' + originCoords[1] + ',' + originCoords[0] + '&end=' + destinationCoords[1] + ',' + destinationCoords[0] + '&api_key=<5b3ce3597851110001cf6248ec6cc375881a440db695f6f2fb789576>'; 
                var routeURL = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248ec6cc375881a440db695f6f2fb789576&start=' + originCoords[1] + ',' + originCoords[0] + '&end=' + destinationCoords[1] + ',' + destinationCoords[0]; 
                fetch(routeURL)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data3){
                        //Obtener las coordenadas de los puntos de la ruta
                        var coords=data3.features[0].geometry.coordinates.map(function(coord){
                            //console.log(coord[1], coord[0]);
                            return [{latitud: coord[1], longitud: coord[0]}];
                        });
                        coords.forEach(function(coord) {
                            const lat = coord.lat;
                            const lng = coord.lng;

                            searchGasStations(lat,lng);

                        });
                            
                        //searchGasStations(lat,lng);

                          });

                            function searchGasStations(lat,lng) {
                                const url = `https://www.elpreciodelagasolina.com/api/stations.json`;

                                fetch(url)
                                    .then(function(response){
                                       return response.json();
                                    })
                                    .then(function(data4){
                                        //console.log(data4.data.stations.length);
                                        //console.log(data4.data.stations[0].id);
                                        console.log("Entro a data4");
                                        if(data4.data && data4.data.stations){
                                            for(let i=0; i<=data4.data.stations.length;i++){
                                                
                                                if(data4.data.stations[i] && data4.data.stations[i]._latitude && data4.data.stations[i]._longitude && data4.data.stations[i]._province){
                                                    if(data4.data.stations[i]._province=="PALMAS (LAS)"){
                                                            console.log(data4.data.stations[i].name);
                                                            console.log(data4.data.stations[i]._latitude);
                                                            console.log(data4.data.stations[i]._longitude);
                                                            console.log(data4.data.stations[i]._location);     
                                                    }
                                                }
                                            }
                                        }
                                        
                                    })
                                    .catch(error => console.error(error));
                               
                            }       
                })
            })


   
       