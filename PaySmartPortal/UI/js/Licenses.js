// JavaScript source code
var app = angular.module('myApp', ['ngStorage', 'ui.bootstrap'])
var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal) {

    $scope.selectedOp = 0;
    if ($localStorage.uname) {
        $scope.username = $localStorage.uname;
    }
    $scope.licenseCatId = 7;//$localStorage.licenseId;
    $scope.FleetOwnerCode = $localStorage.code;

    $scope.GetAdvertisment = function () {

        $http.get('/api/License/GetAdvertisment').then(function (response, req) {
            $scope.advertisement = response.data;
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
    /*the below function gets all the configured licenses for the given category*/
    $scope.GetLicense = function () {

        //if ($scope.licenseCatId == null || $scope.licenseCatId.Id == null) {
        //    $scope.showVDialog('No license details configured for the selected license category. Please contact INTERBUS administartor.');
        //    return;
        //}
        //$http.get('/api/LicensePage/GetLicense?LicenseCatId=' + $scope.licenseCatId.Id).then(function (response, req)
        $http.get('/api/License/GetLicense').then(function (response, req) {
            $scope.License = response.data;
            if ($scope.License == null) {
                alert('No license details configured for the selected license category. Please contact INTERBUS administartor.');
                return;
            }
        });
    }

    $scope.getUserLicenses = function () {

        $http.get('/api/UserLicenses/getUserLicenses').then(function (response, req) {
            $scope.License = response.data;
            if ($scope.License == null) {
                alert('No license details configured for the selected license category. Please contact INTERBUS administartor.');
                return;
            }
        })

    }

    $scope.showBuyBtn = 0;
    $scope.showRenewBtn = 0;

    //$scope.ValidateLicenseCode = function (lcode) {
    //    var code = {
    //        licensecode: $scope.lcode
    //    }
    //    var req = {
    //        method: 'POST',
    //        url: '/api/LicensePage/SaveLicence',
    //        data: License
    //    }
    //    $http(req).then(function (response) {
    //        alert(response.data);
    //        window.location.href = "Cartdetails.html";
    //    });

    //};
    $scope.ValidateLicenseCode = function (lcode) {

        if (lcode == null) {

            //$scope.showVDialog('please enter valid fleet owner code or contact administrator.');
            return false;
        }
        else {

            $http.get('/api/fleetownerlicense/validatefleetowner?fleetownercode=' + lcode).then(function (response, req) {
                $scope.foLicenseDetails = response.data;
                if ($scope.foLicenseDetails.Table2[0].result == 0) {
                    $scope.showVDialog('Invalid Fleet Owner Code');
                }
                else {
                    $http.get('/api/UserLicenses/getFleetLicenses?fleetcode=' + lcode).then(function (response, req) {
                        $scope.License = response.data;
                        $scope.lLicense = response.data;
                        if ($scope.License == null) {
                            alert('No license details configured for the selected license category. Please contact INTERBUS administartor.');
                            return;
                        }
                    })
                    //$localStorage.foLicenseDetails = $scope.foLicenseDetails;
                    //$scope.saveUserLicense($scope.License);
                    //window.location.href = "Cartdetails.html";

                }
            });
        }
    };
    $scope.ValidateFOCode = function (code, License, Lid) {

        if (code == null) {

            alert('please enter valid fleet owner code or contact administrator.');
            return false;
        }
        else {
            $http.get('/api/License/validatefleetowner?fleetownercode=' + code).then(function (response, req) {
                $scope.foLicenseDetails = response.data;
                if ($scope.foLicenseDetails.Table2[0].result == 0) {
                    alert('invalid fleet owner code');
                }
                else {
                    $localStorage.foLicenseDetails = $scope.foLicenseDetails;
                    $scope.saveUserLicense(License, Lid);
                }
            });
        }
    };
    $scope.buy = true;
    $scope.Renew = true;
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.buy = $scope.buy ? false : true;
        $scope.Renew = $scope.Renew ? false : true;
    }
    $scope.licenseId = '';
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.licenseId = $scope.licenseId ? true : false;
    }
    $scope.SetLicensedetails = function (License, Lid) {
        $localStorage.License = License;
        $localStorage.LicenseTypeId = Lid.Id;
        $localStorage.SelLic = Lid;
        $localStorage.Isrenewal = 0;
    };
    $scope.GoToConfirmation1 = function (code, License, Lid) {

        $localStorage.Isrenewal = 1;
        $scope.UselicenseRecord = $localStorage.foLicenseDetails.Table1;

    };
    $scope.save = function (LicenseTypeId, code) {

        var License = {
            LicenseTypeId: LicenseTypeId,
            fleetownercode: code
        };
        $localstorage.value = License;
        var req = {
            method: 'POST',
            url: '/api/LicensePage/SaveLicence',
            data: License
        }
        $http(req).then(function (response) {
            alert(response.data);
            window.location.href = "Cartdetails.html";
        });

        //
    };
    $scope.saveUserLicense = function (License, Lid) {

        var userlicense = {
            UserId: $localStorage.foLicenseDetails.Table[0].userid,
            FOId: $localStorage.foLicenseDetails.Table[0].foid,
            FOCode: $localStorage.foLicenseDetails.Table[0].FleetOwnerCode,
            LicenseTypeId: $localStorage.LicenseTypeId,
            StartDate: $localStorage.StartDate,
            ExpiryOn: $localStorage.ExpiryOn,
            GracePeriod: 7,//$localStorage.GracePeriod,
            ActualExpiry: $localStorage.ActualExpiry,
            LastUpdatedOn: $localStorage.LastUpdatedOn,
            StatusId: 1,//$localStorage.StatusId,
            RenewFreqTypeId: $localStorage.SelLic.RenewFreqTypeId,
            insupddelflag: 'I'
        }
        var req = {
            method: 'POST',
            url: '/api/UserLicenses/SaveUserLicenseDetails',
            data: userlicense
        }
        $http(req).then(function (response) {
            $localStorage.UselicenseRecord = response.data;
            window.location.href = "Cartdetails.html";
        });

        //
    };
    $scope.LogoutUser = function () {
        $localStorage.uname = null;
        $scope.username = null;
        $localStorage.userdetails = null;

        window.location.href = "../index.html";
    }

    //-----------------Hidestart-------------------
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    //-----------------Hideend-------------------

    $scope.showVDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'statusPopup.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }
    //-----------------Hidestart-------------------
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    //-----------------Hideend-------------------
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
