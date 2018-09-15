var app = angular.module('myApp', ['ngStorage', 'ui.bootstrap'])

var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $filter) {
    $scope.selectedOp = 0;
    if ($localStorage.uname) {
        $scope.username = $localStorage.uname;
    }
    $scope.seatstest = [];



    $scope.triptype = "oneway";
    $scope.timing = "Now";
    $scope.currentDetails = 'Onward';
    $scope.totalseats = 0;
    $scope.count = 0;
    var selectList = [];

    $scope.ChangeTravelType = function (travelTime) {
        $scope.timing = (travelTime == 0) ? "Now" : "Later";
    }

    $scope.RadioChange = function (s) {
        $scope.triptype = s;
    };

    var stat = 0;
    $scope.selectedSeats = new Array();
    $scope.selectedSeats.pssngr = new Array();
    $scope.selectedSeats.returnpssngr = new Array();

    $scope.selectedIndex = -1;

    $scope.testClick = function () {
        $scope.Stops = $localStorage.Stops;
    }


    $scope.GetServices = function () {
        if ($scope.src == null) {
            alert('Please select source.');
            return;
        }

        if ($scope.dest == null) {
            alert('Please select destination.');
            return;
        }

        $localStorage.src = $scope.src;
        $localStorage.dest = $scope.dest;

        //$rootscope.src = $scope.RS;
        //$rootscope.dest = $scope.RD;
        $localStorage.timing = ($scope.timing == 'Now') ? Date() : $scope.timing;

        //$localStorage.triptype = $scope.triptype;
        $scope.GetAvailableServices();

        $scope.services1 = [
            { "Id": 1, "Company": "CMP1", "VehicleType": "AC", "AvailableSeats": "10", "WindowSeats": "3", "StartTime": "11:00 AM", "EndTime": "12:30 PM", "Rating": "3", "Price": "10", "luggageCrg": "", "Discount": "" }
            , { "Id": 2, "Company": "CMP2", "VehicleType": "Non-AC", "AvailableSeats": "12", "WindowSeats": "3", "StartTime": "11:10 AM", "EndTime": "12:30 PM", "Rating": "4", "Price": "12", "luggageCrg": "", "Discount": "" }
            , { "Id": 3, "Company": "CMP3", "VehicleType": "AC", "AvailableSeats": "4", "WindowSeats": "4", "StartTime": "12:00 PM", "EndTime": "12:30 PM", "Rating": "3", "Price": "10", "luggageCrg": "", "Discount": "" }
            , { "Id": 4, "Company": "CMP4", "VehicleType": "Non-AC", "AvailableSeats": "5", "WindowSeats": "2", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "13", "luggageCrg": "", "Discount": "" }
            , { "Id": 5, "Company": "CMP5", "VehicleType": "AC", "AvailableSeats": "6", "WindowSeats": "2", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "11", "luggageCrg": "", "Discount": "" }
            , { "Id": 6, "Company": "CMP6", "VehicleType": "AC", "AvailableSeats": "3", "WindowSeats": "1", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "11", "luggageCrg": "", "Discount": "" }
            , { "Id": 7, "Company": "CMP7", "VehicleType": "AC", "AvailableSeats": "23", "WindowSeats": "4", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "12", "luggageCrg": "", "Discount": "" }
            , { "Id": 8, "Company": "CMP8", "VehicleType": "AC", "AvailableSeats": "11", "WindowSeats": "2", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "11", "luggageCrg": "", "Discount": "" }
            , { "Id": 9, "Company": "CMP9", "VehicleType": "Non-AC", "AvailableSeats": "33", "WindowSeats": "6", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "10", "luggageCrg": "", "Discount": "" }
            , { "Id": 10, "Company": "CMP10", "VehicleType": "Non-AC", "AvailableSeats": "2", "WindowSeats": "0", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "11", "luggageCrg": "", "Discount": "" }
            , { "Id": 11, "Company": "CMP11", "VehicleType": "AC", "AvailableSeats": "9", "WindowSeats": "2", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "13", "luggageCrg": "", "Discount": "" }
            , { "Id": 12, "Company": "CMP12", "VehicleType": "AC", "AvailableSeats": "5", "WindowSeats": "2", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "12", "luggageCrg": "", "Discount": "" }
            , { "Id": 13, "Company": "CMP13", "VehicleType": "AC", "AvailableSeats": "8", "WindowSeats": "2", "StartTime": "12:30 PM", "EndTime": "12:30 PM", "Rating": "", "Price": "11", "luggageCrg": "", "Discount": "" }
        ];

    }

    //fill initial details
    $scope.FillInitialDetails = function (indx, vDetails) {

        if ($scope.selectedIndex != -1)
            document.getElementById('t_' + $scope.selectedIndex).style.display = "none";

        var currstyle = document.getElementById('t_' + indx).style.display;
        // var currstyle = document.getElementById('imgTd').style.display;

        if (currstyle == "none") {
            document.getElementById('t_' + indx).style.display = "table-cell";
            $scope.selectedIndex = indx;
            // $scope.selectedSeats = [];
        }
        //   $scope.basePrice = b.amount;
        $scope.onwarddetails = new Object();
        $scope.onwarddetails.VehicleId = vDetails.Id;
        $scope.onwarddetails.TicketNo = $scope.GetTicketNo();
        $scope.onwarddetails.JourneyDate = new Date();
        $scope.onwarddetails.JourneyTime = new Date();

        $scope.onwarddetails.Src = $localStorage.src.Name;
        $scope.onwarddetails.Dest = $localStorage.dest.Name;
        $scope.onwarddetails.SrcId = $localStorage.src.Id;
        $scope.onwarddetails.DestId = $localStorage.dest.Id;

        $scope.onwarddetails.EmailId = '';
        $scope.onwarddetails.MobileNo = '';
        $scope.onwarddetails.AltMobileNo = '';
        $scope.onwarddetails.Address = '';
        $scope.onwarddetails.perunitprice = '';
        $scope.onwarddetails.JourneyType = 'Onward';
        $scope.onwarddetails.bookingType = 'Online';
        $scope.onwarddetails.bookedBy = 'Onward';
        $scope.onwarddetails.userid = 'Onward';
        $scope.onwarddetails.NoOfSeats = 0;
        $scope.onwarddetails.seatslist = '';
        $scope.onwarddetails.amount = 0;//
        $scope.onwarddetails.insupddelflag = 'I';//
        $scope.onwarddetails.BookedSeats = [];
    }

    $scope.AddSeats = function (x) {

        if (x.status == "1") {
            //set the status as selected and add it to the passenger array
            x.status = "3";

            var newSeat = $scope.GetSeat();
            newSeat.SeatId = x.Id;
            newSeat.SeatNo = x.label;
            newSeat.Row = x.Row;
            newSeat.Col = x.Col;
            $scope.onwarddetails.BookedSeats.push(newSeat);

            if (selectList.indexOf(x.label) != -1)
                return;
            selectList.push(x.label);

            var item = {
                "SeatId": x.Id
               , "SeatNo": ""
             , "NoOfSeats": $scope.count
               , "Fname": ""
               , "Lname": ""
               , "Age": ""
               , "Sex": ""
               , "Identityproof": ""

            }
            $scope.selectedSeats.pssngr.push(item);
        }
        else {
            x.status = "1";
            selectList.splice(selectList.indexOf(x.label), 1);
            var item = {
                "SeatId": x.Id
               , "SeatNo": ""
             , "NoOfSeats": $scope.count
               , "FName": ""
               , "LName": ""
               , "Age": ""
               , "Sex": ""
               , "Identityproof": ""

            }
            $scope.selectedSeats.pssngr.splice($scope.selectedSeats.pssngr.indexOf(item), 1);
        }



        $scope.count = $scope.selectedSeats.pssngr.length;
        $scope.totalseats = $scope.count;
        $scope.selectedSeatsList = selectList.join(',');
        //$scope.count = 0;
        //  $scope.subtotal = $scope.count * $scope.Booking.Cost;
    }

    $scope.GetSeat = function () {
        var newseat = new Object();
        newseat.TicketNo = $scope.onwarddetails.TicketNo;
        newseat.VehicleId = $scope.onwarddetails.VehicleId;
        newseat.JourneyDate = $scope.onwarddetails.JourneyDate;
        newseat.JourneyTime = $scope.onwarddetails.JourneyTime;
        newseat.Status = 'Blocked';
        newseat.StatusId = '2';

        newseat.Id = '';
        newseat.BookingId = '';
        newseat.SeatNo = '';
        newseat.SeatId = '';
        newseat.Row = '';
        newseat.Col = '';
        newseat.FName = '';
        newseat.LName = '';
        newseat.Age = '';
        newseat.Gender = '';
        newseat.IdProof = '';
        newseat.PassengerType = '';
        newseat.PrimaryPassenger = '';
        newseat.insupddelflag = 'I';
        return newseat;
    }

    $scope.GetAvailableServices = function () {
        $scope.src = $localStorage.src;
        $scope.dest = $localStorage.dest;
        $scope.timing = $localStorage.timing;


        $scope.srcId = $localStorage.src.Id;
        $scope.destId = $localStorage.dest.Id;
        $scope.srcStage = $localStorage.src.name;
        $scope.destStage = $localStorage.dest.name;
        //$scope.triptype = $localStorage.triptype;


        $http.get('/api/TicketBooking/GetAvailableServices?srcId=' + $scope.srcId + '&destId=' + $scope.destId).then(function (response, req) {
            $scope.services = response.data;
        });
    }
    var stat = 0;

    $scope.ProceedToPayment = function (currGroup) {

        //fill the remaining details 

        $scope.onwarddetails.EmailId = currGroup.EmailId;
        $scope.onwarddetails.MobileNo = currGroup.ContactNo1;
        $scope.onwarddetails.AltMobileNo = currGroup.ContactNo2;
        $scope.onwarddetails.Address = currGroup.Address;
        $scope.onwarddetails.Seats = $scope.selectedSeatsList;
        $scope.onwarddetails.NoOfSeats = $scope.onwarddetails.BookedSeats.length;
        $scope.onwarddetails.perunitprice = $scope.perunitprice;
        $scope.onwarddetails.amount = ($scope.selectedSeats.pssngr.length * $scope.perunitprice)

        $localStorage.onwarddetails = $scope.onwarddetails;
        window.location.href = "TicketCheckout.html";
        //$http({
        //    url: '/api/TicketBooking/SaveBookingDetails',
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
        //    data: $scope.onwarddetails
        //}).success(function (data, status, headers, config) {
        //    if (data == null) {
        //        alert('Error during ticket booking. Please re-try.')
        //        return;
        //    }
        //    $scope.BookingId = data;

        //    if ($scope.BookingId == null || $scope.BookingId == -1) {
        //        alert('Error during ticket booking. Please re-try.')
        //        return;
        //    }
        //    $localStorage.BookingId = $scope.BookingId;

        //    window.location.href = "TicketCheckOut.html";
        //}).error(function (ata, status, headers, config) {
        //    alert('Error during ticket booking. Please re-try. Details:' + ata);
        //});

        //window.location.href = "TicketCheckOut.html";
    }

    $scope.savedata = function (b) {
        if (selectList.length == 0) {
            alert('Please select the seats.');
        }
        $scope.perunitprice = b.Amount;
    }

    $scope.savedata1 = function (b) {
        //    //prepare the data for saving 
        //    //if it is 2 way, then display the return option
        //    //prepare the data for return
        //    //proceed to checkout
        //   // alert();

        //    if ($localStorage.triptype == 1) {
        //        $scope.showDiv = true; 
        //       var book = { "No_Seats": "5", "cost": "1500", "JourneyType": "1", "passengersList": selectedSeats.pssngr, "Seatcost": "900" };
        //        //for(int i=0; i<selectedSeats.length; i++){}
        //        // passengersList: [{ "SeatId": "1", SeatNo: selectedSeats.SelectedSeatId, Fname: seat.pssngr.fname, Lname: seat.pssngr.lname, "Age": "30", "Sex": "0", "Identityproof": "adhar" }]

        //        //Fname2: Booking.psngr2.Fname2,  //Lname2: Booking.psngr2.Lname2, //Fname3: Booking.psngr3.Fname3, //Lname3: Booking.psngr3.Lname3, //"No_Seats": "5", "cost": "1500", "JourneyType": "1",
        //        //"passengersList": [{ "SeatId": "1","SeatNo": "A1", "Age": "30", "Sex": "0", "Identityproof": "adhar" },
        //        //                  ]
        //        //};
        //        /*
        //        {
        //  "Pnr_ID": 0,  "Pnr_No": null,  "No_Seats": 0,  "cost": 0,  "dateandtime": "0001-01-01T00:00:00",  "src": null,  "dest": null,  "vehicle_No": null,  "PassengerId": 0, "Fname": "srujan",
        //  "Lname": null,  "Age": 0,  "Sex": 0,  "Identityproof": null,  "TransactionId": 0,  "Transaction_Number": null,  "Amount": 0,  "Paymentmode": 0,  "Gateway_transId": null,
        //  "PSID": 0,  "SeatNo": null,  "passengersList": [    {  "SeatId": null,  "Fname": null, "Lname": null,   "Age": 30,   "Sex": 0,   "Identityproof": null   },
        //    {
        //      "SeatId": null,    "Fname": null,     "Lname": null,    "Age": 33,    "Sex": 0,   "Identityproof": null   }  ]
        //}*/
        //        //$localStorage.waytype = selectedSeats;
        //       var req = {
        //            method: 'POST'
        //            , url: '/api/TicketBooking/SaveBookingDetails'
        //            , data: book
        //        }
        //     //  $http(req).then(function (res) { window.location.href = "TicketCartdetails.html"; });

        //       $http({
        //           url: '/api/TicketBooking/SaveBookingDetails',
        //           method: 'POST',
        //           headers: { 'Content-Type': 'application/json' },
        //           data: book,

        //       }).success(function (data, status, headers, config) {
        //           if (data == null)
        //           {
        //               alert('Error during ticket booking. Please re-try.')
        //               return;
        //           }
        //           $scope.BookingId = data[0];
        //           $localStorage.BookingId = $scope.BookingId;
        //           alert('Saved successfully');
        //           window.location.href = "TicketCartdetails.html";
        //       }).error(function (ata, status, headers, config) {
        //           alert('Error during ticket booking. Please re-try. Details:' + ata);               
        //       });

        //    //    window.location.href = "TicketCartdetails.html";

        //    } else if ($localStorage.triptype == 2 && stat <= 1)
        //    {
        //        //var book = { "No_Seats": "5", "cost": "1500", "JourneyType": "1", "passengersList": selectedSeats.returnpssngr, "Seatcost": "900" };
        //        //$localStorage.book = book;
        //        //var req = { method: 'POST', url: '/api/TicketBooking/SaveBookingDetails', data: book }
        //        // $http(req).then(function (res) { window.location.href = "TicketPage.html"; });

        //        stat++;
        //        if (stat == 1) {

        //            $http.get('/api/TicketBooking/GetAvailableServices?srcId=' + $scope.destId + '&destId=' + $scope.srcId).then(function (response, req) {
        //                $scope.services = response.data;
        //            });                
        //        }

        //    } else { window.location.href = "TicketCartdetails.html"; 
        //    }
    }

    $scope.testAlert = function () {
        alert('tet');
    }

    var makeArray = function createArray(dimensions, value) {
        // Create new array
        var array = new Array(dimensions[0] || 0);
        var i = dimensions[0];

        // If dimensions array's length is bigger than 1
        // we start creating arrays in the array elements with recursions
        // to achieve multidimensional array
        if (dimensions.length > 1) {
            // Remove the first value from the array
            var args = Array.prototype.slice.call(dimensions, 1);
            // For each index in the created array create a new array with recursion
            while (i--) {
                array[dimensions[0] - 1 - i] = createArray(args, value);
            }
            // If there is only one element left in the dimensions array
            // assign value to each of the new array's elements if value is set as param
        } else {
            if (typeof value !== 'undefined') {
                while (i--) {
                    array[dimensions[0] - 1 - i] = value;
                }
            }
        }

        return array;
    }
    $scope.seatstest = makeArray([6, 5]);

    $scope.seats = [{ "Id": 1, "row": 0, "col": 0, "label": "A1", "status": "2" },
    { "Id": 2, "row": 0, "col": 1, "label": "A2", "status": "1" },
    { "Id": 22, "row": 0, "col": 2, "label": "A3", "status": "0" },
    { "Id": 3, "row": 0, "col": 3, "label": "A3", "status": "1" },
    { "Id": 4, "row": 0, "col": 4, "label": "A4", "status": "1" },

    { "Id": 5, "row": 1, "col": 0, "label": "B1", "status": "1" },
    { "Id": 6, "row": 1, "col": 1, "label": "B2", "status": "1" },
    { "Id": 23, "row": 1, "col": 2, "label": "A2", "status": "0" },
    { "Id": 7, "row": 1, "col": 3, "label": "B3", "status": "2" },
    { "Id": 30, "row": 1, "col": 4, "label": "B3", "status": "1" },

    { "Id": 8, "row": 2, "col": 0, "label": "C1", "status": "1" },
    { "Id": 9, "row": 2, "col": 1, "label": "C2", "status": "1" },
    { "Id": 24, "row": 2, "col": 2, "label": "A2", "status": "0" },
    { "Id": 10, "row": 2, "col": 3, "label": "C3", "status": "1" },
    { "Id": 11, "row": 2, "col": 4, "label": "C4", "status": "1" },

    { "Id": 12, "row": 4, "col": 0, "label": "D1", "status": "1" },
    { "Id": 25, "row": 4, "col": 2, "label": "A2", "status": "0" },
    { "Id": 14, "row": 4, "col": 1, "label": "D3", "status": "1" },
    { "Id": 15, "row": 4, "col": 3, "label": "D4", "status": "2" },
    { "Id": 16, "row": 4, "col": 4, "label": "D5", "status": "1" },

    { "Id": 17, "row": 5, "col": 0, "label": "D1", "status": "1" },
    { "Id": 18, "row": 5, "col": 1, "label": "D2", "status": "1" },
    { "Id": 19, "row": 5, "col": 2, "label": "D3", "status": "1" },
    { "Id": 20, "row": 5, "col": 3, "label": "D4", "status": "1" },
    { "Id": 21, "row": 5, "col": 4, "label": "D5", "status": "1" },

    { "Id": 25, "row": 3, "col": 0, "label": "E1", "status": "1" },
    { "Id": 26, "row": 3, "col": 1, "label": "E2", "status": "1" },
    { "Id": 27, "row": 3, "col": 2, "label": "", "status": "0" },
    { "Id": 28, "row": 3, "col": 3, "label": "E3", "status": "1" },
    { "Id": 29, "row": 3, "col": 4, "label": "E4", "status": "1" },
    ];

    for (i = 0; i <= $scope.seats.length - 1; i++) {
        $scope.seatstest[$scope.seats[i]["row"]][$scope.seats[i]["col"]] = { "Id": $scope.seats[i]["Id"], "label": $scope.seats[i]["label"], "status": ($scope.seats[i] == null) ? 0 : $scope.seats[i]["status"], "Row": $scope.seats[i]["row"], "Col": $scope.seats[i]["col"] };
    }

    $scope.columns = function (r) {
        var input = [];
        for (var i = start; i < end; i++) input.push($scope.arr[i]);
        return input;
        //return $filter('filter')($scope.seats, { row: r });
    };
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

    $scope.GetTicketNo = function () {

        var date = new Date();
        var components = [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ];

        var ticketno = 'T' + components.join("");
        return ticketno;
    }
    //-----------------Hidestart-------------------
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    //-----------------Hideend-------------------

});