/// <reference path="../Search.html" />
/// <reference path="../Search.html" />

var app = angular.module('myApp', ['ngStorage', 'ui.bootstrap'])

var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage) {

    $scope.selectedOp = 0;

    //if ($localStorage.uname) {
    //    $scope.username = $localStorage.uname;
    //}

    //$scope.carouselImages = [{ "ID": 1, "Name": "TRAVEL WITH INTERBUS", "Caption": "Every Journey Matters....", "Path": "UI/Images/promos/11.jpg" }
    //    , { "ID": 2, "Name": "Customer satisfaction", "Caption": "The comfort and convienience of travelling with INTERBUS", "Path": "/UI/Images/promos/12.png" }
    //    , { "ID": 3, "Name": "Online Ticket Booking", "Caption": "Automated ticketing increases performance and convienience", "Path": "/UI/Images/promos/13.jpg" }
    //    , { "ID": 4, "Name": "Hassel free travel", "Caption": "Get online tickets to make the journey hassel free", "Path": "/UI/Images/promos/14.png" }
    //    , { "ID": 5, "Name": "Extensive coverage", "Caption": "Wide network taking you to various destinations", "Path": "/UI/Images/promos/2.png" }
    //];
    //$scope.triptype = "oneway";

    //$scope.timing = "Now";

    //$scope.ChangeTravelType = function (travelTime) {
    //    $scope.timing = (travelTime == 0) ? "Now" : "Later";
    //}
    //$scope.GetCarousel = function () {
    //    $http.get('/api/Carousel/GetCarousel').then(function (res, data) {
    //        $scope.carouselImages = res.data;
    //    });
    //}
    $scope.GetDeals = function () {
        $http.get('/api/AdvertismentDeals/GetAdvertismentDeal').then(function (response, req) {
            $scope.advertisementDeals = response.data;
        });
    }

    var INTERVAL = 1000;
    //  slides = (
    //$scope.GetCarousel = function () {
    //    $http.get('/api/Carousel/GetCarousel').then(function (res, data) {
    //           $scope.slides = res.data;

    //       // slides = [


    //       //{ id: "image00", src: "http://localhost:3121/ui/images/img4.jpg", title: 'Our love', subtitle: 'will prove everyone wrong!' },
    //       //{ id: "image01", src: "http://localhost:3121/ui/images/img4.jpg", title: 'Can you feel', subtitle: 'the love tonight!' },
    //       //{ id: "image02", src: "http://localhost:3121/ui/images/img4.jpg", title: 'You are the wind', subtitle: 'beneath my wings' }
    //       // ];

    //   });

    //    loadSlides();


    //    }

    //{ id: "image00", src: "./images/image00.jpg", title: 'Our love', subtitle: 'will prove everyone wrong!' },
    //{ id: "image01", src: "./images/image01.jpg", title: 'Can you feel', subtitle: 'the love tonight!' },
    //{ id: "image02", src: "./images/image02.jpg", title: 'You are the wind', subtitle: 'beneath my wings' },
    //{ id: "image03", src: "./images/image03.jpg", title: 'Anything for you', subtitle: 'even accepting your family' },
    //{ id: "image04", src: "./images/image04.jpg", title: 'True love', subtitle: 'a dream within a dream' }
    //   );

    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        QueueService.loadManifest(slides);
    }

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'slide-left-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    $scope.RadioChange = function (s) {
        $scope.triptype = s;
    };
    $scope.GetCountry = function () {

        $http.get('/api/Country/GetCountry?active=1').then(function (response, req) {
            $scope.Countries = response.data;

        });
    }
    $scope.GetStops = function () {

        $http.get('/api/Stops/GetStops').then(function (response, req) {
            $scope.Stops = response.data;
            $localStorage.Stops = $scope.Stops;
        }, function (data) {

        });

        $http.get('/api/Stops/TypesByGroupId?groupid=3').then(function (res, data) {
            $scope.licenses = res.data;

        });
    }
    $scope.GetAdvertisment = function () {

        $http.get('/api/Advertisement/GetAdvertisment').then(function (response, req) {
            $scope.advertisement = response.data;
        });
    }
    $scope.GetActivityLog = function () {

        $http.get('/api/Advertisement/GetActivityLog').then(function (response, req) {
            $scope.activityimages = response.data;
        });
    }
    $scope.GetServices = function () {
        if ($scope.S == null) {
             alert('Please select source.');

            //$scope.showDialog('Please select source.');
            return;
        }

        if ($scope.D == null) {
            //$scope.showDialog('Please select destination.');
            alert('Please select destination.');
            return;
        }

        $localStorage.src = $scope.S;
        $localStorage.dest = $scope.D;

        //$rootscope.src = $scope.RS;
        //$rootscope.dest = $scope.RD;
        // $localStorage.timing = ($scope.timing == 'Now') ? Date() : $scope.timing;
        $localStorage.triptype = $scope.triptype;
        window.location.href = "Search.html";
    }
    $scope.GetHireVehicle = function () {
        if ($scope.SD == null) {
            // alert('Please select source.');

            alert('Please select source.');
            return;
        }

        if ($scope.DS == null) {
            alert('Please select destination.');
            return;
        }

        $localStorage.src = $scope.SD;
        $localStorage.dest = $scope.DS;

        //$rootscope.src = $scope.RS;
        //$rootscope.dest = $scope.RD;
        // $localStorage.timing = ($scope.timing == 'Now') ? Date() : $scope.timing;
        //  $localStorage.triptype = $scope.triptype;
        window.location.href = "UI/hirevehicle.html";
    }
    $scope.Signin = function () {

        var u = $scope.UserName;
        var p = $scope.Password

        if (u == null) {
            $scope.showDialog('Please enter username');
            return;
        }

        if (p == null) {
            $scope.showDialog('Please enter password');
            return;
        }
        var inputcred = { LoginInfo: u, Passkey: p }

        var req = {
            method: 'POST',
            url: '/api/ValidateCredentials/ValidateCredentials',
            data: inputcred
        }

        $http(req).then(function (res) {

            if (res.data.length == 0) {
                alert('invalid credentials');
            }
            else {
                //if the user has role, then get the details and save in session
                $localStorage.uname = res.data[0].FirstName;
                $scope.username = $localStorage.uname;
                $localStorage.userdetails = res.data;
                //  window.location.href = "UI/BookedTicketHistory.html";
                //$uibModal.close();
                if ($scope.selectedOp == 1) {
                    window.location.href = "UI/BookedTicketHistory.html";
                }
                else {
                    window.location.href = "UI/UserProfile.html";
                }
                //switch ($scope.SelectedOp) {
                //    case 1:
                //        window.location.href = "UI/BookedTicketHistory.html";
                //        break;                    
                //    case 2:
                //        window.location.href = "UI/CancelTicket.html";
                //        break;
                //    case 3:
                //        window.location.href = "UI/Feedback.html";
                //        break;
                //    case 4:
                //        window.location.href = "UserProfile.html";
                //        break;
                //    default:
                //        window.location.href = "UserProfile.html";
                //        break;
                //        break;
                //}

            }
        });
    }

    $scope.SignOutUser = function () {
        $localStorage.uname = null;
        $scope.username = null;
        $localStorage.userdetails = null;
    }

    //$scope.GotToLicensePage = function (t) {
    //    $localStorage.licenseId = t;
    //    window.location.href = "UI/LicensePage.html";
    //}

    $scope.RecentJourneyClick = function () {
        if ($localStorage.uname) {
            window.location.href = "UI/BookedTicketHistory.html";
        }
        else {
            $scope.selectedOp = 1;
        }

    }


    $scope.showDialog = function (message) {
        //alert(message);
        //var modalInstance = $uibModal.open({
        //    animation: $scope.animationsEnabled,
        //    templateUrl: 'statusPopup.html',
        //    controller: 'ModalInstanceCtrl',
        //    resolve: {
        //        mssg: function () {
        //            return message;
        //        }
        //    }
        //});
    }

});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

