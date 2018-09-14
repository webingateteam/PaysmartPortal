var app = angular.module('myApp', ['ngStorage'])
var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $rootScope) {
    $scope.selectedOp = 0;
    if ($localStorage.uname) {
        $scope.username = $localStorage.uname;
    }
    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    }

    $scope.book1 = $scope.$localStorage;

    $scope.onwarddetails = $localStorage.onwarddetails;
    $scope.BookingId = $localStorage.BookingId;

    //retrive the emailid and mobile no and try to get the user details from db
    //if not exists then show empty
    $scope.getcheckoutdetails = function () {

        var emailid = $scope.onwarddetails.EmailId;
        $http.get('/api/websiteuserinfo/GetWebsiteUserInfo?logininfo=' + emailid).then(function (response, data) {
            $scope.userdetails = response.data[0];
        });
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
                    window.location.href = "BookedTicketHistory.html";
                }
                else {
                    window.location.href = "UserProfile.html";
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
    $scope.LogoutUser = function () {
        $localStorage.uname = null;
        $scope.username = null;
        $localStorage.userdetails = null;

        window.location.href = "../index.html";
    }

    $scope.ProceedToPayment = function () {

        $rootScope.spinner.on();

        $scope.onwarddetails = $localStorage.onwarddetails;

        if ($scope.onwarddetails == null) {
            alert('Error occurred during ticket booking. Please retry or contact INTERBUS administrator if the problem persists.');
            return;
        }

        $http({
            url: '/api/TicketBooking/SaveBookingDetails',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: $scope.onwarddetails
        }).success(function (data, status, headers, config) {
            if (data == null) {
                $rootScope.spinner.off();
                alert('Error during ticket booking. Please re-try.')
                return;
            }
            $scope.BookingId = data;

            if ($scope.BookingId == null || $scope.BookingId == -1) {
                $rootScope.spinner.off();
                alert('Error during ticket booking. Please re-try.')
                return;
            }
            $localStorage.BookingId = $scope.BookingId;

            window.location.href = "TicketPage.html";

        }).error(function (ata, status, headers, config) {
            $rootScope.spinner.off();
            alert('Error during ticket booking. Please re-try. Details:' + ata);
        });

        //alert('Payment gateway integration will done here and on successful payment user will be redirect to ticket printing page.');      
    }

});