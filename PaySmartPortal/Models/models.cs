using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaySmartPortal.Models
{

    public class Verificationotp {

        public string Mobileotp { get;set;}
        public string Mobilenumber { get;set;}
        public int Id { get;set;}
    }
    public class VehicleBooking
    {
        public string flag { get; set; }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public int BNo { get; set; }
        public string BookingType { get; set; }

        public string ReqVehicle { get; set; }
        public string Customername { get; set; }
        public string CusID { get; set; }
        public string PhoneNo { get; set; }
        public string AltPhoneNo { get; set; }
        public string CAddress { get; set; }
        public string PickupAddress { get; set; }
        public string LandMark { get; set; }
        public string Package { get; set; }
        public string PickupPalce { get; set; }
        public string DropPalce { get; set; }
        public string ReqType { get; set; }
        public int ExtraCharge { get; set; }
        public int NoofVehicles { get; set; }
        public string ExecutiveName { get; set; }
        public int VID { get; set; }
        public string BookingStatus { get; set; }
        public string CustomerSMS { get; set; }
        public string CancelReason { get; set; }
        public decimal CBNo { get; set; }
        public string ModifiedBy { get; set; }
        public string CancelBy { get; set; }
        public string ReconfirmedBy { get; set; }
        public string AssignedBy { get; set; }

        public float lat { get; set; }
        public float lng { get; set; }
        public string Mobileotp { get; set; }

        public int VehicleGroupId { get; set; }
        public int VehicleTypeId { get; set; }
        public float Rating { get; set; }
        public string RatedBy { get; set; }
        public string Comments { get; set; }
        public string PMobNo { get; set; }
        public float latitude { get; set; }
        public float longitude { get; set; }
        public int SrcId { get; set; }
        public int DestId { get; set; }
        public string Src { get; set; }
        public string Dest { get; set; }
        public int PackageId { get; set; }
        public DateTime? Time { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? ETA { get; set; }
        public string BookingId { get; set; }
        public DateTime? BookedDate { get; set; }
        public DateTime? BookedTime { get; set; }
        public DateTime? DepartueDate { get; set; }
        public DateTime? DepartureTime { get; set; }
        public float SrcLatitude { get; set; }
        public float SrcLongitude { get; set; }
        public float DestLatitude { get; set; }
        public float DestLongitude { get; set; }
        public int VechId { get; set; }
        public decimal Pricing { get; set; }
        public int DriverId { get; set; }
        public string DriverPhoneNo { get; set; }
        public string CustomerPhoneNo { get; set; }
        public int CustomerId { get; set; }
        public int NoofSeats { get; set; }
        public DateTime? ClosingDate { get; set; }
        public DateTime? ClosingTime { get; set; }
        public DateTime? CancelledOn { get; set; }
        public int cancellationType { get; set; }
        public string CancelledBy { get; set; }
        public string BookingChannel { get; set; }
        public string Reasons { get; set; }
        public String BVerificationCode { get; set; }
        public string OTPVerification { get; set; }
        public decimal Amount { get; set; }
        public string PaymentStatus { get; set; }
        public string BookingOTP { get; set; }
        public int UpdatedBy { get; set; }
        public int UpdatedUserId { get; set; }
        public float DriverRating { get; set; }
        public int DriverRated { get; set; }
        public string DriverComments { get; set; }
        public decimal distance { get; set; }
        public int PaymentTypeId { get; set; }
    }
    public class ConfigData
    {
        public int includeStatus { get; set; }
        public int includeCategories { get; set; }
        public int includeLicenseCategories { get; set; }
        public int includeVehicleGroup { get; set; }
        public int includeGender { get; set; }
        public int includeFrequency { get; set; }
        public int includePricingType { get; set; }
        public int includeTransactionType { get; set; }
        public int includeApplicability { get; set; }
        public int includeFeeCategory { get; set; }
        public int includeTransChargeType { get; set; }
        public int includeVehicleType { get; set; }
        public int includeVehicleModel { get; set; }
        public int includeVehicleMake { get; set; }
        public int includeDocumentType { get; set; }
        public int includePaymentType { get; set; }
        public int includeMiscellaneousTypes { get; set; }
        public int includeCardCategories { get; set; }
        public int includeCardTypes { get; set; }
        public int includeVehicleLayoutType { get; set; }
        public int includeLicenseFeatures { get; set; }
        public int includeCardModels { get; set; }
        public int includeCards { get; set; }
        public int includeTransactions { get; set; }
        public int includeCountry { get; set; }
        public int includeActiveCountry { get; set; }
        public int includeFleetOwner { get; set; }
        public int includeUserType { get; set; }
        public int includeAuthType { get; set; }
        public int includeState { get; set; }

        public int includePackageNames { get; set; }

        public int includePackageTypeName { get; set; }
    }

    public class POBooking
    {
        public string flag { get; set; }
        public int Id { get; set; }
        public string Src { get; set; }
        public string Dest { get; set; }
        public decimal SrcLat { get; set; }
        public decimal SrcLong { get; set; }
        public decimal DestLat { get; set; }
        public decimal DestLong { get; set; }
        public string BookingType { get; set; }
        public decimal Pricing { get; set; }
        public int PackageId { get; set; }
        public string MobileNumber { get; set; }
        public string Mobileotp { get; set; }

        public decimal Distance { get; set; }
        public int VehicleGroupId { get; set; }
        public int vehicleTypeId { get; set; }
        public int PaymentTypeId { get; set; }


    }
    public class BookingDetails
    {
        public int Id { get; set; }
        public string TicketNo { get; set; }
        public string TransId { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string AltMobileNo { get; set; }
        public string Address { get; set; }
        public DateTime? JourneyDate { get; set; }
        public DateTime? JourneyTime { get; set; }
        public decimal perunitprice { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? DepartureTime { get; set; }
        public string Src { get; set; }
        public string Dest { get; set; }
        public int SrcId { get; set; }
        public int DestId { get; set; }
        public int RouteId { get; set; }
        public int VehicleId { get; set; }
        public int NoOfSeats { get; set; }
        public string Seats { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public string BookedBy { get; set; }
        public int BookedById { get; set; }
        public decimal Amount { get; set; }
        public string BookingType { get; set; }
        public int BookingTypeId { get; set; }
        public string JourneyType { get; set; }
        public int JourneyTypeId { get; set; }
        public int UserId { get; set; }
        public string insupddelflag { get; set; }

        public IEnumerable<BookedSeats> BookedSeats { get; set; }

    }
    public class BookedSeats
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string TicketNo { get; set; }
        public string SeatNo { get; set; }
        public int SeatId { get; set; }
        public int VehicleId { get; set; }
        public int Row { get; set; }

        public int Col { get; set; }

        public DateTime JourneyDate { get; set; }
        public DateTime JourneyTime { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public int Age { get; set; }
        public int Gender { get; set; }
        public string IdProof { get; set; }
        public string PassengerType { get; set; }
        public int PrimaryPassenger { get; set; }

        public string insupddelflag { get; set; }
    }
    public class BookedTicketDetails
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string TicketNo { get; set; }
        public string TransId { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string TicketContent { get; set; }
        public string insupddelflag { get; set; }
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String MiddleName { get; set; }
        public String UserName { get; set; }
        public String Password { get; set; }
        public String EmailAddress { get; set; }
        public String Mobile { get; set; }
        public String Country { get; set; }
        public int CountryId { get; set; }
        public String AltMobileNo { get; set; }
        public int Gender { get; set; }
        public int UserTypeId { get; set; }
        public int UserId { get; set; }
        public int Active { get; set; }
        public string InsUpdDelFlag { get; set; }
        public String EVerificationCode { get; set; }
        public DateTime EVerifiedOn { get; set; }
        public int IsEmailVerified { get; set; }
        public String MVerificationCode { get; set; }
        public DateTime MVerifiedOn { get; set; }
        public int IsMobileVerified { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ENoOfAttempts { get; set; }
        public int MNoOfAttempts { get; set; }


    }
    public class UserLogin
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string LoginInfo { get; set; }
        public string Passkey { get; set; }
        public string Salt { get; set; }
        public string Active { get; set; }
        public int NoofAttempts { get; set; }


    }

    public class DemoRequest
    {
        public string flag { get; set; }
        public int Id { get; set; }
        public string Businessname { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
        public int countryid { get; set; }
        public string LoginNo { get; set; }
        public string Reviewed { get; set; }
        public string notification { get; set; }
        public int statusid { get; set; }        
    }
}