function fun() {
    if (document.getElementById("ddlBusType").value == 2) {//if Booking Type
        window.location.href = "booking.html";

    } else if (document.getElementById("ddlBusType").value == 3) {//if Hiring Type

        window.location.href = "vehicleavailability.html";
    }
}



app.factory('QueueService', function ($rootScope) {
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        queue.loadManifest(manifest);

        queue.on('progress', function (event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function () {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});

app.animation('.slide-animation', function ($window) {
    return {
        enter: function (element, done) {
            var startPoint = $window.innerWidth * 0.5,
                tl = new TimelineLite();

            tl.fromTo(element.find('.bg'), 1, { alpha: 0 }, { alpha: 1 })
                .fromTo(element.find('.xlarge'), 1, { left: startPoint, alpha: 0 }, { left: 50, alpha: 1, ease: Ease.easeInOut })
                .fromTo(element.find('.title'), 3, { left: startPoint, alpha: 0 }, { left: 50, alpha: 1, ease: Ease.easeInOut })
                .fromTo(element.find('.subtitle'), 3, { left: startPoint, alpha: 0 }, { left: 50, alpha: 1, ease: Ease.easeInOut, onComplete: done });

        },

        leave: function (element, done) {
            var tl = new TimelineLite();

            tl.to(element, 1, { alpha: 0, onComplete: done });
        }
    };
});

app.directive('bgImage', function ($window) {
    return function (scope, element, attrs) {
        var resizeBG = function () {
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
            } else {
                element.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
            }
        };

        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);

        element.bind('load', function () {
            resizeBG();
        });
    }
});

