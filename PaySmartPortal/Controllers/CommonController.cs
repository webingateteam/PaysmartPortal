using PaySmartPortal.Models;
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
    public class CommonController : ApiController
    {
        [HttpPost]
        [Route("api/Common/ConfigData")]
        public DataSet ConfigData(ConfigData vc)
        {

            LogTraceWriter traceWriter = new LogTraceWriter();
            // traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "ConfigData....");
            //DataTable Tbl = new DataTable();
            //connect to database
            SqlConnection conn = new SqlConnection();
            DataSet ds = new DataSet();

            try
            {
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetConfigurationData";
                cmd.Connection = conn;

                SqlParameter gsaa = new SqlParameter();
                gsaa.ParameterName = "@includeStatus";
                gsaa.SqlDbType = SqlDbType.Int;
                gsaa.Value = vc.includeStatus;
                cmd.Parameters.Add(gsaa);

                SqlParameter gsab = new SqlParameter();
                gsab.ParameterName = "@includeCategories";
                gsab.SqlDbType = SqlDbType.Int;
                gsab.Value = vc.includeCategories;
                cmd.Parameters.Add(gsab);

                SqlParameter gsac = new SqlParameter();
                gsac.ParameterName = "@includeLicenseCategories";
                gsac.SqlDbType = SqlDbType.Int;
                gsac.Value = vc.includeLicenseCategories;
                cmd.Parameters.Add(gsac);

                SqlParameter nvr = new SqlParameter();
                nvr.ParameterName = "@includeVehicleGroup";
                nvr.SqlDbType = SqlDbType.Int;
                nvr.Value = vc.includeVehicleGroup;
                cmd.Parameters.Add(nvr);

                SqlParameter nvl = new SqlParameter();
                nvl.ParameterName = "@includeGender";
                nvl.SqlDbType = SqlDbType.Int;
                nvl.Value = vc.includeGender;
                cmd.Parameters.Add(nvl);

                SqlParameter nst = new SqlParameter();
                nst.ParameterName = "@includeFrequency";
                nst.SqlDbType = SqlDbType.Int;
                nst.Value = vc.includeFrequency;
                cmd.Parameters.Add(nst);

                SqlParameter ncn = new SqlParameter();
                ncn.ParameterName = "@includePricingType";
                ncn.SqlDbType = SqlDbType.Int;
                ncn.Value = vc.includePricingType;
                cmd.Parameters.Add(ncn);

                SqlParameter gsk = new SqlParameter();
                gsk.ParameterName = "@includeTransactionType";
                gsk.SqlDbType = SqlDbType.Int;
                gsk.Value = vc.includeTransactionType;
                cmd.Parameters.Add(gsk);

                //@needHireVehicle
                SqlParameter nhv = new SqlParameter();
                nhv.ParameterName = "@includeApplicability";
                nhv.SqlDbType = SqlDbType.Int;
                nhv.Value = vc.includeApplicability;
                cmd.Parameters.Add(nhv);

                //@needbtpos
                SqlParameter nbtpos = new SqlParameter();
                nbtpos.ParameterName = "@includeFeeCategory";
                nbtpos.SqlDbType = SqlDbType.Int;
                nbtpos.Value = vc.includeFeeCategory;
                cmd.Parameters.Add(nbtpos);

                //@cmpId
                SqlParameter cmpId = new SqlParameter();
                cmpId.ParameterName = "@includeTransChargeType";
                cmpId.SqlDbType = SqlDbType.Int;
                cmpId.Value = vc.includeTransChargeType;
                cmd.Parameters.Add(cmpId);

                //@fleetownerId
                SqlParameter foid = new SqlParameter();
                foid.ParameterName = "@includeVehicleType";
                foid.SqlDbType = SqlDbType.Int;
                foid.Value = vc.includeVehicleType;
                cmd.Parameters.Add(foid);

                //needfleetownerroutes
                SqlParameter forid = new SqlParameter();
                forid.ParameterName = "@includeVehicleModel";
                forid.SqlDbType = SqlDbType.Int;
                forid.Value = vc.includeVehicleModel;
                cmd.Parameters.Add(forid);

                SqlParameter vmid = new SqlParameter();
                vmid.ParameterName = "@includeVehicleMake";
                vmid.SqlDbType = SqlDbType.Int;
                vmid.Value = vc.includeVehicleMake;
                cmd.Parameters.Add(vmid);

                SqlParameter vgid = new SqlParameter();
                vgid.ParameterName = "@includeDocumentType";
                vgid.SqlDbType = SqlDbType.Int;
                vgid.Value = vc.includeDocumentType;
                cmd.Parameters.Add(vgid);

                SqlParameter vdid = new SqlParameter();
                vdid.ParameterName = "@includePaymentType";
                vdid.SqlDbType = SqlDbType.Int;
                vdid.Value = vc.includePaymentType;
                cmd.Parameters.Add(vdid);

                SqlParameter vmid1 = new SqlParameter();
                vmid1.ParameterName = "@includeMiscellaneousTypes";
                vmid1.SqlDbType = SqlDbType.Int;
                vmid1.Value = vc.includeMiscellaneousTypes;
                cmd.Parameters.Add(vmid1);

                SqlParameter vgid1 = new SqlParameter();
                vgid1.ParameterName = "@includeCardCategories";
                vgid1.SqlDbType = SqlDbType.Int;
                vgid1.Value = vc.includeCardCategories;
                cmd.Parameters.Add(vgid1);

                SqlParameter vdid1 = new SqlParameter();
                vdid1.ParameterName = "@includeCardTypes";
                vdid1.SqlDbType = SqlDbType.Int;
                vdid1.Value = vc.includeCardTypes;
                cmd.Parameters.Add(vdid1);


                SqlParameter vmid11 = new SqlParameter();
                vmid11.ParameterName = "@includeVehicleLayoutType";
                vmid11.SqlDbType = SqlDbType.Int;
                vmid11.Value = vc.includeVehicleLayoutType;
                cmd.Parameters.Add(vmid11);

                SqlParameter vgid11 = new SqlParameter();
                vgid11.ParameterName = "@includeLicenseFeatures";
                vgid11.SqlDbType = SqlDbType.Int;
                vgid11.Value = vc.includeLicenseFeatures;
                cmd.Parameters.Add(vgid11);

                SqlParameter vdid11 = new SqlParameter();
                vdid11.ParameterName = "@includeCardModels";
                vdid11.SqlDbType = SqlDbType.Int;
                vdid11.Value = vc.includeCardModels;
                cmd.Parameters.Add(vdid11);


                SqlParameter vmid2 = new SqlParameter();
                vmid2.ParameterName = "@includeCards";
                vmid2.SqlDbType = SqlDbType.Int;
                vmid2.Value = vc.includeCards;
                cmd.Parameters.Add(vmid2);

                SqlParameter vgid2 = new SqlParameter();
                vgid2.ParameterName = "@includeCountry";
                vgid2.SqlDbType = SqlDbType.Int;
                vgid2.Value = vc.includeCountry;
                cmd.Parameters.Add(vgid2);

                SqlParameter vdid2 = new SqlParameter();
                vdid2.ParameterName = "@includeActiveCountry";
                vdid2.SqlDbType = SqlDbType.Int;
                vdid2.Value = vc.includeActiveCountry;
                cmd.Parameters.Add(vdid2);


                SqlParameter vdid3 = new SqlParameter();
                vdid3.ParameterName = "@includeFleetOwner";
                vdid3.SqlDbType = SqlDbType.Int;
                vdid3.Value = vc.includeFleetOwner;
                cmd.Parameters.Add(vdid3);

                SqlParameter vdid4 = new SqlParameter("@includeUserType", SqlDbType.Int);
                vdid4.Value = vc.includeUserType;
                cmd.Parameters.Add(vdid4);

                SqlParameter at = new SqlParameter("@includeAuthType", SqlDbType.Int);
                at.Value = vc.includeAuthType;
                cmd.Parameters.Add(at);

                SqlParameter cs = new SqlParameter("@includeState", SqlDbType.Int);
                cs.Value = vc.includeState;
                cmd.Parameters.Add(cs);

                SqlParameter iptn = new SqlParameter("@includePackageTypeName", SqlDbType.Int);
                iptn.Value = vc.includePackageTypeName;
                cmd.Parameters.Add(iptn);

                SqlParameter ipn = new SqlParameter("@includePackageNames", SqlDbType.Int);
                ipn.Value = vc.includePackageNames;
                cmd.Parameters.Add(ipn);

                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(ds);
                //  traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "ConfigData completed.");

                // Tbl = ds.Tables[0];

                // int found = 0;
                return ds;
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                // traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in config data:" + ex.Message);
                throw ex;
            }

            return ds;
        }
    }
}
