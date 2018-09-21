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
using System.Web.Http;

namespace PaySmartPortal.Controllers
{
    public class BookingController : ApiController
    {
        [HttpPost]
        [Route("api/VehicleBooking/AvailableVehicles")]
        public DataTable AvailableVehicles(VehicleBooking vb)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            SqlConnection conn = new SqlConnection();
            StringBuilder str = new StringBuilder();
            DataTable dt = new DataTable();
            try
            {

                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "AvailableVehicles....");

                str.Append("MobileNo:" + vb.CustomerPhoneNo + ",");
                str.Append("lat:" + vb.SrcLatitude + ",");
                str.Append("lng:" + vb.SrcLongitude + ",");
                str.Append("vehicleGroupId:" + vb.VehicleGroupId + ",");

                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "Input sent...." + str.ToString());

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "HVgetnearestvehicles";
                cmd.Parameters.Add("@Mobilenumber", SqlDbType.VarChar, 50).Value = vb.CustomerPhoneNo;
                cmd.Parameters.Add("@lat", SqlDbType.Float).Value = vb.SrcLatitude;
                cmd.Parameters.Add("@lng", SqlDbType.Float).Value = vb.SrcLongitude;
                cmd.Parameters.Add("@vehicleGroupId", SqlDbType.Int).Value = vb.VehicleGroupId;

                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                dt = ds.Tables[0];
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "AvailableVehicles successful....");

            }
            catch (Exception ex)
            {
                traceWriter.Trace(Request, "0", TraceLevel.Error, "{0}", "AvailableVehicles...." + ex.Message.ToString());
                //throw ex;
                //throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message));
                dt.Columns.Add("Code");
                dt.Columns.Add("description");
                DataRow dr = dt.NewRow();
                dr[0] = "ERR001";
                dr[1] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
                conn.Close();
                conn.Dispose();
                SqlConnection.ClearPool(conn);
            }
            return dt;
        }


        [HttpPost]
        [Route("api/VehicleBooking/SaveBookingDetails")]
        public DataTable SaveBookingDetails(VehicleBooking b)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            SqlConnection conn = new SqlConnection();
            StringBuilder str = new StringBuilder();
            DataTable dt = new DataTable();
            try
            {
                //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveBookingDetails....");

                //str.Append("BNo:" + b.BNo + ",");
                //str.Append("Src:" + b.Src + ",");
                //str.Append("Dest:" + b.Dest + ",");
                //str.Append("VechId:" + b.VechId + ",");

                //str.Append("DriverPhoneNo:" + b.DriverPhoneNo + ",");
                //str.Append("CustomerPhoneNo:" + b.CustomerPhoneNo + ",");

                //traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "Input sent...." + str.ToString());

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "PSInsUpdVehicleBookingDetails";

                cmd.Connection = conn;

                SqlParameter i = new SqlParameter("@flag", SqlDbType.VarChar);
                i.Value = b.flag;
                cmd.Parameters.Add(i);

                SqlParameter ie = new SqlParameter("@Id", SqlDbType.Int);
                ie.Value = b.Id;
                cmd.Parameters.Add(ie);

                SqlParameter co = new SqlParameter("@CompanyId", SqlDbType.Int);
                co.Value = b.CompanyId;
                cmd.Parameters.Add(co);

                SqlParameter cm = new SqlParameter("@BNo", SqlDbType.VarChar, 20);
                cm.Value = b.BNo;
                cmd.Parameters.Add(cm);

                SqlParameter bd = new SqlParameter("@BookedDate", SqlDbType.Date);
                bd.Value = b.BookedDate;
                cmd.Parameters.Add(bd);

                SqlParameter bt = new SqlParameter("@BookedTime", System.Data.SqlDbType.DateTime);
                bt.Value = b.BookedTime;
                cmd.Parameters.Add(bt);

                SqlParameter dd = new SqlParameter("@DepartureDate", SqlDbType.Date);
                dd.Value = b.DepartueDate;
                cmd.Parameters.Add(dd);

                SqlParameter dt1 = new SqlParameter("@DepartureTime", System.Data.SqlDbType.DateTime);
                dt1.Value = b.DepartureTime;
                cmd.Parameters.Add(dt1);

                SqlParameter q1 = new SqlParameter("@BookingType", SqlDbType.VarChar, 50);
                q1.Value = b.BookingType;
                cmd.Parameters.Add(q1);

                SqlParameter src = new SqlParameter("@Src", SqlDbType.VarChar, 50);
                src.Value = b.Src;
                cmd.Parameters.Add(src);

                SqlParameter dest = new SqlParameter("@Dest", SqlDbType.VarChar, 50);
                dest.Value = b.Dest;
                cmd.Parameters.Add(dest);

                SqlParameter sr = new SqlParameter("@SrcId", SqlDbType.Int);
                sr.Value = b.SrcId;
                cmd.Parameters.Add(sr);

                SqlParameter des = new SqlParameter("@DestId", SqlDbType.Int);
                des.Value = b.DestId;
                cmd.Parameters.Add(des);

                SqlParameter sl = new SqlParameter("@SrcLatitude", SqlDbType.Float);
                sl.Value = b.SrcLatitude;
                cmd.Parameters.Add(sl);

                SqlParameter so = new SqlParameter("@SrcLongitude", SqlDbType.Float);
                so.Value = b.SrcLongitude;
                cmd.Parameters.Add(so);

                SqlParameter dl = new SqlParameter("@DestLatitude", SqlDbType.Float);
                dl.Value = b.DestLatitude;
                cmd.Parameters.Add(dl);

                SqlParameter d = new SqlParameter("@DestLongitude", SqlDbType.Float);
                d.Value = b.DestLongitude;
                cmd.Parameters.Add(d);

                SqlParameter vi = new SqlParameter("@VechId", SqlDbType.Int);
                vi.Value = b.VechId;
                cmd.Parameters.Add(vi);

                SqlParameter p = new SqlParameter("@PackageId", SqlDbType.Int);
                p.Value = b.PackageId;
                cmd.Parameters.Add(p);

                SqlParameter pa = new SqlParameter("@Pricing", SqlDbType.Decimal);
                pa.Value = b.Pricing;
                cmd.Parameters.Add(pa);

                SqlParameter di = new SqlParameter("@DriverId", SqlDbType.Int);
                di.Value = b.DriverId;
                cmd.Parameters.Add(di);

                SqlParameter dp = new SqlParameter("@DriverPhoneNo", SqlDbType.VarChar, 20);
                dp.Value = b.DriverPhoneNo;
                cmd.Parameters.Add(dp);

                SqlParameter cp = new SqlParameter("@CustomerPhoneNo", SqlDbType.VarChar, 20);
                cp.Value = b.CustomerPhoneNo;
                cmd.Parameters.Add(cp);

                SqlParameter c = new SqlParameter("@CustomerId", SqlDbType.Int);
                c.Value = b.CustomerId;
                cmd.Parameters.Add(c);

                SqlParameter bs = new SqlParameter("@BookingStatus", SqlDbType.VarChar, 50);
                bs.Value = b.BookingStatus;
                cmd.Parameters.Add(bs);

                SqlParameter n = new SqlParameter("@NoofVehicles", SqlDbType.Int);
                n.Value = b.NoofVehicles;
                cmd.Parameters.Add(n);

                SqlParameter ns = new SqlParameter("@NoofSeats", SqlDbType.Int);
                ns.Value = b.NoofSeats;
                cmd.Parameters.Add(ns);

                SqlParameter cd = new SqlParameter("@ClosingDate", SqlDbType.Date);
                cd.Value = b.ClosingDate;
                cmd.Parameters.Add(cd);

                SqlParameter ct = new SqlParameter("@ClosingTime", System.Data.SqlDbType.DateTime);
                ct.Value = b.ClosingDate;
                cmd.Parameters.Add(ct);

                SqlParameter cto = new SqlParameter("@CancelledOn", SqlDbType.DateTime);
                cto.Value = b.CancelledOn;
                cmd.Parameters.Add(cto);

                SqlParameter cb = new SqlParameter("@CancelledBy", SqlDbType.VarChar, 50);
                cb.Value = b.CancelledBy;
                cmd.Parameters.Add(cb);

                SqlParameter bc = new SqlParameter("@BookingChannel", SqlDbType.VarChar, 50);
                bc.Value = b.BookingChannel;
                cmd.Parameters.Add(bc);

                SqlParameter r = new SqlParameter("@Reasons", SqlDbType.VarChar, 500);
                r.Value = b.Reasons;
                cmd.Parameters.Add(r);

                SqlParameter a = new SqlParameter("@Amount", SqlDbType.Decimal);
                a.Value = b.Amount;
                cmd.Parameters.Add(a);

                SqlParameter ps = new SqlParameter("@PaymentStatus", SqlDbType.VarChar, 50);
                ps.Value = b.PaymentStatus;
                cmd.Parameters.Add(ps);

                SqlParameter pty = new SqlParameter("@PaymentTypeId", SqlDbType.Int);
                pty.Value = b.PaymentTypeId;
                cmd.Parameters.Add(pty);




                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);


                #region Mobile OTP
                string eotp = dt.Rows[0]["bookingNumber"].ToString();
                //string totp = dt.Rows[0]["bookingNumber1"].ToString();
                if (eotp != null)
                {
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
                        mail.To.Add(fromaddress);
                        mail.Subject = "Vehicle Registration - Email OTP";
                        mail.IsBodyHtml = true;

                        string verifcodeMail = @"<table>
                                                        <tr>
                                                            <td>
                                                                <h2>Thank you for registering with PaySmart APP</h2>
                                                                <table width=\""760\"" align=\""center\"">
                                                                    <tbody style='background-color:#F0F8FF;'>
                                                                        <tr>
                                                                            <td style=\""font-family:'Zurich BT',Arial,Helvetica,sans-serif;font-size:15px;text-align:left;line-height:normal;background-color:#F0F8FF;\"" >
<div style='padding:10px;border:#0000FF solid 2px;'>    <br /><br />
                                                                             
                                                       Your Vehicle is Booked:<h3>" + eotp + @" </h3>
                                                       

                                                        If you didn't make this request, <a href='http://154.120.237.198:52800'>click here</a> to cancel.

                                                                                <br/>
                                                                                <br/>             
                                                                       
                                                                                Warm regards,<br>
                                                                                PAYSMART Customer Service Team<br/><br />
</div>
                                                                            </td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>

                                                    </table>";


                        mail.Body = verifcodeMail;
                        //SmtpServer.Port = 465;
                        //SmtpServer.Port = 587;
                        SmtpServer.Port = Convert.ToInt32(port);
                        SmtpServer.UseDefaultCredentials = false;

                        SmtpServer.Credentials = new System.Net.NetworkCredential(username, pwd);
                        SmtpServer.EnableSsl = true;
                        //SmtpServer.TargetName = "STARTTLS/smtp.gmail.com";
                        SmtpServer.Send(mail);

                    }
                    catch (Exception ex)
                    {
                        //throw ex;
                        throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message));
                    }
                }
                #endregion Mobile OTP


               // traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "SaveBookingDetails successful....");

            }
            catch (Exception ex)
            {
               // traceWriter.Trace(Request, "0", TraceLevel.Error, "{0}", "SaveBookingDetails...." + ex.Message.ToString());
                //throw ex;
                //throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message));
                //dt.Columns.Add("Code");
                //dt.Columns.Add("description");
                //DataRow dr = dt.NewRow();
                //dr[0] = "ERR001";
                //dr[1] = ex.Message;
                //dt.Rows.Add(dr);
                throw ex;
            }
            //finally
            //{
            //    conn.Close();
            //    conn.Dispose();
            //    SqlConnection.ClearPool(conn);
            //}
            return dt;
        }
    }
}
