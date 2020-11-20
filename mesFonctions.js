function initialize() {
		// création de la carte et paramétrage général : centre et niveau de zoom
        var map = L.map('mapid').setView([50.172669, 1.802510], 10);
 
		// création d'une couche "osmLayer"
        var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });
		    
		// la couche "osmLayer" est ajoutée à la carte		
        map.addLayer(osmLayer);
		
		 
		
		// création d'une couche geoJson qui appelle le fichier "pnr_perim.geojson"			
		var pnr = $.getJSON("pnr_perim.geojson",function(dataPnr)
					{L.geoJson( dataPnr, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "pnr"
							return { color: "#046380", weight: 1, fillColor: '#4BB5C1', fillOpacity: .5 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "pnr"	
				layer.bindPopup( "<b><u>Parc Naturel Régional</u></b><br><b><u>Baie de Somme - Picaride maritime</u></b><br>" + feature.properties.nb_com + " communes adhérentes<br>" + feature.properties.area_ha + " hectares" )
				}
		}).addTo(map);
		});

		// création d'une couche geoJson qui appelle le fichier "pah_perim.geojson"			
		var pah = $.getJSON("pah_perim.geojson",function(dataPah)
					{L.geoJson( dataPah, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "pah"
							return { color: "#6495ED", weight: 1, fillColor: '#6495ED', fillOpacity: .5 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "pah"	
				layer.bindPopup( "<b>Pays d'Art et d'Histoire</b><br><b>Ponthieu - Baie de Somme</b>")
				}
		}).addTo(map);
		});

		// création d'une couche geoJson qui appelle le fichier "com_sans_proj.geojson"			
		var com = $.getJSON("com_sans_proj.geojson",function(dataCom)
					{L.geoJson( dataCom, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "com"
							return { color: "#6495ED", weight: 1, fillColor: '#6495ED', fillOpacity: .5 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "com"	
				layer.bindPopup( '<b>'+ feature.properties.nom + '</b>')
				}
		}).addTo(map);
		});


		// création d'une couche geoJson qui appelle le fichier "com4_projets_pat.geojson"			
		var com_proj = $.getJSON("com4_projets_pat.geojson",function(dataComProj)
					{L.geoJson( dataComProj, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "com_proj"
							return { color: "#6495ED", weight: 1, fillColor: '#6495ED', fillOpacity: .5 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "com_proj"	
				layer.bindPopup(  '<b>'+ feature.properties.nom + '</b><br>'+
									feature.properties.nb_projets + " projets patrimoine")
				}
		}).addTo(map);
		});

		// création d'une couche geoJson qui appelle le fichier "pah_perim.geojson"			
		var pah = $.getJSON("pah_perim.geojson",function(dataPah)
					{L.geoJson( dataPah, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "pah"
							return { color: "#6495ED", weight: 1, fillColor: '#6495ED', fillOpacity: .5 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "pah"	
				layer.bindPopup( "<b>Pays d'Art et d'Histoire</b><br><b>Ponthieu - Baie de Somme</b>")
				}
		}).addTo(map);
		});
															
		// création d'une couche geoJson qui appelle le fichier "projet_pat.geojson"													
		var projets= $.getJSON("test_point.geojson",function(dataPoint)
										// icone Clap	
										{var iconeProjet = L.icon({
													iconUrl: 'style/church1.png',
													iconSize: [32, 32]
																	});
		// fonction pointToLayer qui ajoute la couche "projets" à la carte, selon la symbologie "iconeProjet", et paramètre la popup
		L.geoJson(dataPoint,{
			pointToLayer: function(feature,latlng){
				var marker = L.marker(latlng,{icon: iconeProjet});
				marker.bindPopup('<b><u>Description du projet</u></b><br>'
							   + "<b>Commune : </b>" + feature.properties.nom+ '<br>' 
							   + "<b>Type de patrimoine : </b>" + feature.properties.Typo
							   );
				return marker;
				}
						}).addTo(map);
										});				
															
		// création d'un contrôle des couches pour modifier les couches de fond de plan	
		var baseLayers = {
			"OpenStreetMap": osmLayer,
			"Watercolor" : watercolorLayer
		};
		L.control.layers(baseLayers).addTo(map);
}