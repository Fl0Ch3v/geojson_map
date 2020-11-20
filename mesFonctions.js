function initialize() {
		// création de la carte et paramétrage général : centre et niveau de zoom
        var map = L.map('mapid').setView([50.102022, 1.825931], 11);
 
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
				layer.bindPopup( "<b><u>Parc Naturel Régional</u></b><br><b><u>Baie de Somme - Picaride maritime</u></b><br>" + feature.properties.c_ar + "<b> communes adhérentes</b>" )
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
				marker.bindPopup('<b><u>Description du point</u></b><br>'
							   + "<b>Nom : </b>" + feature.properties.id+ '<br>' 
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