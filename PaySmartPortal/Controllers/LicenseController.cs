using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Tracing;

namespace PaySmartPortal.Controllers
{
    public class LicenseController : ApiController
    {
        [HttpGet]
        [Route("api/License/GetLicense")]
        public DataSet GetLicense()
        {
            DataTable Tbl = new DataTable();

            //connect to database
            SqlConnection conn = new SqlConnection();
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "PSGetLicensePageDetails";
            cmd.Connection = conn;


            //SqlParameter mm = new SqlParameter("@catId", SqlDbType.Int);
            //mm.Value = LicenseCatId;
            //cmd.Parameters.Add(mm);

            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);

            db.Fill(ds);
            // Tbl = ds.Tables[0];

            // int found = 0;
            return ds;
        }       

        [HttpGet]
        public DataSet validatefleetowner(string fleetownercode)
        {
            //connect to database
            SqlConnection conn = new SqlConnection();
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "ValidateFleetOwnerCode";
            cmd.Connection = conn;

            //conn.Open();
            SqlParameter code = new SqlParameter("@fleetownercode", SqlDbType.VarChar, 15);
            code.Value = fleetownercode;
            cmd.Parameters.Add(code);

            SqlParameter mm = new SqlParameter("@result", SqlDbType.Int);
            mm.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(mm);

            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);

            db.Fill(ds);

            int result = -1;
            result = Convert.ToInt32(mm.Value);

            DataTable dt = new DataTable();
            dt.Columns.Add("result");
            DataRow dr = dt.NewRow();
            dr[0] = result;

            dt.Rows.Add(dr);

            ds.Tables.Add(dt);

            return ds;

        }

        [HttpGet]
        public DataTable GetAdvertisment()
        {
            DataTable Tbl = new DataTable();
            LogTraceWriter traceWriter = new LogTraceWriter();
            try
            {
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "GetAdvertisment credentials....");


                //connect to database
                SqlConnection conn = new SqlConnection();
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Getadvertisement";
                cmd.Connection = conn;
                DataSet ds = new DataSet();
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                Tbl = ds.Tables[0];
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "GetAdvertisment Credentials completed.");
                // int found = 0;
            }
            catch (Exception ex)
            {
                traceWriter.Trace(Request, "0", TraceLevel.Error, "{0}", "GetAdvertisment Credentials error" + ex.Message);
            }
            return Tbl;

        }
    }
}
