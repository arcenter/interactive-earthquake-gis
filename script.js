require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer) {

    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [78.9629, 20.5937],
        zoom: 5,
        attribution: {visible: false}
    });

    const earthquakeLayer = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/South_Asia_Earthquakes/FeatureServer/0",
        outFields: ["*"]
    });

    map.add(earthquakeLayer);

    const customPopup = document.createElement('div');
    customPopup.classList.add('custom-popup');
    document.body.appendChild(customPopup);

    const attributeList = [
        { name: "Location_Name", label: "Location Name" },
        { name: "Mag", label: "Mag" },
        { name: "Year", label: "Year" },
        { name: "Deaths", label: "Deaths" },
        { name: "Total_Deaths", label: "Total Deaths" },
        { name: "Total_Death_Description", label: "Total Death Description" },
        { name: "Focal_Depth__km_", label: "Focal Depth  km " },
        { name: "Damage_Description", label: "Damage Description" },
        { name: "Damage___Mil_", label: "Damage   Mil " },
        { name: "Total_Damage_Description", label: "Total Damage Description" },
        { name: "Total_Damage___Mil_", label: "Total Damage   Mil " },
        { name: "Houses_Damaged", label: "Houses Damaged" },
        { name: "Houses_Damaged_Description", label: "Houses Damaged Description" },
        { name: "Houses_Destroyed", label: "Houses Destroyed" },
        { name: "Houses_Destroyed_Description", label: "Houses Destroyed Description" },
        { name: "Injuries", label: "Injuries" },
        { name: "Injuries_Description", label: "Injuries Description" },
        { name: "Total_Houses_Damaged", label: "Total Houses Damaged" },
        { name: "Total_Houses_Damaged_Descriptio", label: "Total Houses Damaged Descriptio" },
        { name: "Total_Houses_Destroyed", label: "Total Houses Destroyed" },
        { name: "Total_Houses_Destroyed_Descript", label: "Total Houses Destroyed Descript" },
        { name: "Total_Injuries", label: "Total Injuries" },
        { name: "Total_Injuries_Description", label: "Total Injuries Description" },
        { name: "Latitude", label: "Latitude" },
        { name: "Longitude", label: "Longitude" },
        { name: "MMI_Int", label: "MMI Int" },
        { name: "Total_Missing", label: "Total Missing" },
        { name: "Total_Missing_Description", label: "Total Missing Description" },
        { name: "Missing", label: "Missing" },
        { name: "Missing_Description", label: "Missing Description" },
        { name: "Tsu", label: "Tsu" },
        { name: "Vol", label: "Vol" },
        { name: "Dy", label: "Dy" },
        { name: "Hr", label: "Hr" },
        { name: "Mn", label: "Mn" },
        { name: "Mo", label: "Mo" },
        { name: "Sec", label: "Sec" },
        { name: "OBJECTID", label: "OBJECTID" }
    ]

    view.on("click", function(event) {
        view.hitTest(event).then(function(response) {
            if (response.results.length > 0) {
                let graphic = response.results.filter(result => result.graphic.layer === earthquakeLayer)[0]?.graphic;
                if (graphic) {

                    const point = event.mapPoint;
                    const screenPoint = view.toScreen(point);

                    var limit = 0;

                    let content = "<h3>Earthquake Details</h3>";
                    
                    attributeList.forEach(attribute => {
                        if (limit < 7) {
                            const value = graphic.attributes[attribute.name];
                            if (value !== null && value !== undefined) {
                                content += `<b>${attribute.label}:</b> ${value} <br><br>`;
                                limit++;
                            }
                        }
                    })
                    
                    content += `<button onclick="closePopup()">Close</button>`;                
                        
                    customPopup.innerHTML = content;

                    customPopup.style.left = `${screenPoint.x + 10}px`;
                    customPopup.style.top = `${screenPoint.y + 10}px`;
                    customPopup.style.display = 'block';
                }
            }
        });
    });

    window.closePopup = function() {
        customPopup.style.display = 'none';
    };
});
