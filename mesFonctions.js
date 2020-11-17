function initialize() {
		// création de la carte et paramétrage général : centre et niveau de zoom
        var map = L.map('mapid').setView([50.102022, 1.825931], 12);
 
		// création d'une couche "osmLayer"
        var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });
		    
		// la couche "osmLayer" est ajoutée à la carte		
        map.addLayer(osmLayer);
		
		 
		
		// création d'une couche geoJson qui appelle le fichier "pnr_perim.geojson"			
		var arrondissement = $.getJSON("pnr_perim.geojson",function(dataPnr)
					{L.geoJson( dataPnr, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "pnr_perim"
							return { color: "#046380", weight: 1, fillColor: '#4BB5C1', fillOpacity: .5 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "arrondissement"	
				layer.bindPopup( "<b><u>Parc Naturel Régional</u></b><br><b><u>Baie de Somme - Picaride maritime</u></b><br>" + feature.properties.c_ar + "<b> communes adhérentes</b>" )
				}
		}).addTo(map);
		});
															
		// création d'une couche geoJson qui appelle le fichier "cinema.geojson"													
		var cinema= $.getJSON("cinema.geojson",function(dataCinema)
										// icone Clap	
										{var iconeCinema = L.icon({
													iconUrl: 'style/Clap.png',
													iconSize: [19, 21]
																	});
		// fon ction pointToLayer qui ajoute la couche "cinema" à la carte, selon la symbologie "iconeCinema", et paramètre la popup
		L.geoJson(dataCinema,{
			pointToLayer: function(feature,latlng){
				var marker = L.marker(latlng,{icon: iconeCinema});
				marker.bindPopup('<b><u>Description du cinéma</u></b><br>'
							   + "<b>Nom : </b>" + feature.properties.nom_etabli+ '<br>' 
							   + "<b>Nombre d'écrans : </b>" + feature.properties.ecrans+ '<br>' 
							   + "<b>Nombre de fauteuils : </b>" + feature.properties.fauteuils+ '<br>'
							   + "<b>Arts et essais ? </b>" + feature.properties.art_et_ess+ '<br>'
							   + "<b>Adresse : </b>" + feature.properties.adresse+ '<br>'
							   + "<b>Arrondissement : </b>" + feature.properties.arrondisse
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