using PaySmartPortal.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PaySmartPortal.Controllers
{
    public class ValidateCredentialsController : ApiController
    {
        [HttpPost]
        [Route("api/ValidateCredentials/ValidateCredentials")]
        public DataTable ValidateCredentials(UserLogin u)
        {
            DataTable Tbl = new DataTable();

            string username = u.LoginInfo;
            string pwd = u.Passkey;
            try
            {
                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.CommandText = "dbo.WebsiteValidateCredentials";

                cmd.Connection = conn;

                SqlParameter lUserName = new SqlParameter("@logininfo", SqlDbType.VarChar, 50);
                lUserName.Value = username;
                lUserName.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lUserName);


                SqlParameter lPassword = new SqlParameter("@passkey", SqlDbType.VarChar, 50);
                lPassword.Value = pwd;
                lPassword.Direction = ParameterDirection.Input;
                cmd.Parameters.Add(lPassword);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(Tbl);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Tbl;


        }
    }
}
