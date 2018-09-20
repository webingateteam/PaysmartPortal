var app = angular.module('myApp', ['google-maps','vsGoogleAutocomplete']);
app.controller('mapCtrl', function ($scope, $http) {
    $scope.selectloc = 1;
    var d = '';
    //$scope.pickupPoint_name = "Motinagar,Gayathi Apartments,hyderabad";
    $scope.selectpick = "Motinagar,Gayathi Apartments,hyderabad";
    $scope.selectdrop = "Motinagar,Gayathi Apartments,hyderabad";
    //$scope.droppoint_name = "Motinagar,Gayathi Apartments,hyderabad";
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var geocoder = new google.maps.Geocoder();
    google.maps.event.addDomListener(window, 'load', function () {
        var places = new google.maps.places.Autocomplete(document.getElementById('aad'));
        google.maps.event.addListener(places, 'place_changed', function () {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.lat();
            $scope.edtlat = latitude;
            var longitude = place.geometry.location.lng();
            $scope.edtlog = longitude;
            var mesg = "Address: " + address;
            mesg += "\nLatitude: " + latitude;
            mesg += "\nLongitude: " + longitude;
            if ($scope.edtlat != null) {
                createmarker();
            }
            //alert(mesg);
        });
       
    });

    //Begin Dropedit
    google.maps.event.addDomListener(window, 'load', function () {
        var places = new google.maps.places.Autocomplete(document.getElementById('edrop'));
        google.maps.event.addListener(places, 'place_changed', function () {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.lat();
            $scope.ddroptlat = latitude;
            var longitude = place.geometry.location.lng();
            $scope.ddroptlog = longitude;
            var mesg = "Address: " + address;
            mesg += "\nLatitude: " + latitude;
            mesg += "\nLongitude: " + longitude;
            if ($scope.ddroptlat != null) {
                createmarkerdrop();
            }
            //alert(mesg);
        });

    });
    //End Dropedit
    $scope.map = {
        control: {},
        center: {
            latitude: 17.3850,
            longitude: 78.4867
        },
        zoom: 16

    };
    function createmarker() {
        var LatLng = new google.maps.LatLng($scope.edtlat, $scope.edtlog);
        var mapOptions = {
            center: LatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var infowindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;
        var marker = new google.maps.Marker({
            position: LatLng,
            map: map,
            title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + $scope.edtlat + "<br />Longitude: " + $scope.edtlog
        });
        geocodeLatLng($scope.edtlat + ',' + $scope.edtlog, geocoder, map, infowindow);
        function geocodeLatLng(dd, geocoder, map, infowindow) {
            var latlngStr = dd.split(',', 2);
            var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        //map.setZoom(11);
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        $scope.pickupPoint_name = results[0].formatted_address;
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }

        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);

        });
    }

    // Being for dropedit map creation
    function createmarkerdrop() {
        var LatLng = new google.maps.LatLng($scope.ddroptlat, $scope.ddroptlog);
        var mapOptions = {
            center: LatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap1"), mapOptions);
        var infowindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;
        var marker = new google.maps.Marker({
            position: LatLng,
            map: map,
            title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + $scope.ddroptlat + "<br />Longitude: " + $scope.ddroptlog
        });
        geocodeLatLng($scope.ddroptlat + ',' + $scope.ddroptlog, geocoder, map, infowindow);
        function geocodeLatLng(dd, geocoder, map, infowindow) {
            var latlngStr = dd.split(',', 2);
            var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        //map.setZoom(11);
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        $scope.droppoint_name = results[0].formatted_address;
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }

        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);

        });
    }
    //End for Dropedit map creation
    $scope.getcurrentloc = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
                var infowindow = new google.maps.InfoWindow;
                var geocoder = new google.maps.Geocoder;
                var marker = new google.maps.Marker({
                    position: LatLng,
                    map: map,
                    title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
                });
                geocodeLatLng(p.coords.latitude + ',' + p.coords.longitude, geocoder, map, infowindow);
                function geocodeLatLng(dd, geocoder, map, infowindow) {
                    //var input = document.getElementById('latlng').value;
                    var latlngStr = dd.split(',', 2);
                    var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
                    geocoder.geocode({ 'location': latlng }, function (results, status) {
                        if (status === 'OK') {
                            if (results[0]) {
                                //map.setZoom(11);
                                var marker = new google.maps.Marker({
                                    position: latlng,
                                    map: map
                                });
                                infowindow.setContent(results[0].formatted_address);
                                infowindow.open(map, marker);
                                $scope.pickupPoint_name = results[0].formatted_address;
                                document.getElementById("pickname").value = results[0].formatted_address;
                                document.getElementById("aad").placeholder = results[0].formatted_address;
                                 //$scope.pickupPoint_name = t;
                                 $scope.editpickup = null;
                                 //$scope.pickupPoint_name = t;
                                 //$scope.pickupPoint_name1 = t;
                                 $scope.selectloc = 1;
                            } else {
                                window.alert('No results found');
                            }
                        } else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                }

                google.maps.event.addListener(marker, "click", function (e) {
                    var infoWindow = new google.maps.InfoWindow();
                    infoWindow.setContent(marker.title);
                    infoWindow.open(map, marker);

                });
            });
        } else {
            alert('Geo Location feature is not supported in this browser.');
        }
      
    }
    $scope.pickuppoint = function () {
        //if (navigator.geolocation) {
        //    navigator.geolocation.getCurrentPosition(function (p) {
        //        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        //        var mapOptions = {
        //            center: LatLng,
        //            zoom: 13,
        //            mapTypeId: google.maps.MapTypeId.ROADMAP
        //        };
        //        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        //        var infowindow = new google.maps.InfoWindow;
        //        var geocoder = new google.maps.Geocoder;
        //        var marker = new google.maps.Marker({
        //            position: LatLng,
        //            map: map,
        //            title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
        //        });
        //        geocodeLatLng(p.coords.latitude + ',' + p.coords.longitude, geocoder, map, infowindow);
        //        function geocodeLatLng(dd,geocoder, map, infowindow) {
        //            //var input = document.getElementById('latlng').value;
        //            var latlngStr = dd.split(',', 2);
        //            var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
        //            geocoder.geocode({ 'location': latlng }, function (results, status) {
        //                if (status === 'OK') {
        //                    if (results[0]) {
        //                        //map.setZoom(11);
        //                        var marker = new google.maps.Marker({
        //                            position: latlng,
        //                            map: map
        //                        });
        //                        infowindow.setContent(results[0].formatted_address);
        //                        infowindow.open(map, marker);
        //                        d = results[0].formatted_address;
        //                        document.getElementById("pickname").value = results[0].formatted_address;
        //                        document.getElementById("aad").placeholder = results[0].formatted_address;
        //                        //$scope.pickupPoint_name1 = results[0].formatted_address;
        //                        //initMap();
        //                        $scope.pickupPoint_name = d;
        //                        //$scope.pickupPoint_name1 = d;   
        //                    } else {
        //                        window.alert('No results found');
        //                    }
        //                } else {
        //                    window.alert('Geocoder failed due to: ' + status);
        //                }
        //            });
        //        }

        //        google.maps.event.addListener(marker, "click", function (e) {
        //            var infoWindow = new google.maps.InfoWindow();
        //            infoWindow.setContent(marker.title);
        //            infoWindow.open(map, marker);
                   
        //        });
        //    });
        //} else {
        //    alert('Geo Location feature is not supported in this browser.');
        //}
        $scope.editpickup = 1;
        $scope.selectloc = null;
    }
    $scope.droppoint1 = function () {
        //get the source latitude and longitude
        //get the target latitude and longitude
        $scope.srcLat = $scope.dropPoint_edit.place.geometry.location.lat();
        $scope.srcLon = $scope.dropPoint_edit.place.geometry.location.lng();
        //$scope.destLat = $scope.dropPoint.place.geometry.location.lat();
        //$scope.destLon = $scope.dropPoint.place.geometry.location.lng();


        $scope.srcName = $scope.dropPoint_edit.place.name;
        $scope.droppoint_name = $scope.dropPoint_edit.place.name;
        // $scope.destName = $scope.dropPoint.place.name;
        //alert($scope.dropPoint.place.geometry.location.lat);
        //testing
        var LatLng = new google.maps.LatLng($scope.srcLat, $scope.srcLon);
        var mapOptions = {
            center: LatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap1"), mapOptions);
        var infowindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;
        var marker = new google.maps.Marker({
            position: LatLng,
            map: map,
            title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + $scope.srcLat + "<br />Longitude: " + $scope.srcLon
        });
        geocodeLatLng($scope.srcLat + ',' + $scope.srcLon, geocoder, map, infowindow);
        function geocodeLatLng(dd, geocoder, map, infowindow) {
            //var input = document.getElementById('latlng').value;
            var latlngStr = dd.split(',', 2);
            var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        //map.setZoom(11);
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        d = results[0].formatted_address;
                        document.getElementById("editdrop").value = d; 
                        document.getElementById("dropPoint").value = d;
                        $scope.droppoint_name = d;
                        //$scope.pickupPoint_name = d;
                        //$scope.pickupPoint_name1 = d;
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }

        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);

        });


        //testing
        var request = {
            origin: new google.maps.LatLng($scope.srcLat, $scope.srcLon),//$scope.directions.origin,
            //destination: new google.maps.LatLng($scope.destLat, $scope.destLon),//$scope.directions.destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map);
                // directionsDisplay.setPanel(document.getElementById('distance').innerHTML += response.routes[0].legs[0].distance.value + " meters");

                $scope.distval = response.routes[0].legs[0].distance.value / 1000;
                $scope.distText = $scope.distval + " KM";

                //response.routes[0].bounds["f"].b
                //17.43665
                //response.routes[0].bounds["b"].b
                //78.41263000000001


                //response.routes[0].bounds["f"].f
                //17.45654
                //response.routes[0].bounds["b"].f
                //78.44829                

                //$scope.srcLat = response.routes[0].bounds["f"].b;
                //$scope.srcLon = response.routes[0].bounds["b"].b;
                //$scope.destLat = response.routes[0].bounds["f"].f;
                //$scope.destLon = response.routes[0].bounds["b"].f;              

                //$scope.directions.showList = true;
            } else {
                alert('Google route unsuccesfull!');
            }


        });
        $scope.location();

    }
    $scope.EditPickup = function () {
        document.getElementById("editpickname").placeholder = '';
        //document.getElementById("address").value = $scope.vm.address.formatted_address;
        //get the source latitude and longitude
        //get the target latitude and longitude
        $scope.srcLat = $scope.dropPoint_edit.place.geometry.location.lat();
        $scope.srcLon = $scope.dropPoint_edit.place.geometry.location.lng();
        //$scope.destLat = $scope.dropPoint.place.geometry.location.lat();
        //$scope.destLon = $scope.dropPoint.place.geometry.location.lng();

        $scope.srcName = $scope.dropPoint_edit.place.name;
        // $scope.destName = $scope.dropPoint.place.name;
        //alert($scope.dropPoint.place.geometry.location.lat);
        var request = {
            origin: new google.maps.LatLng($scope.srcLat, $scope.srcLon),//$scope.directions.origin,
            //destination: new google.maps.LatLng($scope.destLat, $scope.destLon),//$scope.directions.destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map);
                // directionsDisplay.setPanel(document.getElementById('distance').innerHTML += response.routes[0].legs[0].distance.value + " meters");

                $scope.distval = response.routes[0].legs[0].distance.value / 1000;
                $scope.distText = $scope.distval + " KM";

                //response.routes[0].bounds["f"].b
                //17.43665
                //response.routes[0].bounds["b"].b
                //78.41263000000001


                //response.routes[0].bounds["f"].f
                //17.45654
                //response.routes[0].bounds["b"].f
                //78.44829                

                //$scope.srcLat = response.routes[0].bounds["f"].b;
                //$scope.srcLon = response.routes[0].bounds["b"].b;
                //$scope.destLat = response.routes[0].bounds["f"].f;
                //$scope.destLon = response.routes[0].bounds["b"].f;              

                //$scope.directions.showList = true;
            } else {
                alert('Google route unsuccesfull!');
            }
        });
        $scope.location();

    }
    $scope.location = function () {
        srcLat: $scope.srcLat;
        srcLon: $scope.srcLon;

    }
    $scope.droppoint = function () {
        $scope.editdrop = 1;
        $scope.selectloc = null;
    }
    $scope.goBackdrop = function () {
        $scope.selectloc = 1;
        $scope.editdrop = null;
    }
    $scope.goBackpickup = function () {
        $scope.selectloc = 1;
        $scope.editpickup = null;
    }
    $scope.selecttypevehicle = function () {
        $scope.selectpick = $scope.pickupPoint_name;
        $scope.selectdrop = $scope.droppoint_name;
        $scope.getDirections();
        $scope.selcttvehicle = 1;
        $scope.selectloc = null;
        $scope.editpickup = null;
    }
    $scope.gobackselecttypevehicle = function () {
        $scope.selcttvehicle = null;
        $scope.selectloc = 1;
        $scope.editpickup = null;

    }
    $scope.confirmdetails = function () {
        $scope.selcttvehicle = null;
        $scope.selectloc = null;
        $scope.editpickup = null;
        $scope.confirmd=1
    }
    $scope.goBackconfirm = function () {
        $scope.selcttvehicle = 1;
        $scope.selectloc = null;
        $scope.editpickup = null;
        $scope.confirmd = null
    }

    $scope.getDirections = function () {
        //var request = {
        //    origin: $scope.pickupPoint_name,
        //    destination: $scope.droppoint_name,
        //    travelMode: google.maps.DirectionsTravelMode.DRIVING
        //};
        //Begin Road Map
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map1'), {
            zoom: 14,
            center: { lat: 17.3850, lng: 78.4867 } 
        });
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = 'DRIVING';
        directionsService.route({
            origin: $scope.pickupPoint_name,  // Haight.
            destination: $scope.droppoint_name,  // Ocean Beach.
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode]
        }, function (response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
        //End Road Map
    }
});
