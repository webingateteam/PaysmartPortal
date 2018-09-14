using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    }
}
