using PaySmartPortal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Http;

namespace PaySmartPortal.Controllers
{
    public class TicketBookingController : ApiController
    {
        [HttpGet]
        [Route("api/TicketBooking/GetAvailableServices")]
        public DataTable GetAvailableServices(int srcId, int destId)
        {
            DataTable Tbl = new DataTable();


            //connect to database
            SqlConnection conn = new SqlConnection();

            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "GetAvailableServices";
            cmd.Parameters.Add("@srcId", SqlDbType.Int).Value = srcId;
            cmd.Parameters.Add("@destId", SqlDbType.Int).Value = destId;
            cmd.Connection = conn;

            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(ds);
            Tbl = ds.Tables[0];
            int a = Tbl.Rows.Count;

            return Tbl;
        }

        [HttpPost]
        [Route("api/TicketBooking/SaveBookingDetails")]
        public int SaveBookingDetails(BookingDetails B)
        {
            //DataTable Tbl = new DataTable();
            //LogTraceWriter traceWriter = new LogTraceWriter();
            //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveBookingDetails....");

            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();
            SqlTransaction transaction = null;
            StringBuilder passangersList = new StringBuilder();
            try
            {

                #region save booking information

                SqlCommand PnrDeatilscmd = new SqlCommand();
                PnrDeatilscmd.CommandType = CommandType.StoredProcedure;
                PnrDeatilscmd.CommandText = "InsUpdDelBookingDetails";
                PnrDeatilscmd.Connection = conn;
                conn.Open();

                transaction = conn.BeginTransaction();
                PnrDeatilscmd.Transaction = transaction;

                SqlParameter Id = new SqlParameter("@Id", SqlDbType.Int);
                Id.Value = B.Id;
                PnrDeatilscmd.Parameters.Add(Id);

                SqlParameter TicketNo = new SqlParameter("@TicketNo", SqlDbType.VarChar, 20);
                TicketNo.Value = B.TicketNo;
                PnrDeatilscmd.Parameters.Add(TicketNo);

                SqlParameter TransId = new SqlParameter("@TransId", SqlDbType.Int);
                TransId.Value = B.TransId;
                PnrDeatilscmd.Parameters.Add(TransId);

                SqlParameter EmailId = new SqlParameter("@EmailId", SqlDbType.VarChar, 50);
                EmailId.Value = B.EmailId;
                PnrDeatilscmd.Parameters.Add(EmailId);

                SqlParameter MobileNo = new SqlParameter("@MobileNo", SqlDbType.VarChar, 15);
                MobileNo.Value = B.MobileNo;
                PnrDeatilscmd.Parameters.Add(MobileNo);

                SqlParameter AltMobileNo = new SqlParameter("@AltMobileNo", SqlDbType.VarChar, 15);
                AltMobileNo.Value = B.AltMobileNo;
                PnrDeatilscmd.Parameters.Add(AltMobileNo);

                SqlParameter TravelDate = new SqlParameter("@TravelDate", SqlDbType.Date);
                TravelDate.Value = B.JourneyDate;
                PnrDeatilscmd.Parameters.Add(TravelDate);

                SqlParameter TravelTime = new SqlParameter("@TravelTime", SqlDbType.Time);
                TravelTime.Value = B.JourneyTime.Value.TimeOfDay;
                PnrDeatilscmd.Parameters.Add(TravelTime);

                SqlParameter Src = new SqlParameter("@Src", SqlDbType.VarChar, 50);
                Src.Value = B.Src;
                PnrDeatilscmd.Parameters.Add(Src);

                SqlParameter Dest = new SqlParameter("@Dest", SqlDbType.VarChar, 50);
                Dest.Value = B.Dest;
                PnrDeatilscmd.Parameters.Add(Dest);

                SqlParameter SrcId = new SqlParameter("@SrcId", SqlDbType.Int);
                SrcId.Value = B.SrcId;
                PnrDeatilscmd.Parameters.Add(SrcId);

                SqlParameter DestId = new SqlParameter("@DestId", SqlDbType.Int);
                DestId.Value = B.DestId;
                PnrDeatilscmd.Parameters.Add(DestId);

                SqlParameter RouteId = new SqlParameter("@RouteId", SqlDbType.Int);
                RouteId.Value = B.RouteId;
                PnrDeatilscmd.Parameters.Add(RouteId);

                SqlParameter VehicleId = new SqlParameter("@VehicleId", SqlDbType.Int);
                VehicleId.Value = B.VehicleId;
                PnrDeatilscmd.Parameters.Add(VehicleId);

                SqlParameter NoOfSeats = new SqlParameter("@NoOfSeats", SqlDbType.Int);
                NoOfSeats.Value = B.NoOfSeats;
                PnrDeatilscmd.Parameters.Add(NoOfSeats);

                SqlParameter Seats = new SqlParameter("@Seats", SqlDbType.VarChar, 250);
                Seats.Value = B.Seats;
                PnrDeatilscmd.Parameters.Add(Seats);

                SqlParameter Status = new SqlParameter("@Status", SqlDbType.VarChar, 50);
                Status.Value = B.Status;
                PnrDeatilscmd.Parameters.Add(Status);

                SqlParameter StatusId = new SqlParameter("@StatusId", SqlDbType.Int);
                StatusId.Value = B.StatusId;
                PnrDeatilscmd.Parameters.Add(StatusId);

                SqlParameter BookedBy = new SqlParameter("@BookedBy", SqlDbType.VarChar, 150);
                BookedBy.Value = B.BookedBy;
                PnrDeatilscmd.Parameters.Add(BookedBy);

                SqlParameter BookedById = new SqlParameter("@BookedById", SqlDbType.Int);
                BookedById.Value = B.BookedById;
                PnrDeatilscmd.Parameters.Add(BookedById);

                SqlParameter Amount = new SqlParameter("@Amount", SqlDbType.Decimal);
                Amount.Value = B.Amount;
                PnrDeatilscmd.Parameters.Add(Amount);

                SqlParameter BookingType = new SqlParameter("@BookingType", SqlDbType.VarChar, 10);
                BookingType.Value = B.BookingType;
                PnrDeatilscmd.Parameters.Add(BookingType);

                SqlParameter BookingTypeId = new SqlParameter("@BookingTypeId", SqlDbType.Int);
                BookingTypeId.Value = B.BookingTypeId;
                PnrDeatilscmd.Parameters.Add(BookingTypeId);

                SqlParameter JourneyType = new SqlParameter("@JourneyType", SqlDbType.VarChar, 10);
                JourneyType.Value = B.JourneyType;
                PnrDeatilscmd.Parameters.Add(JourneyType);

                SqlParameter JourneyTypeId = new SqlParameter("@JourneyTypeId", SqlDbType.Int);
                JourneyTypeId.Value = B.JourneyTypeId;
                PnrDeatilscmd.Parameters.Add(JourneyTypeId);

                SqlParameter UserId = new SqlParameter("@UserId", SqlDbType.Int);
                UserId.Value = B.UserId;
                PnrDeatilscmd.Parameters.Add(UserId);

                SqlParameter Address = new SqlParameter("@Address", SqlDbType.VarChar, 500);
                Address.Value = B.Address;
                PnrDeatilscmd.Parameters.Add(Address);

                SqlParameter insupddelflag = new SqlParameter("@insupddelflag", SqlDbType.VarChar);
                insupddelflag.Value = B.insupddelflag;
                PnrDeatilscmd.Parameters.Add(insupddelflag);

                object bookingId = PnrDeatilscmd.ExecuteScalar();

                #endregion save booking information

                #region Save seats information
                if (B.BookedSeats != null)
                {

                    PnrDeatilscmd.Parameters.Clear();

                    PnrDeatilscmd.CommandText = "InsUpdDelBookedSeats";

                    foreach (BookedSeats b in B.BookedSeats)
                    {
                        //@Id int = -1,@BookingId int,@TicketNo varchar(20),@SeatNo varchar(5),@SeatId int,@VehicleId int,@Row int,@Col int,@JourneyDate date,@JourneyTime time(7)
                        //,@Status varchar(10),@StatusId int,@FName varchar(50),@LName varchar(50),@Age int,@Gender int,@PassengerType varchar(15),@IdProof varchar(50)
                        //,@PrimaryPassenger int,@insupddelflag varchar                       

                        SqlParameter bId = new SqlParameter("@Id", SqlDbType.Int);
                        bId.Value = b.Id;
                        PnrDeatilscmd.Parameters.Add(bId);

                        SqlParameter BookingId = new SqlParameter("@BookingId", SqlDbType.Int);
                        BookingId.Value = bookingId;
                        PnrDeatilscmd.Parameters.Add(BookingId);

                        SqlParameter bTicketNo = new SqlParameter("@TicketNo", SqlDbType.VarChar, 50);
                        bTicketNo.Value = B.TicketNo;
                        PnrDeatilscmd.Parameters.Add(bTicketNo);

                        SqlParameter SeatNo = new SqlParameter("@SeatNo", SqlDbType.VarChar, 50);
                        SeatNo.Value = b.SeatNo;
                        PnrDeatilscmd.Parameters.Add(SeatNo);

                        SqlParameter SeatId = new SqlParameter("@SeatId", SqlDbType.Int);
                        SeatId.Value = b.SeatId;
                        PnrDeatilscmd.Parameters.Add(SeatId);

                        SqlParameter bVehicleId = new SqlParameter("@VehicleId", SqlDbType.Int);
                        bVehicleId.Value = b.VehicleId;
                        PnrDeatilscmd.Parameters.Add(bVehicleId);

                        SqlParameter Row = new SqlParameter("@Row", SqlDbType.Int);
                        Row.Value = b.Row;
                        PnrDeatilscmd.Parameters.Add(Row);

                        SqlParameter Col = new SqlParameter("@Col", SqlDbType.Int);
                        Col.Value = b.Col;
                        PnrDeatilscmd.Parameters.Add(Col);

                        SqlParameter JourneyDate = new SqlParameter("@JourneyDate", SqlDbType.Date);
                        JourneyDate.Value = B.JourneyDate;
                        PnrDeatilscmd.Parameters.Add(JourneyDate);

                        SqlParameter JourneyTime = new SqlParameter("@JourneyTime", SqlDbType.Time);
                        JourneyTime.Value = B.JourneyTime.Value.TimeOfDay;
                        PnrDeatilscmd.Parameters.Add(JourneyTime);

                        SqlParameter bStatus = new SqlParameter("@Status", SqlDbType.VarChar, 50);
                        bStatus.Value = b.Status;
                        PnrDeatilscmd.Parameters.Add(bStatus);

                        SqlParameter bStatusId = new SqlParameter("@StatusId", SqlDbType.Int);
                        bStatusId.Value = b.StatusId;
                        PnrDeatilscmd.Parameters.Add(bStatusId);

                        SqlParameter FName = new SqlParameter("@FName", SqlDbType.VarChar, 50);
                        FName.Value = b.FName;
                        PnrDeatilscmd.Parameters.Add(FName);

                        SqlParameter LName = new SqlParameter("@LName", SqlDbType.VarChar, 50);
                        LName.Value = b.LName;
                        PnrDeatilscmd.Parameters.Add(LName);

                        SqlParameter Age = new SqlParameter("@Age", SqlDbType.Int);
                        Age.Value = b.Age;
                        PnrDeatilscmd.Parameters.Add(Age);

                        SqlParameter Gender = new SqlParameter("@Gender", SqlDbType.Int);
                        Gender.Value = b.Gender;
                        PnrDeatilscmd.Parameters.Add(Gender);

                        SqlParameter PassengerType = new SqlParameter("@PassengerType", SqlDbType.VarChar, 50);
                        PassengerType.Value = b.PassengerType;
                        PnrDeatilscmd.Parameters.Add(PassengerType);

                        SqlParameter IdProof = new SqlParameter("@IdProof", SqlDbType.VarChar, 250);
                        IdProof.Value = b.IdProof;
                        PnrDeatilscmd.Parameters.Add(IdProof);

                        SqlParameter PrimaryPassenger = new SqlParameter("@PrimaryPassenger", SqlDbType.Int);
                        PrimaryPassenger.Value = b.PrimaryPassenger;
                        PnrDeatilscmd.Parameters.Add(PrimaryPassenger);

                        SqlParameter binsupddelflag = new SqlParameter("@insupddelflag", SqlDbType.VarChar);
                        binsupddelflag.Value = b.insupddelflag;
                        PnrDeatilscmd.Parameters.Add(binsupddelflag);

                        PnrDeatilscmd.ExecuteScalar();

                        string pTd = string.Format("<tr width='100%' style='text-align:left;background:#f7f9ff;padding-left:8px'><td align='center'>{0}</td><td align='center'>{1}</td><td align='center'>{2}</td><td align='center'>{3}</td><td align='center'>{4}</td></tr>", b.FName + " " + b.LName, b.Age, b.PassengerType, b.Gender, b.SeatNo);

                        passangersList.Append(pTd);

                        PnrDeatilscmd.Parameters.Clear();
                    }
                }
                #endregion

                transaction.Commit();
                //return Tbl;
                int bid = Convert.ToInt32(bookingId);

                #region save ticket information

                string root = HttpContext.Current.Server.MapPath("~/ui/emailtemplates/1.txt");

                string mailContent = System.IO.File.ReadAllText(root);

                int status = 0;
                try
                {
                    MailMessage mail = new MailMessage();
                    string emailserver = System.Configuration.ConfigurationManager.AppSettings["emailserver"].ToString();

                    string username = System.Configuration.ConfigurationManager.AppSettings["username"].ToString();
                    string pwd = System.Configuration.ConfigurationManager.AppSettings["password"].ToString();
                    string fromaddress = System.Configuration.ConfigurationManager.AppSettings["fromaddress"].ToString();
                    string port = System.Configuration.ConfigurationManager.AppSettings["port"].ToString();

                    SmtpClient SmtpServer = new SmtpClient(emailserver);

                    mail.From = new MailAddress(fromaddress);
                    mail.To.Add(B.EmailId);
                    mail.Subject = "Booked ticket details";
                    mail.IsBodyHtml = true;

                    //{0} - Ticket No
                    //{1} - transId
                    //{2} - from
                    //{3} - to
                    //{4} - departure Data and time
                    //{5} - arrival Date and time
                    //{6} - No of seats
                    //{7} - Seats list
                    //{8} - Vehicle reg number
                    //{9} - Provider name
                    //{10} - distance
                    //{11} - Total amount
                    //{12} - MobileNo 
                    //{13} - Email Address
                    //{14} - Address
                    //{15} - Base fare
                    //{16} - Sub total
                    //{17} - passenger Details

                    mailContent = String.Format(mailContent, B.TicketNo, B.TransId, B.Src, B.Dest, B.JourneyDate, B.JourneyDate, B.NoOfSeats, B.Seats, "Test 000" + B.VehicleId
                      , "Zupco", "2 KMS", B.Amount, B.MobileNo, B.EmailId, B.Address, B.perunitprice, B.Amount, passangersList.ToString()); ;
                    mail.Body = mailContent;

                    //SmtpServer.Port = 465;
                    //SmtpServer.Port = 587;
                    SmtpServer.Port = Convert.ToInt32(port);
                    SmtpServer.UseDefaultCredentials = false;

                    SmtpServer.Credentials = new System.Net.NetworkCredential(username, pwd);
                    SmtpServer.EnableSsl = true;
                    //SmtpServer.TargetName = "STARTTLS/smtp.gmail.com";
                    SmtpServer.Send(mail);
                    status = 1;

                   // traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "sent ticket email....");

                }
                catch (Exception ex)
                {
                    //throw ex;
                    status = 0;
                    //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "sent ticket email failed:" + ex.Message);
                }

                #region Save Ticket
                //[InsUpdBookedTicket] @Id int = -1 ,@BookingId int,@TicketContent varchar(max),@TicketNo varchar(15),@TransId varchar(25),@EmailId varchar(50),@MobileNo varchar(15),@insUpdDelFlag varchar
                try
                {

                    PnrDeatilscmd.CommandText = "InsUpdBookedTicket";

                    SqlParameter BookingId = new SqlParameter("@BookingId", SqlDbType.Int);
                    BookingId.Value = bid;
                    PnrDeatilscmd.Parameters.Add(BookingId);

                    SqlParameter TicketNo1 = new SqlParameter("@TicketNo", SqlDbType.VarChar, 20);
                    TicketNo1.Value = B.TicketNo;
                    PnrDeatilscmd.Parameters.Add(TicketNo1);

                    SqlParameter TransId1 = new SqlParameter("@TransId", SqlDbType.VarChar, 25);
                    TransId1.Value = B.TicketNo;// B.TransId;
                    PnrDeatilscmd.Parameters.Add(TransId1);

                    SqlParameter EmailId1 = new SqlParameter("@EmailId", SqlDbType.VarChar, 50);
                    EmailId1.Value = B.EmailId;
                    PnrDeatilscmd.Parameters.Add(EmailId1);

                    SqlParameter MobileNo1 = new SqlParameter("@MobileNo", SqlDbType.VarChar, 15);
                    MobileNo1.Value = B.MobileNo;
                    PnrDeatilscmd.Parameters.Add(MobileNo1);

                    SqlParameter TicketContent = new SqlParameter("@TicketContent", SqlDbType.VarChar);
                    TicketContent.Value = mailContent;
                    PnrDeatilscmd.Parameters.Add(TicketContent);


                    SqlParameter binsupddelflag = new SqlParameter("@insupddelflag", SqlDbType.VarChar);
                    binsupddelflag.Value = 'I';
                    PnrDeatilscmd.Parameters.Add(binsupddelflag);

                    PnrDeatilscmd.ExecuteScalar();

                    //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "ticket booking completed....");
                }
                catch (Exception ex)
                {

                   // traceWriter.Trace(Request, "0", System.Diagnostics.TraceLevel.Info, "{0}", "ticket booking error....:" + ex.Message);
                }

                #endregion Save ticket

                #endregion ticket information

                #region Make payment and get the payment ID
                int btposTransId = -1;



                try
                {
                    //INSERT INTO [POSDashboard].[dbo].[BookingPaymentDetails]
                    //       ([TicketNo]
                    //       ,[Amount]
                    //       ,[PaymentMode]
                    //       ,[transDate]
                    //       ,[BookingId]
                    //       ,[GateWayTransId]
                    //       ,[TransStatus]
                    //       ,[TransStatusId]
                    //       ,[TransType]
                    //       ,[TransTypeId])
                    // VALUES
                    //       (<TicketNo, varchar(30),>
                    //       ,<Amount, decimal(18,0),>
                    //       ,<PaymentMode, varchar(50),>
                    //       ,<transDate, datetime,>
                    //       ,<BookingId, int,>
                    //       ,<GateWayTransId, varchar(50),>
                    //       ,<TransStatus, varchar(20),>
                    //       ,<TransStatusId, int,>
                    //       ,<TransType, varchar(50),>
                    //       ,<TransTypeId, int,>)

                    #region insert initial record for trans

                    //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                    // conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                    SqlCommand cmd1 = new SqlCommand();
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.CommandText = "InsUpdOnlineTicketTransactions";
                    cmd1.Connection = conn;

                    SqlParameter cid = new SqlParameter("@TicketNo", SqlDbType.VarChar, 30);
                    cid.Value = B.TicketNo;
                    cmd1.Parameters.Add(cid);

                    SqlParameter amt = new SqlParameter("@Amount", SqlDbType.Decimal);
                    amt.Value = B.Amount;
                    cmd1.Parameters.Add(amt);

                    SqlParameter pmode = new SqlParameter("@PaymentMode", SqlDbType.VarChar, 30);
                    pmode.Value = "Credit Card";
                    cmd1.Parameters.Add(pmode);

                    SqlParameter trandate = new SqlParameter("@transDate", SqlDbType.DateTime);
                    trandate.Value = DateTime.Now;
                    cmd1.Parameters.Add(trandate);

                    SqlParameter bkid = new SqlParameter("@BookingId", SqlDbType.Int);
                    bkid.Value = bookingId;
                    cmd1.Parameters.Add(bkid);

                    SqlParameter gtranId = new SqlParameter("@GateWayTransId", SqlDbType.VarChar, 50);
                    gtranId.Value = DBNull.Value;
                    cmd1.Parameters.Add(gtranId);

                    SqlParameter transStatus = new SqlParameter("@TransStatus", SqlDbType.VarChar, 20);
                    transStatus.Value = "In Progress";
                    cmd1.Parameters.Add(transStatus);

                    SqlParameter TransStatusId = new SqlParameter("@TransStatusId", SqlDbType.Int);
                    TransStatusId.Value = 1;
                    cmd1.Parameters.Add(TransStatusId);

                    SqlParameter TransType = new SqlParameter("@TransType", SqlDbType.VarChar, 50);
                    TransType.Value = "online";
                    cmd1.Parameters.Add(TransType);

                    SqlParameter TransTypeId = new SqlParameter("@TransTypeId", SqlDbType.Int);
                    TransTypeId.Value = 1;
                    cmd1.Parameters.Add(TransTypeId);

                    SqlParameter flag = new SqlParameter("@insupddelflag", SqlDbType.VarChar);
                    flag.Value = "I";
                    cmd1.Parameters.Add(flag);

                    //insert into db
                    if (conn != null && conn.State != ConnectionState.Open)
                    {
                        conn.Open();
                    }

                    object val = cmd1.ExecuteScalar();

                    conn.Close();

                    #endregion insert initial record for trans

                    string gatewayTransId = "";

                    #region paypal
                    //GetPaymentAck(decimal amt, string cardno, string cvv, string expirydate)
                    //gatewayTransId = PaymentsController.GetPaymentAck(B.Amount, "", "", "");

                    #endregion paypal

                    #region update transagain

                    cmd1.Parameters["@insupddelflag"].Value = "U";
                    cmd1.Parameters["@GateWayTransId"].Value = gatewayTransId;
                    cmd1.Parameters.Add("@Id", SqlDbType.Int).Value = val;


                    if (conn != null && conn.State != ConnectionState.Open)
                    {
                        conn.Open();
                    }

                    cmd1.ExecuteNonQuery();

                    conn.Close();
                    #endregion update transagain


                }
                catch (SqlException sqlEx)
                {
                    if (conn != null && conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }

                }

                #endregion Make payment and get the payment ID

                #region update the status of the booking
                #endregion update the status of the booking

                return bid;
            }
            catch (SqlException sqlEx)
            {
                transaction.Rollback();

                return -1;

            }
            catch (Exception ex)
            {
                //transaction.Rollback();
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                return -1;

            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }
    }
}
