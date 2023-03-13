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
                            return [coord[1], coord[0]];
                        });



                        const gasolinerasEnRuta=[];
                        coords.forEach(function(coord) {
                            const lat = coord[1];
                            const lng = coord[0];

                            //console.log(lat);
                            //console.log(lng);
                        
                            let valor=searchGasStations(lat,lng);
                            gasolinerasEnRuta.push(valor)
                            //searchGasStations(lat,lng);

                        });

                        for(let i=0; i<=gasolinerasEnRuta.length;i++){
                            console.log(gasolinerasEnRuta[i]);
                        }
                        //console.log(gasolinerasEnRuta);
                        
                        

                          });

                            function searchGasStations(lat,lng) {
                                const url= "https://api.geoapify.com/v2/place-details?lat="+lng+"&lon="+lat+"&features=drive_5.fuel&apiKey=01c0e93722284dec8b258567053632d1"
                                fetch(url)
                                    .then(function(response){
                                        return response.json();
                                    })
                                    .then(function(data4){
                                        numeroElementos=data4.features.length;
                                        //console.log(numeroElementos);
                                        for(let i=1; i<=numeroElementos; i++){
                                            if(data4.features[i] && data4.features[i].properties.lat && data4.features[i].properties.lon){
                                                let latitud=data4.features[i].properties.lat;
                                                let longitud=data4.features[i].properties.lon;
                                                //console.log("Pene"+latitud, longitud);
                                                return [latitud, longitud];
                                            }else{
                                                i++;
                                            }
                                        }
                                    
                                    })
                                    .catch(error => console.log('error', error));
                            
                            }       
                })
            })


   
       