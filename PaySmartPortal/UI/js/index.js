var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap'])
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal) {
    $scope.selectedOp = 0;
    if ($localStorage.uname) {
        $scope.username = $localStorage.uname;
    }
    $scope.registeredUseId = 0;
    $scope.userEmailAddress = 'test';//null;
    $scope.emailVerificationStatus = 0;


    $scope.SaveNew = function (register) {
        if (register == null) {
            alert('Please enter FirstName.');
            return;
        }
        if (register.FirstName == null || register.FirstName == "") {
            alert('Please enter MiddleName.');
            return;
        }
        if (register.LastName == null || register.LastName == "") {
            alert('Please enter LastName.');
            return;
        }
        if (register.UserName == null || register.UserName == "") {
            alert('Please enter UserName.');
            return;
        }
        if (register.Country == null || register.Country.Id == null) {
            alert('Please select Country.');
            return;
        }
        if (register.Email == null || register.Email == "") {
            alert('Please enter EmailAddress.');
            return;
        }
        else {
            $scope.userEmail = register.Email;
        }

        if (register.Mobilenumber == null || register.Mobilenumber == "") {
            alert('Please enter Mobile.');
            return;
        }
        if (register.Password == null || register.Password == "") {
            alert('Please enter Password.');
            return;
        }
        if (register.RePassword == null || register.RePassword == "") {
            alert('Please re-enter Password.');
            return;
        }
        if (register.Password != register.RePassword) {
            alert('Passwords do not match');
            return;
        }       
        //if (register.Gender == null) {
        //    alert('Please select Gender.');
        //    return;
        //}
        //var agreement = document.getElementById('agreement');
        //if (agreement.checked == false) {
        //    alert('Please accept the terms and conditions.');
        //    return;
        //}


        var userinfo = {

            CountryId: register.Country.Id,
            UserName: register.UserName,
            FirstName: register.FirstName,
            lastName: register.LastName,
            EmailAddress: register.Email,
            Mobile: register.Mobilenumber,           
            Password: register.Password,
            Gender: register.Gender,
            UserTypeId: 1,
            UserId: null,
            IsEmailVerified: 0,
            InsUpdDelFlag: 'I'
        };



        var req = {
            method: 'POST',
            url: '/api/websiteuserinfo/saveUserInfo',
            //headers: {
            //    'Content-Type': undefined

            data: userinfo
        }
        //if (data != null) {
        //    alert('Saved successfully!!.');
        //    return;
        //}
        $http(req).then(function (response) {

            if (response.data.length == 0) {
                $scope.registeredUseId = 0;
                alert('User name or email address or mobile already exists or could not be registered. Please contact PaySmart administrator.')
            }
            else {
                //if the user has role, then get the details and save in session
                //$localStorage.uname = response.data[0].name;
                //$localStorage.userdetails = response.data;

                $scope.registeredUseId = 1;
                

                alert("Saved successfully!!. Please enter the Email verification code sent to email address to complete registration.");
                $('#exampleModalLong').modal('show');
                $scope.type = null;
            }

            //$scope.registeredUseId = response.data;

            //if ($scope.registeredUseId > 0) {
            //    // $scope.showDialog("Saved successfully!!<br/>. Please enter the Email verification code sent to email address to complete registration.");
            //    alert("Saved successfully!!. Please enter the Email verification code sent to email address to complete registration.");
            //    $scope.type = null;
            //    // $scope.GetWebsiteUserInfo();
            //}
            //else {

            //}

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            $scope.registeredUseId = 0;
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog(errmssg);
        });

    }

    $scope.GetConfigData = function () {

        var vc = {
            includeActiveCountry: '1',            
        };

        var req = {
            method: 'POST',
            url: '/api/Common/ConfigData',
            data: vc
        }

        $http(req).then(function (res) {
            $scope.initdata = res.data;
        });
    }

    $scope.VerifyEmailAddress = function () {

        if ($scope.emailAddrCode == null) {
            $scope.showDialog('Please enter valid verification code.');
            return;
        }

        if ($scope.userEmailAddress == null) {
            $scope.showDialog('Email Address could not be verified currently. Please re-try from user profile details. Click "OK" to navigate to user profile section.');
            return;
        }

        $http.get('/api/websiteuserinfo/VerifyEmailAddress?emailAddress=' + $scope.userEmailAddress + '&code=' + $scope.emailAddrCode).then(function (response, req) {
            $scope.emailVerificationStatus = response.data;
            if ($scope.emailVerificationStatus == 1) {
                //$scope.showDialog('Email Address verified successfully. Click "OK" to proceed to User Profile');
                alert('Email Address verified successfully. Click "OK" to proceed to User Profile');
                window.location.href = "UI/UserProfile.html";
                return;
            }
            else {
                $scope.showDialog('Email Address could not be verified.');
                return;
            }
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
                $localStorage.uname = res.data[0].FirstName;
                $scope.username = $localStorage.uname;
                $localStorage.userdetails = res.data;

                window.location.href = "UI/UserProfile.html";
                //if the user has role, then get the details and save in session
                //$localStorage.uname = res.data[0].FirstName;
                //$scope.username = $localStorage.uname;
                //$localStorage.userdetails = res.data;
                //  window.location.href = "UI/BookedTicketHistory.html";
                //$uibModal.close();
                //if ($scope.selectedOp == 1) {
                //    window.location.href = "UI/BookedTicketHistory.html";
                //}
                //else {
                //    window.location.href = "UI/UserProfile.html";
                //}
                //if ($scope.selectedOp == 1) {
                //    window.location.href = "BookedTicketHistory.html";
                //}
                //else {
                    
                //}
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

    $scope.SaveDemo = function (d) {
        if (d == null) {
            alert('Please enter Details.');
            return;
        }

        var demo = {

            Id:-1,
            countryid: 1,
            Businessname: d.Businessname,
            email: d.Email,
            LoginNo: (d.LoginNo == "" || d.LoginNo == null)? '+91' : d.LoginNo,
            mobile: d.Mobilenumber,
            Reviewed: 1,//d.BusinessName,
            notification: 1,//d.BusinessName,
            statusid: 1,           
            flag: 'I'
        };



        var req = {
            method: 'POST',
            url: '/api/DemoRequest/SaveDemoRequest',
            //headers: {
            //    'Content-Type': undefined

            data: demo
        }        
        $http(req).then(function (response) {
            $scope.demoreq = response.data;
            alert("Demo Request is Successfull.");
            $scope.d = '';

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";            
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });

    }

    $scope.showDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            backdrop: false,
            templateUrl: 'statusPopup.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {

                    return message;
                }
            }
        });
    }
});


myapp1.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
