var dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    function initMap() {
        var geocoder;
        var map;
        var marker;
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -7.0157404,
                lng: 110.4171283
            },
            zoom: 15
        });
        var input = /** @type {!HTMLInputElement} */ (
            document.getElementById('pac-input'));

        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        console.log(input);
        autocomplete.bindTo('bounds', map);

        // This gives auto options similar to the input the user is typing the address 

        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17); // Why 17? Because it looks good.
            }

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            marker.addListener('click', displayForm);

            // this lets the pin be the place the searcher is looking for

            // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);

        });

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            draggable: true
        });

        function geocodePosition(pos) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                latLng: pos
            }, function(responses) {
                if (responses && responses.length > 0) {
                    marker.formatted_address = responses[0].formatted_address;
                } else {
                    marker.formatted_address = 'Cannot determine address at this location.';
                }
                infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
                infowindow.open(map, marker);
                console.log("New Address: ", marker.formatted_address)
            });
        }
        google.maps.event.addListener(marker, 'dragend', function() {
            document.getElementsByName('latitude_input').value = marker.getPosition().lat();
            document.getElementsByName('longitude_input').value = marker.getPosition().lng();
            // updateMarkerStatus('Drag ended');
            geocodePosition(marker.getPosition());

            console.log("THE LONGITUDE IS:" + marker.getPosition().lng());
            console.log("THE LATITUDE IS:" + marker.getPosition().lat());
        });

        function displayForm() {
            $('form').css('display', 'block');
            console.log("marker clicked");
            $('#map').css('display', 'none');
            $("#longitude_input").val(marker.getPosition().lng());
            $("#latitude_input").val(marker.getPosition().lat());
            $('#dateTime_input').val(dateTime);
            // console.log(currentLocation);
            // console.log(currentDate);
            // console.log(currentTime);

        }



    google.maps.event.addDomListener(window, "load", initMap);

    }