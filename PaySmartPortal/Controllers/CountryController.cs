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
    public class CountryController : ApiController
    {
        [HttpGet]

        public DataTable GetCountry(int active)
        {
            DataTable Tbl = new DataTable();

            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetCOUNTRY";
                cmd.Connection = conn;
                SqlParameter a = new SqlParameter("@active", SqlDbType.Int);
                a.Value = active;
                cmd.Parameters.Add(a);
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];

            }
            catch (Exception ex)
            {

                throw ex;
            }
            // int found = 0;
            return Tbl;
        }

    }
}
