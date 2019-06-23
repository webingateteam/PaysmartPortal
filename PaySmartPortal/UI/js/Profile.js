var app = angular.module('myApp', ['ngStorage'])

var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage) {


    $scope.selectedOp = 0;

    if ($localStorage.uname) {
        $scope.username = $localStorage.uname;
    }

    if ($localStorage.uname) {
        $scope.UserName = $localStorage.uname;

        $scope.Mobile = $localStorage.userdetails[0].Mobile;

        $http.get('/api/websiteuserinfo/GetWebsiteUserInfo?logininfo=' + $scope.Mobile).then(function (response, data) {
            $scope.userdetails = response.data[0];

        });
        $scope.emailid = $localStorage.userdetails[0].EmailAddress;

        $scope.GetHistory = function () {
            $http.get('/api/WebsiteUserInfo/GetBookedHistory?emailid=' + $scope.emailid).then(function (response, data) {
                $scope.bookedHistory = response.data;

            });
        }
    } else {
        window.location.href = "../index.html";
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

    $scope.LogoutUser = function () {
        $localStorage.uname = null;
        $scope.UserName = null;
        $localStorage.userdetails = null;

        window.location.href = "../index.html";
    }
});