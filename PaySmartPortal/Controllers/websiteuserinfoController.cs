using PaySmartPortal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace PaySmartPortal.Controllers
{
    public class websiteuserinfoController : ApiController
    {
        [HttpGet]

        public DataTable GetWebsiteUserInfo(string logininfo)
        {
            DataTable Tbl = new DataTable();


            //connect to database
            SqlConnection conn = new SqlConnection();
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "GetWebsiteUserInfo";
            cmd.Connection = conn;

            SqlParameter psw = new SqlParameter("@logininfo", SqlDbType.VarChar, 20);
            psw.Value = logininfo;
            cmd.Parameters.Add(psw);


            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(Tbl);

            return Tbl;
        }

        [HttpPost]
        public DataTable saveUserInfo(UserInfo b)
        {

            DataTable Tbl = new DataTable();
            //// int userid = b.Id;
            // //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();


                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdWebsiteUserInfo";
                cmd.Connection = conn;
                //     conn.Open();       

                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Value = b.Id;
                cmd.Parameters.Add(id);

                SqlParameter Gid = new SqlParameter("@FirstName", SqlDbType.VarChar, 50);
                Gid.Value = b.FirstName;
                cmd.Parameters.Add(Gid);

                SqlParameter pid = new SqlParameter("@LastName", SqlDbType.VarChar, 50);
                pid.Value = b.LastName;
                cmd.Parameters.Add(pid);

                SqlParameter mid = new SqlParameter("@MiddleName", SqlDbType.VarChar, 50);
                mid.Value = b.MiddleName;
                cmd.Parameters.Add(mid);

                SqlParameter lid = new SqlParameter("@UserName", SqlDbType.VarChar, 50);
                lid.Value = b.UserName;
                cmd.Parameters.Add(lid);

                SqlParameter oid = new SqlParameter("@EmailAddress", SqlDbType.VarChar, 50);
                oid.Value = b.EmailAddress;
                cmd.Parameters.Add(oid);

                SqlParameter rid = new SqlParameter("@Mobile", SqlDbType.VarChar, 15);
                rid.Value = b.Mobile;
                cmd.Parameters.Add(rid);

                SqlParameter cid = new SqlParameter("@CountryId", SqlDbType.Int);
                cid.Value = b.CountryId;
                cmd.Parameters.Add(cid);

                SqlParameter gid = new SqlParameter("@Password", SqlDbType.VarChar, 50);
                gid.Value = b.Password;
                cmd.Parameters.Add(gid);

                SqlParameter wid = new SqlParameter("@Gender", SqlDbType.Int);
                wid.Value = b.Gender;
                cmd.Parameters.Add(wid);

                SqlParameter UserTypeId = new SqlParameter("@UserTypeId", SqlDbType.Int);
                UserTypeId.Value = b.UserTypeId;
                cmd.Parameters.Add(UserTypeId);

                SqlParameter UserId = new SqlParameter("@UserId", SqlDbType.Int);
                UserId.Value = b.UserId;
                cmd.Parameters.Add(UserId);

                SqlParameter Active = new SqlParameter("@Active", SqlDbType.Int);
                Active.Value = b.Active;
                cmd.Parameters.Add(Active);

                SqlParameter IsEmailVerified = new SqlParameter("@IsEmailVerified", SqlDbType.Int);
                IsEmailVerified.Value = b.IsEmailVerified;
                cmd.Parameters.Add(IsEmailVerified);

                SqlParameter insUpdDelFlag = new SqlParameter("@insUpdDelFlag", SqlDbType.VarChar, 15);
                insUpdDelFlag.Value = b.InsUpdDelFlag;
                cmd.Parameters.Add(insUpdDelFlag);

                SqlParameter emailVerificationCode = new SqlParameter("@EVerificationCode", SqlDbType.VarChar, 15);
                emailVerificationCode.Value = null;
                emailVerificationCode.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(emailVerificationCode);

                //  conn.Open();

                //   object outputid = cmd.ExecuteScalar();

                //  conn.Close();
                //  userid = (int)outputid;

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(Tbl);

                //retrive the code and send email to the user
                object val = emailVerificationCode.Value;
                if (val != null)
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
                        mail.To.Add(b.EmailAddress);
                        mail.Subject = "User registration";
                        mail.IsBodyHtml = true;

                        string verifcodeMail = @"<table>
                                                        <tr>
                                                            <td>
                                                                <h2>Thank you for registering with PaySmart</h2>
                                                                <table width=\""760\"" align=\""center\"">
                                                                    <tbody style='background-color:#F0F8FF;'>
                                                                        <tr>
                                                                            <td style=\""font-family:'Zurich BT',Arial,Helvetica,sans-serif;font-size:15px;text-align:left;line-height:normal;background-color:#F0F8FF;\"" >
<div style='padding:10px;border:#0000FF solid 2px;'>                                                                                
<h3>Congratulations!!</h3>
                                                                                <h4>You have been successfully registered with PaySmart </h4>
                                                                                <h3>Verify your email address</h3>
                                                                                <br />
                                                                                To finish setting up this PaySmart account, we just need to make sure this email address is yours.

                                                                                <br /><br />
                                                                                <a href='http://154.120.237.198:52800' style=\""background-color: #2672ec;padding:10px\""><b> Verify &lt; sample email address &gt; </b></a>
                                                                                <br /><br />
                                                        Or you may be asked to enter this security code:<h3>E000000 </h3>

                                                        If you didn't make this request, <a href='http://154.120.237.198:52800'>click here</a> to cancel.

                                                                                <br/>
                                                                                <br/>             
                                                                       
                                                                                Warm regards,<br>
                                                                                PaySmart Customer Service Team<br/><br />
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
                    }

                }


                return Tbl;
            }

            catch (Exception ex)
            {
                //if (conn.State == ConnectionState.Open)
                //{
                //    conn.Close();
                //}
                return Tbl;
            }
        }

        [HttpGet]
        public int VerifyEmailAddress(string emailAddress, string code)
        {
            DataTable Tbl = new DataTable();
            // int userid = b.Id;
            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {

                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();


                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdWebsiteUserInfo";
                cmd.Connection = conn;

                SqlParameter oid = new SqlParameter("@EmailAddress", SqlDbType.VarChar, 50);
                oid.Value = emailAddress;
                cmd.Parameters.Add(oid);

                SqlParameter rid = new SqlParameter("@Code", SqlDbType.VarChar, 15);
                rid.Value = code;
                cmd.Parameters.Add(rid);

                SqlParameter IsEmailVerified = new SqlParameter("@IsEmailVerified", SqlDbType.Int);
                IsEmailVerified.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(IsEmailVerified);

                object isemailverifiedStatus = 1;// cmd.ExecuteScalar();              

                if (isemailverifiedStatus != null && isemailverifiedStatus.ToString() == "1")
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
                        mail.Subject = "Email Address verification";
                        mail.IsBodyHtml = true;

                        string mailContent = @"<table>
                                                    <tr>
                                                        <td>
                                                            <h2>Thank you for registering your email-id with PaySmart</h2>
                                                            <table width=\""760\"" align=\""center\"">
                                                                <tbody style='background-color:#F0F8FF;'>
                                                                    <tr>
                                                                        <td style=\""font-family: 'Zurich BT',Arial,Helvetica,sans-serif; font-size: 15px; text-align: left; line-height: normal; background-color: #f0f8ff; \"">
<div style='padding:10px;border:#0000FF solid 2px;'>
Dear Mr AAAAABBBB<br><br>
                                                                            <h3>Congratulations!!</h3> <h4>We have successfully registered your email id <a href='http://154.120.237.198:52800' target='_blank'>user@gmail.com</a></h4><br/>
                                                                            We thank you for your support and look forward to sending you important information regarding your account and travel on your registered email id. <br><br>
                                                                            For any queries call us on <b>1000-000-0000</b>, (Monday to Friday, 10am to 7pm except national holidays).   <br /  <br /> 
                                                        Alternatively, write to us at <a href='http://154.120.237.198:52800' target='_blank'>admin@interbus.com</a> with your user name or email address or mobile number.                         
                                                                            <br /> <br />
                                                                            Warm regards,<br/>
                                                                            PaySmart Customer Service Team<br /><br />
</div>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                </table>";
                        mail.Body = mailContent;
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
                    }
                }
                return (int)isemailverifiedStatus;


            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                return -1;
            }

        }
    }
}
