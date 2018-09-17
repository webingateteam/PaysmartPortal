var app = angular.module('myApp', ['google-maps', 'vsGoogleAutocomplete']);
app.controller('mapCtrl', function ($scope, $http) {
    $scope.selectloc = 1;
    $scope.pickupPoint_name = "Motinagar,Gayathi Apartments,hyderabad";
    $scope.selectpick = "Motinagar,Gayathi Apartments,hyderabad";
    $scope.selectdrop = "Motinagar,Gayathi Apartments,hyderabad";
    //$scope.droppoint_name = "Motinagar,Gayathi Apartments,hyderabad";
    $scope.pickuppoint = function () {
        $scope.editpickup = $scope.pickupPoint_name
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(17.3850, 78.4867),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
        $scope.cities = [];
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();
        $scope.selectloc = null;
    }
    $scope.EditPickup = function () {

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
        $scope.selcttvehicle = 1;
        $scope.selectloc = null;
        $scope.editpickup = null;
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(17.3850, 78.4867),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map1'), mapOptions);

        $scope.markers = [];
        $scope.cities = [];
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();
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
});
