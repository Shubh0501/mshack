console.log("Map Connected");
var lattitude = [];
var longitude = [];
var lattitude1 = [];
var longitude1 = [];


var database1 = firebase.database().ref().child("Yes");

var database = firebase.database().ref().child("No");

database.on("child_added", snap => {
    var lat = parseFloat(snap.child("Latitude").val());
    console.log(lat)
    lattitude.push(lat);
    var long = parseFloat(snap.child("Longitude").val());
    longitude.push(long);
    // $(".show").append("<p>"+lat+ " " + long + "</p>");
})
console.log(lattitude);

database1.on("child_added", snap => {
    var lat1 = snap.child("Latitude").val();
    console.log(lat1)
    lattitude1.push(lat1);
    var long1 = snap.child("Longitude").val();
    longitude1.push(long1);
    // $(".show").append("<p>"+lat+ " " + long + "</p>");
})
console.log(lattitude1);

setTimeout(function(){
    var centre = new L.LatLng(28.549948, 77.268241);
    var map=new MapmyIndia.Map("map",{ center:centre,zoomControl: true,hybrid:true });
    var pt;
    map.on("click", function (e)
    {
        pt = e.latlng;
        console.log(pt.lat);
        var inner_div_lat = document.getElementById("lat_click");
        var inner_div_lng = document.getElementById("lng_click");
        inner_div_lat.innerHTML = "Lattitude : " + pt.lat;
        inner_div_lng.innerHTML = " Longitude : " + pt.lng;
    });
    var marker = L.marker(centre);
// L.marker(centre).addTo(map);

// var lattitude = [28.545, 28.546];
// var longitude = [77.268241, 77.266];

    for(var i=0; i<lattitude.length; i++){
        console.log(lattitude[i] + " " + longitude[i] )
        var temp = new L.LatLng(lattitude[i],longitude[i]);
        // L.marker(temp).addTo(map);

        showCircle();
        function showCircle() {
            lat = lattitude[i];
            long = longitude[i];
            var radius = 1000;
            marker.setLatLng([lat, long]);
            currentDiameter = L.circle([lat, long], {
                color: 'ff1517',
                fillColor: '#ff1517',
                fillOpacity: 0.5,
                radius: radius
            });
            currentDiameter.addTo(map);
            map.fitBounds(currentDiameter.getBounds());
        }
    }
    for(var i=0; i<lattitude1.length; i++){
        console.log(lattitude1[i] + " " + longitude1[i] )
        var temp = new L.LatLng(lattitude1[i],longitude1[i]);
        // L.marker(temp).addTo(map);

        showCircle();
        function showCircle() {
            lat = lattitude1[i];
            long = longitude1[i];
            var radius = 1000;
            marker.setLatLng([lat, long]);
            currentDiameter = L.circle([lat, long], {
                color: '186800',
                fillColor: '#186800',
                fillOpacity: 0.5,
                radius: radius
            });
            currentDiameter.addTo(map);
            map.fitBounds(currentDiameter.getBounds());
        }
    }


}, 5000);




