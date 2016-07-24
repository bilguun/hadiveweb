function project(point) {
  var latlng = new L.LatLng(point[1], point[0]);
  var layerPoint = map.latLngToLayerPoint(latlng);
  return [layerPoint.x, layerPoint.y];
}

var routeID = function(d, i) {
  return "route-" + d.properties.routeCode;
};

d3.json("data/routes.json", function(collection) {

  var path = d3.geo.path().projection(project);

  var feature = routeG.selectAll("path")
    .data(collection.features)
    .enter().append("path")
    .attr("class", "routepath")
    .attr("id", routeID)
    .attr("d", d3.geo.path())
    .style("visibility", "hidden")
    .style("stroke", "#154e80")
    .style("fill", "none")
    .style('stroke-width', "0.5px")
    .style("fill-opacity", 2.5);

  feature
    .append("title")
    .text(function(d) {
      return d.properties.routeCode;
    })

  toggles.init();

  reset();

  map.on("viewreset", reset);
  map.setView([40.787679, -73.975024], 12);

    // map._initPathRoot()
    
  // L.mapbox.styleLayer('mapbox://styles/mapbox/basic-v').addTo(map);
var camera_location = [
            [40.728279, -74.002867],
            [40.717642, -74.007589],
            [40.734894, -73.991062],
            [40.719964, -73.978750],
            [40.826403, -73.950357],
            [40.841725, -73.939340],
            [40.813389, -73.956273],
            [40.787679, -73.975024],
            [40.770320, -73.991379],
            [40.770115, -73.957413],
            [40.752807, -73.979281],
            [40.742911, -73.992787],
            [40.739760, -74.002519],
            [40.717871, -73.985618],
            [40.716724, -73.989160],
            [40.717364, -73.991170],
            [40.717666, -74.007546],
            [40.728791, -74.007085]
        ]
        for (i = 0; i < 18; i++) {
            L.marker(camera_location[i]).addTo(map);
            var popup = new mapboxgl.Popup()
                .setLngLat(camera_location[i])
                // .setHTML(feature.properties.description)
                .addTo(map);
            // .bindPopup(formatSegmentPopup(camera_location[i]));
        }



  function reset() {
    bounds = [
      [map.getBounds()._southWest.lng, map.getBounds()._southWest.lat],
      [map.getBounds()._northEast.lng, map.getBounds()._northEast.lat]
    ]
    var bottomLeft = project(bounds[0]),

      topRight = project(bounds[1]);

    svg.attr("width", topRight[0] - bottomLeft[0])
      .attr("height", bottomLeft[1] - topRight[1])
      .style("margin-left", bottomLeft[0] + "px")
      .style("margin-top", topRight[1] + "px");

    g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] +
      ")");

    feature.attr("d", path);
  }
})
