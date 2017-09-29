//Load map

$(document).ready(function() {
    var mapCenter = { lat: 40.7280556, lng: -74.0780556 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: mapCenter
    });


    var queryURL = window.location.origin + "/api/incidents"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var lat = parseFloat(response[i].Latitude);
            var lng = parseFloat(response[i].Longitude);
            console.log(lat);
            console.log(lng);
            var myLatLng = { lat, lng };
            console.log(myLatLng);
            var details = "Type " + response[i].HarassmentType + " Description " + response[i].Description;
            var marker = new google.maps.Marker({
                map: map,
                position: myLatLng,
                title: details
            });

        }
    });
   
});